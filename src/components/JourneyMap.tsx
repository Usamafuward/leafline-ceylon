'use client';

import SplitText from '@/components/ui/SplitText';
import React, { useMemo, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { RotateCcw, TrainFront, Car } from 'lucide-react';
import SRI_LANKA_PATHS from '@/data/sri_lanka_map_paths.json';
import MapRoute from '@/components/MapRoute';
import { getTourStops } from '@/data/mapGeo';
import type { TourPackage } from '@/data/tours';

const ISLAND_PATHS = [
  SRI_LANKA_PATHS.northern_main,
  ...SRI_LANKA_PATHS.northern_islands,
  SRI_LANKA_PATHS.north_central,
  SRI_LANKA_PATHS.north_western,
  SRI_LANKA_PATHS.central,
  SRI_LANKA_PATHS.uva,
  SRI_LANKA_PATHS.eastern,
  SRI_LANKA_PATHS.western,
  SRI_LANKA_PATHS.sabaragamuwa,
  SRI_LANKA_PATHS.southern,
];

function formatDays(days: number[] = []) {
  if (days.length === 0) return '';
  const first = days[0];
  const last = days[days.length - 1];
  return first === last ? `Day ${first}` : `Days ${first}–${last}`;
}

// Frames the map around the route (with room for labels) instead of the whole island,
// never zooming in so far that pins and the vehicle look oversized
function routeViewBox(points: { x: number; y: number }[]) {
  const pad = 80;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  let minX = Math.min(...xs) - pad;
  let maxX = Math.max(...xs) + pad;
  let minY = Math.min(...ys) - pad;
  let maxY = Math.max(...ys) + pad;

  const aspect = 0.8; // width / height of the map frame
  let height = Math.max(maxY - minY, 440);
  let width = Math.max(maxX - minX, height * aspect);
  height = Math.max(height, width / aspect);

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  minX = cx - width / 2;
  minY = cy - height / 2;
  width = Math.round(width);
  height = Math.round(height);
  return `${Math.round(minX)} ${Math.round(minY)} ${width} ${height}`;
}

export default function JourneyMap({ tour }: { tour: TourPackage }) {
  const stops = useMemo(() => getTourStops(tour), [tour]);
  const viewBox = useMemo(() => routeViewBox(stops), [stops]);
  const hasRailLeg = stops.some((stop, i) => stop.rail && stops[i + 1]?.rail);

  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { once: true, amount: 0.4 });
  const [reached, setReached] = useState(1);
  const [replayKey, setReplayKey] = useState(0);

  if (stops.length < 2) return null;

  return (
    <div className="bg-white rounded-3xl border border-surface-container-high shadow-[0_12px_36px_-8px_rgba(0,37,26,0.06)] p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Map */}
      <div
        ref={frameRef}
        className="lg:col-span-5 relative bg-[#edf4ef] rounded-2xl overflow-hidden aspect-[4/5] w-full max-w-[460px] mx-auto"
      >
        <svg viewBox={viewBox} className="absolute inset-0 w-full h-full" role="img" aria-label={`Route map: ${stops.map((s) => s.label).join(', ')}`}>
          {ISLAND_PATHS.map((d, i) => (
            <path key={i} d={d} fill="#dfeae3" stroke="#c4d6cb" strokeWidth={1.2} />
          ))}
          <MapRoute key={replayKey} stops={stops} play={inView} onProgress={setReached} />
        </svg>

        <button
          type="button"
          onClick={() => {
            setReached(1);
            setReplayKey((k) => k + 1);
          }}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-surface-container-high text-[0.72rem] font-semibold text-primary cursor-pointer hover:bg-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Replay route
        </button>
      </div>

      {/* Stop List (lights up in step with the vehicle on the map) */}
      <div className="lg:col-span-7">
        <span className="text-[0.72rem] tracking-[0.15em] uppercase text-secondary font-semibold">
          JOURNEY MAP
        </span>
        <h2 className="font-serif text-3xl text-primary font-normal mt-1 mb-2"><SplitText text="Your Route at a Glance" /></h2>
        <p className="text-[0.88rem] text-on-surface-variant mb-6">
          {stops.length} stops across {tour.duration.toLowerCase()}
          {hasRailLeg ? ', including a scenic train ride through the hill country.' : ', fully chauffeured door to door.'}
        </p>

        <ol className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
          {stops.map((stop, i) => {
            const isReached = i < reached;
            const isCurrent = i === reached - 1;
            const next = stops[i + 1];
            const byTrain = next && stop.rail && next.rail;
            return (
              <li key={`${stop.label}-${i}`} className="flex items-start gap-3 py-2">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.72rem] font-bold shrink-0 transition-all duration-500 ${
                    isReached ? 'bg-secondary text-white' : 'bg-surface-container-low text-outline'
                  } ${isCurrent ? 'shadow-[0_0_0_4px_rgba(46,105,81,0.25)]' : ''}`}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p
                    className={`text-[0.92rem] font-semibold m-0 transition-colors duration-500 ${
                      isReached ? 'text-primary' : 'text-outline'
                    }`}
                  >
                    {stop.label === 'Airport' ? 'Colombo Airport (CMB)' : stop.label}
                  </p>
                  <p className="text-[0.74rem] text-on-surface-variant m-0 flex items-center gap-1.5 flex-wrap">
                    <span>{formatDays(stop.days)}</span>
                    {next && (
                      <span className="inline-flex items-center gap-1 text-outline">
                        · {byTrain ? <TrainFront className="w-3 h-3" /> : <Car className="w-3 h-3" />}
                        {byTrain ? 'scenic train' : 'private chauffeur'}
                      </span>
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
