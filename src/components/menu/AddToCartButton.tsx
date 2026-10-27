"use client";

import { Check, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";

/**
 * Adds a dish to the basket and confirms inline. Deliberately does not open
 * the drawer — a quiet confirmation keeps the page usable when several people
 * are ordering at once.
 */
export function AddToCartButton({
  item,
  variant = "icon",
  className,
}: {
  item: MenuItem;
  variant?: "icon" | "full";
  className?: string;
}) {
  const { add, openCart } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function handleAdd() {
    add(item, 1);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  }

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleAdd}
        className={cn(
          "group/btn flex h-11 w-full items-center justify-center gap-2 border text-[0.6875rem] uppercase tracking-[0.18em] transition-all duration-500 [transition-timing-function:var(--ease-luxe)]",
          added
            ? "border-gold bg-gold/15 text-gold"
            : "border-hairline-soft text-ivory hover:border-gold hover:bg-gold hover:text-obsidian",
          className,
        )}
      >
        {added ? (
          <>
            <Check className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
            Added
          </>
        ) : (
          <>
            <Plus className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
            Add to basket
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      onDoubleClick={openCart}
      aria-label={`Add ${item.name} to basket, ${item.price}`}
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-500 [transition-timing-function:var(--ease-luxe)]",
        added
          ? "border-gold bg-gold/15 text-gold"
          : "border-hairline-soft text-ivory-dim hover:border-gold hover:bg-gold hover:text-obsidian",
        className,
      )}
    >
      {added ? (
        <Check className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
      ) : (
        <Plus className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
      )}
    </button>
  );
}
