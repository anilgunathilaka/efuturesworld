import { testimonials, whyEfutures } from "@/content/testimonials";

export default function Testimonials({ asPage = false }: { asPage?: boolean }) {
  const featured = testimonials.find((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);
  const Heading = asPage ? "h1" : "h2";

  return (
    <section
      id="why"
      className={`mx-auto max-w-content px-4 sm:px-8 lg:px-14 ${
        asPage
          ? "pb-14 pt-[calc(var(--site-header-offset)+1.5rem)] sm:pb-20 sm:pt-[calc(var(--site-header-offset)+2rem)] lg:pb-24 lg:pt-[calc(var(--site-header-offset)+2.5rem)]"
          : "py-14 sm:py-20 lg:py-24"
      }`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
        {whyEfutures.eyebrow}
      </span>
      <Heading
        className={
          asPage
            ? "mt-4 max-w-[20ch] text-balance font-display text-5xl leading-[0.98] sm:text-7xl lg:text-8xl"
            : "mt-4 max-w-[18ch] text-balance font-display text-4xl leading-[0.98] sm:text-6xl lg:text-7xl"
        }
      >
        {whyEfutures.heading}
      </Heading>
      <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-ink-soft sm:text-xl">
        {whyEfutures.body}
      </p>

      {featured ? (
        <blockquote className="mt-10 border-l-[3px] border-line border-l-accent bg-surface p-8 sm:p-14">
          <p className="max-w-[52ch] font-display text-3xl italic leading-[1.15] sm:text-4xl lg:text-5xl">
            &ldquo;{featured.quote}&rdquo;
          </p>
          <footer className="mt-5 text-[14px] text-ink-soft">— {featured.attribution}</footer>
        </blockquote>
      ) : null}

      <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
        {rest.map((t) => (
          <div key={t.slug} className="flex flex-col gap-3.5 bg-surface p-6">
            <p className="font-display text-lg italic leading-snug">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-auto text-[12.5px] text-ink-soft">— {t.attribution}</footer>
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-[62ch] text-[12.5px] leading-relaxed text-ink-faint">
        {whyEfutures.tenureNote}
      </p>
    </section>
  );
}
