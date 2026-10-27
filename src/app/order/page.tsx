import type { Metadata } from "next";
import { OrderCheckout } from "@/components/order/OrderCheckout";
import { Ornament } from "@/components/ui/Reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Order",
  description: `Check out and send your order to ${site.name} on WhatsApp. No payment is taken on this site — you confirm with us directly.`,
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <>
      <header className="relative overflow-hidden pb-16 pt-36 lg:pb-20 lg:pt-44">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-obsidian-800 via-obsidian to-obsidian"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="eyebrow">Checkout</p>
          <h1 className="mt-6 text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
            Send it <span className="text-luxe italic">straight to me</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-ivory-dim sm:text-lg">
            There is no payment on this site. Your order is written out and
            handed to WhatsApp, and we reply to confirm the price and the time
            before anything is cooked.
          </p>
          <Ornament className="mt-12 max-w-md !justify-start" />
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 pb-32 lg:px-10">
        <OrderCheckout />
      </div>
    </>
  );
}
