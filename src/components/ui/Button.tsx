import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden text-[0.6875rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  solid:
    "border border-gold bg-gold text-obsidian hover:bg-gold-light hover:border-gold-light",
  outline:
    "border border-hairline text-ivory hover:border-gold hover:text-gold-light",
  ghost: "border border-transparent text-ivory-dim hover:text-gold",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5",
  md: "h-12 px-7",
  lg: "h-14 px-9",
};

function classes(
  variant: Variant,
  size: Size,
  full: boolean,
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], full && "w-full", className);
}

/**
 * The site's one button. Renders a Next <Link>, an external <a>, or a
 * <button>, depending on the props given.
 */
export function ButtonLink({
  href,
  variant = "solid",
  size = "md",
  full = false,
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes(variant, size, full, className)}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes(variant, size, full, className)} {...rest}>
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

export function Button({
  variant = "solid",
  size = "md",
  full = false,
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
  children: ReactNode;
} & ComponentProps<"button">) {
  return (
    <button className={classes(variant, size, full, className)} {...rest}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
