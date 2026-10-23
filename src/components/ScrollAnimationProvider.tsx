'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimationProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // If the browser doesn't support IntersectionObserver, reveal everything immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-up, .reveal-text, .reveal-image, .reveal-card, .scroll-reveal, [data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-up, .reveal-text, .reveal-image, .reveal-card, .scroll-reveal, [data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('is-revealed');
          observer.unobserve(el);

          // Once entrance animation finishes, remove reveal classes so native card & button hovers work 100% cleanly
          setTimeout(() => {
            el.classList.add('reveal-complete');
            el.classList.remove('reveal-card', 'reveal-up', 'reveal-text', 'reveal-image', 'scroll-reveal');
          }, 850);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08,
    });

    const observeElements = () => {
      const elements = document.querySelectorAll(
        '.reveal-up, .reveal-text, .reveal-image, .reveal-card, .scroll-reveal, [data-reveal]'
      );

      elements.forEach((el) => {
        // If already revealed or completed, skip
        if (el.classList.contains('is-revealed') || el.classList.contains('reveal-complete')) return;

        // If element is already in viewport on mount, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          el.classList.add('is-revealed');
          setTimeout(() => {
            el.classList.add('reveal-complete');
            el.classList.remove('reveal-card', 'reveal-up', 'reveal-text', 'reveal-image', 'scroll-reveal');
          }, 350);
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial scan with a small RAF tick to ensure DOM is ready
    const timer = setTimeout(observeElements, 50);

    // Also observe mutations in case content is loaded dynamically (e.g. filter changes)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
