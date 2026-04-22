"use client";

import { useState } from "react";

// A tap/hover-to-flip card. 3D flip via Tailwind v4 arbitrary-value
// utilities (no library). Hover on desktop, tap on touch. Reduced-motion
// degrades cleanly because the global CSS zeros transition durations.
export function FlipCard({
  label,
  category,
  tint,
  caption,
  video,
  poster,
}: {
  label: string;
  category: string;
  tint: string;
  caption: string;
  video: string;
  poster: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${label} — tap to ${flipped ? "hide" : "play"} video`}
      className="group relative block h-full w-full cursor-pointer text-left [perspective:1200px] focus:outline-none"
    >
      <div
        className={`relative w-full rounded-[28px] transition-transform duration-500 [aspect-ratio:4/3] [transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{ willChange: "transform" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[28px] border-2 border-[var(--color-ink)] p-6 [backface-visibility:hidden] md:p-7"
          style={{ background: tint }}
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-paper)] px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em]">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-ink)" }}
                aria-hidden
              />
              {`// ${category}`}
            </span>
            <span className="eyebrow">hover →</span>
          </div>

          <div>
            <h3 className="font-display text-[2rem] leading-[1] tracking-tight md:text-[2.3rem]">
              {label}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-2)]">
              {caption}
            </p>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 overflow-hidden rounded-[28px] border-2 border-[var(--color-ink)] bg-black [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <video
            className="h-full w-full object-cover"
            src={video}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
            <span className="rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-paper)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
              {label}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
