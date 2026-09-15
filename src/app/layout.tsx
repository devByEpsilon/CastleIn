import type { Metadata, Viewport } from "next";
import {
  Cinzel,
  EB_Garamond,
  JetBrains_Mono,
  Lalezar,
  Pirata_One,
  Vazirmatn,
} from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";

/**
 * Bold Persian display face carrying the gothic mood for headings —
 * blackletter proper doesn't cover Arabic-script glyphs, so this is the
 * closest dramatic, heavy-stroke equivalent that actually renders Farsi.
 */
const lalezar = Lalezar({
  variable: "--font-lalezar",
  subsets: ["arabic"],
  weight: ["400"],
});

/**
 * True Latin blackletter, reserved for the "CASTLEIN" wordmark only — it has
 * zero Persian glyph coverage, so it never touches body or Farsi copy.
 */
const pirataOne = Pirata_One({
  variable: "--font-pirata",
  subsets: ["latin"],
  weight: ["400"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/**
 * Ornate gothic serif for the tarot-card numeral + English title band —
 * engraved, Latin only (see TarotCard). Never used for Farsi copy.
 *
 * Note: the more ornamental "Cinzel Decorative" cut triggers a
 * "Cinzel is not defined" ReferenceError in Turbopack's `next dev` font
 * codegen on this Next.js version (production `next build` is unaffected).
 * Plain Cinzel gives nearly the same engraved-caps look without the bug.
 */
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600", "700", "900"],
});

/** Small italic serif for the tarot-card studio byline/signature line. */
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://castlein.example"),
  title: {
    default: "کسلین — تتوی گوتیک سایبری",
    template: "%s — کسلین",
  },
  description:
    "کسلین اثر پارسا گرمی، هنرمندی در تلاقی بلک‌ورک، تزئینات گوتیک و تصویرسازی ماشینی. آثار سفارشی، برای همیشه ماندگار.",
  keywords: [
    "هنرمند تتو",
    "تتوی بلک‌ورک",
    "تتوی گوتیک",
    "تتوی سایبرنتیک",
    "طراحی تتوی سفارشی",
  ],
  openGraph: {
    title: "کسلین — تتوی گوتیک سایبری",
    description: "بلک‌ورک، تزئینات گوتیک و تصویرسازی ماشینی. آثار سفارشی، برای همیشه ماندگار.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${lalezar.variable} ${pirataOne.variable} ${vazirmatn.variable} ${jetbrainsMono.variable} ${cinzel.variable} ${ebGaramond.variable} h-full`}
    >
      <body className="min-h-full bg-void text-bone antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[200] focus:bg-acid focus:text-void focus:px-4 focus:py-2 focus:font-mono focus:text-xs"
        >
          رفتن به محتوا
        </a>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
