import Link from "next/link";
import { caseStudies, workSectionHead, type CaseStudy } from "@/content/case-studies";

export const workContainerGutter = "mx-auto max-w-content px-4 sm:px-8 lg:px-14";

function SquiggleUnderline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 280 14"
      className="pointer-events-none absolute -bottom-1 left-0 h-[0.5em] w-full text-bg"
      preserveAspectRatio="none"
    >
      <path
        d="M2 9 C 35 3, 70 12, 110 7 S 180 3, 220 8 S 255 11, 278 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M8 11 C 50 6, 90 13, 140 9 S 210 5, 270 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

const titleStyles = [
  "font-display text-[clamp(2rem,3.8vw,3rem)] font-semibold italic leading-[1.05] tracking-[-0.02em]",
  "font-display text-[clamp(2rem,3.8vw,3rem)] font-bold lowercase leading-none tracking-[-0.03em]",
  "font-display text-[clamp(2rem,3.8vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em]",
  "font-display text-[clamp(2rem,3.8vw,3rem)] font-medium leading-[1.05] tracking-[-0.01em]",
] as const;

export function WorkShowcaseIntro({ dark = true }: { dark?: boolean }) {
  const textMuted = dark ? "text-bg/55" : "text-ink-soft";
  const textMain = dark ? "text-bg" : "text-ink";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-x-14">
      <div>
        <p className={`font-mono text-[11px] uppercase tracking-[0.14em] ${textMuted}`}>
          {workSectionHead.eyebrow}
        </p>
        <h2
          className={`mt-5 max-w-[18ch] font-display text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[1.12] tracking-[-0.02em] ${textMain}`}
        >
          {workSectionHead.headingLead}{" "}
          <span className="relative inline-block">
            {workSectionHead.headingAccent}
            <SquiggleUnderline />
          </span>
        </h2>
      </div>
      <p
        className={`max-w-[36ch] text-[clamp(0.95rem,1.2vw,1.125rem)] leading-[1.55] lg:justify-self-end lg:pb-1 ${textMuted}`}
      >
        {workSectionHead.description}
      </p>
    </div>
  );
}

export function WorkShowcaseCard({
  study,
  index,
  total = caseStudies.length,
  dark = true,
}: {
  study: CaseStudy;
  index: number;
  total?: number;
  dark?: boolean;
}) {
  const indexLabel = `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
  const titleClass = titleStyles[index % titleStyles.length];

  return (
    <Link
      href={`/work#${study.slug}`}
      aria-label={study.client}
      className={`group relative flex min-h-[min(380px,52vh)] flex-col justify-between overflow-hidden p-6 transition-transform duration-300 ease-standard hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-[min(440px,56vh)] lg:min-h-[min(480px,58vh)] ${
        dark ? "bg-[#2A2D33] text-bg" : "bg-surface text-ink"
      }`}
    >
      {/* Hover cover — FunTown card image reveal */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-standard group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${study.cover.accent}66 0%, transparent 45%), linear-gradient(160deg, ${study.cover.from} 0%, ${study.cover.to} 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-ink/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <span
        className={`relative z-10 font-mono text-[11px] uppercase tracking-[0.08em] ${
          dark ? "text-bg/40 group-hover:text-bg/70" : "text-ink-faint"
        }`}
      >
        {indexLabel}
      </span>

      <div className="relative z-10 flex flex-1 flex-col justify-center py-8">
        <h3 className={`${titleClass} ${dark ? "text-bg" : "text-ink"}`}>
          {study.client}
        </h3>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className={`inline-flex items-center rounded-full px-4 py-2 text-[13px] font-medium leading-none transition-colors duration-200 ${
              dark
                ? "bg-bg text-ink group-hover:bg-bg/95"
                : "border border-line-strong text-ink-soft"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

/** FunTown-style: horizontal 3-up card row, page scrolls vertically */
export function WorkShowcaseGrid({ dark = true }: { dark?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {caseStudies.map((study, index) => (
        <WorkShowcaseCard
          key={study.slug}
          study={study}
          index={index}
          dark={dark}
        />
      ))}
    </div>
  );
}

export function WorkShowcaseSection({ dark = true }: { dark?: boolean }) {
  return (
    <section
      id="work"
      className={`relative ${dark ? "bg-ink text-bg" : "bg-bg text-ink"}`}
    >
      <div
        className={`${workContainerGutter} pb-24 pt-16 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24`}
      >
        <WorkShowcaseIntro dark={dark} />
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <WorkShowcaseGrid dark={dark} />
        </div>
        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href={workSectionHead.ctaHref}
            className={`inline-flex h-12 items-center rounded-full border px-8 text-[15px] font-medium transition-[background,border-color,color] duration-200 hover:border-accent hover:bg-accent hover:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              dark ? "border-bg/30 text-bg" : "border-line-strong text-ink"
            }`}
          >
            {workSectionHead.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
