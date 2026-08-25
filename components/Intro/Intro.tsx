'use client';

import { ExpandPanel } from '@/components/ExpandPanel/ExpandPanel';
import { AndesIllustration } from '@/components/Illustrations';
import { useReveal } from '@/lib/useReveal';
import classes from './Intro.module.css';

export function Intro() {
  const textRef = useReveal<HTMLDivElement>();
  const panelWrapRef = useReveal<HTMLDivElement>();

  return (
    <section id="historia" className={classes.intro}>
      <div className={classes.grid}>
        <div ref={textRef} className={classes.text}>
          <span className="eyebrow">Nuestra historia</span>
          <h2>Tres mil años de cocina en un plato</h2>
          <p>
            PACHA nace de una idea simple: la cocina peruana no es una moda, es una memoria.
            Cada plato que servimos carga siglos de mezcla — quechua, española, africana, china,
            japonesa — cocinados a fuego lento hasta volverse uno solo.
          </p>
          <p>
            Trabajamos con pescadores del litoral, productores de la sierra y familias de la
            selva que nos envían ajíes, tubérculos y hierbas que no encontrarás en ningún
            supermercado.
          </p>
        </div>
        <div ref={panelWrapRef}>
          <ExpandPanel illustration={<AndesIllustration />} label="Los Andes, al amanecer" />
        </div>
      </div>
    </section>
  );
}
