import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NORI L1 — a sub-$1,000 robot anyone can program";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Embed the real robot hero shot on the right half of the card so the
// OG preview looks like a product page, not a plain text slug.
export default async function OGImage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000";

  // next/og's <img> can fetch absolute URLs at render time — cleaner
  // than base64-inlining, and correctly scoped to the deployed origin.
  const heroSrc = `${baseUrl}/images/nori-hero.jpg`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#fbfaf5",
          color: "#14131a",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Left text column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 0 64px 72px",
            width: 720,
          }}
        >
          {/* Brand pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              border: "3px solid #14131a",
              background: "#fbfaf5",
              borderRadius: 999,
              padding: "10px 20px 10px 14px",
              alignSelf: "flex-start",
              boxShadow: "6px 6px 0 #14131a",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 80 80">
              <g fill="#14131a">
                <circle cx="40" cy="18" r="14" />
                <circle cx="62" cy="40" r="14" />
                <circle cx="40" cy="62" r="14" />
                <circle cx="18" cy="40" r="14" />
                <circle cx="40" cy="40" r="20" />
              </g>
              <g fill="#fbfaf5">
                <rect x="30" y="30" width="5.8" height="20" rx="2.9" />
                <rect x="44.2" y="30" width="5.8" height="20" rx="2.9" />
              </g>
              <circle cx="64" cy="22" r="3.2" fill="#14131a" />
            </svg>
            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                letterSpacing: -1.2,
              }}
            >
              nori
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: 26,
                padding: "0 10px",
                marginLeft: 4,
                background: "#14131a",
                color: "#fbfaf5",
                borderRadius: 999,
                fontSize: 14,
                letterSpacing: 1.6,
                fontFamily: "ui-monospace, monospace",
                fontWeight: 700,
              }}
            >
              L1
            </div>
          </div>

          {/* Headline + sub */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              marginTop: 36,
            }}
          >
            <div
              style={{
                fontSize: 84,
                lineHeight: 0.95,
                letterSpacing: -3,
                fontWeight: 800,
                maxWidth: 640,
              }}
            >
              A sub-$1,000 robot anyone can program.
            </div>
            <div
              style={{
                fontSize: 24,
                color: "#6b6878",
                letterSpacing: -0.3,
                maxWidth: 600,
                lineHeight: 1.3,
              }}
            >
              Two arms. Wheels. 365mm vertical lift. IKEA-grade assembly, software you can fork.
            </div>
          </div>

          {/* Bottom strip: CTA + tagline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#14131a",
                color: "#fbfaf5",
                padding: "16px 26px",
                borderRadius: 999,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: -0.2,
                border: "3px solid #14131a",
                boxShadow: "6px 6px 0 #14131a",
              }}
            >
              Preorder $68 →
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#6b6878",
                fontFamily: "ui-monospace, monospace",
                letterSpacing: 1.4,
                textTransform: "uppercase",
              }}
            >
              // $300 off $1,288
            </div>
          </div>
        </div>

        {/* Right image column — the robot shot */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 520,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(60% 60% at 50% 45%, #cde8b5 0%, #fbfaf5 70%)",
            borderLeft: "3px solid #14131a",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroSrc}
            alt=""
            width={480}
            height={560}
            style={{
              objectFit: "contain",
              objectPosition: "center",
              maxHeight: "88%",
              maxWidth: "90%",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
