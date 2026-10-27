import Image from "next/image";
import { site } from "@/config/site";
import { Ornament, Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export function AboutPreview() {
  return (
    <section id="intro" className="relative overflow-hidden py-28 lg:py-40">
      {/* Oversized background wordmark, barely visible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-0 flex justify-center"
      >
        <span className="font-display text-[22vw] leading-none text-ivory/[0.015]">
          {site.suffix}
        </span>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
        {/* Images */}
        <Reveal className="lg:col-span-6" y={40}>
          <div className="relative">
            <div className="media-zoom relative aspect-4/5 overflow-hidden border border-hairline-soft">
              <Image
                src="/images/about/about.jpg"
                alt={`${site.chefName} in the kitchen`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* Overlapping second image */}
            <div className="absolute -bottom-12 -right-4 hidden w-52 border border-hairline bg-surface p-2 sm:block lg:-right-10 lg:w-64">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/about/about-bg.jpg"
                  alt="A finished plate, moments before service"
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>
              <p className="px-2 py-3 text-[0.5625rem] uppercase tracking-[0.2em] text-ivory-faint">
                The pass, 19:00
              </p>
            </div>

            {/* Signature seal */}
            <div className="absolute -left-5 -top-6 hidden h-28 w-28 flex-col items-center justify-center rounded-full border border-gold/40 bg-obsidian text-center lg:flex">
              <span className="font-display text-sm text-gold">10</span>
              <span className="mt-0.5 text-[0.5rem] uppercase leading-tight tracking-[0.18em] text-ivory-faint">
                Years
                <br />
                Cooking
              </span>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal className="lg:col-span-6" delay={0.12}>
          <p className="eyebrow">The Kitchen</p>

          <h2 className="mt-6 text-4xl leading-[1.06] text-ivory sm:text-5xl lg:text-6xl">
            Not a restaurant.{" "}
            <span className="text-luxe italic">A private one.</span>
          </h2>

          <Ornament className="my-9 max-w-xs !justify-start" />

          <div className="space-y-5 text-base leading-relaxed text-ivory-dim">
            <p>
              {site.name} is a home kitchen with a restaurant&apos;s standards.
              There is no brigade, no pass, and no menu printed months in advance
              — just {site.chefName}, a small kitchen, and a market-driven menu
              that changes when the produce does.
            </p>
            <p>
              That sounds modest. In practice it is the reason people keep
              coming back: the same chef who takes your order is the one who
              cooks it, plates it, and carries it to your door.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9 border-t border-hairline-soft pt-10">
            {[
              { term: "Kitchen", detail: "One chef, cooked to order" },
              { term: "Service", detail: "Dinner, 7 nights a week" },
              { term: "Delivery", detail: "Across the city, 60 minutes" },
              { term: "Events", detail: "Booked 72 hours ahead" },
            ].map((item) => (
              <div key={item.term}>
                <dt className="text-[0.625rem] uppercase tracking-[0.22em] text-gold">
                  {item.term}
                </dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-ivory-dim">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/about" variant="outline">
              Read the full story
            </ButtonLink>
            <ButtonLink href="/order" variant="ghost">
              Order for tonight
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
