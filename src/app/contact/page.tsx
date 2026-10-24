'use client';

import SplitText from '@/components/ui/SplitText';
import React, { useState } from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import {
  Building2,
  Headset,
  MessageCircle,
  Mail,
  MailCheck,
  ChevronDown,
  Send,
  Sparkles,
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    guests: '2 Guests (Couple)',
    style: 'Grand Sri Lanka Tour',
    duration: '8–10 Days',
    message: '',
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do international guests need a visa before arriving in Sri Lanka?',
      a: 'Most international visitors require an Electronic Travel Authorization (ETA) prior to arrival. It can easily be obtained online via the official Sri Lanka immigration portal. Upon booking your circuit, our team provides step-by-step assistance and itinerary documentation for smooth visa clearance.',
    },
    {
      q: 'What vehicles are used for private chauffeured tours?',
      a: 'We operate modern, fully air-conditioned executive vehicles: Toyota Land Cruiser Prado 4x4 SUVs, Mercedes-Benz sedans, and Toyota HiAce / Vellfire passenger vans. All vehicles feature cooled bottled water, wet towels, Wi-Fi, and are driven by licensed English-speaking chauffeur guides.',
    },
    {
      q: 'How does the weather change between the coast and the tea country?',
      a: 'While coastal beaches and the Cultural Triangle are warm and tropical (28°C–32°C), the central tea highlands around Nuwara Eliya and Ella sit at high elevation where evenings cool to 12°C–16°C. We suggest packing light summer attire with a comfortable warm layer for mountain evenings.',
    },
    {
      q: 'Can itineraries be customized once we have arrived on the island?',
      a: 'Yes, completely. Because every voyage with Leafline Ceylon is 100% private with your own dedicated vehicle and chauffeur-guide, you enjoy total flexibility. You may pause for spontaneous photo stops, adjust departure times, or linger longer at sights without group rush.',
    },
    {
      q: 'How does luggage handling work during scenic train journeys?',
      a: 'You travel aboard the scenic observation carriage with only your light day bag and camera. Your chauffeur-guide safely transports all heavy luggage ahead by car and greets you with your bags directly on the platform of your arrival station.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* 1. PHOTO HERO (shared across inner pages) */}
      <PageHero
        crumb="Contact & Inquiries"
        eyebrow="Get in Touch • 24/7 Support"
        title="Contact Our Sri Lanka Tour Specialists"
        description="Whether you need a full custom tour package, private airport transfer, or hotel recommendations, our friendly local team in Colombo is here to assist you."
        image="/images/colombo_city_skyline.webp"
        imageAlt="Colombo city skyline"
        imagePosition="center 50%"
      />

      {/* 2. CONTACT CHANNELS (4 CARDS) */}
      <section className="w-full py-14 sm:py-16 bg-surface">
        <div className="max-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Colombo Office */}
            <div className="bg-white p-7 sm:p-8 rounded-2xl border border-[#cbdcd1]/80 hover:border-secondary shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-[#edf4ef] text-secondary flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                Colombo Office
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                No. 42 Alfred House Gardens, Colombo 03, Sri Lanka
              </p>
              <div className="mt-auto pt-3 border-t border-[#cbdcd1]/60 flex justify-between items-center text-xs">
                <span className="text-outline">08:30 – 18:30 IST</span>
                <span className="font-semibold text-secondary">Open Today</span>
              </div>
            </div>

            {/* Card 2: Phone & Hotline */}
            <div className="bg-white p-7 sm:p-8 rounded-2xl border border-[#cbdcd1]/80 hover:border-secondary shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-[#edf4ef] text-secondary flex items-center justify-center mb-4">
                <Headset className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                Phone &amp; 24/7 Hotline
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                +94 11 234 5678 (Office)<br />
                +94 77 123 4567 (Hotline)
              </p>
              <div className="mt-auto pt-3 border-t border-[#cbdcd1]/60 flex justify-between items-center text-xs">
                <span className="text-secondary font-semibold">24/7 Available</span>
                <a
                  href="tel:+94112345678"
                  className="font-bold text-secondary hover:text-primary no-underline transition-colors"
                >
                  Call Direct &rarr;
                </a>
              </div>
            </div>

            {/* Card 3: WhatsApp Chat */}
            <div className="bg-white p-7 sm:p-8 rounded-2xl border border-[#cbdcd1]/80 hover:border-secondary shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-[#25d366]/12 text-[#25d366] flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                WhatsApp Support
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                Chat directly with our tour specialists for instant advice and quotes.
              </p>
              <div className="mt-auto pt-3 border-t border-[#cbdcd1]/60 flex justify-between items-center text-xs">
                <span className="text-outline">Instant Replies</span>
                <a
                  href="https://wa.me/94771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-secondary hover:text-primary no-underline transition-colors"
                >
                  Open Chat &rarr;
                </a>
              </div>
            </div>

            {/* Card 4: Official Email */}
            <div className="bg-white p-7 sm:p-8 rounded-2xl border border-[#cbdcd1]/80 hover:border-secondary shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-[#edf4ef] text-secondary flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                Email Inquiries
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                info@leaflineceylon.com<br />
                bookings@leaflineceylon.com
              </p>
              <div className="mt-auto pt-3 border-t border-[#cbdcd1]/60 flex justify-between items-center text-xs">
                <span className="text-outline">&lt; 4h Response</span>
                <a
                  href="mailto:info@leaflineceylon.com"
                  className="font-bold text-secondary hover:text-primary no-underline transition-colors"
                >
                  Send Email &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN SECTION: INQUIRY FORM vs FAQs & PLANNER */}
      <section className="w-full py-16 sm:py-20 bg-white border-t border-[#cbdcd1]/60">
        <div className="max-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Form Column (7 cols on lg) */}
            <div className="lg:col-span-7 bg-[#edf4ef] rounded-3xl p-8 sm:p-12 border border-[#cbdcd1]/80 shadow-xs">
              <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
                GET A FREE QUOTE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary font-normal leading-tight mb-3">
                <SplitText text="Request a Custom Tour Itinerary" />
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-8">
                Share your travel dates and preferences. One of our Ceylon travel specialists will review and prepare a personalized day-by-day proposal within 24 hours.
              </p>

              {submitted ? (
                <div className="text-center py-10 px-6 bg-white rounded-2xl border border-secondary/30 shadow-xs">
                  <div className="w-14 h-14 rounded-full bg-secondary text-white flex items-center justify-center mx-auto mb-4">
                    <MailCheck className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-2">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed max-w-md mx-auto mb-6">
                    Thank you, {form.name || 'valued traveler'}. We have received your inquiry and will contact you via email or WhatsApp within 4 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        travelDate: '',
                        guests: '2 Guests (Couple)',
                        style: 'Grand Sri Lanka Tour',
                        duration: '8–10 Days',
                        message: '',
                      });
                    }}
                    className="bg-secondary hover:bg-secondary-fixed text-white hover:text-primary px-8 py-3 rounded-full font-semibold text-xs tracking-wide transition-colors cursor-pointer border-0 shadow-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold text-on-surface block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David & Sarah Jenkins"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#cbdcd1] bg-white text-sm outline-hidden transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-on-surface block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#cbdcd1] bg-white text-sm outline-hidden transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-on-surface block mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+44 7123 456789"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#cbdcd1] bg-white text-sm outline-hidden transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-on-surface block mb-1.5">
                        Target Travel Dates
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. November 2026 / Flexible"
                        value={form.travelDate}
                        onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#cbdcd1] bg-white text-sm outline-hidden transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-on-surface block mb-1.5">
                        Number of Travelers
                      </label>
                      <div className="relative">
                        <select
                          value={form.guests}
                          onChange={(e) => setForm({ ...form, guests: e.target.value })}
                          className="w-full appearance-none px-4 py-3 rounded-xl border border-[#cbdcd1] bg-white text-sm outline-hidden transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary cursor-pointer pr-10"
                        >
                          <option value="1 Solo Traveler">1 Solo Traveler</option>
                          <option value="2 Guests (Couple)">2 Guests (Couple)</option>
                          <option value="3–4 Guests (Family)">3–4 Guests (Family)</option>
                          <option value="5+ Guests (Private Group)">5+ Guests (Private Group)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-secondary">
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-on-surface block mb-1.5">
                        Preferred Tour Style
                      </label>
                      <div className="relative">
                        <select
                          value={form.style}
                          onChange={(e) => setForm({ ...form, style: e.target.value })}
                          className="w-full appearance-none px-4 py-3 rounded-xl border border-[#cbdcd1] bg-white text-sm outline-hidden transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary cursor-pointer pr-10"
                        >
                          <option value="Grand Sri Lanka Tour">Grand Sri Lanka Tour (Highlights)</option>
                          <option value="Wildlife Safari Tour">Wildlife &amp; Safari Tour</option>
                          <option value="Highlands & Tea Country">Highlands &amp; Scenic Train</option>
                          <option value="Romantic Honeymoon">Romantic Sri Lanka Honeymoon</option>
                          <option value="Cultural Heritage Tour">Cultural Heritage &amp; Ancient Cities</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-secondary">
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-on-surface block mb-1.5">
                        Estimated Duration
                      </label>
                      <div className="relative">
                        <select
                          value={form.duration}
                          onChange={(e) => setForm({ ...form, duration: e.target.value })}
                          className="w-full appearance-none px-4 py-3 rounded-xl border border-[#cbdcd1] bg-white text-sm outline-hidden transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary cursor-pointer pr-10"
                        >
                          <option value="5–7 Days">5–7 Days (Short Highlights)</option>
                          <option value="8–10 Days">8–10 Days (Most Popular)</option>
                          <option value="11–14 Days">11–14 Days (Complete Tour)</option>
                          <option value="15+ Days">15+ Days (Extended Tour)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-secondary">
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-on-surface block mb-1.5">
                      Your Message or Special Wishes
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us what places you want to see, hotel preferences, dietary requirements, or flight timings..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#cbdcd1] bg-white text-sm outline-hidden transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary resize-y"
                    />
                  </div>

                  {/* Submission Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#0c5037] hover:bg-[#103c2e] text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md transition-all duration-300 hover:-translate-y-0.5 mt-2 cursor-pointer border-0"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-4.5 h-4.5 shrink-0" />
                  </button>

                  <span className="text-[11px] text-outline text-center block mt-1">
                    Your details are 100% confidential and never shared with third parties.
                  </span>
                </form>
              )}
            </div>

            {/* Right Column: FAQs & Interactive Trip Builder (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-primary mb-6 leading-tight font-normal">
                  <SplitText text="Sri Lanka Travel FAQs" />
                </h2>

                <div className="flex flex-col gap-3">
                  {faqs.map((faq, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div
                        key={idx}
                        className={`bg-[#edf4ef] rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isOpen ? 'border-secondary/40 shadow-xs' : 'border-[#cbdcd1]/60'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveFaq(isOpen ? null : idx)}
                          className={`w-full p-4 sm:px-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer border-0 ${
                            isOpen ? 'bg-white/60' : 'bg-transparent'
                          }`}
                        >
                          <span className={`text-xs sm:text-sm font-semibold ${isOpen ? 'text-secondary' : 'text-primary'}`}>
                            {faq.q}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                              isOpen ? 'text-secondary rotate-180' : 'text-outline rotate-0'
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-on-surface-variant leading-relaxed border-t border-[#cbdcd1]/50">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Trip Planner Card */}
              <div className="p-8 sm:p-9 bg-[#103c2e] text-white rounded-3xl border border-[rgba(178,240,209,0.2)] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-[radial-gradient(circle,rgba(178,240,209,0.12)_0%,transparent_70%)] pointer-events-none" />

                <span className="text-[10px] tracking-[0.18em] uppercase text-secondary-fixed font-bold block mb-2">
                  PLAN YOUR TRIP ONLINE
                </span>
                <h4 className="font-serif text-2xl text-white mb-2 leading-snug font-normal">
                  Want to Customize Your Route?
                </h4>
                <p className="text-xs sm:text-sm text-[#dde4df] leading-relaxed mb-6">
                  Use our step-by-step trip planner to select your destinations, activities, and hotel preferences, and get a custom itinerary within 24 hours.
                </p>
                <Link
                  href="/plan-trip"
                  className="bg-secondary text-white hover:bg-secondary-fixed hover:text-primary px-7 py-3.5 rounded-full font-semibold text-xs tracking-wide inline-flex items-center gap-2 shadow-md transition-all duration-200 hover:-translate-y-0.5 no-underline"
                >
                  <span>Start Planning Your Trip</span>
                  <Sparkles className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
