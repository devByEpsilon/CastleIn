"use client";

import type { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransition } from "@/components/motion/PageTransition";

/**
 * Client-side shell wrapping every route: smooth scroll, the fixed
 * navigation, the custom cursor, the grain overlay, and the footer.
 * Kept separate from RootLayout so the layout itself stays a server
 * component (metadata, fonts) while this owns interactivity.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <div aria-hidden className="grain" />
      <Navigation />
      <main id="main-content" className="relative">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
