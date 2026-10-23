'use client';

import React from 'react';
import Link from 'next/link';
import { ConciergeService } from '@/data/services';
import DynamicIcon from '@/components/ui/Icon';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: ConciergeService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#cbdcd1]/80 hover:border-secondary shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* 1. Photography Header with Badges */}
      <div className="relative w-full h-[220px] overflow-hidden bg-[#103c2e]">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#103c2e]/80 via-black/20 to-black/30 pointer-events-none" />

        {/* Top Badges Bar */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center gap-2 z-10">
          {/* Category Pill */}
          <span className="px-3 py-1 rounded-full bg-[#103c2e]/85 backdrop-blur-md border border-[rgba(178,240,209,0.3)] text-secondary-fixed text-[0.68rem] font-bold tracking-widest uppercase whitespace-nowrap inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
            {service.badge}
          </span>

          {/* Highlight Perk */}
          <span className="px-3 py-1 rounded-full bg-white/95 text-primary text-[0.7rem] font-bold tracking-wide whitespace-nowrap shadow-xs">
            {service.highlightMetric}
          </span>
        </div>
      </div>

      {/* 2. Card Content Area */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        {/* Header: Integrated Icon & Title */}
        <div className="flex items-start gap-3 mb-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#edf4ef] group-hover:bg-secondary-fixed text-secondary group-hover:text-primary flex items-center justify-center shrink-0 transition-colors duration-300">
            <DynamicIcon name={service.icon} size={20} />
          </div>

          <h3 className="font-serif text-xl font-semibold text-primary group-hover:text-secondary leading-snug min-h-[2.8rem] flex items-center transition-colors duration-200">
            {service.title}
          </h3>
        </div>

        {/* Tagline */}
        <p className="text-xs text-secondary font-semibold leading-relaxed mb-3 min-h-[2.2rem] line-clamp-2">
          {service.tagline}
        </p>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-5 min-h-[3.6rem] line-clamp-3">
          {service.description}
        </p>

        {/* Curated Features List */}
        <div className="flex flex-col gap-2 mb-6 pt-4 border-t border-[#cbdcd1]/60">
          <span className="text-[10px] uppercase tracking-widest text-outline font-semibold mb-1">
            Service Highlights
          </span>
          {service.features.map((feat, i) => (
            <div
              key={i}
              className="flex items-start gap-2 text-xs text-on-surface leading-snug"
            >
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* 3. Action Button: Anchored to Bottom */}
        <div className="mt-auto pt-2">
          <Link
            href="/contact"
            className="w-full py-3 px-5 rounded-full bg-[#0c5037] group-hover:bg-[#103c2e] text-white font-semibold text-xs tracking-wide no-underline flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md transition-all duration-200"
          >
            <span>Inquire About Service</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}
