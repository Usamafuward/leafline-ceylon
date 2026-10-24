'use client';

import React from 'react';
import { MotionConfig } from 'motion/react';

// Site-wide motion settings: visitors who ask their OS for reduced motion get fades
// instead of movement, zooms and morphs in every motion-powered animation
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
