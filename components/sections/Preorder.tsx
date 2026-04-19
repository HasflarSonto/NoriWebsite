"use client";

import { useActionState, useEffect } from "react";
import {
  createCheckoutSession,
  type CheckoutResult,
} from "@/app/actions/createCheckoutSession";
import { copy } from "@/content/copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/motion/FadeIn";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function Preorder() {
  const [state, formAction, pending] = useActionState<CheckoutResult | null, FormData>(
    createCheckoutSession,
    null,
  );

  useEffect(() => {
    if (state?.ok) {
      window.location.href = state.url;
    }
  }, [state]);

  return (
    <section id="preorder" className="relative overflow-hidden border-t hairline bg-[var(--color-paper-2)]">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--color-leaf)] opacity-70 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[var(--color-sticker)] opacity-70 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-28 md:grid-cols-[1.1fr_1fr] md:px-8 md:py-36">
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

          <FadeIn delay={240}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--color-mute)]">
              {copy.preorder.fine}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={120}>
          <form
            action={formAction}
            className="rounded-[28px] border-2 border-[var(--color-ink)] bg-[var(--color-paper)] p-6 shadow-[var(--shadow-pop)] md:p-7"
          >
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="name">{copy.preorder.fields.name}</Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Ada Lovelace"
                />
                {state && !state.ok && state.fieldErrors?.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {state.fieldErrors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">{copy.preorder.fields.email}</Label>
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
                  {copy.preorder.fields.prompt}
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
                {pending ? "Redirecting…" : copy.preorder.cta}
              </Button>

              <p className="eyebrow text-center">
                Secure checkout via Stripe · Cancel any time before ship
              </p>
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
