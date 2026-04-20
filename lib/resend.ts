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

// Adds a contact to the Resend Audience for launch updates. No-op
// when RESEND_AUDIENCE_ID isn't set (local dev, first deploy).
export async function addToAudience(email: string) {
  const resend = getResend();
  if (!resend || !serverEnv.RESEND_AUDIENCE_ID) return { skipped: true };

  try {
    return await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: serverEnv.RESEND_AUDIENCE_ID,
    });
  } catch (err) {
    // Don't fail the whole submission if the contact already exists
    // or the API hiccups — the user's intent was expressed, we'll
    // retry/reconcile later.
    console.error("[resend] addToAudience failed:", err);
    return { error: true };
  }
}

// Sends a notification email to RESEND_NOTIFY_TO whenever someone
// joins the community list. Carries their email + optional prompt
// so you see signup intent in your inbox without needing a DB.
export async function notifyNewSubscriber(params: {
  email: string;
  prompt?: string;
}) {
  const resend = getResend();
  if (!resend || !serverEnv.RESEND_FROM || !serverEnv.RESEND_NOTIFY_TO) {
    return { skipped: true };
  }

  const subject = `New NORI subscriber · ${params.email}`;
  const promptBlock = params.prompt
    ? `<p style="color:#c7c7c2; line-height:1.6;"><strong style="color:#f5f5f2;">What they'd build:</strong><br/>${params.prompt.replace(/\n/g, "<br/>")}</p>`
    : `<p style="color:#8a8a86; font-style:italic;">No build prompt submitted.</p>`;

  const html = `
    <div style="font-family: -apple-system, 'Inter', sans-serif; background:#0b0b0c; color:#f5f5f2; padding:32px; border-radius:12px; max-width:560px; margin:0 auto;">
      <div style="font-family:'JetBrains Mono', ui-monospace, monospace; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:#8a8a86;">// new subscriber</div>
      <h1 style="font-size:24px; margin:12px 0 8px; letter-spacing:-0.02em;">${params.email}</h1>
      ${promptBlock}
      <p style="color:#8a8a86; font-size:13px; margin-top:24px;">Auto-added to the launch audience.</p>
    </div>
  `;

  return resend.emails.send({
    from: serverEnv.RESEND_FROM,
    to: serverEnv.RESEND_NOTIFY_TO,
    subject,
    html,
  });
}
