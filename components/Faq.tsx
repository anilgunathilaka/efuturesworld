import Link from "next/link";
import { faqItems, faqSectionHead, type FaqItem } from "@/content/faq";

export default function Faq({
  items,
  eyebrow,
  heading = faqSectionHead.heading,
  label = faqSectionHead.label,
  asPage = false,
  linkToFullFaq = false,
}: {
  items?: FaqItem[];
  eyebrow?: string;
  heading?: string;
  label?: string;
  asPage?: boolean;
  linkToFullFaq?: boolean;
}) {
  const resolvedItems = items ?? faqItems.filter((item) => item.showOnHome);
  const Heading = asPage ? "h1" : "h2";

  return (
    <section
      id="faq"
      className={`mx-auto max-w-content px-4 sm:px-8 lg:px-14 ${
        asPage
          ? "pb-14 pt-[calc(var(--site-header-offset)+1.5rem)] sm:pb-20 sm:pt-[calc(var(--site-header-offset)+2rem)] lg:pb-24 lg:pt-[calc(var(--site-header-offset)+2.5rem)]"
          : "py-14 sm:py-20 lg:py-24"
      }`}
    >
      <div className="mb-8 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div>
          {eyebrow ? (
            <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              {eyebrow}
            </span>
          ) : null}
          <Heading
            className={
              asPage
                ? "max-w-[18ch] text-balance font-display text-5xl leading-[0.98] sm:text-7xl lg:text-8xl"
                : "text-balance font-display text-4xl leading-[0.98] sm:text-6xl lg:text-7xl"
            }
          >
            {heading}
          </Heading>
        </div>
        <span className="max-w-full font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint sm:max-w-[32ch] sm:text-right">
          {label}
        </span>
      </div>

      <div className="border-t border-line-strong">
        {resolvedItems.map((item, i) => (
          <details
            key={item.question}
            className="group border-b border-line py-[18px]"
            open={i === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-display text-lg sm:text-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden
                className="font-mono text-lg text-accent transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3.5 max-w-[62ch] text-[14.5px] leading-relaxed text-ink-soft">
              {item.answer}
            </p>
            {item.pending ? (
              <span className="mt-3 inline-block rounded-sm border border-dashed border-line-strong px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                Pending confirmation from EFutures
              </span>
            ) : null}
          </details>
        ))}
      </div>

      {linkToFullFaq ? (
        <div className="mt-6 text-right">
          <Link
            href="/faq"
            className="font-mono text-[13px] text-accent transition-colors hover:text-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            See the full FAQ →
          </Link>
        </div>
      ) : null}
    </section>
  );
}
