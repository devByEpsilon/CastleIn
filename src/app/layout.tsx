import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Lalezar, Pirata_One, Vazirmatn } from "next/font/google";
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
      className={`${lalezar.variable} ${pirataOne.variable} ${vazirmatn.variable} ${jetbrainsMono.variable} h-full`}
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
