import { Resend } from "resend";
import { serverEnv } from "./env";

let cached: Resend | null = null;

export function getResend(): Resend | null {
  if (!serverEnv.RESEND_API_KEY) return null;
  if (cached) return cached;
  cached = new Resend(serverEnv.RESEND_API_KEY);
  return cached;
}

export async function sendPreorderConfirmation(params: {
  to: string;
  name: string;
  amount: number;
}) {
  const resend = getResend();
  if (!resend || !serverEnv.RESEND_FROM) return { skipped: true };

  const subject = "Your NORI preorder is confirmed";
  const html = `
    <div style="font-family: -apple-system, 'Inter', sans-serif; background:#0b0b0c; color:#f5f5f2; padding:32px; border-radius:12px; max-width:560px; margin:0 auto;">
      <div style="font-family:'JetBrains Mono', ui-monospace, monospace; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:#8a8a86;">// preorder confirmed</div>
      <h1 style="font-size:28px; margin:12px 0 8px; letter-spacing:-0.02em;">Welcome to NORI, ${params.name}.</h1>
      <p style="color:#c7c7c2; line-height:1.6;">
        Your $${(params.amount / 100).toFixed(2)} deposit is in. We'll email you before we ship with
        final-payment instructions and a GitHub + Discord invite.
      </p>
      <p style="color:#8a8a86; font-size:13px; margin-top:24px;">— Antonio, NORI (Columbia)</p>
    </div>
  `;

  return resend.emails.send({
    from: serverEnv.RESEND_FROM,
    to: params.to,
    subject,
    html,
  });
}
