"use client";

/**
 * Ambient background stars scattered across the whole hero viewport, behind
 * the sunburst and copy — on every breakpoint, since the medallion-shaped
 * sunburst leaves open space around it even on mobile. Seeded (not
 * Math.random) so the layout is identical on server and client.
 */

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const STAR_COUNT = 90;

// Sizes/opacities skew brighter than a "realistic" faint starfield would —
// at 1-2px and low opacity most of these read as invisible against pure
// black on a real phone screen, which is what made the effect look like it
// only covered the top of the hero instead of the full viewport.
const STARS: { x: number; y: number; r: number; opacity: number }[] = (() => {
  const rnd = seeded(7);
  return Array.from({ length: STAR_COUNT }, () => {
    const x = 4 + rnd() * 92;
    const y = 3 + rnd() * 94;
    const roll = rnd();
    const r = roll < 0.15 ? 3.0 : roll < 0.45 ? 2.1 : 1.5;
    const opacity = 0.35 + rnd() * 0.55;
    return { x, y, r, opacity };
  });
})();

export function HeroStarfield() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2]"
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-bone"
          style={{
            insetInlineStart: `${s.x}%`,
            top: `${s.y}%`,
            width: s.r * 2,
            height: s.r * 2,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}
