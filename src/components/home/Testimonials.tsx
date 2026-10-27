"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const INTERVAL = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (direction: 1 | -1) =>
    setIndex(
      (current) =>
        (current + direction + testimonials.length) % testimonials.length,
    );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => go(1), INTERVAL);
    return () => clearInterval(timer);
  }, [paused]);

  const active = testimonials[index];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-y border-hairline-soft bg-obsidian-800 py-28 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <Quote
          className="h-40 w-40 text-ivory/[0.02] sm:h-64 sm:w-64"
          strokeWidth={0.5}
          aria-hidden
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title={
              <>
                What guests say{" "}
                <span className="text-luxe italic">afterwards</span>
              </>
            }
            lede="Collected from guests after booking. Names shortened, words unedited."
          />
        </Reveal>

        <div
          className="relative mx-auto mt-20 max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Fixed-height stage so the layout never jumps between quotes */}
          <div className="relative min-h-[440px] sm:min-h-[400px]">
            {testimonials.map((testimonial, slide) => {
              const isActive = slide === index;
              return (
                <figure
                  key={testimonial.id}
                  aria-hidden={!isActive}
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 [transition-timing-function:var(--ease-luxe)]",
                    isActive
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-6 opacity-0",
                  )}
                >
                  {/* Stars */}
                  <div className="flex gap-2">
                    {Array.from({ length: testimonial.rating }).map(
                      (_, star) => (
                        <Star
                          key={star}
                          className="h-3.5 w-3.5 fill-gold text-gold"
                          aria-hidden
                        />
                      ),
                    )}
                  </div>

                  <blockquote className="mt-10 font-display text-2xl leading-[1.35] text-ivory sm:text-3xl lg:text-4xl">
                    “{testimonial.quote}”
                  </blockquote>

                  <figcaption className="mt-12 flex items-center gap-5">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-hairline">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-ivory">{testimonial.name}</p>
                      <p className="mt-1.5 text-[0.5625rem] uppercase tracking-[0.22em] text-gold">
                        {testimonial.occasion}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-8">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center border border-hairline-soft text-ivory transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.4} aria-hidden />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {testimonials.map((testimonial, dot) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setIndex(dot)}
                  aria-label={`Show testimonial ${dot + 1}`}
                  aria-current={dot === index}
                  className="group flex h-6 w-6 items-center justify-center"
                >
                  <span
                    className={cn(
                      "block h-1.5 transition-all duration-500 [transition-timing-function:var(--ease-luxe)]",
                      dot === index
                        ? "w-7 bg-gold"
                        : "w-1.5 bg-ivory-faint/50 group-hover:bg-ivory-dim",
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center border border-hairline-soft text-ivory transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.4} aria-hidden />
            </button>
          </div>

          <p className="sr-only" aria-live="polite">
            Testimonial {index + 1} of {testimonials.length}: {active.name}
          </p>
        </div>
      </div>
    </section>
  );
}
