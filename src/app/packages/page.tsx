'use client';

import SplitText from '@/components/ui/SplitText';
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TOURS_DATA } from '@/data/tours';
import PackageCard from '@/components/PackageCard';
import { useCurrency } from '@/context/CurrencyContext';
import PageHero from '@/components/PageHero';
import { motion, AnimatePresence } from 'motion/react';
import { gridItemMotion } from '@/components/ui/gridMotion';
import CountUp from '@/components/ui/CountUp';
import {
  Search,
  X,
  ChevronDown,
  RotateCcw,
  ArrowRight,
  Compass,
} from 'lucide-react';

const REGION_OPTIONS = [
  { value: 'all', label: 'All Regions' },
  { value: 'central', label: 'Central Highlands & Tea' },
  { value: 'cultural', label: 'Cultural Triangle & Sigiriya' },
  { value: 'south', label: 'Southern Coast & Galle' },
  { value: 'yala', label: 'Wild South & Safaris' },
];

const DURATION_OPTIONS = [
  { value: 'all', label: 'All Durations' },
  { value: 'short', label: 'Short Breaks (3–5 Nights)' },
  { value: 'classic', label: 'Classic Circuits (6–9 Nights)' },
  { value: 'grand', label: 'Grand Expeditions (10–14 Nights)' },
];

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'duration-desc', label: 'Duration: Long to Short' },
  { value: 'duration-asc', label: 'Duration: Short to Long' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const STYLE_TABS = [
  { id: 'all', label: 'All Styles (6)' },
  { id: 'heritage', label: 'Ancient Heritage' },
  { id: 'tea', label: 'Highland Tea & Mist' },
  { id: 'wildlife', label: 'Wildlife & Safari' },
  { id: 'honeymoon', label: 'Luxury Honeymoon' },
  { id: 'ocean', label: 'Coastal & Ocean' },
];

const FAQS = [
  {
    q: 'Can any itinerary be customized or reversed?',
    a: 'Yes, absolutely. Every tour package shown on our website is a flexible template. Our local travel specialists can adjust the daily pace, add or remove activities, change hotel categories, or reverse the route to match your flight times.',
  },
  {
    q: 'What vehicles and driver guides are included?',
    a: 'All tours include clean, modern, fully air-conditioned Toyota cars, vans, or SUVs with dedicated, government-licensed (SLTDA) English-speaking chauffeur guides who know the island thoroughly.',
  },
  {
    q: 'When is the best season for wildlife safaris in Yala?',
    a: 'Yala National Park offers wonderful wildlife sightings year-round, with February to July offering the dry season where animals gather around waterholes. Udawalawe and Minneriya are also excellent alternatives during seasonal shifts.',
  },
  {
    q: 'What are your booking deposit and cancellation terms?',
    a: 'We require a reasonable deposit upon itinerary confirmation to secure your hotels, train tickets, and driver reservation. The remaining balance is paid before arrival, and we offer flexible date changes without penalty.',
  },
];

function PackagesContent() {
  const { formatPrice } = useCurrency();
  const searchParams = useSearchParams();

  const paramStyle = searchParams.get('style');
  const paramDuration = searchParams.get('duration');
  const paramSearch = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(paramSearch);
  const [regionFilter, setRegionFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState(
    paramDuration && DURATION_OPTIONS.some((d) => d.value === paramDuration)
      ? paramDuration
      : 'all'
  );
  const [styleFilter, setStyleFilter] = useState(
    paramStyle && STYLE_TABS.some((s) => s.id === paramStyle) ? paramStyle : 'all'
  );
  const [sortBy, setSortBy] = useState('recommended');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (paramStyle && STYLE_TABS.some((s) => s.id === paramStyle)) {
      setStyleFilter(paramStyle);
    }
    if (paramDuration && DURATION_OPTIONS.some((d) => d.value === paramDuration)) {
      setDurationFilter(paramDuration);
    }
    if (paramSearch) {
      setSearchTerm(paramSearch);
    }
  }, [paramStyle, paramDuration, paramSearch]);

  const isFiltered =
    searchTerm.trim() !== '' ||
    regionFilter !== 'all' ||
    durationFilter !== 'all' ||
    styleFilter !== 'all' ||
    sortBy !== 'recommended';

  const resetFilters = () => {
    setSearchTerm('');
    setRegionFilter('all');
    setDurationFilter('all');
    setStyleFilter('all');
    setSortBy('recommended');
  };

  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      // Search query
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        tour.title.toLowerCase().includes(query) ||
        tour.tagline.toLowerCase().includes(query) ||
        tour.overview.toLowerCase().includes(query) ||
        tour.highlights.some((h) => h.toLowerCase().includes(query));

      // Region
      const matchesRegion =
        regionFilter === 'all' || tour.region === 'all' || tour.region === regionFilter;

      // Duration
      let matchesDuration = true;
      if (durationFilter === 'short') matchesDuration = tour.nights <= 5;
      else if (durationFilter === 'classic') matchesDuration = tour.nights >= 6 && tour.nights <= 9;
      else if (durationFilter === 'grand') matchesDuration = tour.nights >= 10;

      // Style
      let matchesStyle = true;
      if (styleFilter !== 'all') {
        matchesStyle = tour.style === styleFilter;
      }

      return matchesSearch && matchesRegion && matchesDuration && matchesStyle;
    }).sort((a, b) => {
      if (sortBy === 'duration-desc') return b.nights - a.nights;
      if (sortBy === 'duration-asc') return a.nights - b.nights;
      if (sortBy === 'price-asc') return a.pricePerPerson - b.pricePerPerson;
      if (sortBy === 'price-desc') return b.pricePerPerson - a.pricePerPerson;
      return b.rating - a.rating; // default recommended
    });
  }, [searchTerm, regionFilter, durationFilter, styleFilter, sortBy]);

  const featuredTour = TOURS_DATA[0];

  return (
    <div className="flex flex-col w-full">
      {/* 1. PHOTO HERO (shared across inner pages) */}
      <PageHero
        crumb="Packages"
        eyebrow="Curated Private Circuits"
        title="Private Sri Lanka Tour Packages"
        description="Thoughtfully planned private itineraries featuring ancient UNESCO fortresses, emerald tea estates, wild elephant safaris, and golden sandy beaches. Every journey is fully customizable."
        image="/images/nuwara_eliya_tea_estate_morning_clouds.webp"
        imageAlt="Tea estates of Nuwara Eliya in morning cloud"
        imagePosition="center 35%"
      />

      {/* 2. REFINED FILTER & SEARCH SUITE WITH APP-THEMED DROPDOWNS */}
      <section className="w-full bg-white/95 z-30 backdrop-blur-md border-b border-[#e3eae5] shadow-xs py-4">
        <div className="max-container flex flex-col gap-3">
          {/* Row 1: Search & Themed Dropdown Controls */}
          <div className="flex flex-wrap gap-2.5 items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city, safari, or landmark..."
                className="w-full py-2 pr-9 pl-10 rounded-full border border-[#cbdcd1] bg-[#edf4ef] text-xs font-medium text-primary outline-none transition-colors focus:border-[#0c5037] focus:bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary cursor-pointer flex items-center bg-transparent border-none"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Themed Dropdown Selects */}
            <div className="flex gap-2 flex-wrap items-center">
              {/* Region Filter Dropdown */}
              <div className="relative">
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className={`appearance-none pl-4 pr-8 py-2 rounded-full text-xs font-medium cursor-pointer outline-none transition-colors border ${
                    regionFilter !== 'all'
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-white text-on-surface-variant border-[#cbdcd1] hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {REGION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-white text-on-surface">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className={`w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                    regionFilter !== 'all' ? 'text-white' : 'text-outline'
                  }`}
                />
              </div>

              {/* Duration Filter Dropdown */}
              <div className="relative">
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className={`appearance-none pl-4 pr-8 py-2 rounded-full text-xs font-medium cursor-pointer outline-none transition-colors border ${
                    durationFilter !== 'all'
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-white text-on-surface-variant border-[#cbdcd1] hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {DURATION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-white text-on-surface">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className={`w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                    durationFilter !== 'all' ? 'text-white' : 'text-outline'
                  }`}
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`appearance-none pl-4 pr-8 py-2 rounded-full text-xs font-medium cursor-pointer outline-none transition-colors border ${
                    sortBy !== 'recommended'
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-white text-on-surface-variant border-[#cbdcd1] hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-white text-on-surface">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className={`w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                    sortBy !== 'recommended' ? 'text-white' : 'text-outline'
                  }`}
                />
              </div>

              {/* Reset Filters Pill */}
              {isFiltered && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Experience Style Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar items-center pt-1">
            {STYLE_TABS.map((tab) => {
              const isActive = styleFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStyleFilter(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-colors duration-200 cursor-pointer ${
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

      {/* 3. SEASONAL SPOTLIGHT (Cleaned Up & Uncluttered, only shown on default view) */}
      {!isFiltered && featuredTour && (
        <section className="w-full py-12 bg-white">
          <div className="max-container">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold">
                SEASONAL SPOTLIGHT
              </span>
              <span className="text-xs text-outline font-medium">
                Flagship Ceylon Circuit
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl overflow-hidden border border-[#e3eae5] shadow-xs">
              {/* Photo */}
              <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[360px] overflow-hidden">
                <img
                  src={featuredTour.heroImage}
                  alt={featuredTour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-secondary-fixed block mb-1">
                    Signature Route
                  </span>
                  <p className="text-xs sm:text-sm text-[#e3eae5] m-0 font-medium">
                    Sigiriya · Kandy · Hatton · Yala · Galle Fort
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                      {featuredTour.duration}
                    </span>
                    <span className="text-outline-variant">•</span>
                    <span className="text-xs text-secondary font-semibold">
                      ★ {featuredTour.rating} ({featuredTour.reviewsCount} Reviews)
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal leading-tight mb-3">
                    {featuredTour.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                    {featuredTour.overview}
                  </p>

                  <ul className="space-y-1.5 mb-6">
                    {featuredTour.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-on-surface-variant">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#e3eae5] flex-wrap gap-3">
                  <div>
                    <span className="text-[11px] text-outline uppercase tracking-wider font-semibold block">
                      From
                    </span>
                    <span className="text-2xl font-serif font-normal text-primary">
                      {formatPrice(featuredTour.pricePerPerson)}
                      <span className="text-xs font-sans text-outline font-normal ml-1">/ person</span>
                    </span>
                  </div>

                  <Link
                    href={`/packages/${featuredTour.slug}`}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white hover:text-primary px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 no-underline shadow-xs"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. EXPEDITIONS CATALOG GRID */}
      <section className="w-full py-16 sm:py-20 bg-[#edf4ef]">
        <div className="max-container">
          {/* Header count */}
          <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal m-0">
                {isFiltered ? 'Matching Expeditions' : 'Curated Private Tour Packages'}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1 mb-0">
                Showing <strong><CountUp key={filteredTours.length} value={filteredTours.length} duration={0.6} /></strong> private circuits &bull; 100% customizable
              </p>
            </div>

            {isFiltered && (
              <button
                onClick={resetFilters}
                className="text-xs text-secondary hover:underline bg-transparent border-none cursor-pointer font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredTours.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#e3eae5]">
              <Compass className="w-10 h-10 text-outline mb-3 mx-auto" />
              <h3 className="font-serif text-xl text-primary mb-2">
                No Journeys Match Your Selected Filters
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-5">
                Try widening your duration range, changing regions, or resetting filters.
              </p>
              <button
                onClick={resetFilters}
                className="bg-primary hover:bg-secondary text-white hover:text-primary px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition-colors duration-200"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredTours.map((tour, idx) => (
                  <motion.div key={tour.id} id={tour.slug} className="h-full" {...gridItemMotion(idx)}>
                    <PackageCard tour={tour} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS (Pure white background) */}
      <section className="w-full py-20 bg-white">
        <div className="max-container max-w-3xl">
          <div className="reveal-text text-center mb-10">
            <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
              PLANNING GUIDANCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight">
              <SplitText text="Frequently Asked Questions" />
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-colors overflow-hidden ${
                    isOpen
                      ? 'bg-[#edf4ef] border-[#cbdcd1]'
                      : 'bg-white border-[#e3eae5] hover:border-outline-variant'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4.5 sm:px-6 flex items-center justify-between text-left cursor-pointer bg-transparent border-none"
                  >
                    <span className="font-serif text-base font-semibold text-primary">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'text-secondary rotate-180' : 'text-outline rotate-0'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4.5 pb-4.5 sm:px-6 sm:pb-5 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-[#e3eae5]/80">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="w-full py-24 bg-surface">
        <div className="max-container">
          <div className="reveal-card bg-[#103c2e] rounded-3xl p-8 sm:p-14 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(178,240,209,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="reveal-text text-xs tracking-[0.22em] uppercase text-secondary-fixed font-semibold block mb-4">
                CUSTOM TOUR PLANNING
              </span>
              <h2 className="reveal-text stagger-1 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5">
                <SplitText text="Prefer a Custom Private Itinerary?" />
              </h2>
              <p className="reveal-text stagger-2 text-base text-[#dde4df] leading-relaxed mb-10 max-w-2xl mx-auto">
                Tell us where you want to go, what you want to see, and your travel dates. We will design a personalized itinerary with clear, honest pricing within 24 hours.
              </p>
              <div className="reveal-up stagger-3 flex flex-wrap gap-4 justify-center">
                <Link
                  href="/plan-trip"
                  className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-10 py-4 rounded-full text-base font-semibold tracking-wide shadow-lg hover:bg-secondary-fixed hover:text-primary transition-all duration-300 hover:-translate-y-0.5 no-underline"
                >
                  <span>Plan Your Custom Tour</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/12 text-white backdrop-blur-md px-10 py-4 rounded-full text-base font-semibold tracking-wide border border-white/30 hover:bg-white/25 hover:border-white transition-all duration-300 hover:-translate-y-0.5 no-underline"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#00251a]" />}>
      <PackagesContent />
    </Suspense>
  );
}
