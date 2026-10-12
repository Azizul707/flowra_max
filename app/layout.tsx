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
  title: 'FloraMax 10-in-1 ফুলের বীজ কম্বো | Green Agri BD',
  description: 'ছাদবাগান ও বারান্দার জন্য ৯৮% জার্মিনেশন গ্যারান্টি সহ ১০টি প্রিমিয়াম জাতের বিদেশি ও দেশি ফুলের বীজ কম্বো। ক্যাশ অন ডেলিভারি ও দ্রুত হোম ডেলিভারি।',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://greenagribd.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FloraMax 10-in-1 ফুলের বীজ কম্বো | Green Agri BD',
    description: 'ছাদবাগান ও বারান্দার জন্য ৯৮% জার্মিনেশন গ্যারান্টি সহ ১০টি প্রিমিয়াম জাতের বিদেশি ও দেশি ফুলের বীজ কম্বো। ক্যাশ অন ডেলিভারি ও দ্রুত হোম ডেলিভারি।',
    url: '/',
    siteName: 'Green Agri BD',
    locale: 'bn_BD',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FloraMax 10-in-1 প্রিমিয়াম ফুলের বীজ কম্বো প্যাক',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FloraMax 10-in-1 ফুলের বীজ কম্বো | Green Agri BD',
    description: 'ছাদবাগান ও বারান্দার জন্য ৯৮% জার্মিনেশন গ্যারান্টি সহ ১০টি ফুলের বীজ কম্বো প্যাক।',
    images: ['/og-image.jpg'],
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
