'use client';

import React from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import { CheckCircle2, Speech, ShieldCheck, Sparkles } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* 1. HERO BANNER */}
      <section className="w-full bg-[#103c2e] text-white pt-28 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(178,240,209,0.12)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-container relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-secondary-fixed mb-5">
            <Link href="/" className="text-white/80 hover:text-white no-underline transition-colors">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-white font-semibold">Services</span>
          </nav>

          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs tracking-widest uppercase text-secondary-fixed font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
            PREMIUM TRAVEL SERVICES &amp; PRIVATE VEHICLES
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] max-w-4xl mb-4">
            Private Chauffeurs &amp; Travel Services
          </h1>

          <p className="text-white/85 text-sm sm:text-base max-w-3xl leading-relaxed">
            Every journey with Lanka Memo Holidays is organized with care and reliability. From personal meet and greet at Colombo Airport to scenic train tickets and private 4x4 safari jeeps.
          </p>
        </div>
      </section>

      {/* 2. CONCIERGE SERVICES GRID */}
      <section className="w-full py-16 sm:py-20 bg-surface">
        <div className="max-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
              CURATED CONCIERGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight">
              Private Tour Transport &amp; Excursions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service, idx) => (
              <div key={service.id} className={`reveal-card stagger-${(idx % 3) + 1} h-full`}>
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE CHAUFFEUR-GUIDE ETHOS */}
      <section className="w-full py-20 sm:py-24 bg-white border-t border-[#cbdcd1]/60">
        <div className="max-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Narrative & Pillars */}
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
                THE CHAUFFEUR-GUIDE ETHOS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight mb-4">
                More than a Driver. Your Personal Host in Ceylon.
              </h2>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed mb-8">
                In Sri Lanka, the chemistry between you and your chauffeur-guide defines your journey. Our chauffeurs are cultured ambassadors of the island with a minimum of 8 years of luxury hospitality experience.
              </p>

              {/* 4 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#edf4ef] border border-[#cbdcd1]/60">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <strong className="text-sm text-primary font-semibold">SLTDA Licensed</strong>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed m-0">
                    Accredited by the Sri Lanka Tourism Development Authority.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#edf4ef] border border-[#cbdcd1]/60">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Speech className="w-5 h-5 text-secondary shrink-0" />
                    <strong className="text-sm text-primary font-semibold">Articulate &amp; Discreet</strong>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed m-0">
                    Fluent in English with rich historical and wildlife knowledge.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#edf4ef] border border-[#cbdcd1]/60">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <ShieldCheck className="w-5 h-5 text-secondary shrink-0" />
                    <strong className="text-sm text-primary font-semibold">Defensive Certified</strong>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed m-0">
                    Mastery over highland mountain passes and city routes.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#edf4ef] border border-[#cbdcd1]/60">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <Sparkles className="w-5 h-5 text-secondary shrink-0" />
                    <strong className="text-sm text-primary font-semibold">Always Anticipating</strong>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed m-0">
                    Cooled King Coconuts, fresh cold towels, and photo stops.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Visual */}
            <div className="relative rounded-3xl overflow-hidden h-[360px] sm:h-[420px] shadow-xl border border-[#cbdcd1]/60">
              <img
                src="/images/sri_lanka_airport_welcome_garland.webp"
                alt="Personal Chauffeur Host in Ceylon"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#103c2e]/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] tracking-widest uppercase text-secondary-fixed font-bold block mb-1">
                  LANKA MEMO STANDARD
                </span>
                <p className="text-sm sm:text-base font-medium m-0">
                  8+ Years Average Experience per Chauffeur Guide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
