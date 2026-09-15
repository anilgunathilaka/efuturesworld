import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "@/content/site";

export const metadata: Metadata = {
  title: "Page Not Found | EFutures",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col gap-6 px-4 py-24 sm:px-8 sm:py-32 lg:px-14">
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
        {notFound.eyebrow}
      </span>
      <h1 className="max-w-[16ch] text-balance font-display text-4xl leading-none sm:text-6xl">
        {notFound.heading}
      </h1>
      <p className="max-w-[52ch] text-base leading-relaxed text-ink-soft">{notFound.body}</p>
      <div className="mt-2 flex flex-wrap gap-3.5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm border border-ink bg-ink px-[18px] py-[11px] text-[13px] font-semibold text-bg transition-colors hover:border-accent hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {notFound.primaryCtaLabel}
        </Link>
        <a
          href={`mailto:hello@efuturesworld.com?subject=${encodeURIComponent("Broken link on efuturesworld.com")}`}
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm border border-line-strong px-[18px] py-[11px] text-[13px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {notFound.secondaryCtaLabel}
        </a>
      </div>
    </div>
  );
}
