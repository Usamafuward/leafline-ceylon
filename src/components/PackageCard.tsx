'use client';

import React, { ViewTransition } from 'react';
import Link from 'next/link';
import { TourPackage } from '@/data/tours';
import { Clock, Star, Sun, Navigation, CheckCircle2, Car, Hotel, ArrowRight } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

interface PackageCardProps {
  tour: TourPackage;
  featured?: boolean;
}

// Clean canonical routes for each tour package to ensure beautiful single-line presentation
const TOUR_ROUTES: Record<string, string> = {
  'grand-ceylon-sanctuary-circuit': 'Sigiriya · Kandy · Hatton · Yala · Galle',
  'tea-trails-and-scenic-highlands': 'Kandy · Nuwara Eliya · Horton Plains · Ella',
  'wild-ceylon-safari-and-leopards': 'Udawalawe · Yala Safari · Bundala · Mirissa',
  'pearl-of-ceylon-luxury-honeymoon': 'Sigiriya · Tea Trails · Mirissa · Galle',
  'ancient-kingdoms-and-sacred-trails': 'Anuradhapura · Sigiriya · Polonnaruwa · Kandy',
  'cultural-triangle-and-ancient-kingdoms': 'Anuradhapura · Sigiriya · Polonnaruwa · Kandy',
  'southern-ocean-blue-whales-and-galle': 'Bentota · Weligama · Mirissa · Galle Fort',
};

const TOUR_STYLES: Record<string, string> = {
  heritage: 'Heritage & Culture',
  tea: 'Highland Tea & Mist',
  wildlife: 'Wildlife & Safari',
  honeymoon: 'Luxury Honeymoon',
  ocean: 'Coastal & Marine',
  trekking: 'Highland Trekking',
};

// Concise clean season string that never overflows
function formatSeason(season: string): string {
  if (!season) return 'Year-Round';
  if (season.includes('Dec–Apr') || season.includes('Dec-Apr')) return 'Dec – Apr';
  if (season.includes('Feb–Oct') || season.includes('Feb-Oct')) return 'Feb – Oct';
  if (season.includes('Oct – May') || season.includes('Oct–May')) return 'Oct – May';
  if (season.includes('Nov – Apr') || season.includes('Nov-Apr')) return 'Nov – Apr';
  return season.replace(/Year-Round\s*\(/i, '').replace(/\)/, '').trim();
}

// Curated 2-line highlights that fit with zero awkward clipping
const TOUR_CURATED_HIGHLIGHTS: Record<string, string[]> = {
  'grand-ceylon-sanctuary-circuit': [
    'VIP private sunrise ascent of Sigiriya Rock Fortress',
    'Relais & Châteaux Tea Trails colonial estate stay',
  ],
  'tea-trails-and-scenic-highlands': [
    'Kandy Royal Botanical Gardens & Temple of the Tooth',
    'Scenic first-class blue train ride through mountain ravines',
  ],
  'wild-ceylon-safari-and-leopards': [
    '6 private 4x4 leopard game drives in Yala National Park',
    'Wild elephant herds & oceanfront tented glamping',
  ],
  'pearl-of-ceylon-luxury-honeymoon': [
    'Sunrise hot air balloon flight over jungle canopy',
    'Private candlelit dinners in Sigiriya water gardens',
  ],
  'ancient-kingdoms-and-sacred-trails': [
    'Sacred Bodhi Tree & Anuradhapura white stupas',
    'Ancient royal capital of Polonnaruwa with historian',
  ],
  'cultural-triangle-and-ancient-kingdoms': [
    'Sacred Bodhi Tree & Anuradhapura white stupas',
    'Ancient royal capital of Polonnaruwa with historian',
  ],
  'southern-ocean-blue-whales-and-galle': [
    'Private chartered luxury catamaran for Blue Whale sightings',
    'Amangalla veranda high tea and Galle Fort ramparts walk',
  ],
};

