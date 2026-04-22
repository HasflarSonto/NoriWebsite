export const copy = {
  brand: {
    name: "NORI",
    tagline: "Built at Columbia. Open source. MIT License.",
  },
  nav: {
    links: [
      { label: "Capable", href: "#capable" },
      { label: "Skills", href: "#skills" },
      { label: "Compare", href: "#compare" },
      { label: "Who it's for", href: "#who" },
    ],
    cta: "Preorder $68",
  },
  hero: {
    panels: [
      {
        id: 1,
        eyebrow: "// 00 — overview",
        heading: "NORI L1",
        sub: "A $988 robot anyone can program.",
      },
    ],
  },
  capable: {
    eyebrow: "// affordable & capable",
    heading: "Affordable. Capable.",
    body: "$988 for a robot that folds your laundry, cleans your floor, and makes your coffee. Hover any task to watch.",
    cards: [
      {
        slug: "clean-floor",
        label: "Cleaning the floor",
        category: "home",
        tint: "var(--color-leaf)",
        caption: "Sweeps, scans, repeats.",
        video: "/video/skill-clean-floor.mp4",
        poster: "/images/skill-clean-floor.jpg",
      },
      {
        slug: "organize-shelves",
        label: "Organizing shelves",
        category: "desk",
        tint: "var(--color-sticker)",
        caption: "Tall things back. Labels forward.",
        video: "/video/skill-organize-shelves.mp4",
        poster: "/images/skill-organize-shelves.jpg",
      },
      {
        slug: "fold-laundry",
        label: "Folding laundry",
        category: "laundry",
        tint: "var(--color-leaf)",
        caption: "Rolled. Upright. Drawer-stackable.",
        video: "/video/skill-fold-laundry.mp4",
        poster: "/images/skill-fold-laundry.jpg",
      },
      {
        slug: "make-coffee",
        label: "Making coffee",
        category: "kitchen",
        tint: "var(--color-sticker-2)",
        caption: "42g in, 680g out. 3:45 total.",
        video: "/video/skill-make-coffee.mp4",
        poster: "/images/skill-make-coffee.jpg",
      },
      {
        slug: "sort-laundry",
        label: "Sorting laundry",
        category: "laundry",
        tint: "var(--color-paper-3)",
        caption: "Whites, darks, colors.",
        video: "/video/skill-sort-laundry.mp4",
        poster: "/images/skill-sort-laundry.jpg",
      },
    ],
  },
  shared: {
    eyebrow: "// shared skills",
    heading: "NORI gets smarter with every user.",
    body: "Teach your robot to fold a t-shirt. Publish it. Anyone's NORI can fold t-shirts now. Install theirs: cook an egg, pipette 100µL, feed the cat.",
  },
  compare: {
    eyebrow: "// comparison",
    heading: "16 NORI or 1 Unitree.",
    subheading: "",
    rows: [
      { label: "Price", nori: "$988 (preorder)", g1: "$16,000+" },
      { label: "Bimanual", nori: "Yes", g1: "Yes" },
      { label: "Vertical Lift", nori: "Yes", g1: "No (base)" },
      { label: "Open Source", nori: "Fully", g1: "Partial" },
      { label: "Assembly", nori: "Sub-30 mins assembly", g1: "Pre-built" },
      { label: "AI Orchestration", nori: "Built in", g1: "None" },
      { label: "Shared Training Data", nori: "Yes", g1: "No" },
      { label: "Battery Life", nori: "10h+", g1: "~2h" },
    ],
  },
  who: {
    eyebrow: "// who it's for",
    heading: "This isn't for everyone.",
    blocks: [
      {
        title: "You need to know how to code.",
        body: "If you can vibe code with Claude or Cursor, you can program NORI. If you have never written a line of code, this is not for you yet.",
      },
      {
        title: "You do NOT need hardware experience.",
        body: "If you can follow IKEA instructions, you can assemble this. No soldering, no wiring diagrams, no EE degree.",
      },
    ],
    bullets: [
      "Software engineers curious about robotics",
      "AI developers who want a physical platform to build on",
      "Researchers who need cheap bimanual manipulation hardware",
      "Home automation builders who want to go beyond smart switches",
    ],
  },
  preorder: {
    eyebrow: "// preorder",
    heading: "Reserve yours.",
    subheading:
      "$68 deposit. $300 off the final price of $1,288. Final cost: $988.",
    cta: "Preorder for $68",
    scarcity: "Only 50 preorder slots open.",
    fine: "Early backers get access to the open-source codebase, Discord community, and priority shipping.",
  },
  community: {
    eyebrow: "// join the community",
    heading: "Join the community.",
    subheading:
      "Drop your email. We'll send build videos, ship dates, and early invites. No spam.",
    fields: {
      email: "Email",
      prompt: "What would you build with NORI? (optional)",
    },
    cta: "Join the list",
    pending: "Joining…",
    success: {
      title: "You're in.",
      body: "Check your inbox for a welcome note. We'll keep you posted.",
    },
    fine: "Unsubscribe any time. Your email is only used for NORI updates.",
  },
  footer: {
    tagline: "Built at Columbia. Open source. MIT License.",
    links: [
      { label: "GitHub", href: "https://github.com/HasflarSonto/NoriL1" },
      { label: "Discord", href: "https://discord.gg/MsNsqpqX" },
      { label: "Twitter", href: "https://x.com/AntonioSitongLi" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/antonio-sitong-li/" },
    ],
  },
};

export type Copy = typeof copy;
