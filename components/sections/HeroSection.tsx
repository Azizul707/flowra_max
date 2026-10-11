'use client';

import React from 'react';
import Image from 'next/image';
import {
  Sprout,
  BookOpen,
  Check,
  ArrowRight,
  ImageIcon,
  ShieldCheck,
  RotateCw,
  Package,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollToCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('checkout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('reviews');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Text & Call to Actions */}
          <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5 text-left order-1">
            
            {/* 1. Top Badge */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#d8f3dc] text-[#006c48] text-xs font-semibold font-sans-bengali shadow-xs">
                <Sprout className="w-3.5 h-3.5 text-[#006c48]" />
                <span>ছাদবাগান ও বারান্দার উপযোগী সেরা ফুল সমাহার</span>
              </div>
            </div>

            {/* 2. Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold font-serif-bengali text-[#1b1c1a] leading-[1.25] tracking-tight">
              একটা ছাদ। ১০ রকম ফুল। পুরো<br className="hidden sm:inline" />
              পরিবেশটাই বদলে যাবে।
            </h1>

            {/* 3. Sub-headline */}
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans-bengali">
              নয়নতারা, জিনিয়া, পর্তুলিকা, ফ্রেঞ্চ গাঁদা, কসমস, সানগোল্ড, দোলনচাঁপা, সূর্যমুখী, মর্নিং গ্লোরি ও গম—এক প্যাকেট ১০ রকম ফুলের বীজ।
            </p>

            {/* 4. Info Box */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#e3dfd5] text-xs sm:text-[13px] text-stone-800 flex items-start gap-2.5 shadow-xs">
              <BookOpen className="w-4 h-4 text-[#1b4332] shrink-0 mt-0.5" />
              <p className="leading-relaxed font-sans-bengali">
                <strong className="text-[#1b4332] font-bold">ফ্রি Planting Guide PDF:</strong>{' '}
                নতুন বাগানে রোপন থেকে শুরু করবেন, মাটি কীভাবে প্রস্তুত করবেন—সেটা নিয়ে আর ভাবতে হবে না।
              </p>
            </div>

            {/* 5. Features Row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-stone-700 font-sans-bengali">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#006c48] stroke-[2.5]" />
                <span>১০ জাতের ফুলের বীজ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#006c48] stroke-[2.5]" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#006c48] stroke-[2.5]" />
                <span>২ ও ৩ প্যাকে Free Delivery</span>
              </div>
            </div>

            {/* 6. Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              {/* Primary CTA Button */}
              <button
                onClick={scrollToCheckout}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-extrabold text-yellow-400 bg-[#1b4332] rounded-xl font-sans-bengali shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(26,71,49,0.4)] active:translate-y-0 active:scale-95"
              >
                <span>অর্ডার কনফার্ম করতে চাই →</span>
              </button>

              {/* Secondary Button */}
              <button
                onClick={scrollToReviews}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-[#1b4332] bg-white hover:bg-stone-50 border border-[#1b4332] rounded-xl transition-all font-sans-bengali shadow-xs"
              >
                <ImageIcon className="w-4 h-4 text-[#1b4332]" />
                <span>বাস্তব ছাদবাগানের ফলাফল</span>
              </button>
            </div>

            {/* 7. Bottom Note */}
            <p className="text-xs text-stone-500 font-sans-bengali">
              সীমিত স্টকের অফার | অনুকূল আবহাওয়া পাওয়ার পর সীমিত বীজ উন্মুক্ত
            </p>

          </div>

          {/* Right Column: Image Card */}
          <div className="lg:col-span-5 order-2">
            <div className="relative rounded-2xl bg-white border border-[#e3dfd5] p-3 sm:p-3.5 shadow-md">
              
              {/* Main Image Container */}
              <div className="relative w-full overflow-hidden rounded-xl bg-stone-100 aspect-[4/3] sm:aspect-[4/3] border border-[#d6cfbe]">
                
                {/* Real Product Image */}
                <Image
                  src="/flower-combo.jpg"
                  alt="১০ রকম ফুলের বীজ - অরিজিনাল সিড প্যাক"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover rounded-xl"
                  priority
                />

                {/* Overlays / Badges */}
                {/* Top Right Tag */}
                <div className="absolute top-2.5 right-2.5 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1b4332] text-white text-[11px] font-bold font-sans-bengali shadow-md">
                    <Check className="w-3 h-3 text-[#52b788]" />
                    <span>অরিজিনাল সিড প্যাক</span>
                  </span>
                </div>

                {/* Bottom Left/Center Overlay Box */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10">
                  <div className="w-full bg-white/95 backdrop-blur-md text-[#1b1c1a] py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold font-sans-bengali shadow-sm border border-white/60">
                    <Package className="w-3.5 h-3.5 text-[#006c48]" />
                    <span>প্রতিটি প্যাকেটে ১০টি জাত (১.৫ গ্রাম +/-)</span>
                  </div>
                </div>

              </div>

              {/* Image Card Footer (Below the image, inside the card) */}
              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-700 px-1 font-sans-bengali">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#006c48]" />
                  <span>ছাদবাগান ও বারান্দার উপযোগী</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCw className="w-4 h-4 text-[#006c48]" />
                  <span>সহজ পরিচর্যা</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
