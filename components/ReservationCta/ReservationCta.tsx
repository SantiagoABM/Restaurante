'use client';

import { useReveal } from '@/lib/useReveal';
import classes from './ReservationCta.module.css';
import { Contact } from '@/lib/types/general';



export function ReservationCta({contact}: {contact: Contact}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="reservas" className={classes.cta}>
      <div ref={ref} className={classes.container}>
        <span className="eyebrow">Pedidos</span>
        <h2>Haz tu pedido</h2>
        <p>Los pedidos deben ser realizados con un día de anticipación.</p>
        <div className={classes.actions}>
          <a href={`mailto:${contact.email}`} className={`${classes.btn} ${classes.btnPrimary}`}>
            Reservar por email
          </a>
          <a href={`tel:${contact.phone}`} className={`${classes.btn} ${classes.btnGhost}`}>
            Llamar {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
