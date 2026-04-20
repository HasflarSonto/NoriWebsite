"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { copy } from "@/content/copy";
import { ButtonLink } from "@/components/ui/Button";

export function Nav() {
  // Hidden during the hero. The hero's sticky container is 400vh tall;
  // once the user has scrolled ~85% of the way through it, the nav
  // slides back in so it's in place for the next section.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 3.4;
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`pointer-events-none fixed left-0 right-0 top-0 z-50 px-3 pt-4 transition-[opacity,transform] duration-500 nori-ease md:px-6 md:pt-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-6 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <nav
        className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border-2 border-[var(--color-ink)] bg-[color:rgb(251_250_245_/_0.88)] px-4 py-2 shadow-[var(--shadow-pop)] backdrop-blur-md md:px-5 md:py-2.5"
      >
        <Link
          href="#top"
          className="group flex items-center gap-2 text-[var(--color-ink)]"
          aria-label="NORI home"
        >
          <span className="hover-wiggle inline-flex">
            <Image
              src="/Favicon.png"
              alt=""
              width={32}
              height={32}
              className="block h-8 w-8 rounded-full"
            />
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

        <ButtonLink href="/preorder" className="text-[13px]">
          {copy.nav.cta}
        </ButtonLink>
      </nav>
    </header>
  );
}
