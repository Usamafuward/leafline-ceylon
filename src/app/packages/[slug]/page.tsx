'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { TOURS_DATA, TourPackage } from '@/data/tours';
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  ArrowDown,
  Clock,
  Hotel,
  Compass,
  Car,
  ChevronDown,
  Utensils,
  Check,
  XCircle,
  X,
  Send,
} from 'lucide-react';

export default function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const tour = TOURS_DATA.find((t) => t.slug === resolvedParams.slug) || TOURS_DATA[0];

  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [guestsCount, setGuestsCount] = useState(2);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: '',
  });

  const toggleDay = (day: number) => {
    setActiveDay(activeDay === day ? null : day);
  };

  const totalPrice = tour.pricePerPerson * guestsCount;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* SECTION 1: HEADER & BREADCRUMBS */}
      <section className="w-full bg-[#00251a] text-white pt-28 sm:pt-32 pb-10 relative overflow-hidden">
        <img
          src={tour.heroImage}
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] opacity-25 saturate-[0.85] pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00251a]/85 via-[#103c2e]/65 to-[#00251a]/95 pointer-events-none" />

        <div className="max-container relative z-10">
          <nav className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.14em] text-secondary-fixed mb-6">
            <Link href="/" className="text-[#d8e5dd] hover:text-white transition-colors no-underline">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <Link href="/packages" className="text-[#d8e5dd] hover:text-white transition-colors no-underline">
              Packages
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-white font-semibold">{tour.title}</span>
          </nav>

          {/* Title Row & Investment Tier */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 pb-8 border-b border-white/15">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-secondary-fixed text-[0.75rem] font-bold tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-secondary-fixed shrink-0" />
                  <span>Signature Expedition • Private &amp; Bespoke</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[0.75rem] font-medium">
                  <Calendar className="w-3.5 h-3.5 text-secondary-fixed shrink-0" />
                  <span>Ideal: {tour.idealSeason}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[0.75rem] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary-fixed shrink-0" />
                  <span>100% Carbon Balanced</span>
                </span>
              </div>

              <h1 className="font-serif text-[clamp(2rem,4vw,3.25rem)] text-white font-normal leading-[1.15] tracking-tight mb-4">
                {tour.title}
              </h1>

              <p className="text-[1.05rem] text-[#f0f5f2] leading-relaxed max-w-3xl font-light">
                {tour.overview}
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-white rounded-2xl p-7 border border-[#cbdcd1]/80 shadow-[0_10px_30px_rgba(0,0,0,0.15)] min-w-[280px] flex flex-col justify-between text-on-surface">
              <div>
                <span className="text-[0.72rem] uppercase tracking-wider text-outline font-semibold">
                  Investment Tier
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-serif text-4xl font-bold text-primary">
                    ${tour.pricePerPerson.toLocaleString()}
                  </span>
                  <span className="text-[0.85rem] text-on-surface-variant">/ person</span>
                </div>
                <p className="text-[0.78rem] text-secondary mt-1 font-semibold">
                  All-inclusive private voyage for 2 guests
                </p>
              </div>

              <a
                href="#booking-dossier"
                className="mt-5 w-full py-3.5 px-6 rounded-full bg-[#0c5037] hover:bg-[#103c2e] text-white font-semibold text-[0.88rem] flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(12,80,55,0.3)] transition-all duration-200"
              >
                <span>Customize This Circuit</span>
                <ArrowDown className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10.5 h-10.5 rounded-full bg-white/15 flex items-center justify-center text-secondary-fixed flex-shrink-0">
                <Clock className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <span className="text-[0.72rem] uppercase text-[#d8e5dd] tracking-wider block">
                  Duration
                </span>
                <p className="text-[0.92rem] font-semibold text-white m-0">{tour.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10.5 h-10.5 rounded-full bg-white/15 flex items-center justify-center text-secondary-fixed flex-shrink-0">
                <Hotel className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <span className="text-[0.72rem] uppercase text-[#d8e5dd] tracking-wider block">
                  Lodging
                </span>
                <p className="text-[0.92rem] font-semibold text-white m-0">{tour.accommodationGrade}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10.5 h-10.5 rounded-full bg-white/15 flex items-center justify-center text-secondary-fixed flex-shrink-0">
                <Compass className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <span className="text-[0.72rem] uppercase text-[#d8e5dd] tracking-wider block">
                  Pacing
                </span>
                <p className="text-[0.92rem] font-semibold text-white m-0">Unhurried &amp; Private</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10.5 h-10.5 rounded-full bg-white/15 flex items-center justify-center text-secondary-fixed flex-shrink-0">
                <Car className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <span className="text-[0.72rem] uppercase text-[#d8e5dd] tracking-wider block">
                  Transit
                </span>
                <p className="text-[0.92rem] font-semibold text-white m-0">{tour.transitStyle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ASYMMETRIC HERO GALLERY MOSAIC */}
      <section className="w-full py-8 pb-16">
        <div className="max-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl overflow-hidden">
            {tour.galleryImages.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className="h-70 overflow-hidden relative group"
              >
                <img
                  src={img}
                  alt={`${tour.title} Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: DAY-BY-DAY ITINERARY ACCORDION & BOOKING DOSSIER */}
      <section className="w-full pb-24">
        <div className="max-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            {/* Left Column: Day-by-Day Accordion (8 cols on lg) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[0.72rem] tracking-[0.15em] uppercase text-secondary font-semibold">
                    EXPEDITION DOSSIER
                  </span>
                  <h2 className="font-serif text-3xl text-primary font-normal mt-1">
                    Day-by-Day Itinerary
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDay(activeDay ? null : 1)}
                  className="text-[0.8rem] text-secondary font-semibold bg-transparent border-none cursor-pointer hover:underline"
                >
                  {activeDay ? 'Collapse View' : 'Expand View'}
                </button>
              </div>

              {/* Accordion List */}
              <div className="flex flex-col gap-4">
                {tour.itinerary.map((day) => {
                  const isOpen = activeDay === day.day;
                  return (
                    <div
                      key={day.day}
                      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                          ? 'border-secondary shadow-[0_8px_24px_-4px_rgba(16,60,46,0.1)]'
                          : 'border-surface-container-high'
                        }`}
                    >
                      {/* Accordion Header */}
                      <button
                        type="button"
                        onClick={() => toggleDay(day.day)}
                        className="w-full p-5 sm:px-6 flex items-center justify-between gap-4 bg-transparent border-none cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[0.82rem] flex-shrink-0 ${isOpen ? 'bg-primary text-white' : 'bg-surface-container-low text-primary'
                              }`}
                          >
                            {day.day < 10 ? `0${day.day}` : day.day}
                          </span>
                          <div>
                            <span className="text-[0.72rem] uppercase text-secondary font-semibold block">
                              {day.location}
                            </span>
                            <h3 className="text-base font-semibold text-on-surface mt-0.5">
                              {day.title}
                            </h3>
                          </div>
                        </div>

                        <ChevronDown
                          className={`w-5 h-5 text-outline transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                      </button>

                      {/* Accordion Content */}
                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-[0.9rem] text-on-surface-variant leading-relaxed border-t border-surface-container-low pt-4 sm:pl-19">
                          <p className="text-[0.9rem] text-on-surface-variant leading-relaxed mb-5">
                            {day.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {day.highlights.map((h, i) => (
                              <span
                                key={i}
                                className="text-[0.78rem] px-3 py-1 rounded-full bg-surface-container-low text-secondary font-medium"
                              >
                                ✓ {h}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-6 text-[0.82rem] text-outline pt-3 border-t border-dashed border-surface-container-high">
                            <span className="flex items-center gap-1.5">
                              <Hotel className="w-4 h-4 shrink-0" />
                              Stay: <strong className="text-on-surface ml-1">{day.stay}</strong>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Utensils className="w-4 h-4 shrink-0" />
                              {day.meals}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Inclusions & Exclusions */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 sm:p-10 rounded-3xl border border-surface-container-high">
                <div>
                  <h3 className="font-serif text-xl text-primary mb-5 flex items-center gap-2 font-normal">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span>What is Included</span>
                  </h3>
                  <ul className="list-none flex flex-col gap-3 p-0 m-0">
                    {tour.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[0.85rem] text-on-surface-variant">
                        <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-primary mb-5 flex items-center gap-2 font-normal">
                    <XCircle className="w-5 h-5 text-outline shrink-0" />
                    <span>What is Not Included</span>
                  </h3>
                  <ul className="list-none flex flex-col gap-3 p-0 m-0">
                    {tour.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[0.85rem] text-on-surface-variant">
                        <X className="w-4 h-4 text-outline flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Live Booking & Customization Sticky Dossier (4-5 cols on lg) */}
            <div
              id="booking-dossier"
              className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl p-8 sm:p-9 border border-surface-container-high shadow-[0_12px_36px_-8px_rgba(0,37,26,0.08)] sticky top-28"
            >
              <div className="mb-6">
                <span className="text-[0.72rem] tracking-[0.15em] uppercase text-secondary font-semibold">
                  CUSTOMIZE &amp; RESERVE
                </span>
                <h3 className="font-serif text-2xl text-primary font-normal mt-1">
                  Private Voyage Dossier
                </h3>
              </div>

              {bookingSubmitted ? (
                <div className="p-8 sm:p-6 bg-surface-container-low rounded-2xl text-center">
                  <CheckCircle2 className="w-12 h-12 text-secondary mb-3 mx-auto" />
                  <h4 className="font-serif text-xl text-primary mb-2 font-normal">
                    Inquiry Received Successfully!
                  </h4>
                  <p className="text-[0.88rem] text-on-surface-variant leading-relaxed mb-5">
                    Thank you, {bookingForm.name || 'valued traveler'}. Our travel specialists will review your dates and send a personalized itinerary and quote within 24 hours.
                  </p>
                  <a
                    href={`https://wa.me/94771234567?text=Hello%20Lanka%20Memo%2C%20I%20just%20submitted%20a%20booking%20inquiry%20for%20${encodeURIComponent(tour.title)}%20for%20${guestsCount}%20guests.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-[0.9rem] flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(37,211,102,0.3)] transition-all duration-200"
                  >
                    <span>Instant WhatsApp Follow-up</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4.5">
                  {/* Guest Counter */}
                  <div>
                    <label className="text-[0.8rem] font-semibold text-on-surface block mb-2">
                      Party Size (Travelers)
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                        className="w-9 h-9 rounded-full border border-surface-container-high bg-white cursor-pointer text-lg font-semibold flex items-center justify-center hover:border-primary"
                      >
                        -
                      </button>
                      <span className="text-base font-bold min-w-10 text-center">
                        {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuestsCount(guestsCount + 1)}
                        className="w-9 h-9 rounded-full border border-surface-container-high bg-white cursor-pointer text-lg font-semibold flex items-center justify-center hover:border-primary"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Travel Dates */}
                  <div>
                    <label className="text-[0.8rem] font-semibold text-on-surface block mb-1.5">
                      Preferred Travel Month / Date
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-surface-container-high text-[0.88rem] outline-none transition-colors focus:border-secondary"
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="text-[0.8rem] font-semibold text-on-surface block mb-1.5">
                      Lead Traveler Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord & Lady Charlesworth"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-surface-container-high text-[0.88rem] outline-none transition-colors focus:border-secondary"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[0.8rem] font-semibold text-on-surface block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="traveler@luxury.com"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-surface-container-high text-[0.88rem] outline-none transition-colors focus:border-secondary"
                    />
                  </div>

                  {/* Live Total Calculation */}
                  <div className="p-4 bg-surface-container-low rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-[0.72rem] uppercase text-outline block">
                        Estimated All-Inclusive Total
                      </span>
                      <p className="text-2xl font-bold text-primary m-0 font-serif">
                        ${totalPrice.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-[0.75rem] text-secondary font-semibold">
                      (${tour.pricePerPerson} × {guestsCount})
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#0c5037] hover:bg-[#103c2e] text-white font-semibold text-[0.9rem] flex items-center justify-center gap-2 shadow-[0_8px_20px_-3px_rgba(12,80,55,0.4)] transition-all duration-200 cursor-pointer"
                  >
                    <span>Request Tailored Dossier</span>
                    <Send className="w-4 h-4 shrink-0" />
                  </button>

                  <p className="text-[0.72rem] text-outline text-center leading-normal m-0">
                    Zero obligation. 100% customizable. You will receive direct communication from our resident team in Colombo.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
