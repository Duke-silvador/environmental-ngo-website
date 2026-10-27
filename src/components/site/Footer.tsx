import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site, siteAddressLine, whatsappLink } from "@/config/site";
import { Wordmark } from "@/components/site/Wordmark";

/**
 * lucide-react v1 removed all brand glyphs (Instagram, Facebook, ...), so the
 * social rows use the site's gold diamond motif instead. Uniform, and it keeps
 * the footer quiet rather than turning into a row of coloured icons.
 */
function SocialMark() {
  return (
    <span
      aria-hidden
      className="mt-1 h-1.5 w-1.5 shrink-0 rotate-45 border border-gold/60 transition-colors duration-500 group-hover:bg-gold"
    />
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline-soft bg-obsidian-800">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Wordmark size="md" />
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-ivory-dim">
              {site.tagline} Chef-led, cooked to order, and delivered to your
              table or yours.
            </p>

            <ul className="mt-8 space-y-3.5 text-sm">
              <li>
                <a
                  href={whatsappLink(
                    `Hello ${site.name}, I would like to ask about your menu.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-ivory-dim transition-colors duration-500 hover:text-gold"
                >
                  <Phone
                    className="h-3.5 w-3.5 shrink-0 text-gold/70"
                    strokeWidth={1.4}
                    aria-hidden
                  />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-3 text-ivory-dim transition-colors duration-500 hover:text-gold"
                >
                  <Mail
                    className="h-3.5 w-3.5 shrink-0 text-gold/70"
                    strokeWidth={1.4}
                    aria-hidden
                  />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-ivory-dim">
                <MapPin
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70"
                  strokeWidth={1.4}
                  aria-hidden
                />
                {siteAddressLine()}
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="eyebrow">Explore</h3>
            <ul className="mt-6 space-y-3.5 text-sm">
              {site.navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="sweep text-ivory-dim transition-colors duration-500 hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <h3 className="eyebrow">Hours</h3>
            <ul className="mt-6 space-y-3.5 text-sm">
              {site.hours.map((slot) => (
                <li
                  key={slot.days}
                  className="flex items-start justify-between gap-4 border-b border-hairline-soft pb-3.5"
                >
                  <span className="text-ivory-dim">{slot.days}</span>
                  <span className="shrink-0 tabular-nums text-ivory-faint">
                    {slot.time}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-3 text-xs leading-relaxed text-ivory-faint">
              <Clock
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70"
                strokeWidth={1.4}
                aria-hidden
              />
              Events and catering are booked separately, ideally 72 hours ahead.
            </p>
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <h3 className="eyebrow">Follow</h3>
            <ul className="mt-6 space-y-3.5 text-sm">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-ivory-dim transition-colors duration-500 hover:text-gold"
                  >
                    <SocialMark />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 border border-hairline-soft p-6">
              <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-gold">
                Ready when you are
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                Orders close 3 hours before each service.
              </p>
              <Link
                href="/order"
                className="sweep mt-5 inline-block text-sm text-ivory transition-colors duration-500 hover:text-gold"
              >
                Start an order
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline-soft pt-8 text-xs text-ivory-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Cooked fresh in a home kitchen.{" "}
            <span className="text-gold/60">Please tell us about allergies.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
