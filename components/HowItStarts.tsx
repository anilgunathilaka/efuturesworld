import { howItStarts } from "@/content/home";

export default function HowItStarts() {
  return (
    <section className="mx-auto max-w-content px-4 py-14 sm:px-8 sm:py-20 lg:px-14 lg:py-24">
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
        {howItStarts.eyebrow}
      </span>
      <h2 className="mt-4 max-w-[18ch] text-balance font-display text-4xl leading-[0.98] sm:text-6xl lg:text-7xl">
        {howItStarts.heading}
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
        {howItStarts.steps.map((step, i) => (
          <div key={step.title} className="relative flex flex-col gap-3 overflow-hidden bg-surface p-6 sm:p-8">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 -right-2 select-none font-mono text-[6rem] leading-none text-accent-tint sm:text-[7.5rem]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="relative font-mono text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="relative font-display text-2xl sm:text-3xl">{step.title}</h3>
            <p className="relative text-[14px] leading-relaxed text-ink-soft">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
