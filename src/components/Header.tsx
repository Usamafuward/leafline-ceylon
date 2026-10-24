'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Globe,
  ChevronDown,
  Check,
} from 'lucide-react';
import {
  useCurrency,
  CURRENCIES,
  LANGUAGES,
  Currency,
  Language,
} from '@/context/CurrencyContext';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  const {
    currency,
    setCurrency,
    language,
    setLanguage,
    currencyConfig,
    languageConfig,
  } = useCurrency();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setSwitcherOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSwitcherOpen(false);
    };
    if (switcherOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [switcherOpen]);

  // Thin reading-progress line along the bottom edge of the header
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          // Smooth hysteresis: activate pill at > 40px, expand back only when scrolling back up near top (< 15px)
          setScrolled((prev) => (prev ? currentY > 15 : currentY > 40));
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Solid bar once scrolled, and always while the mobile menu is open (it hangs below the bar)
  const solid = scrolled || mobileMenuOpen;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/packages', label: 'Packages' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/about-us', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Outer fixed anchor */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center">
        
        {/* Full-width bar: transparent over the page's hero photo at the top, a solid deep-green bar
            once scrolling (or while the mobile menu is open). Only colour, shadow and height change,
            never the shape or horizontal position. */}
        <div
          className={`relative pointer-events-auto w-full flex items-center justify-between gap-6 px-4 sm:px-8 lg:px-26 2xl:px-26 border-b transition-[height,background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            solid
              ? 'h-16 sm:h-[72px] bg-[#103c2e]/95 backdrop-blur-xl border-[rgba(178,240,209,0.14)] shadow-[0_10px_30px_-12px_rgba(0,25,18,0.55)]'
              : 'h-20 sm:h-24 bg-transparent border-transparent shadow-none'
          }`}
        >
          {/* Soft dark fade behind the transparent header so the links stay legible over any photo */}
          <div
            aria-hidden="true"
            className={`absolute inset-x-0 top-0 h-[160%] -z-10 bg-gradient-to-b from-black/45 via-black/15 to-transparent pointer-events-none transition-opacity duration-500 ${
              solid ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            className="flex items-center gap-3 no-underline group shrink-0"
          >
            <BrandLogo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden min-[1080px]:flex items-center gap-5 2xl:gap-8">
            {navLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  }}
                  className={`text-[0.76rem] uppercase tracking-wider whitespace-nowrap no-underline transition-all duration-200 relative py-1.5 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#e3eae5]/90 font-medium hover:text-secondary-fixed'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary-fixed rounded-full shadow-[0_0_8px_#b2f0d1]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & Currency Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Currency & Language Switcher Dropdown */}
            <div className="relative" ref={switcherRef}>
              <button
                type="button"
                onClick={() => setSwitcherOpen(!switcherOpen)}
                aria-label="Select Currency and Language"
                aria-expanded={switcherOpen}
                className={`inline-flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-full border text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  switcherOpen
                    ? 'bg-white/20 border-secondary-fixed text-secondary-fixed shadow-[0_0_14px_rgba(178,240,209,0.35)]'
                    : 'bg-white/10 hover:bg-white/18 border-white/20 hover:border-secondary-fixed/50 text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-secondary-fixed shrink-0" />
                <span className="font-bold">{currencyConfig.code}</span>
                <span className="text-white/40">•</span>
                <span className="text-secondary-fixed/90">{languageConfig.label}</span>
                <ChevronDown
                  className={`w-3 h-3 text-white/70 transition-transform duration-200 ${
                    switcherOpen ? 'rotate-180 text-secondary-fixed' : ''
                  }`}
                />
              </button>

              {/* Popover Dropdown */}
              {switcherOpen && (
                <div className="absolute right-0 top-full mt-2.5 w-72 bg-[#0c3327]/98 backdrop-blur-2xl border border-[rgba(178,240,209,0.35)] rounded-2xl p-4 shadow-[0_20px_45px_rgba(0,20,14,0.7),0_0_0_1px_rgba(178,240,209,0.2)] z-50 text-white animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Currency Picker */}
                  <div className="mb-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary-fixed">
                        Display Currency
                      </span>
                      <span className="text-[10px] text-white/50">Live Estimates</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['USD', 'EUR', 'GBP', 'AUD'] as Currency[]).map((c) => {
                        const active = currency === c;
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => {
                              setCurrency(c);
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer border ${
                              active
                                ? 'bg-[#b2f0d1] text-[#00251a] font-bold border-[#b2f0d1] shadow-xs'
                                : 'bg-white/6 hover:bg-white/12 text-white border-white/10 hover:border-white/20'
                            }`}
                          >
                            <span>{CURRENCIES[c].label}</span>
                            {active && <Check className="w-3.5 h-3.5 text-[#00251a]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Language Picker */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary-fixed">
                        Language
                      </span>
                      <span className="text-[10px] text-white/50">International</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['EN', 'DE', 'FR'] as Language[]).map((l) => {
                        const active = language === l;
                        return (
                          <button
                            key={l}
                            type="button"
                            onClick={() => {
                              setLanguage(l);
                            }}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium text-center transition-all cursor-pointer border ${
                              active
                                ? 'bg-[#b2f0d1] text-[#00251a] font-bold border-[#b2f0d1]'
                                : 'bg-white/6 hover:bg-white/12 text-white border-white/10 hover:border-white/20'
                            }`}
                          >
                            <span>{LANGUAGES[l].name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/plan-trip"
              id="plan-trip-cta-header"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }}
              className="inline-flex items-center gap-2 bg-[#b2f0d1] text-[#00251a] hover:bg-white hover:-translate-y-0.5 rounded-full font-semibold tracking-wide no-underline shadow-[0_4px_18px_-2px_rgba(178,240,209,0.4)] hover:shadow-[0_6px_22px_-2px_rgba(178,240,209,0.55)] transition-all duration-250 whitespace-nowrap px-4 sm:px-6 py-2.5 text-xs sm:text-[0.84rem]"
            >
              <span className="hidden sm:inline">Plan Your Trip</span>
              <span className="inline sm:hidden">Plan</span>
              <ArrowRight className="w-4 h-4 leading-none shrink-0" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex min-[1080px]:hidden items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white cursor-pointer hover:bg-white/20 transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Reading Progress along the bar's bottom edge (only once the bar is solid) */}
          <div
            aria-hidden="true"
            className={`absolute -bottom-px left-0 right-0 h-[2px] overflow-hidden pointer-events-none transition-opacity duration-500 ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <motion.div
              style={{ scaleX: progressScale }}
              className="h-full origin-left bg-gradient-to-r from-secondary-fixed to-primary-fixed-dim shadow-[0_0_8px_rgba(178,240,209,0.6)]"
            />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="menu-drop-in fixed top-[76px] sm:top-[84px] inset-x-3 sm:inset-x-6 z-40 bg-[#00251a]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col min-[1080px]:hidden max-w-xl mx-auto"
          style={{ maxHeight: 'calc(100vh - 6.5rem)', overflowY: 'auto' }}
        >
          <div className="flex flex-col gap-4 mb-6">
            {navLinks.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  }}
                  className={`text-lg sm:text-xl font-serif no-underline pb-2.5 border-b border-white/10 flex items-center justify-between ${
                    isActive ? 'text-secondary-fixed' : 'text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-60 shrink-0" />
                </Link>
              );
            })}
          </div>

          {/* Mobile Currency / Language Selector */}
          <div className="mb-6 p-4 bg-white/6 rounded-2xl border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-secondary-fixed font-semibold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Currency &amp; Language</span>
              </span>
              <span className="text-[11px] text-white/60 font-medium">
                {currencyConfig.code} ({currencyConfig.symbol}) • {languageConfig.label}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {(['USD', 'EUR', 'GBP', 'AUD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-colors ${
                    currency === c
                      ? 'bg-[#b2f0d1] text-[#00251a] border-[#b2f0d1]'
                      : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3.5">
            <Link
              href="/plan-trip"
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }}
              className="w-full py-3.5 text-center rounded-full bg-secondary text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:bg-secondary-fixed hover:text-primary transition-all text-sm no-underline"
            >
              <span>Design Your Tailored Itinerary</span>
              <Sparkles className="w-4 h-4 shrink-0" />
            </Link>

            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-[#e3eae5] text-xs text-center">
              <p className="font-semibold text-secondary-fixed">
                24/7 Colombo Concierge
              </p>
              <p className="mt-0.5 opacity-80">
                +94 11 234 5678 • concierge@leaflineceylon.com
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
