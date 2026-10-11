'use server';

import crypto from 'crypto';
import { headers } from 'next/headers';
import { supabase } from '@/lib/supabase';
import { verifyOrderToken } from '@/actions/orderAction';

interface ReqData {
  userAgent?: string;
  clientIp?: string;
  fbp?: string;
  fbc?: string;
}

export interface PurchaseEventPayload {
  orderId?: string;
  orderToken?: string;
  name?: string;
  phone: string;
  total_price?: number;
  package_name?: string;
  delivery_zone?: string;
  currency?: string;
}

export interface CapiResponse {
  success: boolean;
  eventsReceived?: number;
  error?: string;
  fbtrace_id?: string;
}

/**
 * Standard SHA-256 hash helper for Meta user data normalization.
 * Meta expects normalized (trimmed, lowercase) input before hashing.
 */
function hashSha256(value: string): string {
  const normalized = value.trim().toLowerCase();
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normalize Bangladeshi or international phone numbers for Meta CAPI.
 * E.g., '01712345678' -> '8801712345678' (E.164 without plus or country code standard)
 */
function normalizePhoneNumber(rawPhone: string): string {
  const digitsOnly = rawPhone.replace(/\D/g, '');
  if (digitsOnly.startsWith('880')) {
    return digitsOnly;
  }
  if (digitsOnly.startsWith('0')) {
    return `88${digitsOnly}`;
  }
  return digitsOnly;
}

export async function sendPurchaseEvent(
  orderData: PurchaseEventPayload,
  eventId: string,
  reqData: ReqData = {}
): Promise<CapiResponse> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn(
      '[Meta CAPI] Skipping CAPI event dispatch: NEXT_PUBLIC_META_PIXEL_ID or META_ACCESS_TOKEN is not configured.'
    );
    return {
      success: false,
      error: 'Missing Meta Pixel ID or Access Token in environment variables.',
    };
  }

  if (!eventId || typeof eventId !== 'string') {
    return {
      success: false,
      error: 'Missing or invalid eventId for Purchase event deduplication.',
    };
  }

  try {
    // 1. Authoritative Order Verification against Supabase database
    let verifiedName = orderData.name?.trim() || '';
    let verifiedPhone = orderData.phone?.trim() || '';
    let verifiedPrice = Number(orderData.total_price) || 0;
    let verifiedPackage = orderData.package_name || 'Flower Seeds Combo Pack';

    if (orderData.orderId) {
      // If orderToken is provided, verify signature
      if (orderData.orderToken) {
        const isTokenValid = await verifyOrderToken(
          orderData.orderId,
          orderData.phone,
          orderData.orderToken
        );
        if (!isTokenValid) {
          console.warn('[Meta CAPI] Invalid order verification token for order:', orderData.orderId);
          return {
            success: false,
            error: 'Invalid order verification token.',
          };
        }
      }

      // Query database for authoritative persisted order
      const { data: dbOrder, error: dbErr } = await supabase
        .from('orders')
        .select('id, name, phone, package_name, total_price, status, created_at')
        .eq('id', orderData.orderId)
        .maybeSingle();

      if (dbErr || !dbOrder) {
        console.warn('[Meta CAPI] Order not found in database or query error:', dbErr?.message || orderData.orderId);
        return {
          success: false,
          error: 'Order record not found in database. Cannot dispatch Purchase event for unpersisted order.',
        };
      }

      // Enforce authoritative database values over client-supplied values
      verifiedPrice = Number(dbOrder.total_price);
      verifiedPackage = dbOrder.package_name || verifiedPackage;
      verifiedPhone = dbOrder.phone || verifiedPhone;
      verifiedName = dbOrder.name || verifiedName;
    } else {
      // In case orderId was not provided, ensure at least verified phone is present
      if (!verifiedPhone) {
        return {
          success: false,
          error: 'Missing phone number or order identifier for Purchase event.',
        };
      }
    }

    // 2. Extract Server-Side Headers (Client IP & User-Agent) if available
    let resolvedClientIp = reqData.clientIp;
    let resolvedUserAgent = reqData.userAgent;

    try {
      const headerList = await headers();
      const forwardedFor = headerList.get('x-forwarded-for');
      const realIp = headerList.get('x-real-ip');
      const serverIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp;
      if (serverIp && !resolvedClientIp) {
        resolvedClientIp = serverIp;
      }
      const serverUserAgent = headerList.get('user-agent');
      if (serverUserAgent && !resolvedUserAgent) {
        resolvedUserAgent = serverUserAgent;
      }
    } catch {
      // Outside request context or static fallback
    }

    const normalizedPhone = normalizePhoneNumber(verifiedPhone);
    const hashedPhone = normalizedPhone ? hashSha256(normalizedPhone) : undefined;

    // Optional customer name hashing (fn = first name)
    let hashedFirstName: string | undefined;
    if (verifiedName) {
      const parts = verifiedName.split(/\s+/);
      if (parts[0]) {
        hashedFirstName = hashSha256(parts[0]);
      }
    }

    // 3. Build user_data block conforming to Meta Conversions API specifications
    const userData: Record<string, any> = {};

    if (hashedPhone) {
      userData.ph = [hashedPhone];
    }
    if (hashedFirstName) {
      userData.fn = [hashedFirstName];
    }
    if (resolvedClientIp) {
      userData.client_ip_address = resolvedClientIp;
    }
    if (resolvedUserAgent) {
      userData.client_user_agent = resolvedUserAgent;
    }
    if (reqData.fbp) {
      userData.fbp = reqData.fbp;
    }
    if (reqData.fbc) {
      userData.fbc = reqData.fbc;
    }
    // Country code BD for Bangladesh (Meta expects two-letter country code hashed)
    userData.country = [hashSha256('bd')];

    // 4. Build custom_data block using authoritative verified values
    const customData = {
      currency: 'BDT',
      value: verifiedPrice,
      content_name: verifiedPackage,
      content_type: 'product',
      contents: [
        {
          id: verifiedPackage,
          quantity: 1,
          item_price: verifiedPrice,
        },
      ],
    };

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const eventPayload = {
      event_name: 'Purchase',
      event_time: currentTimestamp,
      event_id: eventId, // Critical for browser Pixel + CAPI deduplication
      event_source_url: typeof process.env.NEXT_PUBLIC_APP_URL === 'string'
        ? `${process.env.NEXT_PUBLIC_APP_URL}/checkout`
        : undefined,
      action_source: 'website',
      user_data: userData,
      custom_data: customData,
    };

    const endpoint = `https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${encodeURIComponent(
      accessToken
    )}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [eventPayload],
      }),
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      console.error('[Meta CAPI] Error response from Facebook Graph API:', result.error || result);
      return {
        success: false,
        error: result.error?.message || 'Failed to dispatch Meta CAPI event.',
        fbtrace_id: result.error?.fbtrace_id,
      };
    }

    console.log('[Meta CAPI] Purchase event sent successfully:', {
      eventId,
      orderId: orderData.orderId,
      eventsReceived: result.events_received,
      fbtrace_id: result.fbtrace_id,
    });

    return {
      success: true,
      eventsReceived: result.events_received,
      fbtrace_id: result.fbtrace_id,
    };
  } catch (error: any) {
    console.error('[Meta CAPI] Unexpected exception sending Purchase event:', error);
    return {
      success: false,
      error: error?.message || 'Internal exception in Meta CAPI server action.',
    };
  }
}
