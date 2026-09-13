"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  strength?: number;
  cursorLabel?: string;
}

/**
 * A link that pulls subtly toward the pointer when hovered — used for
 * primary CTAs. Falls back to a plain link on touch devices automatically
 * since pointer move never fires there.
 */
export function MagneticLink({
  href,
  children,
  className,
  strength = 0.35,
  cursorLabel,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function handlePointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      style={{ x: springX, y: springY, display: "inline-block", maxWidth: "100%" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Link
        ref={ref}
        href={href}
        data-cursor={cursorLabel}
        className={cn(
          "inline-flex items-center justify-center transition-colors duration-300",
          className,
        )}
      >
        {children}
      </Link>
    </motion.span>
  );
}
