'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: 'অর্ডার করার কতদিনের মধ্যে ডেলিভারি পাবো?',
    answer:
      'ঢাকার সিটির ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে (১-২ দিন) এবং ঢাকার বাইরে সারা বাংলাদেশে ২ থেকে ৩ দিনের মধ্যে আপনার ঠিকানায় সরাসরি হোম ডেলিভারি পৌঁছে দেওয়া হবে। ডেলিভারি ম্যানের সামনে পার্সেল দেখে নিশ্চিত হয়ে টাকা পরিশোধ করতে পারবেন।',
  },
  {
    id: 2,
    question: 'বীজের অঙ্কুরোদগম (Germination) হার কেমন?',
    answer:
      'আমাদের বীজগুলো শতভাগ ল্যাব-পরীক্ষিত এবং এর অঙ্কুরোদগম হার ৯০% এর উপরে। থাইল্যান্ড থেকে আমদানিকৃত এই প্রিমিয়াম হাইব্রিড ভ্যারাইটিগুলো বাংলাদেশের আবহাওয়া, ছাদবাগান ও বারান্দার টবের জন্য বিশেষভাবে পরীক্ষিত।',
  },
  {
    id: 3,
    question: 'প্যাকেটের সাথে কি কোনো গাইডলাইন দেওয়া হবে?',
    answer:
      'হ্যাঁ, প্রতিটি অর্ডারের সাথে একটি সম্পূর্ণ ফ্রি Planting Guide PDF দেওয়া হবে। এতে মাটি প্রস্তুতকরণ, সঠিক নিয়মে বীজ বপন, আর্দ্রতা বজায় রাখা এবং কীটনাশক ছাড়াই ফুল দ্রুত ফোটানোর সহজ বাংলা নির্দেশিকা রয়েছে।',
  },
  {
    id: 4,
    question: 'বীজ লাগানোর পর ৭ দিনেও চারা না উঠলে কি ব্যবস্থা?',
    answer:
      'আমাদের বীজগুলো ৯৮% জার্মিনেশন গ্যারান্টিযুক্ত। জাতভেদে ও আবহাওয়া অনুযায়ী চারা বের হতে ৭ থেকে ১৫ দিন পর্যন্ত সময় লাগতে পারে। নির্দেশিকা অনুসরণ করার পরেও কোনো সমস্যা হলে আমাদের কাস্টমার সাপোর্টে ছবি পাঠালে দ্রুত ফ্রি রিপ্লেসমেন্ট প্রদান করা হয়।',
  },
  {
    id: 5,
    question: 'আগে কি কোনো অগ্রিম টাকা দিতে হবে?',
    answer:
      'একদম না! কোনো প্রকার অগ্রিম পেমেন্টের প্রয়োজন নেই। পার্সেল ডেলিভারি ম্যান আপনার ঠিকানায় নিয়ে যাওয়ার পর ক্যাশ অন ডেলিভারিতে সম্পূর্ণ নিশ্চিন্তে মূল্য পরিশোধ করবেন।',
  },
];

export const FaqSection: React.FC = () => {
  // First item open by default for immediate engagement
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#e3dfd5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d8f3dc] text-[#006c48] text-xs font-semibold mb-3 font-sans-bengali">
            <HelpCircle className="w-3.5 h-3.5 text-[#006c48]" />
            <span>সাধারণ জিজ্ঞাসা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-bengali text-[#1b1c1a]">
            সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 font-sans-bengali">
            অর্ডার করার আগে আপনার মনের সাধারণ প্রশ্নগুলোর সহজ ও স্পষ্ট সমাধান
          </p>
        </div>

        {/* Smooth Animated FAQ Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl bg-white border transition-all duration-300 shadow-xs overflow-hidden ${
                  isOpen
                    ? 'border-[#006c48]/60 ring-1 ring-[#006c48]/15 shadow-sm'
                    : 'border-[#e3dfd5] hover:border-stone-400'
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-sans-bengali select-none cursor-pointer focus:outline-none"
                >
                  <span
                    className={`text-sm sm:text-base font-bold font-serif-bengali transition-colors duration-200 ${
                      isOpen ? 'text-[#1b4332]' : 'text-[#1b1c1a]'
                    }`}
                  >
                    {faq.question}
                  </span>

                  {/* Smooth Rotating Chevron Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isOpen
                        ? 'bg-[#d8f3dc] text-[#1b4332]'
                        : 'bg-[#f5f3f0] text-stone-500'
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transform transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-180 text-[#1b4332]' : 'rotate-0'
                      }`}
                    />
                  </div>
                </button>

                {/* CSS Grid Smooth Height Transition */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-bengali border-t border-stone-100 bg-[#FAF8F5]/60">
                      {faq.answer}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
