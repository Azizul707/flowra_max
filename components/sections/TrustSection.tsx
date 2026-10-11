import React from 'react';
import { FlaskConical, ShieldCheck, Plane } from 'lucide-react';
import { TRUST_POINTS } from '@/lib/data';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#e3dfd5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Centered Kicker & Quote Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2 font-sans-bengali">
            নির্ভরযোগ্যতার নিশ্চয়তা
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold font-serif-bengali text-[#1b1c1a] leading-snug">
            “বীজ লাগালাম, উঠবে তো?” — এই চিন্তাটাও আমরা মাথায় রেখেছি।
          </h2>
        </div>

        {/* 3 Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {TRUST_POINTS.map((item, idx) => {
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e3dfd5] shadow-sm flex flex-col justify-between hover:border-[#52b788]/60 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#d8f3dc] flex items-center justify-center text-[#1b4332] mb-4">
                    {idx === 0 && <FlaskConical className="w-5 h-5" />}
                    {idx === 1 && <ShieldCheck className="w-5 h-5 text-[#006c48]" />}
                    {idx === 2 && <Plane className="w-5 h-5" />}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1b1c1a] font-serif-bengali">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-stone-600 mt-2 leading-relaxed font-sans-bengali">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
