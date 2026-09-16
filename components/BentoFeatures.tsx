import Image from "next/image";
import Link from "next/link";
import { bentoFeatures, type BentoCard } from "@/content/bento-features";

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m16 9 5 5M21 9l-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function CardChrome({ card }: { card: BentoCard }) {
  const accent = bentoFeatures.accent;

  return (
    <>
      <span className="absolute left-4 top-4 z-20 rounded-full bg-black/55 px-3 py-1 text-[13px] font-medium text-white backdrop-blur-sm sm:left-5 sm:top-5">
        {card.label}
      </span>

      {card.variant === "tall" ? (
        <span className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm sm:right-5 sm:top-5">
          <MuteIcon />
        </span>
      ) : null}

      {card.prompt ? (
        <div className="absolute inset-x-5 top-1/2 z-20 w-[min(100%-2.5rem,280px)] -translate-y-[42%] rounded-2xl bg-white p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:left-1/2 sm:right-auto sm:w-[280px] sm:-translate-x-1/2">
          <div className="flex items-start gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
              <Image
                src={card.prompt.avatar}
                alt=""
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
            <p className="pt-0.5 text-[13px] leading-snug text-ink">
              {card.prompt.text}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface2 text-ink-soft">
              <SparkleIcon />
            </span>
            <span
              className="inline-flex h-8 items-center rounded-full px-3.5 text-[13px] font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              {card.prompt.cta}
            </span>
          </div>
        </div>
      ) : null}

      {card.badge ? (
        <div className="absolute right-5 top-14 z-20 sm:top-16">
          <div className="relative rounded-lg border-2 border-[#4F7CFF] bg-white px-3 py-2 shadow-lg">
            <p className="font-display text-[11px] font-bold tracking-[0.08em] text-ink uppercase">
              {card.badge.mark}
            </p>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#4F7CFF] px-2 py-0.5 text-[10px] font-medium text-white">
              {card.badge.caption}
            </span>
          </div>
        </div>
      ) : null}

      {card.overlay?.style === "plain" && card.overlay.plain ? (
        <p className="absolute inset-x-5 top-[42%] z-10 text-center font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-white sm:inset-x-8">
          {card.overlay.plain}
        </p>
      ) : null}

      {card.overlay?.style === "mixed" ? (
        <p className="absolute inset-x-5 top-[38%] z-10 text-center leading-none sm:inset-x-8">
          <span className="font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] font-normal italic text-[#FF1A1A]">
            {card.overlay.lead}
          </span>{" "}
          <span className="font-display text-[clamp(1.6rem,3vw,2.35rem)] font-semibold tracking-[-0.03em] text-white">
            {card.overlay.rest}
          </span>
        </p>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-4 pb-4 pt-20 sm:px-5 sm:pb-5">
        <div className="flex items-end gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-0.5 motion-safe:group-hover:scale-105"
            style={{ backgroundColor: accent }}
          >
            <ArrowRight />
          </span>
          <p className="min-w-0 text-[15px] leading-snug text-white sm:text-[16px]">
            <span className="font-semibold">{card.title}</span>{" "}
            <span className="text-white/75">{card.body}</span>
          </p>
        </div>
      </div>
    </>
  );
}

function BentoCardLink({ card }: { card: BentoCard }) {
  const tall = card.variant === "tall";

  return (
    <Link
      href={card.href}
      className={`group relative isolate overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        tall
          ? "min-h-[520px] md:row-span-2 md:min-h-[800px]"
          : "min-h-[280px] md:min-h-[388px]"
      }`}
    >
      <Image
        src={card.image}
        alt={card.imageAlt}
        fill
        className="object-cover transition-transform duration-500 ease-standard motion-safe:group-hover:scale-[1.03]"
        sizes={tall ? "(max-width:768px) 100vw, 420px" : "(max-width:768px) 100vw, 420px"}
        priority={card.id === "build"}
      />
      <div className="absolute inset-0 bg-black/20" aria-hidden />
      <CardChrome card={card} />
    </Link>
  );
}

/** VEED-style dark bento — homepage section 2 */
export default function BentoFeatures() {
  const [tall, ...rest] = bentoFeatures.cards;

  return (
    <section id="features" className="relative bg-ink text-bg">
      <div className="mx-auto flex max-w-[960px] flex-col gap-10 px-4 py-16 sm:gap-12 sm:px-8 sm:py-20 lg:px-10 lg:py-[100px]">
        <h2 className="mx-auto max-w-[580px] text-center font-display text-[clamp(1.75rem,4vw,3.375rem)] font-normal leading-[1.15] tracking-[-0.02em] text-balance text-bg">
          {bentoFeatures.heading}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2">
          {tall ? <BentoCardLink card={tall} /> : null}
          {rest.map((card) => (
            <BentoCardLink key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
