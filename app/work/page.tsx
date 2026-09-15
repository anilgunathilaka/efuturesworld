import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import WorkGrid from "@/components/WorkGrid";
import { workPageIntro } from "@/content/case-studies";

export const metadata: Metadata = {
  title: workPageIntro.metaTitle,
  description: workPageIntro.metaDescription,
};

export default function WorkPage() {
  return (
    <>
      <PageIntro
        eyebrow={workPageIntro.eyebrow}
        heading={workPageIntro.heading}
        intro={workPageIntro.intro}
      />
      <WorkGrid showHeading={false} />
    </>
  );
}
