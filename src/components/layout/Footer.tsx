import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-void px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p dir="ltr" className="font-[family-name:var(--font-blackletter)] text-2xl tracking-[0.04em] text-bone sm:text-3xl">
            CASTLEIN<span className="text-crimson-glow">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm text-bone-dim">
            بلک‌ورک سفارشی، تزئینات گوتیک و تصویرسازی ماشینی. هر اثر،
            ماندگار طراحی شده است.
          </p>
        </div>

        <nav aria-label="فوتر" className="grid grid-cols-2 gap-x-10 gap-y-2 font-sans text-xs text-ash sm:flex sm:gap-10">
          <Link href="/work" data-cursor="باز کردن" className="transition-colors hover:text-acid">
            آثار
          </Link>
          <Link href="/about" data-cursor="باز کردن" className="transition-colors hover:text-acid">
            درباره
          </Link>
          <Link href="/contact" data-cursor="باز کردن" className="transition-colors hover:text-acid">
            تماس
          </Link>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            data-cursor="مشاهده"
            className="transition-colors hover:text-acid"
          >
            اینستاگرام
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-line pt-6 font-sans text-[11px] text-ash sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} استودیوی پارسا گرمی</span>
        <span>مکان نامشخص — فقط با وقت قبلی</span>
      </div>
    </footer>
  );
}
