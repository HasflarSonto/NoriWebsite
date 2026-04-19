import type { Metadata, Viewport } from "next";
import { Fredoka, Bagel_Fat_One, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Body: rounded, friendly, still highly legible
const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Display: super-bubbly, closest free alternative to CC Trifoglio
const bagel = Bagel_Fat_One({
  subsets: ["latin"],
  variable: "--font-bagel",
  weight: "400",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "NORI L1 — A sub-$1,000 robot anyone can program",
  description:
    "Two arms. Wheels. A 365mm vertical lift. Assembles like IKEA, programs like software. Preorder for $68, save $300 off $1,288.",
  openGraph: {
    title: "NORI L1",
    description:
      "A sub-$1,000 bimanual robot for developers. Preorder for $68.",
    url: "/",
    siteName: "NORI",
    images: ["/og.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NORI L1",
    description: "A sub-$1,000 robot anyone can program.",
    creator: "@AntonioSitongLi",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${bagel.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
