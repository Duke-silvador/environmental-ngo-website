"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/site/Wordmark";

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart, ready } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // The home page opens with the header over a full-bleed hero image.
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel whenever the route changes. Adjusting state during
  // render is React's supported alternative to syncing it in an effect, and it
  // happens before the new route is painted instead of after.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  // Lock the page behind the open mobile panel.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          transparent
            ? "border-b border-transparent bg-transparent py-6"
            : "border-b border-hairline-soft bg-obsidian/92 backdrop-blur-xl py-4",
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 lg:px-10">
          <Wordmark size="sm" />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-9 lg:flex"
          >
            {site.navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  data-active={active}
                  className={cn(
                    "sweep text-[0.6875rem] uppercase tracking-[0.2em] transition-colors duration-500",
                    active ? "text-gold" : "text-ivory-dim hover:text-ivory",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open basket, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
              className="group relative flex h-11 w-11 items-center justify-center border border-hairline-soft text-ivory transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              <ShoppingBag
                className="h-4 w-4"
                strokeWidth={1.4}
                aria-hidden
              />
              {ready && itemCount > 0 ? (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[0.625rem] font-semibold text-obsidian">
                  {itemCount}
                </span>
              ) : null}
            </button>

            <ButtonLink
              href="/order"
              variant="solid"
              size="sm"
              className="hidden md:inline-flex"
            >
              Order Now
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center border border-hairline-soft text-ivory transition-colors duration-500 hover:border-gold hover:text-gold lg:hidden"
            >
              {menuOpen ? (
                <X className="h-4 w-4" strokeWidth={1.4} aria-hidden />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={1.4} aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile panel */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-obsidian/97 backdrop-blur-xl transition-opacity duration-500 lg:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-center gap-1 px-8 pt-20"
        >
          {site.navigation.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-baseline gap-5 border-b border-hairline-soft py-5"
              style={{
                transitionDelay: menuOpen ? `${index * 55}ms` : "0ms",
              }}
            >
              <span className="text-[0.625rem] tracking-[0.3em] text-gold/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-3xl text-ivory transition-colors duration-500 group-hover:text-gold-light sm:text-4xl">
                {item.label}
              </span>
            </Link>
          ))}

          <ButtonLink
            href="/order"
            variant="solid"
            size="lg"
            full
            className="mt-10"
            onClick={() => setMenuOpen(false)}
          >
            Start an Order
          </ButtonLink>

          <a
            href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
            className="mt-6 text-center text-[0.6875rem] uppercase tracking-[0.2em] text-ivory-faint"
          >
            {site.phone}
          </a>
        </nav>
      </div>
    </>
  );
}
