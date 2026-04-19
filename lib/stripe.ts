import Stripe from "stripe";
import { serverEnv } from "./env";

let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (!serverEnv.STRIPE_SECRET_KEY) return null;
  if (cached) return cached;
  cached = new Stripe(serverEnv.STRIPE_SECRET_KEY, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  });
  return cached;
}
