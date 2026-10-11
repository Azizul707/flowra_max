'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitOrder } from '@/actions/orderAction';
import { sendPurchaseEvent } from '@/actions/metaCapi';
import { BANGLADESH_DISTRICTS } from '@/lib/districts';
import { 
  ShoppingBag, 
  Lock, 
  AlertCircle, 
  Loader2, 
  Check, 
  Truck, 
  MapPin, 
  User, 
  Phone as PhoneIcon, 
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';

// 1. Zod Schema Validation with required district
export const checkoutSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'আপনার নাম লিখুন' }),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, { message: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন' }),
  district: z
    .string()
    .min(1, { message: 'অনুগ্রহ করে আপনার জেলা নির্বাচন করুন' }),
  address: z
    .string()
    .min(10, { message: 'সম্পূর্ণ ঠিকানা লিখুন (কমপক্ষে ১০ অক্ষর)' }),
  package: z
    .enum(['Pack 1', 'Pack 2', 'Pack 3']),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Pricing Configuration
interface PackConfig {
  id: 'Pack 1' | 'Pack 2' | 'Pack 3';
  legacyId: string;
  name: string;
  title: string;
  subtitle: string;
  basePrice: number;
  delivery: {
    'Inside Dhaka': number;
    'Outside Dhaka': number;
  };
  badge?: string;
  isPopular?: boolean;
}

const PACKAGES: Record<'Pack 1' | 'Pack 2' | 'Pack 3', PackConfig> = {
  'Pack 1': {
    id: 'Pack 1',
    legacyId: 'single',
    name: 'Pack 1 (Trial Pack)',
    title: '১ প্যাক (ট্রায়াল প্যাক)',
    subtitle: '১০টি জাতের ১০ প্যাকেট বীজ',
    basePrice: 280,
    delivery: {
      'Inside Dhaka': 80,
      'Outside Dhaka': 120,
    },
  },
  'Pack 2': {
    id: 'Pack 2',
    legacyId: 'double',
    name: 'Pack 2 (Double Combo)',
    title: '২ প্যাক (ডাবল কম্বো)',
    subtitle: 'একই ১০ জাতের ২০ প্যাকেট • ফ্রি ডেলিভারি',
    basePrice: 499,
    delivery: {
      'Inside Dhaka': 0,
      'Outside Dhaka': 0,
    },
    badge: 'সবচেয়ে জনপ্রিয়',
    isPopular: true,
  },
  'Pack 3': {
    id: 'Pack 3',
    legacyId: 'triple',
    name: 'Pack 3 (Mega Combo)',
    title: '৩ প্যাক (মেগা কম্বো)',
    subtitle: '১০ জাতের ৩০ প্যাকেট • ফ্রি ডেলিভারি',
    basePrice: 650,
    delivery: {
      'Inside Dhaka': 0,
      'Outside Dhaka': 0,
    },
    badge: 'মেগা সেভার',
  },
};

export const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      phone: '',
      district: 'Dhaka',
      address: '',
      package: 'Pack 2',
    },
    mode: 'onTouched',
  });

  const selectedPackage = useWatch({ control, name: 'package', defaultValue: 'Pack 2' });
  const selectedDistrict = useWatch({ control, name: 'district', defaultValue: 'Dhaka' });

  // Synchronize package selection with external events (e.g. from Pricing section)
  useEffect(() => {
    const handlePackageSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const val = customEvent.detail;
      if (val === 'single' || val === 'Pack 1' || val === 'pack1') {
        setValue('package', 'Pack 1', { shouldValidate: true });
      } else if (val === 'double' || val === 'Pack 2' || val === 'pack2') {
        setValue('package', 'Pack 2', { shouldValidate: true });
      } else if (val === 'triple' || val === 'Pack 3' || val === 'pack3') {
        setValue('package', 'Pack 3', { shouldValidate: true });
      }
    };

    window.addEventListener('select-package', handlePackageSelect);
    return () => window.removeEventListener('select-package', handlePackageSelect);
  }, [setValue]);

  // Dynamic Pricing Calculation:
  // Inside Dhaka if district === 'Dhaka' (80 BDT for Pack 1), Outside Dhaka otherwise (120 BDT for Pack 1).
  // Pack 2 and Pack 3 are 0 BDT delivery everywhere.
  const isInsideDhaka = selectedDistrict === 'Dhaka';
  const deliveryZoneString = isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka';

  const currentPack = PACKAGES[selectedPackage] || PACKAGES['Pack 2'];
  const basePrice = currentPack.basePrice;
  const deliveryCharge = isInsideDhaka ? currentPack.delivery['Inside Dhaka'] : currentPack.delivery['Outside Dhaka'];
  const totalPrice = basePrice + deliveryCharge;

  // Find district label for nice display
  const currentDistrictObj = BANGLADESH_DISTRICTS.find((d) => d.id === selectedDistrict);
  const districtDisplayName = currentDistrictObj ? currentDistrictObj.nameBn : selectedDistrict;

  // Helper to extract cookies by name
  const getCookie = (name: string): string => {
    if (typeof document === 'undefined') return '';
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return match ? decodeURIComponent(match[3]) : '';
  };

  // Form Submission Handler connecting to Supabase via Server Action and Meta Tracking
  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Compute delivery zone for database strictly as 'Inside Dhaka' or 'Outside Dhaka'
    const computedDeliveryZone = data.district === 'Dhaka' ? 'Inside Dhaka' : 'Outside Dhaka';

    // Store complete address including selected district for logistics clarity
    const selectedDistrictData = BANGLADESH_DISTRICTS.find((d) => d.id === data.district);
    const districtLabel = selectedDistrictData ? selectedDistrictData.nameBn : data.district;
    const combinedAddress = `[জেলা: ${districtLabel}] ${data.address.trim()}`;

    const orderData = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      address: combinedAddress,
      package_name: data.package,
      delivery_zone: computedDeliveryZone,
      total_price: totalPrice,
    };

    console.log('Submitting Order via Server Action:', orderData);

    try {
      const response = await submitOrder(orderData);

      if (response.success) {
        // --- Sprint 4: Meta Browser Pixel & CAPI Deduplication ---
        try {
          // 1. Generate unique Event ID for deduplication across Pixel and CAPI
          const eventId = crypto.randomUUID();

          // 2. Extract _fbp and _fbc cookies
          const fbp = getCookie('_fbp');
          const fbc = getCookie('_fbc');
          const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';

          // 3. Fire Browser Pixel 'Purchase' event with eventID
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq(
              'track',
              'Purchase',
              {
                value: totalPrice,
                currency: 'BDT',
                content_name: currentPack.title,
                content_type: 'product',
              },
              { eventID: eventId }
            );
            console.log('[Meta Pixel] Fired Purchase event with eventID:', eventId);
          }

          // 4. Fire CAPI Server Action with verified orderId, orderToken, and same eventId
          await sendPurchaseEvent(
            {
              orderId: response.data?.id,
              orderToken: response.data?.orderToken,
              name: data.name.trim(),
              phone: data.phone.trim(),
              total_price: totalPrice,
              package_name: currentPack.title,
              delivery_zone: computedDeliveryZone,
              currency: 'BDT',
            },
            eventId,
            {
              userAgent,
              fbp: fbp || undefined,
              fbc: fbc || undefined,
            }
          ).catch((capiErr) => {
            console.warn('[Meta CAPI] Dispatch error (non-fatal):', capiErr);
          });
        } catch (trackingErr) {
          console.warn('[Meta Tracking] Non-fatal tracking error:', trackingErr);
        }

        // Redirect to /success with relevant query parameters
        const params = new URLSearchParams({
          name: data.name.trim(),
          pack: currentPack.legacyId,
          packageTitle: currentPack.title,
          total: String(totalPrice),
          zone: computedDeliveryZone,
          district: data.district,
        });

        router.push(`/success?${params.toString()}`);
      } else {
        console.error('Order submission error from Supabase:', response.error);
        setSubmitError(
          response.error || 'অর্ডারটি সিস্টেমে সংরক্ষণ করা যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।'
        );
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error('Unexpected error during checkout submission:', err);
      setSubmitError(
        err?.message || 'সংযোগজনিত কোনো ত্রুটি ঘটেছে। আপনার ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* 1. Package Selection Cards */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs sm:text-sm font-bold text-[#1b1c1a] font-sans-bengali flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#006c48]" />
            <span>প্যাকেজ নির্বাচন করুন:</span>
          </label>
          <span className="text-[11px] text-stone-500 font-sans-bengali">
            (ক্যাশ অন ডেলিভারি)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.keys(PACKAGES) as Array<'Pack 1' | 'Pack 2' | 'Pack 3'>).map((key) => {
            const pack = PACKAGES[key];
            const isSelected = selectedPackage === key;
            const isDouble = key === 'Pack 2';

            return (
              <label
                key={key}
                onClick={() => setValue('package', key, { shouldValidate: true })}
                className={`relative cursor-pointer rounded-xl p-3.5 border text-left transition-all flex flex-col justify-between select-none ${
                  isSelected
                    ? 'border-[#006c48] bg-[#d8f3dc]/35 ring-2 ring-[#006c48]/30 shadow-sm'
                    : 'border-[#e3dfd5] bg-white hover:border-stone-400 hover:bg-stone-50/50'
                }`}
              >
                <input
                  type="radio"
                  value={key}
                  {...register('package')}
                  className="sr-only"
                />

                {/* Popular / Saver Badge */}
                {pack.badge && (
                  <div
                    className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap font-sans-bengali ${
                      isDouble ? 'bg-[#006c48]' : 'bg-[#1b4332]'
                    }`}
                  >
                    {pack.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs sm:text-sm font-bold text-[#1b1c1a] font-sans-bengali pt-0.5">
                      {pack.title}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'border-[#006c48] bg-[#006c48] text-white'
                          : 'border-stone-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>
                  <span className="text-[11px] text-stone-500 block font-sans-bengali mt-1">
                    {pack.subtitle}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-stone-600 font-sans-bengali">
                    মূল্য:
                  </span>
                  <span className="text-sm font-bold text-[#1b4332] font-serif-bengali">
                    ৳{pack.basePrice}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Customer Information (Name, Phone, District, Address) */}
      <div className="space-y-4 pt-1">
        {/* Full Name */}
        <div>
          <label 
            htmlFor="name" 
            className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1.5 font-sans-bengali flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-stone-500" />
            <span>আপনার নাম <span className="text-red-500">*</span></span>
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            placeholder="যেমন: মো: আরিফুল ইসলাম"
            className={`w-full px-3.5 py-2.5 text-base sm:text-sm rounded-lg border font-sans-bengali transition-colors outline-none ${
              errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20'
                : 'border-[#e3dfd5] bg-white focus:border-[#006c48] focus:ring-1 focus:ring-[#006c48]'
            }`}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600 font-sans-bengali flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.name.message}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label 
            htmlFor="phone" 
            className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1.5 font-sans-bengali flex items-center gap-1.5"
          >
            <PhoneIcon className="w-3.5 h-3.5 text-stone-500" />
            <span>মোবাইল নম্বর <span className="text-red-500">*</span></span>
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            {...register('phone')}
            placeholder="যেমন: 017XXXXXXXX বা 019XXXXXXXX"
            className={`w-full px-3.5 py-2.5 text-base sm:text-sm rounded-lg border font-sans-bengali transition-colors outline-none ${
              errors.phone
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20'
                : 'border-[#e3dfd5] bg-white focus:border-[#006c48] focus:ring-1 focus:ring-[#006c48]'
            }`}
          />
          {errors.phone ? (
            <p className="mt-1.5 text-xs text-red-600 font-sans-bengali flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.phone.message}</span>
            </p>
          ) : (
            <p className="mt-1 text-[11px] text-stone-500 font-sans-bengali">
              ১১ ডিজিটের সচল নম্বর দিন (অর্ডার কনফার্মেশনের জন্য)
            </p>
          )}
        </div>

        {/* District Dropdown (Automated Delivery Fee Calculation) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label 
              htmlFor="district" 
              className="text-xs sm:text-sm font-semibold text-stone-800 font-sans-bengali flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-stone-500" />
              <span>জেলা নির্বাচন করুন <span className="text-red-500">*</span></span>
            </label>
            <span className="text-[11px] font-sans-bengali font-medium text-[#006c48] bg-[#d8f3dc]/60 px-2 py-0.5 rounded-md">
              {isInsideDhaka ? 'ঢাকার ভেতরে (৳৮০ চার্জ)' : 'ঢাকার বাইরে (৳১২০ চার্জ)'}
            </span>
          </div>

          <div className="relative">
            <select
              id="district"
              {...register('district')}
              className={`w-full px-3.5 py-2.5 text-base sm:text-sm rounded-lg border font-sans-bengali transition-colors outline-none bg-white cursor-pointer appearance-none ${
                errors.district
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20'
                  : 'border-[#e3dfd5] focus:border-[#006c48] focus:ring-1 focus:ring-[#006c48]'
              }`}
            >
              <option value="" disabled>
                -- আপনার জেলা বাছাই করুন --
              </option>
              {BANGLADESH_DISTRICTS.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {dist.nameBn} {dist.id === 'Dhaka' ? '★ (ঢাকার ভেতরে)' : ''}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {errors.district && (
            <p className="mt-1.5 text-xs text-red-600 font-sans-bengali flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.district.message}</span>
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <label 
            htmlFor="address" 
            className="block text-xs sm:text-sm font-semibold text-stone-800 mb-1.5 font-sans-bengali flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-stone-500" />
            <span>সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span></span>
          </label>
          <textarea
            id="address"
            rows={2}
            {...register('address')}
            placeholder="যেমন: বাসা # ১২, রোড # ৪, থানা/উপজেলা, এলাকা (কমপক্ষে ১০ অক্ষর)"
            className={`w-full px-3.5 py-2.5 text-base sm:text-sm rounded-lg border font-sans-bengali transition-colors outline-none resize-none ${
              errors.address
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20'
                : 'border-[#e3dfd5] bg-white focus:border-[#006c48] focus:ring-1 focus:ring-[#006c48]'
            }`}
          />
          {errors.address && (
            <p className="mt-1.5 text-xs text-red-600 font-sans-bengali flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.address.message}</span>
            </p>
          )}
        </div>
      </div>

      {/* 3. Automatic Delivery Status Information Box (Minimalist Status) */}
      <div className="py-2.5 px-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between gap-3 text-xs font-sans-bengali">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#006c48] text-white flex items-center justify-center shrink-0">
            <Truck className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium text-stone-700">ডেলিভারি স্ট্যাটাস:</span>
        </div>

        <div className="shrink-0 font-bold">
          {deliveryCharge === 0 ? (
            <span className="text-[#006c48] bg-white px-2.5 py-1 rounded-md border border-emerald-300 shadow-xs">
              ফ্রি ডেলিভারি
            </span>
          ) : (
            <span className="text-stone-800 bg-white px-2.5 py-1 rounded-md border border-stone-200">
              ডেলিভারি চার্জ: ৳{deliveryCharge === 80 ? '৮০' : '১২০'}
            </span>
          )}
        </div>
      </div>

      {/* 4. Dynamic Pricing Calculation Breakdown */}
      <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#e3dfd5] space-y-2 text-xs font-sans-bengali">
        <div className="flex justify-between items-center text-stone-600">
          <span>নির্বাচিত প্যাকেজ ({currentPack.title}):</span>
          <span className="font-semibold text-stone-800 font-serif-bengali text-sm">
            ৳{basePrice}
          </span>
        </div>
        <div className="flex justify-between items-center text-stone-600">
          <span>
            ডেলিভারি চার্জ ({isInsideDhaka ? 'ঢাকার ভেতরে' : 'ঢাকার বাইরে'}):
          </span>
          <span className="font-semibold font-serif-bengali text-sm">
            {deliveryCharge === 0 ? (
              <span className="text-[#006c48] font-bold font-sans-bengali">০৳ (সম্পূর্ণ ফ্রি)</span>
            ) : (
              <span className="text-stone-800">৳{deliveryCharge}</span>
            )}
          </span>
        </div>
        <div className="pt-2.5 border-t border-stone-200 flex justify-between items-baseline text-sm sm:text-base font-bold text-[#1b1c1a]">
          <span className="flex items-center gap-1.5">
            <span>সর্বমোট প্রদেয় মূল্য:</span>
          </span>
          <span className="text-xl sm:text-2xl font-extrabold font-serif-bengali text-[#1b4332]">
            ৳{totalPrice}
          </span>
        </div>
      </div>

      {/* Error Alert Banner */}
      {submitError && (
        <div 
          role="alert" 
          className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs sm:text-sm font-sans-bengali flex items-start justify-between gap-3 shadow-sm transition-all"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-900">অর্ডার প্রক্রিয়ায় সমস্যা হয়েছে</p>
              <p className="mt-1 text-red-700 leading-relaxed">{submitError}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSubmitError(null)}
            className="text-stone-400 hover:text-stone-700 text-xs p-1 -mr-1 -mt-1 rounded-md"
            aria-label="বার্তা বন্ধ করুন"
          >
            ✕
          </button>
        </div>
      )}

      {/* 5. Submit Button */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-4 rounded-xl bg-[#1b4332] text-yellow-400 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 font-sans-bengali transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(26,71,49,0.35)] active:translate-y-0 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
              <span>অর্ডার প্রসেস হচ্ছে...</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5 text-yellow-400" />
              <span>৳{totalPrice} — অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)</span>
            </>
          )}
        </button>

        <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-stone-500 font-sans-bengali text-center">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>১০০% নিরাপদ চেকআউট</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006c48]" />
            <span>প্যাকেট হাতে পেয়ে টাকা দিন</span>
          </span>
        </div>
      </div>
    </form>
  );
};
