import React from 'react';
import { Sparkles } from 'lucide-react';

export const TopAnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="বিজ্ঞপ্তি" className="bg-[#1b4332] text-xs sm:text-[13px] py-2 px-3 text-center border-b border-[#2d5a45] overflow-hidden">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-1.5 font-bold font-sans-bengali">
        <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0 animate-pulse" />
        <div className="animate-glint flex items-center gap-1.5">
          <span>সারা দেশে ক্যাশ অন ডেলিভারি</span>
          <span aria-hidden="true" className="text-yellow-400/60 mx-1">|</span>
          <span>২ ও ৩ প্যাকে সম্পূর্ণ ফ্রি ডেলিভারি</span>
          <span aria-hidden="true" className="text-yellow-400/60 mx-1">|</span>
          <span>ফ্রি Planting Guide PDF</span>
        </div>
      </div>
    </aside>
  );
};
