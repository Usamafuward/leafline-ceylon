'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SplitText from '@/components/ui/SplitText';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface PageHeroProps {
  // Current page name shown at the end of the breadcrumb
  crumb: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  // CSS object-position for the photo, e.g. 'center 40%'
  imagePosition?: string;
}

// Shared photo header for every inner page: the photo settles from a slow zoom and drifts
// with scroll, while the title is revealed letter by letter (same as the homepage hero and section headings)
export default function PageHero({
  crumb,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imagePosition = 'center 45%',
}: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[clamp(440px,62vh,600px)] flex items-end overflow-hidden bg-[#00251a] text-white"
    >
      {/* Photo: slow settle-in zoom (CSS) inside a scroll-driven drift (motion) */}
      <motion.div className="absolute inset-0" style={prefersReducedMotion ? undefined : { y: photoY }}>
        <div className="page-hero-zoom absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
        </div>
      </motion.div>

      {/* Legibility: deep fade from the bottom and the left, light vignette at the top for the header */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00251a] via-[#00251a]/55 to-[#00251a]/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#00251a]/80 via-[#00251a]/30 to-transparent pointer-events-none" />

      <motion.div
        className="max-container relative z-10 w-full pt-36 pb-14 sm:pb-16"
        style={prefersReducedMotion ? undefined : { opacity: copyOpacity }}
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="hero-enter flex items-center gap-2 text-xs uppercase tracking-[0.16em] mb-5"
          style={{ '--hero-delay': '0.05s' } as React.CSSProperties}
        >
          <Link href="/" className="text-[#d8e5dd] hover:text-white transition-colors no-underline">
            Home
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white font-semibold">{crumb}</span>
        </nav>

        {/* Mint Eyebrow */}
        <span
          className="hero-enter inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase text-secondary-fixed font-semibold mb-4"
          style={{ '--hero-delay': '0.15s' } as React.CSSProperties}
        >
          <span className="w-8 h-px bg-secondary-fixed" />
          {eyebrow}
        </span>

        {/* Title: revealed letter by letter, like the section headings */}
        <h1
          className="font-serif text-[clamp(2.2rem,4.6vw,3.9rem)] font-normal leading-[1.12] tracking-[-0.01em] max-w-4xl mb-5 drop-shadow-[0_3px_20px_rgba(0,0,0,0.45)]"
        >
          <SplitText text={title} delay={200} />
        </h1>

        <p
          className="hero-enter text-[#e6efe9] text-sm sm:text-base max-w-2xl leading-relaxed font-light"
          style={{ '--hero-delay': '0.65s' } as React.CSSProperties}
        >
          {description}
        </p>
      </motion.div>
    </section>
  );
}
