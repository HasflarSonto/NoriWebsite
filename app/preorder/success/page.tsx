import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = {
  title: "Preorder confirmed — NORI",
};

export default async function PreorderSuccessPage({
  searchParams,
}: {
  searchParams?: Promise<{ session_id?: string }>;
}) {
  const params = (await searchParams) ?? {};
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="w-full max-w-lg rounded-[32px] border-2 border-[var(--color-ink)] bg-[var(--color-paper)] p-8 text-center shadow-[var(--shadow-pop)] md:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-leaf)]">
          <Image
            src="/Favicon.png"
            alt=""
            width={28}
            height={28}
            className="block h-7 w-7 rounded-full"
          />
        </div>
        <div className="eyebrow mt-6">// preorder confirmed</div>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-[0.95] tracking-tight">
          you&apos;re in!
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-mute)]">
          Thanks for backing NORI. We&apos;ll email you a GitHub + Discord invite shortly, and again
          before we ship with final-payment instructions.
        </p>

        {params.session_id && (
          <p className="eyebrow mt-6 break-all">ref · {params.session_id}</p>
        )}

        <div className="mt-8 flex items-center justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <Link
            href="https://github.com"
            className="text-sm text-[var(--color-mute)] underline underline-offset-4 hover:text-[var(--color-ink)]"
          >
            Open GitHub
          </Link>
        </div>
      </div>
    </main>
  );
}
