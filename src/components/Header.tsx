'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X, ChevronRight, Sparkles } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        
        {/* Unified, silky-smooth transforming header container (Full width -> Anchored Floating Island at top) */}
        <div
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? 'w-[calc(100%-1.25rem)] sm:w-[calc(100%-2.5rem)] max-w-[1310px] mt-0 rounded-t-none rounded-b-3xl bg-[#0c3327]/95 backdrop-blur-xl border-x border-b border-[rgba(178,240,209,0.3)] shadow-[0_20px_50px_-10px_rgba(0,25,18,0.7),0_0_0_1px_rgba(178,240,209,0.2)] h-[74px] sm:h-[80px] px-6'
              : 'w-full max-w-full mt-0 rounded-none bg-[#103c2e] border-b border-[rgba(178,240,209,0.12)] shadow-md h-20 sm:h-22 px-4 sm:px-8 lg:px-12 xl:px-16'
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            className="flex items-center gap-3 no-underline group shrink-0"
          >
            {/* Elegant SVG Emblem */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 transition-transform duration-300 group-hover:scale-105"
            >
              <rect width="48" height="48" rx="12" fill="#00251a" />
              <path
                d="M24 6C24 6 36 15 34 29C32 39 22 43 22 43C22 43 20 33 24 23C26 16 24 6 24 6Z"
                fill="#2e6951"
              />
              <path
                d="M24 6C24 6 12 17 14 31C15 41 22 43 22 43C22 43 18 31 21 21C23 15 24 6 24 6Z"
                fill="#b2f0d1"
                opacity="0.9"
              />
              <path
                d="M22 10L23 41"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="23" cy="22" r="2.5" fill="#ffffff" />
            </svg>

            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-semibold text-white tracking-wide leading-tight transition-colors duration-300 group-hover:text-secondary-fixed">
                Lanka Memo
              </span>
              <span className="font-sans text-[0.6rem] tracking-[0.24em] uppercase text-secondary-fixed font-semibold mt-0.5">
                Holidays Ceylon
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden min-[1080px]:flex items-center gap-6 xl:gap-8">
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
                  className={`text-[0.76rem] uppercase tracking-wider no-underline transition-all duration-200 relative py-1.5 ${
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

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
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
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-x-3 sm:inset-x-6 z-40 bg-[#00251a]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col min-[1080px]:hidden transition-all duration-400 animate-in fade-in slide-in-from-top-3 max-w-xl mx-auto ${
            scrolled ? 'top-24 sm:top-26' : 'top-24 sm:top-26'
          }`}
          style={{ maxHeight: 'calc(100vh - 7.5rem)', overflowY: 'auto' }}
        >
          <div className="flex flex-col gap-4 mb-8">
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
                +94 11 234 5678 • concierge@lankamemo.com
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
