import { NextResponse } from "next/server";

// GET /preorder — 303-redirects to the hosted Stripe Payment Link.
// Every Preorder CTA on the site points here, so swapping the
// destination in one place re-routes the whole funnel.
const PAYMENT_LINK = "https://buy.stripe.com/bJe3cxeCq4SJ88C6GQ3VC00";

export function GET() {
  return NextResponse.redirect(PAYMENT_LINK, 303);
}
