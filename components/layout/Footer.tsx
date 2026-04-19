import Image from "next/image";
import { copy } from "@/content/copy";

export function Footer() {
  return (
    <footer className="border-t hairline bg-[var(--color-paper)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3 text-[var(--color-ink)]">
          <span className="hover-wiggle inline-flex">
            <Image
              src="/Favicon.png"
              alt=""
              width={28}
              height={28}
              className="block h-7 w-7 rounded-full"
            />
          </span>
          <div className="flex flex-col">
            <span className="font-display text-[18px] leading-none">
              {copy.brand.name.toLowerCase()} L1
            </span>
            <span className="eyebrow mt-1">{copy.footer.tagline}</span>
          </div>
        </div>

        <ul className="flex flex-wrap items-center gap-4">
          {copy.footer.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-3 py-1.5 text-sm font-medium text-[var(--color-mute)] transition-colors hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <span className="eyebrow">© {new Date().getFullYear()} NORI</span>
      </div>
    </footer>
  );
}
