import { caseStudies } from "@/content/case-studies";
import {
  WorkShowcaseCard,
  WorkShowcaseSection,
} from "@/components/WorkShowcase";

export default function WorkGrid({ showHeading = true }: { showHeading?: boolean }) {
  if (!showHeading) {
    return (
      <section
        id="work"
        className="mx-auto max-w-content px-4 pb-14 sm:px-8 sm:pb-20 lg:px-14 lg:pb-24"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <div key={study.slug} id={study.slug} className="scroll-mt-28">
              <WorkShowcaseCard study={study} index={index} dark={false} />
              <div className="mt-5 space-y-3 text-[14px] leading-relaxed text-ink-soft">
                <p>
                  <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint">
                    Challenge
                  </span>
                  {study.challenge}
                </p>
                <p>
                  <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint">
                    What we built
                  </span>
                  {study.build}
                </p>
                <blockquote className="border-t border-line pt-3 font-display text-base italic text-ink">
                  {study.outcome}
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return <WorkShowcaseSection dark />;
}
