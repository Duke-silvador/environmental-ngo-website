import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsMarquee } from "@/components/home/StatsMarquee";
import { AboutPreview } from "@/components/home/AboutPreview";
import { MenuTeaser } from "@/components/home/MenuTeaser";
import { Specials } from "@/components/home/Specials";
import { EventsSection } from "@/components/home/EventsSection";
import { ChefSection } from "@/components/home/ChefSection";
import { Gallery } from "@/components/home/Gallery";
import { Testimonials } from "@/components/home/Testimonials";
import { StoryPreview } from "@/components/home/StoryPreview";
import { CtaBand } from "@/components/home/CtaBand";

export const metadata: Metadata = {
  // The home page is the canonical target for the brand name.
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsMarquee />
      <AboutPreview />
      <MenuTeaser />
      <Specials />
      <EventsSection />
      <ChefSection />
      <Gallery />
      <Testimonials />
      <StoryPreview />
      <CtaBand />
    </>
  );
}
