"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navCta } from "@/content/home";
import { navLinks } from "@/content/site";
import PillCta from "@/components/PillCta";

const SCROLL_THRESHOLD = 40;

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-0 bg-transparent pt-4">
      <div
        className={`mx-auto flex w-full flex-col gap-2.5 transition-[max-width,padding] duration-500 ease-standard motion-reduce:transition-none ${
          scrolled ? "max-w-header-pill px-4" : "max-w-content px-4 sm:px-8 lg:px-14"
        }`}
      >
        <div
          className={`grid h-[72px] min-h-[72px] w-full items-center rounded-full border transition-[background,border-color,box-shadow,backdrop-filter,padding,gap,grid-template-columns] duration-500 ease-standard motion-reduce:transition-none ${
            scrolled
              ? "grid-cols-[auto_1fr_auto] gap-7 border-line bg-bg/85 px-2 py-2 pl-6 shadow-[0_10px_40px_rgba(13,15,18,0.08)] backdrop-blur-[22px] sm:px-3 sm:pl-6"
              : "grid-cols-[1fr_auto_1fr] gap-5 border-transparent bg-transparent px-0 py-2 shadow-none backdrop-blur-none"
          }`}
        >
          <Link
            href="/"
            className="motion-safe:animate-[rise_0.5s_ease_both] grid shrink-0 items-center justify-self-start"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/efutures.webp"
              alt="EFutures — Inspiring Solutions"
              width={590}
              height={104}
              className={`col-start-1 row-start-1 h-7 w-auto transition-opacity duration-300 ease-standard motion-reduce:transition-none sm:h-8 ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
              priority
            />
            <Image
              src="/images/efutures-icon.webp"
              alt=""
              width={168}
              height={104}
              className={`col-start-1 row-start-1 h-7 w-auto transition-opacity duration-300 ease-standard motion-reduce:transition-none sm:h-8 ${
                scrolled ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden
              priority
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden min-w-0 items-center justify-center lg:flex"
          >
            <div className="flex items-center gap-1">
              {navLinks.map((link, i) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    style={{ animationDelay: `${0.08 + i * 0.05}s` }}
                    className={`motion-safe:animate-[rise_0.5s_ease_both] inline-flex items-center whitespace-nowrap rounded-full px-3 py-2.5 text-[15px] font-medium transition-[background,color] duration-200 ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      isActive
                        ? "bg-accent-tint text-accent"
                        : "text-ink hover:bg-ink/[0.06] hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center justify-self-end gap-3">
            <PillCta
              href="/contact"
              label={navCta}
              className="motion-safe:animate-[rise_0.5s_ease_both] hidden lg:inline-flex"
            />

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`motion-safe:animate-[rise_0.5s_ease_both] inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border transition-colors duration-200 ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden ${
                scrolled
                  ? "border-line-strong bg-surface"
                  : "border-line-strong bg-bg/80 backdrop-blur-sm"
              }`}
            >
              <span
                className={`block h-0.5 w-4 rounded-full bg-ink transition-transform duration-200 ease-standard ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4 rounded-full bg-ink transition-opacity duration-200 ease-standard ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4 rounded-full bg-ink transition-transform duration-200 ease-standard ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="motion-safe:animate-[nav-menu-in_0.35s_ease-standard_both] overflow-hidden rounded-3xl border border-line bg-bg/95 shadow-[0_18px_48px_rgba(13,15,18,0.12)] backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      isActive
                        ? "bg-accent-tint text-accent"
                        : "text-ink-soft hover:bg-surface hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-line p-3">
              <PillCta
                href="/contact"
                label={navCta}
                onClick={() => setOpen(false)}
                className="w-full justify-between"
              />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
