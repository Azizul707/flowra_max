'use server';

import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

// Secret key for HMAC signing of verified orders
const ORDER_SIGNING_SECRET =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.META_ACCESS_TOKEN ||
  'green_agri_secure_order_token_salt_2026';

function generateOrderToken(orderId: string, phone: string): string {
  return crypto
    .createHmac('sha256', ORDER_SIGNING_SECRET)
    .update(`${orderId}:${phone.trim()}`)
    .digest('hex');
}

export async function verifyOrderToken(orderId: string, phone: string, token: string): Promise<boolean> {
  if (!orderId || !phone || !token) return false;
  const expected = generateOrderToken(orderId, phone);
  try {
    return crypto.timingSafeEqual(Buffer.from(token, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

export interface OrderInput {
  name: string;
  phone: string;
  address: string;
  package_name: string;
  delivery_zone: string;
  total_price: number;
}

export interface OrderResponse {
  success: boolean;
  error: string | null;
  data?: any;
}

// Strict Pricing Rules: Single source of truth on the server
const PACKAGE_PRICING: Record<string, { basePrice: number; title: string }> = {
  'Pack 1': { basePrice: 280, title: '১ প্যাক (ট্রায়াল প্যাক)' },
  'Pack 2': { basePrice: 499, title: '২ প্যাক (ডাবল কম্বো)' },
  'Pack 3': { basePrice: 650, title: '৩ প্যাক (মেগা কম্বো)' },
};

function calculateOrderPrice(
  packageName: string,
  deliveryZone: string
): { basePrice: number; deliveryCharge: number; totalPrice: number } | null {
  const pack = PACKAGE_PRICING[packageName];
  if (!pack) return null;

  const isInsideDhaka = deliveryZone === 'Inside Dhaka';
  let deliveryCharge = 0;
  if (packageName === 'Pack 1') {
    deliveryCharge = isInsideDhaka ? 80 : 120;
  } else {
    // Pack 2 and Pack 3 have free delivery across Bangladesh
    deliveryCharge = 0;
  }

  return {
    basePrice: pack.basePrice,
    deliveryCharge,
    totalPrice: pack.basePrice + deliveryCharge,
  };
}

// Bangladeshi 11-digit mobile number format regex (e.g. 01712345678, 018..., 019..., 013..., 014..., 015..., 016...)
const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;

export async function submitOrder(formData: any): Promise<OrderResponse> {
  try {
    if (!formData || typeof formData !== 'object') {
      return {
        success: false,
        error: 'অনুগ্রহ করে সঠিক তথ্য প্রদান করুন।',
      };
    }

    const rawName = typeof formData.name === 'string' ? formData.name.trim() : '';
    const rawPhone = typeof formData.phone === 'string' ? formData.phone.trim().replace(/[\s-]/g, '') : '';
    const rawAddress = typeof formData.address === 'string' ? formData.address.trim() : '';
    const rawPackage = typeof (formData.package_name || formData.package) === 'string'
      ? String(formData.package_name || formData.package).trim()
      : '';
    const rawZone = typeof (formData.delivery_zone || formData.deliveryZone) === 'string'
      ? String(formData.delivery_zone || formData.deliveryZone).trim()
      : '';

    // 1. Validate required fields & formats
    if (!rawName || rawName.length < 2) {
      return {
        success: false,
        error: 'আপনার নাম সঠিকভাবে লিখুন (কমপক্ষে ২ অক্ষর)।',
      };
    }

    if (!rawPhone || !BD_PHONE_REGEX.test(rawPhone)) {
      return {
        success: false,
        error: 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)।',
      };
    }

    if (!rawAddress || rawAddress.length < 5) {
      return {
        success: false,
        error: 'সম্পূর্ণ ডেলিভারি ঠিকানা বিস্তারিতভাবে লিখুন।',
      };
    }

    // 2. Validate package selection against allowed list
    if (!Object.prototype.hasOwnProperty.call(PACKAGE_PRICING, rawPackage)) {
      return {
        success: false,
        error: 'অনুগ্রহ করে একটি বৈধ প্যাকেজ নির্বাচন করুন।',
      };
    }

    // 3. Normalize & validate delivery zone
    const normalizedZone = rawZone === 'Inside Dhaka' ? 'Inside Dhaka' : 'Outside Dhaka';

    // 4. Server-side authoritative price calculation (tamper-proof)
    const pricing = calculateOrderPrice(rawPackage, normalizedZone);
    if (!pricing) {
      return {
        success: false,
        error: 'প্যাকেজের মূল্য নির্ধারণে সমস্যা হয়েছে।',
      };
    }

    // 5. Build sanitized payload with only safe permitted database columns
    const payload = {
      name: rawName.slice(0, 100),
      phone: rawPhone,
      address: rawAddress.slice(0, 300),
      package_name: rawPackage,
      delivery_zone: normalizedZone,
      total_price: pricing.totalPrice,
      source: 'website',
    };

    const { data: insertedData, error } = await supabase
      .from('orders')
      .insert([payload])
      .select('id, created_at, status, total_price');

    if (error) {
      console.error('Supabase order insert error:', error.message || error);
      return {
        success: false,
        error: 'অর্ডারটি সিস্টেমে সংরক্ষণ করা যায়নি। অনুগ্রহ করে একটু পর আবার চেষ্টা করুন।',
      };
    }

    const createdOrder = insertedData && insertedData[0] ? insertedData[0] : undefined;

    // Generate secure order verification token so the caller can authenticate the CAPI request
    const orderToken = createdOrder ? generateOrderToken(createdOrder.id, rawPhone) : undefined;

    return {
      success: true,
      error: null,
      data: createdOrder
        ? {
            id: createdOrder.id,
            created_at: createdOrder.created_at,
            total_price: createdOrder.total_price,
            orderToken,
          }
        : undefined,
    };
  } catch (err: any) {
    console.error('Unexpected error in submitOrder server action:', err);
    return {
      success: false,
      error: 'সংযোগজনিত সমস্যা বা অপ্রত্যাশিত কোনো ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
    };
  }
}

export async function getOrders(): Promise<{ success: boolean; data?: any[]; error?: string | null }> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase getOrders error:', error);
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }

    return {
      success: true,
      data: data || [],
      error: null,
    };
  } catch (err: any) {
    console.error('Unexpected error in getOrders:', err);
    return {
      success: false,
      error: err?.message || 'অর্ডার লোড করতে সমস্যা হয়েছে।',
      data: [],
    };
  }
}

export async function updateOrderStatus(orderId: string | number, status: string): Promise<{ success: boolean; error?: string | null }> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      console.error('Supabase updateOrderStatus error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err: any) {
    console.error('Unexpected error in updateOrderStatus:', err);
    return { success: false, error: err?.message || 'স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।' };
  }
}

export async function deleteOrder(orderId: string | number): Promise<{ success: boolean; error?: string | null }> {
  try {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);

    if (error) {
      console.error('Supabase deleteOrder error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err: any) {
    console.error('Unexpected error in deleteOrder:', err);
    return { success: false, error: err?.message || 'অর্ডার মুছতে সমস্যা হয়েছে।' };
  }
}

