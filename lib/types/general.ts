export interface Content {
  logo: string,
  name: string,
  note: string,
  contact: Contact,
  socialMedia: SocialMedia[],
  schedule: string[],
}

export interface Contact {
  phone: string,
  email: string,
}

export interface SocialMedia {
  url: string,
  icon: string,
}