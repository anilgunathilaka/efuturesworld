import type { Metadata } from "next";
import Faq from "@/components/Faq";
import { faqItems, faqPageIntro } from "@/content/faq";

export const metadata: Metadata = {
  title: faqPageIntro.metaTitle,
  description: faqPageIntro.metaDescription,
};

export default function FaqPage() {
  return (
    <Faq
      items={faqItems}
      asPage
      eyebrow={faqPageIntro.eyebrow}
      heading={faqPageIntro.heading}
      label={faqPageIntro.intro}
    />
  );
}
