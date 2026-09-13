"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  { ssr: false, loading: () => null },
);

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Loads the WebGL hero scene only when it can actually render, and only
 * after the page has settled — otherwise renders a static gothic gradient
 * "relic" that carries the same visual role at near-zero cost. The rest of
 * the homepage never depends on which branch renders.
 */
export function HeroCanvasLoader() {
  const [webglOk] = useState(() =>
    typeof window === "undefined" ? true : isWebGLAvailable(),
  );
  const [status, setStatus] = useState<"checking" | "ready" | "fallback">(
    webglOk ? "checking" : "fallback",
  );

  useEffect(() => {
    if (!webglOk) return;
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setStatus("ready"), { timeout: 800 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setStatus("ready"), 200);
    return () => window.clearTimeout(id);
  }, [webglOk]);

  if (status !== "ready") {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          aria-hidden
          className="h-[45vmin] w-[45vmin] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,47,78,0.5), rgba(111,87,255,0.35) 45%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute h-[22vmin] w-[22vmin] rounded-full border border-line-strong"
          style={{ boxShadow: "0 0 80px 10px rgba(111,87,255,0.25)" }}
        />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <HeroScene />
    </div>
  );
}
