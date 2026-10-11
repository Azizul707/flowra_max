import React from 'react';
import { MessageCircle } from 'lucide-react';
import { THREE_STEPS } from '@/lib/data';

export const ThreeStepsSection: React.FC = () => {
  return (
    <section id="guide" className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#e3dfd5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1 font-sans-bengali">
            সহজ প্রক্রিয়া
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold font-serif-bengali text-[#1b1c1a]">
            মাত্র ৩ ধাপে শুরু করুন আপনার ছাদবাগান
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {THREE_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e3dfd5] text-center flex flex-col items-center justify-between shadow-xs"
            >
              <div className="flex flex-col items-center">
                {/* Dark Green Step Badge */}
                <div className="w-10 h-10 rounded-full bg-[#1b4332] text-white flex items-center justify-center font-bold font-serif-bengali text-lg mb-4">
                  {item.step}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#1b1c1a] font-serif-bengali">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-stone-600 mt-2 leading-relaxed font-sans-bengali">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Notice Strip */}
        <div className="mt-6 p-3.5 sm:p-4 rounded-xl bg-white border border-[#e3dfd5] text-xs sm:text-[13px] text-stone-700 flex items-center justify-center gap-2 font-sans-bengali text-center shadow-xs">
          <MessageCircle className="w-4 h-4 text-[#25d366] shrink-0" />
          <span>অর্ডার কনফার্মেশনের পরপরই Planting Guide PDF আপনার WhatsApp নম্বরে স্বয়ংক্রিয়ভাবে পাঠিয়ে দেওয়া হবে।</span>
        </div>

      </div>
    </section>
  );
};
