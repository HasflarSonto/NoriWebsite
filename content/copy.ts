export const copy = {
  brand: {
    name: "NORI",
    tagline: "Built at Columbia. Open source. MIT License.",
  },
  nav: {
    links: [
      { label: "Software", href: "#software" },
      { label: "How it works", href: "#how" },
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
  software: {
    eyebrow: "// software",
    heading: "A platform, not a robot.",
    body: "Tell your robot what to do in plain English or Python. An LLM breaks commands into steps, learned policies move the arms, a vision model checks if it worked. Set schedules: coffee at 7am, clean the table when you leave. Publish skills to a shared registry. Every robot on the platform makes every other robot smarter.",
    snippet: `nori.do("make me coffee at 7am")`,
  },
  how: {
    eyebrow: "// how it works",
    heading: "Three steps.",
    steps: [
      {
        n: "01",
        title: "Build it.",
        body: "Simple assembly, no hardware experience needed. If you can follow IKEA instructions, you can build this.",
      },
      {
        n: "02",
        title: "Train it.",
        body: "Show the robot a task 50 times with leader-follower arms. It learns in hours on a single GPU.",
      },
      {
        n: "03",
        title: "Code it.",
        body: "Python, natural language, or cron triggers. You write the logic, the robot does the work.",
      },
    ],
  },
  compare: {
    eyebrow: "// comparison",
    heading: "One Unitree G1 costs $16,000.",
    subheading: "For the same money you could buy 17 NORI L1s.",
    rows: [
      { label: "Price", nori: "$988 (preorder)", g1: "$16,000+" },
      { label: "Bimanual", nori: "Yes", g1: "Yes" },
      { label: "Vertical Lift", nori: "Yes", g1: "No (base)" },
      { label: "Open Source", nori: "Fully", g1: "Partial" },
      { label: "Assembly", nori: "No EE needed", g1: "Pre-built" },
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
      { label: "GitHub", href: "https://github.com" },
      { label: "Discord", href: "https://discord.com" },
      { label: "Twitter", href: "https://twitter.com/AntonioSitongLi" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
};

export type Copy = typeof copy;
