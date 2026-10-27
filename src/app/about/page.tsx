import type { Metadata } from "next";
import Image from "next/image";
import { Award, Quote } from "lucide-react";
import { site } from "@/config/site";
import { achievements, stats, timeline, values } from "@/data/story";
import {
  Ornament,
  Reveal,
  RevealChild,
  RevealGroup,
} from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Story",
  description: `Ten years, one home kitchen, and a standard that has not moved since 2016. The history and achievements behind ${site.name}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative flex min-h-[70svh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-bg1.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian/45"
        />
        <div aria-hidden className="vignette absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 lg:px-10 lg:pb-24">
          <p className="eyebrow">{site.chefName}</p>
          <h1 className="mt-7 max-w-4xl text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-8xl">
            Ten years in{" "}
            <span className="text-luxe italic">one kitchen</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory-dim sm:text-lg">
            No investors, no second branch, no menu printed for the year. Just a
            small kitchen, a market that changes weekly, and a standard that has
            not moved since 2016.
          </p>
        </div>
      </header>

      {/* Stats */}
      <section className="border-y border-hairline-soft bg-obsidian-800 py-14">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <RevealGroup
            as="ul"
            className="grid grid-cols-2 gap-10 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <RevealChild key={stat.label}>
                <li>
                  <p className="font-display text-4xl leading-none text-gold-light sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[0.625rem] uppercase tracking-[0.22em] text-ivory-dim">
                    {stat.label}
                  </p>
                  {stat.detail ? (
                    <p className="mt-2 text-xs text-ivory-faint">
                      {stat.detail}
                    </p>
                  ) : null}
                </li>
              </RevealChild>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* The chef */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
          <Reveal className="lg:col-span-5" y={40}>
            <div className="media-zoom relative aspect-4/5 overflow-hidden border border-hairline-soft">
              <Image
                src="/images/chef/chefs-1.jpg"
                alt={site.chefName}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.12}>
            <p className="eyebrow">The Person</p>
            <h2 className="mt-6 text-4xl leading-[1.06] text-ivory sm:text-5xl">
              {site.chefName}
            </h2>
            <Ornament className="my-9 !justify-start" />

            <div className="space-y-5 text-base leading-relaxed text-ivory-dim">
              <p>
                Ten years ago this was a four-burner home kitchen cooking for
                friends on a word-of-mouth list. It is still four burners. What
                changed is the standard: the same plate has to be right every
                time, for a stranger, at eight in the evening, on a Tuesday.
              </p>
              <p>
                That is the whole business model. One chef, one kitchen, no
                brigade to hide behind, and a direct line between whoever takes
                your order and whoever cooks it. It is slower than a restaurant
                and it is meant to be.
              </p>
            </div>

            <blockquote className="mt-10 border-l border-gold/40 pl-7">
              <Quote
                className="h-5 w-5 text-gold/50"
                strokeWidth={1.2}
                aria-hidden
              />
              <p className="mt-4 font-display text-2xl leading-snug text-ivory">
                If I would not serve it to my own family, it does not leave the
                kitchen.
              </p>
              <cite className="mt-5 block text-[0.625rem] uppercase not-italic tracking-[0.2em] text-gold">
                {site.chefName}
              </cite>
            </blockquote>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/menu" variant="solid">
                See what is cooking
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Book the kitchen
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full history timeline */}
      <section className="border-y border-hairline-soft bg-obsidian-800 py-28 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Our History"
              title={
                <>
                  Every year that <span className="text-luxe italic">mattered</span>
                </>
              }
              lede="Not a growth story. A record of what was built, and when."
            />
          </Reveal>

          <div className="mx-auto mt-24 max-w-4xl">
            <RevealGroup as="ol" className="relative">
              <span
                aria-hidden
                className="absolute left-[4.5rem] top-3 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold/60 via-hairline to-transparent sm:block"
              />

              {timeline.map((milestone, index) => (
                <RevealChild key={milestone.year}>
                  <li className="relative flex gap-8 border-b border-hairline-soft py-10 last:border-b-0 sm:gap-16">
                    <div className="w-16 shrink-0 pt-1 text-right font-display text-3xl text-gold sm:w-24 sm:text-4xl">
                      {milestone.year}
                    </div>

                    <span
                      aria-hidden
                      className="absolute left-[4.25rem] top-[3.25rem] hidden h-2 w-2 -translate-x-1/2 rotate-45 border border-gold bg-obsidian sm:block"
                    />

                    <div>
                      <p className="text-[0.5625rem] uppercase tracking-[0.24em] text-ivory-faint">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 font-display text-2xl leading-snug text-ivory sm:text-3xl">
                        {milestone.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory-dim sm:text-base">
                        {milestone.body}
                      </p>
                    </div>
                  </li>
                </RevealChild>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-28 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionHeading
              eyebrow="Achievements"
              title={
                <>
                  Recognised, and{" "}
                  <span className="text-luxe italic">still pushing</span>
                </>
              }
              lede="Awards matter less than the reason for them. These are listed anyway, because guests ask."
            />
          </Reveal>

          <RevealGroup
            as="ul"
            className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.09}
          >
            {achievements.map((achievement) => (
              <RevealChild key={achievement.id} className="h-full">
                <li className="h-full">
                  <article
                    className={`card-luxe flex h-full flex-col p-8 ${
                      achievement.featured ? "border-gold/35" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`flex h-12 w-12 items-center justify-center border ${
                          achievement.featured
                            ? "border-gold/50 text-gold"
                            : "border-hairline-soft text-ivory-faint"
                        }`}
                      >
                        <Award className="h-4.5 w-4.5" strokeWidth={1.2} aria-hidden />
                      </span>
                      <span className="font-display text-2xl text-ivory-faint/70">
                        {achievement.year}
                      </span>
                    </div>

                    <h3 className="mt-7 font-display text-2xl leading-snug text-ivory">
                      {achievement.award}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                      {achievement.detail}
                    </p>
                  </article>
                </li>
              </RevealChild>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Values, with a supporting image pair */}
      <section className="border-t border-hairline-soft py-28 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] items-start gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">The Rules</p>
              <h2 className="mt-6 text-4xl leading-[1.06] text-ivory sm:text-5xl">
                Four things that do not{" "}
                <span className="text-luxe italic">change</span>
              </h2>
              <Ornament className="my-9 !justify-start" />

              <div className="grid grid-cols-2 gap-4">
                <div className="media-zoom relative aspect-3/4 overflow-hidden border border-hairline-soft">
                  <Image
                    src="/images/chef/chefs-2.jpg"
                    alt="Preparing the day's order"
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="media-zoom relative mt-10 aspect-3/4 overflow-hidden border border-hairline-soft">
                  <Image
                    src="/images/chef/chefs-3.jpg"
                    alt="The final service"
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <RevealGroup as="ul" className="space-y-10 lg:col-span-7" stagger={0.1}>
            {values.map((value, index) => (
              <RevealChild key={value.id}>
                <li className="border-t border-hairline-soft pt-8">
                  <div className="flex items-baseline gap-5">
                    <span className="text-[0.625rem] tracking-[0.24em] text-gold/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl text-ivory sm:text-3xl">
                      {value.title}
                    </h3>
                  </div>
                  <p className="mt-4 pl-10 text-sm leading-relaxed text-ivory-dim sm:text-base">
                    {value.body}
                  </p>
                </li>
              </RevealChild>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-hairline-soft bg-obsidian-800 py-28 text-center lg:py-36">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="text-4xl leading-[1.05] text-ivory sm:text-5xl">
              Ten years in.{" "}
              <span className="text-luxe italic">Come and judge it.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ivory-dim">
              Order for tonight, or book the room for something you are
              celebrating.
            </p>
            <div className="mt-11 flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href="/order" variant="solid" size="lg">
                Start an Order
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="lg">
                Book an Event
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
