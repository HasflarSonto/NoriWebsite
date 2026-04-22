"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Full-viewport splash overlay that locks scroll until the hero
// scroll-scrub video is fully buffered. Fixes the "stuck on one frame
// of the video" race in incognito / cold-cache: the hero's <video>
// element uses preload="auto" which is only a hint, so ScrollTrigger
// can wire up before enough frames are available and seeking fails
// silently on first paint. By pre-fetching the full .mp4 into cache
// and gating scroll until that's done, the <video> element down the
// tree will get HAVE_ENOUGH_DATA immediately on mount.
const VIDEO_URL = "/video/nori-descend.mp4";
// Safety timeout so a flaky network never traps the user on the
// splash forever — after this, we release regardless.
const MAX_WAIT_MS = 6000;
// Minimum display time so it doesn't flash on fast connections.
const MIN_DISPLAY_MS = 450;

export function SplashGate() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    let cancelled = false;
    let fallbackTimer: ReturnType<typeof setTimeout>;
    let fadeTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;

    // Lock scroll while visible.
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const release = () => {
      if (cancelled) return;
      cancelled = true;
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
      fadeTimer = setTimeout(() => {
        setFading(true);
        removeTimer = setTimeout(() => {
          setHidden(true);
          document.documentElement.style.overflow = prevOverflow;
        }, 420);
      }, wait);
    };

    // Preload the entire video file into HTTP cache with progress.
    // Once this resolves, the <video> element inside Hero.tsx will
    // pull from cache and reach readyState >= 4 almost immediately.
    const prefetch = async () => {
      try {
        const res = await fetch(VIDEO_URL, { cache: "force-cache" });
        const total = Number(res.headers.get("content-length")) || 0;
        const reader = res.body?.getReader();
        if (!reader) {
          await res.arrayBuffer();
          release();
          return;
        }
        let received = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) received += value.length;
          if (total > 0) {
            setProgress(Math.min(1, received / total));
          }
        }
        setProgress(1);
        release();
      } catch {
        // Network error — let the user in anyway, the <video> will
        // do its own thing.
        release();
      }
    };

    prefetch();

    // Hard safety: never block the page indefinitely.
    fallbackTimer = setTimeout(release, MAX_WAIT_MS);

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  if (hidden) return null;

  const pct = Math.round(progress * 100);

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-paper)] transition-opacity duration-[420ms] ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ willChange: "opacity" }}
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="floaty inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-paper)] py-1.5 pl-1.5 pr-3 shadow-[var(--shadow-soft)]">
          <Image
            src="/Favicon.png"
            alt=""
            width={34}
            height={34}
            className="block h-[34px] w-[34px] rounded-full"
            priority
          />
          <span className="font-display text-[26px] leading-none tracking-tight">
            nori
          </span>
          <span className="ml-0.5 inline-flex h-[20px] items-center rounded-full bg-[var(--color-ink)] px-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[var(--color-paper)]">
            L1
          </span>
        </div>

        <div className="flex w-[220px] flex-col items-center gap-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full border hairline bg-[var(--color-paper-2)]">
            <div
              className="h-full rounded-full bg-[var(--color-ink)] transition-[width] duration-200 ease-out"
              style={{ width: `${Math.max(6, pct)}%` }}
            />
          </div>
          <span className="eyebrow !text-[11px]">
            {pct >= 100 ? "ready" : "warming up…"}
          </span>
        </div>
      </div>
    </div>
  );
}
