"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { gallery } from "@/data/gallery";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const spanClass: Record<(typeof gallery)[number]["span"], string> = {
  tall: "row-span-2 aspect-3/4",
  short: "aspect-square",
  wide: "sm:col-span-2 aspect-16/10",
};

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  const step = useCallback((direction: 1 | -1) => {
    setLightbox((current) => {
      if (current === null) return current;
      return (current + direction + gallery.length) % gallery.length;
    });
  }, []);

  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, step]);

  return (
    <section className="border-y border-hairline-soft bg-obsidian-800 py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="The Gallery"
            title={
              <>
                A look inside the <span className="text-luxe italic">kitchen</span>
              </>
            }
            lede="Eight frames from a normal week: the prep, the pass, the table, and the last order of the night."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-20">
          <ul className="grid auto-rows-auto grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map((image) => (
              <li key={image.id} className={spanClass[image.span]}>
                <button
                  type="button"
                  onClick={() => setLightbox(gallery.indexOf(image))}
                  className="media-zoom group relative block h-full w-full overflow-hidden border border-hairline-soft"
                >
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-obsidian/55 opacity-0 transition-opacity duration-600 group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-left text-[0.6875rem] uppercase tracking-[0.16em] text-ivory opacity-0 transition-all duration-600 [transition-timing-function:var(--ease-luxe)] group-hover:translate-y-0 group-hover:opacity-100">
                    {image.caption}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Lightbox */}
      <div
        className={cn(
          "fixed inset-0 z-[80] flex items-center justify-center bg-obsidian/96 p-6 backdrop-blur-md transition-opacity duration-500",
          lightbox === null
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100",
        )}
        role="dialog"
        aria-modal={lightbox !== null}
        aria-label="Gallery image"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center border border-hairline-soft text-ivory transition-colors duration-500 hover:border-gold hover:text-gold"
        >
          <X className="h-4 w-4" strokeWidth={1.4} aria-hidden />
        </button>

        {lightbox !== null ? (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center border border-hairline-soft text-ivory transition-colors duration-500 hover:border-gold hover:text-gold lg:left-10"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.4} aria-hidden />
            </button>

            <figure className="relative aspect-4/3 w-full max-w-5xl overflow-hidden border border-hairline-soft">
              <Image
                key={gallery[lightbox].src}
                src={gallery[lightbox].src}
                alt={gallery[lightbox].caption}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </figure>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center border border-hairline-soft text-ivory transition-colors duration-500 hover:border-gold hover:text-gold lg:right-10"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.4} aria-hidden />
            </button>

            <figcaption className="absolute inset-x-0 bottom-8 text-center">
              <p className="text-[0.6875rem] uppercase tracking-[0.24em] text-gold">
                {String(lightbox + 1).padStart(2, "0")} /{" "}
                {String(gallery.length).padStart(2, "0")}
              </p>
              <p className="mt-3 text-sm text-ivory-dim">
                {gallery[lightbox].caption}
              </p>
            </figcaption>
          </>
        ) : null}
      </div>
    </section>
  );
}
