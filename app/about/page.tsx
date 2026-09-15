import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import PendingNotice from "@/components/PendingNotice";
import TrustStrip from "@/components/TrustStrip";
import { ourStory } from "@/content/about";

export const metadata: Metadata = {
  title: ourStory.metaTitle,
  description: ourStory.metaDescription,
};

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow={ourStory.eyebrow} heading={ourStory.heading} />

      <section className="mx-auto max-w-content px-4 pb-14 sm:px-8 sm:pb-20 lg:px-14 lg:pb-24">
        <div className="flex max-w-[65ch] flex-col gap-5">
          {ourStory.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-6 max-w-[65ch]">
          <PendingNotice>{ourStory.foundingDetailPending}</PendingNotice>
        </div>

        <Link
          href="/why-efutures"
          className="mt-6 inline-block font-mono text-[13px] text-accent transition-colors hover:text-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Read what four clients say about staying 5–10 years →
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-px border-t border-line-strong pt-8 sm:grid-cols-2">
          {ourStory.values.map((value) => (
            <div key={value.title} className="flex flex-col gap-1.5 pb-4">
              <h2 className="font-display text-xl">{value.title}</h2>
              <p className="max-w-[42ch] text-[14px] leading-relaxed text-ink-soft">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <TrustStrip />
    </>
  );
}
