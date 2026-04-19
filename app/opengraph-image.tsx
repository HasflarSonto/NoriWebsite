import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NORI L1 — a sub-$1,000 robot anyone can program";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#fbfaf5",
          color: "#14131a",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 80 80">
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
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.2 }}>
            nori
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#6b6878",
              marginLeft: 8,
              fontFamily: "ui-monospace, monospace",
            }}
          >
            // L1
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 0.95,
              letterSpacing: -3,
              fontWeight: 800,
              maxWidth: 1000,
            }}
          >
            A sub-$1,000 robot anyone can program.
          </div>
          <div
            style={{ fontSize: 28, color: "#6b6878", letterSpacing: -0.4 }}
          >
            Preorder $68 · $300 off the final price of $1,288
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "#6b6878",
            fontFamily: "ui-monospace, monospace",
            letterSpacing: 1.4,
            textTransform: "uppercase",
          }}
        >
          <span>// built at columbia</span>
          <span>open source · mit</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
