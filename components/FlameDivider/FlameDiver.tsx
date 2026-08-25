'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReveal } from '@/lib/useReveal';
import classes from './FlameDivider.module.css';
import { FlameConfig } from '@/lib/types/components/flameDivider';

/** Single flame silhouette, centered at x=0, base sitting on y=180. */
const FLAME_D =
  'M0,180 C-16,150 -12,110 -3,80 C1,64 -6,55 0,30 C8,55 18,68 16,90 C22,118 16,150 0,180 Z';



/** Positions/sizes across the 800-wide viewBox — mix of taller "back" and
 *  shorter, brighter "front" flames for a little depth, like embers along
 *  a hearth line. */
const FLAMES: FlameConfig[] = [
  { x: 60, scale: 0.55, delay: 0.0, variant: 'back' },
  { x: 150, scale: 0.85, delay: 0.15, variant: 'front' },
  { x: 260, scale: 0.65, delay: 0.05, variant: 'back' },
  { x: 360, scale: 1.05, delay: 0.2, variant: 'front' },
  { x: 460, scale: 0.7, delay: 0.1, variant: 'back' },
  { x: 560, scale: 0.9, delay: 0.25, variant: 'front' },
  { x: 660, scale: 0.6, delay: 0.08, variant: 'back' },
  { x: 740, scale: 0.5, delay: 0.18, variant: 'back' },
];

/**
 * The page's signature element: a row of hand-drawn flames that rise up
 * (scale from ember to full flame) as the section scrolls into view, then
 * flicker gently and continuously — a nod to the wood fire behind every
 * dish on the menu.
 */
export function FlameDivider() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const flameRefs = useRef<Array<SVGPathElement | null>>([]);
  const quoteRef = useReveal<HTMLParagraphElement>();

  useEffect(() => {
    const section = sectionRef.current;
    const flames = flameRefs.current.filter((el): el is SVGPathElement => el !== null);
    if (!section || flames.length === 0) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      gsap.set(flames, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Growth: flames rise from a low ember to full height as the
      // section scrolls through view, tied directly to scroll position.
      gsap.fromTo(
        flames,
        { scaleY: 0.22 },
        {
          scaleY: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 55%', scrub: 0.6 },
        }
      );

      // Flicker: a continuous, independent sway/wobble per flame, played
      // only while the section is actually on screen.
      const flicker = gsap.timeline({ paused: true, repeat: -1 });
      flames.forEach((el, i) => {
        const cfg = FLAMES[i];
        flicker.to(
          el,
          {
            scaleX: 1.08 + Math.random() * 0.1,
            y: -4 - Math.random() * 5,
            rotation: (i % 2 === 0 ? 1 : -1) * (2 + Math.random() * 3),
            duration: 0.6 + Math.random() * 0.5,
            delay: cfg.delay,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1,
            transformOrigin: '50% 100%',
          },
          0
        );
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => flicker.play(),
        onEnterBack: () => flicker.play(),
        onLeave: () => flicker.pause(),
        onLeaveBack: () => flicker.pause(),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={classes.divider}>
      <div className={classes.glow} />
      <div className={classes.container}>
        <div className={classes.flameWrap}>
          <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="flameGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--gold-soft)" />
                <stop offset="55%" stopColor="var(--gold)" />
                <stop offset="100%" stopColor="var(--clay)" />
              </linearGradient>
            </defs>
            {FLAMES.map((cfg, i) => (
              <g key={i} transform={`translate(${cfg.x},0) scale(${cfg.scale})`}>
                <path
                  ref={(el) => {
                    flameRefs.current[i] = el;
                  }}
                  className={classes.flame}
                  d={FLAME_D}
                  fill="url(#flameGradient)"
                  fillOpacity={cfg.variant === 'front' ? 1 : 0.55}
                />
              </g>
            ))}
          </svg>
        </div>
        <p ref={quoteRef} className={classes.quote}>
          Todo lo que sale de esta cocina pasó primero por el fuego.{' '}
          <span>Lento, directo, sin atajos.</span>
        </p>
      </div>
    </section>
  );
}