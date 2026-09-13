"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Cinematic cross-route transition: the outgoing page wipes up and out while
 * the incoming page rises in behind it. Kept as a simple clip-path wipe
 * rather than shared-element morphing between gallery and detail pages —
 * true layoutId continuity across App Router navigations is fragile, while
 * this still reads as one continuous world thanks to the shared duotone
 * image treatment and identical typographic system on both ends.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0.6 }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        exit={{ clipPath: "inset(0% 0% 0% 100%)", opacity: 0.4 }}
        transition={{ duration: 0.65, ease: [0.83, 0, 0.17, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
