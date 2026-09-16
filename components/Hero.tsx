"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { hero } from "@/content/home";
import PillCta from "@/components/PillCta";
import { WorkShowcaseSection } from "@/components/WorkShowcase";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

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
 * FunTown handoff (https://www.funtownstudio.com/):
 *
 * Sticky light hero (z-10) + dark Work sibling (z-40) in normal document flow.
 * Circle expands as Work rises over the hero. Work stays opacity 0 until mid-cover,
 * then the whole section fades in — same continuum, no tall pin / negative margin.
 */
export default function Hero() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoBgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const spacerRef = useRef<HTMLSpanElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const workOverRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef({
    cx: 0,
    cy: 0,
    startR: 48,
    maxR: 2000,
    top: 0,
    left: 0,
    size: 96,
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
    if (reducedMotion) return;

    let measured = false;

    function measure() {
      const sticky =
        stickyRef.current ??
        document.querySelector<HTMLElement>("[data-hero-sticky]");
      const spacer =
        spacerRef.current ??
        document.querySelector<HTMLElement>("[data-hero-spacer]");
      const circle =
        circleRef.current ??
        document.querySelector<HTMLElement>("[data-hero-circle]");
      const cover =
        coverRef.current ??
        document.querySelector<HTMLElement>("[data-hero-cover]");
      if (!spacer || !sticky) return false;

      const spacerRect = spacer.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();
      const size = spacerRect.width;
      if (size <= 0) return false;

      const top = spacerRect.top - stickyRect.top;
      const left = spacerRect.left - stickyRect.left;
      const w = stickyRect.width;
      const h = stickyRect.height;
      const cx = Math.min(w - 1, Math.max(1, left + size / 2));
      const cy = Math.min(h - 1, Math.max(1, top + size / 2));
      const maxR =
        Math.max(
          Math.hypot(cx, cy),
          Math.hypot(w - cx, cy),
          Math.hypot(cx, h - cy),
          Math.hypot(w - cx, h - cy),
        ) * 1.35;

      metricsRef.current = {
        cx,
        cy,
        startR: size / 2,
        maxR,
        top,
        left,
        size,
      };

      if (circle) {
        circle.style.top = `${top}px`;
        circle.style.left = `${left}px`;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.opacity = "1";
      }

      if (cover && cover.dataset.zoom == null) {
        cover.style.clipPath = `circle(${size / 2}px at ${cx}px ${cy}px)`;
      }

      measured = true;
      return true;
    }

    function paint() {
      const sticky =
        stickyRef.current ??
        document.querySelector<HTMLElement>("[data-hero-sticky]");
      const content =
        contentRef.current ??
        document.querySelector<HTMLElement>("[data-hero-content]");
      const videoBg = videoBgRef.current;
      const circle =
        circleRef.current ??
        document.querySelector<HTMLElement>("[data-hero-circle]");
      const arrow = arrowRef.current;
      const link = linkRef.current;
      const cover =
        coverRef.current ??
        document.querySelector<HTMLElement>("[data-hero-cover]");
      const workOver =
        workOverRef.current ??
        document.querySelector<HTMLElement>("[data-work-over-hero]");

      if (!sticky || !content || !workOver) return;
      if (!measured && !measure()) return;

      const { cx, cy, startR, maxR } = metricsRef.current;
      const vh = window.innerHeight;
      const stickyW = sticky.offsetWidth;
      const stickyH = sticky.offsetHeight;
      const wr = workOver.getBoundingClientRect();

      // FunTown: circle finishes ~when Work top is ~0.35–0.40vh
      const zoomT = 1 - Math.min(1, Math.max(0, (wr.top - vh * 0.38) / Math.max(1, vh * 0.62)));
      const zoom = easeInOutCubic(zoomT);

      const edgeDist = Math.min(cx, cy, stickyW - cx, stickyH - cy);
      const cornerDist = Math.max(
        Math.hypot(cx, cy),
        Math.hypot(stickyW - cx, cy),
        Math.hypot(cx, stickyH - cy),
        Math.hypot(stickyW - cx, stickyH - cy),
      );
      // Grow toward corner coverage (not just maxR padding) so the fill completes
      const targetR = Math.max(maxR, cornerDist * 1.02);
      const radius = startR + (targetR - startR) * zoom;

      // Circle ∩ box leaves light crescents once it hits an edge but not
      // corners (the seam in the screenshot). Paint those crescents ink.
      const pastEdge = radius >= edgeDist * 0.98;
      const filled = radius >= cornerDist || zoom >= 0.995;

      if (cover) {
        if (filled) {
          cover.style.clipPath = "none";
        } else {
          cover.style.clipPath = `circle(${radius}px at ${cx}px ${cy}px)`;
        }
        cover.dataset.zoom = zoom.toFixed(3);
      }

      const heroFade = pastEdge ? 0 : 1;
      content.style.opacity = String(heroFade);
      content.style.filter = "none";
      content.style.transform = pastEdge
        ? "translate3d(0, 0, 0)"
        : `translate3d(0, ${-zoom * 36}px, 0)`;
      content.style.pointerEvents = pastEdge ? "none" : "auto";

      if (videoBg) {
        videoBg.style.opacity = String(heroFade);
      }

      if (circle) {
        circle.style.opacity = pastEdge
          ? "0"
          : String(Math.max(0, 1 - zoom * 3.2));
        circle.style.pointerEvents = zoom < 0.04 ? "auto" : "none";
      }
      if (arrow) {
        arrow.style.opacity = pastEdge
          ? "0"
          : String(Math.max(0, 1 - zoom * 5));
      }

      sticky.style.backgroundColor = pastEdge || zoom > 0.06 ? "#0D0F12" : "#FFFFFF";

      if (link) {
        const active = zoom < 0.04;
        link.style.pointerEvents = active ? "auto" : "none";
        link.setAttribute("aria-hidden", active ? "false" : "true");
        link.tabIndex = active ? 0 : -1;
      }

      // Work opens only after corners are covered (no seam possible)
      const opStart = vh * 0.42;
      const opEnd = vh * 0.22;
      const posOp = easeOutCubic(
        Math.min(1, Math.max(0, (opStart - wr.top) / Math.max(1, opStart - opEnd))),
      );
      const sectionOp = posOp * (filled ? 1 : 0);
      workOver.style.opacity = String(sectionOp);
      workOver.style.pointerEvents = sectionOp < 0.05 ? "none" : "auto";
      workOver.dataset.sectionOp = sectionOp.toFixed(3);

      // Soft rise on copy once the section starts fading in (staggered)
      const headline = workOver.querySelector<HTMLElement>("[data-work-open-headline]");
      const grid = workOver.querySelector<HTMLElement>("[data-work-open-grid]");
      const cta = workOver.querySelector<HTMLElement>("[data-work-open-cta]");

      const applyOpen = (
        el: HTMLElement | null,
        delay: number,
        fromY: number,
      ) => {
        if (!el) return;
        const local = Math.min(
          1,
          Math.max(0, (sectionOp - delay) / Math.max(0.001, 1 - delay)),
        );
        const t = easeOutCubic(local);
        el.style.opacity = String(t);
        el.style.transform = `translate3d(0, ${(1 - t) * fromY}px, 0)`;
      };

      applyOpen(headline, 0, 48);
      applyOpen(grid, 0.08, 64);
      applyOpen(cta, 0.16, 36);
    }

    function onResize() {
      measured = false;
      measure();
      paint();
    }

    const cover = coverRef.current;
    if (cover) {
      cover.style.clipPath = "circle(0px at 50% 50%)";
    }

    const workOver = workOverRef.current;
    if (workOver) {
      workOver.style.opacity = "0";
      workOver
        .querySelectorAll<HTMLElement>(
          "[data-work-open-headline], [data-work-open-grid], [data-work-open-cta]",
        )
        .forEach((el) => {
          el.style.opacity = "0";
          el.style.transform = "translate3d(0, 48px, 0)";
          el.style.willChange = "opacity, transform";
        });
    }

    const boot = () => {
      measure();
      paint();
    };

    const readyId = window.requestAnimationFrame(() => {
      boot();
      window.requestAnimationFrame(boot);
    });

    void document.fonts?.ready.then(() => {
      measured = false;
      boot();
    });

    let loopRaf = 0;
    const loop = () => {
      try {
        paint();
      } catch {
        // keep loop alive
      }
      loopRaf = window.requestAnimationFrame(loop);
    };
    loopRaf = window.requestAnimationFrame(loop);

    window.addEventListener("scroll", paint, { passive: true, capture: true });
    document.addEventListener("scroll", paint, { passive: true, capture: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(readyId);
      cancelAnimationFrame(loopRaf);
      window.removeEventListener("scroll", paint, true);
      document.removeEventListener("scroll", paint, true);
      window.removeEventListener("resize", onResize);
    };
  }, [reducedMotion]);

  return (
    <div className="relative">
      <div
        ref={stickyRef}
        data-hero-sticky
        className={`top-0 z-10 flex flex-col overflow-hidden bg-bg ${
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
          data-hero-content
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
                          data-hero-spacer
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

        {!reducedMotion ? (
          <div
            ref={coverRef}
            data-hero-cover
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 bg-ink"
          />
        ) : null}

        <div
          ref={circleRef}
          data-hero-circle
          className="absolute top-0 left-0 z-30 flex h-24 w-24 items-center justify-center rounded-full bg-ink text-bg opacity-0"
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

      {/* FunTown below-hero: native scroll over sticky, opacity driven in paint() */}
      <div
        ref={workOverRef}
        data-work-over-hero
        className="relative z-40 bg-ink"
      >
        <WorkShowcaseSection dark animateOpen={!reducedMotion} />
      </div>
    </div>
  );
}
