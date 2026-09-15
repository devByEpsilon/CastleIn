import type { Artwork } from "../types";
import { TarotCard } from "./TarotCard";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { scaleIn } from "@/lib/motion/variants";
import { toRoman } from "@/lib/roman";

export function ArtworkGallery({ artworks }: { artworks: Artwork[] }) {
  return (
    <div
      className="grid gap-x-4 gap-y-10 sm:gap-x-6"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
    >
      {artworks.map((artwork, index) => (
        <RevealOnScroll key={artwork.id} variants={scaleIn} delay={(index % 4) * 0.06}>
          <TarotCard
            href={`/work/${artwork.slug}`}
            image={artwork.image}
            numeral={toRoman(index + 1)}
            titleEn={artwork.titleEn}
            titleFa={artwork.title}
            styleTag={artwork.category}
            priority={index < 3}
          />
        </RevealOnScroll>
      ))}
    </div>
  );
}
