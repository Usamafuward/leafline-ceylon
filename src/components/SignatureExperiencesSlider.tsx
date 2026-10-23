'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Pause, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface SignatureExperience {
  id: string;
  region: string;
  titleLine1: string;
  titleLine2: string;
  cardTitle: string;
  cardRegion: string;
  description: string;
  image: string;
  link: string;
}

const EXPERIENCES: SignatureExperience[] = [
  {
    id: 'sigiriya',
    region: 'Cultural Triangle · Sri Lanka',
    titleLine1: 'Sigiriya',
    titleLine2: 'Rock Fortress',
    cardTitle: 'Sigiriya Rock Fortress',
    cardRegion: 'Cultural Triangle',
    description:
      'Rise at dawn to scale the 5th-century palace citadel carved into solitary granite monoliths. Explore royal water gardens, ancient mirror-wall frescoes, and dramatic 360° summit panoramas.',
    image: '/images/sigiriya_classic_rock_landscape.jpg',
    link: '/destinations',
  },
  {
    id: 'ella-bridge',
    region: 'Central Highlands · Sri Lanka',
    titleLine1: 'Demodara',
    titleLine2: 'Nine Arch Bridge',
    cardTitle: 'Nine Arch Viaduct',
    cardRegion: 'Ella Highlands',
    description:
      'Witness the legendary British colonial railway viaduct hidden amidst emerald mountain tea terraces. Hear the resonant whistle as the Ceylon blue train glides across stone arches in morning mist.',
    image: '/images/ella_nine_arch_bridge_train_crossing.jpg',
    link: '/packages/scenic-hill-country-odyssey',
  },
  {
    id: 'yala-safari',
    region: 'Southern Wilderness · Sri Lanka',
    titleLine1: 'Yala Leopard',
    titleLine2: 'Safari Expedition',
    cardTitle: 'Yala Leopard Safari',
    cardRegion: 'Yala National Park',
    description:
      'Traverse coastal scrublands with master naturalists in custom 4x4 safari jeeps. Track the world’s highest density of wild leopards, herds of Asian elephants, and elusive sloth bears at golden hour.',
    image: '/images/yala_safari_jeep_elephant_encounter.jpg',
    link: '/packages/wildlife-safari-expedition',
  },
  {
    id: 'mirissa-whales',
    region: 'Indian Ocean · Sri Lanka',
    titleLine1: 'Mirissa Blue',
    titleLine2: 'Whale Sanctuary',
    cardTitle: 'Mirissa Blue Whales',
    cardRegion: 'Southern Coast',
    description:
      'Sail into the deep sapphire trenches of the Indian Ocean off Dondra Point. Behold Earth’s largest marine giants breaching alongside playful schools of spinner dolphins and sea turtles.',
    image: '/images/whale.jpg',
    link: '/destinations',
  },
  {
    id: 'tea-plantations',
    region: 'Nuwara Eliya · Sri Lanka',
    titleLine1: 'Ceylon Tea',
    titleLine2: 'Highlands & Mist',
    cardTitle: 'Ceylon Tea Estates',
    cardRegion: 'Central Highlands',
    description:
      'Wander endless rolling hills wrapped in cool alpine clouds. Tour historic 19th-century colonial tea factories, pluck tender two leaves and a bud, and taste refined single-estate golden tips.',
    image: '/images/nuwara_eliya_tea_estate_morning_clouds.jpg',
    link: '/destinations',
  },
  {
    id: 'galle-fort',
    region: 'Southern Coastline · Sri Lanka',
    titleLine1: 'Galle Historic',
    titleLine2: 'Dutch Fort Bastion',
    cardTitle: 'Galle Fort Ramparts',
    cardRegion: 'Galle Heritage Coast',
    description:
      'Stroll along 17th-century coral ramparts as twilight washes the Indian Ocean in rose and amber. Explore cobbled alleyways, Dutch colonial architecture, artisan boutique cafes, and sea-view bastions.',
    image: '/images/galle_fort_lighthouse_twilight.jpg',
    link: '/destinations',
  },
];

