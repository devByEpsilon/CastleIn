"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/", label: "خانه", number: "00" },
  { href: "/work", label: "آثار", number: "01" },
  { href: "/about", label: "درباره", number: "02" },
  { href: "/contact", label: "تماس", number: "03" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the menu on navigation. Adjusted during render (React's
  // recommended pattern for "reset state when a prop changes") rather than
  // in an effect, so it can't cause an extra cascading render.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[110] flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <Link
          href="/"
          data-cursor="خانه"
          dir="ltr"
          className="font-[family-name:var(--font-blackletter)] text-xl tracking-[0.06em] text-bone sm:text-2xl"
        >
          CASTLEIN<span className="text-crimson-glow">.</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          data-cursor={open ? "بستن" : "منو"}
          className="group relative z-[130] flex items-center gap-3 font-sans text-xs text-bone"
        >
          <span>{open ? "بستن" : "منو"}</span>
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-line-strong">
            <span
              className={cn(
                "absolute h-[1px] w-3.5 bg-bone transition-transform duration-300",
                open ? "rotate-45" : "-translate-y-[3px]",
              )}
            />
            <span
              className={cn(
                "absolute h-[1px] w-3.5 bg-bone transition-transform duration-300",
                open ? "-rotate-45" : "translate-y-[3px]",
              )}
            />
          </span>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="منوی سایت"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-[120] flex flex-col justify-between bg-void px-5 pt-24 pb-10 sm:px-8"
          >
            <nav aria-label="ناوبری اصلی" className="flex flex-1 flex-col justify-center gap-2">
              {LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <Link
                      href={link.href}
                      data-cursor="باز کردن"
                      className={cn(
                        "group flex items-baseline gap-4 font-display text-[14vw] leading-[0.95] transition-colors duration-300 sm:text-[7vw]",
                        isActive ? "text-chrome" : "text-bone-dim hover:text-bone",
                      )}
                    >
                      <span className="font-mono text-xs tracking-widest text-ash sm:text-sm" dir="ltr">
                        {link.number}
                      </span>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col gap-6 border-t border-line pt-6 font-sans text-xs text-ash sm:flex-row sm:items-center sm:justify-between"
            >
              <span>تأسیس 2019 — استودیو با وقت قبلی</span>
              <div className="flex gap-6">
                <a
                  href="mailto:booking@castlein.example"
                  data-cursor="ایمیل"
                  className="text-bone-dim transition-colors hover:text-acid"
                >
                  ایمیل
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="مشاهده"
                  className="text-bone-dim transition-colors hover:text-acid"
                >
                  اینستاگرام
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
