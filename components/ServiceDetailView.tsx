import Link from "next/link";
import type { ServiceDetail } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { primaryCta } from "@/content/home";

export default function ServiceDetailView({ service }: { service: ServiceDetail }) {
  const relatedCaseStudies = caseStudies.filter((study) =>
    service.relatedCaseStudySlugs?.includes(study.slug),
  );

  return (
    <>
      <div className="mx-auto max-w-content px-4 pb-8 pt-[calc(var(--site-header-offset)+1.5rem)] sm:px-8 sm:pb-10 sm:pt-[calc(var(--site-header-offset)+2rem)] lg:px-14 lg:pt-[calc(var(--site-header-offset)+2.5rem)]">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          Practice {service.practiceNumber}
        </span>
        <h1 className="mt-4 max-w-[20ch] text-balance font-display text-5xl leading-[0.98] sm:text-7xl lg:text-8xl">
          {service.heading}
        </h1>
        <p className="mt-6 max-w-[60ch] text-balance font-display text-2xl italic leading-snug text-accent sm:text-3xl">
          {service.hook}
        </p>
        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-ink-soft sm:text-lg">
          {service.intro}
        </p>
      </div>

      <section className="mx-auto max-w-content px-4 pb-14 sm:px-8 sm:pb-20 lg:px-14 lg:pb-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              What&rsquo;s included
            </span>
            <ul className="mt-4 flex flex-col gap-3 border-t border-line-strong pt-4">
              {service.included.map((item) => (
                <li
                  key={item}
                  className="border-b border-line pb-3 text-[14.5px] leading-relaxed text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="border-l-[3px] border-line border-l-accent bg-surface p-6 sm:p-8">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                Why EFutures
              </span>
              <p className="font-display text-xl italic leading-snug sm:text-2xl">
                {service.whyEfutures}
              </p>
            </div>

            {service.proof ? (
              <p className="border-t border-line-strong pt-4 font-mono text-[13px] leading-relaxed text-ink-faint">
                {service.proof}
              </p>
            ) : null}

            {relatedCaseStudies.length > 0 ? (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                  Related work
                </span>
                {relatedCaseStudies.map((study) => (
                  <Link
                    key={study.slug}
                    href={`/work#${study.slug}`}
                    className="font-mono text-[13px] text-accent transition-colors hover:text-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    See how we did this for {study.client} →
                  </Link>
                ))}
              </div>
            ) : null}

            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-sm border border-ink bg-ink px-[18px] py-[11px] text-[13px] font-semibold text-bg transition-colors hover:border-accent hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {primaryCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
