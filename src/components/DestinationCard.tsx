'use client';

import React from 'react';
import Link from 'next/link';
import { Destination } from '@/data/destinations';
import { motion } from 'motion/react';
import { MapPin, Moon, Sun, ArrowRight } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onClick?: () => void;
  // Shared-element id: the photo morphs into whatever else on the page renders this id
  photoLayoutId?: string;
}

// Clean concise season format for badges
function formatSeason(season: string): string {
  if (!season) return 'Year-Round';
  if (season.includes('Dec–Apr') || season.includes('Dec-Apr') || season.includes('December to April')) return 'Dec – Apr';
  if (season.includes('Dec–May') || season.includes('Dec-May') || season.includes('December to May')) return 'Dec – May';
  if (season.includes('Feb–Jun') || season.includes('Feb-Jun') || season.includes('February to June')) return 'Feb – Jun';
  if (season.includes('Jan–May') || season.includes('Jan-May') || season.includes('January to May')) return 'Jan – May';
  return season.split('(')[0].trim();
}

export default function DestinationCard({ destination, onClick, photoLayoutId }: DestinationCardProps) {
  const seasonLabel = formatSeason(destination.bestTime);
  const topHighlights = destination.highlights?.slice(0, 2) || [];

  const CardWrapper = onClick ? 'div' : Link;
  const wrapperProps = onClick
    ? {
      onClick,
      role: 'button',
      tabIndex: 0,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      },
    }
    : { href: `/destinations#${destination.slug}` };

  return (
    // @ts-expect-error dynamic wrapper polymorphism
    <CardWrapper
      {...wrapperProps}
      // A static copy of the photo behind the shared one, so the card never looks empty
      // while its photo is away in (or flying back from) the detail modal
      style={{
        backgroundImage: `url(${destination.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="group no-underline flex flex-col relative h-[460px] rounded-3xl overflow-hidden border border-[rgba(16,60,46,0.15)] hover:border-[rgba(178,240,209,0.45)] shadow-[0_8px_25px_-6px_rgba(0,37,26,0.1)] hover:shadow-[0_24px_50px_-10px_rgba(0,37,26,0.28),0_0_0_1px_rgba(178,240,209,0.3)] hover:-translate-y-1.5 transition-all duration-400 ease-out bg-[#00251a] cursor-pointer text-left"
    >
      {/* 1. CINEMATIC HERO IMAGE WITH SMOOTH SCALE
          (with photoLayoutId, this photo morphs into the matching detail modal's header) */}
      <motion.div
        layoutId={photoLayoutId}
        className="absolute inset-0 overflow-hidden"
        style={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-800 ease-out"
        />
      </motion.div>

      {/* 2. MULTI-LAYER AMBIENT GRADIENTS FOR LEGIBILITY & LUXURY */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,37,26,0.65)] via-[rgba(0,37,26,0.15)] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,37,26,0.98)] via-[rgba(0,37,26,0.8)] to-transparent pointer-events-none" />

      {/* 3. TOP FLOATING GLASSMORPHIC BADGES */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-2 z-[2]">
        {/* Region Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(0,37,26,0.75)] backdrop-blur-md border border-[rgba(178,240,209,0.25)] text-secondary-fixed text-[0.7rem] font-bold tracking-wider uppercase">
          <MapPin className="w-3.5 h-3.5 leading-none shrink-0" />
          <span>{destination.region}</span>
        </div>

        {/* Recommended Nights Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[0.72rem] font-semibold">
          <Moon className="w-3.5 h-3.5 leading-none shrink-0" />
          <span>{destination.recommendedNights} Nights</span>
        </div>
      </div>

      {/* 4. CARD CONTENT AREA (Bottom Anchored) */}
      <div className="mt-auto relative z-[2] p-7 flex flex-col gap-2.5 text-white">
        {/* Season & Best Time Indicator */}
        <div className="inline-flex items-center gap-1.5 text-secondary-fixed text-[0.74rem] font-semibold tracking-wider uppercase">
          <Sun className="w-3.5 h-3.5 leading-none text-secondary-fixed shrink-0" />
          <span>Optimal Season: {seasonLabel}</span>
        </div>

        {/* Destination Name */}
        <h3 className="font-serif text-[1.45rem] font-semibold leading-[1.22] m-0 text-white group-hover:text-secondary-fixed transition-colors duration-250">
          {destination.name}
        </h3>

        {/* Subtitle / Essence */}
        <p className="text-[0.84rem] text-[rgba(225,238,230,0.9)] leading-relaxed m-0 line-clamp-2">
          {destination.subtitle}
        </p>

        {/* Curated Highlights Micro-Chips */}
        {topHighlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {topHighlights.map((hl, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-[0.7rem] text-white/90 bg-white/10 backdrop-blur-sm border border-white/15 px-2 py-1 rounded-md whitespace-nowrap max-w-full overflow-hidden text-ellipsis"
              >
                <span className="w-1 h-1 rounded-full bg-secondary-fixed shrink-0" />
                <span className="overflow-hidden text-ellipsis">
                  {hl.replace(/^UNESCO\s*/i, '').split('&')[0].trim()}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Action Row: Discover Enclave */}
        <div className="flex items-center justify-between pt-3.5 mt-1.5 border-t border-white/12 text-[0.82rem] font-semibold text-secondary-fixed">
          <span>Discover Sanctuary</span>
          <div className="w-8 h-8 rounded-full bg-white/12 group-hover:bg-secondary-fixed text-white group-hover:text-primary flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 ease-out">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
