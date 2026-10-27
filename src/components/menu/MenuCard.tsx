import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/menu/AddToCartButton";

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="card-luxe group flex flex-col overflow-hidden">
      <div className="media-zoom relative aspect-4/3 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          <h3 className="font-display text-2xl leading-tight text-ivory">
            {item.name}
          </h3>
          <AddToCartButton item={item} />
        </div>

        {item.tags?.length ? (
          <ul className="mt-3 flex flex-wrap gap-2">
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
      </div>
    </article>
  );
}
