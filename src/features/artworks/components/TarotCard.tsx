import Image from "next/image";
import Link from "next/link";
import type { ArtworkImage } from "../types";
import { cn } from "@/lib/cn";

export interface TarotCardProps {
  /** Destination for the card link, e.g. `/work/${slug}`. */
  href: string;
  image: ArtworkImage;
  /** Roman numeral shown in the corner marker, e.g. "IV". */
  numeral: string;
  /** English/Latin title set in the gothic serif title band. */
  titleEn: string;
  /** Persian title shown beneath the English title. */
  titleFa: string;
  /** Tattoo style / category tag — not shown on the card face, only in its accessible label. */
  styleTag: string;
  /** Studio signature line under the title box. */
  byline?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Dark tarot-card presentation for a single artwork: a black backing plate
 * (`.tarot-outer`), an aged parchment insert with torn deckled edges
 * (`.tarot-parchment`, clip-path in globals.css), the full-color artwork
 * photo, a roman numeral corner marker, and a bordered title band.
 * Deliberately bypasses `ArtworkFrame`'s crimson/violet duotone tint — this
 * card family shows the real photo color instead.
 */
export function TarotCard({
  href,
  image,
  numeral,
  titleEn,
  titleFa,
  styleTag,
  byline = "CASTLEIN — پارسا گرمی",
  priority = false,
  className,
}: TarotCardProps) {
  return (
    <Link
      href={href}
      data-cursor="VIEW"
      aria-label={`مشاهده ${titleFa}، ${styleTag}`}
      className={cn("tarot-card group", className)}
    >
      <div className="tarot-outer">
        <div className="tarot-parchment">
          <span aria-hidden className="tarot-number">
            {numeral}
          </span>

          <div className="tarot-art-window">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 80vw"
              priority={priority}
              style={{ objectPosition: "50% 52%" }}
              className="h-full w-full scale-[1.08] object-cover"
            />
          </div>

          <div className="tarot-title-band">
            <span className="tarot-title-en">{titleEn}</span>
            <span className="tarot-title-fa">{titleFa}</span>
          </div>
          <p className="tarot-byline">{byline}</p>
        </div>
      </div>
    </Link>
  );
}
