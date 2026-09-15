import Link from "next/link";
import { capabilities, capabilitiesSectionHead } from "@/content/capabilities";

export default function Capabilities() {
  const homeCapabilities = capabilities.filter((cap) => cap.showOnHome);

  return (
    <section
      id="services"
      className="mx-auto max-w-content px-4 py-14 sm:px-8 sm:py-20 lg:px-14 lg:py-24"
    >
      <div className="mb-8 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <h2 className="text-balance font-display text-4xl leading-[0.98] sm:text-6xl lg:text-7xl">
          {capabilitiesSectionHead.heading}
        </h2>
        <span className="max-w-full font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint sm:max-w-[32ch] sm:text-right">
          {capabilitiesSectionHead.label}
        </span>
      </div>

      <div className="border-t border-line-strong">
        {homeCapabilities.map((cap, i) => (
          <Link
            key={cap.slug}
            href={`/services/${cap.slug}`}
            className="grid grid-cols-[64px_1fr] items-baseline gap-5 border-b border-line py-6 transition-colors hover:bg-surface2 focus-visible:bg-surface2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:grid-cols-[80px_1.1fr_1.4fr]"
          >
            <span className="font-mono text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-balance font-display text-3xl sm:text-4xl">{cap.title}</h3>
            <p className="mt-1.5 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-soft sm:mt-0">
              {cap.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-right">
        <Link
          href="/services"
          className="font-mono text-[13px] text-accent transition-colors hover:text-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          View all six practices →
        </Link>
      </div>
    </section>
  );
}
