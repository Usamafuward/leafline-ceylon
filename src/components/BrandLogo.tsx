import React from 'react';

// Brand name, in one place so the header, footer and copy can't drift apart
export const BRAND_NAME = 'Leafline Ceylon';

// The Leafline mark: a tea-leaf outline with a dotted route running down its midrib to a
// destination pin (the same dotted-route language as the site's animated maps)
export function LeaflineMark({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <rect width="56" height="56" rx="14" fill="#00251a" />
      <path d="M28 7 C44 16 45 34 28 49 C11 34 12 16 28 7 Z" stroke="#b2f0d1" strokeWidth="2.6" />
      <path
        d="M28 12 C24 20 32 26 26 32 C22 37 28 41 28 44"
        stroke="#b2f0d1"
        strokeWidth="2.2"
        strokeDasharray="0.1 5"
        strokeLinecap="round"
      />
      <circle cx="28" cy="44" r="3.4" fill="#b2f0d1" />
    </svg>
  );
}

// Mark + wordmark. The wordmark picks up a mint tint on hover when placed inside a `group`.
export default function BrandLogo({ size = 36 }: { size?: number }) {
  return (
    <span className="flex items-center gap-3">
      <LeaflineMark size={size} className="transition-transform duration-300 group-hover:scale-105" />
      <span className="flex flex-col">
        <span className="font-serif text-lg sm:text-xl font-semibold text-white tracking-wide leading-tight transition-colors duration-300 group-hover:text-secondary-fixed">
          Leafline
        </span>
        <span className="font-sans text-[0.6rem] tracking-[0.28em] uppercase text-secondary-fixed font-semibold mt-0.5">
          Ceylon
        </span>
      </span>
    </span>
  );
}
