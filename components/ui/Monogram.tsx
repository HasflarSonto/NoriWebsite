type Props = {
  size?: number;
  className?: string;
  title?: string;
};

// Trifoglio-inspired mark: a chunky 4-leaf clover with a bubbly "N" at the core.
export function Monogram({ size = 32, className, title = "NORI" }: Props) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      aria-label={title}
      role="img"
      className={className}
    >
      <title>{title}</title>
      <g fill="currentColor">
        {/* 4 chunky leaves */}
        <circle cx="40" cy="18" r="14" />
        <circle cx="62" cy="40" r="14" />
        <circle cx="40" cy="62" r="14" />
        <circle cx="18" cy="40" r="14" />
        {/* stem sparkle */}
        <circle cx="40" cy="40" r="20" />
      </g>
      {/* cut-out bubbly N */}
      <g fill="var(--color-paper)">
        <rect x="30" y="30" width="5.8" height="20" rx="2.9" />
        <rect x="44.2" y="30" width="5.8" height="20" rx="2.9" />
        <path
          d="M32.9 30 L47.1 50 L50 47.1 L35.8 27.1 Z"
          transform="translate(0 3)"
        />
      </g>
      {/* cute eye dot */}
      <circle cx="64" cy="22" r="3.2" fill="currentColor" />
      <circle cx="65.2" cy="20.8" r="1.1" fill="var(--color-paper)" />
    </svg>
  );
}
