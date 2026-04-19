# CLAUDE.md

Guidance for Claude Code working in this repo.

## What this is

Single-page marketing + preorder site for **NORI L1**, a sub-$1,000 bimanual
robot. Target audience: software developers who can "vibe code" but have zero
hardware experience. Conversion goal: a $68 Stripe preorder deposit that locks
in $300 off the final $1,288 price (final cost $988).

Tone: technical, direct, not consumer-fluffy. Visual style: cute-but-restrained
light paper + black ink, four-leaf-clover "trifoglio" monogram, bubbly display
type. Think Apple hardware page wearing a friendly sticker.

## Stack (pinned choices)

- **Next.js 15 (App Router)** + React 19 + TypeScript (strict)
- **Tailwind CSS v4** with tokens in `app/globals.css` under `@theme {}`
- **GSAP 3 + @gsap/react** — `useGSAP`, `ScrollTrigger`; **no Lenis** (keeps
  scroll-driven video predictable)
- **Stripe Checkout (redirect)** via server action + webhook Route Handler
- **Resend** for preorder confirmation email
- **Zod** for env + form validation
- Deploy target: **Vercel**. Sitting on `main` branch of
  `git@github.com:HasflarSonto/NoriWebsite.git`.

## Scripts

```bash
npm run dev        # next dev (currently uses shell 016d4f in sessions)
npm run build      # next build — must stay green
npm run start      # production build
npm run typecheck  # tsc --noEmit — must stay green
```

Environment loaded from `.env.local` (see `.env.example`). `lib/env.ts`
zod-validates everything; missing Stripe keys degrade gracefully (form returns a
friendly error instead of crashing).

## Project map

```
app/
  layout.tsx                 Google fonts (Fredoka, Bagel Fat One, JetBrains Mono) + metadata
  page.tsx                   Composes Nav / Hero / Software / HowItWorks / Comparison / WhoThisIsFor / Preorder / Footer
  globals.css                Tailwind v4 @theme tokens; utilities (dot-grid, hairline, eyebrow, hover-wiggle, floaty)
  opengraph-image.tsx        Edge-rendered 1200x630 OG
  robots.ts, sitemap.ts
  actions/
    createCheckoutSession.ts "use server" — zod-validate → stripe.checkout.sessions.create → return url
  api/stripe/webhook/route.ts Signature-verified; on checkout.session.completed → sendPreorderConfirmation
  preorder/success/page.tsx  awaits searchParams (Next 15 async)
  preorder/cancel/page.tsx

components/
  layout/{Nav,Footer}.tsx    Sticky nav with scroll-triggered backdrop blur
  sections/
    Hero.tsx                 CRITICAL: scroll-scrubbed video + CTA/scale reveals
    Software.tsx
    HowItWorks.tsx           3 color-blocked cards (sticker / leaf / sticker-2 tints)
    Comparison.tsx           NORI vs Unitree G1 table; NORI column on --color-leaf
    WhoThisIsFor.tsx
    Preorder.tsx             "use client" form → useActionState → Stripe redirect
  ui/{Button,Input,Eyebrow}.tsx
  motion/FadeIn.tsx          IntersectionObserver-based reveal

content/copy.ts              ALL COPY LIVES HERE. Editing marketing text = edit this file.

lib/
  env.ts                     zod-validated process.env
  stripe.ts                  lazy Stripe client; null if key missing
  resend.ts                  sendPreorderConfirmation(); no-op if unset

public/
  Favicon.png                Brand mark — used in Nav, Footer, Hero, preorder pages, and as the tab icon
  video/nori-descend.mp4     Scroll-scrub source (binary in git for now)
  images/nori-hero.jpg       Poster + mobile fallback
```

## Design system

Tokens are in `app/globals.css` under `@theme`. Use them via `var(--color-*)` —
**don't hardcode hex values in components.**

