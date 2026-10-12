'use client';

import React from 'react';
import { Video, Check, ArrowRight } from 'lucide-react';

export const VideoReviewSection: React.FC = () => {
  const scrollToCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('checkout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#e3dfd5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d8f3dc] text-[#1b4332] text-xs font-semibold mb-3 font-sans-bengali">
            <Video className="w-3.5 h-3.5 text-[#1b4332]" />
            <span>ভিডিও অভিজ্ঞতা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-serif-bengali text-[#1b1c1a]">
            📹 ছাদবাগানীদের সরাসরি ভিডিও রিভিউ
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 font-sans-bengali">
            বাস্তব অভিজ্ঞতা দেখুন — বীজ থেকে চারা ও ফুল ফোটার আসল দৃশ্য
          </p>
        </div>

        {/* 2-Column Story Video Box */}
        <div className="rounded-2xl bg-white border border-[#e3dfd5] p-5 sm:p-7 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Real YouTube Shorts Video Embed */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            {/* Top Badge Label */}
            <div className="w-full max-w-[280px] sm:max-w-[300px] flex items-center justify-between mb-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#d8f3dc] text-[#006c48] text-[11px] font-bold font-sans-bengali">
                <Video className="w-3.5 h-3.5 text-red-600" />
                <span>রিয়েল কাস্টোমার ভিডিও</span>
              </div>
              <span className="text-[11px] text-stone-500 font-sans-bengali">
                মোহাম্মদপুর, ঢাকা
              </span>
            </div>

            {/* Smartphone-style Vertical Video Frame */}
            <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[9/16] rounded-2xl bg-black border-4 border-stone-800 shadow-2xl overflow-hidden ring-1 ring-black/10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/r8wCkAkBHrc?mute=1&rel=0&modestbranding=1&playsinline=1"
                title="Green Agri Customer Video Review"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Exact Bengali Text from screen.png */}
          <div className="md:col-span-7 flex flex-col space-y-4">
            
            {/* Verification Pill */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d8f3dc] text-[#006c48] text-xs font-semibold font-sans-bengali">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>১০০% বাস্তব গ্রাহকের স্বীকৃতি</span>
              </div>
            </div>

            {/* Quote Title */}
            <h3 className="text-xl sm:text-2xl font-bold font-serif-bengali text-[#1b1c1a] leading-snug">
              &ldquo;প্রথমবার বীজ বুনে এত ফুল পাবো বিশ্বাসই করিনি!&rdquo;
            </h3>

            {/* Paragraph */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-bengali">
              ঢাকার মোহাম্মদপুর থেকে আমাদের সম্মানিত গ্রাহক তাঁর ছাদবাগানের সতেজ চারা ও প্রস্ফুটিত ফুলের দৃশ্য শেয়ার করেছেন। প্যাকেটের গাইডলাইন ফলো করেই সফল অঙ্কুরোদগম সম্ভব হয়েছে।
            </p>

            {/* Bullet Points */}
            <div className="space-y-2 text-xs sm:text-[13px] text-stone-700 font-sans-bengali pt-1">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#006c48] shrink-0 mt-0.5 stroke-[2.5]" />
                <span>অঙ্কুরোদগম থেকে ফুল ফোটার পর্যায়ক্রমিক আপডেট</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#006c48] shrink-0 mt-0.5 stroke-[2.5]" />
                <span>টব মাটি প্রস্তুত ও সাধারণ পানি স্প্রে করার পদ্ধতি</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#006c48] shrink-0 mt-0.5 stroke-[2.5]" />
                <span>সম্পূর্ণ প্রাকৃতিক ও রাসায়নিক সারমুক্ত পরিচর্যা</span>
              </div>
            </div>

            {/* Button */}
            <div className="pt-2">
              <button
                onClick={scrollToCheckout}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1b4332] text-yellow-400 font-extrabold text-xs sm:text-sm font-sans-bengali transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(26,71,49,0.4)] active:translate-y-0 active:scale-95"
              >
                <span>নিজের বাগান শুরু করুন</span>
                <ArrowRight className="w-4 h-4 text-yellow-400" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
