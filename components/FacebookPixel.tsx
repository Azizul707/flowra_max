'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

/**
 * FacebookPixel handles client-side route and query-string change PageView tracking
 * for Next.js App Router navigation.
 * 
 * Note: The initial PageView on fresh page load is fired directly by the Meta Pixel
 * initialization script in `MetaPixel.tsx`. This component tracks subsequent client-side
 * navigations without generating duplicate PageView events on initial mount.
 */
export function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Keep track of whether this is the initial component mount
  const isFirstMountRef = useRef<boolean>(true);
  // Keep track of the last tracked URL to prevent duplicate events on non-route rerenders
  const lastTrackedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const searchString = searchParams?.toString();
    const currentUrl = searchString ? `${pathname}?${searchString}` : pathname;

    // On fresh page load / initial mount, MetaPixel.tsx already initialized the pixel
    // and tracked the initial PageView. Record the initial URL and skip to avoid duplicate.
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      lastTrackedUrlRef.current = currentUrl;
      return;
    }

    // Only fire PageView if the route (pathname or searchParams) has actually changed
    if (lastTrackedUrlRef.current === currentUrl) {
      return;
    }

    lastTrackedUrlRef.current = currentUrl;

    const firePageView = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
        return true;
      }
      return false;
    };

    // Fire immediately if fbq is ready; retry once if still loading asynchronously
    if (!firePageView()) {
      const timer = setTimeout(() => {
        firePageView();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  return null;
}

export default FacebookPixel;
