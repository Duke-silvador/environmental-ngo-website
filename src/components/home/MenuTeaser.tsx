"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { signatureDishes, menuByCategory, priceFrom } from "@/data/menu";
import { categories, type MenuCategory } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { slugify } from "@/lib/slug";
import { Reveal, RevealGroup, RevealChild } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AddToCartButton } from "@/components/menu/AddToCartButton";

export function MenuTeaser() {
  const signatures = signatureDishes().slice(0, 4);

  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="The Menu"
            title={
              <>
                Nineteen dishes, all{" "}
                <span className="text-luxe italic">cooked to order</span>
              </>
            }
            lede="Nothing is made in advance. Add what you like to your basket and check out — your order arrives as a message we confirm straight away."
          />
        </Reveal>

        {/* Signature dishes, orderable right here */}
        <RevealGroup
          as="ul"
          className="mt-20 grid gap-6 sm:grid-cols-2"
          stagger={0.1}
        >
          {signatures.map((item) => (
            <RevealChild key={item.id}>
              <li>
                <article className="card-luxe group flex items-center gap-6 p-4">
                  <div className="media-zoom relative h-24 w-24 shrink-0 overflow-hidden border border-hairline-soft sm:h-28 sm:w-28">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1 py-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="truncate font-display text-xl text-ivory">
                        {item.name}
                      </h3>
                      <span className="shrink-0 font-display text-lg text-gold-light">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-ivory-dim">
                      {item.description}
                    </p>
                    <div className="mt-4">
                      <AddToCartButton item={item} variant="full" />
                    </div>
                  </div>
                </article>
              </li>
            </RevealChild>
          ))}
        </RevealGroup>

        {/* Category shortcuts */}
        <Reveal delay={0.12} className="mt-14">
          <ul className="grid grid-cols-2 gap-px border border-hairline-soft bg-hairline-soft sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category: MenuCategory) => {
              const items = menuByCategory(category);
              return (
                <li key={category}>
                  <Link
                    href={`/menu#${slugify(category)}`}
                    className="group flex h-full flex-col justify-between gap-3 bg-obsidian px-5 py-6 transition-colors duration-500 hover:bg-surface-2"
                  >
                    <span className="text-[0.6875rem] uppercase tracking-[0.16em] text-ivory-dim transition-colors duration-500 group-hover:text-gold">
                      {category}
                    </span>
                    <span className="flex items-end justify-between gap-2">
                      <span className="text-xs text-ivory-faint">
                        from {formatPrice(priceFrom(items))}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 -translate-x-1 text-gold opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.16} className="mt-14 text-center">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:text-gold"
          >
            Open the full menu
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.5}
              aria-hidden
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
