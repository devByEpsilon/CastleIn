import Image from "next/image";
import type { ArtworkImage } from "../types";
import { cn } from "@/lib/cn";

interface ArtworkFrameProps {
  image: ArtworkImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tint?: "crimson" | "violet" | "none";
}

/**
 * Renders artwork photography through a unified duotone + tint treatment so
 * placeholder imagery (or, later, real photography of any lighting/color)
 * reads as one coherent world.
 */
export function ArtworkFrame({
  image,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  tint = "crimson",
}: ArtworkFrameProps) {
  return (
    <div className={cn("group relative overflow-hidden bg-ink", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="duotone h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />
      {tint !== "none" && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 mix-blend-color",
            tint === "crimson" ? "bg-crimson/40" : "bg-violet/35",
          )}
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent"
      />
    </div>
  );
}
