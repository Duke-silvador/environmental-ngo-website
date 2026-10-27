import Image from "next/image";
import { Check } from "lucide-react";
import { events } from "@/data/events";
import { formatPrice, titleCase } from "@/lib/format";
import { Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export function EventsSection() {
  return (
    <section className="relative py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Occasions & Events"
            title={
              <>
                Private dining, taken{" "}
                <span className="text-luxe italic">seriously</span>
              </>
            }
            lede="The same chef, the same menu, and a room or a table set up around your evening. Booked and confirmed in writing before anything happens."
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-20 grid gap-6 lg:grid-cols-3"
          stagger={0.12}
        >
          {events.map((event) => (
            <RevealChild key={event.id} className="h-full">
              <li className="h-full">
                <article className="card-luxe group flex h-full flex-col overflow-hidden">
                  <div className="media-zoom relative aspect-3/2 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <p className="text-[0.5625rem] uppercase tracking-[0.22em] text-gold">
                        {event.tagline}
                      </p>
                      <h3 className="mt-2.5 font-display text-3xl leading-tight text-ivory">
                        {event.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col border-t border-hairline-soft p-7">
                    <p className="text-sm leading-relaxed text-ivory-dim">
                      {event.body}
                    </p>

                    <ul className="mt-7 space-y-3">
                      {event.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                            strokeWidth={1.8}
                            aria-hidden
                          />
                          <span className="text-sm text-ivory-dim">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-end justify-between gap-4 border-t border-hairline-soft pt-7">
                      <div>
                        <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-ivory-faint">
                          From
                        </p>
                        <p className="mt-1.5 font-display text-2xl text-gold-light">
                          {formatPrice(event.from)}
                          <span className="ml-1.5 text-xs text-ivory-faint">
                            / guest
                          </span>
                        </p>
                        <p className="mt-2 text-[0.6875rem] text-ivory-faint">
                          {titleCase(event.bestFor)}
                        </p>
                      </div>

                      <ButtonLink href="/contact" variant="outline" size="sm">
                        Enquire
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              </li>
            </RevealChild>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
