import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import PendingNotice from "@/components/PendingNotice";
import { leadership } from "@/content/about";

export const metadata: Metadata = {
  title: leadership.metaTitle,
  description: leadership.metaDescription,
};

export default function LeadershipPage() {
  return (
    <>
      <PageIntro eyebrow={leadership.eyebrow} heading={leadership.heading} />
      <section className="mx-auto max-w-content px-4 pb-14 sm:px-8 sm:pb-20 lg:px-14 lg:pb-24">
        <div className="flex max-w-[62ch] flex-col gap-4">
          <PendingNotice>{leadership.pendingNote}</PendingNotice>
          <p className="text-[13.5px] leading-relaxed text-ink-faint">
            {leadership.cardFormatNote}
          </p>
        </div>
      </section>
    </>
  );
}
