"use server";

import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { publicEnv } from "@/lib/env";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Valid email required"),
  prompt: z.string().max(1000).optional().default(""),
});

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function createCheckoutSession(
  _prev: CheckoutResult | null,
  formData: FormData,
): Promise<CheckoutResult> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    prompt: formData.get("prompt") ?? "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const stripe = getStripe();
  if (!stripe) {
    return {
      ok: false,
      error:
        "Payments aren't configured yet. Set STRIPE_SECRET_KEY in your environment.",
    };
  }

  const { name, email, prompt } = parsed.data;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: 6800, // $68.00
            product_data: {
              name: "NORI L1 — Preorder Deposit",
              description:
                "$68 refundable deposit. $300 off the final $1,288 price. Final cost: $988.",
            },
          },
        },
      ],
      metadata: {
        preorder_name: name,
        preorder_prompt: prompt.slice(0, 500),
      },
      success_url: `${publicEnv.NEXT_PUBLIC_SITE_URL}/preorder/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${publicEnv.NEXT_PUBLIC_SITE_URL}/preorder/cancel`,
    });

    if (!session.url) {
      return { ok: false, error: "Stripe did not return a session URL." };
    }

    return { ok: true, url: session.url };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error creating session";
    return { ok: false, error: message };
  }
}
