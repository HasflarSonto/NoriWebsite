import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { serverEnv } from "./env";

// Server-side admin client. Uses the service-role key, which bypasses
// row-level security — NEVER import this from client components. Lazy
// so that bundling doesn't fail when env vars are missing (e.g. a PR
// preview without the integration wired up).
let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached) return cached;
  if (!serverEnv.SUPABASE_URL || !serverEnv.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }
  cached = createClient(
    serverEnv.SUPABASE_URL,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
  return cached;
}
