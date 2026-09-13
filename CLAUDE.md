@AGENTS.md

# CASTLEIN — Cyber Gothic Tattoo Artist

A digital exhibition, not a brochure. This is the portfolio site for a
fictional tattoo artist, Parsa Grami (پارسا گرمی), working under the studio
name CASTLEIN at the intersection of blackwork, gothic ornament, and machine
imagery. The site's job is to feel like an artifact of that world, not a
template that happens to show tattoos.

All site content is Farsi (Persian), rendered right-to-left (`dir="rtl"` /
`lang="fa"` on `<html>`). The "CASTLEIN" wordmark itself stays Latin, set in
a true blackletter face (`--font-blackletter`, Pirata One) — blackletter has
no Persian glyph coverage, so it's used only for that wordmark. Farsi
headings use `--font-display` (Lalezar) and body/UI text uses `--font-sans`
(Vazirmatn); `--font-mono` (JetBrains Mono) is reserved for actual Latin/
numeric content (dates, hours, index numbers), never for Farsi labels —
letter-spacing (`tracking-*`) breaks Persian letter-joining, so it's applied
only to Latin/numeric spans, not Farsi text. Use logical Tailwind utilities
(`start-`/`end-`, `ms-`/`me-`, `ps-`/`pe-`, `text-start`/`text-end`,
`border-s`/`border-e`) instead of physical `left`/`right` ones so layout
mirrors correctly under RTL.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19.2) — see `AGENTS.md` /
  `node_modules/next/dist/docs/` before assuming anything about Next APIs;
  this version genuinely differs from most training data (async `params`,
  Turbopack-by-default, `images.remotePatterns` not `domains`, etc).
- **TypeScript**, strict mode.
- **Tailwind CSS v4** — config lives in `src/app/globals.css` via `@theme`,
  not a `tailwind.config.js`. All design tokens are CSS custom properties on
  `:root`, re-exposed to Tailwind through `@theme inline`.
- **Framer Motion** for all component-level and scroll-driven animation.
- **Three.js / @react-three/fiber / @react-three/drei** for the WebGL hero
  relic (`src/components/three/`), lazy-loaded and optional.
- **Lenis** for smooth scrolling, skipped entirely under
  `prefers-reduced-motion`.
- No backend, no CMS, no database. Content is a typed TS array.

## Visual identity

- **Palette**: near-black void/ink/charcoal surfaces, off-white "bone" text,
  crimson and violet accent glows, acid green reserved for interactive
  highlights (cursor labels, focus rings). All defined as CSS variables in
  `globals.css` — change the palette there, not per-component.
- **Type**: `Lalezar` (Farsi display/headlines, bold single-weight) +
  `Vazirmatn` (Farsi body/UI, weights 300–900) + `Pirata One` (Latin
  blackletter, the "CASTLEIN" wordmark only) + `JetBrains Mono` (Latin/
  numeric metadata — dates, hours, numbering — with wide tracking; never
  applied to Farsi text, which loses its letter-joining under
  letter-spacing). Typography carries most of the visual weight; keep
  hero/section headings oversized (`vw`-based).
- **Imagery**: every artwork photo renders through `ArtworkFrame`
  (`src/features/artworks/components/ArtworkFrame.tsx`), which applies a
  shared duotone + tint treatment (`.duotone` in globals.css + a
  mix-blend-color overlay). This is what makes disparate source photography
  read as one coherent world — don't bypass it for one-off images.
- **Motion**: cinematic, expo-out easing (`--ease-out-cinematic` /
  `easeOutCinematic` in `lib/motion/variants.ts`), clip-path reveals over
  simple fades where it matters (hero, page transitions, artwork detail
  image). Reusable variants live in `lib/motion/variants.ts` — extend them
  rather than inventing new easing curves per component.

## Architecture

```
src/
  app/                      routes (App Router)
  components/
    layout/                 Navigation, Footer, SiteChrome (client shell)
    motion/                 CustomCursor, SmoothScroll, PageTransition, RevealOnScroll
    three/                  HeroCanvasLoader -> HeroScene -> GothicRelic
    ui/                     MagneticLink and other cross-cutting UI atoms
  features/
    artworks/
      types.ts              the Artwork domain model — the source of truth
      data.ts                fictional demo content (8 pieces)
      components/            ArtworkFrame, ArtworkCard, ArtworkGallery, ArtworkDetail
  lib/
    cn.ts                   tiny classnames helper (no dependency needed)
    motion/                 shared variants + reduced-motion / touch hooks
public/
  artworks/<slug>/           per-artwork placeholder art (see below)
  about/portrait.svg
scripts/
  generate-placeholders.mjs generates the placeholder SVGs
```

