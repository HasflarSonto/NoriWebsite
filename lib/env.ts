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
  // Supabase — community signup list. URL comes from the public env
  // (Next.js marks NEXT_PUBLIC_* vars as client-readable but they're
  // also available server-side). The service-role key is server-only;
  // it bypasses RLS so keep it out of any client bundle. Missing =
  // subscribe action no-ops (form still says "you're in" so local dev
  // without Supabase wired up still looks right).
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
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
  // Vercel's Supabase integration prefixes env vars with the database
  // name (e.g. `noril1_POSTGRES_URL`). Read the prefixed form as a
  // fallback so the code stays portable across integrations.
  SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.NEXT_PUBLIC_noril1_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY:
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.noril1_SUPABASE_SERVICE_ROLE_KEY,
});

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
