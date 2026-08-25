
import { CausaIllustration, CevicheIllustration, LomoIllustration } from '@/components/Illustrations';
import type { Dish } from '@/lib/types/dishes';

/**
 * Change this array to reuse the Dishes section with a different card —
 * each entry drives one DishRow (illustration, copy, price).
 */
export const dishes: Dish[] = [
  {
    id: 'ceviche',
    category: 'Del mar',
    name: 'Ceviche mixto',
    price: 'S/ 48',
    description:
      'Pescado del día y mariscos curados al momento en leche de tigre de ají limo, camote glaseado y choclo serrano. Frío, cítrico, directo.',
    illustration: <CevicheIllustration />,
    imageUrl: 'https://w7.pngwing.com/pngs/958/722/png-transparent-peruvian-ceviche.png',
    imageAlt: 'Ceviche mixto',
  },
  {
    id: 'lomo-saltado',
    category: 'Del fuego',
    name: 'Lomo saltado',
    price: 'S/ 56',
    description:
      'Lomo fino salteado a fuego alto con cebolla morada, tomate y sillao, servido con papas doradas y arroz graneado. El wok nunca descansa.',
    illustration: <LomoIllustration />,
  },
  {
    id: 'causa-limena',
    category: 'De la chacra',
    name: 'Causa limeña',
    price: 'S/ 38',
    description:
      'Capas de papa amarilla prensada con ají amarillo, relleno de pollo deshilachado o palta, coronada con una lámina de huevo de codorniz.',
    illustration: <CausaIllustration />,
  },
];
