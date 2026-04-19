import { copy } from "@/content/copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/motion/FadeIn";

export function WhoThisIsFor() {
  return (
    <section id="who" className="border-t hairline">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-28 md:grid-cols-[1fr_1.3fr] md:px-8 md:py-36">
        <div className="flex flex-col gap-4">
          <FadeIn>
            <Eyebrow>{copy.who.eyebrow}</Eyebrow>
          </FadeIn>
          <FadeIn delay={60}>
            <h2 className="font-display text-balance text-[clamp(2.3rem,4.8vw,4rem)] leading-[0.95] tracking-tight">
              {copy.who.heading}
            </h2>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-6">
          {copy.who.blocks.map((b, i) => (
            <FadeIn key={b.title} delay={100 + i * 80}>
              <div
                className="rounded-[24px] border-2 border-[var(--color-ink)] p-6 md:p-7"
                style={{
                  background:
                    i === 0 ? "var(--color-sticker)" : "var(--color-leaf)",
                }}
              >
                <h3 className="font-display text-[1.5rem] leading-[1.05] tracking-tight md:text-[1.85rem]">
                  {b.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-2)]">
                  {b.body}
                </p>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={280}>
            <ul className="mt-4 grid gap-3">
              {copy.who.bullets.map((b, i) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper-2)] px-4 py-3 text-[15px] text-[var(--color-ink)]"
                >
                  <span className="mt-[2px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-paper)] font-mono text-[10px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
