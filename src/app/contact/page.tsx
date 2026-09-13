import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { MagneticLink } from "@/components/ui/MagneticLink";

export const metadata: Metadata = {
  title: "تماس",
  description: "رزرو جلسه تتوی سفارشی با پارسا گرمی. فقط با وقت قبلی.",
};

const CONTACT_LINKS = [
  { label: "ایمیل", value: "booking@castlein.example", href: "mailto:booking@castlein.example", cursor: "ایمیل" },
  { label: "اینستاگرام", value: "@castlein.ink", href: "https://instagram.com", cursor: "مشاهده" },
  { label: "استودیو", value: "مکان نامشخص — با وقت قبلی", href: undefined, cursor: undefined },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-[100svh] flex-col justify-center px-5 pt-32 pb-24 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <RevealOnScroll>
          <p className="font-sans text-xs tracking-[0.1em] text-crimson-glow">
            در تماس باشید
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <h1 className="mt-6 max-w-full text-balance font-display text-[10.5vw] leading-[1.15] text-chrome break-words sm:text-[7vw]">
            بیایید
            <br />
            چیزی
            <br />
            ماندگار بسازیم.
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <p className="mt-10 max-w-xl text-lg text-bone-dim">
            درباره اثری که در ذهن دارید برایم بگویید — محل قرارگیری، اندازه،
            مرجع‌ها. به هر درخواست جدی ظرف چند روز پاسخ می‌دهم.
          </p>
        </RevealOnScroll>

        <div className="mt-14">
          <MagneticLink
            href="mailto:booking@castlein.example"
            cursorLabel="ایمیل"
            className="inline-flex max-w-full items-center gap-4 rounded-full border border-line-strong px-6 py-4 font-mono text-xs tracking-[0.05em] text-bone transition-colors hover:border-acid hover:text-acid sm:px-10 sm:py-5 sm:text-sm"
          >
            <span dir="ltr" className="break-all sm:break-normal">booking@castlein.example</span>
          </MagneticLink>
        </div>

        <RevealOnScroll variants={staggerContainer(0.1)}>
          <dl className="mt-24 grid grid-cols-1 gap-10 border-t border-line pt-12 sm:grid-cols-3">
            {CONTACT_LINKS.map((item) => (
              <RevealOnScroll key={item.label} variants={fadeUp}>
                <dt className="font-sans text-xs text-ash">
                  {item.label}
                </dt>
                {item.href ? (
                  <dd className="mt-2">
                    <a
                      href={item.href}
                      dir="ltr"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      data-cursor={item.cursor}
                      className="inline-block font-display text-lg font-bold text-bone-dim transition-colors hover:text-bone"
                    >
                      {item.value}
                    </a>
                  </dd>
                ) : (
                  <dd className="mt-2 font-display text-lg font-bold text-bone-dim">
                    {item.value}
                  </dd>
                )}
              </RevealOnScroll>
            ))}
          </dl>
        </RevealOnScroll>
      </div>
    </div>
  );
}
