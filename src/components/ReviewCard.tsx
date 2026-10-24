'use client';

import React from 'react';
import { Review } from '@/data/reviews';
import { Star, CheckCircle2, Quote, Route, MapPin } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Clean circuit name for pill display (strip redundant duration suffix so it fits cleanly)
  const cleanTourName = review.tourName.replace(/\s*\(\d+\s*Days?\)/i, '').trim();

  return (
    <div className="group bg-white rounded-2xl p-7 sm:p-8 flex flex-col justify-between relative border border-[#cbdcd1]/80 hover:border-secondary shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full box-border">
      {/* Content wrapper with flex layout for perfect vertical rhythm */}
      <div className="flex flex-col flex-1">
        {/* TOP ROW: Rating & Verified on Left, Distinctive Quote Icon on Right */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {/* Trust Cluster: Stars + Score + Verified Pill */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-secondary fill-secondary shrink-0"
                />
              ))}
            </div>
            <span className="text-[0.85rem] font-bold text-primary">
              5.0
            </span>

            {review.verified && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(46,105,81,0.08)] border border-[rgba(46,105,81,0.18)] text-secondary text-[0.68rem] font-bold tracking-wider uppercase whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 leading-none shrink-0" />
                <span>Verified</span>
              </span>
            )}
          </div>

          {/* Prominent Editorial Quotation Mark Graphic */}
          <Quote
            className="w-10 h-10 text-[rgba(46,105,81,0.22)] group-hover:text-secondary group-hover:scale-110 group-hover:-rotate-3 leading-none transition-all duration-350 ease-out select-none shrink-0"
            aria-hidden="true"
          />
        </div>

        {/* REVIEW HEADLINE - Equalized height across cards */}
        <h3 className="font-serif text-[1.25rem] font-semibold text-primary group-hover:text-secondary leading-[1.35] mb-3.5 italic min-h-[3.4rem] line-clamp-2 transition-colors duration-250">
          &ldquo;{review.headline}&rdquo;
        </h3>

        {/* REVIEW NARRATIVE TEXT */}
        <p className="text-[0.9rem] text-on-surface-variant leading-[1.68] mb-6">
          {review.reviewText}
        </p>

        {/* CIRCUIT REFERENCE PILL - Pinned cleanly right above footer divider */}
        <div
          className="mt-auto mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[rgba(46,105,81,0.05)] border border-[rgba(46,105,81,0.12)] text-[0.76rem] text-[#1a3328] max-w-full box-border w-fit"
          title={review.tourName}
        >
          <Route className="w-3.5 h-3.5 text-secondary shrink-0" />
          <span className="font-semibold text-secondary shrink-0">
            Circuit:
          </span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis font-medium text-on-surface">
            {cleanTourName}
          </span>
        </div>
      </div>

      {/* GUEST PROFILE FOOTER */}
      <div className="pt-5 border-t border-surface-container-high flex items-center gap-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-secondary-fixed shadow-[0_4px_10px_rgba(0,0,0,0.08)] shrink-0"
        />
        <div className="overflow-hidden">
          <h4 className="font-serif text-base font-semibold text-primary leading-tight mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {review.name}
          </h4>
          <p className="text-[0.78rem] text-on-surface-variant flex items-center gap-1.5 m-0 whitespace-nowrap overflow-hidden text-ellipsis">
            <MapPin className="w-3.5 h-3.5 text-secondary shrink-0 leading-none" />
            <span className="font-medium text-on-surface">{review.country}</span>
            <span className="opacity-40">•</span>
            <span>{review.travelDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
