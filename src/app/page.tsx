import Link from "next/link";
import { SigilHero } from "@/components/hero/SigilHero";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { TarotCard } from "@/features/artworks/components/TarotCard";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { featuredArtworks } from "@/features/artworks/data";
import { toRoman } from "@/lib/roman";

export default function HomePage() {
  const preview = featuredArtworks.slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------- */}
      {/* HERO — scroll-grown Cyber Sun Sigil                         */}
      {/* ---------------------------------------------------------- */}
      <SigilHero />

      {/* ---------------------------------------------------------- */}
      {/* MANIFESTO                                                   */}
      {/* ---------------------------------------------------------- */}
      <section className="border-t border-line px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-4xl">
          <RevealOnScroll>
            <p className="font-sans text-xs tracking-[0.1em] text-crimson-glow">
              مانیفست
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mt-6 text-balance font-display text-3xl leading-[1.15] font-semibold text-bone sm:text-5xl">
              هر تاتویی که می‌زنم، یک شکل از گذشته، حال، و آینده است؛ چیزی
              که روی پوست می‌نشیند و به‌جای یک تزئین ساده، به خاطره‌ای
              ماندگار تبدیل می‌شود.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="mt-8 max-w-xl text-bone-dim">
              من فقط حاشیه‌چینی نمی‌کنم. من فرم‌هایی می‌سازم که به بدن تعلق
              دارند — بلک‌ورک سنگین، هندسهٔ گوتیک، و آن حس آرام و کمی نامتعارف
              از چیزی که در جای درست خودش رشد کرده است.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* SELECTED WORK                                               */}
      {/* ---------------------------------------------------------- */}
      <section className="border-t border-line px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex items-end justify-between gap-6">
            <RevealOnScroll variants={fadeUp}>
              <h2 className="font-display text-4xl text-bone sm:text-6xl">
                برگزیده
                <br />
                آثار
              </h2>
            </RevealOnScroll>
            <Link
              href="/work"
              data-cursor="باز کردن"
              className="hidden shrink-0 font-sans text-xs tracking-[0.1em] text-bone-dim transition-colors hover:text-acid sm:block"
            >
              مشاهده آرشیو کامل &#8592;
            </Link>
          </div>

          <div
            className="grid gap-x-6 gap-y-10"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
          >
            {preview.map((artwork, i) => (
              <RevealOnScroll key={artwork.id} delay={i * 0.1} variants={fadeUp}>
                <TarotCard
                  href={`/work/${artwork.slug}`}
                  image={artwork.image}
                  numeral={toRoman(i + 1)}
                  titleEn={artwork.titleEn}
                  titleFa={artwork.title}
                  styleTag={artwork.category}
                  priority
                />
              </RevealOnScroll>
            ))}
          </div>

          <Link
            href="/work"
            data-cursor="باز کردن"
            className="mt-12 block font-sans text-xs tracking-[0.1em] text-bone-dim transition-colors hover:text-acid sm:hidden"
          >
            مشاهده آرشیو کامل &#8592;
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* PROCESS STRIP                                               */}
      {/* ---------------------------------------------------------- */}
      <section className="border-t border-line bg-ink px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <RevealOnScroll variants={staggerContainer(0.12)}>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {[
                { n: "01", t: "مشاوره", d: "گفت‌وگویی دربارهٔ محل قرارگیری، اندازه، و معنایی که می‌خواهید با خود حمل کنید." },
                { n: "02", t: "طراحی", d: "طرحی سفارشی بر پایهٔ رفرنس‌های گوتیک و سایبرنتیک، با اصلاحات و بازبینی‌های لازم." },
                { n: "03", t: "ماندگاری", d: "بلک‌ورک چندجلسه‌ای با دقت اجرا می‌شود تا در طول زمان، همچنان روشن، دقیق و طبیعی بماند." },
              ].map((step) => (
                <RevealOnScroll key={step.n} variants={fadeUp}>
                  <p className="font-mono text-sm text-crimson-glow">{step.n}</p>
                  <h3 className="mt-3 font-display text-2xl text-bone">
                    {step.t}
                  </h3>
                  <p className="mt-3 text-sm text-bone-dim">{step.d}</p>
                </RevealOnScroll>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* CONTACT CTA                                                 */}
      {/* ---------------------------------------------------------- */}
      <section className="border-t border-line px-5 py-28 sm:px-8 sm:py-40">
        <div className="mx-auto max-w-5xl text-center">
          <RevealOnScroll variants={fadeUp}>
            <h2 className="text-balance font-display text-4xl text-chrome sm:text-7xl">
              بیایید چیزی ماندگار بسازیم.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15} variants={fadeUp}>
            <div className="mt-10 flex justify-center">
              <MagneticLink
                href="/contact"
                cursorLabel="رزرو"
                className="rounded-full border border-line-strong px-10 py-4 font-sans text-sm text-bone transition-colors hover:border-acid hover:text-acid"
              >
                شروع یک اثر
              </MagneticLink>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
