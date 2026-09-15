"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { hero } from "@/content/home";
import PillCta from "@/components/PillCta";
import { WorkShowcaseSection } from "@/components/WorkShowcase";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.5 10.5L10.5 3.5M10.5 3.5H5M10.5 3.5V9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * FunTown-exact architecture (matches reference recording):
 * - Sticky 100vh hero (no tall pin)
 * - Black circle scale3d grows as Work scrolls up from below
 * - Work is the next sibling — enters the same viewport under the filled circle
 * - Circle styles are applied via DOM only (never React style state) so
 *   re-renders cannot wipe transform mid-scroll
 */
export default function Hero() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoBgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const spacerRef = useRef<HTMLSpanElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const metricsRef = useRef({
    top: 0,
    left: 0,
    size: 96,
    maxScale: 20,
  });
  const [statIndex, setStatIndex] = useState(0);
  const [statVisible, setStatVisible] = useState(true);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const activeStat = hero.stats[statIndex] ?? hero.stats[0];

  useEffect(() => {
    if (hero.stats.length < 2 || reducedMotion) return;

    let timeoutId = 0;
    const intervalId = window.setInterval(() => {
      setStatVisible(false);
      timeoutId = window.setTimeout(() => {
        setStatIndex((current) => (current + 1) % hero.stats.length);
        setStatVisible(true);
      }, 280);
    }, 3200);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    void video.play().catch(() => {});
    return () => {
      video.pause();
    };
  }, [reducedMotion]);

  useEffect(() => {
    let raf = 0;
    let measured = false;

    function measure() {
      const spacer = spacerRef.current;
      const sticky = stickyRef.current;
      const circle = circleRef.current;
      if (!spacer || !sticky || !circle) return false;

      const spacerRect = spacer.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();
      const size = spacerRect.width;
      if (size <= 0) return false;

      const top = spacerRect.top - stickyRect.top;
      const left = spacerRect.left - stickyRect.left;
      const maxScale =
        (Math.hypot(window.innerWidth, window.innerHeight) / size) * 1.35;

      metricsRef.current = { top, left, size, maxScale };

      // Position/size only here — never mirrored in React style props
      circle.style.top = `${top}px`;
      circle.style.left = `${left}px`;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.opacity = "1";
      measured = true;
      return true;
    }

    function paint() {
      const { maxScale } = metricsRef.current;
      const sticky = stickyRef.current;
      const content = contentRef.current;
      const videoBg = videoBgRef.current;
      const circle = circleRef.current;
      const arrow = arrowRef.current;
      const link = linkRef.current;
      if (!sticky || !content || !circle) return;

      if (!measured) {
        if (!measure()) return;
      }

      if (reducedMotion) {
        circle.style.transform = "translate3d(0,0,0) scale3d(1,1,1)";
        content.style.opacity = "1";
        content.style.filter = "none";
        content.style.transform = "none";
        sticky.style.backgroundColor = "#FFFFFF";
        if (videoBg) videoBg.style.opacity = "0";
        if (arrow) arrow.style.opacity = "1";
        if (link) link.style.pointerEvents = "auto";
        return;
      }

      // 0 = Work just below fold, 1 = Work top flush with viewport top
      const work = document.getElementById("work");
      let progress = 0;
      if (work) {
        const workTop = work.getBoundingClientRect().top;
        progress = Math.min(1, Math.max(0, 1 - workTop / window.innerHeight));
      }

      // Fill circle early so black is solid as Work text enters (FunTown timing)
      const zoomT = Math.min(1, progress / 0.5);
      const zoom = easeInOutCubic(zoomT);
      const scale = 1 + (maxScale - 1) * zoom;

      circle.style.transform = `translate3d(0,0,0) scale3d(${scale}, ${scale}, 1)`;

      const heroFade = Math.max(0, 1 - zoom * 1.45);
      content.style.opacity = String(heroFade);
      content.style.filter =
        zoom > 0.02 ? `blur(${Math.min(10, zoom * 8)}px)` : "none";
      content.style.transform = `translate3d(0, ${-zoom * 24}px, 0)`;
      content.style.pointerEvents = heroFade < 0.12 ? "none" : "auto";

      if (videoBg) {
        videoBg.style.opacity = String(heroFade);
      }

      if (arrow) {
        arrow.style.opacity = String(Math.max(0, 1 - zoom * 5));
      }

      // Sticky ground goes dark once circle has mostly filled
      sticky.style.backgroundColor = zoom > 0.65 ? "#0D0F12" : "#FFFFFF";

      // Toggle link without React state (avoids wiping transform)
      if (link) {
        const active = zoom < 0.04;
        link.style.pointerEvents = active ? "auto" : "none";
        link.setAttribute("aria-hidden", active ? "false" : "true");
        link.tabIndex = active ? 0 : -1;
      }
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    }

    function onResize() {
      measured = false;
      measure();
      paint();
    }

    // Measure after layout + fonts; paint immediately and on next frames
    const boot = () => {
      measure();
      paint();
    };
    const readyId = window.requestAnimationFrame(() => {
      boot();
      window.requestAnimationFrame(boot);
    });

    // Fonts can shift spacer position — remeasure when ready
    void document.fonts?.ready.then(() => {
      measured = false;
      boot();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(readyId);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [reducedMotion]);

  return (
    <>
      <section className="relative">
        <div
          ref={stickyRef}
          className={`top-0 flex flex-col overflow-hidden bg-bg ${
            reducedMotion ? "relative min-h-[100svh]" : "sticky h-[100svh]"
          }`}
        >
          {!reducedMotion ? (
            <div
              ref={videoBgRef}
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
              aria-hidden
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={hero.videoBackground} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-bg/72 to-bg/88" />
            </div>
          ) : null}

          <div
            ref={contentRef}
            className="relative z-10 mx-auto flex h-full w-full max-w-content flex-1 flex-col px-4 pt-[calc(var(--site-header-offset)+2.5rem)] pb-10 sm:px-8 sm:pt-[calc(var(--site-header-offset)+3.5rem)] sm:pb-14 lg:px-14 lg:pb-[5.7rem] lg:pt-[calc(var(--site-header-offset)+4.5rem)]"
          >
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-16 lg:gap-20">
              <div className="motion-safe:animate-[rise_0.7s_ease_both] flex flex-1 items-center lg:items-start lg:pt-[min(8vh,4.5rem)]">
                <h1 className="font-display text-[clamp(2.75rem,8.5vw,6.35rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
                  {hero.headingLines.map((line, index) => {
                    const isLast = index === hero.headingLines.length - 1;
                    const isGradient = index === hero.headingGradientIndex;

                    if (isLast) {
                      return (
                        <span
                          key={line}
                          className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8"
                        >
                          <span>{line}</span>
                          <span
                            ref={spacerRef}
                            aria-hidden
                            className="inline-block h-[4.25rem] w-[4.25rem] shrink-0 sm:h-[5.5rem] sm:w-[5.5rem] lg:h-24 lg:w-24"
                          />
                        </span>
                      );
                    }

                    return (
                      <span key={line} className="block">
                        {isGradient ? (
                          <span className="motion-safe:animate-[gradientMove_3s_linear_infinite] bg-[linear-gradient(90deg,#0093FD_0%,#0F4C82_50%,#0093FD_100%)] bg-[length:1600px_100%] bg-clip-text text-transparent">
                            {line}
                          </span>
                        ) : (
                          line
                        )}
                      </span>
                    );
                  })}
                </h1>
              </div>

              <div className="motion-safe:animate-[rise_0.7s_ease_both_0.12s] flex min-w-0 flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <div className="flex shrink-0 items-center gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink text-[19px] font-normal text-bg">
                    <span
                      className={`block transition-[opacity,transform] duration-300 ease-standard ${
                        statVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-1 opacity-0"
                      }`}
                    >
                      {activeStat.number}
                    </span>
                  </div>
                  <span
                    className={`text-[19px] leading-none text-[#71777E] transition-[opacity,transform] duration-300 ease-standard ${
                      statVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-1 opacity-0"
                    }`}
                  >
                    {activeStat.label}
                  </span>
                </div>

                <div className="flex min-w-0 flex-col items-start gap-5 sm:ml-auto sm:flex-row sm:items-center sm:justify-end sm:gap-6">
                  <p className="min-w-0 text-left text-[clamp(0.7rem,1.05vw,0.875rem)] leading-snug whitespace-nowrap text-[#71777E] sm:text-right">
                    {hero.subhead}
                  </p>
                  <PillCta href={hero.ctaHref} label={hero.ctaLabel} variant="accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Circle: position/size/transform owned by scroll effect only.
              React style must stay minimal or re-renders wipe scale mid-scroll. */}
          <div
            ref={circleRef}
            className="absolute top-0 left-0 z-30 flex h-24 w-24 items-center justify-center rounded-full bg-ink text-bg opacity-0 will-change-transform"
            style={{ transformOrigin: "center center" }}
          >
            <span ref={arrowRef} className="flex items-center justify-center">
              <ArrowUpRight className="sm:h-8 sm:w-8" />
            </span>
            <Link
              ref={linkRef}
              href="/work"
              aria-label="See our work"
              className="absolute inset-0 rounded-full"
            />
          </div>
        </div>
      </section>

      <WorkShowcaseSection dark />
    </>
  );
}
