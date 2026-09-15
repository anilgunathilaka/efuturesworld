"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { testimonials, whyEfutures } from "@/content/testimonials";

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="why"
      className="mx-auto max-w-content px-4 py-14 sm:px-8 sm:py-20 lg:px-14 lg:py-24"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
            {whyEfutures.eyebrow}
          </span>
          <h2 className="mt-4 max-w-[18ch] text-balance font-display text-4xl leading-[0.98] sm:text-6xl">
            {whyEfutures.heading}
          </h2>
        </div>
        <Link
          href="/why-efutures"
          className="font-mono text-[13px] text-accent transition-colors hover:text-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Read all four stories →
        </Link>
      </div>

      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        className="relative mt-8 min-h-[220px] border-l-[3px] border-line border-l-accent bg-surface p-6 sm:min-h-[180px] sm:p-10"
      >
        {testimonials.map((t, i) => (
          <div
            key={t.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${testimonials.length}`}
            hidden={i !== index}
          >
            <p className="max-w-[56ch] font-display text-2xl italic leading-snug sm:text-3xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-4 text-[13.5px] text-ink-soft">— {t.attribution}</footer>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
              aria-current={i === index}
              className={`h-2 w-2 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                i === index ? "bg-accent" : "bg-line-strong"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
            className="rounded-sm border border-line-strong px-3 py-1.5 font-mono text-[12px] text-ink-soft transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            aria-label="Next testimonial"
            className="rounded-sm border border-line-strong px-3 py-1.5 font-mono text-[12px] text-ink-soft transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
