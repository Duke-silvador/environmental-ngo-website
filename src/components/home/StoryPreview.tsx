import Image from "next/image";
import { Award } from "lucide-react";
import { achievements, timeline } from "@/data/story";
import { Ornament, Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

/** The most recent half of the timeline — the full one lives on /about. */
const recent = timeline.slice(0, 4);

export function StoryPreview() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-40">
      {/* Background */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/hero/hero-bg1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/92 to-obsidian" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-20 lg:grid-cols-12 lg:gap-16">
          {/* History timeline */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Our History</p>
              <h2 className="mt-6 text-4xl leading-[1.06] text-ivory sm:text-5xl lg:text-6xl">
                Ten years, one <span className="text-luxe italic">kitchen</span>
              </h2>
              <Ornament className="my-9 !justify-start" />
            </Reveal>

            <RevealGroup as="ol" className="relative" stagger={0.1}>
              {/* The vertical gold rule */}
              <span
                aria-hidden
                className="absolute left-[3.5rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold/50 via-hairline to-transparent sm:block"
              />

              {recent.map((milestone) => (
                <RevealChild key={milestone.year}>
                  <li className="relative flex gap-8 border-b border-hairline-soft py-8 last:border-b-0 sm:gap-12">
                    <span className="w-14 shrink-0 pt-1 text-right font-display text-2xl text-gold sm:w-20 sm:text-3xl">
                      {milestone.year}
                    </span>

                    <span
                      aria-hidden
                      className="absolute left-[3.25rem] top-10 hidden h-1.5 w-1.5 -translate-x-1/2 rotate-45 border border-gold bg-obsidian sm:block"
                    />

                    <div>
                      <h3 className="font-display text-2xl text-ivory">
                        {milestone.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                        {milestone.body}
                      </p>
                    </div>
                  </li>
                </RevealChild>
              ))}
            </RevealGroup>

            <Reveal delay={0.15} className="mt-10">
              <ButtonLink href="/about" variant="outline">
                The full story
              </ButtonLink>
            </Reveal>
          </div>

          {/* Achievements + two stacked images */}
          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <p className="eyebrow">Achievements</p>
              <h2 className="mt-6 text-4xl leading-[1.06] text-ivory sm:text-5xl">
                Recognised for{" "}
                <span className="text-luxe italic">the standard</span>
              </h2>
            </Reveal>

            <RevealGroup as="ul" className="mt-12" stagger={0.09}>
              {achievements.map((achievement) => (
                <RevealChild key={achievement.id}>
                  <li className="card-luxe flex items-start gap-5 p-6">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center border ${
                        achievement.featured
                          ? "border-gold/50 text-gold"
                          : "border-hairline-soft text-ivory-faint"
                      }`}
                    >
                      <Award className="h-4 w-4" strokeWidth={1.3} aria-hidden />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3 className="font-display text-xl text-ivory">
                          {achievement.award}
                        </h3>
                        <span className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold">
                          {achievement.year}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ivory-dim">
                        {achievement.detail}
                      </p>
                    </div>
                  </li>
                </RevealChild>
              ))}
            </RevealGroup>

            <Reveal delay={0.2} className="mt-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="media-zoom relative aspect-3/4 overflow-hidden border border-hairline-soft">
                  <Image
                    src="/images/brand/mm.jpg"
                    alt="In the kitchen"
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="media-zoom relative mt-8 aspect-3/4 overflow-hidden border border-hairline-soft">
                  <Image
                    src="/images/brand/n.png"
                    alt="A finished plate"
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
