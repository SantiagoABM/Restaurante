import { ReactNode } from "react";

export interface ExpandPanelProps {
  illustration?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  label: string;
  /** CSS aspect-ratio, e.g. '4 / 5' or '1 / 1' */
  aspectRatio?: string;
}