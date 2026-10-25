'use client';

import SplitText from '@/components/ui/SplitText';
import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import DynamicIcon from '@/components/ui/Icon';
import CountUp from '@/components/ui/CountUp';
import PageHero from '@/components/PageHero';

export default function AboutUsPage() {
  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* 1. PHOTO HERO (shared across inner pages) */}
      <PageHero
        crumb="About Us"
        eyebrow="Our Story & Values"
        title="Passionate Local Experts in Sri Lanka"
        description="Founded on the belief that a holiday should be relaxing, comfortable, and tailored to you. We organize 100% private, flexible tours across Sri Lanka with dedicated English-speaking chauffeur guides and handpicked quality hotels."
        image="/images/kandy_dalada_maligawa_sunset.webp"
        imageAlt="Temple of the Tooth in Kandy at sunset"
        imagePosition="center 50%"
      />

      {/* 2. THE STORY / GENESIS */}
      <section className="w-full py-20 sm:py-24 bg-surface">
        <div className="max-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Narrative Column */}
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
                OUR STORY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight mb-5">
                <SplitText text="Over 10 Years of Excellence in Sri Lanka Travel" />
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-4">
                Leafline Ceylon was founded in Colombo by a team of passionate local travel professionals who recognized that crowded group bus tours prevent travelers from truly enjoying Sri Lanka.
              </p>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-8">
                We replace crowded tour buses with clean, modern air-conditioned private vehicles, generic package hotels with charming boutique resorts and authentic tea bungalows, and rushed itineraries with relaxed, customizable days.
              </p>

              {/* Founder Blockquote */}
              <div className="p-6 sm:p-7 bg-white rounded-2xl border border-[#cbdcd1]/80 shadow-xs">
                <span className="font-serif text-3xl text-secondary leading-none block -mb-1 opacity-60">
                  &ldquo;
                </span>
                <p className="font-serif text-base sm:text-lg italic text-primary leading-relaxed mb-4">
                  Sri Lanka is rich with ancient history, stunning landscapes, and genuine hospitality. Our promise is to ensure you experience our beautiful island comfortably, safely, and at your own pace.
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-[#cbdcd1]/60">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary border border-secondary">
                    <img
                      src="/images/team_founder.webp"
                      alt="Asanka Wickramasinghe"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-primary block">
                      Asanka Wickramasinghe
                    </span>
                    <span className="text-xs text-secondary font-semibold">
                      Founder &amp; Managing Director
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="relative rounded-3xl overflow-hidden h-[420px] sm:h-[480px] shadow-xl border border-[#cbdcd1]/60 bg-[#103c2e]">
              <img
                src="/images/nuwara_eliya_red_train_tea_hills.webp"
                alt="Ceylon Tea Country Highlands"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#103c2e]/85 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#103c2e]/85 backdrop-blur-md border border-white/20 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-secondary-fixed shrink-0" />
                  <span className="text-xs tracking-widest uppercase text-secondary-fixed font-bold">
                    TEA COUNTRY • HATTON &amp; ELLA
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#dde4df] leading-relaxed m-0">
                  Scenic tea estates and misty mountain viewpoints. Enjoy fresh Ceylon tea served with panoramic valley views.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NUMBERS STRIP */}
      <section className="w-full bg-[#103c2e] text-white py-14 sm:py-16 border-y border-[#b2f0d1]/15">
        <div className="max-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 10, suffix: '+', label: 'Years Experience', desc: 'Crafting memorable private tours across Sri Lanka' },
              { value: 100, suffix: '%', label: 'Private Tours', desc: 'Never shared with strangers; your own vehicle and driver' },
              { value: 100, suffix: '%', label: 'Transparent Pricing', desc: 'No hidden fees or unexpected commission shopping stops' },
              { value: 4.98, decimals: 2, suffix: ' / 5', label: 'Guest Satisfaction', desc: 'Over 380+ 5-star traveler reviews worldwide' },
            ].map((item, idx) => (
              <div key={idx} className="px-2">
                <CountUp
                  value={item.value}
                  decimals={item.decimals}
                  suffix={item.suffix}
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-secondary-fixed block leading-tight mb-1.5"
                />
                <span className="text-sm font-bold text-white block mb-1">
                  {item.label}
                </span>
                <span className="text-xs text-[#d0dfd7] leading-relaxed hidden sm:block">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GUIDING COMMITMENTS */}
      <section className="w-full py-20 sm:py-24 bg-white border-t border-[#cbdcd1]/60">
        <div className="max-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
              OUR PROMISES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight mb-3">
              <SplitText text="Why Travel With Us" />
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              The four commitments that ensure your Sri Lanka vacation is smooth, comfortable, and memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                idx: '01',
                icon: 'schedule',
                title: 'Relaxed & Flexible Pace',
                desc: 'We limit driving times and never pack too many places into one day. Plenty of time to relax at your hotel, enjoy meals, and take photos without feeling rushed.',
                pill: 'Unhurried Travel',
              },
              {
                idx: '02',
                icon: 'directions_car',
                title: 'Clean Private Vehicles',
                desc: 'Travel exclusively in modern, fully air-conditioned Toyota cars, vans, or SUVs with dedicated, licensed tourist chauffeur guides who speak fluent English.',
                pill: 'Comfort Guaranteed',
              },
              {
                idx: '03',
                icon: 'pets',
                title: 'Ethical Wildlife Safaris',
                desc: 'In Yala, Wilpattu, and Minneriya, our trusted safari jeep drivers respect park guidelines, keep a safe distance from wildlife, and avoid overcrowding animal sightings.',
                pill: 'Responsible Safari',
              },
              {
                idx: '04',
                icon: 'support_agent',
                title: '24/7 Dedicated Support',
                desc: 'From airport pickup to final drop-off, our Colombo office team is available around the clock via WhatsApp and phone to assist you with anything you need.',
                pill: 'Always With You',
              },
            ].map((tenet, idx) => (
              <div
                key={idx}
                className="group bg-[#edf4ef] p-6 sm:p-7 rounded-2xl border border-[#cbdcd1]/60 hover:border-secondary shadow-xs hover:shadow-md transition-all duration-300 flex flex-col relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-white text-secondary flex items-center justify-center shadow-xs">
                    <DynamicIcon name={tenet.icon} size={22} />
                  </div>
                  <span className="font-serif text-2xl font-bold text-secondary/30">
                    {tenet.idx}
                  </span>
                </div>

                <span className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-1.5 block">
                  {tenet.pill}
                </span>

                <h3 className="font-serif text-lg text-primary mb-2 font-semibold leading-snug">
                  {tenet.title}
                </h3>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed m-0">
                  {tenet.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MEET THE TEAM */}
      <section className="w-full py-20 sm:py-24 bg-surface">
        <div className="max-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
              OUR TEAM
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight mb-3">
              <SplitText text="The People Behind Your Tour" />
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              A great tour depends on local knowledge, reliability, and warm hospitality. Meet our team leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Asanka Wickramasinghe',
                role: 'Founder & Managing Director',
                image: '/images/team_founder.webp',
                specialty: 'Highland Tours & Cultural Heritage',
                bio: 'Born in the central highlands with over 15 years in Sri Lanka inbound tourism. Passionate about showing travelers the authentic heart of the island.',
              },
              {
                name: 'Dr. Nalin Samaraweera',
                role: 'Senior Naturalist & Wildlife Advisor',
                image: '/images/team_naturalist.webp',
                specialty: 'Yala Leopards & Birdwatching',
                bio: 'Experienced field naturalist with 18+ years guiding wildlife enthusiasts through Yala, Wilpattu, Sinharaja rainforest, and Mirissa whale waters.',
              },
              {
                name: 'Kumari Senanayake',
                role: 'Head of Operations & Guest Care',
                image: '/images/team_concierge.webp',
                specialty: 'Hotel Bookings & 24/7 Support',
                bio: 'Over 12 years coordinating seamless private transport, airport arrivals, and personalized hotel arrangements for international travelers.',
              },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-[#cbdcd1]/80 hover:border-secondary shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative w-full h-64 overflow-hidden bg-[#103c2e]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#103c2e]/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-3.5 left-4 px-3 py-1 rounded-full bg-[#103c2e]/85 backdrop-blur-md text-secondary-fixed text-[0.68rem] font-bold tracking-wider uppercase border border-[rgba(178,240,209,0.3)]">
                    {member.specialty}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-xl text-primary mb-1 font-semibold">
                    {member.name}
                  </h3>
                  <span className="text-xs text-secondary font-semibold block mb-3">
                    {member.role}
                  </span>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed m-0">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ACCREDITATION & CERTIFICATION */}
      <section className="w-full py-20 sm:py-24 bg-white border-t border-[#cbdcd1]/60">
        <div className="max-container">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-2">
              ACCREDITATION &amp; SAFETY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal leading-tight mb-3">
              <SplitText text="Licensed & Certified Tour Operator" />
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              Leafline Ceylon is a fully licensed inbound tour operator registered with the Sri Lanka Tourism Development Authority (Registration No: <strong className="text-primary font-semibold">SLTDA/SQA/TA/01482</strong>).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'verified',
                title: 'SLTDA Licensed Agency',
                cert: 'License: SLTDA/SQA/TA/01482',
                desc: 'Government-certified tour operator adhering strictly to passenger safety standards, fair pricing, and professional ethics.',
              },
              {
                icon: 'shield',
                title: 'Comprehensive Passenger Cover',
                cert: 'Full Travel Insurance Protection',
                desc: 'All vehicles carry comprehensive passenger liability insurance for complete peace of mind throughout your journey.',
              },
              {
                icon: 'support_agent',
                title: '24/7 Dedicated Assistance',
                cert: 'Always Available',
                desc: 'Direct hotline and WhatsApp support available at all times during your tour in Sri Lanka.',
              },
            ].map((cred, i) => (
              <div
                key={i}
                className="bg-[#edf4ef] p-6 sm:p-7 rounded-2xl border border-[#cbdcd1]/60 hover:border-secondary transition-all flex flex-col"
              >
                <div className="flex items-center md:flex-col md:items-start lg:flex-row lg:items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-secondary flex items-center justify-center shrink-0 shadow-xs">
                    <DynamicIcon name={cred.icon} size={22} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-primary m-0 leading-snug">{cred.title}</h3>
                    <span className="text-[11px] text-secondary tracking-wide uppercase font-semibold">
                      {cred.cert}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed m-0">
                  {cred.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
