'use client';

import React, { useRef } from 'react';
import { useInView } from 'motion/react';

// Longest a heading's letter cascade may take, whatever its length (ms)
const MAX_CASCADE_MS = 950;
const LETTER_STEP_MS = 32;

// Reveals a heading letter by letter the first time it scrolls into view: each letter rises
// and unblurs in turn. Words stay unbreakable so wrapping never splits one across lines, and
// screen readers get the plain text instead of a run of single letters.
// `delay` (ms) holds the whole cascade back, e.g. to let a page-top headline start once the page settles
export default function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });

  const letterCount = text.replace(/\s/g, '').length;
  const step = Math.min(LETTER_STEP_MS, MAX_CASCADE_MS / Math.max(letterCount, 1));

  let index = 0;
  const words = text.split(' ');

  return (
    <span ref={ref} className={`split-text ${inView ? 'is-in' : ''}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <React.Fragment key={w}>
            <span className="split-word">
              {Array.from(word).map((char, c) => (
                <span
                  key={c}
                  className="split-char"
                  style={{ animationDelay: `${Math.round(delay + index++ * step)}ms` }}
                >
                  {char}
                </span>
              ))}
            </span>
            {w < words.length - 1 && ' '}
          </React.Fragment>
        ))}
      </span>
    </span>
  );
}
