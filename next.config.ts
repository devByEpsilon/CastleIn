import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Artwork photography is local JPG, no SVG involved. The about page's
    // portrait (/public/about/portrait.svg) is still SVG, so next/image
    // needs this — locked down with a strict CSP + forced download
    // disposition per Next.js's documented guidance.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
