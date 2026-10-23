'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DynamicIcon from '@/components/ui/Icon';
import {
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  PlusCircle,
  CheckSquare,
  Square,
  Circle,
  MailCheck,
  Send,
} from 'lucide-react';

export default function PlanTripPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [partyType, setPartyType] = useState('Couple / 2 Adults');
  const [durationDays, setDurationDays] = useState(10);
  const [travelMonth, setTravelMonth] = useState('January - April (Best Beach & Wildlife Season)');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    'Sigiriya & Cultural Triangle',
    'Kandy & Sacred Temple',
    'Nuwara Eliya & Tea Country',
    'Ella & Nine Arch Bridge',
    'Yala National Park Safari',
    'Galle Fort & South Coast Beach',
  ]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([
    'Sigiriya Rock Fortress at Sunrise',
    'Kandy to Ella Scenic Train Ride',
    'Yala Wildlife Safari (4x4 Jeep)',
    'Mirissa Whale Watching Boat Tour',
  ]);
  const [lodgingGrade, setLodgingGrade] = useState('4-Star Hotels & Heritage Resorts');
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isDispatched, setIsDispatched] = useState(false);

  // Toggle helpers
  const toggleDestination = (name: string) => {
    if (selectedDestinations.includes(name)) {
      setSelectedDestinations(selectedDestinations.filter((e) => e !== name));
    } else {
      setSelectedDestinations([...selectedDestinations, name]);
    }
  };

  const toggleExperience = (name: string) => {
    if (selectedExperiences.includes(name)) {
      setSelectedExperiences(selectedExperiences.filter((p) => p !== name));
    } else {
      setSelectedExperiences([...selectedExperiences, name]);
    }
  };

  // Base price calculation estimate (realistic Sri Lanka private tour rates)
  const baseRatePerDay = lodgingGrade.includes('5-Star') || lodgingGrade.includes('Villa') 
    ? 210 
    : lodgingGrade.includes('4-Star') 
    ? 155 
    : 110;
  const estimatedTotal = durationDays * baseRatePerDay * (partyType.includes('Solo') ? 1 : 2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDispatched(true);
  };

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
            <span className="text-white font-semibold">Plan Your Trip</span>
          </nav>

          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs tracking-widest uppercase text-secondary-fixed font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
            CUSTOM TRIP PLANNER • SRI LANKA
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] max-w-3xl mb-4">
            Plan Your Custom Sri Lanka Holiday
          </h1>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl leading-relaxed">
            Tell us how you like to travel, choose your favorite destinations and experiences, and get a personalized day-by-day itinerary with transparent pricing within 24 hours.
          </p>
        </div>
      </section>

      {/* 2. 5-STEP NAVIGATOR PILL BAR */}
      <section className="w-full bg-[#edf4ef]/95 backdrop-blur-md py-3.5 z-30 border-b border-[#cbdcd1]/80 shadow-xs">
        <div className="max-container">
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { num: 1, label: '01 Who & When' },
              { num: 2, label: '02 Destinations' },
              { num: 3, label: '03 Experiences' },
              { num: 4, label: '04 Hotels' },
              { num: 5, label: '05 Contact & Quote' },
            ].map((step) => {
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex-1 min-w-[140px] py-2 px-3 rounded-full text-xs font-semibold tracking-wider uppercase cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 border ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : isPast
                      ? 'bg-white text-secondary border-[#cbdcd1]'
                      : 'bg-white/60 text-on-surface-variant border-transparent hover:bg-white hover:text-primary'
                  }`}
                >
                  <span
                    className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isActive
                        ? 'bg-secondary-fixed text-primary'
                        : isPast
                        ? 'bg-secondary text-white'
                        : 'bg-black/8 text-inherit'
                    }`}
                  >
                    {isPast ? '✓' : step.num}
                  </span>
                  <span>{step.label.slice(3)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MAIN BUILDER & LIVE TRIP SUMMARY GRID */}
      <section className="w-full py-16 sm:py-20 bg-surface">
        <div className="max-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Dynamic Step Content (7–8 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
              {/* STEP 1: PARTY & DURATION */}
              {currentStep === 1 && (
                <div className="flex flex-col gap-8">
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-1">
                      STEP 01 / TRAVELERS &amp; DURATION
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                      Who is traveling?
                    </h2>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                      Select who is traveling so we can suggest the ideal private vehicle, room setup, and itinerary pace.
                    </p>
                  </div>

                  {/* Party Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      {
                        title: 'Couple / 2 Adults',
                        desc: 'Romantic getaways, boutique hotels & scenic views.',
                        icon: 'favorite',
                      },
                      {
                        title: 'Family with Kids',
                        desc: 'Spacious van, family suites & child-friendly activities.',
                        icon: 'family_restroom',
                      },
                      {
                        title: 'Group of Friends',
                        desc: 'Private air-conditioned minibus with plenty of luggage room.',
                        icon: 'diversity_3',
                      },
                      {
                        title: 'Solo Traveler',
                        desc: 'Private car with experienced, friendly local driver guide.',
                        icon: 'person_pin',
                      },
                      {
                        title: 'Wildlife & Photography',
                        desc: 'Safari-focused itinerary with extended park game drives.',
                        icon: 'camera_alt',
                      },
                      {
                        title: 'Culture & Heritage',
                        desc: 'Ancient UNESCO ruins, temples & historic towns.',
                        icon: 'temple_buddhist',
                      },
                    ].map((item) => {
                      const isSelected = partyType === item.title;
                      return (
                        <div
                          key={item.title}
                          onClick={() => setPartyType(item.title)}
                          className={`p-5 sm:p-6 rounded-2xl cursor-pointer flex flex-col justify-between min-h-[140px] shadow-xs transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#103c2e] text-white border-2 border-secondary-fixed shadow-md'
                              : 'bg-white text-on-surface border border-[#cbdcd1]/80 hover:border-secondary'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <DynamicIcon
                              name={item.icon}
                              size={26}
                              className={
                                isSelected ? 'text-secondary-fixed' : 'text-secondary'
                              }
                            />
                            {isSelected && (
                              <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-base font-semibold">{item.title}</h3>
                            <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-[#dde4df]' : 'text-on-surface-variant'}`}>
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Duration Slider */}
                  <div className="bg-white rounded-2xl p-7 border border-[#cbdcd1]/80 shadow-xs">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs sm:text-sm font-semibold text-primary">
                        Trip Duration: <strong>{durationDays} Days / {durationDays - 1} Nights</strong>
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#edf4ef] text-secondary text-xs font-bold">
                        {durationDays >= 12 ? 'Relaxed Circuit' : 'Popular Highlights'}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={5}
                      max={21}
                      step={1}
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="w-full accent-[#0c5037] h-2 rounded-lg cursor-pointer bg-[#edf4ef]"
                    />

                    <div className="flex justify-between mt-2.5 text-xs text-on-surface-variant">
                      <span>5 Days (Short Break)</span>
                      <span>10-12 Days (Most Popular)</span>
                      <span>21 Days (Grand Tour)</span>
                    </div>
                  </div>

                  {/* Travel Window */}
                  <div className="bg-white rounded-2xl p-7 border border-[#cbdcd1]/80 shadow-xs">
                    <label className="text-xs sm:text-sm font-semibold text-primary block mb-2.5">
                      When do you plan to travel?
                    </label>
                    <div className="relative">
                      <select
                        value={travelMonth}
                        onChange={(e) => setTravelMonth(e.target.value)}
                        className="w-full appearance-none p-3.5 px-4 rounded-xl border border-[#cbdcd1] bg-[#edf4ef] text-sm text-primary font-medium outline-hidden focus:border-secondary focus:ring-1 focus:ring-secondary cursor-pointer pr-10"
                      >
                        <option>January - April (Best Beach &amp; Wildlife Season)</option>
                        <option>May - August (East Coast Beaches &amp; Cultural Festivities)</option>
                        <option>September - October (Pleasant Shoulder Season / Less Crowds)</option>
                        <option>November - December (Holiday Season &amp; Southern Coast)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-secondary">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="self-start px-8 py-3.5 rounded-full bg-[#0c5037] hover:bg-[#103c2e] text-white font-semibold text-xs tracking-wide flex items-center gap-2 shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-0"
                  >
                    <span>Continue to Step 2: Destinations</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              )}

              {/* STEP 2: DESTINATIONS */}
              {currentStep === 2 && (
                <div className="flex flex-col gap-8">
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-1">
                      STEP 02 / DESTINATIONS
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                      Where would you like to visit?
                    </h2>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                      Select the regions and cities you want to include in your private tour.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'Sigiriya & Cultural Triangle', tag: 'Lion Rock, Dambulla Cave Temple & Polonnaruwa' },
                      { name: 'Kandy & Sacred Temple', tag: 'Temple of the Tooth & Royal Botanical Gardens' },
                      { name: 'Nuwara Eliya & Tea Country', tag: 'Tea Plantations, Waterfalls & Cool Mountains' },
                      { name: 'Ella & Nine Arch Bridge', tag: 'Scenic Train, Little Adams Peak & Ravana Falls' },
                      { name: 'Yala National Park Safari', tag: 'Wild Leopards, Elephants & Safari Jeeps' },
                      { name: 'Galle Fort & South Coast Beach', tag: '17th-Century Dutch Fort & Tropical Beaches' },
                      { name: 'Mirissa & Weligama', tag: 'Whale Watching, Surfing & Golden Sand Beaches' },
                      { name: 'Colombo City Tour', tag: 'Shopping, Street Food & Colonial Architecture' },
                    ].map((item) => {
                      const isSelected = selectedDestinations.includes(item.name);
                      return (
                        <div
                          key={item.name}
                          onClick={() => toggleDestination(item.name)}
                          className={`p-5 rounded-2xl cursor-pointer flex justify-between items-center transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#103c2e] text-white border-2 border-secondary-fixed shadow-md'
                              : 'bg-white text-on-surface border border-[#cbdcd1]/80 hover:border-secondary shadow-xs'
                          }`}
                        >
                          <div className="pr-3">
                            <h3 className="text-sm font-semibold">{item.name}</h3>
                            <p className={`text-xs mt-0.5 leading-relaxed ${isSelected ? 'text-[#dde4df]' : 'text-on-surface-variant'}`}>
                              {item.tag}
                            </p>
                          </div>
                          {isSelected ? (
                            <CheckCircle2 className="w-[22px] h-[22px] shrink-0 text-secondary-fixed" />
                          ) : (
                            <PlusCircle className="w-[22px] h-[22px] shrink-0 text-secondary/60" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 rounded-full bg-white hover:bg-[#edf4ef] text-primary border border-[#cbdcd1] font-semibold text-xs transition-colors cursor-pointer"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-8 py-3 rounded-full bg-[#0c5037] hover:bg-[#103c2e] text-white font-semibold text-xs tracking-wide flex items-center gap-2 shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-0"
                    >
                      <span>Continue to Step 3: Experiences</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: EXPERIENCES */}
              {currentStep === 3 && (
                <div className="flex flex-col gap-8">
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-1">
                      STEP 03 / EXPERIENCES &amp; ACTIVITIES
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                      What activities would you love to do?
                    </h2>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                      Choose your favorite activities. We handle all permits, train reservations, and private safari jeeps.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'Sigiriya Rock Fortress at Sunrise', icon: 'landscape' },
                      { name: 'Kandy to Ella Scenic Train Ride', icon: 'train' },
                      { name: 'Yala Wildlife Safari (4x4 Jeep)', icon: 'pets' },
                      { name: 'Mirissa Whale Watching Boat Tour', icon: 'sailing' },
                      { name: 'Hot Air Ballooning over Dambulla', icon: 'air' },
                      { name: 'Ceylon Tea Factory & Tasting Tour', icon: 'local_cafe' },
                      { name: 'Galle Fort Heritage Guided Walk', icon: 'fort' },
                      { name: 'Authentic Ayurvedic Herbal Spa Session', icon: 'spa' },
                    ].map((item) => {
                      const isSelected = selectedExperiences.includes(item.name);
                      return (
                        <div
                          key={item.name}
                          onClick={() => toggleExperience(item.name)}
                          className={`p-5 rounded-2xl cursor-pointer flex items-center gap-3.5 transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#103c2e] text-white border-2 border-secondary-fixed shadow-md'
                              : 'bg-white text-on-surface border border-[#cbdcd1]/80 hover:border-secondary shadow-xs'
                          }`}
                        >
                          <DynamicIcon
                            name={item.icon}
                            size={24}
                            className={`shrink-0 ${
                              isSelected ? 'text-secondary-fixed' : 'text-secondary'
                            }`}
                          />
                          <span className="text-xs sm:text-sm font-semibold flex-1">{item.name}</span>
                          {isSelected ? (
                            <CheckSquare className="w-5 h-5 shrink-0 text-secondary-fixed" />
                          ) : (
                            <Square className="w-5 h-5 shrink-0 text-secondary/60" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 rounded-full bg-white hover:bg-[#edf4ef] text-primary border border-[#cbdcd1] font-semibold text-xs transition-colors cursor-pointer"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-8 py-3 rounded-full bg-[#0c5037] hover:bg-[#103c2e] text-white font-semibold text-xs tracking-wide flex items-center gap-2 shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-0"
                    >
                      <span>Continue to Step 4: Hotels</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: HOTELS & ACCOMMODATION */}
              {currentStep === 4 && (
                <div className="flex flex-col gap-8">
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-1">
                      STEP 04 / ACCOMMODATION STYLE
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                      What style of hotels do you prefer?
                    </h2>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                      Sri Lanka offers wonderful accommodation options for all budgets, from charming boutique stays to world-class luxury tea bungalows.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {[
                      {
                        title: '4-Star Hotels & Heritage Resorts',
                        desc: 'Comfortable, highly-rated 4-star properties with swimming pools, excellent cuisine, and great locations.',
                        tag: 'Most Popular Choice',
                      },
                      {
                        title: 'Luxury 5-Star & Boutique Bungalows',
                        desc: 'Exceptional properties like Heritance Kandalama, Ceylon Tea Trails, Wild Coast Tented Lodge, and beachfront resorts.',
                        tag: 'Luxury Experience',
                      },
                      {
                        title: 'Comfortable 3-Star Hotels & Guesthouses',
                        desc: 'Clean, charming, and welcoming hotels with air conditioning and private bathrooms, offering outstanding value.',
                        tag: 'Best Value',
                      },
                      {
                        title: 'Private Beachfront Villas & Colonial Estates',
                        desc: 'Exclusive-use private villas in Mirissa, Bentota, or Galle with private pools and dedicated chef service.',
                        tag: 'Private & Exclusive',
                      },
                    ].map((lodge) => {
                      const isSelected = lodgingGrade === lodge.title;
                      return (
                        <div
                          key={lodge.title}
                          onClick={() => setLodgingGrade(lodge.title)}
                          className={`p-6 rounded-2xl cursor-pointer flex justify-between items-center transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#103c2e] text-white border-2 border-secondary-fixed shadow-md'
                              : 'bg-white text-on-surface border border-[#cbdcd1]/80 hover:border-secondary shadow-xs'
                          }`}
                        >
                          <div className="pr-4">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                                isSelected ? 'text-secondary-fixed' : 'text-secondary'
                              }`}
                            >
                              {lodge.tag}
                            </span>
                            <h3 className="text-base font-semibold">{lodge.title}</h3>
                            <p className={`text-xs mt-1 max-w-xl leading-relaxed ${isSelected ? 'text-[#dde4df]' : 'text-on-surface-variant'}`}>
                              {lodge.desc}
                            </p>
                          </div>
                          {isSelected ? (
                            <CheckCircle2 className="w-6 h-6 shrink-0 text-secondary-fixed" />
                          ) : (
                            <Circle className="w-6 h-6 shrink-0 text-secondary/60" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 rounded-full bg-white hover:bg-[#edf4ef] text-primary border border-[#cbdcd1] font-semibold text-xs transition-colors cursor-pointer"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(5)}
                      className="px-8 py-3 rounded-full bg-[#0c5037] hover:bg-[#103c2e] text-white font-semibold text-xs tracking-wide flex items-center gap-2 shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-0"
                    >
                      <span>Continue to Step 5: Contact &amp; Quote</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: CONTACT & DISPATCH */}
              {currentStep === 5 && (
                <div className="flex flex-col gap-8">
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-secondary font-semibold block mb-1">
                      STEP 05 / GET YOUR FREE CUSTOM QUOTE
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-primary font-normal">
                      Where should we send your custom itinerary?
                    </h2>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                      Our Sri Lanka travel specialists will create a day-by-day plan with transparent pricing and send it within 24 hours.
                    </p>
                  </div>

                  {isDispatched ? (
                    <div className="bg-white p-10 sm:p-12 rounded-3xl border-2 border-secondary shadow-lg text-center">
                      <MailCheck className="w-16 h-16 text-secondary mb-3 mx-auto" />
                      <h3 className="font-serif text-2xl sm:text-3xl text-primary mb-2.5 font-normal">
                        Request Received Successfully!
                      </h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed max-w-xl mx-auto mb-8">
                        Ayubowan, {contactData.name || 'valued guest'}! Thank you for sharing your travel plans with us. Our team is already preparing your custom itinerary and transparent quote. You will receive it within 24 hours.
                      </p>

                      <div className="flex flex-wrap gap-4 justify-center">
                        <a
                          href={`https://wa.me/94771234567?text=Hello%20Lanka%20Memo%20Holidays%2C%20I%20just%20submitted%20a%20tour%20request%20for%20a%20${durationDays}-day%20private%20trip%20for%20${encodeURIComponent(partyType)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wide flex items-center gap-2 shadow-md transition-all duration-200 no-underline"
                        >
                          <span>Connect Instantly on WhatsApp</span>
                        </a>
                        <Link
                          href="/"
                          className="px-8 py-3.5 rounded-full bg-[#edf4ef] hover:bg-[#cbdcd1]/60 text-primary font-semibold text-xs tracking-wide transition-colors no-underline"
                        >
                          <span>Return to Homepage</span>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="bg-white p-8 sm:p-10 rounded-3xl border border-[#cbdcd1]/80 shadow-xs flex flex-col gap-5"
                    >
                      <div>
                        <label className="text-xs font-semibold text-on-surface block mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. David & Sarah Jenkins"
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#cbdcd1] text-sm outline-hidden transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary bg-white"
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
                            value={contactData.email}
                            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#cbdcd1] text-sm outline-hidden transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-on-surface block mb-1.5">
                            Phone / WhatsApp Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+44 7123 456789"
                            value={contactData.phone}
                            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#cbdcd1] text-sm outline-hidden transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-on-surface block mb-1.5">
                          Special Requests, Flight Times or Preferences
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about special occasions, dietary preferences, places you definitely want to visit, or your flight dates..."
                          value={contactData.notes}
                          onChange={(e) => setContactData({ ...contactData, notes: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#cbdcd1] text-sm outline-hidden transition-colors focus:border-secondary focus:ring-1 focus:ring-secondary resize-y bg-white"
                        />
                      </div>

                      <div className="flex gap-4 mt-2">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(4)}
                          className="px-6 py-3 rounded-full bg-white hover:bg-[#edf4ef] text-primary border border-[#cbdcd1] font-semibold text-xs transition-colors cursor-pointer"
                        >
                          &larr; Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-8 py-3.5 rounded-full bg-[#0c5037] hover:bg-[#103c2e] text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-0"
                        >
                          <span>Get My Free Custom Quote</span>
                          <Send className="w-4 h-4 shrink-0" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Live Trip Summary (4–5 cols) */}
            <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl p-7 sm:p-8 border border-[#cbdcd1]/80 shadow-lg sticky top-44">
              <div className="pb-4 border-b border-[#cbdcd1]/60 mb-5">
                <span className="text-[10px] tracking-[0.18em] uppercase text-secondary font-bold block mb-1">
                  LIVE ESTIMATE
                </span>
                <h3 className="font-serif text-2xl text-primary font-normal m-0">
                  Your Trip Plan
                </h3>
              </div>

              <div className="flex flex-col gap-3.5 text-xs sm:text-sm">
                <div>
                  <span className="text-[10px] text-outline uppercase tracking-wider block mb-0.5">Travelers</span>
                  <p className="font-semibold text-primary m-0">{partyType}</p>
                </div>

                <div>
                  <span className="text-[10px] text-outline uppercase tracking-wider block mb-0.5">Duration</span>
                  <p className="font-semibold text-primary m-0">
                    {durationDays} Days / {durationDays - 1} Nights
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-outline uppercase tracking-wider block mb-0.5">Travel Window</span>
                  <p className="font-semibold text-primary m-0">{travelMonth.split('(')[0].trim()}</p>
                </div>

                <div>
                  <span className="text-[10px] text-outline uppercase tracking-wider block mb-1">
                    Selected Destinations ({selectedDestinations.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedDestinations.map((e, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#edf4ef] text-primary px-2.5 py-0.5 rounded-full font-medium"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-outline uppercase tracking-wider block mb-1">
                    Selected Experiences ({selectedExperiences.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedExperiences.map((p, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#edf4ef] text-secondary px-2.5 py-0.5 rounded-full font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-outline uppercase tracking-wider block mb-0.5">Hotel Category</span>
                  <p className="font-semibold text-primary m-0">{lodgingGrade}</p>
                </div>

                {/* Estimate */}
                <div className="mt-2 p-4 sm:p-5 bg-[#edf4ef] rounded-2xl border border-[#cbdcd1]/60">
                  <span className="text-[10px] text-outline uppercase tracking-wider block">
                    Estimated Tour Cost (Total)
                  </span>
                  <div className="text-2xl sm:text-3xl font-normal text-primary font-serif leading-none mt-1.5">
                    ${estimatedTotal.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-secondary font-medium block mt-1.5">
                    Includes private vehicle, chauffeur guide, hotels &amp; safari
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
