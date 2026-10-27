import type { ReactNode } from "react";

/**
 * The standard section header: eyebrow, large serif title, optional lede.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}
    >
      <p className={`eyebrow ${isCenter ? "" : ""}`}>{eyebrow}</p>
      <h2 className="mt-5 text-4xl leading-[1.08] text-ivory sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-6 text-base leading-relaxed text-ivory-dim sm:text-lg ${
            isCenter ? "mx-auto max-w-2xl" : ""
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
