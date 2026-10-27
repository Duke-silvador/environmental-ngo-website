import type { Metadata } from "next";
import { menu } from "@/data/menu";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { Ornament } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Nineteen dishes, all cooked to order. Seafood, grills, salads, bread and desserts — build your basket and check out in under a minute.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu · Maison Arden",
    description: "Nineteen dishes, all cooked to order.",
    url: "/menu",
  },
};

/** MenuItem structured data so dishes can show up in search results. */
function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Maison Arden Menu",
    hasMenuSection: [...new Set(menu.map((item) => item.category))].map(
      (category) => ({
        "@type": "MenuSection",
        name: category,
        hasMenuItem: menu
          .filter((item) => item.category === category)
          .map((item) => ({
            "@type": "MenuItem",
            name: item.name,
            description: item.description,
            offers: {
              "@type": "Offer",
              price: item.price,
              priceCurrency: "USD",
            },
          })),
      }),
    ),
  };
}

export default function MenuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(menuJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      {/* Page header */}
      <header className="relative overflow-hidden pb-20 pt-36 lg:pb-24 lg:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-obsidian-800 via-obsidian to-obsidian"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />

        <div className="relative mx-auto max-w-[1400px] px-6 text-center lg:px-10">
          <p className="eyebrow">The Full Menu</p>
          <h1 className="mx-auto mt-7 max-w-4xl text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-8xl">
            Nineteen dishes,{" "}
            <span className="text-luxe italic">nothing pre-made</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ivory-dim sm:text-lg">
            Add what you like to your basket as you read. When you are ready,
            check out and your order comes to us as a single message.
          </p>
          <Ornament className="mx-auto mt-12 max-w-md" />
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 pb-32 lg:px-10">
        <MenuExplorer />
      </div>
    </>
  );
}
