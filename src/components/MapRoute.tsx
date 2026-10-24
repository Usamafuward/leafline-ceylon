'use client';

import React, { useEffect, useId, useMemo, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import type { MapPoint, RouteStop } from '@/data/mapGeo';

type Vehicle = 'train' | 'tuktuk';

interface Leg {
  from: RouteStop;
  to: RouteStop;
  ctrl: MapPoint;
  start: number; // distance along the whole route where this leg begins
  length: number;
  table: number[]; // cumulative length at each sample, for arc-length lookup
  vehicle: Vehicle;
}

const SAMPLES = 32;
const TRAVEL_SPEED = 190; // map units per second
const STOP_PAUSE_S = 0.28;

function quadPoint(p0: MapPoint, c: MapPoint, p1: MapPoint, t: number): MapPoint {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * c.x + t * t * p1.x,
    y: u * u * p0.y + 2 * u * t * c.y + t * t * p1.y,
  };
}

// Each leg is a gentle arc (always bowing to the same side) rather than a straight hop
function buildLegs(stops: RouteStop[]): Leg[] {
  const legs: Leg[] = [];
  let start = 0;

  for (let i = 0; i < stops.length - 1; i++) {
    const from = stops[i];
    const to = stops[i + 1];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const bow = 0.16;
    const ctrl = { x: (from.x + to.x) / 2 - dy * bow, y: (from.y + to.y) / 2 + dx * bow };

    const table = [0];
    let prev: MapPoint = from;
    for (let s = 1; s <= SAMPLES; s++) {
      const p = quadPoint(from, ctrl, to, s / SAMPLES);
      table.push(table[s - 1] + Math.hypot(p.x - prev.x, p.y - prev.y));
      prev = p;
    }
    const length = table[SAMPLES];

    legs.push({
      from,
      to,
      ctrl,
      start,
      length,
      table,
      vehicle: from.rail && to.rail ? 'train' : 'tuktuk',
    });
    start += length;
  }

  return legs;
}

function locate(legs: Leg[], distance: number) {
  const leg =
    legs.find((l) => distance <= l.start + l.length) ?? legs[legs.length - 1];
  const along = Math.min(Math.max(distance - leg.start, 0), leg.length);

  let i = 1;
  while (i < SAMPLES && leg.table[i] < along) i++;
  const segment = leg.table[i] - leg.table[i - 1] || 1;
  const t = (i - 1 + (along - leg.table[i - 1]) / segment) / SAMPLES;

  const point = quadPoint(leg.from, leg.ctrl, leg.to, t);
  const ahead = quadPoint(leg.from, leg.ctrl, leg.to, Math.min(t + 0.02, 1));
  const behind = quadPoint(leg.from, leg.ctrl, leg.to, Math.max(t - 0.02, 0));
  return { point, headingLeft: ahead.x - behind.x < -0.5, leg };
}

// Rough label footprint (map units) used to skip labels that would overlap
function labelBox(stop: RouteStop) {
  const fontSize = stop.main ? 13 : 11;
  const width = stop.label.length * fontSize * 0.58;
  const anchorEnd = stop.x > 470;
  const x = anchorEnd ? stop.x - 10 - width : stop.x + 9;
  return { x, y: stop.y - fontSize, width, height: fontSize + 4, anchorEnd, fontSize };
}

interface MapRouteProps {
  stops: RouteStop[];
  play: boolean;
  // Fires with how many stops the vehicle has reached so far (the start counts as reached)
  onProgress?: (reachedStops: number) => void;
}

