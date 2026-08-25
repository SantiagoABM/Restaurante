import type { Hero } from "@/lib/types/hero";

export const heroData: Hero = {
  eyebrow: 'Cocina peruana · directo del fuego',
  title: 'PACHA',
  subtitle: 'Donde el Pacífico, los Andes y la selva se sientan a la misma mesa. Tres mil años de sabor, servidos hoy.',
  images: [
    {src: "https://cdn0.recetasgratis.net/es/posts/8/6/2/causa_limena_31268_orig.jpg", alt: "Causa Limeña"}, 
    {src: "https://www.peru.travel/Contenido/General/Imagen/es/653/1.1/chicha-morada-limon.jpg", alt: "Chicha Morada"}, 
    {src: "https://i.blogs.es/b0a5c0/lomo_saltado/1200_900.jpg", alt: "Lomo Saltado"}, 
    {src: "https://images.aws.nestle.recipes/original/56700de435c12f170c16127eba270c4f_ceviche.jpg", alt: "Ceviche"}, 
    {src: "https://origin.cronosmedia.glr.pe/large/2020/12/18/lg_5fdd5b4acf89f80dcc653f1d.jpg", alt: "Arroz chaufa"}],
  scrollCues: [
    {
      href: '#sabores',
      label: 'Sabores',
    },
    {
      href: '#reservas',
      label: 'Pide ahora',
    },
  ]
};