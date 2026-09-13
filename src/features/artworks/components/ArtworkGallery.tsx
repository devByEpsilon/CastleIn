import type { Artwork } from "../types";
import { ArtworkCard } from "./ArtworkCard";

export function ArtworkGallery({ artworks }: { artworks: Artwork[] }) {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-20 sm:gap-y-24">
      {artworks.map((artwork, index) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          index={index}
          offset={index % 3 === 1}
        />
      ))}
    </div>
  );
}
