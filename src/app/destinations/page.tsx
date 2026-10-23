'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DESTINATIONS_DATA, Destination } from '@/data/destinations';
import DestinationCard from '@/components/DestinationCard';
import { ChevronDown, X, Sun, ArrowRight, Sunset } from 'lucide-react';

const REGION_TABS = [
  { id: 'all', label: 'All Destinations (6)' },
  { id: 'cultural', label: 'Cultural Triangle & Sigiriya' },
  { id: 'central', label: 'Central Highlands & Tea Country' },
  { id: 'yala', label: 'Wild Yala & Safaris' },
  { id: 'south', label: 'Southern Coast & Galle Fort' },
];

export default function DestinationsPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);

  const filtered = selectedRegion === 'all'
    ? DESTINATIONS_DATA
    : DESTINATIONS_DATA.filter((d) => {
      if (selectedRegion === 'cultural') return d.slug.includes('sigiriya');
      if (selectedRegion === 'central') return d.slug.includes('tea') || d.slug.includes('ella') || d.slug.includes('kandy');
      if (selectedRegion === 'yala') return d.slug.includes('yala');
      if (selectedRegion === 'south') return d.slug.includes('mirissa') || d.slug.includes('galle');
      return true;
    });

  return (
    <div className="flex flex-col w-full">
      {/* 1. CINEMATIC HERO BANNER */}
      <section className="w-full bg-[#00251a] text-white pt-28 sm:pt-32 pb-16 relative overflow-hidden">
        <img
          src="/images/sigiriya_rock_ancient_steps_sunset.jpg"
          alt="Sigiriya Citadel"
          className="absolute inset-0 w-full h-full object-cover object-[center_40%] opacity-30 saturate-[0.85] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00251a]/85 via-[#103c2e]/60 to-[#00251a]/95 pointer-events-none" />

        <div className="max-container relative z-10">
          {/* Breadcrumb */}
          <nav className="reveal-text flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-secondary-fixed mb-5">
            <Link href="/" className="text-[#d8e5dd] hover:text-white transition-colors no-underline">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-white font-semibold">Destinations</span>
          </nav>

          <span className="reveal-text inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] tracking-[0.2em] uppercase text-secondary-fixed font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
            ISLAND SANCTUARIES &amp; REGIONS
          </span>

          <h1 className="reveal-text stagger-1 font-serif text-[clamp(2.2rem,4.4vw,3.6rem)] font-normal leading-[1.18] max-w-4xl mb-4">
            The Diverse Realms of Sri Lanka
          </h1>

          <p className="reveal-text stagger-2 text-[#f0f5f2] text-sm sm:text-base max-w-3xl leading-relaxed font-light">
            Within just four hours of scenic travel, transition from golden Indian Ocean shores to 2,000-meter alpine cloud forests and ancient UNESCO kingdom citadels.
          </p>
        </div>
      </section>

      {/* 2. REFINED FILTER BAR */}
      <section className="w-full bg-white border-b border-[#e3eae5] z-30 backdrop-blur-md py-3.5 shadow-xs">
        <div className="max-container">
          {/* Mobile Styled Dropdown */}
          <div className="relative md:hidden w-full max-w-sm">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-full bg-[#edf4ef] border border-[#cbdcd1] text-xs font-semibold text-primary outline-none focus:border-[#0c5037] cursor-pointer"
            >
              {REGION_TABS.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline" />
          </div>

          {/* Desktop Filter Pills */}
          <div className="hidden md:flex gap-2 overflow-x-auto no-scrollbar items-center">
            {REGION_TABS.map((tab) => {
              const isActive = selectedRegion === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-4.5 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white text-on-surface-variant border border-surface-container hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. DESTINATIONS GRID */}
      <section className="w-full py-16 sm:py-20 bg-[#edf4ef]">
        <div className="max-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((dest, idx) => (
              <div key={dest.id} id={dest.slug} className={`reveal-card stagger-${(idx % 3) + 1} h-full`}>
                <DestinationCard
                  destination={dest}
                  onClick={() => setActiveDestination(dest)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DETAIL MODAL */}
      {activeDestination && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveDestination(null)}
          className="fixed inset-0 z-50 bg-[#00251a]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-[#e3eae5]"
          >
            {/* Modal Image Header */}
            <div className="relative w-full h-64 sm:h-72 bg-[#00251a]">
              <img
                src={activeDestination.heroImage}
                alt={activeDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveDestination(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 flex items-center justify-center cursor-pointer transition-colors hover:bg-black/75 z-10"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              {/* Header Badges & Title */}
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-3 py-0.5 rounded-full bg-[#00251a]/80 backdrop-blur-sm text-secondary-fixed text-[11px] font-semibold uppercase tracking-wider">
                    {activeDestination.region}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[11px] font-medium">
                    Optimal Stay: {activeDestination.recommendedNights} Nights
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal m-0 text-white">
                  {activeDestination.name}
                </h2>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-7 flex flex-col gap-5">
              <span className="text-xs text-secondary font-semibold uppercase tracking-wider block">
                {activeDestination.subtitle}
              </span>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                {activeDestination.description}
              </p>

              {/* Best Season */}
              <div className="p-4 bg-[#edf4ef] rounded-xl flex items-center gap-3">
                <Sun className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-outline font-semibold block">
                    Optimal Travel Season
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {activeDestination.bestTime}
                  </span>
                </div>
              </div>

              {/* Highlights & Key Experiences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-2">
                <div>
                  <h4 className="font-serif text-base text-primary mb-2.5 font-semibold">
                    Highlights
                  </h4>
                  <ul className="space-y-2">
                    {activeDestination.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-on-surface-variant leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-serif text-base text-primary mb-2.5 font-semibold">
                    Signature Experiences
                  </h4>
                  <ul className="space-y-2">
                    {activeDestination.keyExperiences.map((exp, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-on-surface-variant leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#e3eae5]">
                <Link
                  href="/packages"
                  className="bg-primary hover:bg-secondary text-white hover:text-primary px-6 py-2.5 rounded-full font-medium text-xs sm:text-sm inline-flex items-center gap-2 transition-colors duration-200 no-underline"
                >
                  <span>Explore Packages Visiting Here</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>

                <Link
                  href="/plan-trip"
                  className="bg-white hover:bg-[#edf4ef] text-primary border border-surface-container px-6 py-2.5 rounded-full font-medium text-xs sm:text-sm inline-flex items-center gap-2 transition-colors duration-200 no-underline"
                >
                  <span>Add to Custom Itinerary</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SRI LANKA WEATHER & MONSOONS GUIDE */}
      <section className="w-full py-20 bg-white">
        <div className="max-container max-w-4xl">
          <div className="reveal-text text-center mb-10">
            <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
              LOCAL CLIMATE GUIDE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight mb-3">
              When is the Best Time to Visit Sri Lanka?
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              Because Sri Lanka is influenced by two distinct monsoon cycles on opposing coasts, there is warm tropical sunshine somewhere on the island 365 days a year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-7 bg-[#edf4ef] rounded-2xl border border-[#cbdcd1]/60">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-white text-secondary flex items-center justify-center shadow-xs">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-primary m-0">December to April</h3>
                  <span className="text-xs text-secondary font-medium">South &amp; West Coasts + Highlands</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed m-0">
                Peak dry season for Colombo, Galle Fort, Mirissa, and the Cultural Triangle. Calm ocean waters ideal for whale excursions and clear mountain rail journeys.
              </p>
            </div>

            <div className="p-7 bg-[#edf4ef] rounded-2xl border border-[#cbdcd1]/60">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-white text-secondary flex items-center justify-center shadow-xs">
                  <Sunset className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-primary m-0">May to September</h3>
                  <span className="text-xs text-secondary font-medium">East Coast &amp; Cultural Triangle</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed m-0">
                Pristine turquoise lagoons and world-class surfing along the East Coast (Passikudah, Trincomalee, Arugam Bay). Superb dry-season elephant gatherings in Minneriya.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
