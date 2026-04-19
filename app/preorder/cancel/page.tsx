import { Monogram } from "@/components/ui/Monogram";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = {
  title: "Preorder canceled — NORI",
};

export default function PreorderCancelPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-lg rounded-[32px] border-2 border-[var(--color-ink)] bg-[var(--color-paper)] p-8 text-center shadow-[var(--shadow-pop)] md:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-sticker-2)]">
          <Monogram size={28} />
        </div>
        <div className="eyebrow mt-6">// checkout canceled</div>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-[0.95] tracking-tight">
          no harm done.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-mute)]">
          Your card wasn&apos;t charged. Come back any time — the $300-off preorder window is open until we ship.
        </p>
        <div className="mt-8">
          <ButtonLink href="/#preorder">Try again</ButtonLink>
        </div>
      </div>
    </main>
  );
}
