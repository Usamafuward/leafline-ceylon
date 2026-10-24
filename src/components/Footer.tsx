'use client';

import BrandLogo from '@/components/BrandLogo';
import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Send, ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#00251a] text-white border-t border-[rgba(178,240,209,0.12)] relative overflow-visible mt-24 sm:mt-28">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(178,240,209,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Newsletter / Invitation Section (Floating Half Outside and Half Inside Footer) */}
      <div className="max-container relative z-20 mt-16 sm:-mt-26 mb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[rgba(178,240,209,0.22)] min-h-[200px] flex items-center p-8 sm:p-12">
          {/* Background Image: using existing wanderly_newsletter_banner.jpg */}
          <img
            src="/images/wanderly_newsletter_banner.jpg"
            alt="Travel Inspiration - Tropical Infinity Pool & Coastal Rocks"
            className="absolute inset-0 w-full h-full object-cover object-[center_50%] pointer-events-none"
          />

          {/* Editorial Soft Contrast Gradient (Keeps image vibrant on right, text legible on left) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00251a]/95 via-[#00251a]/78 to-[#00251a]/40 sm:to-transparent pointer-events-none" />

          {/* Invitation Content (Preserving our original design & copy) */}
          <div className="relative z-10 w-full flex flex-col min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between gap-8">
            <div className="max-w-[620px]">
              <span className="text-xs uppercase tracking-widest text-secondary-fixed font-semibold block mb-2">
                Sri Lanka Travel News
              </span>
              <h3 className="font-serif text-[1.75rem] font-medium text-white leading-tight mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Get Travel Tips &amp; Special Offers
              </h3>
              <p className="text-[#e3eae5] text-[0.9rem] leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                Receive seasonal travel advice, the best times to visit national parks and beaches, and special early-booking offers directly in your inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-wrap gap-3 items-center"
            >
              {subscribed ? (
                <div className="flex items-center gap-2 px-6 py-3.5 bg-white/95 text-[#00251a] rounded-full font-semibold text-[0.9rem] shadow-xl backdrop-blur-md">
                  <CheckCircle2 className="w-5 h-5 text-[#0c5037] shrink-0" />
                  <span>Thank you for subscribing to Leafline Ceylon!</span>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 min-w-[260px] py-3.5 px-6 bg-[rgba(0,37,26,0.88)] border border-[rgba(178,240,209,0.35)] rounded-full text-white placeholder-gray-300 text-[0.9rem] outline-none focus:border-secondary-fixed transition-colors backdrop-blur-sm"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-fixed text-white hover:text-primary py-3.5 px-7 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 shadow-md cursor-pointer border-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4 shrink-0" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="max-container pb-12">

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          {/* Column 1: Brand & SLTDA credentials */}
          <div className="flex flex-col gap-5">
            <BrandLogo size={34} />

            <p className="text-[#c0c8c3] text-[0.88rem] leading-relaxed">
              Sri Lanka&apos;s trusted private tour operator. Handcrafting memorable, comfortable journeys with dedicated English-speaking chauffeur guides and handpicked quality hotels.
            </p>

            {/* Official Licensing Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-[rgba(178,240,209,0.2)] rounded-lg text-xs text-secondary-fixed w-fit">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>SLTDA Lic: SLTDA/SQA/TA/01482</span>
            </div>

            {/* Social Media Buttons */}
            <div className="flex items-center gap-3 pt-1">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-secondary-fixed hover:text-primary text-white border border-white/10 hover:border-secondary-fixed flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-secondary-fixed hover:text-primary text-white border border-white/10 hover:border-secondary-fixed flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-secondary-fixed hover:text-primary text-white border border-white/10 hover:border-secondary-fixed flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-secondary-fixed hover:text-primary text-white border border-white/10 hover:border-secondary-fixed flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.379-.057.241-.19.292-.44.177-1.644-.766-2.671-3.172-2.671-5.109 0-4.16 3.022-7.981 8.72-7.981 4.579 0 8.138 3.264 8.138 7.625 0 4.551-2.869 8.212-6.851 8.212-1.338 0-2.596-.696-3.026-1.516l-.824 3.141c-.297 1.147-1.102 2.585-1.641 3.456 1.258.388 2.597.599 3.985.599 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-secondary-fixed hover:text-primary text-white border border-white/10 hover:border-secondary-fixed flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-110"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Signature Tours */}
          <div>
            <h4 className="font-serif text-[1.1rem] text-white mb-5 font-semibold">
              Popular Tour Packages
            </h4>
            <ul className="list-none flex flex-col gap-3 p-0 m-0">
              <li>
                <Link
                  href="/packages/grand-ceylon-sanctuary-circuit"
                  className="text-[#c0c8c3] hover:text-secondary-fixed text-[0.88rem] no-underline transition-colors duration-200"
                >
                  Grand Sri Lanka Tour (12 Days)
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-[#c0c8c3] hover:text-secondary-fixed text-[0.88rem] no-underline transition-colors duration-200"
                >
                  Highlands &amp; Scenic Train (8 Days)
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-[#c0c8c3] hover:text-secondary-fixed text-[0.88rem] no-underline transition-colors duration-200"
                >
                  Wildlife Safari Tour (7 Days)
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-[#c0c8c3] hover:text-secondary-fixed text-[0.88rem] no-underline transition-colors duration-200"
                >
                  Romantic Honeymoon Holiday (10 Days)
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-[#c0c8c3] hover:text-secondary-fixed text-[0.88rem] no-underline transition-colors duration-200"
                >
                  Cultural Heritage Tour (6 Days)
                </Link>
              </li>
              <li>
                <Link
                  href="/plan-trip"
                  className="text-secondary-fixed hover:text-white text-[0.88rem] font-semibold inline-flex items-center gap-1 no-underline transition-colors duration-200 mt-1"
                >
                  <span>Customize Your Tour</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Destinations & Services */}
          <div>
            <h4 className="font-serif text-[1.1rem] text-white mb-5 font-semibold">
              Destinations &amp; Services
            </h4>
            <ul className="list-none flex flex-col gap-3 p-0 m-0">
              <li>
                <Link
                  href="/destinations"
                  className="text-[#c0c8c3] hover:text-secondary-fixed text-[0.88rem] no-underline transition-colors duration-200"
                >
                  Sigiriya &amp; Cultural Triangle
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-[#c0c8c3] hover:text-secondary-fixed text-[0.88rem] no-underline transition-colors duration-200"
                >
                  Nuwara Eliya &amp; Tea Country
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-[#c0c8c3] hover:text-secondary-fixed text-[0.88rem] no-underline transition-colors duration-200"
                >
                  Yala National Park Safari
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-[#c0c8c3] hover:text-secondary-fixed text-[0.88rem] no-underline transition-colors duration-200"
                >
                  Galle Fort &amp; Southern Coast
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-[#c0c8c3] hover:text-secondary-fixed text-[0.88rem] no-underline transition-colors duration-200"
                >
                  Private Chauffeur &amp; Vehicles
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-[#c0c8c3] hover:text-secondary-fixed text-[0.88rem] no-underline transition-colors duration-200"
                >
                  Airport Meet &amp; Greet Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h4 className="font-serif text-[1.1rem] text-white mb-5 font-semibold">
              Contact Information
            </h4>
            <div className="flex flex-col gap-3.5 text-[#c0c8c3] text-[0.88rem]">
              <p className="flex items-start gap-2 m-0">
                <MapPin className="w-4 h-4 text-secondary-fixed shrink-0 mt-0.5" />
                <span>No. 42 Alfred House Gardens, Colombo 03, Sri Lanka</span>
              </p>
              <p className="flex items-center gap-2 m-0">
                <Phone className="w-4 h-4 text-secondary-fixed shrink-0" />
                <span>+94 11 234 5678 (24/7 Support)</span>
              </p>
              <p className="flex items-center gap-2 m-0">
                <Mail className="w-4 h-4 text-secondary-fixed shrink-0" />
                <span>info@leaflineceylon.com</span>
              </p>
              <p className="flex items-center gap-2 m-0">
                <Clock className="w-4 h-4 text-secondary-fixed shrink-0" />
                <span>Office: Mon - Sat, 08:30 - 18:30 IST</span>
              </p>
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-semibold text-[0.82rem] no-underline w-fit shadow-md hover:brightness-105 transition-all"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Accreditations */}
        <div className="pt-12 flex flex-wrap items-center justify-between gap-6 text-[0.8rem] text-outline">
          <p className="m-0">© {new Date().getFullYear()} Leafline Ceylon (Pvt) Ltd. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="text-[#c0c8c3]">SLTDA Licensed Inbound Tour Operator • Comprehensive Passenger Protection</span>
          </div>

          <div className="flex gap-5">
            <Link href="/about-us" className="text-outline hover:text-white no-underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about-us" className="text-outline hover:text-white no-underline transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="text-outline hover:text-white no-underline transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
