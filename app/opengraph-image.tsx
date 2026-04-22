import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NORI L1 — a sub-$1,000 robot anyone can program";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Seamless OG card: white canvas with the hero's ambient pastel wash
// layered on top, brand + text on the left, Stripe.png robot on the
// right. Uses Bagel Fat One (the site's display face) for the
// headline so the OG matches the actual hero typography.
export default async function OGImage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000";

  // Satori can't parse WOFF/WOFF2 — it needs TTF/OTF. We bundle both
  // TTFs in /public/fonts so we don't have to fight Google Fonts'
  // content-negotiation at the edge. Bagel Fat One is the display
  // face (headline + "nori" pill), Inter is the neutral sans for
  // body copy and the CTA — closest Satori-compatible analogue to
  // the site's Fredoka at this point size. If either fetch fails
  // we fall back gracefully.
  const [bagelRes, interRegRes, interSemiRes] = await Promise.all([
    fetch(`${baseUrl}/fonts/BagelFatOne-Regular.ttf`).catch(() => null),
    fetch(`${baseUrl}/fonts/Inter-Regular.ttf`).catch(() => null),
    fetch(`${baseUrl}/fonts/Inter-SemiBold.ttf`).catch(() => null),
  ]);
  const bagelData = bagelRes?.ok ? await bagelRes.arrayBuffer() : null;
  const interRegData = interRegRes?.ok
    ? await interRegRes.arrayBuffer()
    : null;
  const interSemiData = interSemiRes?.ok
    ? await interSemiRes.arrayBuffer()
    : null;

  const headlineFont = bagelData ? "Bagel Fat One" : "sans-serif";
  const bodyFont = interRegData ? "Inter" : "sans-serif";

  const faviconUrl = `${baseUrl}/Favicon.png`;
  const robotUrl = `${baseUrl}/images/Stripe.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          color: "#14131a",
          fontFamily: bodyFont,
          position: "relative",
        }}
      >
        {/* Ambient pastel wash — two big radials painted directly on
            the root background. Satori honors comma-separated radials
            but they have to be stacked on one element's bg. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            background:
              "radial-gradient(1100px 780px at 0% 20%, rgba(205, 232, 181, 0.85), rgba(205, 232, 181, 0) 65%), radial-gradient(900px 700px at 100% 100%, rgba(255, 212, 212, 0.55), rgba(255, 212, 212, 0) 70%), radial-gradient(900px 700px at 100% 0%, rgba(255, 233, 168, 0.45), rgba(255, 233, 168, 0) 70%)",
          }}
        />

        {/* Left text column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "62px 0 64px 76px",
            width: 720,
            zIndex: 1,
          }}
        >
          {/* Brand pill — uses the real Favicon.png, matches the nav
              pill shape/rules exactly. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "3px solid #14131a",
              background: "#fbfaf5",
              borderRadius: 999,
              padding: "8px 18px 8px 8px",
              alignSelf: "flex-start",
              boxShadow: "6px 6px 0 #14131a",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={faviconUrl}
              alt=""
              width={44}
              height={44}
              style={{ borderRadius: 999 }}
            />
            <div
              style={{
                fontFamily: headlineFont,
                fontSize: 38,
                letterSpacing: -0.8,
                marginLeft: 2,
                lineHeight: 1,
                paddingTop: 6,
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
                fontFamily: headlineFont,
                fontSize: 96,
                lineHeight: 0.95,
                letterSpacing: -2,
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
              Two arms. Wheels. 600mm vertical lift. Easy assembly, open-source software.
            </div>
          </div>

          {/* Bottom strip — eyebrow tag only. CTA pill removed
              because X overlays its own "NORI L1" title chip in the
              lower-left, which covers any button we put there. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 32,
            }}
          >
            <div
              style={{
                fontSize: 20,
                color: "#6b6878",
                fontFamily: "ui-monospace, monospace",
                letterSpacing: 1.6,
                textTransform: "uppercase",
              }}
            >
              // preorder $68 — $300 off $1,288
            </div>
          </div>
        </div>

        {/* Right image column — no border, shares the same wash */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={robotUrl}
            alt=""
            width={580}
            height={620}
            style={{
              objectFit: "contain",
              objectPosition: "center",
              maxHeight: "98%",
              maxWidth: "98%",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(bagelData
          ? [
              {
                name: "Bagel Fat One",
                data: bagelData,
                style: "normal" as const,
                weight: 400 as const,
              },
            ]
          : []),
        ...(interRegData
          ? [
              {
                name: "Inter",
                data: interRegData,
                style: "normal" as const,
                weight: 400 as const,
              },
            ]
          : []),
        ...(interSemiData
          ? [
              {
                name: "Inter",
                data: interSemiData,
                style: "normal" as const,
                weight: 600 as const,
              },
            ]
          : []),
      ],
    },
  );
}
