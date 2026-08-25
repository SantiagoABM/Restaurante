'use client';

import { useCart } from '@/lib/cart/cartContext';
import classes from './CartButton.module.css';

export function CartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button type="button" className={classes.fab} onClick={openCart} aria-label="Ver carrito de pedido">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-1.6 3.2A1 1 0 0 0 6.3 18H18M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {totalItems > 0 && <span className={classes.badge}>{totalItems}</span>}
    </button>
  );
}