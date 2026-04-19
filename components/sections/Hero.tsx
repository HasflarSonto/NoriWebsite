"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { copy } from "@/content/copy";
import { ButtonLink } from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Breathing room between the top of the viewport and the video.
// Small because the nav is hidden during the hero — the video goes nearly
// edge-to-edge at the top.
const VIDEO_TOP_VH = 5;
// Tiny white gap at the very bottom so the video doesn't kiss the edge
// of the sticky stage.
const VIDEO_BOTTOM_VH = 3;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  // Hero brand mark is fixed-positioned (truly pinned to the viewport,
  // not dependent on the sticky stage). Once the user has scrolled far
  // enough for the Nav to take over its top-left slot, the hero mark
  // fades out so the two don't stack. The threshold matches Nav's
  // own appearance threshold (3.4 viewports).
  const [heroMarkVisible, setHeroMarkVisible] = useState(true);
  useEffect(() => {
    const onScroll = () => {
      const navThreshold = window.innerHeight * 3.4;
      setHeroMarkVisible(window.scrollY < navThreshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!video) return;

        const cta = ctaRef.current;
        const wrapper = videoWrapperRef.current;

        // Uniform shrink ratio for the video wrapper. The wrapper's
        // laid-out height is (100 - VIDEO_TOP_VH)vh; picking the ratio
        // off the height gives us VIDEO_BOTTOM_VH of breathing room
        // at the bottom while scaling both axes equally (so the robot
        // doesn't squish).
        const targetScale =
          (100 - VIDEO_TOP_VH - VIDEO_BOTTOM_VH) / (100 - VIDEO_TOP_VH);

        // Initial state — hidden / full-size. Set explicitly so there's
        // no flash between mount and ScrollTrigger wiring up.
        if (cta) {
          gsap.set(cta, {
            autoAlpha: 0,
            y: 20,
            willChange: "transform, opacity",
          });
        }
        if (wrapper) {
          // Anchor shrink to the top-center: top edge stays at
          // VIDEO_TOP_VH, and the left + right + bottom edges pull
          // inward symmetrically as it shrinks.
          gsap.set(wrapper, {
            scale: 1,
            transformOrigin: "top center",
            willChange: "transform",
          });
        }

        const setupScrub = () => {
          const duration = video.duration || 6;

          // Scrub playback — the only scroll-driven effect on the video.
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

          // Scrubbed CTA reveal over a narrow band (~48–58% of the hero
          // scroll). Scrub = state is always a direct function of scroll
          // position, so it can't get "stuck" the way event-based
          // onEnter/onLeaveBack can if the browser coalesces fast scrolls.
          if (cta) {
            gsap.fromTo(
              cta,
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: container,
                  start: "top+=48% top",
                  end: "top+=58% top",
                  scrub: 0.3,
                },
              },
            );
          }

          // Whole-video shrink — uniform scale keeps aspect ratio
          // (no squish), anchored to top-right so the video stays
          // pinned to the right edge and lifts up from the bottom.
          // GPU-composited (no layout), scrubbed (can't get stuck),
          // and the sticky stage behind is solid white so the
          // revealed margin *is* the padding.
          if (wrapper) {
            gsap.fromTo(
              wrapper,
              { scale: 1 },
              {
                scale: targetScale,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: container,
                  start: "top+=48% top",
                  end: "top+=58% top",
                  scrub: 0.3,
                },
              },
            );
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

          const fallback = setTimeout(() => {
            if (video.readyState < 2) setupScrub();
          }, 1200);

          return () => clearTimeout(fallback);
        }

        return () => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (video) {
          video.loop = true;
          video.muted = true;
          video.autoplay = true;
          video.play().catch(() => {});
        }
      });

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
      {/* Sticky stage — pure white so the video's multiply blend drops
          cleanly onto a neutral canvas (no cream tint on the robot). */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        {/* Dot grid sits under the video so the grid naturally stops at the
            video edges — reinforcing "the video is part of the page". */}
        <div className="dot-grid pointer-events-none absolute inset-0 z-[1] opacity-60" />

        {/* Video pinned to the right. Offset from the top gives real
            whitespace above the frame. Layout is fully inline so the
            video is correctly sized before the stylesheet loads
            (otherwise there's a big → small flash on reload while
            Tailwind's arbitrary-value classes arrive). On narrow
            viewports the video spans full width; on md+ it pins to
            the right and leaves room for the text column. */}
        <div
          ref={videoWrapperRef}
          className="absolute right-0 w-full overflow-hidden md:w-[68vw]"
          style={{
            top: `${VIDEO_TOP_VH}vh`,
            bottom: 0,
            zIndex: 2,
          }}
        >
          <video
            ref={videoRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              mixBlendMode: "multiply",
              zIndex: 2,
            }}
            src="/video/nori-descend.mp4"
            poster="/images/nori-hero.jpg"
            muted
            playsInline
            preload="auto"
          />

          {/* Side fades only — the video's multiply blend handles the
              top/bottom seamlessly against white, but the left/right
              rectangular edges still want feathering. */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-[42%] bg-[linear-gradient(90deg,_#ffffff_0%,_rgba(255,255,255,0)_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[3] w-24 bg-[linear-gradient(270deg,_#ffffff_0%,_rgba(255,255,255,0)_100%)]"
            aria-hidden
          />
        </div>

        {/* Ambient leaf wash — a whisper of green so the hero feels unified
            without tinting the robot. Kept very soft and pushed off-frame. */}
        <div
          className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_5%_35%,_rgba(205,232,181,0.18),_transparent_55%)]"
          aria-hidden
        />

        {/* Text overlay — stays locked on for the full hero scroll
            so "NORI L1" is always anchored to the left column. On
            narrow viewports it anchors to the top-left over the
            video; on md+ it centers vertically in its own column. */}
        <div className="absolute inset-0 z-[5] flex items-start px-5 pt-[22vh] sm:pt-[18vh] md:items-center md:pl-10 md:pr-6 md:pt-0 lg:pl-16">
          <div className="relative flex w-full max-w-[48ch] flex-col justify-center gap-5 md:h-[72vh] md:gap-7">
            <span className="eyebrow">{panels[0].eyebrow}</span>
            <h1 className="font-display text-[clamp(2.9rem,11vw,6.4rem)] leading-[0.9] tracking-tight text-[var(--color-ink)]">
              {panels[0].heading}
            </h1>
            {panels[0].sub && (
              <p className="text-[clamp(1.2rem,4.2vw,1.8rem)] leading-snug text-[var(--color-mute)]">
                {panels[0].sub}
              </p>
            )}
            <div ref={ctaRef} className="mt-3 flex flex-wrap items-center gap-4">
              <ButtonLink
                href="#preorder"
                className="!px-7 !py-4 !text-[16px]"
              >
                Preorder $68
              </ButtonLink>
              <span className="eyebrow !text-[13px]">· $300 off $1,288</span>
            </div>
          </div>
        </div>

        {/* Preorder CTA — right */}
        <Link
          href="#preorder"
          className="absolute right-4 top-4 z-[6] inline-flex items-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-ink)] px-4 py-1.5 text-[13px] font-medium text-[var(--color-paper)] shadow-[var(--shadow-pop)] transition-transform duration-300 hover:-translate-y-0.5 md:right-8 md:top-8"
        >
          Preorder now
        </Link>

        {/* Scroll cue */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-[6] flex -translate-x-1/2 items-center">
          <span className="eyebrow">scroll ↓</span>
        </div>
      </div>

      {/* Brand mark — truly fixed to the viewport (not just sticky
          relative to the hero stage). Fades out once the Nav takes
          over so they don't stack. */}
      <Link
        href="#top"
        aria-label="NORI L1 home"
        className={`fixed left-4 top-4 z-[45] inline-flex items-center gap-1 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-paper)] py-1 pl-1.5 pr-2 text-[var(--color-ink)] shadow-[var(--shadow-soft)] transition-opacity duration-300 nori-ease md:left-6 md:top-6 ${
          heroMarkVisible
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!heroMarkVisible}
      >
        <Image
          src="/Favicon.png"
          alt=""
          width={26}
          height={26}
          className="block h-[26px] w-[26px] rounded-full"
          priority
        />
        <span className="font-display text-[20px] leading-none tracking-tight">
          {copy.brand.name.toLowerCase()}
        </span>
        <span className="ml-0.5 inline-flex h-[18px] items-center rounded-full bg-[var(--color-ink)] px-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-paper)]">
          L1
        </span>
      </Link>
    </section>
  );
}
