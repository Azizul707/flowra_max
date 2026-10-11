'use client';

import React from 'react';
import Image from 'next/image';
import { Sprout, ShieldCheck, ShoppingBag, Clock } from 'lucide-react';

export const Navbar: React.FC = () => {
  const scrollToCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('checkout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e3dfd5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Trust Badges */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a href="#" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Green Agri BD Logo"
              width={160}
              height={44}
              className="h-9 sm:h-11 w-auto object-contain"
              priority
            />
          </a>

          {/* Badges beside brand */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f5f3f0] border border-[#e3dfd5] text-[11px] font-semibold text-[#1b4332]">
              <Sprout className="w-3.5 h-3.5 text-[#52b788]" />
              <span>১০ প্রজাতির প্রীমিয়াম</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f5f3f0] border border-[#e3dfd5] text-[11px] font-semibold text-[#1b4332]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#52b788]" />
              <span>৯০%+ জার্মিনেশন গ্যারান্টি</span>
            </div>
            <div className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-900 font-sans-bengali">
              <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>আজকের শিপমেন্ট স্লট: ৭টি বাকি</span>
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-700 font-sans-bengali">
          <a href="#packages" className="hover:text-[#1b4332] transition-colors">
            প্যাকেজসমূহ
          </a>
          <a href="#reviews" className="hover:text-[#1b4332] transition-colors">
            কাস্টমার রিভিউ
          </a>
          <a href="#guide" className="hover:text-[#1b4332] transition-colors">
            রোপণ নির্দেশিকা
          </a>
          <a href="#faq" className="hover:text-[#1b4332] transition-colors">
            এফএকিউ
          </a>
        </nav>

        {/* Right CTA Button */}
        <button
          onClick={scrollToCheckout}
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-extrabold text-yellow-400 bg-[#1b4332] rounded-lg shadow-sm whitespace-nowrap font-sans-bengali transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(26,71,49,0.4)] active:translate-y-0 active:scale-95"
        >
          <ShoppingBag className="w-4 h-4 text-yellow-400" />
          <span>অর্ডার করুন</span>
        </button>

      </div>
    </header>
  );
};
