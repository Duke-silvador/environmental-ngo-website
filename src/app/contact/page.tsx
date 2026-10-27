import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site, siteAddressLine, whatsappLink } from "@/config/site";
import { events } from "@/data/events";
import { formatPrice } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { EnquiryForm } from "@/components/contact/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Book the kitchen for a private dinner, a birthday or a corporate table. Reach ${site.name} on WhatsApp, phone or email in ${site.address.city}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
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
          <p className="eyebrow">Get in Touch</p>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] text-ivory sm:text-6xl lg:text-8xl">
            Tell me what you are{" "}
            <span className="text-luxe italic">planning</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ivory-dim sm:text-lg">
            A birthday, a proposal, an office dinner, or just dinner tonight.
            Fill in the form and we will come back with the menu, the price and
            the time — usually within the hour.
          </p>
        </div>
      </header>

      {/* Contact cards + form */}
      <section className="pb-28 lg:pb-36">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          {/* Details */}
          <Reveal className="lg:col-span-5">
            <div className="space-y-px">
              <a
                href={whatsappLink(
                  `Hello ${site.name}, I would like to talk about an event.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="card-luxe group flex items-start gap-5 p-7"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-hairline text-gold">
                  <Phone className="h-4 w-4" strokeWidth={1.3} aria-hidden />
                </span>
                <div>
                  <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
                    WhatsApp · fastest
                  </p>
                  <p className="mt-2.5 text-lg text-ivory transition-colors duration-500 group-hover:text-gold-light">
                    {site.phone}
                  </p>
                  <p className="mt-2 text-xs text-ivory-faint">
                    Messages answered within the hour, daily.
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${site.email}`}
                className="card-luxe group flex items-start gap-5 p-7"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-hairline text-gold">
                  <Mail className="h-4 w-4" strokeWidth={1.3} aria-hidden />
                </span>
                <div>
                  <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
                    Email
                  </p>
                  <p className="mt-2.5 text-lg text-ivory transition-colors duration-500 group-hover:text-gold-light">
                    {site.email}
                  </p>
                  <p className="mt-2 text-xs text-ivory-faint">
                    Best for larger bookings and invoices.
                  </p>
                </div>
              </a>

              <div className="card-luxe flex items-start gap-5 p-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-hairline text-gold">
                  <MapPin className="h-4 w-4" strokeWidth={1.3} aria-hidden />
                </span>
                <div>
                  <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
                    The Kitchen
                  </p>
                  <p className="mt-2.5 text-lg leading-relaxed text-ivory">
                    {siteAddressLine()}
                  </p>
                  <p className="mt-2 text-xs text-ivory-faint">
                    Collection by arrangement. Delivery across {site.address.city}.
                  </p>
                </div>
              </div>

              <div className="card-luxe flex items-start gap-5 p-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-hairline text-gold">
                  <Clock className="h-4 w-4" strokeWidth={1.3} aria-hidden />
                </span>
                <div className="flex-1">
                  <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
                    Hours
                  </p>
                  <ul className="mt-3 space-y-2">
                    {site.hours.map((slot) => (
                      <li
                        key={slot.days}
                        className="flex items-baseline justify-between gap-6 text-sm"
                      >
                        <span className="text-ivory-dim">{slot.days}</span>
                        <span className="shrink-0 tabular-nums text-ivory-faint">
                          {slot.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Catering minimum nudge */}
            <div className="mt-8 border border-hairline-soft p-7">
              <p className="text-[0.625rem] uppercase tracking-[0.2em] text-gold">
                Good to know
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ivory-dim">
                Event bookings start at{" "}
                <span className="text-gold-light">
                  {formatPrice(site.cateringMinimum)}
                </span>{" "}
                in total. Orders for delivery close three hours before each
                service. Please mention any allergies in your message — we cook
                to order, so it is genuinely handled.
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-7" delay={0.12}>
            <div className="border border-hairline-soft bg-surface p-8 sm:p-10">
              <p className="eyebrow">Enquiry Form</p>
              <h2 className="mt-5 text-3xl text-ivory sm:text-4xl">
                Book the kitchen
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ivory-dim">
                Nothing is charged or sent from this page. We write the enquiry
                out for you to send.
              </p>

              <div className="mt-10">
                <EnquiryForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Event packages recap */}
      <section className="border-t border-hairline-soft bg-obsidian-800 py-28 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow text-center">What we book</p>
            <h2 className="mx-auto mt-6 max-w-3xl text-center text-4xl leading-tight text-ivory sm:text-5xl">
              Three ways we cook for a{" "}
              <span className="text-luxe italic">room</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {events.map((event) => (
              <Reveal key={event.id} delay={0.08}>
                <article className="card-luxe h-full p-8">
                  <p className="text-[0.5625rem] uppercase tracking-[0.2em] text-gold/70">
                    {event.tagline}
                  </p>
                  <h3 className="mt-4 font-display text-2xl text-ivory">
                    {event.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ivory-dim">
                    {event.body}
                  </p>
                  <p className="mt-7 border-t border-hairline-soft pt-5 font-display text-xl text-gold-light">
                    From {formatPrice(event.from)}{" "}
                    <span className="text-xs text-ivory-faint">/ guest</span>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
