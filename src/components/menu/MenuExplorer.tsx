"use client";

import Image from "next/image";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  categories,
  menu,
  type MenuCategory,
  type MenuItem,
} from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/cn";
import { AddToCartButton } from "@/components/menu/AddToCartButton";
import { Ornament } from "@/components/ui/Reveal";

type Filter = "All" | MenuCategory;

export function MenuExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();

  const visible = useMemo(() => {
    return menu.filter((item) => {
      const matchesCategory = filter === "All" || item.category === filter;
      if (!matchesCategory) return false;
      if (!trimmed) return true;
      return (
        item.name.toLowerCase().includes(trimmed) ||
        item.description.toLowerCase().includes(trimmed) ||
        item.category.toLowerCase().includes(trimmed) ||
        (item.tags ?? []).some((tag) => tag.toLowerCase().includes(trimmed))
      );
    });
  }, [filter, trimmed]);

  // With no filter, show the dishes grouped under their category headings.
  const grouped = useMemo(() => {
    if (filter !== "All" || trimmed) return null;
    const map = new Map<MenuCategory, MenuItem[]>();
    for (const item of visible) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return [...map.entries()];
  }, [filter, trimmed, visible]);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-[73px] z-30 -mx-6 border-y border-hairline-soft bg-obsidian/95 px-6 py-5 backdrop-blur-xl lg:-mx-10 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Category pills */}
          <div
            role="group"
            aria-label="Filter by category"
            className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {(["All", ...categories] as Filter[]).map((category) => {
              const count =
                category === "All"
                  ? menu.length
                  : menu.filter((item) => item.category === category).length;
              const active = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={active}
                  className={cn(
                    "shrink-0 snap-start border px-5 py-2.5 text-[0.6875rem] uppercase tracking-[0.16em] transition-all duration-500 [transition-timing-function:var(--ease-luxe)]",
                    active
                      ? "border-gold bg-gold text-obsidian"
                      : "border-hairline-soft text-ivory-dim hover:border-gold hover:text-gold",
                  )}
                >
                  {category}
                  <span
                    className={cn(
                      "ml-2.5 text-[0.625rem]",
                      active ? "text-obsidian/60" : "text-ivory-faint",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative lg:w-72">
            <label htmlFor="menu-search" className="sr-only">
              Search the menu
            </label>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ivory-faint"
              strokeWidth={1.4}
              aria-hidden
            />
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search dishes"
              className="h-11 w-full border border-hairline-soft bg-surface pl-11 pr-10 text-sm text-ivory placeholder:text-ivory-faint transition-colors duration-500 focus:border-gold focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-faint transition-colors duration-500 hover:text-gold"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Results */}
      {visible.length === 0 ? (
        <div className="py-28 text-center">
          <p className="font-display text-3xl text-ivory">Nothing matches that</p>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ivory-dim">
            Try a different word, or clear the filters to see the whole menu.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
            className="mt-8 border border-hairline px-7 py-3.5 text-[0.6875rem] uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:border-gold hover:text-gold"
          >
            Show everything
          </button>
        </div>
      ) : grouped ? (
        <div className="space-y-24">
          {grouped.map(([category, items]) => (
            <section key={category} id={slugify(category)} className="scroll-mt-40">
              <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-hairline-soft pb-7">
                <div>
                  <h2 className="text-4xl text-ivory sm:text-5xl">{category}</h2>
                  <p className="mt-3 text-[0.6875rem] uppercase tracking-[0.2em] text-ivory-faint">
                    {items.length} dish{items.length === 1 ? "" : "es"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFilter(category)}
                  className="sweep text-[0.6875rem] uppercase tracking-[0.16em] text-ivory-dim transition-colors duration-500 hover:text-gold"
                >
                  Isolate this section
                </button>
              </div>

              <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <MenuRow key={item.id} item={item} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((item) => (
            <MenuRow key={item.id} item={item} />
          ))}
        </ul>
      )}

      <Ornament className="mt-24" />
    </div>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <li>
      <article className="card-luxe group flex h-full flex-col overflow-hidden">
        <div className="media-zoom relative aspect-4/3 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-transparent" />

          {item.signature ? (
            <span className="absolute left-4 top-4 border border-gold/50 bg-obsidian/75 px-3 py-1.5 text-[0.5625rem] uppercase tracking-[0.22em] text-gold backdrop-blur">
              Signature
            </span>
          ) : null}

          <span className="absolute bottom-4 right-4 font-display text-xl text-ivory">
            {formatPrice(item.price)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-display text-2xl leading-tight text-ivory">
                {item.name}
              </h3>
              <p className="mt-2 text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
                {item.category}
              </p>
            </div>
            <AddToCartButton item={item} />
          </div>

          {item.tags?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-hairline-soft px-2.5 py-1 text-[0.5625rem] uppercase tracking-[0.18em] text-ivory-faint"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory-dim">
            {item.description}
          </p>

          {item.contains ? (
            <p className="mt-4 text-[0.6875rem] leading-relaxed text-ivory-faint">
              Contains: {item.contains}
            </p>
          ) : null}

          <div className="mt-6">
            <AddToCartButton item={item} variant="full" />
          </div>
        </div>
      </article>
    </li>
  );
}
