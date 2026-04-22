// A hand-picked subset of skills from the NoriSkillHub registry.
// Curated to show category variety + flagship tasks. Displayed in the
// "NORI gets smarter with every user" section as a teaser for the hub.

export type SampleSkill = {
  slug: string;
  name: string;
  tagline: string;
  category: "kitchen" | "laundry" | "lab" | "pets" | "plants";
  author: string;
  version: string;
  installs: number;
  snippet: string;
};

export const CATEGORY_TINT: Record<SampleSkill["category"], string> = {
  kitchen: "var(--color-sticker)",
  laundry: "var(--color-sticker-2)",
  lab: "var(--color-leaf)",
  pets: "var(--color-sticker-2)",
  plants: "var(--color-leaf)",
};

export const SAMPLE_SKILLS: SampleSkill[] = [
  {
    slug: "cook-an-egg",
    name: "Cook an egg",
    tagline: "Crack, whisk, pour, plate. Sunny-side or scrambled.",
    category: "kitchen",
    author: "maya",
    version: "1.2.0",
    installs: 2413,
    snippet: `nori.install("maya/cook-an-egg")`,
  },
  {
    slug: "sort-laundry-by-color",
    name: "Sort laundry by color",
    tagline: "Whites, darks, colors. Denim handled, delicates flagged.",
    category: "laundry",
    author: "ren",
    version: "2.0.1",
    installs: 3112,
    snippet: `nori.install("ren/sort-laundry-by-color")`,
  },
  {
    slug: "pour-over-coffee",
    name: "Pour-over coffee",
    tagline: "42g in, 680g out. Bloom, spiral, hold. 3:45 total.",
    category: "kitchen",
    author: "jules",
    version: "1.4.0",
    installs: 1887,
    snippet: `nori.install("jules/pour-over-coffee")`,
  },
  {
    slug: "pipette-100ul",
    name: "Pipette 100µL",
    tagline: "±0.5µL across 96 wells. No cross-contamination.",
    category: "lab",
    author: "dr-lin",
    version: "2.1.0",
    installs: 1303,
    snippet: `nori.install("dr-lin/pipette-100ul")`,
  },
  {
    slug: "feed-the-cat",
    name: "Feed the cat",
    tagline: "One scoop, twice a day. Fresh water. No overfeeding.",
    category: "pets",
    author: "nori",
    version: "1.0.0",
    installs: 4208,
    snippet: `nori.install("nori/feed-the-cat")`,
  },
  {
    slug: "water-houseplants",
    name: "Water houseplants",
    tagline: "Checks soil moisture. Waters only what's dry.",
    category: "plants",
    author: "sam",
    version: "0.9.2",
    installs: 918,
    snippet: `nori.install("sam/water-houseplants")`,
  },
];

export function fmtInstalls(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}
