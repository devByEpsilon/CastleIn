/**
 * Procedural geometry for the Chrome Sunburst — a spiky chrome ring, hand-
 * specified (not traced from a photo): three concentric tubes at the
 * center, 16 outer spikes (two of them dominant "column" spikes at north/
 * south), 16 small gap teeth between them, and 16 inner tips pointing into
 * the hole. All of it is generated from angle/radius math rather than
 * hand-plotted points, since true radial symmetry is what the math is for.
 * SigilHero grows every piece out of the ring on scroll via GSAP's
 * svgOrigin, anchored at the `ox`/`oy` point each piece shares with the
 * ring — see GrowElement below.
 */

export const SUNBURST_VIEWBOX = "0 0 600 600";
export const SUNBURST_CENTER: [number, number] = [300, 300];

const [CX, CY] = SUNBURST_CENTER;
const D2R = Math.PI / 180;

// ring radii, outer to inner
export const R_OUT = 96;
export const R1 = 85;
export const R2 = 74;
export const R_IN = 62;

// The ring's "draw itself" reveal — a stroked circle along the ring's
// midline, thick enough to mask the full tube, traced via
// stroke-dasharray/dashoffset like a compass sweeping a circle.
export const RING_MID_R = (R_OUT + R_IN) / 2;
export const RING_TRACE_STROKE_WIDTH = R_OUT - R_IN + 4;
export const RING_CIRCUMFERENCE = 2 * Math.PI * RING_MID_R;

function polar(deg: number, r: number): [number, number] {
  const a = deg * D2R;
  return [CX + r * Math.sin(a), CY - r * Math.cos(a)];
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

function tri(p1: [number, number], p2: [number, number], p3: [number, number]): string {
  return `M ${round(p1[0])},${round(p1[1])} L ${round(p2[0])},${round(p2[1])} L ${round(p3[0])},${round(p3[1])} Z`;
}

export interface GrowElement {
  light: string;
  shadow: string;
  ox: number;
  oy: number;
  strokeWidth: number;
}

/** Facet pair growing OUTWARD from rBase to rBase+length, centered on angle deg. */
function outwardFacets(deg: number, halfWidth: number, rBase: number, length: number, strokeWidth: number): GrowElement {
  const base1 = polar(deg - halfWidth, rBase);
  const base2 = polar(deg + halfWidth, rBase);
  const baseC = polar(deg, rBase);
  const tip = polar(deg, rBase + length);
  return {
    light: tri(base1, tip, baseC),
    shadow: tri(baseC, tip, base2),
    ox: round(baseC[0]),
    oy: round(baseC[1]),
    strokeWidth,
  };
}

/** Facet pair growing INWARD from rBase to rBase-length, centered on angle deg. */
function inwardFacets(deg: number, halfWidth: number, rBase: number, length: number, strokeWidth: number): GrowElement {
  const base1 = polar(deg - halfWidth, rBase);
  const base2 = polar(deg + halfWidth, rBase);
  const baseC = polar(deg, rBase);
  const tip = polar(deg, rBase - length);
  return {
    light: tri(base1, tip, baseC),
    shadow: tri(baseC, tip, base2),
    ox: round(baseC[0]),
    oy: round(baseC[1]),
    strokeWidth,
  };
}

function outerSpikeLength(deg: number): number {
  const rad = deg * D2R;
  return 58 + 46 * (0.5 + 0.5 * Math.cos(4 * rad)) + 10 * Math.sin(7 * rad + 15 * D2R);
}

// ---------------------------------------------------------------------------
// Ring — three concentric tubes, always fully visible (nothing grows here)
// ---------------------------------------------------------------------------

export const RING_PATHS: { d: string; gradient: string }[] = [
  {
    gradient: "tube1Grad",
    d: `M 204,300 A 96,96 0 1,0 396,300 A 96,96 0 1,0 204,300 Z M 215,300 A 85,85 0 1,1 385,300 A 85,85 0 1,1 215,300 Z`,
  },
  {
    gradient: "grooveGrad",
    d: `M 215,300 A 85,85 0 1,0 385,300 A 85,85 0 1,0 215,300 Z M 226,300 A 74,74 0 1,1 374,300 A 74,74 0 1,1 226,300 Z`,
  },
  {
    gradient: "tube2Grad",
    d: `M 226,300 A 74,74 0 1,0 374,300 A 74,74 0 1,0 226,300 Z M 238,300 A 62,62 0 1,1 362,300 A 62,62 0 1,1 238,300 Z`,
  },
];

// ---------------------------------------------------------------------------
// Gap teeth — 16, at the midpoint angle between each pair of outer spikes
// ---------------------------------------------------------------------------

const GAP_TOOTH_LENGTH = 15;
const GAP_TOOTH_HALF_WIDTH = 2.6;
const GAP_TOOTH_STROKE = 0.4;

export const GAP_TEETH: GrowElement[] = Array.from({ length: 16 }, (_, k) => {
  const deg = 11.25 + k * 22.5;
  return outwardFacets(deg, GAP_TOOTH_HALF_WIDTH, R_OUT, GAP_TOOTH_LENGTH, GAP_TOOTH_STROKE);
});

// ---------------------------------------------------------------------------
// Inner tips — 16, pointing inward from r_in: 4 cardinals (big), 4
// diagonals (regular), 8 fillers (tiny) — evenly spaced every 22.5°
// ---------------------------------------------------------------------------

const INNER_TIP_STROKE = 0.4;

export const INNER_TIPS: GrowElement[] = Array.from({ length: 16 }, (_, k) => {
  const deg = k * 22.5;
  const [length, halfWidth] =
    k % 4 === 0 ? [32, 7.0] : k % 4 === 2 ? [20, 4.6] : [12, 3.0];
  return inwardFacets(deg, halfWidth, R_IN, length, INNER_TIP_STROKE);
});

// ---------------------------------------------------------------------------
// Outer spikes — 16, formula-driven length, except the two dominant
// "column" spikes at north (0°) and south (180°)
// ---------------------------------------------------------------------------

export interface OuterSpike extends GrowElement {
  isColumn: boolean;
}

export const OUTER_SPIKES: OuterSpike[] = Array.from({ length: 16 }, (_, k) => {
  const deg = k * 22.5;
  const isColumn = deg === 0 || deg === 180;
  const length = isColumn ? 132 : outerSpikeLength(deg);
  const halfWidth = isColumn ? 8.6 : 5.6;
  const strokeWidth = isColumn ? 0.7 : 0.6;
  return { ...outwardFacets(deg, halfWidth, R_OUT, length, strokeWidth), isColumn };
});
