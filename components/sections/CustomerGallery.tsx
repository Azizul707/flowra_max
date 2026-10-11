'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export const CustomerGallery: React.FC = () => {
  const scrollToCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('checkout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#e3dfd5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Overall Card Container */}
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#e3dfd5] p-5 sm:p-8 shadow-md sm:shadow-lg">
          
          {/* 1. Section Header (Centered) */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d8f3dc] text-[#006c48] text-xs font-semibold font-sans-bengali">
              <Sparkles className="w-3.5 h-3.5 text-[#006c48]" />
              <span>বাস্তব ফলাফল</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold font-serif-bengali text-[#1b1c1a] tracking-tight mt-2.5">
              🌸 আমাদের বাগানী বন্ধুদের ছাদে ফুটেছে
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 font-sans-bengali mt-1.5">
              আমাদের কম্বো প্যাক-লাগানো ফুলের কিছু বাস্তব ছবি—কোনো stock photo নয়।
            </p>
          </div>

          {/* 2. Main Image Area */}
          <div className="relative w-full aspect-[2/1] overflow-hidden rounded-xl sm:rounded-2xl border border-stone-200 bg-stone-100 shadow-sm">
            <Image
              src="/customer-gallery.jpg"
              alt="আমাদের বাগানী বন্ধুদের ছাদে ফুটেছে - বাস্তব কাস্টমার ফলাফল"
              width={1800}
              height={900}
              className="w-full h-full object-cover rounded-xl sm:rounded-2xl transition-transform duration-500 hover:scale-[1.01]"
              loading="lazy"
            />
          </div>

          {/* 3. Bottom Footer Area (Below the image) */}
          <div className="mt-4 pt-3.5 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left Side (Text) */}
            <p className="text-xs sm:text-sm text-stone-600 font-sans-bengali text-center sm:text-left leading-relaxed">
              📷 এগুলো শুধু ফুলের ছবি নয়—বাস্তব customer experience! ছাদে, টবে, নিজের হাতে লাগানো।
            </p>

            {/* Right Side (CTA Button with exact required styling) */}
            <button
              onClick={scrollToCheckout}
              className="bg-[#1b4332] text-yellow-400 font-extrabold text-xs sm:text-sm py-3 px-5 sm:px-6 rounded-xl font-sans-bengali shadow-md shrink-0 whitespace-nowrap transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(26,71,49,0.4)] active:translate-y-0 active:scale-95"
            >
              আপনিও এমন ছাদ বাগান করতে চান? →
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
