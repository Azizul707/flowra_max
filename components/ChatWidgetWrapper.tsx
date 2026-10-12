'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ChatWidgetDynamic = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
});

export function ChatWidgetWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // If already scheduled/loaded, skip
    if (shouldLoad) return;

    // Trigger on first user interaction so it doesn't block initial FCP/LCP
    const handleInteraction = () => {
      setShouldLoad(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
    window.addEventListener('mousemove', handleInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });
    window.addEventListener('click', handleInteraction, { passive: true, once: true });
    window.addEventListener('keydown', handleInteraction, { passive: true, once: true });

    // Safe fallback timeout: 2 seconds max, guaranteeing widget appears even if idle
    const timer = setTimeout(() => {
      setShouldLoad(true);
      cleanup();
    }, 2000);

    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, [shouldLoad]);

  if (!shouldLoad) {
    return null;
  }

  return <ChatWidgetDynamic />;
}

export default ChatWidgetWrapper;

