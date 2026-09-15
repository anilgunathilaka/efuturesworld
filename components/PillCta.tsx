import Link from "next/link";

function ArrowUpRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3.5 10.5L10.5 3.5M10.5 3.5H5M10.5 3.5V9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PillCta({
  href,
  label,
  className = "",
  onClick,
  variant = "dark",
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  variant?: "dark" | "accent";
}) {
  const isAccent = variant === "accent";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group inline-flex h-14 shrink-0 items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-bg transition-[transform,background] duration-200 ease-standard hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        isAccent ? "bg-accent hover:bg-accent-deep" : "bg-ink hover:bg-ink/90"
      } ${className}`}
    >
      <span className="whitespace-nowrap">{label}</span>
      <span
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-bg transition-colors duration-200 ease-standard group-hover:bg-surface ${
          isAccent ? "text-accent" : "text-ink"
        }`}
      >
        <ArrowUpRightIcon />
      </span>
    </Link>
  );
}
