"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";

export function CartDrawer() {
  const {
    lines,
    isOpen,
    closeCart,
    setQuantity,
    remove,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    clear,
  } = useCart();

  // Escape closes the drawer.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  const remainingForFree = Math.max(site.freeDeliveryOver - subtotal, 0);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70]",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isOpen}
    >
      {/* Scrim */}
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close basket"
        onClick={closeCart}
        className={cn(
          "absolute inset-0 bg-obsidian/80 backdrop-blur-sm transition-opacity duration-600",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your basket"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-hairline-soft bg-surface transition-transform duration-600 [transition-timing-function:var(--ease-luxe)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-hairline-soft px-7 py-6">
          <div>
            <p className="eyebrow">Your Basket</p>
            <h2 className="mt-2 text-2xl text-ivory">
              {itemCount === 0
                ? "Nothing yet"
                : `${itemCount} item${itemCount === 1 ? "" : "s"}`}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close basket"
            tabIndex={isOpen ? 0 : -1}
            className="flex h-10 w-10 items-center justify-center border border-hairline-soft text-ivory transition-colors duration-500 hover:border-gold hover:text-gold"
          >
            <X className="h-4 w-4" strokeWidth={1.4} aria-hidden />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center border border-hairline text-gold">
              <ShoppingBag className="h-6 w-6" strokeWidth={1} aria-hidden />
            </div>
            <div>
              <p className="font-display text-2xl text-ivory">Your basket is empty</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory-faint">
                Choose something from the menu and it will appear here.
              </p>
            </div>
            <ButtonLink href="/menu" variant="outline" onClick={closeCart}>
              Browse the Menu
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-7">
              <ul className="divide-y divide-hairline-soft">
                {lines.map((line) => (
                  <li key={line.id} className="flex gap-4 py-6">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-hairline-soft">
                      <Image
                        src={line.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="truncate font-display text-lg text-ivory">
                          {line.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(line.id)}
                          aria-label={`Remove ${line.name}`}
                          className="shrink-0 text-ivory-faint transition-colors duration-500 hover:text-red-400/80"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden />
                        </button>
                      </div>

                      {line.note ? (
                        <p className="mt-1 text-xs italic text-ivory-faint">
                          “{line.note}”
                        </p>
                      ) : null}

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center border border-hairline-soft">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.id, line.quantity - 1)}
                            aria-label={`Decrease ${line.name}`}
                            className="flex h-8 w-8 items-center justify-center text-ivory-dim transition-colors duration-300 hover:text-gold"
                          >
                            <Minus className="h-3 w-3" strokeWidth={1.5} aria-hidden />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums text-ivory">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.id, line.quantity + 1)}
                            aria-label={`Increase ${line.name}`}
                            className="flex h-8 w-8 items-center justify-center text-ivory-dim transition-colors duration-300 hover:text-gold"
                          >
                            <Plus className="h-3 w-3" strokeWidth={1.5} aria-hidden />
                          </button>
                        </div>

                        <p className="text-sm tabular-nums text-ivory">
                          {formatPrice(line.price * line.quantity)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <footer className="border-t border-hairline-soft px-7 py-6">
              {remainingForFree > 0 ? (
                <p className="mb-5 text-center text-[0.6875rem] uppercase tracking-[0.16em] text-ivory-faint">
                  {formatPrice(remainingForFree)} away from free delivery
                </p>
              ) : (
                <p className="mb-5 text-center text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
                  Free delivery unlocked
                </p>
              )}

              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ivory-faint">Subtotal</dt>
                  <dd className="tabular-nums text-ivory">
                    {formatPrice(subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ivory-faint">Delivery</dt>
                  <dd className="tabular-nums text-ivory">
                    {deliveryFee > 0 ? formatPrice(deliveryFee) : "Free"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-hairline-soft pt-3.5">
                  <dt className="text-[0.6875rem] uppercase tracking-[0.2em] text-ivory-dim">
                    Total
                  </dt>
                  <dd className="font-display text-2xl tabular-nums text-gold-light">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>

              <ButtonLink
                href="/order"
                variant="solid"
                size="lg"
                full
                className="mt-6"
                onClick={closeCart}
              >
                Checkout
              </ButtonLink>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  href="/menu"
                  onClick={closeCart}
                  className="sweep text-[0.6875rem] uppercase tracking-[0.16em] text-ivory-faint transition-colors duration-500 hover:text-gold"
                >
                  Keep browsing
                </Link>
                <button
                  type="button"
                  onClick={clear}
                  className="text-[0.6875rem] uppercase tracking-[0.16em] text-ivory-faint transition-colors duration-500 hover:text-red-400/80"
                >
                  Empty basket
                </button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
