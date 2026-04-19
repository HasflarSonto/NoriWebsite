import { copy } from "@/content/copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/motion/FadeIn";

function StepGlyph({ n }: { n: string }) {
  if (n === "01") {
    return (
      <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
        <rect x="6" y="10" width="14" height="28" rx="4" fill="currentColor" opacity=".1" />
        <rect x="6" y="10" width="14" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="22" y="18" width="20" height="20" rx="4" fill="currentColor" opacity=".1" />
        <rect x="22" y="18" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="29" cy="28" r="2" fill="currentColor" />
        <circle cx="35" cy="28" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (n === "02") {
    return (
      <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
        <circle cx="24" cy="24" r="18" fill="currentColor" opacity=".08" />
        <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="5" fill="currentColor" />
        <path d="M24 6 v4 M24 38 v4 M6 24 h4 M38 24 h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
      <rect x="6" y="10" width="36" height="28" rx="5" fill="currentColor" opacity=".08" />
      <rect x="6" y="10" width="36" height="28" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M14 20 l-4 4 l4 4 M34 20 l4 4 l-4 4 M22 30 l4 -12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const cardTints = [
  "var(--color-sticker)",
  "var(--color-leaf)",
  "var(--color-sticker-2)",
];

export function HowItWorks() {
  return (
    <section id="how" className="border-t hairline">
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
        <FadeIn>
          <Eyebrow>{copy.how.eyebrow}</Eyebrow>
        </FadeIn>

        <FadeIn delay={60}>
          <h2 className="mt-6 max-w-2xl font-display text-balance text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.95] tracking-tight">
            {copy.how.heading}
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {copy.how.steps.map((step, i) => (
            <FadeIn key={step.n} delay={100 + i * 80}>
              <article
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border-2 border-[var(--color-ink)] p-7 transition-transform duration-300 bounce-ease hover:-translate-y-1"
                style={{ background: cardTints[i] }}
              >
                <div className="flex items-start justify-between text-[var(--color-ink)]">
                  <span className="inline-flex items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-paper)] px-3 py-1 font-mono text-[11px] tracking-[0.14em]">
                    {step.n}
                  </span>
                  <div className="rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-paper)] p-2 text-[var(--color-ink)]">
                    <StepGlyph n={step.n} />
                  </div>
                </div>
                <div className="mt-12 text-[var(--color-ink)]">
                  <h3 className="font-display text-[1.9rem] leading-[1.02] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-2)]">
                    {step.body}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
