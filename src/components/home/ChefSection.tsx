import Image from "next/image";
import { site } from "@/config/site";
import { values } from "@/data/story";
import { Ornament, Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const portraits = [
  { src: "/images/chef/chefs-1.jpg", label: "At the pass" },
  { src: "/images/chef/chefs-2.jpg", label: "Morning prep" },
  { src: "/images/chef/chefs-3.jpg", label: "Last service" },
];

export function ChefSection() {
  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow={site.chefName}
            title={
              <>
                The chef, the kitchen,{" "}
                <span className="text-luxe italic">the rules</span>
              </>
            }
            lede="Ten years, one kitchen, and a short list of things that are never compromised."
          />
        </Reveal>

        {/* Three portraits */}
        <RevealGroup
          as="ul"
          className="mt-20 grid gap-5 sm:grid-cols-3"
          stagger={0.1}
        >
          {portraits.map((portrait) => (
            <RevealChild key={portrait.src}>
              <li>
                <figure className="card-luxe media-zoom relative aspect-4/5 overflow-hidden">
                  <Image
                    src={portrait.src}
                    alt={portrait.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6 text-[0.6875rem] uppercase tracking-[0.2em] text-ivory">
                    {portrait.label}
                  </figcaption>
                </figure>
              </li>
            </RevealChild>
          ))}
        </RevealGroup>

        {/* Four rules */}
        <div className="mt-24 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h3 className="font-display text-3xl leading-tight text-ivory sm:text-4xl">
              Four rules that have not changed since 2016
            </h3>
            <Ornament className="mt-8 !justify-start" />
            <p className="mt-8 text-sm leading-relaxed text-ivory-dim">
              These are not marketing lines. They are the reason the menu is
              short, the kitchen is small, and the same chef is always the one
              cooking.
            </p>
          </Reveal>

          <RevealGroup
            as="ul"
            className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-8"
            stagger={0.08}
          >
            {values.map((value, index) => (
              <RevealChild key={value.id}>
                <li className="border-t border-hairline-soft pt-6">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[0.625rem] tracking-[0.24em] text-gold/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-display text-2xl text-ivory">
                      {value.title}
                    </h4>
                  </div>
                  <p className="mt-4 pl-9 text-sm leading-relaxed text-ivory-dim">
                    {value.body}
                  </p>
                </li>
              </RevealChild>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
