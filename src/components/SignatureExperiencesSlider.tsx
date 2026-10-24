'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Pause, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react';

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
  note: string; // short handwritten-style tip
  facts: { bestSeason: string; idealStay: string; highlight: string };
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
    note: 'climb at first light',
    facts: { bestSeason: 'Dec – Apr', idealStay: '2 nights', highlight: 'UNESCO citadel' },
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
    link: '/packages/tea-trails-and-scenic-highlands',
    note: 'wait for the blue train',
    facts: { bestSeason: 'Jan – Apr', idealStay: '2 nights', highlight: 'Hill-country rail' },
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
    link: '/packages/wild-ceylon-safari-and-leopards',
    note: 'golden hour is leopard hour',
    facts: { bestSeason: 'Feb – Jul', idealStay: '2 nights', highlight: 'Wild leopards' },
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
    note: 'sail out before sunrise',
    facts: { bestSeason: 'Dec – Apr', idealStay: '2 nights', highlight: 'Blue whales' },
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
    note: 'taste the morning pluck',
    facts: { bestSeason: 'Jan – Apr', idealStay: '2 nights', highlight: 'Estate bungalows' },
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
    note: 'walk the ramparts at dusk',
    facts: { bestSeason: 'Dec – Mar', idealStay: '1 night', highlight: 'UNESCO fort' },
  },
];

// Inset (px from each edge of the section) of the card the new slide expands out of
interface RevealOrigin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const EASE_EXPAND = [0.76, 0, 0.24, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: 'easeIn' as const } },
};

const textItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

// The card queue is one long strip of the slides repeated, moved by a single CSS transform
// transition. That runs on the browser's compositor, so the glide stays smooth even while
// React and image decoding are busy at the start of a slide change.
const SLIDE_COUNT = EXPERIENCES.length;
const STRIP_COPIES = 5;
const STRIP = Array.from({ length: SLIDE_COUNT * STRIP_COPIES }, (_, i) => ({
  ...EXPERIENCES[i % SLIDE_COUNT],
  slideIndex: i % SLIDE_COUNT,
  stripKey: `${Math.floor(i / SLIDE_COUNT)}-${EXPERIENCES[i % SLIDE_COUNT].id}`,
}));
// The strip's resting position always sits in the middle copy, so it can glide a long way
// either way before wrapping back invisibly (every copy looks identical)
const MIDDLE_COPY_START = SLIDE_COUNT * Math.floor(STRIP_COPIES / 2);
// Starts immediately and decelerates evenly into place: no slow start, no stall at the end
const STRIP_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const STRIP_DURATION_S = 0.9;
const SWIPE_THRESHOLD_PX = 40;

// Same card, moved into the middle copy of the strip
function wrapStripPos(pos: number) {
  const offset = pos - MIDDLE_COPY_START;
  return MIDDLE_COPY_START + (((offset % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
}

// The handwritten tip is unmasked left to right, like ink being written
const noteItem = {
  hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  show: { opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.9, ease: 'easeOut' as const } },
};

// Headline lines rise from behind a mask, matching the homepage hero
const lineItem = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.85, ease: EASE_OUT } },
};

