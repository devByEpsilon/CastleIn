"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice } from "@/lib/motion/useReducedMotion";

/**
 * Desktop-only custom cursor. Reads a `data-cursor` attribute off whatever
 * element is currently hovered to decide its label ("VIEW", "OPEN", "MENU"…).
 * Disabled entirely on touch/coarse-pointer devices.
 */
export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const [label, setLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });

  useEffect(() => {
    if (isTouch) return;
    document.documentElement.classList.add("custom-cursor");

    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!isVisible) setIsVisible(true);

      const target = event.target as HTMLElement | null;
      const cursorEl = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(cursorEl?.dataset.cursor || null);
    }

    function handleLeave() {
      setIsVisible(false);
    }

    window.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("pointerleave", handleLeave);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [isTouch, isVisible, x, y]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      style={{ x: springX, y: springY, opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-bone bg-bone/10"
        animate={{
          width: label ? 88 : 14,
          height: label ? 88 : 14,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-sans text-[10px] text-bone"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
