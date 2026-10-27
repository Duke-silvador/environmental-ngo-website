import type { Metadata } from "next";
import { HistoryClient } from "@/components/history/HistoryClient";
import { Ornament } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "My Orders",
  description:
    "Your past orders, saved on this device. Reorder any of them in one tap.",
  alternates: { canonical: "/history" },
  // Personal, per-device data — keep it out of search results.
  robots: { index: false, follow: true },
};

export default function HistoryPage() {
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
          <p className="eyebrow">Your Account</p>
          <h1 className="mt-6 text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
            My <span className="text-luxe italic">order history</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-ivory-dim sm:text-lg">
            Everything you have ordered through this site, kept on this device.
            No account, no password — just your own basket history.
          </p>
          <Ornament className="mt-12 max-w-md !justify-start" />
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 pb-32 lg:px-10">
        <HistoryClient />
      </div>
    </>
  );
}
