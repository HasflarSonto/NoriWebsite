"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { copy } from "@/content/copy";
import { ButtonLink } from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          if (!video) return;
          const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
          const n = panels.length;

          // Ensure panels have a known initial state regardless of paint order
          panels.forEach((p, i) => {
            gsap.set(p, {
              autoAlpha: i === 0 ? 1 : 0,
              y: i === 0 ? 0 : 20,
            });
          });

          const setupScrub = () => {
            const duration = video.duration || 6;

            gsap.to(video, {
              currentTime: duration,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.4,
              },
            });

            if (n > 0) {
              panels.forEach((panel, i) => {
                const enter = i === 0 ? 0 : i / n;
                const exit = i === n - 1 ? 1 : (i + 1) / n;

                ScrollTrigger.create({
                  trigger: container,
                  start: `top+=${enter * 100}% top`,
                  end: `top+=${exit * 100}% top`,
                  onEnter: () =>
                    gsap.to(panel, { autoAlpha: 1, y: 0, duration: 0.5 }),
                  onEnterBack: () =>
                    gsap.to(panel, { autoAlpha: 1, y: 0, duration: 0.5 }),
                  onLeave: () =>
                    gsap.to(panel, { autoAlpha: 0, y: -10, duration: 0.5 }),
                  onLeaveBack: () =>
                    gsap.to(panel, { autoAlpha: 0, y: 20, duration: 0.5 }),
                });
              });
            }
          };

          const primeAndSetup = async () => {
            try {
              await video.play().catch(() => {});
              video.pause();
              video.currentTime = 0.001;
            } catch {
              /* no-op */
            }
            setupScrub();
            ScrollTrigger.refresh();
          };

          if (video.readyState >= 2) {
            primeAndSetup();
          } else {
            video.addEventListener("loadedmetadata", primeAndSetup, {
              once: true,
            });

            // If the source is missing (placeholder run), still wire up the panels
            // so scrolling crossfades them even without a video.
            const fallback = setTimeout(() => {
              if (video.readyState < 2) setupScrub();
            }, 1200);

            return () => clearTimeout(fallback);
          }

          return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
          };
        },
      );

      mm.add(
        "(max-width: 767px), (prefers-reduced-motion: reduce)",
        () => {
          if (video) {
            video.loop = true;
            video.muted = true;
            video.autoplay = true;
            video.play().catch(() => {});
          }
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  const panels = copy.hero.panels;

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* soft radial glow + dot grid */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_rgba(205,232,181,0.35),_transparent_60%)]"
          aria-hidden
        />
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-90" />

        {/* Two column desktop: text left, video right */}
        <div className="absolute inset-0 mx-auto hidden h-full max-w-6xl grid-cols-[1fr_1fr] items-center gap-10 px-8 md:grid">
          {/* Text column */}
          <div className="relative h-[64vh] max-w-[44ch]">
            {panels.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className={`absolute inset-0 flex flex-col justify-center gap-5 ${
                  i === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="eyebrow">{p.eyebrow}</span>
                <h1 className="font-display text-[clamp(2.8rem,5vw,4.4rem)] leading-[0.92] tracking-tight text-[var(--color-ink)]">
                  {p.heading}
                </h1>
                {p.cta && (
                  <div className="mt-2 flex items-center gap-3">
                    <ButtonLink href={p.cta.href}>{p.cta.label}</ButtonLink>
                    <span className="eyebrow">· $300 off $1,288</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Video column */}
          <div className="relative flex h-[80vh] items-center justify-center">
            <div
              className="relative flex h-full w-full items-center justify-center rounded-[36px] border-2 border-[var(--color-ink)] bg-[var(--color-paper-2)] shadow-[var(--shadow-pop)]"
            >
              {/* corner stickers */}
              <span className="absolute -left-3 -top-3 rounded-full bg-[var(--color-sticker)] px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink)] shadow-[var(--shadow-soft)] rotate-[-6deg]">
                L1 · v0
              </span>
              <span className="absolute -right-3 -bottom-3 rounded-full bg-[var(--color-leaf)] px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[var(--color-ink)] shadow-[var(--shadow-soft)] rotate-[5deg]">
                preorder open
              </span>

              <div
                ref={placeholderRef}
                className="absolute inset-0 grid place-items-center rounded-[34px]"
                aria-hidden
              >
                <div className="flex flex-col items-center gap-4 floaty">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-10 w-10 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-paper)]" />
                    <div className="h-1.5 w-14 rounded-full bg-[var(--color-line-strong)]" />
                    <div className="h-16 w-24 rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-paper)]" />
                    <div className="h-1.5 w-10 rounded-full bg-[var(--color-line-strong)]" />
                    <div className="h-10 w-28 rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-paper)]" />
                  </div>
                  <span className="eyebrow text-center max-w-[22ch]">
                    drop /public/video/nori-descend.mp4 to replace
                  </span>
                </div>
              </div>

              <video
                ref={videoRef}
                className="relative z-[1] h-full w-full rounded-[34px] object-contain"
                src="/video/nori-descend.mp4"
                poster="/images/nori-hero.jpg"
                muted
                playsInline
                preload="auto"
                onLoadedData={() => {
                  if (placeholderRef.current) {
                    placeholderRef.current.style.opacity = "0";
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Scroll rail */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
          {panels.map((_, i) => (
            <span
              key={i}
              className="h-[4px] w-6 rounded-full bg-[var(--color-line-strong)]"
            />
          ))}
          <span className="eyebrow ml-3">scroll ↓</span>
        </div>

        {/* Mobile centerpiece */}
        <div className="absolute inset-0 flex items-center justify-center px-5 md:hidden">
          <div className="relative flex h-[58vh] w-full items-center justify-center rounded-[32px] border-2 border-[var(--color-ink)] bg-[var(--color-paper-2)] shadow-[var(--shadow-pop)]">
            <div
              className="absolute inset-0 grid place-items-center rounded-[30px]"
              aria-hidden
            >
              <div className="flex flex-col items-center gap-3 floaty">
                <div className="h-9 w-9 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-paper)]" />
                <div className="h-14 w-20 rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-paper)]" />
                <div className="h-9 w-24 rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-paper)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stacked panels below the sticky stage */}
      <div className="relative z-[2] md:hidden">
        <div className="mx-auto flex max-w-xl flex-col gap-10 px-5 pb-20 pt-8">
          {panels.map((p) => (
            <div key={p.id} className="flex flex-col gap-3">
              <span className="eyebrow">{p.eyebrow}</span>
              <h2 className="font-display text-3xl leading-tight tracking-tight">
                {p.heading}
              </h2>
              {p.cta && <ButtonLink href={p.cta.href}>{p.cta.label}</ButtonLink>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
