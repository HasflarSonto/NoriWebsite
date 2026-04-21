"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

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
  const supabase = getSupabaseAdmin();

  // No DB configured = silent success. Preserves local-dev UX and
  // means a PR preview without the integration wired up still
  // submits cleanly instead of 500ing. If you want to know when
  // this happens in prod, wire a console.warn to your logs.
  if (!supabase) {
    console.warn("[subscribe] Supabase not configured — signup dropped");
    return { ok: true };
  }

  // Light metadata — useful later for fraud filtering and
  // answering "where did this signup come from?". Not PII beyond
  // what the user already submitted.
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    null;
  const userAgent = h.get("user-agent") ?? null;

  const { error } = await supabase.from("signups").insert({
    email: email.toLowerCase(),
    prompt: prompt || null,
    ip,
    user_agent: userAgent,
  });

  // Unique-on-lower(email) → duplicate submissions come back as
  // Postgres error 23505. Treat those as success (the user is
  // already on the list, no need to scare them with "already
  // subscribed"). Any other error is a real problem.
  if (error && error.code !== "23505") {
    console.error("[subscribe] Supabase insert failed:", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
