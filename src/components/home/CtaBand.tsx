import Image from "next/image";
import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink } from "@/config/site";

/** The closing full-bleed call to action, id="order" is the hero's target. */
export function CtaBand() {
  return (
    <section id="order" className="relative scroll-mt-24">
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/events/events-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-obsidian/78 backdrop-blur-[2px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian"
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 py-32 lg:px-10 lg:py-44">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Let&apos;s Cook</p>

          <h2 className="mt-7 text-4xl leading-[1.05] text-ivory sm:text-5xl lg:text-7xl">
            Tell me the occasion.{" "}
            <span className="text-luxe italic">I&apos;ll handle the rest.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ivory-dim sm:text-lg">
            Send your order or booking as a message. You will get a reply
            confirming the menu, the price and the time — usually within the
            hour.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="/order" variant="solid" size="lg">
              Start an Order
            </ButtonLink>
            <ButtonLink
              href={whatsappLink(
                `Hello ${site.name}, I would like to talk about an event.`,
              )}
              variant="outline"
              size="lg"
            >
              Message on WhatsApp
            </ButtonLink>
          </div>

          <p className="mt-10 text-[0.6875rem] uppercase tracking-[0.2em] text-ivory-faint">
            {site.phone} · {site.email}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
