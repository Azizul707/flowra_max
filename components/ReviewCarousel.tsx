'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Heart, Sparkles, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    src: '/reviews/review-1.webp',
    alt: 'গ্রাহকের রিভিউ ১ - ফ্লোরাম্যাক্স বীজ থেকে ছাদবাগানে ফুল ফোটার অভিজ্ঞতা',
    caption: 'ছাদে চমৎকার ফুল ফুটেছে',
  },
  {
    id: 2,
    src: '/reviews/review-2.webp',
    alt: 'গ্রাহকের রিভিউ ২ - ফ্লোরাম্যাক্স বীজ অঙ্কুরোদগম ও কাস্টমার সন্তুষ্টি',
    caption: '১০০% অঙ্কুরোদগম পেয়েছি',
  },
  {
    id: 3,
    src: '/reviews/review-3.webp',
    alt: 'গ্রাহকের রিভিউ ৩ - বাস্তব কাস্টমার মেসেজ ও রিভিউ',
    caption: 'প্যাকেজিং ও বীজের মান অসাধারণ',
  },
  {
    id: 4,
    src: '/reviews/review-4.webp',
    alt: 'গ্রাহকের রিভিউ ৪ - গাছ ও ফুলের অগ্রগতি রিভিউ',
    caption: 'নিঃসন্দেহে সেরা ফ্লাওয়ার কম্বো',
  },
  {
    id: 5,
    src: '/reviews/review-5.webp',
    alt: 'গ্রাহকের রিভিউ ৫ - গ্রাহকের ভালোবাসার রিভিউ ও ছবি',
    caption: 'প্রতিটি জাতের ফুল ঠিকমতো ফুটেছে',
  },
];

export const ReviewCarousel: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // For manual navigation fallback or convenience
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollByAmount = (distance: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  return (
    <section className="mt-8 pt-8 border-t border-[#e3dfd5] font-sans-bengali">
      {/* 1. Trust Header */}
      <div className="text-center mb-6">
        {/* Star Rating Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-3 shadow-xs">
          <div className="flex items-center text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-bold text-stone-800 ml-1">৪.৯/৫ রেটিং</span>
          <span className="text-stone-400">|</span>
          <span className="text-stone-600 font-medium">১,২০০+ সন্তুষ্ট বাগানী</span>
        </div>

        {/* Bold Trust-Building Heading */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif-bengali text-[#1b1c1a] tracking-tight">
          অনলাইনে বীজ কেনার ভয়? দেখুন আমাদের গ্রাহকরা কী বলছেন!
        </h3>

        {/* Subtitle */}
        <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          আমাদের গ্রাহকদের ইনবক্স রিভিউ এবং সরাসরি ছাদবাগানে ফুল ফোটার বাস্তব প্রমাণ। কোনো তৈরি করা বিজ্ঞাপন নয়!
        </p>
      </div>

      {/* 2. Marquee / Loop Carousel Container */}
      <div 
        className="relative w-full overflow-hidden py-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Subtle gradient fades on edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" />

        {/* Infinite Marquee Track (Double the array for smooth endless loop) */}
        <div 
          ref={scrollContainerRef}
          className={`flex gap-4 sm:gap-6 w-max ${isPaused ? '' : 'animate-marquee'}`}
          style={{ willChange: 'transform' }}
        >
          {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              onClick={() => setSelectedImage(review.src)}
              className="group relative cursor-pointer flex-shrink-0 w-[240px] sm:w-[280px] bg-white rounded-xl sm:rounded-2xl border border-stone-200/90 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Image with fixed aspect ratio */}
              <div className="relative w-full aspect-[4/5] bg-stone-100 overflow-hidden">
                <Image
                  src={review.src}
                  alt={review.alt}
                  fill
                  sizes="(max-width: 640px) 240px, 280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-stone-900 text-xs font-bold shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5 text-[#1b4332]" />
                    বড় করে দেখুন
                  </span>
                </div>

                {/* Verified Customer Badge */}
                <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-stone-200/60 flex items-center gap-1 shadow-xs">
                  <ShieldCheck className="w-3 h-3 text-[#1b4332]" />
                  <span className="text-[10px] font-semibold text-stone-700">ভেরিফাইড রিভিউ</span>
                </div>
              </div>

              {/* Caption & Star footer */}
              <div className="p-3 bg-white border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-stone-500">
                  {review.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Scroll Controls & Trust Footnote */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-xs px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#1b4332]" />
          <span>ছবিতে ক্লিক করে সম্পূর্ণ রিভিউ ও কাস্টমার চ্যাট বড় করে দেখতে পারেন</span>
        </div>

        {/* Left / Right manual buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount(-280)}
            className="p-1.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition shadow-xs active:scale-95"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(280)}
            className="p-1.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition shadow-xs active:scale-95"
            aria-label="Next Review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Full Image Inspection */}
      {selectedImage && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-3xl max-h-[90vh] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition shadow-md"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-[90vw] max-w-xl h-[75vh] flex items-center justify-center p-2">
              <Image
                src={selectedImage}
                alt="গ্রাহকের সম্পূর্ণ রিভিউ ছবি"
                fill
                className="object-contain rounded-xl p-2"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-3 bg-stone-900/90 text-stone-200 text-center text-xs border-t border-stone-800">
              ফ্লোরাম্যাক্স ফ্লাওয়ার কম্বো - বাস্তব কাস্টমার রিভিউ ও ফলাফল
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
