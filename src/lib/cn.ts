/** Tiny classnames joiner — avoids pulling in clsx for one function. */
export function cn(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}
