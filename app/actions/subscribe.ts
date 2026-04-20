"use server";

import { z } from "zod";
import { addToAudience, notifyNewSubscriber } from "@/lib/resend";

const schema = z.object({
  email: z.string().email("Valid email required"),
  prompt: z.string().max(1000).optional().default(""),
});

export type SubscribeResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function subscribe(
  _prev: SubscribeResult | null,
  formData: FormData,
): Promise<SubscribeResult> {
  const parsed = schema.safeParse({
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

  const { email, prompt } = parsed.data;

  // Both calls no-op when Resend isn't configured. The user still
  // gets a success state — we're not going to hold up a signup on
  // dev-env infra. If it matters later we can expose a telemetry
  // error, but for the launch the UX comes first.
  await Promise.allSettled([
    addToAudience(email),
    notifyNewSubscriber({ email, prompt: prompt || undefined }),
  ]);

  return { ok: true };
}
