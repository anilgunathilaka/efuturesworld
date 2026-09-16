import Link from "next/link";
import {
  caseStudies,
  getFeaturedCaseStudies,
  workSectionHead,
  type CaseStudy,
} from "@/content/case-studies";

export const workContainerGutter = "mx-auto max-w-content px-4 sm:px-8 lg:px-14";

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.5 10.5L10.5 3.5M10.5 3.5H5M10.5 3.5V9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardOverlay({ study }: { study: CaseStudy }) {
  const overlay = study.cardOverlay;
  if (!overlay) return null;

  if (overlay.kind === "chip") {
    return (
      <div className="absolute inset-x-0 top-[18%] bottom-28 z-[1] flex items-center justify-center px-6 sm:px-8">
        <div className="flex max-w-[min(100%,20rem)] items-center gap-3 rounded-2xl border border-white/20 bg-white/95 px-3.5 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm">
          <span
            aria-hidden
            className="h-11 w-11 shrink-0 rounded-xl"
            style={{
              background: `linear-gradient(145deg, ${study.cover.accent} 0%, ${study.cover.from} 100%)`,
            }}
          />
          <div className="min-w-0">
            <p className="text-[13px] font-medium leading-snug text-ink">
              {overlay.text}
            </p>
            {overlay.subtext ? (
              <p className="mt-0.5 text-[11px] text-ink-soft">{overlay.subtext}</p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  if (overlay.kind === "statement") {
    return (
      <div className="absolute inset-x-0 top-[16%] bottom-24 z-[1] flex items-center justify-center px-6">
        <p className="max-w-[12ch] text-center font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bg">
          {overlay.text}
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 top-[16%] bottom-24 z-[1] flex items-center justify-center px-6">
      <p className="max-w-[14ch] text-center font-display text-[clamp(2rem,4vw,3rem)] font-semibold italic leading-[1.1] tracking-[-0.02em] text-accent">
        {overlay.text}
      </p>
    </div>
  );
}

/** Arcads-style bento card: photo plane, tag, mid overlay, footer CTA row */
export function WorkShowcaseCard({
  study,
  tall = false,
  compact = false,
}: {
  study: CaseStudy;
  /** Spans both rows in the bento */
  tall?: boolean;
  /** Light variant for /work detail listing */
  compact?: boolean;
}) {
  return (
    <Link
      href={`/work#${study.slug}`}
      aria-label={`${study.client}: ${study.cardTitle}`}
      className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
        tall
          ? "min-h-[min(560px,72vh)] md:min-h-0 md:row-span-2"
          : compact
            ? "min-h-[280px]"
            : "min-h-[min(260px,36vh)] md:min-h-0"
      }`}
    >
      {/* Image / atmosphere plane */}
      <div
        aria-hidden
        className="absolute inset-0 transition-transform duration-500 ease-standard motion-safe:group-hover:scale-[1.03]"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 30% 20%, ${study.cover.accent}55 0%, transparent 55%),
            linear-gradient(165deg, ${study.cover.from} 0%, ${study.cover.to} 55%, #0a0c10 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[size:18px_18px] opacity-40"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent"
      />

      {!compact ? <CardOverlay study={study} /> : null}

      {/* Top tag */}
      <div className="relative z-10 flex items-start p-4 sm:p-5">
        <span className="rounded-md bg-bg/20 px-2.5 py-1 text-[12px] font-medium tracking-wide text-bg backdrop-blur-md">
          {study.cardTag}
        </span>
      </div>

      {/* Footer: accent arrow + title / blurb */}
      <div className="relative z-10 mt-auto flex items-end gap-3.5 p-4 sm:gap-4 sm:p-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-bg transition-colors duration-200 group-hover:bg-accent-deep sm:h-11 sm:w-11">
          <ArrowUpRight className="sm:h-4 sm:w-4" />
        </span>
        <div className="min-w-0 pb-0.5">
          <p className="font-display text-[15px] font-semibold leading-snug tracking-[-0.01em] text-bg sm:text-[16px]">
            {study.cardTitle}{" "}
            <span className="font-normal text-bg/65">{study.cardBlurb}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

/** Homepage bento: 1 tall + 2 stacked (Arcads layout) */
export function WorkShowcaseGrid() {
  const [featured, ...stacked] = getFeaturedCaseStudies();

  return (
    <div className="grid grid-cols-1 gap-3 md:min-h-[min(640px,78vh)] md:grid-cols-2 md:grid-rows-2 md:gap-4 lg:gap-5">
      <WorkShowcaseCard study={featured} tall />
      {stacked.map((study) => (
        <WorkShowcaseCard key={study.slug} study={study} />
      ))}
    </div>
  );
}

export function WorkShowcaseSection({
  dark = true,
  overlapHero = false,
  embedded = false,
  animateOpen = false,
}: {
  dark?: boolean;
  /** Pull Work up over the second half of the hero pin so it opens on the filled circle */
  overlapHero?: boolean;
  /** Inside sticky hero — tighter padding so pin ends flush with content */
  embedded?: boolean;
  /** FunTown-style: children get data attrs for scroll-driven open */
  animateOpen?: boolean;
}) {
  return (
    <section
      id="work"
      className={`relative z-20 ${overlapHero ? "-mt-[100svh]" : ""} ${
        dark ? "bg-ink text-bg" : "bg-bg text-ink"
      }`}
    >
      <div
        className={`${workContainerGutter} ${
          embedded
            ? "pb-16 pt-[max(4.5rem,calc(var(--site-header-offset)+1.25rem))] sm:pb-20 sm:pt-[max(5rem,calc(var(--site-header-offset)+1.5rem))]"
            : overlapHero || animateOpen
              ? "pb-24 pt-[max(4rem,calc(var(--site-header-offset)+0.75rem))] sm:pb-28 sm:pt-[max(4.5rem,calc(var(--site-header-offset)+1rem))] lg:pb-32 lg:pt-[max(5rem,calc(var(--site-header-offset)+1.25rem))]"
              : "pb-24 pt-16 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24"
        }`}
      >
        <h2
          data-work-open-headline={animateOpen ? "" : undefined}
          className={`mx-auto max-w-[18ch] text-balance text-center font-display text-[clamp(1.85rem,4.2vw,3rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-bg ${
            animateOpen ? "opacity-0" : ""
          }`}
        >
          {workSectionHead.headline}
        </h2>

        <div
          data-work-open-grid={animateOpen ? "" : undefined}
          className={`mt-10 sm:mt-12 lg:mt-14 ${animateOpen ? "opacity-0" : ""}`}
        >
          <WorkShowcaseGrid />
        </div>

        <div
          data-work-open-cta={animateOpen ? "" : undefined}
          className={`mt-10 flex justify-center sm:mt-12 ${animateOpen ? "opacity-0" : ""}`}
        >
          <Link
            href={workSectionHead.ctaHref}
            className="inline-flex h-12 items-center rounded-full border border-bg/30 px-8 text-[15px] font-medium text-bg transition-[background,border-color,color] duration-200 hover:border-accent hover:bg-accent hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {workSectionHead.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Flat grid for /work detail page (all studies) */
export function WorkShowcaseCardGrid({ dark = false }: { dark?: boolean }) {
  void dark;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {caseStudies.map((study) => (
        <WorkShowcaseCard key={study.slug} study={study} compact />
      ))}
    </div>
  );
}