`RootLayout` (`app/layout.tsx`) stays a server component (fonts, metadata).
All interactivity — cursor, smooth scroll, nav, page transitions — lives in
`SiteChrome`, a client component it wraps around `children`. Keep that
split: don't add "use client" to the root layout itself.

## Content model

`src/features/artworks/types.ts` defines `Artwork`. `data.ts` holds 8
fictional pieces for a single artist identity. To add real content:

1. Drop photography into `public/artworks/<slug>/` (main image + optional
   gallery images).
2. Add/edit an entry in `data.ts` with matching `image.src` /
   `width`/`height` (real pixel dimensions — used for layout stability).
3. Nothing else needs to change — grid, detail page, prev/next nav, and
   metadata all derive from this array.

### Placeholder imagery — replace before shipping

All current artwork images are **procedurally generated abstract SVGs**
(dark radial fields, faint circuit/thorn linework, glowing rings), produced
by `scripts/generate-placeholders.mjs` and unified by the duotone/tint
treatment. This was a deliberate choice: an external placeholder image CDN
(picsum.photos) was tried first and is blocked in some network
environments (confirmed during development), which is an unacceptable
external dependency for a production site. The generated SVGs have zero
external dependencies, are tiny, and already match the visual system — but
they are still placeholders. Swap them for real tattoo photography before
launch; nothing else in the code needs to change when you do (see above).

`next.config.ts` enables `images.dangerouslyAllowSVG` specifically for
these locally-generated, trusted SVGs, locked down with a strict CSP and
forced-download disposition per Next.js's documented guidance. If you
replace placeholders with raster photography, you can remove that SVG
config — it isn't needed for JPG/PNG/WebP.

## Motion & accessibility rules

- Every animated component must respect `prefers-reduced-motion`. Use
  `useReducedMotionPreference()` (`lib/motion/useReducedMotion.ts`) — it's
  built on `useSyncExternalStore`, not an effect + `setState`, to avoid the
  cascading-render lint rule (`react-hooks/set-state-in-effect`). Follow the
  same pattern for any new "subscribe to a browser API" hook: prefer
  `useSyncExternalStore`, or the "adjust state during render" pattern (see
  `Navigation.tsx`'s route-change handling) over `useEffect(() =>
  setState(...))`.
- The custom cursor (`CustomCursor.tsx`) is desktop-only, gated on
  `useIsTouchDevice()`. Never assume it's present — every interactive
  element must work with a normal cursor/keyboard too. Add `data-cursor="…"`
  attributes to opt an element into a cursor label; don't wire up new
  pointer tracking elsewhere.
- The WebGL hero (`HeroCanvasLoader`) always has a static CSS fallback
  (a blurred radial-gradient orb) for: no WebGL support, and the brief
  window before the scene mounts. The rest of the homepage must never
  assume the Canvas rendered — treat it as decorative, not structural.
- Focus states are intentionally visible (`:focus-visible` uses the acid
  accent) — don't suppress outlines to "clean up" a component.

## Verification workflow

There's no browser test runner installed. When you need to visually check
work (Playwright's browser download is blocked in some sandboxes), use the
system browser headlessly:

```bash
npm run build && npm run start -- -p 4174   # background it
# Windows: system Edge can screenshot without any download
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
  --headless=new --window-size=1600,1000 \
  --screenshot=/tmp/shot.png http://localhost:4174/
```

For anything involving the WebGL canvas or JS-driven state, prefer
`puppeteer-core` (no bundled browser download) pointed at that same Edge
binary via `executablePath`, over the plain `--screenshot` CLI flag — the
CLI flag's headless mode has previously failed to render the Three.js scene
in time, while a real navigation + wait does not. Do not run `--disable-gpu`
when checking WebGL — it can suppress the software WebGL fallback path.

Always run, in this order, before considering a change done:
`npx tsc --noEmit`, `npx eslint .`, `npm run build`. `next lint` was removed
in Next 16 — always invoke ESLint directly.