// Renders inside an <svg> using the map's own coordinate space.
export default function MapRoute({ stops, play, onProgress }: MapRouteProps) {
  const maskId = useId();
  const prefersReducedMotion = useReducedMotion();
  const legs = useMemo(() => buildLegs(stops), [stops]);
  const total = legs.length ? legs[legs.length - 1].start + legs[legs.length - 1].length : 0;

  const pathD = useMemo(() => {
    if (!stops.length) return '';
    return legs.reduce(
      (d, leg) => `${d} Q ${leg.ctrl.x} ${leg.ctrl.y} ${leg.to.x} ${leg.to.y}`,
      `M ${stops[0].x} ${stops[0].y}`
    );
  }, [legs, stops]);

  const labelVisible = useMemo(() => {
    const placed: ReturnType<typeof labelBox>[] = [];
    return stops.map((stop, i) => {
      const box = labelBox(stop);
      const overlaps = placed.some(
        (b) =>
          box.x < b.x + b.width && box.x + box.width > b.x && box.y < b.y + b.height && box.y + box.height > b.y
      );
      // The start, the finish and headline stops always keep their labels
      const keep = stop.main || i === 0 || i === stops.length - 1 || !overlaps;
      if (keep) placed.push(box);
      return keep;
    });
  }, [stops]);

  const distance = useMotionValue(0);
  const [reached, setReached] = useState(1);
  const [vehicle, setVehicle] = useState<Vehicle>(legs[0]?.vehicle ?? 'tuktuk');
  const [moving, setMoving] = useState(false);

  const dashOffset = useTransform(distance, (d) => total - d);
  const vehicleX = useTransform(distance, (d) => (legs.length ? locate(legs, d).point.x : stops[0]?.x ?? 0));
  const vehicleY = useTransform(distance, (d) => (legs.length ? locate(legs, d).point.y : stops[0]?.y ?? 0));
  const facing = useMotionValue(1);
  // Springing between 1 and -1 squeezes the vehicle through zero, reading as a quick U-turn
  const facingSpring = useSpring(facing, { stiffness: 260, damping: 22 });

  // Once the trip ends, the vehicle pulls over beside the final pin, on the side away
  // from its label, so it never sits on top of the town name
  const parkOffset = useSpring(0, { stiffness: 170, damping: 20 });
  const vehicleDrawX = useTransform([vehicleX, parkOffset], ([x, offset]: number[]) => x + offset);
  const finalStop = stops[stops.length - 1];
  const parkSide = finalStop && labelBox(finalStop).anchorEnd ? 1 : -1;

  const parkVehicle = (instant: boolean) => {
    const offset = parkSide * 26;
    // Face back toward the pin it just arrived at
    if (instant) {
      parkOffset.jump(offset);
      facing.jump(-parkSide);
      facingSpring.jump(-parkSide);
    } else {
      parkOffset.set(offset);
      facing.set(-parkSide);
    }
  };

  useMotionValueEvent(distance, 'change', (d) => {
    if (!legs.length) return;
    const { headingLeft, leg } = locate(legs, d);
    facing.set(headingLeft ? -1 : 1);
    setVehicle(leg.vehicle);
    const count = 1 + legs.filter((l) => d >= l.start + l.length - 0.5).length;
    setReached((prev) => (prev === count ? prev : count));
  });

  useEffect(() => {
    onProgress?.(reached);
  }, [reached, onProgress]);

  useEffect(() => {
    if (!play || !legs.length) return;

    if (prefersReducedMotion) {
      distance.jump(total);
      parkVehicle(true);
      return;
    }

    let cancelled = false;
    let controls: ReturnType<typeof animate> | null = null;

    const run = async () => {
      setMoving(true);
      for (const leg of legs) {
        controls = animate(distance, leg.start + leg.length, {
          duration: Math.min(Math.max(leg.length / TRAVEL_SPEED, 0.55), 1.9),
          ease: [0.45, 0, 0.25, 1],
        });
        await controls;
        if (cancelled) return;
        // Brief pause at each stop so its pin can land before the vehicle moves on
        await new Promise((resolve) => setTimeout(resolve, STOP_PAUSE_S * 1000));
        if (cancelled) return;
      }
      setMoving(false);
      parkVehicle(false);
    };
    run();

    return () => {
      cancelled = true;
      controls?.stop();
    };
  }, [play, legs, total, distance, prefersReducedMotion]);

  if (!stops.length) return null;

  return (
    <g className="pointer-events-none">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <motion.path
            d={pathD}
            fill="none"
            stroke="#ffffff"
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={total}
            style={{ strokeDashoffset: dashOffset }}
          />
        </mask>
      </defs>

      {/* Route: dark track under a dotted mint line, both revealed by the mask as the vehicle travels */}
      <g mask={`url(#${maskId})`}>
        <path d={pathD} fill="none" stroke="rgba(0,37,26,0.35)" strokeWidth={6} strokeLinecap="round" />
        <path
          d={pathD}
          fill="none"
          stroke="#b2f0d1"
          strokeWidth={4.5}
          strokeLinecap="round"
          strokeDasharray="0.1 9"
        />
      </g>

      {/* Vehicle (drawn under the pins so town names always stay readable) */}
      {legs.length > 0 && (
        <motion.g style={{ x: vehicleDrawX, y: vehicleY }}>
          <motion.g style={{ scaleX: facingSpring }}>
            <g className={moving ? 'map-vehicle-bob' : ''}>
              {vehicle === 'train' ? <TrainIcon /> : <TukTukIcon />}
            </g>
          </motion.g>
        </motion.g>
      )}

      {/* Stops: each pin drops in as the vehicle reaches it */}
      {stops.map((stop, i) => {
        const isReached = i < reached;
        const box = labelBox(stop);
        return (
          <g
            key={`${stop.label}-${i}`}
            className={`map-stop ${isReached ? 'is-reached' : ''}`}
            style={{ transformOrigin: `${stop.x}px ${stop.y}px` }}
          >
            {isReached && i > 0 && (
              <circle cx={stop.x} cy={stop.y} r={stop.main ? 7 : 5} className="map-stop-ripple" />
            )}
            <circle
              cx={stop.x}
              cy={stop.y}
              r={stop.main ? 6.5 : 4.5}
              fill="#ffffff"
              stroke="#0c5037"
              strokeWidth={stop.main ? 2.5 : 1.8}
            />
            {stop.main && <circle cx={stop.x} cy={stop.y} r={2.5} fill="#0c5037" />}
            {labelVisible[i] && (
              <text
                x={box.anchorEnd ? stop.x - 10 : stop.x + 9}
                y={stop.y + (stop.main ? 4 : 3.5)}
                textAnchor={box.anchorEnd ? 'end' : 'start'}
                fontSize={box.fontSize}
                fontWeight={stop.main ? 700 : 600}
                fill="#ffffff"
                className="drop-shadow-[0_1px_3px_rgba(0,37,26,0.95)]"
              >
                {stop.label}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

// Both icons face right and are centred on the route point (wheels sit on the line)
function TukTukIcon() {
  return (
    <g transform="translate(0 -9)">
      <ellipse cx={1} cy={13} rx={15} ry={2.6} fill="rgba(0,37,26,0.28)" />
      <path
        d="M-13 8 V-3 Q-13 -11 -4 -11 H5 Q12 -11 15 -2 L16 8 Z"
        fill="#2e8b57"
        stroke="#00251a"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path d="M-15 -11 H6 Q10 -11 11 -9 H-15 Z" fill="#00251a" />
      <path d="M2 -8 H6 Q11 -8 13 -2 H2 Z" fill="#d6f5e6" />
      <rect x={-10} y={-7} width={9} height={6} rx={1.5} fill="#d6f5e6" opacity={0.85} />
      <rect x={-13} y={2} width={29} height={2.4} fill="#b2f0d1" />
      <circle cx={-8} cy={9} r={4} fill="#00251a" />
      <circle cx={-8} cy={9} r={1.4} fill="#ffffff" />
      <circle cx={11} cy={9} r={4} fill="#00251a" />
      <circle cx={11} cy={9} r={1.4} fill="#ffffff" />
    </g>
  );
}

function TrainIcon() {
  return (
    <g transform="translate(0 -9)">
      <ellipse cx={0} cy={13} rx={19} ry={2.6} fill="rgba(0,37,26,0.28)" />
      <path
        d="M-18 -9 H8 Q16 -9 19 2 V8 H-18 Z"
        fill="#1f5fa8"
        stroke="#00251a"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <rect x={-18} y={1} width={37} height={2.6} fill="#b2f0d1" />
      <rect x={-14} y={-6} width={6} height={5} rx={1} fill="#d6f5e6" />
      <rect x={-5} y={-6} width={6} height={5} rx={1} fill="#d6f5e6" />
      <path d="M5 -6 H9 Q13 -6 15 -1 H5 Z" fill="#d6f5e6" />
      <circle cx={-12} cy={9} r={3.2} fill="#00251a" />
      <circle cx={-3} cy={9} r={3.2} fill="#00251a" />
      <circle cx={11} cy={9} r={3.2} fill="#00251a" />
    </g>
  );
}
