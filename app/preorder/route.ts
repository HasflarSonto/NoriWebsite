import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { publicEnv } from "@/lib/env";

// GET /preorder — creates a Stripe Checkout session on the fly and
// redirects the browser straight to Stripe. Every Preorder CTA on
// the site points here, so there's no intermediate "enter your
// name + email" form (Stripe collects that itself).
//
// This is a Route Handler (not a Page) so there's no render cycle —
// the server calls Stripe and returns a 303 redirect in one round
// trip. Fast enough that a link to `/preorder` feels like a direct
// link to Stripe.
export async function GET(req: NextRequest) {
  const stripe = getStripe();

  // Graceful fallback — if payments aren't configured, send the
  // user to the cancel page with a small error marker rather than
  // a 500. Matches the degradation behavior in the rest of the
  // codebase (sendPreorderConfirmation also no-ops if unset).
  if (!stripe) {
    return NextResponse.redirect(
      new URL("/preorder/cancel?reason=not_configured", req.url),
      303,
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: 6800, // $68.00
            // Stripe-managed Product — name/description/image live in
            // the Dashboard. See prod_UN80ldyCb8IQoW.
            product: "prod_UN80ldyCb8IQoW",
          },
        },
      ],
      success_url: `${publicEnv.NEXT_PUBLIC_SITE_URL}/preorder/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${publicEnv.NEXT_PUBLIC_SITE_URL}/preorder/cancel`,
    });

    if (!session.url) {
      return NextResponse.redirect(
        new URL("/preorder/cancel?reason=no_url", req.url),
        303,
      );
    }

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("[preorder] Stripe session creation failed:", err);
    return NextResponse.redirect(
      new URL("/preorder/cancel?reason=stripe_error", req.url),
      303,
    );
  }
}
