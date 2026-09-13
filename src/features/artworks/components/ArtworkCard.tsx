"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Artwork } from "../types";
import { ArtworkFrame } from "./ArtworkFrame";
import { cn } from "@/lib/cn";

const SIZE_SPAN: Record<NonNullable<Artwork["size"]>, string> = {
  sm: "md:col-span-4",
  md: "md:col-span-5",
  lg: "md:col-span-7",
  xl: "md:col-span-8",
};

const SIZE_ASPECT: Record<NonNullable<Artwork["size"]>, string> = {
  sm: "aspect-[3/4]",
  md: "aspect-[4/5]",
  lg: "aspect-[5/4]",
  xl: "aspect-[4/5]",
};

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  offset?: boolean;
}

export function ArtworkCard({ artwork, index, offset = false }: ArtworkCardProps) {
  const size = artwork.size ?? "md";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      className={cn(
        "col-span-12",
        SIZE_SPAN[size],
        offset && "md:mt-16",
      )}
    >
      <Link
        href={`/work/${artwork.slug}`}
        data-cursor="VIEW"
        className="group block"
        aria-label={`مشاهده ${artwork.title}، ${artwork.category}، ${artwork.year}`}
      >
        <div className={cn("relative", SIZE_ASPECT[size])}>
          <ArtworkFrame image={artwork.image} className="h-full w-full" />

          <span className="pointer-events-none absolute top-4 start-4 font-mono text-[11px] tracking-widest text-bone/70">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="pointer-events-none absolute top-4 end-4 translate-y-2 font-mono text-[11px] tracking-widest text-bone/70 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {artwork.year}
          </span>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <p className="font-sans text-xs tracking-[0.03em] text-acid">
              {artwork.category}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl text-bone transition-colors duration-300 group-hover:text-chrome sm:text-2xl">
            {artwork.title}
          </h3>
          <span className="shrink-0 font-sans text-xs text-ash">
            {artwork.placement}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
