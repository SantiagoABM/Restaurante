import { Nav } from '@/components/Nav/Nav';
import { Hero } from '@/components/Hero/Hero';
import { Intro } from '@/components/Intro/Intro';
import { Dishes } from '@/components/Dishes/Dishes';
import { NazcaDivider } from '@/components/NazcaDivider/NazcaDivider';
import { MenuSection } from '@/components/MenuSection/MenuSection';
import { ReservationCta } from '@/components/ReservationCta/ReservationCta';
import { Footer } from '@/components/Footer/Footer';
import { dishes } from '@/data/dishes';
import { menu } from '@/data/menu';
import { contentData } from '@/data/content';
import { FlameDivider } from '@/components/FlameDivider/FlameDiver';
import { heroData } from '@/data/hero';
import { CartButton } from '@/components/Cart/CartButton';
import { CartDrawer } from '@/components/Cart/CartDrawer';

export default function HomePage() {
  return (
    <>
      <Nav logo={contentData.logo}/>
      <Hero heroData={heroData}/>
      {/* <Intro /> */}
      <Dishes dishes={dishes} />
      <FlameDivider />
      <MenuSection categories={menu} />
      <ReservationCta contact={contentData.contact}/>
      <Footer content={contentData}/>
      <CartButton />
      <CartDrawer phone={contentData.contact.phone}/>
    </>
  );
}
