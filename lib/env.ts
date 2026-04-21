import { z } from "zod";

const serverSchema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).optional(),
  // The Stripe Product ID differs between test and live modes —
  // test keys can't reference live products and vice versa. Keeping
  // it in env means local dev points at the test product and prod
  // points at the live product without code changes.
  STRIPE_PRODUCT_ID: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM: z.string().min(1).optional(),
  // Community signup destinations — both optional. Missing =
  // server action no-ops cleanly (signup still shows "you're in"
  // so local dev without Resend configured still looks right).
  RESEND_AUDIENCE_ID: z.string().min(1).optional(),
  RESEND_NOTIFY_TO: z.string().email().optional(),
  KV_REST_API_URL: z.string().url().optional().or(z.literal("")),
  KV_REST_API_TOKEN: z.string().optional(),
});

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

export const serverEnv = serverSchema.parse({
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  STRIPE_PRODUCT_ID: process.env.STRIPE_PRODUCT_ID,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM: process.env.RESEND_FROM,
  RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
  RESEND_NOTIFY_TO: process.env.RESEND_NOTIFY_TO,
  KV_REST_API_URL: process.env.KV_REST_API_URL,
  KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
});

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
