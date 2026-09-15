import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ClientBand from "@/components/ClientBand";
import TrustStrip from "@/components/TrustStrip";
import StatementBlock from "@/components/StatementBlock";
import Capabilities from "@/components/Capabilities";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import HowItStarts from "@/components/HowItStarts";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import { twentyFiveYears } from "@/content/home";

export const metadata: Metadata = {
  title: "EFutures — Sri Lanka's Most-Awarded Software Team, AI-Native Since Day One",
  description:
    "Gold at every major Sri Lankan tech award, 2025. 25 years, four clients still with us after 5–10 years. AI-native software engineering. Book a call.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <ClientBand />
      <TrustStrip />
      <Capabilities />
      <StatementBlock heading={twentyFiveYears.heading} body={twentyFiveYears.body} />
      <HowItStarts />
      <TestimonialsCarousel />
      <Faq linkToFullFaq />
      <FinalCta />
    </>
  );
}
