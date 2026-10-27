"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart";

/**
 * Client boundary for everything that needs browser state. The cart lives in
 * localStorage, so it can only be read after mount.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
