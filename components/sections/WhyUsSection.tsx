import React from 'react';
import { Sprout, BookOpen, Sun, Package } from 'lucide-react';
import { WHY_US_ITEMS } from '@/lib/data';

export const WhyUsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#e3dfd5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1 font-sans-bengali">
            উপকার বান্ডল
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-serif-bengali text-[#1b1c1a]">
            কেন গ্রিনএগ্রি ফ্লাওয়ার কম্বো প্যাক সবার চেয়ে আলাদা?
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {WHY_US_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e3dfd5] shadow-xs flex items-start gap-4 hover:border-[#52b788]/60 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-[#d8f3dc] flex items-center justify-center shrink-0 text-[#1b4332]">
                {idx === 0 && <Sprout className="w-6 h-6 text-[#006c48]" />}
                {idx === 1 && <BookOpen className="w-6 h-6 text-[#006c48]" />}
                {idx === 2 && <Sun className="w-6 h-6 text-amber-600" />}
                {idx === 3 && <Package className="w-6 h-6 text-[#1b4332]" />}
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1b1c1a] font-serif-bengali">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-stone-600 mt-1.5 leading-relaxed font-sans-bengali">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
