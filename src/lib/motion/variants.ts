import type { Transition, Variants } from "framer-motion";

/** Shared easing curves, mirroring the CSS custom properties in globals.css. */
export const easeOutCinematic: Transition["ease"] = [0.16, 1, 0.3, 1];
export const easeInOutCinematic: Transition["ease"] = [0.83, 0, 0.17, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOutCinematic },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: easeOutCinematic } },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.4 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 1.1, ease: easeOutCinematic },
  },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easeOutCinematic },
  },
};

export const lineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, ease: easeInOutCinematic } },
};
