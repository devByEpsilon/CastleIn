import {
  GAP_TEETH,
  INNER_TIPS,
  OUTER_SPIKES,
  RING_PATHS,
  SUNBURST_VIEWBOX,
  type GrowElement,
} from "./sunSigilGeometry";

function GrowFacets({
  el,
  className,
  facetGradients,
}: {
  el: GrowElement;
  className: string;
  facetGradients: [light: string, shadow: string];
}) {
  const [light, shadow] = facetGradients;
  return (
    <g className={`grow-el ${className}`} data-ox={el.ox} data-oy={el.oy}>
      <path
        fill={`url(#${light})`}
        stroke="#0a0c0f"
        strokeWidth={el.strokeWidth}
        strokeLinejoin="round"
        d={el.light}
      />
      <path
        fill={`url(#${shadow})`}
        stroke="#0a0c0f"
        strokeWidth={el.strokeWidth}
        strokeLinejoin="round"
        d={el.shadow}
      />
    </g>
  );
}

/**
 * The Chrome Sunburst — a spiky chrome ring: three concentric metallic
 * tubes with 16 small gap teeth, 16 inner tips, and 16 outer spikes (two
 * of them dominant "column" spikes at north/south) grown out of it.
 * The ring itself is always fully visible; SigilHero drives every
 * `.grow-el` from `scale: 0` via GSAP's svgOrigin, anchored at each
 * element's `data-ox`/`data-oy` — the exact point it shares with the ring.
 */
export function SunSigil() {
  return (
    <svg
      viewBox={SUNBURST_VIEWBOX}
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="حلقه‌ای فلزی و خارآلود که هنگام اسکرول از دلِ خودش رشد می‌کند — دندانه‌های ریز، نوک‌های داخلی و خارهای بیرونیِ بزرگ، به‌ترتیب از کوچک به بزرگ."
    >
      <defs>
        <linearGradient id="facetLight" gradientUnits="userSpaceOnUse" x1="150" y1="80" x2="420" y2="480">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#d6dbe1" />
          <stop offset="100%" stopColor="#8a93a0" />
        </linearGradient>
        <linearGradient id="facetShadow" gradientUnits="userSpaceOnUse" x1="150" y1="80" x2="420" y2="480">
          <stop offset="0%" stopColor="#7c838e" />
          <stop offset="55%" stopColor="#454b54" />
          <stop offset="100%" stopColor="#1e2126" />
        </linearGradient>
        <linearGradient id="tipLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#8a93a0" />
        </linearGradient>
        <linearGradient id="tipShadow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c838e" />
          <stop offset="100%" stopColor="#1a1d22" />
        </linearGradient>
        <radialGradient id="tube1Grad" gradientUnits="userSpaceOnUse" cx="300" cy="300" r="96">
          <stop offset="0.8854" stopColor="#4a505a" />
          <stop offset="0.94" stopColor="#f6f8fa" />
          <stop offset="1.0" stopColor="#b7bfc7" />
        </radialGradient>
        <radialGradient id="grooveGrad" gradientUnits="userSpaceOnUse" cx="300" cy="300" r="96">
          <stop offset="0.7708" stopColor="#454b54" />
          <stop offset="0.828" stopColor="#33383f" />
          <stop offset="0.8854" stopColor="#565d67" />
        </radialGradient>
        <radialGradient id="tube2Grad" gradientUnits="userSpaceOnUse" cx="300" cy="300" r="96">
          <stop offset="0.6458" stopColor="#d7dbe0" />
          <stop offset="0.708" stopColor="#fafbfc" />
          <stop offset="0.7708" stopColor="#8a93a0" />
        </radialGradient>
        <radialGradient id="specular" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="soften" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* ring — three concentric tubes, always fully visible; every
          grow-el below is anchored to a point on this ring */}
      <g data-phase="ring">
        {RING_PATHS.map((ring, i) => (
          <path
            key={i}
            fill={`url(#${ring.gradient})`}
            stroke="#0a0c0f"
            strokeWidth={0.75}
            fillRule="evenodd"
            d={ring.d}
          />
        ))}
      </g>

      {/* gap teeth — smallest, grow first */}
      <g data-phase="teeth">
        {GAP_TEETH.map((el, i) => (
          <GrowFacets key={i} el={el} className="gap-tooth" facetGradients={["tipLight", "tipShadow"]} />
        ))}
      </g>

      {/* inner tips — grow second */}
      <g data-phase="tips">
        {INNER_TIPS.map((el, i) => (
          <GrowFacets key={i} el={el} className="inner-tip" facetGradients={["tipLight", "tipShadow"]} />
        ))}
      </g>

      {/* outer spikes — biggest, grow last (columns included) */}
      <g data-phase="spikes">
        {OUTER_SPIKES.map((el, i) => (
          <GrowFacets
            key={i}
            el={el}
            className={el.isColumn ? "outer-spike outer-spike-column" : "outer-spike"}
            facetGradients={["facetLight", "facetShadow"]}
          />
        ))}
      </g>

      <ellipse
        className="sigil-specular"
        cx={255}
        cy={215}
        rx={90}
        ry={70}
        fill="url(#specular)"
        filter="url(#soften)"
        style={{ mixBlendMode: "screen" }}
      />
    </svg>
  );
}
