/**
 * THE CUSTOMER'S ORDER HISTORY.
 *
 * There is no server and no database on this site: when a diner sends an
 * order it goes to the chef over WhatsApp/email. To still give customers a
 * "my history", each order is also saved in that customer's own browser via
 * localStorage and listed at /history.
 *
 * Consequences you should be aware of:
 *  - history is per-device and per-browser, not tied to an account
 *  - clearing site data or switching device loses the list
 *  - the chef never sees this list; they see the WhatsApp message
 *  - status is set by the customer, not by the chef, because there is no
 *    server to tell us what happened
 */

"use client";

import type { CartLine } from "@/lib/cart";

const STORAGE_KEY = "maison-arden.orders.v1";

export type Fulfilment = "delivery" | "pickup";

/**
 * "sent"     — handed to the chef over WhatsApp, not yet confirmed
 * "completed"— the customer marked this one as finished
 * "cancelled"— the customer marked this one as cancelled
 */
export type OrderStatus = "sent" | "completed" | "cancelled";

export type SavedOrder = {
  id: string;
  createdAt: string;
  /** ISO date (yyyy-mm-dd) the customer asked for. */
  requestedDate: string;
  requestedTime: string;
  fulfilment: Fulfilment;
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  guests: number;
  occasion: string;
  notes: string;
  status: OrderStatus;
};

export const orderStatusMeta: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  sent: {
    label: "Sent · awaiting confirmation",
    className: "border-gold/40 text-gold",
  },
  completed: {
    label: "Completed",
    className: "border-emerald-500/30 text-emerald-400/90",
  },
  cancelled: {
    label: "Cancelled",
    className: "border-ivory-faint/40 text-ivory-faint",
  },
};

function readOrders(): SavedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is SavedOrder =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as SavedOrder).id === "string" &&
        Array.isArray((entry as SavedOrder).lines),
    );
  } catch {
    return [];
  }
}

function writeOrders(orders: SavedOrder[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // Storage blocked or full. History will not persist this session.
  }
}

/** Short, human-quotable order reference, e.g. "ARD-7K42". */
function newOrderId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `ARD-${suffix}`;
}

export function saveOrder(
  order: Omit<SavedOrder, "id" | "createdAt" | "status">,
): SavedOrder {
  const saved: SavedOrder = {
    ...order,
    id: newOrderId(),
    createdAt: new Date().toISOString(),
    status: "sent",
  };
  const existing = readOrders();
  writeOrders([saved, ...existing].slice(0, 50));
  return saved;
}

export function getOrders(): SavedOrder[] {
  return readOrders().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getOrder(id: string): SavedOrder | undefined {
  return readOrders().find((order) => order.id === id);
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus,
): SavedOrder[] {
  const next = readOrders().map((order) =>
    order.id === id ? { ...order, status } : order,
  );
  writeOrders(next);
  return getOrders();
}

export function removeOrder(id: string): SavedOrder[] {
  writeOrders(readOrders().filter((order) => order.id !== id));
  return getOrders();
}

export function clearOrders(): void {
  writeOrders([]);
}

/** Aggregate numbers for the /history summary strip. */
export function orderSummary(orders: SavedOrder[]) {
  const placed = orders.length;
  const spent = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);
  const dishes = orders.reduce(
    (sum, order) =>
      sum + order.lines.reduce((inner, line) => inner + line.quantity, 0),
    0,
  );
  const first = orders.length
    ? orders.reduce((earliest, order) =>
        new Date(order.createdAt).getTime() <
        new Date(earliest.createdAt).getTime()
          ? order
          : earliest,
      )
    : null;

  return {
    placed,
    spent,
    dishes,
    firstOrderAt: first?.createdAt ?? null,
  };
}
