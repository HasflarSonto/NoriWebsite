"use client";

import { useActionState, useEffect } from "react";
import { subscribe, type SubscribeResult } from "@/app/actions/subscribe";
import { copy } from "@/content/copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/motion/FadeIn";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { Button, ButtonLink } from "@/components/ui/Button";

export function Preorder() {
  const [state, formAction, pending] = useActionState<
    SubscribeResult | null,
    FormData
  >(subscribe, null);

  // After a successful subscribe, the UI swaps to a confirmation
  // card. The form state itself is preserved in case the user
  // refreshes, but we don't do anything further here (no redirect,
  // no analytics event — add later if needed).
  useEffect(() => {
    if (state?.ok) {
      // no-op — left as a hook point for tracking later
    }
  }, [state]);

  return (
    <section
      id="preorder"
      className="relative overflow-hidden border-t hairline bg-[var(--color-paper-2)]"
    >
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--color-leaf)] opacity-70 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-sticker)] opacity-70 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-28 md:grid-cols-[1.1fr_1fr] md:px-8 md:py-36">
        {/* Left column — the buy. Price math + scarcity + one big
            button that hops straight to Stripe via /preorder. */}
        <div className="flex flex-col gap-5">
          <FadeIn>
            <Eyebrow>{copy.preorder.eyebrow}</Eyebrow>
          </FadeIn>
          <FadeIn delay={60}>
            <h2 className="font-display text-balance text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-tight">
              {copy.preorder.heading}
            </h2>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="text-lg text-[var(--color-mute)]">
              {copy.preorder.subheading}
            </p>
          </FadeIn>

          <FadeIn delay={180}>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <div className="rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-paper)] px-5 py-3">
                <div className="eyebrow">today</div>
                <div className="mt-1 font-display text-3xl leading-none tracking-tight">
                  $68
                </div>
              </div>
              <div className="rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-leaf)] px-5 py-3">
                <div className="eyebrow">final</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-3xl leading-none tracking-tight">
                    $988
                  </span>
                  <span className="text-sm text-[var(--color-ink-2)] line-through">
                    $1,288
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border-2 border-[var(--color-ink)] bg-[var(--color-sticker)] px-5 py-3">
                <div className="eyebrow">savings</div>
                <div className="mt-1 font-display text-3xl leading-none tracking-tight">
                  −$300
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={220}>
            {/* Scarcity chip — promoted out of fine-print so it's the
                first thing the eye catches under the chips. Blush
                backdrop to read as an alert without being red. */}
            <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-sticker-2)] px-3.5 py-1.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em]">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-ink)]"
                aria-hidden
              />
              {copy.preorder.scarcity}
            </span>
          </FadeIn>

          <FadeIn delay={280}>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <ButtonLink
                href="/preorder"
                className="!px-8 !py-[16px] !text-[18px]"
              >
                {copy.preorder.cta}
                <span aria-hidden className="ml-1">
                  →
                </span>
              </ButtonLink>
              <span className="eyebrow">Secure checkout · Stripe</span>
            </div>
          </FadeIn>

          <FadeIn delay={340}>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-mute)]">
              {copy.preorder.fine}
            </p>
          </FadeIn>
        </div>

        {/* Right column — the curious. Email list + optional prompt.
            Same card treatment as the old form so the layout rhythm
            of this section is preserved. */}
        <FadeIn delay={120}>
          {state?.ok ? (
            <div className="flex h-full flex-col justify-center rounded-[28px] border-2 border-[var(--color-ink)] bg-[var(--color-paper)] p-7 shadow-[var(--shadow-pop)] md:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-leaf)]">
                <span
                  aria-hidden
                  className="font-display text-2xl leading-none"
                >
                  ✓
                </span>
              </div>
              <Eyebrow className="mt-5">{copy.community.eyebrow}</Eyebrow>
              <h3 className="mt-3 font-display text-[2.1rem] leading-[1] tracking-tight">
                {copy.community.success.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-mute)]">
                {copy.community.success.body}
              </p>
            </div>
          ) : (
            <form
              action={formAction}
              className="rounded-[28px] border-2 border-[var(--color-ink)] bg-[var(--color-paper)] p-6 shadow-[var(--shadow-pop)] md:p-7"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <Eyebrow>{copy.community.eyebrow}</Eyebrow>
                  <h3 className="mt-3 font-display text-[1.9rem] leading-[1] tracking-tight">
                    {copy.community.heading}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-mute)]">
                    {copy.community.subheading}
                  </p>
                </div>

                <div>
                  <Label htmlFor="email">{copy.community.fields.email}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@domain.dev"
                  />
                  {state && !state.ok && state.fieldErrors?.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {state.fieldErrors.email[0]}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="prompt" optional>
                    {copy.community.fields.prompt}
                  </Label>
                  <Textarea
                    id="prompt"
                    name="prompt"
                    placeholder="A barista at home. A nightly lab assistant. A robot that folds my laundry…"
                  />
                </div>

                {state && !state.ok && !state.fieldErrors && (
                  <p className="text-sm text-red-600">{state.error}</p>
                )}

                <Button type="submit" disabled={pending} className="mt-2 w-full">
                  {pending ? copy.community.pending : copy.community.cta}
                </Button>

                <p className="eyebrow text-center">{copy.community.fine}</p>
              </div>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
