import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { ArtworkFrame } from "@/features/artworks/components/ArtworkFrame";

export const metadata: Metadata = {
  title: "درباره",
  description:
    "پارسا گرمی — هنرمند تتویی که میان بلک‌ورک، تزئینات گوتیک و تصویرسازی ماشینی کار می‌کند.",
};

const THEMES = ["جوهر", "فرم", "خاطره", "هویت", "پوست", "ماندگاری"];

export default function AboutPage() {
  return (
    <div className="px-5 pt-32 pb-28 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-6xl">
        {/* Fragmented word wall */}
        <RevealOnScroll variants={staggerContainer(0.06)}>
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-10">
            {THEMES.map((word) => (
              <RevealOnScroll key={word} variants={fadeUp} className="inline-block">
                <span className="font-display text-3xl text-bone-dim sm:text-5xl">
                  {word}
                </span>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <RevealOnScroll>
            <div className="relative aspect-[4/5] w-full lg:sticky lg:top-28">
              <ArtworkFrame
                image={{
                  src: "/about/portrait.svg",
                  alt: "پرتره پارسا گرمی، هنرمند تتو، در نور کم و دراماتیک استودیو",
                  width: 1200,
                  height: 1500,
                }}
                className="h-full w-full"
                tint="violet"
              />
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-16">
            <div>
              <RevealOnScroll>
                <p className="font-sans text-xs tracking-[0.1em] text-crimson-glow">
                  بیانیه هنرمند
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <h1 className="mt-5 text-balance font-display text-4xl leading-[1.15] text-bone sm:text-6xl">
                  من تصویر تتو نمی‌کنم. من اشیایی می‌سازم که اتفاقاً روی
                  پوست زندگی می‌کنند.
                </h1>
              </RevealOnScroll>
            </div>

            <RevealOnScroll variants={staggerContainer(0.1)}>
              <div className="flex flex-col gap-6 text-bone-dim">
                <RevealOnScroll variants={fadeUp}>
                  <p>
                    من از سال 2019 تتو زدن را آغاز کردم، پس از سال‌ها طراحی
                    ماشین‌هایی که وجود نداشتند و قدیسانی که هرگز به رسمیت
                    شناخته نشدند. سبک گوتیک سایبری، سلیقه‌ای نیست که انتخاب
                    کرده باشم — تنها جایی است که بلک‌ورک، تزئینات کلیساهای
                    گوتیک و فناوری شکسته، در کنار هم معنا پیدا می‌کنند.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll variants={fadeUp}>
                  <p>
                    هر اثر با گفتگویی درباره چیزی که می‌خواهید همراه داشته
                    باشید آغاز می‌شود، نه چیزی که فقط می‌خواهید نگاهش کنید.
                    از همان‌جا، خطوطی سفارشی می‌سازم — سنگین، پررنگ، و
                    طراحی‌شده تا برای پنجاه سال آینده روی پوست بماند، نه فقط
                    برای پنجاه لایک بعدی.
                  </p>
                </RevealOnScroll>
                <RevealOnScroll variants={fadeUp}>
                  <p>
                    من آرام کار می‌کنم، در قالب آثار چندجلسه‌ای وقتی طرح آن
                    را ایجاب کند، و کاری را که با بدن موردنظر هم‌خوانی
                    نداشته باشد نمی‌پذیرم. اگر این همان نوع ماندگاری‌ست که
                    دنبالش هستید، با من در تماس باشید.
                  </p>
                </RevealOnScroll>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variants={staggerContainer(0.08)}>
              <dl className="grid grid-cols-2 gap-8 border-t border-line pt-10 sm:grid-cols-3">
                {[
                  { label: "سال‌های فعالیت", value: "+6" },
                  { label: "سبک کاری", value: "بلک‌ورک / گوتیک سایبری" },
                  { label: "رزرو", value: "با وقت قبلی" },
                ].map((stat) => (
                  <RevealOnScroll key={stat.label} variants={fadeUp}>
                    <dt className="font-sans text-xs text-ash">
                      {stat.label}
                    </dt>
                    <dd className="mt-2 font-display text-lg font-bold text-bone">
                      {stat.value}
                    </dd>
                  </RevealOnScroll>
                ))}
              </dl>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
