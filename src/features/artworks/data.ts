import type { Artwork } from "./types";

/**
 * Fictional demo content for a single artist identity: پارسا گرمی (Parsa
 * Grami), working under the studio name CASTLEIN.
 *
 * All imagery is generated locally as abstract placeholder art (see
 * scripts/generate-placeholders.mjs) so the site has zero external image
 * dependencies. To swap in real photography, replace the files under
 * /public/artworks/<slug>/ with matching filenames (main.svg -> main.jpg,
 * etc.) and update image.src / width / height below to match — nothing
 * else in the app needs to change.
 */
export const artworks: Artwork[] = [
  {
    id: "1",
    slug: "void-serpent",
    title: "مار خلأ",
    category: "بلک‌ورک",
    year: 2025,
    description:
      "ماری پیچیده که با بلک‌ورک پررنگ اجرا شده، فلس‌هایش در انتهای دم به نویز مداری تبدیل می‌شود.",
    statement:
      "مار قدیمی‌ترین نمادی است که همیشه به آن بازمی‌گردم — پوست‌اندازی، بازسازی، هرگز تمام‌نشده. اینجا در نویز حل می‌شود، نیمی حیوان، نیمی سیگنال.",
    image: { src: "/artworks/void-serpent/main.svg", alt: "تتوی بلک‌ورک ماری پیچیده روی ساعد که دمش به خطوط ریز مداری تبدیل می‌شود", width: 1400, height: 1750 },
    gallery: [
      { src: "/artworks/void-serpent/g1.svg", alt: "جزئیات خطوط فلس‌های مار", width: 1400, height: 1050 },
      { src: "/artworks/void-serpent/g2.svg", alt: "نمای کامل اثر مار خلأ روی ساعد", width: 1400, height: 1750 },
    ],
    tags: ["مار", "بلک‌ورک", "مدار", "ساعد"],
    placement: "ساعد",
    hours: 6,
    featured: true,
    size: "xl",
  },
  {
    id: "2",
    slug: "chrome-angel",
    title: "فرشته کروم",
    category: "سایبرنتیک",
    year: 2025,
    description:
      "فرشته‌ای سقوط‌کرده که با آبکاری کروم و سیم‌کشی نمایان بازسازی شده، بال‌هایی مثل ماشین‌آلات شکسته تا خورده.",
    statement:
      "فرشته‌ها در متون کهن هرگز مهربان نبودند. می‌خواستم چیزی نزدیک به همان باشد — بدنی از فلز، هنوز قادر به سقوط.",
    image: { src: "/artworks/chrome-angel/main.svg", alt: "تتوی فرشته سایبرنتیک با بال‌های آبکاری‌شده کروم و مفاصل مکانیکی نمایان", width: 1500, height: 1200 },
    gallery: [
      { src: "/artworks/chrome-angel/g1.svg", alt: "نمای نزدیک جزئیات بال فرشته کروم", width: 1400, height: 1750 },
    ],
    tags: ["فرشته", "سایبر", "کروم", "پشت"],
    placement: "بالای پشت",
    hours: 14,
    featured: true,
    size: "lg",
  },
  {
    id: "3",
    slug: "black-orchid",
    title: "ارکیده سیاه",
    category: "فاین‌لاین",
    year: 2024,
    description:
      "ارکیده‌ای تک‌رنگ که گلبرگ‌هایش با خطوطی نازک و پیوسته روی استخوان ترقوه کشیده شده است.",
    image: { src: "/artworks/black-orchid/main.svg", alt: "تتوی فاین‌لاین ارکیده سیاه روی استخوان ترقوه", width: 1300, height: 1600 },
    tags: ["ارکیده", "فاین‌لاین", "گیاهی"],
    placement: "استخوان ترقوه",
    hours: 3,
    size: "sm",
  },
  {
    id: "4",
    slug: "demon-eye",
    title: "چشم دیو",
    category: "اکالت",
    year: 2024,
    description:
      "چشمی خیره و بی‌پلک درون طلسمی شکسته، که از داخل مچ دست نگاه می‌کند.",
    statement:
      "یک طلسم محافظ است، نه یک تهدید. چیزی که مراقب دستت هست تا خودت مجبور نباشی.",
    image: { src: "/artworks/demon-eye/main.svg", alt: "تتوی چشم اکالت محصور در طلسمی شکسته روی داخل مچ دست", width: 1400, height: 1400 },
    gallery: [
      { src: "/artworks/demon-eye/g1.svg", alt: "زاویه‌ای دیگر از طلسم چشم دیو", width: 1400, height: 1400 },
    ],
    tags: ["چشم", "طلسم", "اکالت", "مچ دست"],
    placement: "داخل مچ دست",
    hours: 4,
    featured: true,
    size: "md",
  },
  {
    id: "5",
    slug: "sacred-machine",
    title: "ماشین مقدس",
    category: "سایبرنتیک",
    year: 2023,
    description:
      "صندوقچه‌ای مقدس که به موتوری پیستونی بازسازی شده، طرح‌های تزئینی گوتیک درهم‌تنیده با فشارسنج‌ها و لوله‌کشی.",
    image: { src: "/artworks/sacred-machine/main.svg", alt: "تتوی صندوقچه مقدس گوتیک درهم‌تنیده با پیستون‌های مکانیکی و لوله‌کشی", width: 1500, height: 1875 },
    tags: ["ماشین", "صندوقچه مقدس", "گوتیک", "آستین کامل"],
    placement: "آستین کامل",
    hours: 22,
    size: "lg",
  },
  {
    id: "6",
    slug: "nocturnal-cross",
    title: "صلیب شبانه",
    category: "تزئین گوتیک",
    year: 2023,
    description:
      "صلیبی وارونه پیچیده در پیچک خاردار، که طرح‌های کلیسای جامع از میله عرضی آن جاری می‌شود.",
    image: { src: "/artworks/nocturnal-cross/main.svg", alt: "تتوی تزئینی گوتیک صلیب پیچیده در پیچک خاردار", width: 1300, height: 1700 },
    tags: ["صلیب", "خار", "کلیسای جامع", "ستون فقرات"],
    placement: "ستون فقرات",
    hours: 8,
    size: "md",
  },
  {
    id: "7",
    slug: "digital-thorn",
    title: "خار دیجیتال",
    category: "سایبرنتیک",
    year: 2022,
    description:
      "بوته‌ای از خارها که نوک‌هایشان پیکسل‌پیکسل می‌شود، مثل داده‌ای فاسد روی قفسه سینه رشد می‌کند.",
    image: { src: "/artworks/digital-thorn/main.svg", alt: "تتوی بوته خاردار که به نویز دیجیتال روی قفسه سینه تبدیل می‌شود", width: 1400, height: 1750 },
    tags: ["خار", "گلیچ", "قفسه سینه"],
    placement: "قفسه سینه",
    hours: 7,
    size: "sm",
  },
  {
    id: "8",
    slug: "hollow-saint",
    title: "قدیس تهی",
    category: "اکالت",
    year: 2022,
    description:
      "قدیسی بی‌چهره درون هاله‌ای شکسته، که ردایش در لبه به نویز تبدیل می‌شود.",
    statement:
      "هر قدیسی که می‌کشم کمی بیشتر چهره‌اش را از دست می‌دهد. مطمئن نیستم این درباره من چه می‌گوید.",
    image: { src: "/artworks/hollow-saint/main.svg", alt: "تتوی قدیس بی‌چهره با هاله‌ای شکسته که در نویز حل می‌شود", width: 1500, height: 1200 },
    gallery: [
      { src: "/artworks/hollow-saint/g1.svg", alt: "جزئیات هاله شکسته قدیس تهی", width: 1400, height: 1750 },
      { src: "/artworks/hollow-saint/g2.svg", alt: "نمای کامل اثر قدیس تهی روی ران", width: 1400, height: 1750 },
    ],
    tags: ["قدیس", "هاله", "اکالت", "ران"],
    placement: "ران",
    hours: 11,
    featured: true,
    size: "md",
  },
];

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getAdjacentArtworks(slug: string): {
  previous: Artwork | undefined;
  next: Artwork | undefined;
} {
  const index = artworks.findIndex((a) => a.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  const previous = artworks[(index - 1 + artworks.length) % artworks.length];
  const next = artworks[(index + 1) % artworks.length];
  return { previous, next };
}

export const featuredArtworks = artworks.filter((a) => a.featured);
