"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/config/site";

/** The persistent WhatsApp button. Appears after a short scroll. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(
        `Hello ${site.name}, I would like to place an order.`,
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      className={`group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center border border-gold/40 bg-surface/95 text-gold shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur transition-all duration-600 [transition-timing-function:var(--ease-luxe)] hover:border-gold hover:bg-gold hover:text-obsidian ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-0 border border-gold/40 opacity-0 transition-opacity duration-600 group-hover:opacity-100"
      />
      <MessageCircle
        className="h-5 w-5"
        strokeWidth={1.4}
        aria-hidden
      />
    </a>
  );
}
