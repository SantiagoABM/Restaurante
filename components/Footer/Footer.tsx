import classes from './Footer.module.css';
import { Content } from '@/lib/types/general';
import { SocialIcon } from './SocialIcon';

export function Footer({ content }: { content: Content }) {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.grid}>
          <div>
            <div className={classes.logo}>{content.logo}</div>
            <p className={classes.note}>
              {content.note}
            </p>
          </div>
          <div>
            <h5>Horario</h5>
            <ul>
              {content.schedule.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Contacto</h5>
            <ul>
              <li>
                <a href={`mailto:${content.contact.email}`} className={classes.contactLink}>
                  {content.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${content.contact.phone}`} className={classes.contactLink}>
                  {content.contact.phone}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Síguenos</h5>
            <div className={classes.socialRow}>
              {content.socialMedia.map((socialMedia) => (
                <a
                  key={`${socialMedia.icon}-${socialMedia.url}`}
                  href={socialMedia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.socialBtn}
                  aria-label={socialMedia.icon}
                  title={socialMedia.icon}
                >
                  <SocialIcon name={socialMedia.icon} className={classes.socialSvg} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.bottom}>
          <span>© 2026 {content.name}. Todos los derechos reservados.</span>
          <span>
            Diseñado con sazón peruana · Desarrollado por{' '}
            <a
              href="https://tiagodev-azure.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.devLink}
            >
              TRD
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}


