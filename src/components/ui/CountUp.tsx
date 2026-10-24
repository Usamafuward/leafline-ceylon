'use client';

import React, { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

interface CountUpProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

// Counts from zero up to `value` the first time it scrolls into view.
// Screen readers (and crawlers) get the final figure from a hidden copy, never the moving one.
export default function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.8,
  className = '',
}: CountUpProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(numberRef, { once: true, margin: '0px 0px -10% 0px' });
  const prefersReducedMotion = useReducedMotion();

  const finalText = `${prefix}${value.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const el = numberRef.current;
    if (!el || !inView) return;

    const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;
    if (prefersReducedMotion) {
      el.textContent = format(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        el.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [inView, prefersReducedMotion, value, decimals, prefix, suffix, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{finalText}</span>
      <span ref={numberRef} aria-hidden="true" className="tabular-nums">
        {`${prefix}${(0).toFixed(decimals)}${suffix}`}
      </span>
    </span>
  );
}
