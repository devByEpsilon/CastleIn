"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionPreference } from "@/lib/motion/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps the app in Lenis-driven smooth scrolling. Fully skipped when the
 * user prefers reduced motion — native scroll behavior takes over instead.
 *
 * Driven by gsap.ticker (rather than a bare rAF loop) and reports every
 * Lenis scroll tick to ScrollTrigger.update — the standard GSAP/Lenis
 * integration, needed so the Hero's scroll-scrubbed sigil timeline stays
 * in sync with smoothed scroll position instead of native scrollTop.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
