'use client';

import React, { useSyncExternalStore } from 'react';
import { Clock, Truck, Flame, ArrowRight } from 'lucide-react';

function getRemainingSeconds() {
  const now = new Date();
  const target = new Date();
  target.setHours(17, 0, 0, 0);
  if (now.getTime() > target.getTime()) {
    target.setDate(target.getDate() + 1);
  }
  return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
}

function subscribe(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

export const ShippingUrgencyTimer: React.FC = () => {
  const secondsLeft = useSyncExternalStore(
    subscribe,
    getRemainingSeconds,
    () => 16125 // Stable SSR snapshot (4h 28m 45s)
  );

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const remainingSlots = 7;

  // Bengali number converter helper
  const toBn = (num: number) => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).padStart(2, '0').split('').map((d) => bnDigits[parseInt(d, 10)] ?? d).join('');
  };

  const scrollToCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('checkout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mt-8 pt-2">
      <div className="max-w-4xl mx-auto rounded-2xl bg-white border border-[#e3dfd5] p-4 sm:p-5 shadow-xs relative overflow-hidden">
        
        {/* Subtle decorative background gradient accent */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#d8f3dc]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Dispatch Urgency Info */}
          <div className="flex items-start sm:items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-[#d8f3dc] flex items-center justify-center text-[#1b4332] shrink-0">
              <Truck className="w-5 h-5 text-[#006c48]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full font-sans-bengali">
                  <Flame className="w-3 h-3 text-amber-600 fill-amber-600" />
                  <span>আজকের শিডিউল</span>
                </span>
                <span className="text-xs font-bold text-[#1b1c1a] font-serif-bengali">
                  আজকের শিপমেন্টের জন্য আর মাত্র {toBn(remainingSlots)}টি স্লট বাকি!
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans-bengali mt-0.5">
                বিকাল ৫:০০টার আগে কনফার্ম করলে পার্সেল আজকেই কুরিয়ারে হ্যান্ডওভার করা হবে।
              </p>
            </div>
          </div>

          {/* Right: Live Countdown Clock & Instant Action */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
            
            {/* Clock Digits Display */}
            <div className="flex items-center gap-1 text-center font-sans-bengali">
              <Clock className="w-3.5 h-3.5 text-stone-400 mr-1 hidden sm:block" />
              
              {/* Hours */}
              <div className="flex flex-col items-center">
                <span className="w-9 sm:w-10 py-1 rounded-md bg-[#1b4332] text-yellow-400 font-extrabold text-xs sm:text-sm tabular-nums shadow-xs">
                  {toBn(hours)}
                </span>
                <span className="text-[9px] text-stone-500 font-medium mt-0.5">ঘণ্টা</span>
              </div>

              <span className="text-stone-400 font-bold -mt-3.5">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <span className="w-9 sm:w-10 py-1 rounded-md bg-[#1b4332] text-yellow-400 font-extrabold text-xs sm:text-sm tabular-nums shadow-xs">
                  {toBn(minutes)}
                </span>
                <span className="text-[9px] text-stone-500 font-medium mt-0.5">মিনিট</span>
              </div>

              <span className="text-stone-400 font-bold -mt-3.5">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <span className="w-9 sm:w-10 py-1 rounded-md bg-[#1b4332] text-yellow-400 font-extrabold text-xs sm:text-sm tabular-nums shadow-xs">
                  {toBn(seconds)}
                </span>
                <span className="text-[9px] text-stone-500 font-medium mt-0.5">সেকেন্ড</span>
              </div>
            </div>

            {/* Quick Grab Slot Button */}
            <button
              onClick={scrollToCheckout}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-[#1b4332] text-yellow-400 text-xs font-bold hover:bg-[#133225] transition-all font-sans-bengali shadow-xs shrink-0 transform hover:scale-105 active:scale-95"
            >
              <span>স্লট বুক করুন</span>
              <ArrowRight className="w-3 h-3 text-yellow-400" />
            </button>

          </div>

        </div>

        {/* Micro progress bar for slots */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-sans-bengali">
          <span>দৈনিক শিপমেন্ট ক্যাপাসিটি: ৫০ প্যাক</span>
          <div className="flex items-center gap-2">
            <div className="w-24 sm:w-32 h-1.5 rounded-full bg-stone-200 overflow-hidden">
              <div className="h-full bg-[#006c48] rounded-full transition-all duration-500" style={{ width: '86%' }} />
            </div>
            <span className="font-semibold text-emerald-800">৮৬% বুকড</span>
          </div>
        </div>

      </div>
    </div>
  );
};
