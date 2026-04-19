import { copy } from "@/content/copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/motion/FadeIn";

export function Software() {
  return (
    <section
      id="software"
      className="relative overflow-hidden border-t hairline"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-80" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--color-paper)] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-paper)] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 px-5 py-32 text-center md:py-40">
        <FadeIn>
          <Eyebrow>{copy.software.eyebrow}</Eyebrow>
        </FadeIn>

        <FadeIn delay={60}>
          <h2 className="font-display text-balance text-[clamp(2.6rem,5.5vw,4.75rem)] leading-[0.95] tracking-tight">
            {copy.software.heading}
          </h2>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="max-w-2xl text-pretty text-[17px] leading-relaxed text-[var(--color-mute)] md:text-lg">
            {copy.software.body}
          </p>
        </FadeIn>

        <FadeIn delay={180}>
          <div className="group mt-2 inline-flex items-center gap-3 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-paper)] px-4 py-2 shadow-[var(--shadow-soft)]">
            <span className="flex gap-1" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-sticker-2)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-sticker)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-leaf)]" />
            </span>
            <code className="font-mono text-sm text-[var(--color-ink)]">
              {copy.software.snippet}
            </code>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