| Token                    | Value     | Use                              |
| ------------------------ | --------- | -------------------------------- |
| `--color-paper`          | `#fbfaf5` | Page background, default surface |
| `--color-paper-2`        | `#f3f1e8` | Alt band (Comparison, Preorder)  |
| `--color-paper-3`        | `#ebe8db` | Table header band                |
| `--color-ink`            | `#14131a` | Text, borders, primary button    |
| `--color-ink-2`          | `#2a2833` | Primary button hover             |
| `--color-mute`           | `#6b6878` | Secondary text                   |
| `--color-line` / `-strong` | 14% / 28% ink | Hairlines                  |
| `--color-leaf`           | `#cde8b5` | Trifoglio green accent tile      |
| `--color-sticker`        | `#ffe9a8` | Custard accent tile              |
| `--color-sticker-2`      | `#ffd4d4` | Blush accent tile                |

Typography:
- `--font-display` → **Bagel Fat One** (Google Fonts, closest free CC Trifoglio
  alternative). Use via `font-display` utility. Headlines only.
- `--font-body` → **Fredoka**. Default on `<body>`.
- `--font-mono` → **JetBrains Mono**. Use `.font-mono` or the `.eyebrow`
  utility (adds uppercase + tracking + mute color).

Easings:
- `--ease-nori` → `cubic-bezier(0.22, 1, 0.36, 1)` — default for opacity/color.
- `--ease-bounce` → `cubic-bezier(0.34, 1.56, 0.64, 1)` — buttons, hover lifts.

Utilities worth knowing:
- `.hairline` / `.hairline-strong` — border color shortcuts.
- `.dot-grid` — subtle paper-grid background.
- `.eyebrow` — the mono `// label`-style text (use inside `<Eyebrow>`).
- `.hover-wiggle` — 420ms rotate keyframe on hover. On the brand-mark icon.
- `.floaty` — 3.4s gentle vertical bob.

Shape language: `rounded-full` pills, `rounded-2xl` form fields, `rounded-[24px]
→ rounded-[36px]` for cards (bigger radius = bigger card). **2px ink borders**
are the signature — `border-2 border-[var(--color-ink)]`.

## The scroll-synced hero (most fragile piece)

`components/sections/Hero.tsx` pins a `h-screen` stage inside a 400vh section
and maps scroll progress → `video.currentTime`. Read this before touching it.

Current behavior:

- **Layout**: Sticky stage is `bg-white` (not `--color-paper`) — the video's
  `mix-blend-mode: multiply` needs a pure white backdrop or the robot picks up
  a cream tint. The video is pinned to the right at `w-full md:w-[68vw]`, with
  a `VIDEO_TOP_VH` (5) gap up top and a scroll-revealed `VIDEO_BOTTOM_VH` (3)
  gap at the bottom. The text column ("NORI L1" + subtext + CTA) sits on the
  left and is **always visible** — there's only one panel.
- **Scrub**: a single `gsap.to(video, { currentTime: duration, scrub: 0.4 })`
  tied to the full 400vh. That's the only scroll-driven effect on the video
  itself.
- **CTA reveal**: the Preorder-$68 button starts `autoAlpha: 0, y: 20` and
  reveals via a **scrubbed** `fromTo` over a narrow band (`top+=48% top` →
  `top+=58% top`). Scrub-based (not `onEnter`/`onLeaveBack`) so state always
  matches scroll position — it can't get stuck if the browser coalesces fast
  scrolls.
- **Whole-video shrink**: in the same band, the video wrapper tweens `scale`
  from `1` → `(100 - TOP - BOTTOM) / (100 - TOP)` (~0.968) with
  `transform-origin: top center`. Uniform scale keeps aspect ratio (no squish);
  transforms are GPU-composited (no layout thrash). The revealed white strip
  underneath *is* the bottom padding — no mask div needed.
- **Performance hints**: `will-change: transform, opacity` on the CTA and
  `will-change: transform` on the wrapper. The multiply blend gets a dedicated
  compositor layer via `transform: translateZ(0)` on the wrapper (otherwise it
  forces a full-page repaint per frame).

Rules:

