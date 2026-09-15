import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import PendingNotice from "@/components/PendingNotice";
import { careers } from "@/content/about";

export const metadata: Metadata = {
  title: careers.metaTitle,
  description: careers.metaDescription,
};

export default function CareersPage() {
  return (
    <>
      <PageIntro eyebrow={careers.eyebrow} heading={careers.heading} intro={careers.intro} />

      <section className="mx-auto max-w-content px-4 pb-14 sm:px-8 sm:pb-20 lg:px-14 lg:pb-24">
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          {careers.pillars.map((pillar) => (
            <div key={pillar.title} className="flex flex-col gap-2 bg-surface p-6 sm:p-8">
              <h2 className="font-display text-2xl">{pillar.title}</h2>
              <p className="text-[14.5px] leading-relaxed text-ink-soft">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex max-w-[62ch] flex-col gap-4">
          <PendingNotice>{careers.openRolesPendingNote}</PendingNotice>
        </div>

        <div className="mt-8 flex flex-wrap gap-3.5">
          <a
            href={`mailto:hello@efuturesworld.com?subject=${encodeURIComponent("Open roles at EFutures")}`}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm border border-ink bg-ink px-[18px] py-[11px] text-[13px] font-semibold text-bg transition-colors hover:border-accent hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {careers.ctaLabel}
          </a>
          <a
            href={`mailto:${careers.generalInquiriesLabel}`}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm border border-line-strong px-[18px] py-[11px] text-[13px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {careers.generalInquiriesLabel}
          </a>
        </div>
      </section>
    </>
  );
}
