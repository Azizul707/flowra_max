'use client';

import React, { useEffect } from 'react';
import { TopAnnouncementBar } from '@/components/sections/TopAnnouncementBar';
import { Navbar } from '@/components/sections/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { PricingSection } from '@/components/sections/PricingSection';
import { CustomerGallery } from '@/components/sections/CustomerGallery';
import { VideoReviewSection } from '@/components/sections/VideoReviewSection';
import { WhyUsSection } from '@/components/sections/WhyUsSection';
import { ThreeStepsSection } from '@/components/sections/ThreeStepsSection';
import { GuaranteeSection } from '@/components/sections/GuaranteeSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CheckoutSection } from '@/components/sections/CheckoutSection';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  useEffect(() => {
    const trackViewContent = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_name: 'FloraMax 10-in-1 Combo',
          content_category: 'Flower Seeds',
          currency: 'BDT',
          value: 499,
        });
        return true;
      }
      return false;
    };

    // Attempt immediate track if Meta Pixel is loaded, or retry once if loading asynchronously
    if (!trackViewContent()) {
      const timer = setTimeout(() => {
        trackViewContent();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1b1c1a]">
      {/* 1. Top Announcement Bar */}
      <TopAnnouncementBar />

      {/* 2. Navbar with Brand and Direct Order Button */}
      <Navbar />

      {/* 3. Hero Section */}
      <HeroSection />

      {/* 4. Trust Section: "বীজ লাগালাম, উঠবে তো?" */}
      <TrustSection />

      {/* 5. 10 Flower Varieties Grid: "প্রতিটি প্যাকেটে যে ১০টি জাত পাচ্ছেন" */}
      <ProductShowcase />

      {/* 6. Pricing Section: "আপনার জন্য কোন প্যাকেটি ভালো?" */}
      <PricingSection />

      {/* 7. Real Rooftop Gardeners' Photos: "আমাদের বাগানীদের ছাদ ফুটেছে" */}
      <CustomerGallery />

      {/* 8. Video Testimonial Card: "ছাদবাগানীদের সরাসরি ভিডিও রিভিউ" */}
      <VideoReviewSection />

      {/* 9. Unique Value Bundle: "কেন গ্রিনএগ্রি ফ্লাওয়ার কম্বো প্যাক সবার চেয়ে আলাদা?" */}
      <WhyUsSection />

      {/* 10. 3 Steps to Start: "মাত্র ৩ ধাপে শুরু করুন আপনার ছাদবাগান" */}
      <ThreeStepsSection />

      {/* 11. Protection & Guarantee: "বীজ নিয়ে ভয়টা এখানেই কমিয়ে দিন।" */}
      <GuaranteeSection />

      {/* 12. FAQs: "সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ" */}
      <FaqSection />

      {/* 13. Direct Order Form & Customer Review Carousel */}
      <CheckoutSection />

      {/* 14. Footer with Copyright & Policy Links */}
      <Footer />
    </main>
  );
}