// One slide's editorial copy. Rendered for the active slide (animated) and, invisibly,
// for every slide to reserve the height of the tallest one
function SlideCopy({ exp }: { exp: SignatureExperience }) {
  return (
    <>
      {/* Mint Dash & Region */}
      <motion.div variants={textItem} className="flex items-center gap-3 mb-1">
        <span className="w-6 h-[1.5px] bg-secondary-fixed shrink-0 inline-block" />
        <span className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-secondary-fixed uppercase font-sans">
          {exp.region}
        </span>
      </motion.div>

      {/* Editorial Headline: upright first line, italic second line (Playfair Display) */}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[2.9rem] xl:text-[3.6rem] text-white font-normal leading-[1.12] tracking-tight drop-shadow-[0_3px_20px_rgba(0,0,0,0.6)] mt-3 mb-2">
        {[exp.titleLine1, exp.titleLine2].map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
            <motion.span variants={lineItem} className={`block ${i === 1 ? 'italic text-white/90' : ''}`}>
              {line}
            </motion.span>
          </span>
        ))}
      </h2>

      {/* Handwritten Tip: "writes" itself in from left to right */}
      <motion.div
        variants={noteItem}
        className="flex items-center gap-2 text-secondary-fixed -rotate-2 origin-left mb-1"
      >
        <svg width="34" height="22" viewBox="0 0 34 22" fill="none" aria-hidden="true" className="shrink-0 -scale-x-100">
          <path d="M2 5 C 9 18, 21 19, 30 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24.5 8 L30 9 L29.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-handwriting text-2xl sm:text-[1.7rem] leading-none">{exp.note}</span>
      </motion.div>

      {/* Descriptive Paragraph using Application font-sans (Plus Jakarta Sans) */}
      <motion.p
        variants={textItem}
        className="font-sans text-sm sm:text-base text-[#dde4df] leading-relaxed max-w-md my-4 sm:my-5 font-light"
      >
        {exp.description}
      </motion.p>

      {/* Key Facts */}
      <motion.dl
        variants={textItem}
        className="grid grid-cols-3 max-w-md border-t border-secondary-fixed/25 pt-4 mb-6 sm:mb-7"
      >
        {[
          { label: 'Best Season', value: exp.facts.bestSeason },
          { label: 'Ideal Stay', value: exp.facts.idealStay },
          { label: 'Highlight', value: exp.facts.highlight },
        ].map((fact, i) => (
          <div key={fact.label} className={i > 0 ? 'border-l border-white/12 pl-3 sm:pl-4' : 'pr-3 sm:pr-4'}>
            <dt className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/45 font-semibold mb-1">
              {fact.label}
            </dt>
            <dd className="m-0 text-[13px] sm:text-sm font-medium text-white leading-snug">{fact.value}</dd>
          </div>
        ))}
      </motion.dl>
    </>
  );
}

