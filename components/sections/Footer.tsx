import React from 'react';
import Image from 'next/image';
import { Sprout } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#e3dfd5] py-8 text-xs text-stone-600 font-sans-bengali">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <Image
            src="/logo.png"
            alt="Green Agri BD Logo"
            width={140}
            height={36}
            className="h-8 sm:h-9 w-auto object-contain shrink-0"
            loading="lazy"
          />
          <span>
            © ২০২৪ GreenAgri বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত। ছাদবাগান ও বারান্দার ফুল চাষের বিশ্বস্ত সঙ্গী।
          </span>
        </div>

        {/* Right: Policy Links from screen.png */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-stone-500">
          <a href="#" className="hover:text-stone-900 transition-colors">
            গোপনীয়তা নীতি
          </a>
          <a href="#" className="hover:text-stone-900 transition-colors">
            রিটার্ন ও রিফান্ড পলিসি
          </a>
          <a href="#" className="hover:text-stone-900 transition-colors">
            ডেলিভারি সংক্রান্ত নিয়মাবলী
          </a>
          <a href="#" className="hover:text-stone-900 transition-colors">
            যোগাযোগ ও সহায়তা
          </a>
        </div>

      </div>
    </footer>
  );
};
