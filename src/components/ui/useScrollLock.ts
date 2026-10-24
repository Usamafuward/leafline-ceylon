'use client';

import { useEffect } from 'react';
import type Lenis from 'lenis';

// Freezes the page behind an open modal: pauses Lenis smooth scrolling (wheel / keys)
// and hides the native scrollbar (touch), padding the page so content doesn't jump sideways
export default function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const previous = { overflow: html.style.overflow, paddingRight: html.style.paddingRight };

    lenis?.stop();
    html.style.overflow = 'hidden';
    if (scrollbarWidth > 0) html.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      html.style.overflow = previous.overflow;
      html.style.paddingRight = previous.paddingRight;
      lenis?.start();
    };
  }, [locked]);
}
