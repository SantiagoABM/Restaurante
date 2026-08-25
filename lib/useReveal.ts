'use client';

import { useEffect, useRef } from 'react';
import { gsap } from './gsap';

/**
 * Fade-up reveal on scroll. Reusable across any section — attach the
 * returned ref to the element that should animate in.
 */
export function useReveal<T extends HTMLElement>(distance = 46) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: distance, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [distance]);

  return ref;
}
