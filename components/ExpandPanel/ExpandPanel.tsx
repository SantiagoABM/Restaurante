'use client';

import Image from 'next/image';
import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import classes from './ExpandPanel.module.css';
import { ExpandPanelProps } from '@/lib/types/components/expandPanel';



/**
 * Reusable "expanding image" panel: starts as a small rounded card and
 * smoothly scales up to full size with squared corners as it scrolls
 * into view, using GSAP + ScrollTrigger in scrub mode. Works with either
 * an inline illustration/SVG or an image URL with full parallax depth.
 */
export function ExpandPanel({
  illustration,
  imageUrl,
  imageAlt,
  label,
  aspectRatio = '4 / 5',
}: ExpandPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const media = mediaRef.current;
    if (!panel) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      gsap.set(panel, { scale: 1, borderRadius: 24 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel,
        { scale: 0.78, borderRadius: 40 },
        {
          scale: 1,
          borderRadius: 0,
          ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top 88%', end: 'top 30%', scrub: 0.6 },
        }
      );

      if (media) {
        gsap.to(media, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        });
      }
    }, panel);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={panelRef} className={classes.panel} style={{ aspectRatio }}>
      <div
        ref={mediaRef}
        className={imageUrl ? classes.imageWrapper : classes.illust}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt || label}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className={classes.image}
          />
        ) : (
          illustration
        )}
      </div>

      {imageUrl && <div className={classes.overlay} />}

      <span className={classes.tag}>{label}</span>
    </div>
  );
}

