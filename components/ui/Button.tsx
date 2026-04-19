import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "paper";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-semibold tracking-tight transition-[transform,background,border,box-shadow,color] duration-200 bounce-ease hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-ink-2)] shadow-[0_2px_0_rgba(20,19,26,0.18),0_10px_22px_-10px_rgba(20,19,26,0.45)]",
  ghost:
    "border-2 border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]",
  paper:
    "bg-[var(--color-paper)] text-[var(--color-ink)] border-2 border-[var(--color-ink)] hover:bg-[var(--color-paper-2)]",
};

type ButtonProps = {
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...rest }, ref) => (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    />
  ),
);
Button.displayName = "Button";

type AnchorProps = {
  variant?: Variant;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function ButtonLink({
  className = "",
  variant = "primary",
  ...rest
}: AnchorProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest} />
  );
}
