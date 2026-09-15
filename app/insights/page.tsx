import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import { insights } from "@/content/insights";

export const metadata: Metadata = {
  title: insights.metaTitle,
  description: insights.metaDescription,
};

export default function InsightsPage() {
  return (
    <>
      <PageIntro eyebrow={insights.eyebrow} heading={insights.heading} intro={insights.intro} />

      <section className="mx-auto max-w-content px-4 pb-14 sm:px-8 sm:pb-20 lg:px-14 lg:pb-24">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          {insights.featuredPostsNote}
        </span>
        <ul className="mt-4 flex flex-col gap-px border border-line bg-line">
          {insights.featuredPosts.map((post) => (
            <li key={post} className="bg-surface p-5 text-[15px] text-ink sm:p-6">
              {post}
            </li>
          ))}
        </ul>

        <div className="mt-12 border-t border-line-strong pt-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
            Content pillars
          </span>
          <div className="mt-4 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            {insights.pillars.map((pillar) => (
              <div key={pillar} className="bg-surface p-5 text-[14.5px] text-ink-soft sm:p-6">
                {pillar}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
