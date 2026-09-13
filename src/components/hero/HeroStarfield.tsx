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

const STAR_COUNT = 60;

const STARS: { x: number; y: number; r: number; opacity: number }[] = (() => {
  const rnd = seeded(7);
  return Array.from({ length: STAR_COUNT }, () => {
    const x = 20 + rnd() * 68;
    const y = 4 + rnd() * 92;
    const roll = rnd();
    const r = roll < 0.12 ? 2.2 : roll < 0.4 ? 1.4 : 0.9;
    const opacity = 0.15 + rnd() * 0.45;
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
