'use client';

import SplitText from '@/components/ui/SplitText';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { REVIEWS_DATA } from '@/data/reviews';
import ReviewCard from '@/components/ReviewCard';
import CountUp from '@/components/ui/CountUp';
import { PenLine, ChevronDown, ThumbsUp, X } from 'lucide-react';
import PageHero from '@/components/PageHero';
import useScrollLock from '@/components/ui/useScrollLock';
import { gridItemMotion } from '@/components/ui/gridMotion';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Reviews (380+)' },
  { id: 'uk', label: 'UK & Europe' },
  { id: 'us', label: 'United States & Canada' },
  { id: 'au', label: 'Australia & New Zealand' },
];

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Lock the page behind the open form, and let Escape close it
  useScrollLock(showSubmitModal);
  useEffect(() => {
    if (!showSubmitModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowSubmitModal(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showSubmitModal]);
  const [form, setForm] = useState({
    name: '',
    country: '',
    tour: 'The Grand Ceylon Sanctuary Circuit',
    rating: 5,
    headline: '',
    text: '',
  });

  const filteredReviews = filter === 'all'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter((r) => {
      if (filter === 'uk') return r.country.includes('United Kingdom') || r.country.includes('Switzerland') || r.country.includes('Germany');
      if (filter === 'us') return r.country.includes('United States') || r.country.includes('Canada');
      if (filter === 'au') return r.country.includes('Australia') || r.country.includes('New Zealand');
      return true;
    });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* 1. PHOTO HERO (shared across inner pages) */}
      <PageHero
        crumb="Reviews"
        eyebrow="Traveler Testimonials & Recollections"
        title="The Revered Ceylon Guestbook"
        description="Read authentic recollections from travelers who have explored ancient kingdoms, high tea estates, and wild leopard reserves with Leafline Ceylon."
        image="/images/mirissa_coconut_tree_hill_sunset.webp"
        imageAlt="Coconut Tree Hill in Mirissa at sunset"
        imagePosition="center 55%"
      />

      {/* 2. AGGREGATE SCORE BAR & THEME FILTER */}
      <section className="w-full bg-[#edf4ef]/95 backdrop-blur-md py-4 sm:py-5 z-30 border-b border-[#cbdcd1]/80 shadow-xs">
        <div className="max-container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left: Star rating summary */}
            <div className="flex items-center gap-4">
              <CountUp
                value={4.98}
                decimals={2}
                className="text-3xl sm:text-4xl font-serif font-bold text-primary leading-none"
              />
              <div>
                <div className="flex text-secondary text-base sm:text-lg gap-0.5">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
                <p className="text-xs text-on-surface-variant m-0 mt-0.5">
                  Based on 380+ verified private client surveys
                </p>
              </div>
            </div>

            {/* Right: Actions & Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Desktop Filter Pills */}
              <div className="hidden sm:flex flex-wrap items-center gap-1.5">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFilter(opt.id)}
                    className={`py-1.5 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                      filter === opt.id
                        ? 'bg-primary text-white border-primary shadow-xs'
                        : 'bg-white text-on-surface border-[#cbdcd1]/80 hover:border-secondary hover:text-primary'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Write a Reflection Button */}
              <button
                type="button"
                onClick={() => {
                  setReviewSubmitted(false);
                  setShowSubmitModal(true);
                }}
                className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-fixed text-white hover:text-primary px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-xs cursor-pointer border-0 shrink-0"
              >
                <span>Write a Reflection</span>
                <PenLine className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>

          {/* Mobile Filter Dropdown */}
          <div className="sm:hidden w-full mt-3">
            <div className="relative">
              <select
                id="reviews-filter-select"
                aria-label="Filter reviews by country or region"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full appearance-none bg-white text-primary text-sm font-semibold py-2.5 pl-4 pr-10 rounded-xl border border-[#cbdcd1] focus:outline-hidden focus:border-secondary focus:ring-1 focus:ring-secondary shadow-xs cursor-pointer"
              >
                {FILTER_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-secondary">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REVIEWS GRID */}
      <section className="w-full py-16 sm:py-20 bg-surface">
        <div className="max-container">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs uppercase tracking-widest text-secondary font-semibold">
              Showing <CountUp key={filter} value={filteredReviews.length} duration={0.8} /> traveler stories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((rev, idx) => (
                <motion.div key={rev.id} className="h-full" {...gridItemMotion(idx)}>
                  <ReviewCard review={rev} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER */}
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

      {/* 5. REVIEW SUBMISSION MODAL (backdrop fades, panel rises in; page behind is locked) */}
      <AnimatePresence>
      {showSubmitModal && (
        <div
          key="review-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Write a guestbook entry"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            className="absolute inset-0 bg-[#103c2e]/95 backdrop-blur-md"
            onClick={() => setShowSubmitModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, delay: 0.05 } }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            data-lenis-prevent
            className="popup-scroll relative max-w-[580px] w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#cbdcd1]/80 max-h-[92vh] overflow-y-auto"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.2, ease: 'easeIn' } }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {reviewSubmitted ? (
              <motion.div
                className="text-center py-6"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ThumbsUp className="w-12 h-12 text-secondary mb-3 mx-auto" />
                <h3 className="font-serif text-2xl text-primary mb-2">
                  Reflection Received
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Thank you for sharing your experience with Leafline Ceylon. Your kind words mean the world to our chauffeurs and naturalists.
                </p>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-fixed text-white hover:text-primary px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 shadow-xs cursor-pointer border-0"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#cbdcd1]/60">
                  <h3 className="font-serif text-xl sm:text-2xl text-primary m-0">
                    Share Your Ceylon Journey
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="w-8 h-8 rounded-full bg-[#edf4ef] hover:bg-[#cbdcd1]/60 text-primary border-0 cursor-pointer flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1 text-on-surface">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Arthur & Penelope Vance"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#cbdcd1] focus:outline-hidden focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1 text-on-surface">
                    Country of Residence
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. United Kingdom"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#cbdcd1] focus:outline-hidden focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1 text-on-surface">
                    Headline Summary
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. A flawless, restorative private journey through Sri Lanka"
                    value={form.headline}
                    onChange={(e) => setForm({ ...form, headline: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#cbdcd1] focus:outline-hidden focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1 text-on-surface">
                    Review Recollection
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share memories of your chauffeur, boutique stays, safari encounters..."
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#cbdcd1] focus:outline-hidden focus:border-secondary focus:ring-1 focus:ring-secondary text-sm transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-secondary hover:bg-secondary-fixed text-white hover:text-primary font-semibold text-sm tracking-wide transition-all duration-200 shadow-md cursor-pointer border-0 mt-2"
                >
                  <span>Submit Guestbook Entry</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </div>
  );
}
