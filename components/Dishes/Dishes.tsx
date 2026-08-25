'use client';

import { DishRow } from '@/components/DishRow/DishRow';
import { useReveal } from '@/lib/useReveal';
import classes from './Dishes.module.css';
import type { Dish } from '@/lib/types/dishes';

interface DishesProps {
  dishes: Dish[];
}

/**
 * Renders any list of dishes as alternating DishRows. Reusable for a
 * different menu, a seasonal specials section, etc — just pass new data.
 */
export function Dishes({ dishes }: DishesProps) {
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section id="sabores" className={classes.dishes}>
      <div className={classes.container}>
        <div ref={headRef} className={classes.head}>
          <span className="eyebrow">Platos de autor</span>
          <h2>Tres recetas, un solo pulso</h2>
          <p>
            La carta cambia con las estaciones del mar y de la chacra. Estos platos nunca se
            van — son la columna vertebral de la casa.
          </p>
        </div>
        {dishes.map((dish, i) => (
          <DishRow key={dish.id} dish={dish} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