export default function SignatureExperiencesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  const activeExp = EXPERIENCES[activeIndex];

  // Upcoming queue of experiences to display in the carousel (exact like reference image)
  const upcomingExperiences = EXPERIENCES.map((_, i) => {
    const nextIdx = (activeIndex + 1 + i) % EXPERIENCES.length;
    return { ...EXPERIENCES[nextIdx], originalIndex: nextIdx };
  }).slice(0, EXPERIENCES.length - 1);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % EXPERIENCES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + EXPERIENCES.length) % EXPERIENCES.length);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, handleNext]);

  // When activeIndex changes, reset the carousel scroll so the first card is always flush left (no clipping)
  useEffect(() => {
    if (carouselTrackRef.current) {
      carouselTrackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeIndex]);

  const toggleAutoplay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section className="relative w-full overflow-hidden bg-black text-white select-none">
      {/* Background Images Crossfade Layer */}
      <div className="absolute inset-0 z-0">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={exp.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <Image
              src={exp.image}
              alt={exp.titleLine1 + ' ' + exp.titleLine2}
              fill
              priority={idx === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Cinematic Vignettes and Contrast Overlays */}
        {/* Left deep gradient for ultra text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 via-45% to-black/30 lg:to-transparent z-[1]" />
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 via-30% to-transparent z-[1]" />
        {/* Top subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-[1]" />
      </div>

      {/* Main Content Area: Padding matches Header exactly via max-container without extra horizontal px */}
      <div className="relative z-10 max-container py-16 sm:py-20 lg:py-24 min-h-[660px] sm:min-h-[720px] flex flex-col justify-center">
        
        {/* Grid Row: Left Hero Content + Right Cards & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            {/* White/Mint Dash line & Subtitle */}
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-6 h-[2px] bg-secondary-fixed shrink-0 inline-block" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-secondary-fixed uppercase font-sans">
                {activeExp.region}
              </span>
            </div>

            {/* Editorial Headline using Application font-serif (Playfair Display) */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] text-white font-normal leading-[1.12] tracking-tight drop-shadow-[0_3px_20px_rgba(0,0,0,0.6)] my-3">
              {activeExp.titleLine1}
              <br />
              {activeExp.titleLine2}
            </h2>

            {/* Descriptive Paragraph using Application font-sans (Plus Jakarta Sans) */}
            <p className="font-sans text-sm sm:text-base text-[#dde4df] leading-relaxed max-w-md my-4 sm:my-6 font-light">
              {activeExp.description}
            </p>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-4 pt-1 sm:pt-2">
              {/* Mint Circular Action Button */}
              <button
                type="button"
                onClick={toggleAutoplay}
                aria-label={isPlaying ? 'Pause auto-slider' : 'Start auto-slider'}
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                className="w-11 h-11 rounded-full bg-[#b2f0d1] hover:bg-white text-[#00251a] flex items-center justify-center transition-all duration-300 shadow-lg shadow-black/40 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              {/* Discover Location Pill Button */}
              <Link
                href={activeExp.link}
                className="bg-white/12 hover:bg-white/25 text-white border-[1.5px] border-white/65 hover:border-white px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-white text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/15 backdrop-blur-md flex items-center gap-2 group cursor-pointer"
              >
                <span>DISCOVER LOCATION</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Right Column: Cards Carousel & Navigation Controls Directly Underneath */}
          <div className="lg:col-span-7 flex flex-col w-full overflow-hidden">
            
            {/* Horizontal Cards Queue (Exactly 3 cards visible at one time on desktop) */}
            <div
              ref={carouselTrackRef}
              className="flex items-center gap-4 overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth py-3"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {upcomingExperiences.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => setActiveIndex(exp.originalIndex)}
                  style={{ scrollSnapAlign: 'start' }}
                  className="relative w-[160px] sm:w-[190px] md:w-[calc((100%-2rem)/3)] min-w-[160px] sm:min-w-[190px] md:min-w-[calc((100%-2rem)/3)] md:max-w-[calc((100%-2rem)/3)] h-[280px] sm:h-[310px] md:h-[330px] lg:h-[350px] rounded-2xl overflow-hidden shrink-0 cursor-pointer transition-all duration-500 group border border-white/15"
                >
                  {/* Card Image */}
                  <Image
                    src={exp.image}
                    alt={exp.cardTitle}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 200px, 250px"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-55% to-transparent pointer-events-none" />

                  {/* Card Content at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end text-left z-10 pointer-events-none">
                    <div className="w-3.5 h-[1.5px] bg-secondary-fixed mb-1.5" />
                    <span className="text-[10px] sm:text-[11px] text-secondary-fixed font-semibold tracking-wider uppercase truncate mb-0.5 font-sans">
                      {exp.cardRegion}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg text-white font-medium leading-snug line-clamp-2 mt-0.5">
                      {exp.cardTitle}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Controls Row: Positioned directly under the cards exact like reference image */}
            <div className="flex items-center justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 w-full">
              {/* Circular Previous and Next Arrows (Aligned below first card) */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous destination"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 hover:border-white hover:bg-white/15 text-white flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next destination"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 hover:border-white hover:bg-white/15 text-white flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 shrink-0" />
                </button>
              </div>

              {/* Mint Horizontal Timeline Progress Track */}
              <div className="flex-1 mx-2 sm:mx-4 md:mx-6">
                <div className="h-[2px] w-full bg-white/20 rounded-full relative overflow-hidden">
                  <div
                    className="h-full bg-[#b2f0d1] rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((activeIndex + 1) / EXPERIENCES.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Slide Index Number using Application font-serif */}
              <div className="flex items-baseline text-white shrink-0 pr-2">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white/95 leading-none">
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
