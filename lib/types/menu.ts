export interface MenuItem {
  id: string,
  name: string;
  description: string;
  price: number;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}