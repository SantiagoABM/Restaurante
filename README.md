# PACHA — Cocina peruana (Next.js + Mantine + GSAP)

Sitio del restaurante PACHA, construido con Next.js (App Router), Mantine UI
para layout/tema y GSAP + ScrollTrigger para el parallax y la expansión de
imágenes al hacer scroll.

## Estructura

- `app/` — layout raíz, tema de Mantine y la página principal.
- `components/` — secciones reutilizables (Hero, Intro, DishRow, MenuSection,
  NazcaDivider, ReservationCta, Footer) más `ExpandPanel`, el componente que
  hace la expansión de imágenes con scroll.
- `data/` — `dishes.tsx` y `menu.ts`: cambia estos arrays para reutilizar las
  mismas secciones con otro restaurante o carta.
- `lib/gsap.ts` — instancia única de GSAP con ScrollTrigger registrado.
- `lib/useReveal.ts` — hook reutilizable para el fade-up al hacer scroll.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Personalizar

- Colores y tipografías: `app/theme.ts` (paleta Mantine) y `app/globals.css`
  (variables CSS que usan los módulos `.module.css`).
- Platos: `data/dishes.tsx`.
- Carta / menú: `data/menu.ts`.
- Ilustraciones: `components/Illustrations/`.
