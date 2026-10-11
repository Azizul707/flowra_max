import React from 'react';
import { Sparkles } from 'lucide-react';
import { FLOWER_LIST } from '@/lib/data';
import { FlowerVisual } from '@/components/ui/FlowerVisual';

export const ProductShowcase: React.FC = () => {
  return (
    <section id="flowers" className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#e3dfd5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1b4332] mb-2 font-sans-bengali">
              <Sparkles className="w-3.5 h-3.5 text-[#52b788]" />
              <span>১০ প্রজাতির প্রিমিয়াম ফুল কালেকশন</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-serif-bengali text-[#1b1c1a]">
              প্রতিটি প্যাকেটে যে ১০টি জাত পাচ্ছেন
            </h2>
          </div>

          <div className="text-xs text-stone-500 font-sans-bengali bg-white px-3 py-1.5 rounded-lg border border-[#e3dfd5] self-start md:self-auto">
            প্রতিটি জাত প্রায় ০.৫ গ্রাম (+/-) এয়ারটাইট প্যাকেজিং
          </div>
        </div>

        {/* 10 Cards Grid (5 across on desktop, 2-3 on tablet/mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {FLOWER_LIST.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white border border-[#e3dfd5] text-center flex flex-col items-center justify-between shadow-xs hover:border-[#52b788]/60 transition-colors"
            >
              <div className="flex flex-col items-center">
                {/* Index Number */}
                <span className="text-[11px] font-bold text-stone-400 font-serif-bengali mb-2">
                  {item.bnId}
                </span>

                {/* Botanical Icon / Visual */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-inner"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <FlowerVisual
                    id={
                      item.id === 1 ? 'marigold' :
                      item.id === 2 ? 'zinnia' :
                      item.id === 3 ? 'sunflower' :
                      item.id === 4 ? 'calendula' :
                      item.id === 5 ? 'cosmos' :
                      item.id === 6 ? 'sunflower' :
                      item.id === 7 ? 'dianthus' :
                      item.id === 8 ? 'sunflower' :
                      item.id === 9 ? 'morning-glory' : 'petunia'
                    }
                    name={item.name}
                    size="sm"
                    className="w-7 h-7"
                  />
                </div>

                {/* Flower Name */}
                <h3 className="text-sm font-bold text-[#1b1c1a] font-serif-bengali">
                  {item.name}
                </h3>
              </div>

              {/* Subtitle */}
              <p className="text-[11px] text-stone-500 mt-1 font-sans-bengali">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
