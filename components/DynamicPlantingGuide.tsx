'use client';

import React, { forwardRef } from 'react';
import { 
  Sprout, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Droplets, 
  Sun, 
  Layers, 
  HelpCircle, 
  Phone, 
  Globe, 
  Bookmark, 
  BookOpen
} from 'lucide-react';

export const DynamicPlantingGuide = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        style={{
          backgroundColor: '#ffffff',
          width: '800px',
          padding: '40px',
          color: '#333333',
          fontFamily: "'Hind Siliguri', -apple-system, BlinkMacSystemFont, sans-serif",
          boxSizing: 'border-box',
          lineHeight: '1.6',
        }}
      >
        {/* ================= HEADER / BRANDING ================= */}
        <header
          style={{
            backgroundColor: '#1b4332',
            color: '#ffffff',
            padding: '28px',
            borderRadius: '16px',
            borderBottom: '4px solid #ffd700',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 215, 0, 0.15)',
                  color: '#ffd700',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                }}
              >
                <Sprout size={16} color="#ffd700" />
                <span>FloraMax 10-in-1 কম্বো প্যাক এক্সক্লুসিভ গাইড</span>
              </div>
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: '0 0 6px 0',
                }}
              >
                Green Agri | সম্পূর্ণ চাষ গাইড
              </h1>
              <p style={{ color: '#d8f3dc', fontSize: '13px', margin: 0 }}>
                ছাদবাগান ও বারান্দায় সহজ রোপন, পরিচর্যা ও দ্রুত ফুল ফোটানোর কৌশল
              </p>
            </div>
            <div style={{ textAlign: 'right', paddingLeft: '16px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffd700',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                }}
              >
                অফিসিয়াল সংস্করণ
              </span>
            </div>
          </div>
        </header>

        {/* ================= SECTION 1: INTRO & REQUIREMENTS ================= */}
        <section
          style={{
            marginBottom: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#1b4332',
              fontWeight: 'bold',
              fontSize: '18px',
              marginBottom: '14px',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '10px',
            }}
          >
            <BookOpen size={20} color="#2d6a4f" />
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1b4332' }}>সূচনা ও প্রয়োজনীয় উপকরণ</h2>
          </div>

          <p style={{ color: '#333333', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
            Green Agri-পরিবারে আপনাকে স্বাগতম! আপনি হাতে পেয়েছেন আমাদের সবচেয়ে জনপ্রিয় <strong style={{ color: '#1b4332' }}>&apos;FloraMax 10-in-1&apos; কম্বো প্যাক</strong>। এই প্যাকেটে রয়েছে বাছাইকৃত ১০টি ভিন্ন জাতের হাইব্রিড ফুলের বীজ।
          </p>

          <div
            style={{
              backgroundColor: '#e8f5e9',
              borderLeft: '4px solid #2d6a4f',
              padding: '16px',
              borderRadius: '0 12px 12px 0',
              marginBottom: '16px',
            }}
          >
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#1b4332',
                textTransform: 'uppercase',
                margin: '0 0 6px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Bookmark size={14} color="#2d6a4f" />
              এই গাইডটি পড়লে আপনি কী শিখবেন?
            </h3>
            <p style={{ fontSize: '13px', color: '#333333', margin: 0, lineHeight: '1.6' }}>
              মাটি তৈরি থেকে শুরু করে বীজ বপনের সঠিক নিয়ম, কোন বীজের জন্য কেমন যত্ন প্রয়োজন, চারা বড় করা এবং দ্রুত ফুল ফোটানোর কৌশল, সাধারণ সমস্যাগুলোর সহজ ও ঘরোয়া সমাধান।
            </p>
          </div>

          {/* Warning Box */}
          <div
            style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fcd34d',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              marginBottom: '16px',
            }}
          >
            <AlertTriangle size={18} color="#d97706" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <span style={{ fontWeight: 'bold', color: '#78350f', fontSize: '13px' }}>গুরুত্বপূর্ণ সতর্কতা:</span>
              <span style={{ color: '#92400e', fontSize: '13px', marginLeft: '6px' }}>
                বীজ বপন করার আগে অবশ্যই এই গাইডটি সম্পূর্ণ একবার পড়ে নিন।
              </span>
            </div>
          </div>

          {/* Materials Needed */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#666666',
                textTransform: 'uppercase',
                margin: '0 0 8px 0',
              }}
            >
              প্রয়োজনীয় প্রাথমিক উপকরণ:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px', color: '#333333' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1b4332', display: 'inline-block' }}></span>
                <span>টব বা ট্রে</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1b4332', display: 'inline-block' }}></span>
                <span>মাটির মিশ্রণ</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1b4332', display: 'inline-block' }}></span>
                <span>পানির ব্যবস্থা (স্প্রে বোতল)</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1b4332', display: 'inline-block' }}></span>
                <span>লেবেল বা মার্কার</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: SOIL RECIPES & TIMING ================= */}
        <section
          style={{
            marginBottom: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#1b4332',
              fontWeight: 'bold',
              fontSize: '18px',
              marginBottom: '14px',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '10px',
            }}
          >
            <Layers size={20} color="#2d6a4f" />
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1b4332' }}>মাটির ফর্মুলা ও বপনের সময়কাল</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            {/* Recipe 1 */}
            <div
              style={{
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: '#1b4332',
                  color: '#ffd700',
                  display: 'inline-block',
                  marginBottom: '6px',
                }}
              >
                সাধারণ ফুলের জন্য
              </span>
              <p style={{ fontSize: '12px', color: '#333333', fontWeight: 'bold', margin: '0 0 4px 0' }}>
                Recipe 1 (General):
              </p>
              <p style={{ fontSize: '12px', color: '#555555', margin: 0, lineHeight: '1.5' }}>
                বাগানের দোআঁশ মাটি: ৫০%, জৈব সার বা ভার্মি কম্পোস্ট: ৩০%, বালি বা কোকোপিট: ২০%
              </p>
            </div>

            {/* Recipe 2 */}
            <div
              style={{
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: '#1d4ed8',
                  color: '#ffffff',
                  display: 'inline-block',
                  marginBottom: '6px',
                }}
              >
                পদ্ম ফুলের জন্য
              </span>
              <p style={{ fontSize: '12px', color: '#333333', fontWeight: 'bold', margin: '0 0 4px 0' }}>
                Recipe 2 (Lotus):
              </p>
              <p style={{ fontSize: '12px', color: '#555555', margin: 0, lineHeight: '1.5' }}>
                এঁটেল বা কাদা মাটি: ৬০%, ভার্মি কম্পোস্ট: ২০%, কোনো ছিদ্র ছাড়া একটি গভীর ও প্রশস্ত গামলা।
              </p>
            </div>

            {/* Recipe 3 */}
            <div
              style={{
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: '#b45309',
                  color: '#ffffff',
                  display: 'inline-block',
                  marginBottom: '6px',
                }}
              >
                পর্তুলিকা / টাইম ফুলের জন্য
              </span>
              <p style={{ fontSize: '12px', color: '#333333', fontWeight: 'bold', margin: '0 0 4px 0' }}>
                Recipe 3 (Portulaca):
              </p>
              <p style={{ fontSize: '12px', color: '#555555', margin: 0, lineHeight: '1.5' }}>
                বেলে মাটি বা বালি মিশ্রিত মাটি: ৬০%, কোকোপিট: ২০% ও সার: ২০%
              </p>
            </div>
          </div>

          {/* Timing Box */}
          <div
            style={{
              padding: '14px',
              borderRadius: '12px',
              backgroundColor: '#e8f5e9',
              border: '1px solid #c8e6c9',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}
          >
            <Calendar size={18} color="#2d6a4f" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div style={{ fontSize: '12px', lineHeight: '1.5' }}>
              <span style={{ fontWeight: 'bold', color: '#1b4332' }}>উপযুক্ত সময়কাল (Timing):</span>
              <div style={{ marginTop: '4px', color: '#333333' }}>
                <div style={{ marginBottom: '2px' }}>
                  • <strong style={{ color: '#1b4332' }}>গ্রীষ্ম ও বর্ষাকালীন (পদ্ম, জিনিয়া, পর্তুলিকা, সূর্যমুখী):</strong> ফেব্রুয়ারি থেকে জুলাই।
                </div>
                <div>
                  • <strong style={{ color: '#1b4332' }}>সারা বছর (গাঁদা, কসমস, নয়নতারা):</strong> জানুয়ারি থেকে ডিসেম্বর।
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: SOWING METHODS & DEPTH ================= */}
        <section
          style={{
            marginBottom: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#1b4332',
              fontWeight: 'bold',
              fontSize: '18px',
              marginBottom: '14px',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '10px',
            }}
          >
            <Sprout size={20} color="#2d6a4f" />
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1b4332' }}>বীজ বপন পদ্ধতি ও গভীরতা চার্ট</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div
              style={{
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
              }}
            >
              <strong style={{ color: '#1b4332', display: 'block', marginBottom: '4px' }}>পদ্ধতি ১ (সরাসরি):</strong>
              <p style={{ color: '#555555', margin: 0 }}>টবের মাটি ঝুরঝুরে করে বীজগুলো নির্দিষ্ট দূরত্বে রাখুন এবং স্প্রে করে পানি দিন।</p>
            </div>

            <div
              style={{
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
              }}
            >
              <strong style={{ color: '#1b4332', display: 'block', marginBottom: '4px' }}>পদ্ধতি ২ (পানিতে ভেজানো):</strong>
              <p style={{ color: '#555555', margin: 0 }}>পদ্ম, মর্নিং গ্লোরি: পরিষ্কার নরমাল পানিতে ভিজিয়ে রাখুন।</p>
            </div>

            <div
              style={{
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
              }}
            >
              <strong style={{ color: '#1b4332', display: 'block', marginBottom: '4px' }}>পদ্ধতি ৩ (ট্রে বা কাপে):</strong>
              <p style={{ color: '#555555', margin: 0 }}>নয়নতারা, পর্তুলিকা: ছোট ট্রে বা প্লাস্টিকের কাপে কোকোপিট ও মাটির মিশ্রণ নিন।</p>
            </div>
          </div>

          {/* Depth Chart Table */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
            <div
              style={{
                backgroundColor: '#1b4332',
                color: '#ffd700',
                fontWeight: 'bold',
                fontSize: '12px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>গভীরতা চার্ট (Depth Chart)</span>
              <span style={{ fontSize: '11px', color: '#d8f3dc', fontWeight: 'normal' }}>সঠিক গভীরতায় বপন করুন</span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                backgroundColor: '#ffffff',
                fontSize: '12px',
                textAlign: 'center',
              }}
            >
              <div style={{ padding: '10px', borderRight: '1px solid #e2e8f0' }}>
                <span style={{ display: 'block', fontWeight: 'bold', color: '#333333' }}>বড় বীজ</span>
                <span style={{ color: '#1b4332', fontWeight: 'bold' }}>১ ইঞ্চি গভীরে</span>
              </div>
              <div style={{ padding: '10px', borderRight: '1px solid #e2e8f0' }}>
                <span style={{ display: 'block', fontWeight: 'bold', color: '#333333' }}>মাঝারি বীজ</span>
                <span style={{ color: '#1b4332', fontWeight: 'bold' }}>আধা ইঞ্চি গভীরে</span>
              </div>
              <div style={{ padding: '10px', borderRight: '1px solid #e2e8f0' }}>
                <span style={{ display: 'block', fontWeight: 'bold', color: '#333333' }}>ছোট বীজ</span>
                <span style={{ color: '#1b4332', fontWeight: 'bold' }}>মাটির ঠিক নিচে</span>
              </div>
              <div style={{ padding: '10px' }}>
                <span style={{ display: 'block', fontWeight: 'bold', color: '#333333' }}>গুঁড়ো বীজ</span>
                <span style={{ color: '#1b4332', fontWeight: 'bold' }}>মাটির একদম ওপরে</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 4: CARE & Q&A ================= */}
        <section
          style={{
            marginBottom: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e2e8f0',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#1b4332',
              fontWeight: 'bold',
              fontSize: '18px',
              marginBottom: '14px',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '10px',
            }}
          >
            <HelpCircle size={20} color="#2d6a4f" />
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1b4332' }}>পরিচর্যা ও সাধারণ সমস্যার সমাধান (Care & Q&A)</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '12px' }}>
            {/* First 7 Days */}
            <div
              style={{
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#fffbeb',
                border: '1px solid #fde68a',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', color: '#78350f', marginBottom: '4px' }}>
                <Sun size={16} color="#d97706" />
                <span>প্রথম ৭ দিনের বিশেষ যত্ন:</span>
              </div>
              <p style={{ color: '#333333', margin: 0, lineHeight: '1.5' }}>
                মাটি যেন একেবারে শুকিয়ে খটখটে না হয়, আবার কাদার মতো ভিজেও না থাকে। সকালের মিষ্টি রোদে রাখুন।
              </p>
            </div>

            {/* Watering Rules */}
            <div
              style={{
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '4px' }}>
                <Droplets size={16} color="#2563eb" />
                <span>পানি দেওয়ার স্বর্ণালী নিয়ম:</span>
              </div>
              <p style={{ color: '#333333', margin: 0, lineHeight: '1.5' }}>
                অতিরিক্ত পানি গাছের সবচেয়ে বড় শত্রু। মাটি ভেজা থাকলে পানি দেবেন না। কড়া দুপুরে কখনোই পানি দেবেন না।
              </p>
            </div>
          </div>

          {/* Common Issues */}
          <div style={{ fontSize: '12px' }}>
            <h4 style={{ fontWeight: 'bold', color: '#333333', margin: '0 0 6px 0' }}>সাধারণ সমস্যা ও সমাধান:</h4>
            
            <div
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <span style={{ color: '#dc2626', fontWeight: 'bold' }}>✕</span>
              <div>
                <strong style={{ color: '#333333' }}>বীজ পচে যাওয়া:</strong>
                <span style={{ color: '#555555', marginLeft: '4px' }}>অতিরিক্ত পানি দিয়ে বীজ পচিয়ে ফেলা।</span>
              </div>
            </div>

            <div
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <span style={{ color: '#dc2626', fontWeight: 'bold' }}>✕</span>
              <div>
                <strong style={{ color: '#333333' }}>ফুল না আসা:</strong>
                <span style={{ color: '#555555', marginLeft: '4px' }}>
                  অতিরিক্ত নাইট্রোজেন সার দিলে শুধু পাতা বাড়ে। সরিষার খৈল বা কলার খোসা ভেজানো পানি দিন।
                </span>
              </div>
            </div>

            <div
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              <span style={{ color: '#dc2626', fontWeight: 'bold' }}>✕</span>
              <div>
                <strong style={{ color: '#333333' }}>পর্তুলিকার বীজ গজাচ্ছে না:</strong>
                <span style={{ color: '#555555', marginLeft: '4px' }}>মাটির গভীরে দিলে গজায় না, একদম ওপরে ছড়িয়ে দিন।</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER / CONTACT ================= */}
        <footer
          style={{
            backgroundColor: '#1b4332',
            color: '#ffffff',
            padding: '16px',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid #2d6a4f',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} color="#ffd700" />
            <span style={{ fontWeight: 600, color: '#d8f3dc' }}>Green Agri BD • ছাদবাগানের নির্ভরযোগ্য সাথী</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#ffd700', fontWeight: 'bold' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={14} color="#ffd700" />
              <span>হটলাইন | WhatsApp: 01401068108</span>
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Globe size={14} color="#ffd700" />
              <span>ওয়েবসাইট: greenagri.xyz</span>
            </span>
          </div>
        </footer>
      </div>
    );
  }
);

DynamicPlantingGuide.displayName = 'DynamicPlantingGuide';
