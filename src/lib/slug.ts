/** URL-safe anchor id from a label, e.g. "From the Sea" -> "from-the-sea". */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
