import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ServicesGrid from "@/components/ServicesGrid";
import { servicesOverview } from "@/content/services";

export const metadata: Metadata = {
  title: servicesOverview.metaTitle,
  description: servicesOverview.metaDescription,
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow={servicesOverview.eyebrow}
        heading={servicesOverview.heading}
        intro={servicesOverview.intro}
      />
      <ServicesGrid />
    </>
  );
}
