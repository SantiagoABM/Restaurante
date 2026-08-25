'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReveal } from '@/lib/useReveal';
import classes from './NazcaDivider.module.css';

/**
 * The page's signature element: a Nazca-line-inspired path that draws
 * itself in as the section scrolls into view, echoing the geoglyphs of
 * southern Peru.
 */
export function NazcaDivider() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const quoteRef = useReveal<HTMLParagraphElement>();

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const length = path.getTotalLength();

    if (reduceMotion) {
      path.style.strokeDasharray = 'none';
      return;
    }

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={classes.divider}>
      <div className={classes.container}>
        <div className={classes.lineWrap}>
          <svg viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              ref={pathRef}
              className={classes.path}
              d="M20 100 C120 20, 160 180, 240 100 S 360 20, 420 100 C 460 150, 520 150, 540 90 C 560 30, 640 30, 660 90 C 675 130, 740 130, 780 80"
            />
          </svg>
        </div>
        <p ref={quoteRef} className={classes.quote}>
          Cada línea del desierto cuenta una historia que solo se ve completa desde arriba.{' '}
          <span>Cada plato, servido con calma, cuenta la suya.</span>
        </p>
      </div>
    </section>
  );
}
