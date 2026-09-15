import type { Metadata } from "next";
import Testimonials from "@/components/Testimonials";
import { whyEfutures } from "@/content/testimonials";

export const metadata: Metadata = {
  title: whyEfutures.metaTitle,
  description: whyEfutures.metaDescription,
};

export default function WhyEfuturesPage() {
  return <Testimonials asPage />;
}
