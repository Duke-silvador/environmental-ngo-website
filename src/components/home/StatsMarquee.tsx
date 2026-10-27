import { stats } from "@/data/story";

/**
 * An infinitely scrolling strip of the kitchen's headline numbers. The list is
 * duplicated once and translated -50%, which is a seamless loop.
 */
export function StatsMarquee() {
  const row = [...stats, ...stats];

  return (
    <section
      aria-label="Kitchen in numbers"
      className="overflow-hidden border-y border-hairline-soft bg-obsidian-800 py-12"
    >
      <div className="flex w-max animate-marquee items-center">
        {row.map((stat, index) => (
          <div
            key={`${stat.label}-${index}`}
            className="flex items-baseline gap-5 px-12 lg:px-16"
            aria-hidden={index >= stats.length}
          >
            <span className="font-display text-4xl leading-none text-gold-light lg:text-5xl">
              {stat.value}
            </span>
            <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-ivory-dim">
              {stat.label}
            </span>
            <span
              className="h-1.5 w-1.5 rotate-45 border border-gold/40"
              aria-hidden
            />
          </div>
        ))}
      </div>
    </section>
  );
}
