export default function PageIntro({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto max-w-content px-4 pb-8 pt-[calc(var(--site-header-offset)+1.5rem)] sm:px-8 sm:pb-10 sm:pt-[calc(var(--site-header-offset)+2rem)] lg:px-14 lg:pt-[calc(var(--site-header-offset)+2.5rem)]">
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
        {eyebrow}
      </span>
      <h1 className="mt-4 max-w-[18ch] text-balance font-display text-5xl leading-[0.98] sm:text-7xl lg:text-8xl">
        {heading}
      </h1>
      {intro ? (
        <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-ink-soft sm:text-xl">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
