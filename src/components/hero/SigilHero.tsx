"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/cn";
import { HeroStarfield } from "./HeroStarfield";
import { SunSigil } from "./SunSigil";
import { RING_CIRCUMFERENCE } from "./sunSigilGeometry";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The Hero: a pinned, scroll-scrubbed viewport in which a chrome sunburst
 * first traces its own ring into existence — like a compass sweeping a
 * full circle — then grows every tooth and spike out of that ring: smallest
 * gap teeth first, then the inner tips, then the sixteen outer spikes
 * (including the two dominant north/south columns) last, for the most
 * dramatic payoff at the end of the scroll range.
 *
 * Respects prefers-reduced-motion by skipping the pin/timeline entirely and
 * rendering the sigil already complete, in a normal single-viewport section.
 */
export function SigilHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const sigilWrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionPreference();

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current || !pinRef.current) return;

      // svgOrigin (SVG user-space coords), not CSS transformOrigin — a <g>
      // with no intrinsic position doesn't resolve a px transform-origin
      // reliably once nested inside a viewBox-scaled SVG. Anchoring each
      // piece at its own data-ox/data-oy (the exact point it shares with
      // the ring) is what makes it read as growing out of the ring, not
      // popping in from its bounding-box center.
      gsap.set(".grow-el", {
        svgOrigin: (_i, el) => `${(el as HTMLElement).dataset.ox} ${(el as HTMLElement).dataset.oy}`,
        scale: 0,
      });
      // ring-draw reveal starts fully hidden: the mask circle's dash is
      // pulled back to its own circumference (nothing traced yet), so the
      // ring itself isn't visible until the first timeline stage sweeps it
      // back in — a compass drawing a circle, not a fade/scale-in.
      gsap.set(".ring-trace", { strokeDashoffset: RING_CIRCUMFERENCE });
      gsap.set(".ring-trace-guide", { opacity: 0 });
      gsap.set(sigilWrapRef.current, { scale: 0.9, rotate: -1.5, opacity: 0.9 });
      gsap.set(".sigil-specular", { transformOrigin: "50% 50%" });
      gsap.set(".sigil-copy-kicker", { opacity: 0.25, y: 0 });
      gsap.set(".sigil-copy-headline", { clipPath: "inset(0 0 100% 0)" });
      gsap.set(".sigil-copy-sub, .sigil-copy-cta", { opacity: 0, y: 16 });

      // "bottom bottom" ties pin duration directly to the section's own
      // responsive height (h-[210vh] / sm:h-[250vh]) so the timeline always
      // reaches 100% exactly at the end of the scrollable range, on any
      // breakpoint — ScrollTrigger's own resize handling keeps it in sync.
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      tl.addLabel("start", 0)
        .to(".sigil-copy-kicker", { opacity: 1, y: 0, duration: 0.6 }, "start")
        .to(sigilWrapRef.current, { scale: 0.96, duration: 1.6 }, "start")

        // ring — traced into existence like a compass sweeping a full
        // circle, before anything else grows out of it
        .addLabel("ring", 0.4)
        .to(".ring-trace", { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, "ring")
        .to(".ring-trace-guide", { opacity: 1, duration: 0.3 }, "ring")
        .to(".ring-trace-guide", { opacity: 0, duration: 0.5 }, "ring+=1.6")

        // teeth — the sixteen small gap teeth, smallest and first
        .addLabel("teeth", 3.2)
        .to(
          ".gap-tooth",
          { scale: 1, duration: 1.4, stagger: { amount: 0.9 }, ease: "back.out(2)" },
          "teeth",
        )

        // tips — the sixteen inner tips
        .addLabel("tips", 4.8)
        .to(
          ".inner-tip",
          { scale: 1, duration: 1.6, stagger: { amount: 1.1 }, ease: "back.out(2)" },
          "tips",
        )
        .to(sigilWrapRef.current, { rotate: -0.5, duration: 1.6 }, "tips")

        // spikes — the sixteen outer spikes, longest and most dramatic,
        // the two column spikes among them
        .addLabel("spikes", 6.6)
        .to(
          ".outer-spike",
          { scale: 1, duration: 2.4, stagger: { amount: 1.8 }, ease: "back.out(1.6)" },
          "spikes",
        )
        .to(sigilWrapRef.current, { scale: 1, opacity: 1, duration: 2.2 }, "spikes")

        // finale — a single bright flare across the whole ring, then copy
        .addLabel("finale", 9.6)
        .to(
          ".sigil-specular",
          { scale: 1.5, opacity: 0.75, duration: 0.5, yoyo: true, repeat: 1 },
          "finale",
        )
        .to(".sigil-copy-headline", { clipPath: "inset(0 0 0% 0)", duration: 1 }, "finale+=0.2")
        .to(".sigil-copy-sub", { opacity: 1, y: 0, duration: 0.8 }, "finale+=0.6")
        .to(".sigil-copy-cta", { opacity: 1, y: 0, duration: 0.8 }, "finale+=0.8");
    },
    { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative w-full",
        reducedMotion ? "h-[100svh] min-h-[640px]" : "h-[210vh] sm:h-[250vh]",
      )}
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden bg-void"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-void via-void/10 to-void/20"
        />

        {/* fills the wide void between the sigil and the text column on
            large screens, where the tall narrow composition leaves a lot
            of empty space either side of it */}
        <HeroStarfield />

        {/* composition: text column + the sigil growing beside/through it */}
        <div className="relative z-10 flex flex-1 flex-col-reverse gap-8 px-5 pt-10 pb-8 sm:flex-row sm:items-stretch sm:gap-4 sm:px-8 sm:pt-28 sm:pb-10">
          <div className="flex flex-col justify-end sm:w-[38%] sm:justify-center">
            <p className="sigil-copy-kicker font-sans text-xs tracking-[0.1em] text-bone-dim">
              پارسا گرمی — تأسیس 2019
            </p>
            <p className="mt-6 font-sans text-xs tracking-[0.05em] text-crimson-glow">
              نشانی که رشد کرده، نه کشیده شده
            </p>
            <h1 className="sigil-copy-headline mt-3 font-display text-[14vw] leading-[1.1] text-chrome sm:text-[6.4vw] lg:text-[4.4vw]">
              سایبر
              <br />
              گوتیک
              <br />
              تتو
            </h1>
            <p className="sigil-copy-sub mt-6 max-w-sm text-sm text-bone-dim sm:text-base lg:max-w-md lg:text-lg">
              بلک‌ورک، تزئینات گوتیک و تصویرسازی ماشینی، ساخته‌شده روی پوست،
              اثر به اثر، برای همیشه.
            </p>
            <MagneticLink
              href="/work"
              cursorLabel="ورود"
              className="sigil-copy-cta group mt-8 flex items-center gap-3 self-start font-sans text-xs tracking-[0.05em] text-bone"
            >
              <span className="border-b border-bone pb-1 transition-colors group-hover:border-acid group-hover:text-acid">
                ورود به گالری
              </span>
              <span aria-hidden>&#8592;</span>
            </MagneticLink>
          </div>

          <div
            ref={sigilWrapRef}
            aria-hidden
            className="pointer-events-none relative flex min-h-[46svh] flex-1 items-center justify-center sm:min-h-0"
          >
            <div className="relative aspect-square h-auto w-full max-w-[78svh] sm:max-w-[46vw] lg:max-w-[34vw]">
              <SunSigil />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
