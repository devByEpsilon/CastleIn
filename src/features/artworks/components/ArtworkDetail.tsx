"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Artwork } from "../types";
import { ArtworkFrame } from "./ArtworkFrame";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { fadeUp } from "@/lib/motion/variants";

interface ArtworkDetailProps {
  artwork: Artwork;
  previous?: Artwork;
  next?: Artwork;
}

export function ArtworkDetail({ artwork, previous, next }: ArtworkDetailProps) {
  return (
    <article className="px-5 pt-28 pb-24 sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/work"
          data-cursor="بازگشت"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.05em] text-bone-dim transition-colors hover:text-acid"
        >
          <span aria-hidden>&#8594;</span> بازگشت به آرشیو
        </Link>

        <header className="mt-10 grid grid-cols-1 gap-6 border-b border-line pb-10 sm:grid-cols-[1fr_auto] sm:items-end">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance font-display text-5xl leading-[1.1] text-chrome sm:text-7xl"
          >
            {artwork.title}
          </motion.h1>
          <dl className="grid grid-cols-3 gap-6 font-sans text-xs text-ash sm:text-end">
            <div>
              <dt className="text-ash">دسته‌بندی</dt>
              <dd className="mt-1 text-bone-dim">{artwork.category}</dd>
            </div>
            <div>
              <dt className="text-ash">سال</dt>
              <dd className="mt-1 text-bone-dim">{artwork.year}</dd>
            </div>
            <div>
              <dt className="text-ash">محل قرارگیری</dt>
              <dd className="mt-1 text-bone-dim">{artwork.placement ?? "—"}</dd>
            </div>
          </dl>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full"
          >
            <ArtworkFrame image={artwork.image} className="h-full w-full" priority tint="violet" />
          </motion.div>

          <div className="flex flex-col gap-8">
            <RevealOnScroll variants={fadeUp}>
              <p className="text-lg leading-relaxed text-bone sm:text-xl">
                {artwork.description}
              </p>
            </RevealOnScroll>

            {artwork.statement && (
              <RevealOnScroll variants={fadeUp} delay={0.1}>
                <blockquote className="border-s-2 border-crimson ps-5 text-bone-dim italic">
                  &ldquo;{artwork.statement}&rdquo;
                </blockquote>
              </RevealOnScroll>
            )}

            <RevealOnScroll variants={fadeUp} delay={0.15}>
              <div className="flex flex-wrap gap-2">
                {artwork.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line-strong px-3 py-1 font-sans text-xs text-bone-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </RevealOnScroll>

            {artwork.hours && (
              <RevealOnScroll variants={fadeUp} delay={0.2}>
                <p className="font-sans text-xs text-ash">
                  مدت جلسات — {artwork.hours} ساعت
                </p>
              </RevealOnScroll>
            )}
          </div>
        </div>

        {artwork.gallery && artwork.gallery.length > 0 && (
          <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {artwork.gallery.map((img, i) => (
              <RevealOnScroll key={img.src} delay={i * 0.08}>
                <div className="relative aspect-[4/5]">
                  <ArtworkFrame image={img} className="h-full w-full" tint="none" />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}

        <nav
          aria-label="آثار مجاور"
          className="mt-24 grid grid-cols-1 gap-6 border-t border-line pt-10 sm:grid-cols-2"
        >
          {previous && (
            <Link
              href={`/work/${previous.slug}`}
              data-cursor="قبلی"
              className="group flex flex-col gap-2"
            >
              <span className="font-sans text-xs text-ash">
                &#8594; قبلی
              </span>
              <span className="font-display text-2xl text-bone-dim transition-colors group-hover:text-bone">
                {previous.title}
              </span>
            </Link>
          )}
          {next && (
            <Link
              href={`/work/${next.slug}`}
              data-cursor="بعدی"
              className="group flex flex-col gap-2 sm:items-end sm:text-end"
            >
              <span className="font-sans text-xs text-ash">
                بعدی &#8592;
              </span>
              <span className="font-display text-2xl text-bone-dim transition-colors group-hover:text-bone">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
