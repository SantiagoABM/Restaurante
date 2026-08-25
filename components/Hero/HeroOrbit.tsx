'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import classes from './HeroOrbit.module.css';
import type { HeroImages } from '@/lib/types/hero';

interface HeroOrbitProps {
  images: HeroImages[];
}

/** Same breakpoint used elsewhere for the hero's desktop/mobile switch. */
const DESKTOP_QUERY = '(min-width: 64em)';

const RADIUS_BY_COUNT: Record<number, number> = { 1: 0, 2: 30, 3: 38, 4: 36, 5: 34 };
const THUMB_BY_COUNT: Record<number, number> = { 1: 62, 2: 46, 3: 40, 4: 34, 5: 30 };

/**
 * A circular "slider": photos sit evenly spaced around a ring and orbit it
 * continuously and smoothly on desktop. On mobile the rotation simply never
 * starts (gsap.matchMedia only registers the tween above the breakpoint),
 * so the photos stay parked at their resting angle — visibly stopped.
 */
export function HeroOrbit({ images: allImages }: HeroOrbitProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const images = allImages.slice(0, 5);
  const count = images.length;
  const radius = RADIUS_BY_COUNT[count] ?? 34;
  const thumb = THUMB_BY_COUNT[count] ?? 30;

  useEffect(() => {
    const items = itemRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (items.length === 0) return;

    const baseAngles = items.map((_, i) => (360 / items.length) * i - 90);

    const place = (el: HTMLDivElement, angleDeg: number) => {
      const rad = (angleDeg * Math.PI) / 180;
      const x = Math.cos(rad) * radius;
      const y = Math.sin(rad) * radius;
      el.style.left = `calc(50% + ${x}%)`;
      el.style.top = `calc(50% + ${y}%)`;
    };

    // Resting position, drawn immediately — this is what mobile stays on.
    items.forEach((el, i) => place(el, baseAngles[i]));

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const mm = gsap.matchMedia();

    mm.add(DESKTOP_QUERY, () => {
      const orbit = { angle: 0 };
      const tween = gsap.to(orbit, {
        angle: 360,
        duration: 42,
        repeat: -1,
        ease: 'none',
        onUpdate: () => {
          items.forEach((el, i) => place(el, baseAngles[i] + orbit.angle));
        },
      });

      // Returned cleanup runs automatically if the viewport crosses back
      // below the breakpoint, or on unmount — snaps back to resting angles.
      return () => {
        tween.kill();
        items.forEach((el, i) => place(el, baseAngles[i]));
      };
    });

    return () => mm.revert();
  }, [radius]);

  if (count === 0) return null;

  return (
    <div ref={wrapRef} className={classes.orbitWrap}>
      <div className={classes.glow} />
      <svg className={classes.ring} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" />
      </svg>
      {images.map((img, i) => (
        <div
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className={classes.item}
          style={{ width: `${thumb}%`, height: `${thumb}%` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} alt={img.alt} loading={i === 0 ? 'eager' : 'lazy'} />
        </div>
      ))}
    </div>
  );
}