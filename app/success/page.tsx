'use client';

import React, { Suspense, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  CheckCircle2, 
  Download, 
  FileText, 
  Clock, 
  Truck, 
  PackageCheck, 
  ArrowLeft, 
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  MessageCircle,
  Loader2
} from 'lucide-react';
import { DynamicPlantingGuide } from '@/components/DynamicPlantingGuide';

function SuccessContent() {
  const searchParams = useSearchParams();
  const packParam = searchParams.get('pack') || 'double';
  const nameParam = searchParams.get('name') || '';

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const guideRef = useRef<HTMLDivElement>(null);

  const packNames: Record<string, string> = {
    single: '১ প্যাক (১০টি বীজ সমাহার)',
    double: '২ প্যাক (সেরা ভ্যালু কম্বো - ফ্রি ডেলিভারি)',
    triple: '৩ প্যাক (ফ্যামিলি কম্বো - ফ্রি ডেলিভারি)',
  };

  const packName = packNames[packParam] || '২ প্যাক (সেরা ভ্যালু কম্বো)';

  const handleDynamicDownload = async () => {
    if (isGeneratingPdf || !guideRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const element = guideRef.current;

      // Render the off-screen / hidden styled component onto a high-res canvas
      const canvas = await html2canvas(element, {
        scale: 2, // 2x resolution for crisp Bengali text and vectors
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 800,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Handle multi-page if content overflows A4
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('Green-Agri-Planting-Guide.pdf');
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      // Fallback: trigger download directly
      const link = document.createElement('a');
      link.href = '/planting-guide.pdf';
      link.download = 'Green-Agri-Planting-Guide.pdf';
      link.click();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Brand Logo Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <Image
              src="/logo.png"
              alt="Green Agri BD Logo"
              width={200}
              height={56}
              className="h-12 sm:h-14 w-auto mx-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-[#e3dfd5] shadow-xl overflow-hidden">
          
          {/* Top Decorative Banner */}
          <div className="bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] p-6 sm:p-8 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Animated Checkmark Circle */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-white text-[#1b4332] shadow-lg mb-4 ring-8 ring-white/20 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-[#2d6a4f]" strokeWidth={2.5} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd700]/20 text-yellow-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>অর্ডার সফল ও সংরক্ষিত</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-bengali text-white leading-tight">
              অভিনন্দন! আপনার অর্ডারটি সফলভাবে কনফার্ম হয়েছে। 🎉
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
              Green Agri BD-এর সাথে যুক্ত হওয়ার জন্য আন্তরিক ধন্যবাদ
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Reassurance Text (The "Winning" Feeling) */}
            <div className="bg-[#FAF8F5] border border-[#e3dfd5] rounded-2xl p-5 text-center">
              {nameParam && (
                <p className="text-sm font-bold text-[#1b4332] mb-1 font-sans-bengali">
                  ধন্যবাদ, {nameParam}!
                </p>
              )}
              <p className="text-sm sm:text-base text-stone-700 font-sans-bengali leading-relaxed">
                আপনি যাচাইকৃত ও সেরা মানের বীজ নির্বাচন করে <span className="font-semibold text-[#1b4332]">একদম সঠিক সিদ্ধান্ত নিয়েছেন!</span> বাজারের নকল বা নিম্নমানের বীজে সময় নষ্ট না করে, অরিজিনাল বীজের এই প্রজেক্টে যুক্ত হওয়ার জন্য আপনাকে ধন্যবাদ। আপনার ছাদবাগান রঙিন করার জার্নি এখান থেকেই শুরু হলো! 🌸
              </p>
            </div>

            {/* Order Brief Info */}
            <div className="border border-stone-200 rounded-2xl p-4 sm:p-5 bg-white">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-100">
                <PackageCheck className="w-4 h-4 text-[#1b4332]" />
                <h2 className="text-xs sm:text-sm font-bold text-[#1b1c1a]">অর্ডার বিবরণী</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-stone-500 block">নির্বাচিত প্যাকেজ:</span>
                  <span className="font-semibold text-[#1b4332]">{packName}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">পেমেন্ট মেথড:</span>
                  <span className="font-semibold text-[#1b1c1a]">ক্যাশ অন ডেলিভারি (প্যাকেট পেয়ে টাকা দিন)</span>
                </div>
              </div>
            </div>

            {/* The PDF Delivery Section (Dynamic Client-Side Generation) */}
            <div className="rounded-2xl border-2 border-[#1b4332] bg-gradient-to-br from-[#d8f3dc]/60 via-[#FAF8F5] to-amber-50 p-6 text-center shadow-md relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b4332] text-yellow-300 text-xs font-bold mb-3">
                <FileText className="w-3.5 h-3.5" />
                <span>🎁 আপনার জন্য প্রতিশ্রুত ফ্রি উপহার!</span>
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold font-serif-bengali text-[#1b1c1a] mb-2">
                ফুলের বীজ রোপন ও যত্ন গাইড (Planting Guide)
              </h3>
              
              <p className="text-xs sm:text-sm text-stone-600 mb-5 max-w-lg mx-auto">
                বীজ কীভাবে সহজে অঙ্কুরোদগম করবেন, টবের মাটি কীভাবে প্রস্তুত করবেন এবং দ্রুত ফুল ফোটাবেন—সবকিছু বিস্তারিত এই গাইডে দেওয়া আছে। এখনই সংগ্রহ করে রাখুন!
              </p>

              {/* Dynamic PDF Trigger Button */}
              <button
                type="button"
                onClick={handleDynamicDownload}
                disabled={isGeneratingPdf}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-[#1b4332] text-yellow-400 font-bold text-sm sm:text-base transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(26,71,49,0.4)] active:translate-y-0 active:scale-95 shadow-lg group disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
                    <span>PDF তৈরি হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 text-yellow-400 group-hover:animate-bounce" />
                    <span>📥 ফ্রি Planting Guide PDF ডাউনলোড করুন</span>
                  </>
                )}
              </button>

              <p className="mt-2 text-[11px] text-stone-500">
                (বাটনে ক্লিক করলেই সরাসরি সম্পূর্ণ চাষ গাইডটি আপনার ডিভাইসে PDF আকারে ডাউনলোড হবে)
              </p>
            </div>

            {/* Next Steps / Automated WhatsApp Confirmation */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
              <h3 className="text-xs sm:text-sm font-bold text-[#1b1c1a] mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1b4332]" />
                <span>পরবর্তী ধাপসমূহ (Next Steps):</span>
              </h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ১
                  </div>
                  <p>
                    <strong className="text-[#1b1c1a]">অটোমেটেড কনফার্মেশন:</strong> আপনার দেওয়া নম্বরে কিছুক্ষণের মধ্যেই আমাদের সিস্টেম থেকে একটি WhatsApp মেসেজ যাবে। অনুগ্রহ করে মেসেজে &apos;Yes&apos; বাটনে ক্লিক করে আপনার অর্ডারটি চূড়ান্ত করুন।
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ২
                  </div>
                  <p>
                    <strong className="text-[#1b1c1a]">দ্রুত ডেলিভারি:</strong> ঢাকার ভেতর ২-৩ দিন এবং ঢাকার বাইরে ৩-৫ দিনের মধ্যে পার্সেল আপনার ঠিকানায় পৌঁছে যাবে।
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1b4332] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ৩
                  </div>
                  <p>
                    <strong className="text-[#1b1c1a]">চেক করে মূল্য পরিশোধ:</strong> ডেলিভারি ম্যানের সামনে প্যাকেট চেক করে ক্যাশ অন ডেলিভারিতে সম্পূর্ণ নিশ্চিন্তে মূল্য পরিশোধ করবেন।
                  </p>
                </div>
              </div>
            </div>

            {/* Helpline / WhatsApp Support Card */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1b4332]">কোনো জিজ্ঞাসা বা সাহায্য প্রয়োজন?</h4>
                  <p className="text-xs text-stone-600">আমাদের WhatsApp সাপোর্ট সবসময় আপনার সহযোগিতায় প্রস্তুত</p>
                </div>
              </div>
              <a
                href="https://wa.me/8801401068108"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1b4332] text-yellow-400 font-bold text-xs hover:bg-[#2d6a4f] transition-all shadow-sm hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp করুন: 01401068108</span>
              </a>
            </div>

            {/* Return to Home CTA */}
            <div className="text-center pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-[#1b4332] transition-colors py-2 px-4 rounded-lg hover:bg-stone-100"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>← আবার হোমপেজে ফিরে যান</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-8 text-center text-xs text-stone-500 space-y-1">
          <div className="flex items-center justify-center gap-4 text-stone-600">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1b4332]" /> শতভাগ জেনুইন বীজ
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#1b4332]" /> নিরাপদ হোম ডেলিভারি
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-[#1b4332]" /> সন্তুষ্টির নিশ্চয়তা
            </span>
          </div>
          <p>© {new Date().getFullYear()} Green Agri BD. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>

      </div>

      {/* Off-screen container for rendering the DynamicPlantingGuide for high-res PDF export */}
      <div 
        style={{ 
          position: 'fixed', 
          top: '0', 
          left: '-9999px', 
          width: '800px',
          pointerEvents: 'none',
          zIndex: -9999,
          overflow: 'hidden'
        }} 
        aria-hidden="true"
      >
        <DynamicPlantingGuide ref={guideRef} />
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#1b4332] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-bold text-[#1b4332]">অর্ডার তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
