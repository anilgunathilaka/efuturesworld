import Link from "next/link";
import { finalCta } from "@/content/home";

export default function FinalCta() {
  return (
    <section className="bg-ink py-16 sm:py-24 lg:py-32">
      <div className="mx-auto flex max-w-content flex-col gap-7 px-4 sm:px-8 lg:px-14">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
          {finalCta.eyebrow}
        </span>
        <h2 className="max-w-[18ch] text-balance font-display text-5xl leading-[0.98] text-bg sm:text-7xl lg:text-8xl">
          {finalCta.headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <div className="mt-2 flex flex-wrap gap-3.5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm border border-accent bg-accent px-6 py-3.5 text-[14px] font-semibold text-bg transition-colors hover:border-white hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {finalCta.primaryCta}
          </Link>
          {/* No capability-deck asset exists yet; route to contact until one is published. */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm border border-white/30 px-6 py-3.5 text-[14px] font-semibold text-bg transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {finalCta.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
