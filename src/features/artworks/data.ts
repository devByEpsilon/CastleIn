import type { Artwork } from "./types";

/**
 * Real studio photography for a single artist identity: پارسا گرمی (Parsa
 * Grami), working under the studio name CASTLEIN. Each entry's `image` is
 * the best-lit shot of that piece; `gallery` holds the other angles/sessions
 * of the same tattoo so multiple photos of one piece render as one artwork
 * instead of duplicate cards.
 */
export const artworks: Artwork[] = [
  {
    id: "1",
    slug: "gothic-lily",
    title: "زنبق و خنجر",
    titleEn: "Lily & Dagger",
    category: "تزئین گوتیک",
    year: 2025,
    description:
      "خنجری گوتیک با تزئینات کلیسایی درهم‌تنیده که از میانش یک زنبق شکفته بیرون می‌زند، با خطوطی ظریف و پیوسته روی بازو.",
    statement:
      "خنجر و گل هیچ‌وقت با هم تضاد ندارند — هر دو چیزی را می‌برند تا رشد کنند. می‌خواستم چیزی سخت و چیزی زنده در یک نفس روی پوست بنشیند.",
    image: {
      src: "/artworks/gothic-lily/main.jpg",
      alt: "تتوی خط‌ظریف گوتیک؛ خنجری تزئینی با زنبقی شکفته روی بازو",
      width: 1600,
      height: 2133,
    },
    gallery: [
      {
        src: "/artworks/gothic-lily/g1.jpg",
        alt: "نمای نزدیک زنبق و بدنه تزئینی خنجر زیر نور طبیعی",
        width: 1600,
        height: 2133,
      },
      {
        src: "/artworks/gothic-lily/g2.jpg",
        alt: "نمای کامل بازو در نور کم‌رنگ، خنجر و زنبق و پروانه مجاور",
        width: 1600,
        height: 2133,
      },
      {
        src: "/artworks/gothic-lily/g3.jpg",
        alt: "زاویه‌ای دیگر از تتوی زنبق و خنجر روی بازو",
        width: 1600,
        height: 2133,
      },
    ],
    tags: ["زنبق", "خنجر", "خط‌ظریف", "بازو"],
    placement: "بازو",
    hours: 5,
    featured: true,
    size: "md",
  },
  {
    id: "2",
    slug: "gothic-cathedral",
    title: "کلیسای سیاه",
    titleEn: "Black Cathedral",
    category: "بلک‌ورک",
    year: 2025,
    description:
      "نمای یک کلیسای جامع گوتیک با شیشه‌های منقوش و برج‌های سوزنی، اجراشده با بلک‌ورک سنگین که در لبه‌ها می‌ترکد و می‌ریزد، انگار بنایی در حال فروپاشی.",
    statement:
      "کلیساهای گوتیک هزار سال ایستاده‌اند تا بالاخره فرو بریزند. خواستم آن لحظه فروپاشی را روی ران ثبت کنم — عظمت و ویرانی در یک طرح.",
    image: {
      src: "/artworks/gothic-cathedral/main.jpg",
      alt: "تتوی بلک‌ورک سنگین کلیسای جامع گوتیک روی ران با لبه‌های در حال فروپاشی",
      width: 1600,
      height: 2133,
    },
    gallery: [
      {
        src: "/artworks/gothic-cathedral/g1.jpg",
        alt: "نمای نزدیک شیشه منقوش و برج سوزنی کلیسا",
        width: 1600,
        height: 2133,
      },
      {
        src: "/artworks/gothic-cathedral/g2.jpg",
        alt: "نمای کامل کلیسای سیاه روی ران در نور روز",
        width: 1600,
        height: 2133,
      },
      {
        src: "/artworks/gothic-cathedral/g3.jpg",
        alt: "زاویه‌ای دیگر از تتوی کلیسای سیاه روی ران",
        width: 1600,
        height: 2133,
      },
    ],
    tags: ["کلیسا", "بلک‌ورک", "گوتیک", "ران"],
    placement: "ران",
    hours: 11,
    featured: true,
    size: "lg",
  },
  {
    id: "3",
    slug: "concrete-grenade",
    title: "نارنجک بتنی",
    titleEn: "Concrete Grenade",
    category: "کانسپچوال",
    year: 2024,
    description:
      "نارنجکی دستی که بدنه‌اش به آپارتمانی بتنی و فرسوده با تگ‌های گرافیتی بازسازی شده — شهر به‌عنوان مهمات، آماده انفجار.",
    statement:
      "بلوک‌های بتنی حومه‌ی شهر شبیه چاشنی‌اند؛ فقط منتظرند. خواستم بلوک زندگی و نارنجک جنگی یک شی‌ء باشند.",
    image: {
      src: "/artworks/concrete-grenade/main.jpg",
      alt: "تتوی نارنجک دستی با بدنه‌ای شبیه آپارتمان بتنی فرسوده و تگ‌های گرافیتی",
      width: 1600,
      height: 2133,
    },
    gallery: [
      {
        src: "/artworks/concrete-grenade/g1.jpg",
        alt: "زاویه‌ای دیگر از تتوی نارنجک بتنی روی بازو",
        width: 1600,
        height: 2133,
      },
    ],
    tags: ["نارنجک", "بتن", "گرافیتی", "کانسپچوال"],
    placement: "بازو",
    hours: 4,
    featured: true,
    size: "sm",
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
