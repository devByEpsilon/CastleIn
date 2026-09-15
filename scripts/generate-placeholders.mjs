// Generates local, dependency-free placeholder artwork as SVG.
// Run with: node scripts/generate-placeholders.mjs
// Replace any of these files under /public/artworks or /public/about with
// real photography later — filenames and directories are stable.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

function jaggedPath(rng, w, h, points, spread) {
  const cx = w / 2 + (rng() - 0.5) * w * 0.3;
  const cy = h / 2 + (rng() - 0.5) * h * 0.3;
  let d = `M ${cx} ${cy}`;
  let x = cx;
  let y = cy;
  for (let i = 0; i < points; i++) {
    const angle = rng() * Math.PI * 2;
    const dist = spread * (0.4 + rng() * 0.6);
    x += Math.cos(angle) * dist;
    y += Math.sin(angle) * dist;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

function generateSvg({ seedStr, width, height }) {
  const seed = hashSeed(seedStr);
  const rng = mulberry32(seed);

  const blobs = Array.from({ length: 3 + Math.floor(rng() * 2) }, () => ({
    cx: rng() * width,
    cy: rng() * height,
    r: (0.18 + rng() * 0.22) * Math.max(width, height),
    o: 0.08 + rng() * 0.14,
  }));

  const lines = Array.from({ length: 2 + Math.floor(rng() * 3) }, () =>
    jaggedPath(rng, width, height, 5 + Math.floor(rng() * 5), Math.min(width, height) * 0.09),
  );

  const ringCx = width * (0.3 + rng() * 0.4);
  const ringCy = height * (0.3 + rng() * 0.4);
  const ringR = Math.min(width, height) * (0.16 + rng() * 0.12);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="bg-${seed}" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#232228"/>
      <stop offset="55%" stop-color="#131217"/>
      <stop offset="100%" stop-color="#08080a"/>
    </radialGradient>
    <filter id="grain-${seed}">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0"/>
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg-${seed})"/>
  ${blobs
    .map(
      (b) =>
        `<circle cx="${b.cx.toFixed(1)}" cy="${b.cy.toFixed(1)}" r="${b.r.toFixed(1)}" fill="#ffffff" opacity="${b.o.toFixed(3)}"/>`,
    )
    .join("\n  ")}
  <circle cx="${ringCx.toFixed(1)}" cy="${ringCy.toFixed(1)}" r="${ringR.toFixed(1)}" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.35"/>
  <circle cx="${ringCx.toFixed(1)}" cy="${ringCy.toFixed(1)}" r="${(ringR * 1.4).toFixed(1)}" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.18"/>
  ${lines
    .map(
      (d) =>
        `<path d="${d}" fill="none" stroke="#ffffff" stroke-width="${(1 + rng() * 1.5).toFixed(1)}" stroke-linecap="round" opacity="${(0.25 + rng() * 0.3).toFixed(2)}"/>`,
    )
    .join("\n  ")}
  <rect width="${width}" height="${height}" filter="url(#grain-${seed})"/>
  <rect width="${width}" height="${height}" fill="url(#bg-${seed})" opacity="0.12"/>
</svg>`;
}

const artworkSeeds = [
  "void-serpent",
  "chrome-angel",
  "black-orchid",
  "demon-eye",
  "sacred-machine",
  "nocturnal-cross",
  "digital-thorn",
  "hollow-saint",
  "thorn-conduit",
  "crimson-fracture",
  "relic-of-thorns",
];

const sizes = {
  "void-serpent": [1400, 1750],
  "chrome-angel": [1500, 1200],
  "black-orchid": [1300, 1600],
  "demon-eye": [1400, 1400],
  "sacred-machine": [1500, 1875],
  "nocturnal-cross": [1300, 1700],
  "digital-thorn": [1400, 1750],
  "hollow-saint": [1500, 1200],
  "thorn-conduit": [1470, 1960],
  "crimson-fracture": [1200, 1600],
  "relic-of-thorns": [1470, 1960],
};

const galleryCount = {
  "void-serpent": 2,
  "chrome-angel": 1,
  "demon-eye": 1,
  "hollow-saint": 2,
};

for (const slug of artworkSeeds) {
  const dir = join(publicDir, "artworks", slug);
  mkdirSync(dir, { recursive: true });
  const [w, h] = sizes[slug];
  writeFileSync(join(dir, "main.svg"), generateSvg({ seedStr: slug, width: w, height: h }));

  const count = galleryCount[slug] ?? 0;
  for (let i = 0; i < count; i++) {
    writeFileSync(
      join(dir, `g${i + 1}.svg`),
      generateSvg({ seedStr: `${slug}-g${i + 1}`, width: w, height: i === 0 ? Math.round(w * 0.8) : h }),
    );
  }
}

// About page portrait
mkdirSync(join(publicDir, "about"), { recursive: true });
writeFileSync(
  join(publicDir, "about", "portrait.svg"),
  generateSvg({ seedStr: "castlein-portrait", width: 1200, height: 1500 }),
);

console.log(`Generated placeholder art for ${artworkSeeds.length} artworks.`);
