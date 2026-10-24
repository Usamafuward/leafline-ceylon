'use client';

import SplitText from '@/components/ui/SplitText';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TOURS_DATA } from '@/data/tours';
import { DESTINATIONS_DATA } from '@/data/destinations';
import { REVIEWS_DATA } from '@/data/reviews';
import PackageCard from '@/components/PackageCard';
import ReviewCard from '@/components/ReviewCard';
import CeylonRegionExplorer from '@/components/CeylonRegionExplorer';
import SignatureExperiencesSlider from '@/components/SignatureExperiencesSlider';
import ParallaxImage from '@/components/ui/ParallaxImage';
import CountUp from '@/components/ui/CountUp';
import {
  ArrowRight,
  ShieldCheck,
  Car,
  UserRound,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';


// Curated Ceylon Sanctuary Scenes for Auto-Changing Hero Background
const HERO_SLIDES = [
  {
    image: '/images/sigiriya_rock_aerial_drone_sunset.webp',
    tag: 'ANCIENT SKY CITADEL',
    location: 'Sigiriya Rock Fortress',
    region: 'Cultural Triangle',
  },
  {
    image: '/images/ella_scenic_mountain_train.webp',
    tag: 'HIGHLAND TEA SANCTUARY',
    location: 'Ceylon Tea Country & Rail',
    region: 'Central Highlands',
  },
  {
    image: '/images/yala_safari_jeep_elephant_encounter.webp',
    tag: 'WILD SAFARI EXPEDITIONS',
    location: 'Yala National Park',
    region: 'Southern Wildlife Reserves',
  },
  {
    image: '/images/ella_nine_arch_bridge_train_crossing.webp',
    tag: 'COLONIAL HERITAGE VIADUCT',
    location: 'Demodara Nine Arch Bridge',
    region: 'Ella Mountain Pass',
  },
  {
    image: '/images/sri_lanka_traditional_stilt_fishermen_gold.webp',
    tag: 'GOLDEN OCEAN TRADITIONS',
    location: 'Stilt Fishermen & Southern Coast',
    region: 'Mirissa & Weligama Bay',
  },
];

// Trust strip figures (kept consistent with the reviews heading further down this page)
const TRUST_STATS = [
  { value: 10, suffix: '+', label: 'Years crafting Sri Lanka journeys' },
  { value: 100, suffix: '%', label: 'Private tours, never shared' },
  { value: 4.9, decimals: 1, star: true, label: 'Rating from 350+ completed tours' },
  { value: 24, suffix: '/7', label: 'Colombo concierge support' },
];

const TRUST_CREDENTIALS = [
  { icon: ShieldCheck, text: 'SLTDA licensed operator' },
  { icon: Car, text: 'Climate-controlled private fleet' },
  { icon: UserRound, text: 'English-speaking chauffeur guides' },
];

// How long each hero photo shows before cross-fading to the next
const HERO_SLIDE_MS = 6000;

const HERO_HEADLINE = 'Journeys Beyond the Ordinary';

export default function HomePage() {
  const featuredTours = TOURS_DATA.slice(0, 3);
  const featuredDestinations = DESTINATIONS_DATA.slice(0, 4);

  // Auto-changing hero slides. A plain timer drives it (re-armed on every slide change), so it
  // never stalls: no hover pause (the hero fills the screen, so the cursor is nearly always over it)
  // and no dependence on any visible progress UI. Reduced-motion visitors stay on the first slide.
  const [currentSlide, setCurrentSlide] = useState(0);
  const activeSlide = HERO_SLIDES[currentSlide];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: CINEMATIC HERO WITH AUTO-CHANGING BACKGROUND (FULL SCREEN HEIGHT) */}
      <section
        className="relative w-full min-h-screen h-screen flex items-center justify-center overflow-hidden bg-[#00251a]"
      >
        {/* Layered Background Slides with Smooth Cross-Fade & Slow Ken Burns Zoom */}
        {/* Optimised & loaded up front: a raw original (one is 7.3 MB) could still be downloading when
            its turn came, making the slideshow look stuck on the previous photo */}
        {HERO_SLIDES.map((slide, idx) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt={slide.location}
            fill
            sizes="100vw"
            preload={idx === 0}
            loading="eager"
            className={`hero-slide object-cover object-[center_40%] pointer-events-none ${idx === currentSlide ? 'is-active' : ''}`}
          />
        ))}

        {/* Crystal-Clear Subtle Contrast Scrim (No Muddy Overlays) */}
        {/* z-[1] keeps the scrim above the active slide, which is raised to z-index 1 */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/45 via-black/15 to-[#00140e]/60 pointer-events-none" />

        {/* Hero Content */}
        <div className="max-container relative z-10 w-full pt-34 pb-18 flex flex-col items-center text-center">
          {/* Dynamic Editorial Badge with Live Sanctuary Tag */}
          <div
            className="hero-enter inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/12 backdrop-blur-md border border-white/28 mb-8 shadow-xl"
            style={{ '--hero-delay': '0.1s' } as React.CSSProperties}
          >
            <span className="pulse-dot" />
            <span className="text-xs text-secondary-fixed tracking-[0.24em] uppercase font-semibold">
              DISCOVER SRI LANKA •{' '}
              <span key={currentSlide} className="hero-swap inline-block">
                {activeSlide.tag}
              </span>
            </span>
          </div>

          {/* Main Editorial Headline - revealed letter by letter, like the section headings */}
          <h1
            className="font-serif text-[clamp(2.2rem,4.4vw,4.25rem)] text-white font-normal max-w-[1200px] w-full leading-[1.15] tracking-[-0.015em] mb-5 drop-shadow-[0_3px_20px_rgba(0,0,0,0.6)]"
          >
            <SplitText text={HERO_HEADLINE} delay={200} />
          </h1>

          {/* Supporting Narrative */}
          <p
            className="hero-enter font-sans text-[clamp(1rem,1.8vw,1.2rem)] text-[#f0f5f2] max-w-[720px] font-light leading-relaxed mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
            style={{ '--hero-delay': '0.75s' } as React.CSSProperties}
          >
            Experience the authentic beauty, ancient culture, and untamed wildlife of Sri Lanka through handcrafted private itineraries designed entirely around you.
          </p>

          {/* Dual Action Buttons */}
          <div
            className="hero-enter flex flex-wrap gap-5 justify-center items-center"
            style={{ '--hero-delay': '0.9s' } as React.CSSProperties}
          >
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
          <div
            className="hero-enter mt-16 hidden sm:flex flex-col items-center gap-2 opacity-80"
            style={{ '--hero-delay': '1.15s' } as React.CSSProperties}
          >
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#e3eae5]">
              SCROLL TO EXPLORE
            </span>
            <div className="w-px h-7 bg-gradient-to-b from-secondary-fixed to-transparent" />
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST STATS STRIP
          Proof first: four big serif figures that count up as the strip comes into view, with a
          one-line credentials row underneath. Sits on the light band right below the hero. */}
      <section className="w-full bg-[#edf4ef] border-b border-[#cbdcd1]/60">
        <div className="max-container py-12 sm:py-14">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0">
            {TRUST_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal-up stagger-${i + 1} flex flex-col items-center text-center px-4 ${
                  i % 2 === 1 ? 'border-l border-[#cbdcd1]' : ''
                } ${i === 2 ? 'lg:border-l lg:border-[#cbdcd1]' : ''}`}
              >
                <dd className="order-1 m-0 font-serif text-[2.6rem] sm:text-5xl lg:text-[3.4rem] leading-none text-primary tracking-tight">
                  <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  {stat.star && <span className="text-secondary text-[0.6em] align-[0.35em] ml-1">★</span>}
                </dd>
                <dt className="order-2 mt-3 text-[0.82rem] sm:text-sm text-on-surface-variant leading-snug max-w-[11rem]">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          {/* Credentials line */}
          <div className="reveal-up mt-10 pt-6 border-t border-[#cbdcd1]/80 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.72rem] uppercase tracking-[0.18em] text-secondary font-semibold">
            {TRUST_CREDENTIALS.map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-2">
                <Icon className="w-4 h-4 shrink-0" />
                {text}
              </span>
            ))}
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
                <SplitText text="Explore Sri Lanka" />
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
              <SplitText text="Popular Tour Packages" />
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

      {/* SECTION 6: WHY LEAFLINE CEYLON */}
      <section className="w-full py-24 bg-[#00251a] text-white relative">
        <div className="max-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-text">
              <span className="text-xs tracking-[0.2em] uppercase text-secondary-fixed font-semibold block mb-3">
                WHY CHOOSE LEAFLINE CEYLON
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl leading-tight mb-6 font-normal">
                <SplitText text="Reliable, Comfortable & Authentic Sri Lanka Tours" />
              </h2>
              <p className="text-[#c0c8c3] text-sm sm:text-base leading-relaxed mb-8">
                We believe your vacation should be stress-free, comfortable, and tailored to what you love. With Leafline Ceylon, you have your own dedicated air-conditioned vehicle, an experienced English-speaking chauffeur guide, and complete flexibility every day.
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
              <ParallaxImage
                src="/images/ella_scenic_blue_train_portrait.webp"
                alt="Scenic Ceylon Blue Train through Tea Country Sri Lanka"
                className="object-[center_55%]"
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
              <SplitText text="What Our Travelers Say" />
            </h2>
            <div className="flex items-center gap-2 mt-3 text-sm text-on-surface-variant">
              <div className="flex text-secondary">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <CountUp value={4.9} decimals={1} suffix=" / 5.0" className="font-semibold text-on-surface" />
              <span>
                based on <CountUp value={350} suffix="+" /> completed tours
              </span>
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
            {/* Parallax photo backdrop under a deep green wash keeps the copy legible */}
            <ParallaxImage
              src="/images/south_coast_palm_sunset.webp"
              alt=""
              strength={12}
              className="opacity-40 saturate-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#103c2e]/80 via-[#103c2e]/70 to-[#00251a]/90 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(178,240,209,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="reveal-text text-xs tracking-[0.22em] uppercase text-secondary-fixed font-semibold block mb-4">
                CUSTOM TOUR PLANNING
              </span>
              <h2 className="reveal-text stagger-1 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5">
                <SplitText text="Plan Your Dream Sri Lanka Holiday" />
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
