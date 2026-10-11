'use client';

import React from 'react';
import { Package } from 'lucide-react';
import { CheckoutForm } from '@/components/CheckoutForm';
import { ReviewCarousel } from '@/components/ReviewCarousel';

export const CheckoutSection: React.FC = () => {
  return (
    <section id="checkout" className="py-12 sm:py-20 bg-[#FAF8F5] border-t border-[#e3dfd5] scroll-mt-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d8f3dc] text-[#1b4332] text-xs font-semibold mb-3 font-sans-bengali">
            <Package className="w-3.5 h-3.5 text-[#1b4332]" />
            <span>সহজ ও নির্ভুল অর্ডার ফর্ম</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold font-serif-bengali text-[#1b1c1a]">
            🌸 আপনার ফুলের বাগানটা আজ থেকেই শুরু হোক
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 font-sans-bengali">
            নিচে শুধু কয়েকটি তথ্য দিন। বাকি কাজ আমরা করে দিচ্ছি।
          </p>
        </div>

        {/* Form Card Container */}
        <div className="max-w-2xl mx-auto rounded-2xl bg-white border border-[#e3dfd5] p-5 sm:p-7 shadow-sm">
          <CheckoutForm />
        </div>

        {/* Social Proof Review Carousel directly below Checkout Form */}
        <div className="mt-10 sm:mt-14">
          <ReviewCarousel />
        </div>

      </div>
    </section>
  );
};
