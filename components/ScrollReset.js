'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    scrollToTop();
    window.addEventListener('beforeunload', scrollToTop);

    return () => {
      window.removeEventListener('beforeunload', scrollToTop);
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, [pathname]);

  return null;
}