1. **Don't animate layout properties** (`bottom`, `height`, `top`) on
   scroll — only `transform` and `opacity`. Layout tweens stutter and cause
   stuck states. Use scrub for anything that must reverse cleanly.
2. **`gsap.matchMedia()`** gates:
   - `(prefers-reduced-motion: no-preference)` — scrub + CTA + shrink run
     at every width.
   - `(prefers-reduced-motion: reduce)` — video autoplays in a loop; no
     scroll-driven effects.
3. **iOS unlock dance**: `video.play().catch(() => {}); video.pause();
   video.currentTime = 0.001;` before ScrollTrigger setup. Video must be
   `muted`, `playsInline`, `preload="auto"`.
4. **Encode the source correctly** or scrubbing will stutter:
   ```
   ffmpeg -i in.mov -g 1 -keyint_min 1 -c:v libx264 \
          -pix_fmt yuv420p -movflags +faststart out.mp4
   ```
   (Every frame a keyframe. Without this, seeking lurches between GOPs.)
5. **1.2s fallback**: if `loadedmetadata` never fires, scrub is still wired
   up after 1.2s so dev-without-assets still works.
6. **Brand mark**: the top-left pill is rendered *outside* the sticky stage
   as `position: fixed`, with a local scroll listener that mirrors Nav's
   3.4-viewport threshold and fades it out as the Nav fades in. Keeps the
   two brand marks from stacking.

If scrubbing feels bad on iOS Safari, the escape hatch is a JPEG frame
sequence + canvas (swap the `<video>` for a numbered-frame loader). Don't go
there unless you've confirmed it's the encoding.

## Stripe + emails

`createCheckoutSession` (server action) does:
1. Zod-parse FormData
2. Build a `payment` session, $68.00 (6800), with metadata
   `{ preorder_name, preorder_prompt }`
3. Returns `{ ok, url }`; the client `useActionState` hook does
   `window.location.href = url`

`/api/stripe/webhook` only reacts to `checkout.session.completed`. Calls
`sendPreorderConfirmation` (Resend). Both Stripe and Resend are optional — if
env vars are absent the system no-ops cleanly.

Webhook local testing:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Paste the printed `whsec_…` into `.env.local` as `STRIPE_WEBHOOK_SECRET`.

## Conventions

- **Copy lives in `content/copy.ts`**. Never hardcode marketing text in section
  components. Change the words, not the markup.
- **Client components** only where needed (Hero, Nav, Preorder, FadeIn). Prefer
  server components.
- **`"use server"` actions** over API routes for form submissions. Reserve
  route handlers for webhooks (signature verification needs the raw body).
- **Accessibility**: decorative SVGs get `aria-hidden`; all interactive
  elements have focus states (`focus:shadow-[0_0_0_4px_var(--color-sticker)]`
  on inputs).
- **Reduced motion** is honored via a global CSS block in `globals.css` AND via
  `gsap.matchMedia` in the hero.
- **No emojis in code or commit messages** unless explicitly requested.
- **No AI attribution** in commit messages or authorship (user preference).

## Things to avoid

- Don't add Lenis / Locomotive / other smooth-scroll libs — the scrub has been
  tuned without them.
- Don't hardcode colors. Use tokens.
- Don't introduce a CMS or i18n for v1. Copy is static.
- Don't touch `.env.local` values programmatically; they're user-managed.
- Don't reintroduce Inter or a second body font — Fredoka is the only body face.
- Don't use Bagel Fat One below ~20px; it's a display face and gets mushy small.

## Open follow-ups

- Video/poster currently tracked in git. If they grow, switch to Git LFS or
  host on a CDN and fetch from there.
- Footer links (GitHub/Discord/LinkedIn) are placeholder URLs. Update in
  `content/copy.ts` when the real handles exist.
- Add Vercel KV preorder table + Resend templates as volume scales.
- No analytics beyond Vercel's built-in. Add Plausible / Posthog if needed.

## Useful commands recap

```bash
# Start / verify
npm run dev
npm run typecheck && npm run build

# Stripe local webhook
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Push to origin
git push origin main
```
