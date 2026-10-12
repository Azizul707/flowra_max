'use client';

import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

export const StickyMobileBar: React.FC = () => {
  const scrollToCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('checkout') || document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="মোবাইল কুইক অর্ডার বার"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3 select-none"
    >
      {/* Left side: Value anchor */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-[11px] font-medium text-stone-500 font-sans-bengali">
          <Sparkles className="w-3 h-3 text-[#006c48]" />
          <span>১০ জাতের প্রিমিয়াম বীজ</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-base sm:text-lg font-extrabold text-emerald-800 font-serif-bengali tracking-tight">
            ৳৪৯৯
          </span>
          <span className="text-[10px] font-bold bg-[#d8f3dc] text-[#006c48] px-2 py-0.5 rounded-full font-sans-bengali">
            ফ্রি ডেলিভারি
          </span>
        </div>
      </div>

      {/* Right side: High-contrast Thumb-Zone button */}
      <button
        onClick={scrollToCheckout}
        className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm font-extrabold text-yellow-400 bg-[#1b4332] active:bg-[#143427] rounded-xl shadow-md font-sans-bengali transition-transform active:scale-95"
      >
        <ShoppingBag className="w-4 h-4 text-yellow-400" />
        <span>অর্ডার করুন ➔</span>
      </button>
    </aside>
  );
};
