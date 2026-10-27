"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  ChevronDown,
  MapPin,
  RotateCcw,
  Trash2,
  Utensils,
  X,
} from "lucide-react";
import { useState } from "react";
import { site, whatsappLink } from "@/config/site";
import { useCart } from "@/lib/cart";
import { useHydrated } from "@/lib/useHydrated";
import { formatDate, formatDateTime, formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import {
  clearOrders,
  getOrders,
  orderStatusMeta,
  orderSummary,
  removeOrder,
  updateOrderStatus,
  type OrderStatus,
  type SavedOrder,
} from "@/lib/orders";
import { Button, ButtonLink } from "@/components/ui/Button";

export function HistoryClient() {
  const { add, openCart } = useCart();
  // Storage is browser-only, so this is empty on the server. `ready` keeps the
  // placeholder rendered until hydration, avoiding a mismatch.
  const [orders, setOrders] = useState<SavedOrder[]>(getOrders);
  const [openId, setOpenId] = useState<string | null>(null);
  const [reordered, setReordered] = useState<string | null>(null);
  const ready = useHydrated();

  const summary = orderSummary(orders);

  function handleReorder(order: SavedOrder) {
    for (const line of order.lines) {
      const match = line;
      add(
        {
          id: match.id,
          name: match.name,
          description: "",
          price: match.price,
          category: "Starters",
          image: match.image,
        },
        line.quantity,
        line.note,
      );
    }
    setReordered(order.id);
    setTimeout(() => setReordered(null), 2200);
    openCart();
  }

  function setStatus(id: string, status: OrderStatus) {
    setOrders(updateOrderStatus(id, status));
  }

  function handleDelete(id: string) {
    setOrders(removeOrder(id));
    if (openId === id) setOpenId(null);
  }

  function handleClearAll() {
    if (
      !window.confirm(
        "Delete every saved order from this browser? This cannot be undone.",
      )
    ) {
      return;
    }
    clearOrders();
    setOrders([]);
  }

  // ----------------------------------------------------------------- loading
  // Rendered on the server and on the first client render, so the markup React
  // hydrates always matches.
  if (!ready) {
    return (
      <div
        aria-busy="true"
        aria-live="polite"
        className="grid grid-cols-2 gap-px border border-hairline-soft bg-hairline-soft lg:grid-cols-4"
      >
        {[0, 1, 2, 3].map((cell) => (
          <div key={cell} className="bg-obsidian px-6 py-8">
            <div className="h-2 w-20 bg-hairline-soft" />
            <div className="mt-4 h-7 w-24 bg-hairline-soft" />
          </div>
        ))}
        <span className="sr-only">Loading your order history…</span>
      </div>
    );
  }

  // ---------------------------------------------------------------- empty
  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-hairline text-gold">
          <Utensils className="h-7 w-7" strokeWidth={1.1} aria-hidden />
        </div>

        <h2 className="mt-10 text-4xl leading-tight text-ivory sm:text-5xl">
          No orders yet
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ivory-dim">
          When you send an order it is saved here, on this device, so you can
          check it later, reorder it in one tap, and see what you have had
          before.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/menu" variant="solid" size="lg">
            Browse the Menu
          </ButtonLink>
          <ButtonLink
            href={whatsappLink(
              `Hello ${site.name}, I would like to place my first order.`,
            )}
            variant="outline"
            size="lg"
          >
            Ask a question
          </ButtonLink>
        </div>

        <p className="mx-auto mt-14 max-w-md text-xs leading-relaxed text-ivory-faint">
          Heads up: this history lives in this browser only. There is no account
          and no database, so it will not follow you to another device.
        </p>
      </div>
    );
  }

  // ---------------------------------------------------------------- loaded
  return (
    <div>
      {/* Summary strip */}
      <dl className="grid grid-cols-2 gap-px border border-hairline-soft bg-hairline-soft lg:grid-cols-4">
        {[
          { term: "Orders placed", value: String(summary.placed) },
          { term: "Total spent", value: formatPrice(summary.spent) },
          { term: "Dishes enjoyed", value: String(summary.dishes) },
          {
            term: "A customer since",
            value: summary.firstOrderAt
              ? formatDate(summary.firstOrderAt)
              : "Today",
          },
        ].map((item) => (
          <div key={item.term} className="bg-obsidian px-6 py-8">
            <dt className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
              {item.term}
            </dt>
            <dd className="mt-3 font-display text-2xl text-ivory sm:text-3xl">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Order list */}
      <ul className="mt-10 space-y-4">
        {orders.map((order) => {
          const expanded = openId === order.id;
          const status = orderStatusMeta[order.status];

          return (
            <li key={order.id} className="card-luxe">
              {/* Header row */}
              <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-xl text-ivory">
                      {order.id}
                    </span>
                    <span
                      className={cn(
                        "border px-2.5 py-1 text-[0.5625rem] uppercase tracking-[0.16em]",
                        status.className,
                      )}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ivory-faint">
                    <span className="flex items-center gap-2">
                      <CalendarDays
                        className="h-3 w-3 text-gold/60"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      Sent {formatDateTime(order.createdAt)}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin
                        className="h-3 w-3 text-gold/60"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      {order.fulfilment === "delivery" ? "Delivery" : "Collection"}
                    </span>
                    <span>
                      {order.guests} guest{order.guests === 1 ? "" : "s"}
                    </span>
                    {order.occasion !== "No occasion — just hungry" ? (
                      <span className="text-gold/80">{order.occasion}</span>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-display text-2xl text-gold-light">
                    {formatPrice(order.total)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setOpenId(expanded ? null : order.id)}
                    aria-expanded={expanded}
                    aria-label={expanded ? "Hide order" : "Show order"}
                    className="flex h-10 w-10 items-center justify-center border border-hairline-soft text-ivory transition-colors duration-500 hover:border-gold hover:text-gold"
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-500",
                        expanded ? "rotate-180" : "",
                      )}
                      strokeWidth={1.4}
                      aria-hidden
                    />
                  </button>
                </div>
              </div>

              {/* Detail */}
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-600 [transition-timing-function:var(--ease-luxe)]",
                  expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-hairline-soft p-6">
                    <ul className="space-y-4">
                      {order.lines.map((line) => (
                        <li
                          key={line.id}
                          className="flex items-center gap-4"
                        >
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-hairline-soft">
                            <Image
                              src={line.image}
                              alt=""
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <span className="w-6 shrink-0 text-sm tabular-nums text-ivory-faint">
                            {line.quantity}×
                          </span>
                          <span className="flex-1 text-sm text-ivory">
                            {line.name}
                          </span>
                          <span className="text-sm tabular-nums text-ivory-dim">
                            {formatPrice(line.price * line.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-6 space-y-2 border-t border-hairline-soft pt-5 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-ivory-faint">Subtotal</dt>
                        <dd className="tabular-nums text-ivory">
                          {formatPrice(order.subtotal)}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-ivory-faint">Delivery</dt>
                        <dd className="tabular-nums text-ivory">
                          {order.deliveryFee > 0
                            ? formatPrice(order.deliveryFee)
                            : "Free"}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between pt-2">
                        <dt className="text-[0.6875rem] uppercase tracking-[0.2em] text-ivory-dim">
                          Total
                        </dt>
                        <dd className="font-display text-xl tabular-nums text-gold-light">
                          {formatPrice(order.total)}
                        </dd>
                      </div>
                    </dl>

                    {/* Booking details */}
                    <dl className="mt-6 grid gap-px border border-hairline-soft bg-hairline-soft sm:grid-cols-2">
                      {[
                        { term: "Name", value: order.customer.name },
                        { term: "Phone", value: order.customer.phone },
                        ...(order.customer.email
                          ? [{ term: "Email", value: order.customer.email }]
                          : []),
                        {
                          term: "For",
                          value: `${order.requestedDate || "ASAP"}${order.requestedTime ? ` at ${order.requestedTime}` : ""}`,
                        },
                        ...(order.customer.address
                          ? [{ term: "Address", value: order.customer.address }]
                          : []),
                        ...(order.notes
                          ? [{ term: "Notes", value: order.notes }]
                          : []),
                      ].map((row) => (
                        <div key={row.term} className="bg-obsidian p-4">
                          <dt className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
                            {row.term}
                          </dt>
                          <dd className="mt-2 text-sm leading-relaxed text-ivory">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button
                        type="button"
                        variant="solid"
                        size="sm"
                        onClick={() => handleReorder(order)}
                        disabled={reordered === order.id}
                      >
                        {reordered === order.id ? (
                          <>
                            <Check className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                            In your basket
                          </>
                        ) : (
                          <>
                            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                            Reorder
                          </>
                        )}
                      </Button>

                      <a
                        href={whatsappLink(
                          `Hello ${site.name}, I am following up on order ${order.id}.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center justify-center border border-hairline px-5 text-[0.6875rem] uppercase tracking-[0.16em] text-ivory transition-colors duration-500 hover:border-gold hover:text-gold"
                      >
                        Follow up
                      </a>

                      {order.status !== "completed" ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setStatus(order.id, "completed")}
                        >
                          Mark completed
                        </Button>
                      ) : null}

                      {order.status !== "cancelled" ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setStatus(order.id, "cancelled")}
                        >
                          Cancel
                        </Button>
                      ) : null}

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(order.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer actions */}
      <div className="mt-12 flex flex-col items-center gap-6 border-t border-hairline-soft pt-12">
        <div className="flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/menu" variant="solid">
            Order again
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Book an event
          </ButtonLink>
        </div>

        {orders.length > 1 ? (
          <button
            type="button"
            onClick={handleClearAll}
            className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.16em] text-ivory-faint transition-colors duration-500 hover:text-red-400/80"
          >
            <X className="h-3 w-3" strokeWidth={1.6} aria-hidden />
            Clear this history
          </button>
        ) : null}

        <p className="max-w-lg text-center text-xs leading-relaxed text-ivory-faint">
          Saved in this browser only. We do not have this list — if you need a
          copy,{" "}
          <Link
            href="/contact"
            className="sweep text-gold/80 transition-colors duration-500 hover:text-gold"
          >
            ask us and we will send it
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
