'use client';

import { useState } from 'react';
import { Drawer } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useCart, type CartItem } from '@/lib/cart/cartContext';
import { menu } from '@/data/menu';
import { formatPrice } from '@/lib/format';
import { buildWhatsAppUrl } from '@/lib/cart/whatsapp';
import { DateModal } from './DateModal';
import { ConfirmDialog } from './ConfirmDialog';
import classes from './CartDrawer.module.css';

/** Groups cart items by category, following the same order as the carta. */
function groupByMenuOrder(items: CartItem[]) {
  return menu
    .map((category) => ({
      title: category.title,
      items: items.filter((item) => item.category === category.title),
    }))
    .filter((category) => category.items.length > 0);
}

export function CartDrawer({phone}: {phone: string}) {
  const { items, isOpen, closeCart, increment, decrement, removeItem, clearCart, totalPrice } =
    useCart();
  const isMobile = useMediaQuery('(max-width: 48em)');
  const [dateModalOpen, setDateModalOpen] = useState(false);
    const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const grouped = groupByMenuOrder(items);

  const goToMenu = () => {
    closeCart();
    // Let the drawer's close transition finish before scrolling — feels
    // less abrupt than jumping mid-animation.
    setTimeout(() => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  };

  const handleConfirmDate = (isoDate: string) => {
    const url = buildWhatsAppUrl(items, totalPrice, isoDate, phone);
    window.open(url, '_blank', 'noopener,noreferrer');
    setDateModalOpen(false);
    // clearCart();
    closeCart();
  };
  const handleConfirmClear = () => {
    clearCart();
    setConfirmClearOpen(false);
  };

  return (
    <>
      <Drawer
        opened={isOpen}
        onClose={closeCart}
        position="right"
        size={isMobile ? '100%' : 440}
        title="Tu pedido"
        overlayProps={{ backgroundOpacity: 0.6, blur: 2 }}
        classNames={{
          content: classes.drawer,
          header: classes.header,
          title: classes.title,
          body: classes.body,
        }}
      >
        {items.length === 0 ? (
          <div className={classes.empty}>
            <p>Tu carrito está vacío.</p>
            <button type="button" className={classes.addMoreBtn} onClick={goToMenu}>
              Añadir platos +
            </button>
          </div>
        ) : (
          <>
            <div className={classes.scroll}>
              {grouped.map((category) => (
                <div key={category.title} className={classes.section}>
                  <h4 className={classes.sectionTitle}>{category.title}</h4>
                  {category.items.map((item) => (
                    <div key={item.id} className={classes.row}>
                      <div className={classes.rowInfo}>
                        <div className={classes.rowName}>{item.name}</div>
                        <div className={classes.rowPrice}>{formatPrice(item.price)} c/u</div>
                      </div>
                      <div className={classes.rowActions}>
                        <button
                          type="button"
                          className={classes.stepBtn}
                          onClick={() => decrement(item.id)}
                          aria-label={`Quitar una unidad de ${item.name}`}
                        >
                          −
                        </button>
                        <span className={classes.qty}>{item.quantity}</span>
                        <button
                          type="button"
                          className={classes.stepBtn}
                          onClick={() => increment(item.id)}
                          aria-label={`Añadir una unidad de ${item.name}`}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className={classes.remove}
                          onClick={() => removeItem(item.id)}
                          aria-label={`Quitar ${item.name} del carrito`}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* <a className={classes.addMoreLink} href="#menu" onClick={(e) => { e.preventDefault(); goToMenu(); }}>
              Añadir más platos +
            </a> */}

            <div className={classes.linksRow}>
                <a className={classes.addMoreLink}
                href="#menu"
                onClick={(e) => {
                  e.preventDefault();
                  goToMenu();
                }}
              >
                Añadir más platos +
              </a>
              <button
                type="button"
                className={classes.clearLink}
                onClick={() => setConfirmClearOpen(true)}
              >
                Vaciar carrito
              </button>
            </div>

            <hr className={classes.divider} />

            <div className={classes.totalRow}>
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <button type="button" className={classes.orderBtn} onClick={() => setDateModalOpen(true)}>
              Pedir por WhatsApp
            </button>
          </>
        )}
      </Drawer>

      <DateModal
        opened={dateModalOpen}
        onClose={() => setDateModalOpen(false)}
        onConfirm={handleConfirmDate}
      />
      <ConfirmDialog
        opened={confirmClearOpen}
        title="Vaciar carrito"
        message="¿Estás seguro de vaciar el carrito? Se eliminarán todos los platos que agregaste."
        confirmLabel="Sí, vaciar"
        cancelLabel="Cancelar"
        onCancel={() => setConfirmClearOpen(false)}
        onConfirm={handleConfirmClear}
      />
    </>
  );
}