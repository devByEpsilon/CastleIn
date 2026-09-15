/**
 * Domain model for a single tattoo artwork / commission.
 *
 * Keep this the single source of truth for artwork shape. Real content later
 * should slot into this exact type — see `data.ts` for the fictional demo set.
 */
export type ArtworkCategory =
  | "بلک‌ورک"
  | "سایبرنتیک"
  | "تزئین گوتیک"
  | "اکالت"
  | "فاین‌لاین"
  | "بیومکانیکال";

export interface ArtworkImage {
  /** Path or remote URL. Local files should live under /public/artworks/. */
  src: string;
  /** Required — describes the visual content for screen readers. */
  alt: string;
  /** Width / height for layout stability (next/image). */
  width: number;
  height: number;
}

export interface Artwork {
  id: string;
  /** URL-safe identifier, used for /work/[slug] */
  slug: string;
  /** Display title (Farsi). */
  title: string;
  /** Latin/English rendering of the title, used on the tarot card's title band. */
  titleEn: string;
  category: ArtworkCategory;
  year: number;
  /** Short editorial description, 1-3 sentences. */
  description: string;
  /** Longer form artist notes shown on the detail page. */
  statement?: string;
  /** Primary hero image for grid + detail. */
  image: ArtworkImage;
  /** Additional process / detail imagery for the detail page. */
  gallery?: ArtworkImage[];
  tags: string[];
  /** Placement on the body, purely editorial flavor text. */
  placement?: string;
  /** Approx session hours, editorial flavor. */
  hours?: number;
  featured?: boolean;
  /** Controls the intended grid span in the exhibition layout. */
  size?: "sm" | "md" | "lg" | "xl";
}
