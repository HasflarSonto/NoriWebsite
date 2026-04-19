# NORI Website

Single-page marketing site for **NORI L1**, a sub-$1,000 bimanual robot. Built with Next.js 15 (App Router), Tailwind v4, GSAP ScrollTrigger, and Stripe Checkout.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in Stripe + Resend keys
npm run dev
```

Open http://localhost:3000.

## Stack

- **Next.js 15** App Router, TypeScript, React 19
- **Tailwind v4** with custom tokens (`app/globals.css`)
- **GSAP + @gsap/react** ScrollTrigger for the hero scroll-synced video
- **Stripe Checkout** (redirect) via server action + webhook
- **Resend** for preorder confirmation emails
- Hosted on **Vercel**

## Project structure

```
app/
  layout.tsx                 fonts + metadata
  page.tsx                   composes all sections
  globals.css                tokens, hairline, cad-grid, eyebrow
  actions/
    createCheckoutSession.ts server action; zod-validated; returns Stripe URL
  api/stripe/webhook/route.ts verifies signature, sends Resend email
  preorder/success/page.tsx
  preorder/cancel/page.tsx
  opengraph-image.tsx        generated 1200x630 OG
  robots.ts / sitemap.ts
components/
  layout/{Nav,Footer}.tsx
  sections/{Hero,Software,HowItWorks,Comparison,WhoThisIsFor,Preorder}.tsx
  ui/{Button,Input,Eyebrow,Monogram}.tsx
  motion/FadeIn.tsx
content/copy.ts              all copy in one place
lib/{env,stripe,resend}.ts   zod env + service clients
public/
  favicon.svg
  video/nori-descend.mp4     drop real video here
  images/nori-hero.jpg       poster + mobile fallback
  logo/nori-mark.svg         optional custom logo (otherwise monogram is used)
```

## Assets to drop in

- `public/video/nori-descend.mp4` — all-keyframe MP4 of the Z-axis descent
  (encode with `ffmpeg -i in.mov -g 1 -keyint_min 1 -c:v libx264 -pix_fmt yuv420p -movflags +faststart out.mp4`)
- `public/images/nori-hero.jpg` — poster + mobile fallback still
- Optional: `public/logo/nori-mark.svg` to override the built-in lowercase-`n` monogram

A placeholder renders if no MP4 is present, so the scroll mechanic is testable end-to-end immediately.

## Environment variables

See `.env.example`. Required for live payments:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL`

Optional:

- `RESEND_API_KEY`, `RESEND_FROM` — preorder confirmation emails

Without Stripe keys the form still validates and returns a friendly "Payments aren't configured yet" error, so local dev is unblocked.

## Stripe webhook (local)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Put the printed `whsec_…` into `STRIPE_WEBHOOK_SECRET`.

## Scripts

- `npm run dev` — Next dev
- `npm run build` — production build
- `npm run start` — run production build
- `npm run typecheck` — `tsc --noEmit`

## Design tokens

- Background: `#0b0b0c` (near-black)
- Text: `#f5f5f2` (soft-white)
- Mute: `#8a8a86`
- Hairline border: `rgba(245,245,242,0.12)`
- Fonts: Satoshi (headlines) / Inter (body) / JetBrains Mono (eyebrows, code)
- Ease: `cubic-bezier(0.22, 1, 0.36, 1)`
- Radii: `rounded-full` for pills, `rounded-2xl` for cards, `rounded-3xl` for the hero stage

Everything is black-and-white on purpose. No accent color. The "cute" comes from the lowercase-`n` monogram with an eye dot, hairline dividers, and a single gentle ease.
