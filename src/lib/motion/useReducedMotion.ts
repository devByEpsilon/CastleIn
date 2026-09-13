"use client";

import { useSyncExternalStore } from "react";

function subscribeToMedia(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribeToMedia(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True when the user has requested reduced motion at the OS level. */
export function useReducedMotionPreference(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on touch-primary devices without a fine pointer (used to gate cursor/hover-only effects). */
export function useIsTouchDevice(): boolean {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}
