import { copy } from "@/content/copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  SAMPLE_SKILLS,
  CATEGORY_TINT,
  fmtInstalls,
} from "@/content/skills-sample";

// "NORI gets smarter with every user" — replaces the former HowItWorks
// section. Showcases the companion NoriSkillHub registry with 6 hand-
// picked skills. Lives between Capable (paper) and Comparison (paper-2).
export function SharedSkills() {
  return (
    <section id="skills" className="border-t hairline bg-[var(--color-paper)]">
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
        <FadeIn>
          <Eyebrow>{copy.shared.eyebrow}</Eyebrow>
        </FadeIn>
        <FadeIn delay={60}>
          <h2 className="mt-6 max-w-3xl font-display text-balance text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
            {copy.shared.heading}
          </h2>
        </FadeIn>
        <FadeIn delay={120}>
          <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-[var(--color-mute)] md:text-lg">
            {copy.shared.body}
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_SKILLS.map((skill, i) => (
            <FadeIn key={skill.slug} delay={100 + i * 60}>
              <article className="flex h-full flex-col rounded-[24px] border-2 border-[var(--color-ink)] bg-[var(--color-paper)] p-6 transition-[transform,box-shadow] duration-200 bounce-ease hover:-translate-y-1 hover:shadow-[var(--shadow-pop)]">
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--color-ink)] px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                    style={{ background: CATEGORY_TINT[skill.category] }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--color-ink)" }}
                      aria-hidden
                    />
                    {`// ${skill.category}`}
                  </span>
                  <span className="eyebrow">v{skill.version}</span>
                </div>

                <h3 className="mt-5 font-display text-[1.6rem] leading-[1.02] tracking-tight">
                  {skill.name}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-mute)]">
                  {skill.tagline}
                </p>

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="font-mono text-[var(--color-ink-2)]">
                      @{skill.author}
                    </span>
                    <span className="eyebrow">
                      {fmtInstalls(skill.installs)} installs
                    </span>
                  </div>
                  <div className="mt-3 truncate rounded-xl border hairline bg-[var(--color-paper-2)] px-3 py-2 font-mono text-[12px] text-[var(--color-ink)]">
                    <code>{skill.snippet}</code>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
