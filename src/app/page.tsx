'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TOURS_DATA } from '@/data/tours';
import { DESTINATIONS_DATA } from '@/data/destinations';
import { REVIEWS_DATA } from '@/data/reviews';
import PackageCard from '@/components/PackageCard';
import ReviewCard from '@/components/ReviewCard';
import CeylonRegionExplorer from '@/components/CeylonRegionExplorer';
import SignatureExperiencesSlider from '@/components/SignatureExperiencesSlider';
import {
  ArrowRight,
  Compass,
  Route,
  Armchair,
  Headset,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';


// Curated Ceylon Sanctuary Scenes for Auto-Changing Hero Background
const HERO_SLIDES = [
  {
    image: '/images/sigiriya_rock_aerial_drone_sunset.jpg',
    tag: 'ANCIENT SKY CITADEL',
    location: 'Sigiriya Rock Fortress',
    region: 'Cultural Triangle',
  },
  {
    image: '/images/ella_scenic_mountain_train.jpg',
    tag: 'HIGHLAND TEA SANCTUARY',
    location: 'Ceylon Tea Country & Rail',
    region: 'Central Highlands',
  },
  {
    image: '/images/yala_safari_jeep_elephant_encounter.jpg',
    tag: 'WILD SAFARI EXPEDITIONS',
    location: 'Yala National Park',
    region: 'Southern Wildlife Reserves',
  },
  {
    image: '/images/ella_nine_arch_bridge_train_crossing.jpg',
    tag: 'COLONIAL HERITAGE VIADUCT',
    location: 'Demodara Nine Arch Bridge',
    region: 'Ella Mountain Pass',
  },
  {
    image: '/images/sri_lanka_traditional_stilt_fishermen_gold.jpg',
    tag: 'GOLDEN OCEAN TRADITIONS',
    location: 'Stilt Fishermen & Southern Coast',
    region: 'Mirissa & Weligama Bay',
  },
];

export default function HomePage() {
  const featuredTours = TOURS_DATA.slice(0, 3);
  const featuredDestinations = DESTINATIONS_DATA.slice(0, 4);

  // Auto-changing hero slide state (cycles every 5 seconds with smooth transition)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Track scroll position to hide Trust Capsule at top of hero, and smoothly slide it up when scrolling starts
  const [hasScrolledPastTop, setHasScrolledPastTop] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const handleScroll = () => {
      // Hide capsule when at the top of hero (<= 40px) for an unobstructed view; slide up once scrolling starts (> 40px)
      setHasScrolledPastTop(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: CINEMATIC HERO WITH AUTO-CHANGING BACKGROUND (FULL SCREEN HEIGHT) */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full min-h-screen h-screen flex items-center justify-center overflow-hidden bg-[#00251a]"
      >
        {/* Layered Background Slides with Smooth Cross-Fade & Ken Burns Zoom */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.location}
              className={`absolute inset-0 w-full h-full object-cover object-[center_40%] pointer-events-none transition-all duration-1000 ease-out ${isActive ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
            />
          );
        })}

        {/* Crystal-Clear Subtle Contrast Scrim (No Muddy Overlays) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-[#00140e]/60 pointer-events-none" />

        {/* Hero Content */}
        <div className="max-container relative z-10 w-full pt-34 pb-18 flex flex-col items-center text-center">
          {/* Dynamic Editorial Badge with Live Sanctuary Tag */}
          <div className="reveal-text inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/12 backdrop-blur-md border border-white/28 mb-8 shadow-xl">
            <span className="pulse-dot" />
            <span className="text-xs text-secondary-fixed tracking-[0.24em] uppercase font-semibold transition-all duration-300">
              DISCOVER SRI LANKA • {HERO_SLIDES[currentSlide].tag}
            </span>
          </div>

          {/* Main Editorial Headline - Single Line on Desktop */}
          <h1 className="reveal-text stagger-1 font-serif text-[clamp(2.2rem,4.4vw,4.25rem)] text-white font-normal max-w-[1200px] w-full leading-[1.15] tracking-[-0.015em] mb-5 drop-shadow-[0_3px_20px_rgba(0,0,0,0.6)]">
            Journeys Beyond the Ordinary
          </h1>

          {/* Supporting Narrative */}
          <p className="reveal-text stagger-2 font-sans text-[clamp(1rem,1.8vw,1.2rem)] text-[#f0f5f2] max-w-[720px] font-light leading-relaxed mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            Experience the authentic beauty, ancient culture, and untamed wildlife of Sri Lanka through handcrafted private itineraries designed entirely around you.
          </p>

          {/* Dual Action Buttons */}
          <div className="reveal-up stagger-3 flex flex-wrap gap-5 justify-center items-center">
            <Link
              href="/packages"
              className="bg-white hover:bg-secondary-fixed text-[#00251a] px-9 py-4 text-[0.95rem] font-semibold tracking-wide rounded-full whitespace-nowrap inline-flex items-center gap-2 shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300 no-underline"
            >
              <span>Explore Our Journeys</span>
              <ArrowRight className="w-[18px] h-[18px] shrink-0" />
            </Link>
            <Link
              href="/plan-trip"
              className="bg-white/12 hover:bg-white/25 text-white border-[1.5px] border-white/65 hover:border-white px-9 py-4 text-[0.95rem] font-semibold tracking-wide rounded-full whitespace-nowrap inline-flex items-center backdrop-blur-md hover:-translate-y-0.5 transition-all duration-300 no-underline"
            >
              <span>Plan Your Trip</span>
            </Link>
          </div>

          {/* Scroll Cue Indicator */}
          <div className="reveal-up stagger-4 mt-16 flex flex-col items-center gap-2 opacity-80">
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#e3eae5]">
              SCROLL TO EXPLORE
            </span>
            <div className="w-px h-7 bg-gradient-to-b from-secondary-fixed to-transparent" />
          </div>
        </div>
      </section>

      {/* SECTION 2: LUXURY TRUST & ASSURANCE CAPSULE */}
      <section className="w-full pt-0 relative z-20 overflow-visible bg-[#edf4ef]">
        <div className="max-container">
          {/* Overlapping Glassmorphic Capsule Bridge */}
          <div
            className={`-mt-10 sm:-mt-16 lg:-mt-14 bg-[#103c2e]/92 hover:bg-[#103c2e]/96 text-white border border-white/20 hover:border-[#b2f0d1]/45 backdrop-blur-xl rounded-3xl lg:rounded-full p-5 sm:p-6 lg:py-4.5 lg:px-8  max-w-6xl mx-auto transition-all duration-700 cubic-bezier(0.16,1,0.3,1) ${hasScrolledPastTop
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-20 pointer-events-none'
              }`}
          >

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0 lg:divide-x lg:divide-white/15 items-center">
              {/* Pillar 1 */}
              <div className="group flex items-center gap-3.5 py-1.5 px-3 lg:px-5 lg:first:pl-2 rounded-2xl lg:rounded-full cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center text-secondary-fixed shadow-[0_4px_14px_rgba(0,0,0,0.15)] group-hover:scale-105 group-hover:bg-secondary-fixed/25 group-hover:border-secondary-fixed/60 group-hover:shadow-[0_6px_20px_rgba(178,240,209,0.35)] transition-all duration-300 shrink-0">
                  <Compass className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[0.93rem] text-white font-semibold tracking-tight group-hover:text-secondary-fixed transition-colors duration-200 whitespace-nowrap">
                    Trusted Local Experts
                  </h3>
                  <p className="text-[0.82rem] text-[#c0c8c3] group-hover:text-white transition-colors mt-0.5 leading-snug">
                    SLTDA Licensed Specialists
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="group flex items-center gap-3.5 py-1.5 px-3 lg:px-5 rounded-2xl lg:rounded-full cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center text-secondary-fixed shadow-[0_4px_14px_rgba(0,0,0,0.15)] group-hover:scale-105 group-hover:bg-secondary-fixed/25 group-hover:border-secondary-fixed/60 group-hover:shadow-[0_6px_20px_rgba(178,240,209,0.35)] transition-all duration-300 shrink-0">
                  <Route className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[0.93rem] text-white font-semibold tracking-tight group-hover:text-secondary-fixed transition-colors duration-200 whitespace-nowrap">
                    Tailor-Made Circuits
                  </h3>
                  <p className="text-[0.82rem] text-[#c0c8c3] group-hover:text-white transition-colors mt-0.5 leading-snug">
                    100% Private Chauffeured
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="group flex items-center gap-3.5 py-1.5 px-3 lg:px-5 rounded-2xl lg:rounded-full cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center text-secondary-fixed shadow-[0_4px_14px_rgba(0,0,0,0.15)] group-hover:scale-105 group-hover:bg-secondary-fixed/25 group-hover:border-secondary-fixed/60 group-hover:shadow-[0_6px_20px_rgba(178,240,209,0.35)] transition-all duration-300 shrink-0">
                  <Armchair className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[0.93rem] text-white font-semibold tracking-tight group-hover:text-secondary-fixed transition-colors duration-200 whitespace-nowrap">
                    Private &amp; Comfortable
                  </h3>
                  <p className="text-[0.82rem] text-[#c0c8c3] group-hover:text-white transition-colors mt-0.5 leading-snug">
                    Premium Climate Fleet
                  </p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="group flex items-center gap-3.5 py-1.5 px-3 lg:px-5 lg:last:pr-2 rounded-2xl lg:rounded-full cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center text-secondary-fixed shadow-[0_4px_14px_rgba(0,0,0,0.15)] group-hover:scale-105 group-hover:bg-secondary-fixed/25 group-hover:border-secondary-fixed/60 group-hover:shadow-[0_6px_20px_rgba(178,240,209,0.35)] transition-all duration-300 shrink-0">
                  <Headset className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[0.93rem] text-white font-semibold tracking-tight group-hover:text-secondary-fixed transition-colors duration-200 whitespace-nowrap">
                    24/7 Concierge Care
                  </h3>
                  <p className="text-[0.82rem] text-[#c0c8c3] group-hover:text-white transition-colors mt-0.5 leading-snug">
                    Dedicated Colombo HQ Team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 3: REGIONAL CEYLON TRAVEL EXPLORER (INTERACTIVE MAP & REGION SHOWCASE) */}
      <CeylonRegionExplorer />

      {/* SECTION 4: POPULAR DESTINATIONS */}
      <section className="w-full py-24 bg-white">

        <div className="max-container">
          <div className="reveal-text flex flex-col justify-between mb-14 gap-4">
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
                POPULAR DESTINATIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight">
                Explore Sri Lanka
              </h2>
            </div>
            <p className="text-on-surface-variant text-sm sm:text-base max-w-2xl leading-relaxed">
              From misty mountain tea hills and ancient UNESCO rock fortresses to wild elephant safaris and tropical golden beaches.
            </p>
          </div>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {featuredDestinations.map((dest, idx) => (
              <div key={dest.id} className={`reveal-image stagger-${(idx % 4) + 1} h-[420px]`}>
                <Link
                  href={`/destinations#${dest.slug}`}
                  className="group flex flex-col relative h-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 no-underline border border-[#e3eae5] bg-white block"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />
                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00251a]/90 via-[#00251a]/30 to-transparent" />

                    {/* Card Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                      <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-secondary-fixed font-semibold mb-1.5">
                        {dest.region}
                      </span>
                      <h3 className="font-serif text-2xl font-semibold leading-tight mb-2">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-[#dde4df] leading-relaxed line-clamp-2">
                        {dest.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="reveal-up text-center mt-12">
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center gap-2 bg-primary-container text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide border border-[#b2f0d1]/20 hover:bg-secondary hover:border-secondary-fixed transition-all duration-300 hover:-translate-y-0.5 no-underline shadow-md"
            >
              <span>View All Destinations</span>
              <ArrowRight className="w-[18px] h-[18px] shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED SIGNATURE EXPEDITIONS (PackageCard Preserved) */}
      <section className="w-full py-24 bg-surface-container-low">
        <div className="max-container">
          <div className="reveal-text flex flex-col mb-14">
            <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
              CURATED SRI LANKA TOURS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight">
              Popular Tour Packages
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Every tour is 100% private, seamlessly chauffeured by professional English-speaking driver guides, and fully customizable to your pace.
            </p>
          </div>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredTours.map((tour, idx) => (
              <div key={tour.id} className={`reveal-card stagger-${(idx % 3) + 1} h-full`}>
                <PackageCard tour={tour} />
              </div>
            ))}
          </div>

          <div className="reveal-up text-center mt-14">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 bg-primary-container text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide border border-[#b2f0d1]/20 hover:bg-secondary hover:border-secondary-fixed transition-all duration-300 hover:-translate-y-0.5 no-underline shadow-md"
            >
              <span>Explore All Tour Packages</span>
              <ArrowRight className="w-[18px] h-[18px] shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHY LANKA MEMO HOLIDAYS */}
      <section className="w-full py-24 bg-[#00251a] text-white relative">
        <div className="max-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-text">
              <span className="text-xs tracking-[0.2em] uppercase text-secondary-fixed font-semibold block mb-3">
                WHY CHOOSE LANKA MEMO HOLIDAYS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl leading-tight mb-6 font-normal">
                Reliable, Comfortable &amp; Authentic Sri Lanka Tours
              </h2>
              <p className="text-[#c0c8c3] text-sm sm:text-base leading-relaxed mb-8">
                We believe your vacation should be stress-free, comfortable, and tailored to what you love. With Lanka Memo Holidays, you have your own dedicated air-conditioned vehicle, an experienced English-speaking chauffeur guide, and complete flexibility every day.
              </p>

              <div className="flex flex-col gap-5">
                <div className="reveal-up stagger-1 flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-secondary-fixed mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold">Private Air-Conditioned Vehicles</h4>
                    <p className="text-xs sm:text-sm text-[#c0c8c3] mt-0.5">
                      Clean, modern cars, vans, and SUVs driven by friendly, government-licensed (SLTDA) tourist chauffeur guides.
                    </p>
                  </div>
                </div>

                <div className="reveal-up stagger-2 flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-secondary-fixed mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold">Handpicked Quality Hotels</h4>
                    <p className="text-xs sm:text-sm text-[#c0c8c3] mt-0.5">
                      Carefully selected 3-star, 4-star, 5-star hotels, and authentic boutique tea bungalows tailored to your budget.
                    </p>
                  </div>
                </div>

                <div className="reveal-up stagger-3 flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-secondary-fixed mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold">Local Experts &amp; 24/7 Support</h4>
                    <p className="text-xs sm:text-sm text-[#c0c8c3] mt-0.5">
                      Personalized itineraries, transparent pricing with no hidden charges, and round-the-clock on-trip assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Mosaic / Image */}
            <div className="reveal-image stagger-2 relative rounded-3xl overflow-hidden shadow-2xl h-[360px] sm:h-[420px] lg:h-[480px] max-h-[500px] w-full border border-white/10">
              <img
                src="/images/ella_scenic_blue_train_portrait.jpg"
                alt="Scenic Ceylon Blue Train through Tea Country Sri Lanka"
                className="w-full h-full object-cover object-[center_55%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00251a]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <span className="bg-[#b2f0d1]/20 backdrop-blur-md text-secondary-fixed border border-[#b2f0d1]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase inline-block mb-2">
                  Scenic Mountain Rail
                </span>
                <p className="text-base sm:text-lg font-serif text-white m-0 drop-shadow-md">
                  Iconic Blue Train Through Highland Tea Plantations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: GUEST REVIEWS */}
      <section className="w-full py-24 bg-surface-container-low">
        <div className="max-container">
          <div className="reveal-text flex flex-col items-center text-center mb-14">
            <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
              TRAVELER REVIEWS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight">
              What Our Travelers Say
            </h2>
            <div className="flex items-center gap-2 mt-3 text-sm text-on-surface-variant">
              <div className="flex text-[#eab308]">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <span className="font-semibold text-on-surface">4.9 / 5.0</span>
              <span>based on 350+ completed tours</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {REVIEWS_DATA.slice(0, 3).map((review, idx) => (
              <div key={review.id} className={`reveal-card stagger-${(idx % 3) + 1} h-full`}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          <div className="reveal-up text-center mt-12">
            <Link
              href="/reviews"
              className="inline-flex items-center justify-center gap-2 bg-primary-container text-white px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide border border-[#b2f0d1]/20 hover:bg-secondary hover:border-secondary-fixed transition-all duration-300 hover:-translate-y-0.5 no-underline shadow-md"
            >
              <span>Read All Guest Reviews</span>
              <ArrowRight className="w-[18px] h-[18px] shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: SIGNATURE EXPERIENCES HIGHLIGHTS (EXACT DESIGN AS REFERENCE) */}
      <SignatureExperiencesSlider />

      {/* SECTION 8: PLAN YOUR TRIP CTA BANNER */}
      <section className="w-full py-24 bg-surface">
        <div className="max-container">
          <div className="reveal-card bg-[#103c2e] rounded-3xl p-8 sm:p-14 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(178,240,209,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="reveal-text text-xs tracking-[0.22em] uppercase text-secondary-fixed font-semibold block mb-4">
                CUSTOM TOUR PLANNING
              </span>
              <h2 className="reveal-text stagger-1 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5">
                Plan Your Dream Sri Lanka Holiday
              </h2>
              <p className="reveal-text stagger-2 text-base text-[#dde4df] leading-relaxed mb-10 max-w-2xl mx-auto">
                Tell us where you want to go, what you want to see, and your travel dates. We will design a personalized itinerary with clear, honest pricing within 24 hours.
              </p>
              <div className="reveal-up stagger-3 flex flex-wrap gap-4 justify-center">
                <Link
                  href="/plan-trip"
                  className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-10 py-4 rounded-full text-base font-semibold tracking-wide shadow-lg hover:bg-secondary-fixed hover:text-primary transition-all duration-300 hover:-translate-y-0.5 no-underline"
                >
                  <span>Start Planning Your Trip</span>
                  <Sparkles className="w-5 h-5 shrink-0" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/12 text-white backdrop-blur-md px-10 py-4 rounded-full text-base font-semibold tracking-wide border border-white/30 hover:bg-white/25 hover:border-white transition-all duration-300 hover:-translate-y-0.5 no-underline"
                >
                  <span>Contact Our Team</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
