import { ReactNode } from "react";

export interface Dish {
  id: string;
  category: string;
  name: string;
  price: string;
  description: string;
  illustration?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
}