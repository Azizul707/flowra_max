'use client';

import React from 'react';
import { PACKAGES } from '@/lib/data';
import { ShippingUrgencyTimer } from './ShippingUrgencyTimer';

export const PricingSection: React.FC = () => {
  const scrollToCheckout = (packId: string) => {
    const el = document.getElementById('checkout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('select-package', { detail: packId }));
    }
  };

  return (
    <section id="packages" className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#e3dfd5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d8f3dc] text-[#1b4332] text-xs font-semibold mb-3 font-sans-bengali">
            <span>সবার জন্য অফার</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold font-serif-bengali text-[#1b1c1a] tracking-tight">
            আপনার জন্য কোন প্যাকটি ভালো?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 font-sans-bengali">
            ২ ও ৩ প্যাকে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি। এক ক্লিকে সিলেক্ট করে অর্ডার করুন।
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PACKAGES.map((pkg) => {
            const isPopular = pkg.isPopular;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl bg-white p-5 sm:p-6 flex flex-col justify-between border transition-all ${
                  isPopular
                    ? 'border-[#1b4332] shadow-xl ring-2 ring-[#1b4332]/20'
                    : 'border-[#e3dfd5] shadow-xs'
                }`}
              >
                {/* Top Floating Badge (Outside/Top of border for Middle Card) */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1b4332] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-md whitespace-nowrap font-sans-bengali">
                    {pkg.topBadge}
                  </div>
                )}

                <div>
                  {/* Top Row: Tags Inside */}
                  <div className="flex items-center justify-between mb-3 pt-1">
                    <span className="text-xs font-semibold text-stone-700 font-sans-bengali">
                      {pkg.tag}
                    </span>
                    {pkg.badge && (
                      <span className="text-[10px] font-bold bg-[#d8f3dc] text-[#006c48] px-2.5 py-0.5 rounded-full">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base sm:text-lg font-bold text-[#1b1c1a] font-serif-bengali leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1.5 leading-relaxed font-sans-bengali min-h-[36px]">
                    {pkg.subtitle}
                  </p>

                  {/* Price */}
                  <div className="my-5 pb-4 border-b border-stone-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#1b1c1a] font-serif-bengali">
                        ৳{pkg.price}
                      </span>
                      {pkg.regularPrice > 0 && (
                        <span className="text-xs sm:text-sm text-stone-400 line-through">
                          ৳{pkg.regularPrice}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs mt-1 block font-sans-bengali ${
                        pkg.deliveryNote.includes('ফ্রি')
                          ? 'text-[#006c48] font-semibold'
                          : 'text-stone-600'
                      }`}
                    >
                      {pkg.deliveryNote}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 text-xs text-stone-700 font-sans-bengali">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5">
                        <span className="text-[#006c48] font-bold text-sm">✓</span>
                        <span>{feat.replace(/^✓\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <div className="pt-6 mt-4">
                  <button
                    onClick={() => scrollToCheckout(pkg.id)}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-sans-bengali ${
                      isPopular
                        ? 'bg-[#1b4332] text-yellow-400 font-extrabold shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(26,71,49,0.4)] active:translate-y-0 active:scale-95'
                        : 'bg-white border border-[#1b1c1a] text-[#1b1c1a] font-bold hover:bg-stone-50 transition-colors'
                    }`}
                  >
                    {pkg.ctaText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small Non-Intrusive Shipping Urgency Countdown Timer */}
        <ShippingUrgencyTimer />

      </div>
    </section>
  );
};
