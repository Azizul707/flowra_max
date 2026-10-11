'use client';

import dynamic from 'next/dynamic';

const ChatWidgetDynamic = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
});

export function ChatWidgetWrapper() {
  return <ChatWidgetDynamic />;
}

export default ChatWidgetWrapper;
