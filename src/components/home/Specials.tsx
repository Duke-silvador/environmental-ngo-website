"use client";

import Image from "next/image";
import Link from "next/link";
import { specials } from "@/data/specials";
import { menu } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { RevealGroup, RevealChild, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { AddToCartButton } from "@/components/menu/AddToCartButton";

export function Specials() {
  return (
    <section className="relative border-y border-hairline-soft bg-obsidian-800 py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="The Specials"
            title={
              <>
                Five dishes we would{" "}
                <span className="text-luxe italic">order ourselves</span>
              </>
            }
            lede="Everything else on the menu is made to order too. These five are simply where the kitchen puts its best work."
          />
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-6"
        >
          {specials.map((special, index) => {
            // Wide on the middle card so the row has a rhythm.
            const wide = index === 0 || index === 4;
            const linkedItem = special.menuId
              ? menu.find((item) => item.id === special.menuId)
              : undefined;

            return (
              <RevealChild
                key={special.id}
                className={wide ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-2"}
              >
                <li className="h-full">
                  <article className="card-luxe group flex h-full flex-col overflow-hidden">
                    <div className="media-zoom relative aspect-16/10 overflow-hidden">
                      <Image
                        src={special.image}
                        alt={special.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/10 to-transparent" />
                      {special.badge ? (
                        <span className="absolute left-5 top-5 border border-gold/50 bg-obsidian/70 px-3 py-1.5 text-[0.5625rem] uppercase tracking-[0.22em] text-gold backdrop-blur">
                          {special.badge}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex items-start justify-between gap-4">
                        <h3
                          className={`font-display leading-tight text-ivory ${
                            wide ? "text-3xl" : "text-2xl"
                          }`}
                        >
                          {special.name}
                        </h3>
                        <span className="shrink-0 font-display text-xl text-gold-light">
                          {formatPrice(special.price)}
                        </span>
                      </div>

                      <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory-dim">
                        {special.description}
                      </p>

                      <div className="mt-7 flex items-center gap-3">
                        {linkedItem ? (
                          <AddToCartButton item={linkedItem} variant="full" />
                        ) : (
                          <ButtonLink href="/order" variant="outline" full>
                            Enquire
                          </ButtonLink>
                        )}
                      </div>
                    </div>
                  </article>
                </li>
              </RevealChild>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-16 text-center">
          <Link
            href="/menu"
            className="sweep inline-block text-[0.6875rem] uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:text-gold"
          >
            See the full menu
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
