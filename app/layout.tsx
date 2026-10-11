import type {Metadata} from 'next';
import './globals.css';
import { Suspense } from 'react';
import { Hind_Siliguri } from 'next/font/google';
import { MetaPixel } from '@/components/MetaPixel';
import { FacebookPixel } from '@/components/FacebookPixel';
import { ChatWidgetWrapper } from '@/components/ChatWidgetWrapper';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: 'গ্রীন এগ্রি বিডি | ১০ প্রজাতির প্রিমিয়াম ফুলের বীজ কম্বো প্যাক',
  description: 'ছাদবাগান ও বারান্দার জন্য ৯৮% জার্মিনেশন গ্যারান্টি সহ ১০টি প্রিমিয়াম জাতের বিদেশি ও দেশি ফুলের বীজ কম্বো। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।',
  openGraph: {
    title: 'গ্রীন এগ্রি বিডি | ১০ প্রজাতির প্রিমিয়াম ফুলের বীজ কম্বো প্যাক',
    description: 'ছাদবাগান ও বারান্দার জন্য ৯৮% জার্মিনেশন গ্যারান্টি সহ ১০টি প্রিমিয়াম জাতের ফুলের বীজ কম্বো। সাথে ফ্রি উপহার ও ক্যাশ অন ডেলিভারি!',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'গ্রীন এগ্রি বিডি | ১০ প্রজাতির প্রিমিয়াম ফুলের বীজ কম্বো প্যাক',
    description: 'ছাদবাগান ও বারান্দার জন্য ৯৮% জার্মিনেশন গ্যারান্টি সহ ১০টি ফুলের বীজ কম্বো প্যাক।',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="bn" className={`scroll-smooth ${hindSiliguri.variable}`}>
      <body className={`min-h-screen bg-[#FAF8F5] text-[#17231C] antialiased selection:bg-[#52B788]/20 selection:text-[#1B4332] ${hindSiliguri.className}`} suppressHydrationWarning>
        <MetaPixel />
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        {children}
        <ChatWidgetWrapper />
      </body>
    </html>
  );
}
