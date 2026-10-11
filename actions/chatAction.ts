'use server';

const N8N_DEFAULT_WEBHOOK = 'https://n8n.srv1106977.hstgr.cloud/webhook-test/bc6dd186-3686-457e-a99c-8ca230c51abf';

interface SendChatMessageParams {
  message: string;
  image?: string;
  sessionId: string;
}

export interface ChatResponse {
  success: boolean;
  reply?: string;
  output?: string;
  error?: string;
}

export async function sendChatMessage({
  message,
  image,
  sessionId,
}: SendChatMessageParams): Promise<ChatResponse> {
  const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL || N8N_DEFAULT_WEBHOOK;

  if (!message && !image) {
    return { success: false, error: 'মেসেজ অথবা ছবি আবশ্যক।' };
  }

  try {
    const payload = {
      source: 'website',
      sessionId: sessionId || 'default-session',
      message: message || '',
      image: image || null,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for AI response

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.error('n8n webhook error status:', res.status, errText);
      return {
        success: false,
        error: `সার্ভার থেকে ত্রুটি এসেছে (${res.status})। কিছুক্ষণ পর পুনরায় চেষ্টা করুন।`,
      };
    }

    let botReply = '';
    try {
      const cloned = res.clone();
      try {
        const data = await res.json();
        if (Array.isArray(data) && data[0]) {
          const item = data[0];
          if (typeof item === 'string') {
            botReply = item;
          } else if (typeof item === 'object' && item !== null) {
            const rawOutput = item.output || item.reply || item.message || item.text || item.response;
            if (rawOutput !== undefined && rawOutput !== null) {
              botReply = typeof rawOutput === 'string' ? rawOutput : JSON.stringify(rawOutput);
            } else {
              botReply = JSON.stringify(item);
            }
          }
        } else if (typeof data === 'object' && data !== null) {
          const rawOutput = data.output || data.reply || data.message || data.text || data.response;
          if (rawOutput !== undefined && rawOutput !== null) {
            botReply = typeof rawOutput === 'string' ? rawOutput : JSON.stringify(rawOutput);
          } else {
            botReply = JSON.stringify(data);
          }
        } else if (typeof data === 'string') {
          botReply = data;
        }
      } catch {
        botReply = await cloned.text();
      }
    } catch {
      botReply = '';
    }

    const finalReply = (botReply && botReply.trim()) || 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি।';

    return {
      success: true,
      reply: finalReply,
      output: finalReply,
    };
  } catch (err: unknown) {
    console.error('sendChatMessage exception:', err);
    const isTimeout = err instanceof Error && err.name === 'AbortError';
    return {
      success: false,
      error: isTimeout
        ? 'উত্তর পেতে একটু বেশি সময় লাগছে। অনুগ্রহ করে আবার চেষ্টা করুন।'
        : 'মেসেজ পাঠানো সম্ভব হয়নি। ইন্টারনেট সংযোগ পরীক্ষা করে পুনরায় চেষ্টা করুন।',
    };
  }
}
