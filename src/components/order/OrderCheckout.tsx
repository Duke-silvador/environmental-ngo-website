"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  MapPin,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { site } from "@/config/site";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { saveOrder, type Fulfilment } from "@/lib/orders";
import {
  buildEmailBody,
  buildOrderMessage,
  emailOrderLink,
  whatsappOrderLink,
  type OrderDetails,
} from "@/lib/whatsapp";
import { Button, ButtonLink } from "@/components/ui/Button";

const OCCASIONS = [
  "No occasion — just hungry",
  "Birthday",
  "Anniversary",
  "Date night",
  "Family dinner",
  "Corporate / office",
  "Just because",
];

const emptyDetails: OrderDetails = {
  name: "",
  phone: "",
  email: "",
  address: "",
  requestedDate: "",
  requestedTime: "",
  fulfilment: "delivery",
  guests: 2,
  occasion: OCCASIONS[0],
  notes: "",
};

type Step = "details" | "review" | "sent";

export function OrderCheckout() {
  const router = useRouter();
  const {
    lines,
    setQuantity,
    remove,
    subtotal,
    deliveryFee,
    total,
    clear,
    openCart,
  } = useCart();

  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<OrderDetails>(emptyDetails);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [orderRef, setOrderRef] = useState<string | null>(null);

  const totals = useMemo(
    () => ({ subtotal, deliveryFee, total }),
    [subtotal, deliveryFee, total],
  );

  const message = useMemo(
    () => buildOrderMessage(lines, totals, details, orderRef ?? undefined),
    [lines, totals, details, orderRef],
  );

  const whatsappHref = whatsappOrderLink(message);
  const emailHref = emailOrderLink(
    buildEmailBody(lines, totals, details, orderRef ?? undefined),
    `Order from ${site.name}${orderRef ? ` (${orderRef})` : ""}`,
  );

  function update<K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) {
    setDetails((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function validate(): boolean {
    const next: Record<string, string> = {};

    if (!details.name.trim()) next.name = "Please add your name";
    if (!details.phone.trim()) {
      next.phone = "We need a number to confirm the order";
    }
    if (details.fulfilment === "delivery" && !details.address.trim()) {
      next.address = "Where should we deliver it?";
    }
    if (details.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
      next.email = "That email address does not look right";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Move focus to the first problem so keyboard users are not stranded.
      const firstKey = Object.keys(next)[0];
      document.getElementById(`field-${firstKey}`)?.focus();
      return false;
    }
    return true;
  }

  function handleReview() {
    if (!validate()) return;
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /** Records the order locally, then opens WhatsApp. */
  function handleSend() {
    const saved = saveOrder({
      requestedDate: details.requestedDate,
      requestedTime: details.requestedTime,
      fulfilment: details.fulfilment,
      lines,
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      customer: {
        name: details.name,
        phone: details.phone,
        email: details.email,
        address: details.address,
      },
      guests: details.guests,
      occasion: details.occasion,
      notes: details.notes,
    });

    setOrderRef(saved.id);
    setStep("sent");
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (insecure context). The textarea below is selectable.
    }
  }

  const fieldClass = (key: string) =>
    cn(
      "h-12 w-full border bg-surface px-4 text-sm text-ivory transition-colors duration-500 placeholder:text-ivory-faint focus:outline-none",
      errors[key]
        ? "border-red-500/60 focus:border-red-500"
        : "border-hairline-soft focus:border-gold",
    );

  // ------------------------------------------------------------------ states
  if (lines.length === 0 && step === "details") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="eyebrow">Your Basket</p>
        <h2 className="mt-6 text-4xl text-ivory sm:text-5xl">
          Your basket is empty
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ivory-dim">
          Add a few dishes from the menu and they will show up here, ready for
          you to check out.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/menu" variant="solid" size="lg">
            Browse the Menu
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Enquire about catering
          </ButtonLink>
        </div>
      </div>
    );
  }

  if (step === "sent") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 text-gold">
          <Check className="h-8 w-8" strokeWidth={1.2} aria-hidden />
        </div>

        <p className="eyebrow mt-10">Order Ready</p>
        <h2 className="mt-6 text-4xl leading-tight text-ivory sm:text-5xl">
          Press send and it is with us
        </h2>

        <p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-ivory-dim">
          Your order has been saved as{" "}
          <span className="text-gold">{orderRef}</span>. Use the button below
          to open WhatsApp with the order already written out — then tap send.
          We reply to confirm the menu, price and time.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center border border-gold bg-gold px-9 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-obsidian transition-colors duration-500 hover:bg-gold-light"
          >
            Open WhatsApp
          </a>
          <a
            href={emailHref}
            className="inline-flex h-14 items-center justify-center border border-hairline px-9 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:border-gold hover:text-gold-light"
          >
            Send by email
          </a>
        </div>

        <div className="mt-12 border border-hairline-soft p-7 text-left">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[0.625rem] uppercase tracking-[0.2em] text-ivory-faint">
              The message we will receive
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.16em] text-ivory-faint transition-colors duration-500 hover:text-gold"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" strokeWidth={2} aria-hidden />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" strokeWidth={1.6} aria-hidden />
                  Copy
                </>
              )}
            </button>
          </div>
          <textarea
            readOnly
            value={message}
            rows={12}
            aria-label="Your order as a message"
            className="mt-5 w-full resize-none border border-hairline-soft bg-obsidian p-5 font-mono text-[0.6875rem] leading-relaxed text-ivory-dim"
          />
        </div>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/history" variant="outline">
            View my order history
          </ButtonLink>
          <ButtonLink href="/menu" variant="ghost">
            Back to the menu
          </ButtonLink>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------- details/review
  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      {/* Main column */}
      <div className="lg:col-span-7">
        {/* Progress */}
        <div className="mb-12 flex items-center gap-4">
          {(["details", "review"] as Step[]).map((label, index) => {
            const active = step === label;
            return (
              <div key={label} className="flex items-center gap-4">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center border text-xs transition-colors duration-500",
                    active
                      ? "border-gold bg-gold text-obsidian"
                      : "border-hairline-soft text-ivory-faint",
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "text-[0.6875rem] uppercase tracking-[0.18em]",
                    active ? "text-ivory" : "text-ivory-faint",
                  )}
                >
                  {label === "details" ? "Your details" : "Review & send"}
                </span>
                {index === 0 ? (
                  <span className="h-px w-8 bg-hairline-soft" aria-hidden />
                ) : null}
              </div>
            );
          })}
        </div>

        {step === "details" ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleReview();
            }}
            className="space-y-10"
          >
            <fieldset className="space-y-6">
              <legend className="eyebrow">Who you are</legend>

              <div className="grid gap-5 sm:grid-cols-2">
                <Labeled label="Full name" error={errors.name} required>
                  <input
                    id="field-name"
                    type="text"
                    autoComplete="name"
                    value={details.name}
                    onChange={(event) => update("name", event.target.value)}
                    placeholder="Your name"
                    className={fieldClass("name")}
                  />
                </Labeled>

                <Labeled label="Phone" error={errors.phone} required>
                  <input
                    id="field-phone"
                    type="tel"
                    autoComplete="tel"
                    value={details.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    placeholder="+255 ..."
                    className={fieldClass("phone")}
                  />
                </Labeled>
              </div>

              <Labeled label="Email (optional)" error={errors.email}>
                <input
                  id="field-email"
                  type="email"
                  autoComplete="email"
                  value={details.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="you@example.com"
                  className={fieldClass("email")}
                />
              </Labeled>
            </fieldset>

            <fieldset className="space-y-6">
              <legend className="eyebrow">How you want it</legend>

              {/* Fulfilment toggle */}
              <div>
                <p className="mb-3 text-xs text-ivory-dim">Delivery or pickup</p>
                <div className="grid grid-cols-2 gap-px border border-hairline-soft bg-hairline-soft">
                  {(
                    [
                      { value: "delivery", label: "Delivery" },
                      { value: "pickup", label: "Collection" },
                    ] as { value: Fulfilment; label: string }[]
                  ).map((option) => {
                    const active = details.fulfilment === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => update("fulfilment", option.value)}
                        aria-pressed={active}
                        className={cn(
                          "h-12 text-[0.6875rem] uppercase tracking-[0.16em] transition-colors duration-500",
                          active
                            ? "bg-gold text-obsidian"
                            : "bg-obsidian text-ivory-dim hover:bg-surface-2 hover:text-ivory",
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {details.fulfilment === "delivery" ? (
                <Labeled label="Delivery address" error={errors.address} required>
                  <div className="relative">
                    <MapPin
                      className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gold/60"
                      strokeWidth={1.4}
                      aria-hidden
                    />
                    <input
                      id="field-address"
                      type="text"
                      autoComplete="street-address"
                      value={details.address}
                      onChange={(event) => update("address", event.target.value)}
                      placeholder="Street, area, and any directions"
                      className={cn(fieldClass("address"), "pl-11")}
                    />
                  </div>
                </Labeled>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <Labeled label="Date (leave blank for ASAP)">
                  <input
                    id="field-requestedDate"
                    type="date"
                    value={details.requestedDate}
                    onChange={(event) =>
                      update("requestedDate", event.target.value)
                    }
                    className={fieldClass("requestedDate")}
                  />
                </Labeled>

                <Labeled label="Time">
                  <input
                    id="field-requestedTime"
                    type="time"
                    value={details.requestedTime}
                    onChange={(event) =>
                      update("requestedTime", event.target.value)
                    }
                    className={fieldClass("requestedTime")}
                  />
                </Labeled>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Labeled label="Guests">
                  <div className="flex h-12 items-center border border-hairline-soft bg-surface">
                    <button
                      type="button"
                      onClick={() =>
                        update("guests", Math.max(1, details.guests - 1))
                      }
                      aria-label="Fewer guests"
                      className="flex h-full w-12 items-center justify-center text-ivory-dim transition-colors duration-300 hover:text-gold"
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                    </button>
                    <span className="flex-1 text-center text-sm tabular-nums text-ivory">
                      {details.guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => update("guests", Math.min(60, details.guests + 1))}
                      aria-label="More guests"
                      className="flex h-full w-12 items-center justify-center text-ivory-dim transition-colors duration-300 hover:text-gold"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                    </button>
                  </div>
                </Labeled>

                <Labeled label="Occasion">
                  <select
                    id="field-occasion"
                    value={details.occasion}
                    onChange={(event) => update("occasion", event.target.value)}
                    className={cn(fieldClass("occasion"), "appearance-none")}
                  >
                    {OCCASIONS.map((occasion) => (
                      <option key={occasion} value={occasion} className="bg-surface">
                        {occasion}
                      </option>
                    ))}
                  </select>
                </Labeled>
              </div>

              <Labeled label="Notes for the kitchen">
                <textarea
                  id="field-notes"
                  rows={4}
                  value={details.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  placeholder="Allergies, spice level, anything to leave out, cake inscription..."
                  className={cn(
                    fieldClass("notes"),
                    "h-auto resize-y py-4 leading-relaxed",
                  )}
                />
              </Labeled>
            </fieldset>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button type="submit" variant="solid" size="lg">
                Review the order
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={openCart}
              >
                Edit basket
              </Button>
            </div>
          </form>
        ) : (
          /* ---------------- Review step ---------------- */
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl text-ivory">Check this is right</h2>
              <p className="mt-4 text-sm leading-relaxed text-ivory-dim">
                This is exactly the message we will receive. Nothing is charged
                on this site — you send it to us and we reply to confirm.
              </p>
            </div>

            {/* Summary of details */}
            <dl className="grid gap-px border border-hairline-soft bg-hairline-soft sm:grid-cols-2">
              {[
                { term: "Name", value: details.name },
                { term: "Phone", value: details.phone },
                { term: "Email", value: details.email || "—" },
                {
                  term: "Type",
                  value:
                    details.fulfilment === "delivery" ? "Delivery" : "Collection",
                },
                ...(details.fulfilment === "delivery"
                  ? [{ term: "Address", value: details.address }]
                  : []),
                {
                  term: "When",
                  value: `${details.requestedDate || "As soon as possible"}${details.requestedTime ? ` at ${details.requestedTime}` : ""}`,
                },
                { term: "Guests", value: String(details.guests) },
                { term: "Occasion", value: details.occasion },
                ...(details.notes
                  ? [{ term: "Notes", value: details.notes }]
                  : []),
              ].map((row) => (
                <div key={row.term} className="bg-obsidian p-5">
                  <dt className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
                    {row.term}
                  </dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-ivory">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* The literal message */}
            <div className="border border-hairline-soft">
              <div className="flex items-center justify-between gap-4 border-b border-hairline-soft px-6 py-4">
                <p className="text-[0.625rem] uppercase tracking-[0.2em] text-ivory-faint">
                  Your message to {site.name}
                </p>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.16em] text-ivory-faint transition-colors duration-500 hover:text-gold"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" strokeWidth={2} aria-hidden />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" strokeWidth={1.6} aria-hidden />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <textarea
                readOnly
                value={message}
                rows={14}
                aria-label="Your order as a message"
                className="block w-full resize-none border-0 bg-obsidian p-6 font-mono text-[0.6875rem] leading-relaxed text-ivory-dim focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                type="button"
                variant="solid"
                size="lg"
                onClick={handleSend}
              >
                Save &amp; open WhatsApp
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={() => {
                  setStep("details");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
                Back to details
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Sticky summary */}
      <aside className="lg:col-span-5">
        <div className="sticky top-32 border border-hairline-soft bg-surface">
          <div className="border-b border-hairline-soft px-7 py-6">
            <p className="eyebrow">Order Summary</p>
            <p className="mt-2.5 text-sm text-ivory-dim">
              {lines.length} dish{lines.length === 1 ? "" : "es"}
            </p>
          </div>

          <ul className="max-h-[380px] divide-y divide-hairline-soft overflow-y-auto px-7">
            {lines.map((line) => (
              <li key={line.id} className="flex gap-4 py-5">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-hairline-soft">
                  <Image
                    src={line.image}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="truncate font-display text-base text-ivory">
                      {line.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => remove(line.id)}
                      aria-label={`Remove ${line.name}`}
                      className="shrink-0 text-ivory-faint transition-colors duration-500 hover:text-red-400/80"
                    >
                      <Trash2 className="h-3 w-3" strokeWidth={1.4} aria-hidden />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center border border-hairline-soft">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.id, line.quantity - 1)}
                        aria-label={`Decrease ${line.name}`}
                        className="flex h-7 w-7 items-center justify-center text-ivory-dim transition-colors duration-300 hover:text-gold"
                      >
                        <Minus className="h-3 w-3" strokeWidth={1.5} aria-hidden />
                      </button>
                      <span className="w-7 text-center text-xs tabular-nums text-ivory">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.id, line.quantity + 1)}
                        aria-label={`Increase ${line.name}`}
                        className="flex h-7 w-7 items-center justify-center text-ivory-dim transition-colors duration-300 hover:text-gold"
                      >
                        <Plus className="h-3 w-3" strokeWidth={1.5} aria-hidden />
                      </button>
                    </div>
                    <p className="text-xs tabular-nums text-ivory">
                      {formatPrice(line.price * line.quantity)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-hairline-soft px-7 py-6">
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ivory-faint">Subtotal</dt>
                <dd className="tabular-nums text-ivory">
                  {formatPrice(subtotal)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ivory-faint">
                  Delivery
                  {details.fulfilment === "pickup" ? " (collection)" : ""}
                </dt>
                <dd className="tabular-nums text-ivory">
                  {details.fulfilment === "pickup"
                    ? "—"
                    : deliveryFee > 0
                      ? formatPrice(deliveryFee)
                      : "Free"}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-hairline-soft pt-3.5">
                <dt className="text-[0.6875rem] uppercase tracking-[0.2em] text-ivory-dim">
                  Total
                </dt>
                <dd className="font-display text-2xl tabular-nums text-gold-light">
                  {formatPrice(
                    details.fulfilment === "pickup" ? subtotal : total,
                  )}
                </dd>
              </div>
            </dl>

            {subtotal < site.freeDeliveryOver &&
            details.fulfilment === "delivery" ? (
              <p className="mt-5 text-[0.6875rem] leading-relaxed text-ivory-faint">
                Spend {formatPrice(site.freeDeliveryOver - subtotal)} more for
                free delivery.
              </p>
            ) : null}

            <Button
              type="button"
              variant="outline"
              size="md"
              full
              className="mt-6"
              onClick={() => {
                setStep("details");
                router.push("/menu");
              }}
            >
              Add more dishes
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Labeled({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2.5 flex items-baseline gap-2 text-xs text-ivory-dim">
        {label}
        {required ? (
          <span className="text-[0.625rem] uppercase tracking-[0.16em] text-gold/70">
            Required
          </span>
        ) : null}
      </span>
      {children}
      {error ? (
        <span role="alert" className="mt-2 block text-xs text-red-400/90">
          {error}
        </span>
      ) : null}
    </label>
  );
}