export default function SignatureExperiencesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [revealOrigin, setRevealOrigin] = useState<RevealOrigin | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  // Index (within STRIP) of the card sitting at the left edge of the queue: always the slide after the active one
  const [stripPos, setStripPos] = useState(MIDDLE_COPY_START + 1);
  const [stripInstant, setStripInstant] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const swiped = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const activeExp = EXPERIENCES[activeIndex];
  const prevExp = prevIndex !== null ? EXPERIENCES[prevIndex] : null;

  // Switch slides; if the incoming slide's card is on screen, the new background
  // expands out of that card's exact rectangle instead of simply fading in
  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndex) return;

      let origin: RevealOrigin | null = null;
      const section = sectionRef.current;
      if (section) {
        const s = section.getBoundingClientRect();
        const cards = carouselTrackRef.current?.querySelectorAll<HTMLElement>(
          `[data-exp-id="${EXPERIENCES[nextIndex].id}"]`
        );
        // The strip holds several copies of each card; use the one actually on screen
        const visible = Array.from(cards ?? [])
          .map((el) => el.getBoundingClientRect())
          .find((c) => c.width > 0 && c.left >= s.left - 1 && c.right <= s.right + 1);
        if (visible) {
          origin = {
            top: visible.top - s.top,
            right: s.right - visible.right,
            bottom: s.bottom - visible.bottom,
            left: visible.left - s.left,
          };
        }
      }

      // Stepping back one slide slides the strip right by one card; any other jump slides it
      // left by however many cards ahead the chosen slide is
      const isBack = nextIndex === (activeIndex - 1 + SLIDE_COUNT) % SLIDE_COUNT;
      const steps = isBack ? -1 : (nextIndex - activeIndex + SLIDE_COUNT) % SLIDE_COUNT;

      // With no glide (reduced motion) there is no transitionend to wrap on, so wrap right away
      setStripPos((pos) => (prefersReducedMotion ? wrapStripPos(pos + steps) : pos + steps));
      setRevealOrigin(origin);
      setPrevIndex(activeIndex);
      setActiveIndex(nextIndex);
    },
    [activeIndex, prefersReducedMotion]
  );

  // After a glide lands, hop the strip back into its middle copy with no transition.
  // Every copy is identical, so the hop is invisible and the strip can never run out of cards.
  const handleStripTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    const wrapped = wrapStripPos(stripPos);
    if (wrapped !== stripPos) {
      setStripInstant(true);
      setStripPos(wrapped);
    }
  };

  // Re-enable the glide two frames after an instant hop, once the browser has painted it
  useEffect(() => {
    if (!stripInstant) return;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setStripInstant(false));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [stripInstant]);

  // Pre-decode every background photo up front, so swapping one in mid-transition never
  // stalls the main thread with a large image decode
  useEffect(() => {
    sectionRef.current?.querySelectorAll<HTMLImageElement>('img[data-preload]').forEach((img) => {
      const decode = () => img.decode?.().catch(() => {});
      if (img.complete) decode();
      else img.addEventListener('load', decode, { once: true });
    });
  }, []);

  // Swipe the queue on touch screens (the strip is transform-driven, not natively scrollable)
  const handlePointerDown = (e: React.PointerEvent) => {
    swipeStartX.current = e.clientX;
    swiped.current = false;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (swipeStartX.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    swiped.current = true; // stops the card under the finger from also registering a click
    goTo(dx < 0 ? (activeIndex + 1) % SLIDE_COUNT : (activeIndex - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  };

  const handleNext = useCallback(() => {
    goTo((activeIndex + 1) % EXPERIENCES.length);
  }, [activeIndex, goTo]);

  const handlePrev = useCallback(() => {
    goTo((activeIndex - 1 + EXPERIENCES.length) % EXPERIENCES.length);
  }, [activeIndex, goTo]);

  const toggleAutoplay = () => {
    setIsPlaying((prev) => !prev);
  };

  const hasChanged = prevIndex !== null;
  const animateChange = hasChanged && !prefersReducedMotion;

  return (
    // reducedMotion="user": visitors who ask for less motion get fades only (no movement or zoom)
    <MotionConfig reducedMotion="user">
    <section
      ref={sectionRef}
      data-paused={!isPlaying}
      className="sig-slider relative w-full overflow-hidden bg-black text-white select-none"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Every slide image stays mounted (invisible) so the next one is already loaded */}
        {EXPERIENCES.map((exp) => (
          <Image key={exp.id} src={exp.image} alt="" aria-hidden data-preload loading="eager" fill sizes="100vw" className="object-cover opacity-0" />
        ))}

        {/* Outgoing slide stays put underneath while the new one expands over it */}
        {prevExp && (
          <div key={`prev-${prevExp.id}`} className="absolute inset-0">
            <Image src={prevExp.image} alt="" aria-hidden fill sizes="100vw" className="object-cover object-center" />
          </div>
        )}

        {/* Incoming slide: grows out of the clicked card (or fades in) while settling from a slight zoom */}
        <motion.div
          key={activeExp.id}
          className="absolute inset-0"
          initial={
            !animateChange
              ? false
              : revealOrigin
                ? {
                    clipPath: `inset(${revealOrigin.top}px ${revealOrigin.right}px ${revealOrigin.bottom}px ${revealOrigin.left}px round 16px)`,
                  }
                : { opacity: 0 }
          }
          animate={{ clipPath: 'inset(0px 0px 0px 0px round 0px)', opacity: 1 }}
          transition={{ duration: revealOrigin ? 0.95 : 0.8, ease: EASE_EXPAND }}
        >
          <motion.div
            className="absolute inset-0 will-change-transform"
            initial={animateChange ? { scale: revealOrigin ? 1.25 : 1.08 } : false}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: EASE_OUT }}
          >
            <Image
              src={activeExp.image}
              alt={activeExp.titleLine1 + ' ' + activeExp.titleLine2}
              fill
              preload={activeIndex === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>

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

        {/* Masthead: mint slide counter + section name, spanning both columns so the text and the cards start level */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <span className="overflow-hidden inline-flex">
            <span
              key={activeIndex}
              className="sig-index-roll inline-block font-serif text-5xl sm:text-6xl text-secondary-fixed leading-none tabular-nums"
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
          </span>
          <span className="h-px w-10 sm:w-14 bg-secondary-fixed/50 shrink-0" />
          <span className="font-serif text-lg text-white/45 tabular-nums">/ {String(SLIDE_COUNT).padStart(2, '0')}</span>
          <span className="ml-1 sm:ml-3 text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-white/60 font-semibold">
            Signature Experiences
          </span>
        </div>

        {/* Grid Row: Left Hero Content + Right Cards & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-stretch">

          {/* Left Column: Editorial Copy (old copy lifts away, new copy rises in line by line).
              Old and new copy share one grid cell while they swap, so the column never collapses
              and nothing below or beside it (like the cards on phones) gets pushed around */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <div className="grid">
            {/* Invisible copies of every slide share the cell, so it is always as tall as the
                tallest slide: the column (and the cards stretched beside it) never changes height */}
            {EXPERIENCES.map((exp) => (
              <div key={`sizer-${exp.id}`} aria-hidden="true" className="invisible [grid-area:1/1]">
                <SlideCopy exp={exp} />
              </div>
            ))}
            <AnimatePresence initial={false}>
              <motion.div
                key={activeExp.id}
                variants={textContainer}
                initial="hidden"
                animate="show"
                exit="exit"
                className="[grid-area:1/1]"
              >
                <SlideCopy exp={activeExp} />
              </motion.div>
            </AnimatePresence>
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-4">
              {/* Mint Circular Play / Pause Button */}
              <button
                type="button"
                onClick={toggleAutoplay}
                aria-label={isPlaying ? 'Pause auto-slider' : 'Start auto-slider'}
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                className="w-11 h-11 rounded-full bg-secondary-fixed hover:bg-white text-[#00251a] flex items-center justify-center transition-all duration-300 shadow-lg shadow-black/40 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
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
                className="bg-white/10 text-white border-[1.5px] border-white/45 hover:border-secondary-fixed hover:text-secondary-fixed hover:bg-white/5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-md flex items-center gap-2 group cursor-pointer"
              >
                <span>DISCOVER LOCATION</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Right Column: Cards Carousel & Navigation Controls Directly Underneath */}
          <div className="lg:col-span-7 flex flex-col w-full overflow-hidden lg:self-stretch">

            {/* Three cards show at md and xl+, two at lg (1024–1279px) where this column is narrow and
                tall, so the stretched cards keep a sensible shape. */}
            {/* Horizontal Cards Queue: one strip of repeated cards glides left as the chosen card
                hands off to the background (the card leaving on the left fades out, the slide just
                left rejoins at the far end). Pure CSS transform transition = compositor-smooth. */}
            <div
              className="py-3 lg:pt-0 touch-pan-y lg:flex-1 lg:min-h-[340px]"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => (swipeStartX.current = null)}
            >
              <div
                ref={carouselTrackRef}
                onTransitionEnd={handleStripTransitionEnd}
                className="flex items-center gap-4 lg:h-full will-change-transform [--step:176px] sm:[--step:206px] md:[--step:calc((100%+1rem)/3)] lg:[--step:calc((100%+1rem)/2)] xl:[--step:calc((100%+1rem)/3)]"
                style={{
                  transform: `translate3d(calc(var(--step) * ${-stripPos}), 0, 0)`,
                  transition:
                    stripInstant || prefersReducedMotion
                      ? 'none'
                      : `transform ${STRIP_DURATION_S}s ${STRIP_EASE}`,
                }}
              >
                {STRIP.map((exp, i) => {
                  const isActiveSlide = exp.slideIndex === activeIndex;
                  // Only the middle copy is exposed to screen readers; the rest are visual repeats
                  const isRepeat = i < MIDDLE_COPY_START || i >= MIDDLE_COPY_START + SLIDE_COUNT;
                  return (
                    <div
                      key={exp.stripKey}
                      data-exp-id={exp.id}
                      aria-hidden={isRepeat || undefined}
                      onClick={() => {
                        if (swiped.current) {
                          swiped.current = false;
                          return;
                        }
                        goTo(exp.slideIndex);
                      }}
                      className={`relative w-[160px] sm:w-[190px] md:w-[calc((100%-2rem)/3)] min-w-[160px] sm:min-w-[190px] md:min-w-[calc((100%-2rem)/3)] md:max-w-[calc((100%-2rem)/3)] lg:w-[calc((100%-1rem)/2)] lg:min-w-[calc((100%-1rem)/2)] lg:max-w-[calc((100%-1rem)/2)] xl:w-[calc((100%-2rem)/3)] xl:min-w-[calc((100%-2rem)/3)] xl:max-w-[calc((100%-2rem)/3)] h-[280px] sm:h-[310px] md:h-[330px] lg:h-full rounded-2xl overflow-hidden shrink-0 cursor-pointer group border border-white/15 hover:border-secondary-fixed/70 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] transition-[opacity,border-color] duration-500 ${
                        isActiveSlide ? 'opacity-0 pointer-events-none' : 'opacity-100'
                      }`}
                    >
                      {/* Card Image */}
                      <Image
                        src={exp.image}
                        alt={exp.cardTitle}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 200px, 250px"
                      />

                      {/* Gradient Overlays (bottom for the copy, a light top wash for the number) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-55% to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/65 to-transparent pointer-events-none" />

                      {/* Top Row: slide number & "View" chip that appears on hover */}
                      <div className="absolute top-3.5 left-4 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                        <span className="font-serif text-sm sm:text-base text-secondary-fixed tabular-nums drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                          {String(exp.slideIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[10px] font-semibold tracking-[0.18em] uppercase text-white opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          View
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>

                      {/* Card Content at Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end text-left z-10 pointer-events-none">
                        <div className="w-3.5 h-[1.5px] bg-secondary-fixed mb-1.5 transition-all duration-500 group-hover:w-8" />
                        <span className="text-[10px] sm:text-[11px] text-secondary-fixed font-semibold tracking-wider uppercase truncate mb-0.5 font-sans">
                          {exp.cardRegion}
                        </span>
                        <h4 className="font-serif text-base sm:text-lg text-white font-medium leading-snug line-clamp-2 mt-0.5">
                          {exp.cardTitle}
                        </h4>
                        <span className="text-[11px] text-white/55 mt-1.5 font-sans">
                          Best {exp.facts.bestSeason}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls Row: Positioned directly under the cards exact like reference image */}
            <div className="flex items-center justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 w-full">
              {/* Circular Previous and Next Arrows (Aligned below first card) */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous destination"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 hover:border-secondary-fixed hover:text-secondary-fixed hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next destination"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 hover:border-secondary-fixed hover:text-secondary-fixed hover:bg-white/10 text-white flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 shrink-0" />
                </button>
              </div>

              {/* Mint Segmented Timeline: the active segment fills over the slide's duration and its
                  animationend advances the slider, so manual navigation always restarts the timer */}
              <div className="flex-1 mx-2 sm:mx-4 md:mx-6 flex items-center gap-1.5">
                {EXPERIENCES.map((exp, i) => (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show ${exp.cardTitle}`}
                    aria-current={i === activeIndex}
                    className="flex-1 py-3 bg-transparent border-none cursor-pointer"
                  >
                    <span className="block h-[2px] w-full bg-white/20 rounded-full overflow-hidden">
                      <span
                        className={`sig-progress block h-full bg-secondary-fixed rounded-full ${
                          i < activeIndex ? 'is-done' : ''
                        } ${i === activeIndex ? 'is-active' : ''}`}
                        onAnimationEnd={i === activeIndex ? handleNext : undefined}
                      />
                    </span>
                  </button>
                ))}
              </div>

              {/* Up Next (the slide number now lives in the masthead) */}
              <div className="hidden sm:flex flex-col items-end shrink-0 pr-1 overflow-hidden min-w-[150px]">
                <span className="text-[10px] tracking-[0.24em] uppercase text-white/45 font-semibold">Up next</span>
                <span
                  key={activeIndex}
                  className="sig-index-roll inline-block font-serif text-base lg:text-lg text-white/90 leading-tight mt-0.5 whitespace-nowrap"
                >
                  {EXPERIENCES[(activeIndex + 1) % SLIDE_COUNT].cardTitle}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
    </MotionConfig>
  );
}
