import { copy } from "@/content/copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/motion/FadeIn";
import { FlipCard } from "@/components/ui/FlipCard";

// "Affordable & Capable" — replaces the former Software section.
// Five flip cards showing the robot doing real tasks (hover to play).
export function Capable() {
  return (
    <section id="capable" className="border-t hairline bg-[var(--color-paper)]">
      <div className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
        <FadeIn>
          <Eyebrow>{copy.capable.eyebrow}</Eyebrow>
        </FadeIn>
        <FadeIn delay={60}>
          <h2 className="mt-6 max-w-3xl font-display text-balance text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.95] tracking-tight">
            {copy.capable.heading}
          </h2>
        </FadeIn>
        <FadeIn delay={120}>
          <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-[var(--color-mute)] md:text-lg">
            {copy.capable.body}
          </p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {copy.capable.cards.map((card, i) => (
            <FadeIn
              key={card.slug}
              delay={100 + i * 60}
              className={
                // 5-card asymmetric grid on lg: 3 cards top row (span 2 each),
                // 2 cards bottom row centered (span 3 each).
                i < 3
                  ? "lg:col-span-2"
                  : "lg:col-span-3"
              }
            >
              <FlipCard
                label={card.label}
                category={card.category}
                tint={card.tint}
                caption={card.caption}
                video={card.video}
                poster={card.poster}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
