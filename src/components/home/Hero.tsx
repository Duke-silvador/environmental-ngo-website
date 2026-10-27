"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { site } from "@/config/site";
import { formatPrice } from "@/lib/format";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { className: "" }
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, ease: EASE, delay },
        };

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={75}
          className={
            reduce
              ? "object-cover object-center"
              : "animate-kenburns object-cover object-center"
          }
        />
      </div>

      {/* Scrims: left for text legibility, bottom for the fold */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/25"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent"
      />
      <div aria-hidden className="vignette absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 pt-40 lg:px-10 lg:pb-32">
        <div className="max-w-3xl">
          <motion.p
            {...rise(0.15)}
            className="eyebrow flex items-center gap-4"
          >
            <span className="h-px w-10 bg-gold/60" aria-hidden />
            Private Kitchen · Est. 2016
          </motion.p>

          <motion.h1
            {...rise(0.3)}
            className="mt-8 text-5xl leading-[0.98] text-ivory sm:text-6xl lg:text-8xl"
          >
            Cooked for the{" "}
            <span className="text-luxe italic">moment</span> you called
          </motion.h1>

          <motion.p
            {...rise(0.45)}
            className="mt-8 max-w-xl text-base leading-relaxed text-ivory-dim sm:text-lg"
          >
            One chef, one home kitchen, and a menu built around what is best
            that week. Order for tonight, or book the table for something you
            will be talking about for years.
          </motion.p>

          <motion.div
            {...rise(0.6)}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#order"
              className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden border border-gold bg-gold px-9 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-obsidian transition-colors duration-500 hover:bg-gold-light hover:border-gold-light"
            >
              <span className="relative z-10">Start an Order</span>
            </a>

            <a
              href="/menu"
              className="inline-flex h-14 items-center justify-center gap-3 border border-hairline px-9 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:border-gold hover:text-gold-light"
            >
              See the Menu
            </a>
          </motion.div>

          <motion.p
            {...rise(0.75)}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.6875rem] uppercase tracking-[0.18em] text-ivory-faint"
          >
            <span>Delivery {formatPrice(site.deliveryFee)}</span>
            <span className="hidden h-3 w-px bg-hairline sm:block" aria-hidden />
            <span>Free over {formatPrice(site.freeDeliveryOver)}</span>
            <span className="hidden h-3 w-px bg-hairline sm:block" aria-hidden />
            <span>Orders close 3h before service</span>
          </motion.p>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#intro"
        aria-label="Scroll to content"
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1.4, duration: 1 },
            })}
        className="absolute bottom-8 right-6 z-10 hidden h-12 w-12 items-center justify-center border border-hairline-soft text-ivory-dim transition-colors duration-500 hover:border-gold hover:text-gold lg:flex"
      >
        <ChevronDown
          className="h-4 w-4 animate-bounce"
          strokeWidth={1.4}
          aria-hidden
        />
      </motion.a>
    </section>
  );
}
