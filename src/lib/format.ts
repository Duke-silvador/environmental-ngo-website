import { site } from "@/config/site";

/** Format a number as a price using the configured currency symbol. */
export function formatPrice(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  const hasCents = Math.abs(rounded % 1) > 0.001;
  const formatted = rounded.toLocaleString("en-US", {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return `${site.currency}${formatted}`;
}

/** Format a price with the currency symbol already attached plus a suffix. */
export function priceWithFrom(value: number): string {
  return `${formatPrice(value)}`;
}

/** e.g. "12 Mar 2026, 19:40" — stable across server and client. */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** "in 2 days" / "3 days ago" style relative label. */
export function relativeFrom(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diffMs = then - Date.now();
  const diffDays = Math.round(diffMs / 86_400_000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";
  if (diffDays > 1 && diffDays < 30) return `In ${diffDays} days`;
  if (diffDays >= 30) return `In ${Math.round(diffDays / 30)} month${Math.round(diffDays / 30) === 1 ? "" : "s"}`;
  const ago = Math.abs(diffDays);
  if (ago < 30) return `${ago} days ago`;
  const months = Math.round(ago / 30);
  return `${months} month${months === 1 ? "" : "s"} ago`;
}

/** Uppercase, wide-tracked label for section eyebrows. */
export function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
