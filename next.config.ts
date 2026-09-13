import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All artwork imagery ships locally as generated SVG placeholders (see
    // scripts/generate-placeholders.mjs) — no remote hosts are needed. SVG
    // is allowed through next/image only for our own trusted, locally
    // generated assets, locked down with a strict CSP + forced download
    // disposition per Next.js's documented guidance.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
