export interface Hero {
  eyebrow: string,
  title: string,
  subtitle: string,
  images: HeroImages[],
  scrollCues: {
    href: string,
    label: string,
  }[],
}

export interface HeroImages {
  src: string,
  alt: string,
}