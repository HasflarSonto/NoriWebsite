type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className = "" }: Props) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-2 ${className}`}
      aria-hidden="true"
    >
      <span className="inline-block h-[2px] w-5 rounded-full bg-[var(--color-ink)]" />
      {children}
    </span>
  );
}
