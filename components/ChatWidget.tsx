'use client';

import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import {
  MessageCircle,
  X,
  Send,
  Image as ImageIcon,
  Loader2,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { sendChatMessage } from '@/actions/chatAction';

interface ChatMessage {
  id: string;
  sender?: 'user' | 'bot' | 'assistant';
  role?: 'user' | 'bot' | 'assistant';
  text?: string;
  content?: string;
  image?: string;
  timestamp: string;
  isError?: boolean;
}

/**
 * Preprocesses markdown text from n8n / AI responses to ensure
 * clean parsing without loose asterisks or mangled formatting.
 */
function cleanAndFormatMarkdown(rawText: string): string {
  if (!rawText) return '';

  let text = rawText;

  // 1. Normalize line endings
  text = text.replace(/\r\n/g, '\n');

  // 2. Fix asterisk bullet points missing a space: e.g. "*বীজ" -> "* বীজ" or "•বীজ" -> "* বীজ"
  text = text.replace(/^([*•-])([^\s*•-])/gm, '$1 $2');

  // 3. Separate inline bullet points onto their own lines (e.g. "পয়েন্ট:* বীজ ১ * বীজ ২")
  text = text.replace(/([^\n])\s+[*•]\s+/g, '$1\n* ');

  // 4. Ensure an empty line precedes lists for CommonMark compatibility
  text = text.replace(/([^\n])\n([*•-]\s)/g, '$1\n\n$2');
  text = text.replace(/([^\n])\n([0-9১-৯]+\.\s*)/g, '$1\n\n$2');

  // 5. Convert Bengali digit lists (e.g. "১. বীজ", "২. মাটি") to standard markdown list format
  text = text.replace(/^([১-৯]+)\.\s*/gm, (match, digits) => {
    const bnToEn: Record<string, string> = {
      '১': '1',
      '২': '2',
      '৩': '3',
      '৪': '4',
      '৫': '5',
      '৬': '6',
      '৭': '7',
      '৮': '8',
      '৯': '9',
      '০': '0',
    };
    const ascii = digits.split('').map((d: string) => bnToEn[d] || d).join('');
    return `${ascii}. `;
  });

  // 6. Fix spaces inside bold markers like "** টেক্সট **" -> "**টেক্সট**"
  text = text.replace(/\*\*\s+([^*]+?)\s+\*\*/g, '**$1**');

  return text.trim();
}

// Custom Markdown components for clean styling
const MarkdownComponents = {
  p: ({ children }: any) => (
    <p className="mb-2 last:mb-0 leading-relaxed text-stone-800">{children}</p>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-stone-900">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic text-stone-700">{children}</em>
  ),
  ul: ({ children }: any) => (
    <ul className="my-2 pl-4 space-y-1.5 list-disc list-outside marker:text-[#2D6A4F]">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="my-2 pl-5 space-y-1.5 list-decimal [list-style-type:bengali] list-outside marker:font-semibold marker:text-[#2D6A4F]">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="pl-1 leading-relaxed text-stone-800">{children}</li>
  ),
  h1: ({ children }: any) => (
    <h1 className="text-base font-bold text-stone-900 my-2">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-sm font-bold text-[#1B4332] my-1.5">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-sm font-semibold text-stone-900 my-1">{children}</h3>
  ),
  a: ({ href, children }: any) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#2D6A4F] font-medium underline underline-offset-2 hover:text-[#1B4332] transition-colors"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-3 border-[#2D6A4F] pl-3 py-1 my-2 italic text-stone-700 bg-stone-50 rounded-r">
      {children}
    </blockquote>
  ),
  code: ({ children }: any) => (
    <code className="bg-stone-100 text-[#1B4332] text-xs px-1.5 py-0.5 rounded font-mono border border-stone-200">
      {children}
    </code>
  ),
  hr: () => <hr className="my-2.5 border-stone-200" />,
};

const QUICK_PROMPTS = [
  'কী কী প্যাকেজ রয়েছে ও মূল্য কত?',
  'ডেলিভারি চার্জ ও সময় কত?',
  'কম্বো প্যাকে কী কী বীজ আছে?',
  'এগুলা কি বারোমাসি চাষ করা যাবে?',
];

function createMessageId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now()}`;
}

function getFormattedTime(): string {
  try {
    return new Date().toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'bot',
    role: 'bot',
    text: 'আসসালামু আলাইকুম! গ্রীন এগ্রি বিডি-তে আপনাকে স্বাগতম। 🌱\n\nফুলের বীজ রোপণ, যত্ন, কম্বো প্যাক বা ডেলিভারি সংক্রান্ত যেকোনো প্রশ্ন থাকলে আমাকে জিজ্ঞেস করতে পারেন!',
    content: 'আসসালামু আলাইকুম! গ্রীন এগ্রি বিডি-তে আপনাকে স্বাগতম। 🌱\n\nফুলের বীজ রোপণ, যত্ন, কম্বো প্যাক বা ডেলিভারি সংক্রান্ত যেকোনো প্রশ্ন থাকলে আমাকে জিজ্ঞেস করতে পারেন!',
    timestamp: 'এখনই',
  },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const sessionIdRef = useRef<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize Session ID in ref (avoids cascading render warnings)
  useEffect(() => {
    try {
      let currentSession = localStorage.getItem('green_agri_chat_session_id');
      if (!currentSession) {
        currentSession =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `sess_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('green_agri_chat_session_id', currentSession);
      }
      sessionIdRef.current = currentSession;
    } catch {
      sessionIdRef.current = `sess_${Math.random().toString(36).substring(2, 9)}`;
    }
  }, []);

  // Scroll to bottom when messages or loading state change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Handle image attachment
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('অনুগ্রহ করে শুধুমাত্র ছবি ফাইল আপলোড করুন।');
      return;
    }

    // Limit to 5MB before compression
    if (file.size > 5 * 1024 * 1024) {
      alert('ছবির সাইজ সর্বোচ্চ ৫MB হতে পারবে।');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      resizeImage(dataUrl, (resized) => {
        setSelectedImage(resized);
      });
    };
    reader.readAsDataURL(file);

    e.target.value = '';
  };

  // Helper to resize image client-side to keep under ~800px max dimension
  const resizeImage = (src: string, callback: (result: string) => void) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 800;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg', 0.85));
      } else {
        callback(src);
      }
    };
    img.onerror = () => callback(src);
    img.src = src;
  };

  // Send message handler
  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText ?? inputValue).trim();
    const imageToSend = selectedImage;

    if ((!textToSend && !imageToSend) || isLoading) return;

    const timeStr = getFormattedTime();

    const userMsg: ChatMessage = {
      id: createMessageId('usr'),
      sender: 'user',
      role: 'user',
      text: textToSend,
      content: textToSend,
      image: imageToSend || undefined,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const sid =
        sessionIdRef.current ||
        (typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : 'default-session');

      const res = await sendChatMessage({
        message: textToSend,
        image: imageToSend || undefined,
        sessionId: sid,
      });

      const replyTime = getFormattedTime();

      if (res.success) {
        const botReply =
          res.reply ||
          res.output ||
          'দুঃখিত, আমি বুঝতে পারিনি। দয়া করে আবার বলুন।';

        setMessages((prev) => [
          ...prev,
          {
            id: createMessageId('bot'),
            sender: 'bot',
            role: 'bot',
            text: botReply,
            content: botReply,
            timestamp: replyTime,
          },
        ]);
        if (!isOpen) {
          setHasUnread(true);
        }
        // Smooth scroll to bottom when message arrives
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        const errorText =
          res.error ||
          'দুঃখিত, কোনো সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
        setMessages((prev) => [
          ...prev,
          {
            id: createMessageId('err'),
            sender: 'bot',
            role: 'bot',
            text: errorText,
            content: errorText,
            timestamp: replyTime,
            isError: true,
          },
        ]);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    } catch {
      const errText = 'সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।';
      setMessages((prev) => [
        ...prev,
        {
          id: createMessageId('err'),
          sender: 'bot',
          role: 'bot',
          text: errText,
          content: errText,
          timestamp: getFormattedTime(),
          isError: true,
        },
      ]);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) setHasUnread(false);
      return next;
    });
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    setSelectedImage(null);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-5 sm:bottom-6 sm:right-6 z-50 flex items-end flex-col select-none">
        {/* Subtle tooltip when closed */}
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              setHasUnread(false);
            }}
            className="hidden sm:inline-flex items-center gap-2 mb-2 px-3 py-1.5 bg-white text-stone-700 text-xs font-medium rounded-full shadow-md border border-stone-200/80 hover:bg-stone-50 transition-all animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>AI বাগান বিশেষজ্ঞের সাথে কথা বলুন</span>
          </button>
        )}

        <button
          onClick={toggleOpen}
          aria-label={isOpen ? 'চ্যাট বন্ধ করুন' : 'AI সহকারীর সাথে চ্যাট করুন'}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#52B788]/40 ${
            isOpen
              ? 'bg-stone-800 text-white rotate-90 scale-95'
              : 'bg-gradient-to-tr from-[#1B4332] to-[#2D6A4F] text-white hover:scale-105 active:scale-95 shadow-[#1B4332]/40'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 fill-white/20" />
              {/* Online Dot */}
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52B788] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#52B788] border-2 border-white"></span>
              </span>

              {/* Unread badge */}
              {hasUnread && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  1
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="গ্রিন এগ্রি সাপোর্ট"
          className="fixed bottom-20 right-3 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[380px] h-[520px] max-h-[75vh] sm:max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-stone-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header - Minimalist, Modern, and Compact */}
          <div className="bg-gradient-to-r from-[#1B4332] via-[#245741] to-[#2D6A4F] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between shrink-0 shadow-sm border-b border-emerald-950/20">
            {/* Branding: Avatar + Title + Online Status Dot */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative flex items-center justify-center shrink-0">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-100/50 shadow-xs bg-white flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt="GreenAgri"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 min-w-0">
                <h3 className="font-semibold text-white text-sm sm:text-base leading-tight truncate">
                  গ্রিন এগ্রি সাপোর্ট
                </h3>
                <span
                  className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse inline-block shrink-0 shadow-sm shadow-emerald-400/50"
                  title="সক্রিয়"
                />
              </div>
            </div>

            {/* Actions: Clear Chat & Close */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-colors"
                title="চ্যাট হিস্ট্রি মুছুন"
                aria-label="চ্যাট হিস্ট্রি মুছুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/15 rounded-lg text-white/80 hover:text-white transition-colors"
                title="চ্যাট বন্ধ করুন"
                aria-label="চ্যাট বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF8F5]/60 text-sm">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user' || msg.role === 'user';
              const messageText = msg.content || msg.text || '';
              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    isUser ? 'justify-end' : 'justify-start items-start gap-2'
                  }`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-100 shadow-xs shrink-0 mt-0.5 bg-white flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/logo.png"
                        alt="GreenAgri"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div
                    className={`flex flex-col ${
                      isUser ? 'items-end' : 'items-start'
                    } max-w-[85%]`}
                  >
                    <div
                      className={`w-full rounded-2xl px-3.5 py-2.5 shadow-xs leading-relaxed ${
                        isUser
                          ? 'bg-[#1B4332] text-white rounded-br-xs whitespace-pre-wrap'
                          : msg.isError
                          ? 'bg-red-50 text-red-700 border border-red-200 rounded-bl-xs whitespace-pre-wrap'
                          : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs'
                      }`}
                    >
                      {/* Attached Image inside message */}
                      {msg.image && (
                        <div className="mb-2 overflow-hidden rounded-lg border border-white/20">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={msg.image}
                            alt="সংযুক্ত ছবি"
                            className="max-h-48 w-full object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {isUser || msg.isError ? (
                        <p>{messageText}</p>
                      ) : (
                        <div className="chat-markdown text-sm leading-relaxed">
                          <Markdown components={MarkdownComponents}>
                            {cleanAndFormatMarkdown(messageText)}
                          </Markdown>
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] text-stone-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Quick Prompt Chips (show only if conversation just started) */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2">
                <p className="text-xs text-stone-500 font-medium mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#2D6A4F]" />
                  সচরাচর জিজ্ঞাসিত প্রশ্ন:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="text-xs bg-white text-stone-700 hover:text-[#1B4332] hover:bg-[#E8F5E9] hover:border-[#52B788] border border-stone-200/90 px-2.5 py-1.5 rounded-lg transition-colors text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-100 shadow-xs shrink-0 mt-0.5 bg-white flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt="GreenAgri"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white border border-stone-200/80 rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#52B788] animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#52B788] animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#52B788] animate-bounce"></span>
                  <span className="text-xs text-gray-500 font-medium ml-1.5">
                    Typing...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Image Preview before sending */}
          {selectedImage && (
            <div className="px-3 py-2 bg-stone-100 border-t border-stone-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage}
                  alt="Selected preview"
                  className="w-12 h-12 object-cover rounded-md border border-stone-300"
                />
                <span className="text-xs text-stone-600">ছবি সংযুক্ত হয়েছে</span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 text-stone-500 hover:text-red-600 transition-colors"
                title="ছবি বাতিল করুন"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-stone-200 shrink-0">
            <div className="flex items-end gap-1.5 bg-stone-50 rounded-xl border border-stone-300/80 p-1.5 focus-within:border-[#2D6A4F] focus-within:ring-2 focus-within:ring-[#52B788]/20 transition-all">
              {/* Image upload trigger */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="p-2 text-stone-500 hover:text-[#1B4332] hover:bg-stone-200/60 rounded-lg transition-colors shrink-0 disabled:opacity-50"
                title="গাছ বা বীজের ছবি যুক্ত করুন"
              >
                <ImageIcon className="w-5 h-5" />
              </button>

              {/* Text Area */}
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="আপনার প্রশ্ন লিখুন..."
                disabled={isLoading}
                rows={1}
                className="flex-1 bg-transparent border-0 resize-none text-stone-800 placeholder-stone-400 text-sm focus:outline-none focus:ring-0 max-h-24 py-1.5 px-1 leading-relaxed"
              />

              {/* Send Button */}
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={(!inputValue.trim() && !selectedImage) || isLoading}
                className="p-2 bg-[#1B4332] hover:bg-[#2D6A4F] disabled:bg-stone-300 text-white rounded-lg transition-all shrink-0 active:scale-95 disabled:active:scale-100 disabled:cursor-not-allowed"
                title="বার্তা পাঠান"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-stone-400">
              <span>Enter চেপে পাঠান, Shift+Enter নতুন লাইন</span>
              <span>গ্রীন এগ্রি বিডি</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatWidget;
