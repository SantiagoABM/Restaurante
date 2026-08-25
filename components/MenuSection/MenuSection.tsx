'use client';

import { useReveal } from '@/lib/useReveal';
import { useCart } from '@/lib/cart/cartContext';
import { formatPrice } from '@/lib/format';
import classes from './MenuSection.module.css';
import { MenuItem, MenuCategory } from '@/lib/types/menu';

interface MenuSectionProps {
  categories: MenuCategory[];
}

function MenuCategoryColumn({ category }: { category: MenuCategory }) {
   const ref = useReveal<HTMLDivElement>();
   const { addItem } = useCart();

   return (
     <div ref={ref} className={classes.cat}>
       <h4>{category.title}</h4>
      {category.items.map((item) => (
        <div key={item.id} className={classes.item}>
           <div>
             <div className={classes.name}>{item.name}</div>
             <div className={classes.desc}>{item.description}</div>
           </div>
          <div className={classes.itemRight}>
            <div className={classes.itemPrice}>{formatPrice(item.price)}</div>
            <button
              type="button"
              className={classes.addBtn}
              aria-label={`Añadir ${item.name} al carrito`}
              onClick={() =>
                addItem({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  category: category.title,
                })
              }
            >
              +
            </button>
          </div>
         </div>
       ))}
     </div>
   );
 }

/**
 * Reusable menu grid — pass any array of categories/items to reuse this
 * section for a different card.
 */
export function MenuSection({ categories }: MenuSectionProps) {
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section id="menu" className={classes.menu}>
      <div className={classes.container}>
        <div ref={headRef} className={classes.head}>
          <span className="eyebrow">La carta</span>
          <h2>Menú de la casa</h2>
          <p>
            Una selección breve, pensada para compartir. Preguntá por los especiales del día —
            cambian con lo que trae el mercado.
          </p>
        </div>
        <div className={classes.grid}>
          {categories.map((category) => (
            <MenuCategoryColumn key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
