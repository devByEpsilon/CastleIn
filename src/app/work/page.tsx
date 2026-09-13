import type { Metadata } from "next";
import { ArtworkGallery } from "@/features/artworks/components/ArtworkGallery";
import { artworks } from "@/features/artworks/data";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export const metadata: Metadata = {
  title: "آثار",
  description:
    "نمایشگاهی دیجیتال از آثار سفارشی بلک‌ورک، تزئینات گوتیک و تتوهای سایبرنتیک اثر پارسا گرمی.",
};

export default function WorkPage() {
  return (
    <div className="px-5 pt-32 pb-28 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 flex flex-col gap-6 border-b border-line pb-10 sm:mb-24 sm:flex-row sm:items-end sm:justify-between">
          <RevealOnScroll>
            <div>
              <p className="font-sans text-xs tracking-[0.1em] text-crimson-glow">
                آرشیو — {artworks.length} اثر
              </p>
              <h1 className="mt-4 font-display text-5xl text-bone sm:text-7xl">
                آثار
              </h1>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="max-w-sm text-sm text-bone-dim">
              یک نمایشگاه است، نه یک کاتالوگ. هر اثر زیر، سفارشی تکمیل‌شده
              است — نشانگر را روی آن نگه دارید تا دسته‌بندی‌اش نمایان
              شود، و برای دیدن کامل آن باز کنید.
            </p>
          </RevealOnScroll>
        </header>

        <ArtworkGallery artworks={artworks} />
      </div>
    </div>
  );
}
