'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  // How far (as % of its own height) the photo drifts each way while its frame crosses the viewport
  strength?: number;
}

// Fills its positioned parent with a photo that scrolls slightly slower than the page.
// The photo is scaled up just enough that the drift never exposes the frame's edges.
export default function ParallaxImage({ src, alt, className = '', strength = 8 }: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={frameRef} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={prefersReducedMotion ? undefined : { y, scale: 1 + (strength * 2.2) / 100 }}
        className={`w-full h-full object-cover will-change-transform ${className}`}
      />
    </div>
  );
}
