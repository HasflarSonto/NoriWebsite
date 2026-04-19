"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { copy } from "@/content/copy";
import { Monogram } from "@/components/ui/Monogram";
import { ButtonLink } from "@/components/ui/Button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 nori-ease ${
        scrolled
          ? "border-b hairline bg-[color:rgb(251_250_245_/_0.78)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link
          href="#top"
          className="group flex items-center gap-2 text-[var(--color-ink)]"
          aria-label="NORI home"
        >
          <span className="hover-wiggle inline-flex">
            <Monogram size={32} />
          </span>
          <span className="font-display text-[22px] leading-none">
            {copy.brand.name.toLowerCase()}
          </span>
          <span className="eyebrow ml-1 hidden sm:inline">L1</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {copy.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-[14px] font-medium text-[var(--color-mute)] transition-colors hover:bg-[var(--color-paper-2)] hover:text-[var(--color-ink)]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <ButtonLink href="#preorder" className="text-[13px]">
          {copy.nav.cta}
        </ButtonLink>
      </nav>
    </header>
  );
}
