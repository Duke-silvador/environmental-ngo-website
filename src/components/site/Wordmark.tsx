import Link from "next/link";
import { site } from "@/config/site";

/** The header/footer lockup. `size` controls the display type scale. */
export function Wordmark({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const scale = {
    sm: "text-base tracking-[0.34em]",
    md: "text-xl tracking-[0.36em]",
    lg: "text-4xl sm:text-5xl tracking-[0.3em]",
  }[size];

  const sub = {
    sm: "text-[0.5rem] tracking-[0.3em]",
    md: "text-[0.5625rem] tracking-[0.32em]",
    lg: "text-[0.625rem] tracking-[0.34em]",
  }[size];

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group inline-flex flex-col items-start ${className}`}
    >
      <span
        className={`font-display font-normal leading-none text-ivory ${scale} transition-colors duration-500 group-hover:text-gold-light`}
      >
        {site.name}
      </span>
      <span className={`mt-2 text-ivory-faint ${sub}`}>{site.suffix}</span>
    </Link>
  );
}
