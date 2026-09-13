"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion/variants";

interface RevealOnScrollProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  amount?: number;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}

/**
 * Scroll-triggered reveal. Uses `whileInView` so it works the same for
 * content revealed via native scroll or the Lenis smooth-scroll wrapper.
 */
export function RevealOnScroll({
  children,
  variants = fadeUp,
  className,
  amount = 0.3,
  delay = 0,
  as = "div",
}: RevealOnScrollProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
