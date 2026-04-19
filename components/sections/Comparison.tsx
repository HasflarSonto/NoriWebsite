import { copy } from "@/content/copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/motion/FadeIn";

export function Comparison() {
  return (
    <section id="compare" className="border-t hairline bg-[var(--color-paper-2)]">
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
        <FadeIn>
          <Eyebrow>{copy.compare.eyebrow}</Eyebrow>
        </FadeIn>

        <FadeIn delay={60}>
          <h2 className="mt-6 max-w-3xl font-display text-balance text-[clamp(2.6rem,5.5vw,5.25rem)] leading-[0.95] tracking-tight">
            {copy.compare.heading}
          </h2>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-mute)]">
            {copy.compare.subheading}
          </p>
        </FadeIn>

        <FadeIn delay={180}>
          <div className="mt-10 overflow-hidden rounded-[28px] border-2 border-[var(--color-ink)] bg-[var(--color-paper)] shadow-[var(--shadow-pop)]">
            <div className="grid grid-cols-[1.1fr_1fr_1fr]">
              <div className="border-b-2 border-[var(--color-ink)] bg-[var(--color-paper-3)] px-4 py-4 text-left text-xs font-mono uppercase tracking-[0.14em] text-[var(--color-mute)] md:px-6">
                Spec
              </div>
              <div className="border-b-2 border-l-2 border-[var(--color-ink)] bg-[var(--color-leaf)] px-4 py-4 text-left md:px-6">
                <div className="flex items-center gap-2">
                  <span className="font-display text-[1.25rem] leading-none text-[var(--color-ink)] md:text-[1.5rem]">
                    nori L1
                  </span>
                  <span className="rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-paper)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-ink)]">
                    preorder
                  </span>
                </div>
              </div>
              <div className="border-b-2 border-l-2 border-[var(--color-ink)] bg-[var(--color-paper-3)] px-4 py-4 text-left md:px-6">
                <span className="font-display text-[1.25rem] leading-none text-[var(--color-mute)] md:text-[1.5rem]">
                  Unitree G1
                </span>
              </div>

              {copy.compare.rows.map((row, i) => {
                const last = i === copy.compare.rows.length - 1;
                const band = i % 2 ? "bg-[var(--color-paper-2)]" : "bg-[var(--color-paper)]";
                return (
                  <div key={row.label} className="contents">
                    <div
                      className={`${band} px-4 py-4 text-[15px] text-[var(--color-mute)] md:px-6 ${
                        last ? "" : "border-b border-[var(--color-line)]"
                      }`}
                    >
                      {row.label}
                    </div>
                    <div
                      className={`${band} border-l-2 border-[var(--color-ink)] px-4 py-4 text-[15px] font-semibold text-[var(--color-ink)] md:px-6 ${
                        last ? "" : "border-b border-[var(--color-line)]"
                      }`}
                    >
                      {row.nori}
                    </div>
                    <div
                      className={`${band} border-l-2 border-[var(--color-ink)] px-4 py-4 text-[15px] text-[var(--color-mute)] md:px-6 ${
                        last ? "" : "border-b border-[var(--color-line)]"
                      }`}
                    >
                      {row.g1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
