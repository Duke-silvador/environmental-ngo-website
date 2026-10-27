/**
 * THE WHATSAPP / EMAIL HANDOFF.
 *
 * This site has no payment provider and no server, so the order is not
 * "submitted" anywhere — it is formatted and handed to the customer's phone or
 * mail app, already addressed to the chef. The customer presses send.
 */

import { site } from "@/config/site";
import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/lib/cart";
import type { Fulfilment } from "@/lib/orders";

export type OrderDetails = {
  name: string;
  phone: string;
  email: string;
  address: string;
  requestedDate: string;
  requestedTime: string;
  fulfilment: Fulfilment;
  guests: number;
  occasion: string;
  notes: string;
};

/** The full order body, shown to the customer in the review step. */
export function buildOrderMessage(
  lines: CartLine[],
  totals: { subtotal: number; deliveryFee: number; total: number },
  details: OrderDetails,
  orderRef?: string,
): string {
  const divider = "──────────────────";
  const rows = lines
    .map(
      (line) =>
        `${line.quantity} × ${line.name} — ${formatPrice(line.price * line.quantity)}`,
    )
    .join("\n");

  const fulfilment =
    details.fulfilment === "delivery"
      ? `Delivery to: ${details.address || "(address to confirm)"}`
      : "Collection from the kitchen";

  const dateLabel = details.requestedDate || "To be agreed";

  return [
    `New order — ${site.name}`,
    orderRef ? `Reference: ${orderRef}` : null,
    divider,
    rows,
    divider,
    `Subtotal:  ${formatPrice(totals.subtotal)}`,
    totals.deliveryFee > 0
      ? `Delivery:  ${formatPrice(totals.deliveryFee)}`
      : "Delivery:  Free",
    `TOTAL:     ${formatPrice(totals.total)}`,
    divider,
    `Name:      ${details.name}`,
    `Phone:     ${details.phone}`,
    details.email ? `Email:     ${details.email}` : null,
    `Type:      ${fulfilment}`,
    `For:       ${dateLabel}${details.requestedTime ? ` at ${details.requestedTime}` : ""}`,
    details.guests > 0 ? `Guests:    ${details.guests}` : null,
    details.occasion ? `Occasion:  ${details.occasion}` : null,
    details.notes ? `Notes:     ${details.notes}` : null,
    divider,
  ]
    .filter((row): row is string => row !== null)
    .join("\n");
}

/** Plain-text body for the `mailto:` fallback. */
export function buildEmailBody(
  lines: CartLine[],
  totals: { subtotal: number; deliveryFee: number; total: number },
  details: OrderDetails,
  orderRef?: string,
): string {
  return buildOrderMessage(lines, totals, details, orderRef).replace(
    /─/g,
    "-",
  );
}

export function whatsappOrderLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function emailOrderLink(
  message: string,
  subject: string,
): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(message)}`;
}

/** Short booking/reservation enquiry, for the contact page. */
export function buildEnquiryMessage(fields: {
  name: string;
  phone: string;
  occasion: string;
  guests: string;
  date: string;
  details: string;
}): string {
  return [
    `Enquiry — ${site.name}`,
    `Name:     ${fields.name}`,
    `Phone:    ${fields.phone}`,
    `Occasion: ${fields.occasion || "-"}`,
    `Guests:   ${fields.guests || "-"}`,
    `Date:     ${fields.date || "To be agreed"}`,
    "",
    fields.details || "",
  ].join("\n");
}
