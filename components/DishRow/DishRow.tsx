'use client';

import type { ReactNode } from 'react';
import { ExpandPanel } from '@/components/ExpandPanel/ExpandPanel';
import { useReveal } from '@/lib/useReveal';
import classes from './DishRow.module.css';
import { Dish } from '@/lib/types/dishes';

interface DishRowProps {
  dish: Dish;
  reverse?: boolean;
}

/**
 * One reusable row: an expanding illustration/image on one side, copy + price on
 * the other. Pass `reverse` to flip the layout — used to alternate the
 * rhythm of the Dishes section.
 */
export function DishRow({ dish, reverse = false }: DishRowProps) {
  const textRef = useReveal<HTMLDivElement>();
  const visualRef = useReveal<HTMLDivElement>();

  return (
    <div className={`${classes.row} ${reverse ? classes.reverse : ''}`}>
      <div ref={visualRef} className={classes.visual}>
        <ExpandPanel
          illustration={dish.illustration}
          imageUrl={dish.imageUrl}
          imageAlt={dish.imageAlt}
          label={dish.name}
          aspectRatio="1 / 1"
        />
      </div>
      <div ref={textRef} className={classes.text}>
        <span className="eyebrow">{dish.category}</span>
        <h3>{dish.name}</h3>
        <span className={classes.price}>{dish.price}</span>
        <p>{dish.description}</p>
      </div>
    </div>
  );
}

