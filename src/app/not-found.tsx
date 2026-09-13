import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <p className="font-sans text-xs tracking-[0.1em] text-crimson-glow">
        404 — سیگنال قطع شد
      </p>
      <h1 className="mt-6 font-display text-[20vw] leading-none text-chrome sm:text-[12vw]">
        خلأ
      </h1>
      <p className="mt-6 max-w-sm text-bone-dim">
        هر چه اینجا بود، دوباره به نویز تبدیل شد. گاهی این‌طور می‌شود.
      </p>
      <Link
        href="/"
        data-cursor="خانه"
        className="mt-10 border-b border-bone pb-1 font-sans text-xs tracking-[0.1em] text-bone transition-colors hover:border-acid hover:text-acid"
      >
        بازگشت به خانه
      </Link>
    </div>
  );
}
