import Link from "next/link";
import { services } from "@/content/services";

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-content px-4 pb-14 sm:px-8 sm:pb-20 lg:px-14 lg:pb-24">
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="flex flex-col gap-3 bg-surface p-6 transition-colors hover:bg-surface2 focus-visible:bg-surface2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent sm:p-8"
          >
            <span className="font-mono text-sm text-accent">{service.practiceNumber}</span>
            <h2 className="font-display text-3xl sm:text-4xl">{service.title}</h2>
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
              {service.hook}
            </p>
            <span className="mt-auto pt-2 font-mono text-[13px] text-accent">Learn more →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
