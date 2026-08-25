'use client';

import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import classes from './Nav.module.css';

const LINKS = [
  // { href: '#historia', label: 'Historia' },
  { href: '#sabores', label: 'Sabores' },
  { href: '#menu', label: 'Menú' },
  { href: '#reservas', label: 'Reservas' },
];

export function Nav({logo}: {logo: string}) {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const trigger = ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      onUpdate: (self) => {
        nav.classList.toggle(classes.navScrolled, self.scroll() > 80);
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <nav ref={navRef} className={classes.nav}>
      <div className={classes.logo}>{logo}</div>
      <div className={classes.links}>
        {LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