export default function PackageCard({ tour }: PackageCardProps) {
  const { formatPrice } = useCurrency();
  const routeText =
    TOUR_ROUTES[tour.slug] ||
    Array.from(
      new Set(
        tour.itinerary
          ?.map((d) => d.location.split('&')[0].split('/')[0].trim())
          .filter(Boolean) || []
      )
    )
      .slice(0, 4)
      .join(' · ');

  const styleLabel = TOUR_STYLES[tour.style] || 'Curated Circuit';
  const seasonLabel = formatSeason(tour.idealSeason);
  const highlights = TOUR_CURATED_HIGHLIGHTS[tour.slug] || tour.highlights.slice(0, 2);

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[rgba(16,60,46,0.1)] hover:border-[rgba(46,105,81,0.4)] shadow-[0_6px_20px_-4px_rgba(0,37,26,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(0,37,26,0.15),0_0_0_1px_rgba(178,240,209,0.35)] hover:-translate-y-1.5 transition-all duration-350 ease-out relative h-full">
      {/* 1. CINEMATIC IMAGE HEADER */}
      <div className="relative h-[240px] overflow-hidden bg-[#00251a]">
        {/* Shared element: morphs into the package detail header on navigation */}
        <ViewTransition name={`tour-photo-${tour.slug}`} share="tour-morph" default="none">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={tour.heroImage}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
            />

            {/* Ambient Gradient Overlays for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,37,26,0.85)] via-[rgba(0,37,26,0.15)] to-black/40 pointer-events-none" />
          </div>
        </ViewTransition>

        {/* TOP FLOATING BADGES (Duration & Rating) */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-[2]">
          {/* Duration Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(0,37,26,0.85)] backdrop-blur-md border border-[rgba(178,240,209,0.3)] text-secondary-fixed text-[0.72rem] font-bold tracking-wider uppercase">
            <Clock className="w-3.5 h-3.5 leading-none" />
            <span>{tour.duration}</span>
          </div>

          {/* Rating Pill */}
          <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-primary text-[0.75rem] font-bold">
            <Star className="w-3.5 h-3.5 text-secondary fill-secondary leading-none shrink-0" />
            <span>{tour.rating.toFixed(2)}</span>
            <span className="text-[#5e7068] font-medium text-[0.7rem]">
              ({tour.reviewsCount})
            </span>
          </div>
        </div>

        {/* BOTTOM IMAGE STRIP (Style Pill & Season) */}
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between z-[2] gap-2">
          {/* Style Pill */}
          <span className="inline-block px-2.5 py-1 rounded-md bg-[rgba(0,37,26,0.85)] backdrop-blur-md border border-[rgba(178,240,209,0.25)] text-white text-[0.68rem] font-semibold tracking-wide whitespace-nowrap">
            {styleLabel}
          </span>

          {/* Season Indicator */}
          <span className="text-[0.72rem] font-semibold tracking-wider text-secondary-fixed inline-flex items-center gap-1 whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            <Sun className="w-3.5 h-3.5 leading-none text-secondary-fixed shrink-0" />
            <span>Best: {seasonLabel}</span>
          </span>
        </div>
      </div>

      {/* 2. CARD BODY */}
      <div className="p-[1.4rem_1.5rem_1.5rem_1.5rem] flex flex-col flex-1">
        {/* Route Ribbon (Single Line with fixed height) */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(16,60,46,0.04)] border border-[rgba(16,60,46,0.07)] mb-3.5 h-[34px] box-border">
          <Navigation className="w-3.5 h-3.5 text-secondary shrink-0" />
          <span className="text-[0.74rem] text-[#1a3328] font-semibold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
            {routeText}
          </span>
        </div>

        {/* Title (Consistent 2-line height) */}
        <h3 className="font-serif text-[1.3rem] font-semibold text-primary group-hover:text-secondary leading-[1.3] mb-2 h-[3.4rem] line-clamp-2 transition-colors duration-250">
          {tour.title}
        </h3>

        {/* Tagline (Consistent 2-line height) */}
        <p className="text-[0.84rem] text-on-surface-variant leading-relaxed mb-4 h-[2.55rem] line-clamp-2">
          {tour.tagline}
        </p>

        {/* Highlights List (Consistent height) */}
        <div className="flex flex-col gap-2 mb-4.5 h-[3.6rem] overflow-hidden">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-[0.78rem] text-[#26352e] leading-snug whitespace-nowrap overflow-hidden text-ellipsis"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis font-medium">
                {highlight}
              </span>
            </div>
          ))}
        </div>

        {/* Inclusions Spec Strip (Fixed height) */}
        <div className="grid grid-cols-2 gap-2 px-3.5 py-2 bg-surface-container-low rounded-lg mb-5 text-[0.74rem] text-on-surface-variant h-[38px] box-border items-center">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <Car className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              Private AC SUV
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-hidden">
            <Hotel className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              5-Star &amp; Planters
            </span>
          </div>
        </div>

        {/* 3. CARD FOOTER (Price & CTA Button) */}
        <div className="mt-auto pt-4.5 border-t border-surface-container-high flex items-center justify-between gap-3">
          {/* Price Block */}
          <div>
            <span className="text-[0.65rem] text-outline uppercase tracking-wider font-semibold block mb-0.5">
              All-Inclusive From
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="font-serif text-[1.45rem] font-bold text-primary leading-none">
                {formatPrice(tour.pricePerPerson)}
              </span>
              <span className="text-[0.72rem] text-outline font-medium ml-0.5">
                / traveler
              </span>
            </div>
          </div>

          {/* Action CTA Button */}
          <Link
            href={`/packages/${tour.slug}`}
            className="inline-flex items-center gap-1.5 bg-primary group-hover:bg-primary-container text-white px-5 py-2.5 rounded-full text-[0.8rem] font-semibold tracking-wide no-underline shadow-[0_3px_8px_-2px_rgba(0,37,26,0.2)] group-hover:shadow-[0_6px_16px_-2px_rgba(0,37,26,0.35)] transition-all duration-250 whitespace-nowrap"
          >
            <span>Explore Circuit</span>
            <ArrowRight className="w-3.5 h-3.5 leading-none group-hover:translate-x-1 transition-transform duration-250 text-secondary-fixed shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
