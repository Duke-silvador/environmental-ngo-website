/**
 * THE CART.
 *
 * A React context holding the basket, mirrored into localStorage so it survives
 * a refresh. Client-only: the server render has no storage, so it always starts
 * empty and consumers gate on `ready` until hydration finishes.
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { site } from "@/config/site";
import { menu, type MenuItem } from "@/data/menu";
import { useHydrated } from "@/lib/useHydrated";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  /** Anything the diner typed in, e.g. "no onion". */
  note?: string;
};

const STORAGE_KEY = "maison-arden.cart.v1";

type CartContextValue = {
  lines: CartLine[];
  /** Adds one, or increments the quantity if the line already exists. */
  add: (item: MenuItem, quantity?: number, note?: string) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  /** True once the persisted cart has been read, so UI can avoid a flash. */
  ready: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Drop anything that no longer exists in the menu file.
    return parsed.flatMap((entry) => {
      if (typeof entry !== "object" || entry === null) return [];
      const line = entry as Partial<CartLine>;
      if (typeof line.id !== "string" || typeof line.quantity !== "number") {
        return [];
      }
      const item = menu.find((m) => m.id === line.id);
      if (!item || line.quantity <= 0) return [];
      return [
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: Math.min(Math.floor(line.quantity), 99),
          note: typeof line.note === "string" ? line.note : undefined,
        },
      ];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  // Read straight from storage during the first client render. The server has no
  // storage and returns [], so consumers must wait for `ready` before showing
  // counts or totals.
  const [lines, setLines] = useState<CartLine[]>(readStoredCart);
  const [isOpen, setIsOpen] = useState(false);
  const ready = useHydrated();

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage can be full or blocked (private mode). The cart still works
      // for the current session, it just will not persist.
    }
  }, [lines, ready]);

  const add = useCallback((item: MenuItem, quantity = 1, note?: string) => {
    setLines((current) => {
      const existing = current.find((line) => line.id === item.id);
      if (existing) {
        return current.map((line) =>
          line.id === item.id
            ? {
                ...line,
                quantity: Math.min(line.quantity + quantity, 99),
                note: note ?? line.note,
              }
            : line,
        );
      }
      return [
        ...current,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: Math.min(quantity, 99),
          note,
        },
      ];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setLines((current) => current.filter((line) => line.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((line) => line.id !== id)
        : current.map((line) =>
            line.id === id
              ? { ...line, quantity: Math.min(Math.floor(quantity), 99) }
              : line,
          ),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = lines.reduce(
      (sum, line) => sum + line.price * line.quantity,
      0,
    );
    const needsDeliveryFee =
      lines.length > 0 && subtotal < site.freeDeliveryOver;

    return {
      lines,
      add,
      remove,
      setQuantity,
      clear,
      itemCount,
      subtotal,
      deliveryFee: needsDeliveryFee ? site.deliveryFee : 0,
      total: subtotal + (needsDeliveryFee ? site.deliveryFee : 0),
      ready,
      isOpen,
      openCart,
      closeCart,
    };
  }, [
    lines,
    add,
    remove,
    setQuantity,
    clear,
    ready,
    isOpen,
    openCart,
    closeCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>.");
  }
  return context;
}
