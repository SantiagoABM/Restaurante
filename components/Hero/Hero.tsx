'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import classes from './Hero.module.css';
import type { Hero } from '@/lib/types/hero';
import { HeroOrbit } from '@/components/Hero/HeroOrbit';

export function Hero({ heroData }: { heroData: Hero }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const nazcaRef = useRef<SVGSVGElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  // const collageRef = useRef<HTMLDivElement | null>(null);
  const orbitRef = useRef<HTMLDivElement | null>(null);

  // Cap at 5 — the collage grid only has layouts for 1 through 5 images.
  const images = heroData.images.slice(0, 5);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(nazcaRef.current, {
        yPercent: -22,
        rotate: 4,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(contentRef.current, {
        yPercent: 30,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
      // gsap.to(collageRef.current, {
      //   yPercent: -14,
      //   ease: 'none',
      //   scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      // });
      gsap.to(orbitRef.current, {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={heroRef} className={classes.hero}>
      <div ref={bgRef} className={classes.bg} />
      <svg
        ref={nazcaRef}
        className={classes.nazcaHero}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 250 C120 120, 180 380, 260 220 S 380 60, 440 200 C 470 270, 420 340, 350 300 C 300 270, 320 180, 400 170"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="440" cy="200" r="4" fill="currentColor" />
      </svg>

      <div className={classes.layout}>
        <div ref={contentRef} className={classes.content}>
          <span className="eyebrow">{heroData.eyebrow}</span>
          <h1 className={classes.title}>{heroData.title}</h1>
          <p className={classes.subtitle}>{heroData.subtitle}</p>

          <div className={classes.cues}>
            {heroData.scrollCues.map((cue, i) => (
              <a key={i} href={cue.href} className={classes.scrollCue}>
                {cue.label} <span>↓</span>
              </a>
            ))}
          </div>
        </div>

        {images.length > 0 && (<></>
        // <div ref={collageRef} className={classes.collageWrap}>
        //    <div className={classes.collage} data-count={images.length}>
        //      {images.map((img, i) => (
        //        <div key={i} className={classes.image}>
        //          {/* eslint-disable-next-line @next/next/no-img-element */}
        //          <img src={img.src} alt={img.alt} loading={i === 0 ? 'eager' : 'lazy'} />
        //        </div>
        //      ))}
        //    </div>
        //  </div>
        )}
        {images.length > 0 && (
          <div ref={orbitRef} className={classes.orbitParallax}>
            <HeroOrbit images={images} />
          </div>
        )}
      </div>
    </header>
  );
}