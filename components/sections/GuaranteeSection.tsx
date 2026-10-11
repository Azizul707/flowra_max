import React from 'react';
import { ShieldCheck, Package, Sprout, Info } from 'lucide-react';

export const GuaranteeSection: React.FC = () => {
  return (
    <section className="py-10 bg-[#FAF8F5] border-t border-[#e3dfd5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="rounded-2xl bg-white border border-[#e3dfd5] p-6 sm:p-8 shadow-sm">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#d8f3dc] flex items-center justify-center text-[#006c48]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#006c48] uppercase tracking-wider block font-sans-bengali">
                ঝুঁকি এড়াতে সুরক্ষা পলিসি
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif-bengali text-[#1b1c1a]">
                বীজ নিয়ে ভয়টা এখানেই কমিয়ে দিন।
              </h3>
            </div>
          </div>

          {/* 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-stone-100">
            {/* Column 1 */}
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-[#1b4332] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#1b1c1a] font-serif-bengali">
                  পার্সেল হাতে পেয়েই দেখে নিন
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed font-sans-bengali">
                  ডেলিভারি ম্যানের সামনে packet check করে নিন। কোনো rotten বা damaged seed/packet issue থাকলে তখনই আমাদের জানান।
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex items-start gap-3">
              <Sprout className="w-5 h-5 text-[#006c48] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#1b1c1a] font-serif-bengali">
                  ৭ দিনেও sprout না হলে?
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed font-sans-bengali">
                  Claim policy অনুযায়ী Order ID, valid order phone number এবং seed packet-এর ছবি দিয়ে যোগাযোগ করার সুযোগ থাকে।
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footnote */}
          <div className="pt-4 flex items-center gap-2 text-xs text-stone-500 font-sans-bengali">
            <Info className="w-4 h-4 text-stone-400 shrink-0" />
            <span>কোনো ভুয়া প্রচারণা আমরা করি না—আমরা সত্যতার সাথে প্রকৃত কোয়ালিটি ও কাস্টমার সহায়তায় বিশ্বাসী।</span>
          </div>

        </div>

      </div>
    </section>
  );
};
