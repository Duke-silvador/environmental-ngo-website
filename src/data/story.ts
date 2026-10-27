/**
 * THE STORY — EDIT THIS FILE.
 *
 * The chef's history timeline, achievements, kitchen values and the headline
 * numbers. All placeholder content — swap in your real milestones.
 */

export type Milestone = {
  year: string;
  title: string;
  body: string;
};

export const timeline: Milestone[] = [
  {
    year: "2016",
    title: "A kitchen with four burners",
    body: "Started cooking for friends out of a small home kitchen, taking orders by word of mouth only. The menu was twelve dishes and it never changed.",
  },
  {
    year: "2018",
    title: "The first catering order",
    body: "A family asked for a birthday dinner to be delivered. It turned into a standing monthly booking, and word of mouth did the rest of the work.",
  },
  {
    year: "2020",
    title: "Learning to cook around scarcity",
    body: "Supply chains broke and the good fish disappeared. Rather than lower the standard, the kitchen rebuilt the menu around what was genuinely available and honest about it.",
  },
  {
    year: "2022",
    title: "A permanent private dining room",
    body: "Converted the front room into a six-seat dining space. Bookings opened and have been full most weeks since.",
  },
  {
    year: "2024",
    title: "Full occasion catering",
    body: "Added staffed event service for birthdays, proposals and corporate tables, with the same menu and the same chef on every single booking.",
  },
  {
    year: "Today",
    title: "Still one chef, still one kitchen",
    body: "Everything is cooked to order by hand. Nothing is bought in finished, nothing is frozen, and the same chef who takes your order plates it.",
  },
];

export type Achievement = {
  id: string;
  year: string;
  award: string;
  detail: string;
  /** Renders the gold seal. */
  featured?: boolean;
};

export const achievements: Achievement[] = [
  {
    id: "a1",
    year: "2024",
    award: "Table of the Year",
    detail: "Voted private dining chef of the year in the city food awards.",
    featured: true,
  },
  {
    id: "a2",
    year: "2024",
    award: "5.0 Average",
    detail: "Across 400+ reviews, with 98% saying they would book again.",
    featured: true,
  },
  {
    id: "a3",
    year: "2023",
    award: "Seafood Excellence",
    detail: "Regional recognition for technique with fresh local catch.",
  },
  {
    id: "a4",
    year: "2022",
    award: "Best Private Room",
    detail: "Reader's choice for intimate dining spaces.",
  },
  {
    id: "a5",
    year: "2021",
    award: "Zero Food Waste",
    detail: "Certificate of recognition for a full-year zero-waste kitchen.",
  },
  {
    id: "a6",
    year: "2019",
    award: "Rising Chef",
    detail: "Shortlisted in the national young chef programme.",
  },
];

export type Stat = {
  value: string;
  label: string;
  detail?: string;
};

/** The headline numbers on the home page and about page. */
export const stats: Stat[] = [
  { value: "10", label: "Years cooking", detail: "One kitchen, one chef" },
  { value: "3,000+", label: "Meals served", detail: "Since 2016" },
  { value: "400+", label: "Guest reviews", detail: "5.0 average rating" },
  { value: "100%", label: "Cooked to order", detail: "Nothing pre-made" },
];

export type Value = {
  id: string;
  title: string;
  body: string;
};

export const values: Value[] = [
  {
    id: "v1",
    title: "The market decides",
    body: "The menu changes when the produce changes. What is good that week is on the card, and what is not good enough does not go on it.",
  },
  {
    id: "v2",
    title: "One pair of hands",
    body: "There is no brigade and no pass. The chef who takes your order is the chef who cooks it and the one who plates it.",
  },
  {
    id: "v3",
    title: "Nothing pre-made",
    body: "No shortcuts, no bought-in sauces, no frozen stock. Bread is baked the morning it is served, and it shows.",
  },
  {
    id: "v4",
    title: "Your occasion, properly run",
    body: "Dietary needs, timings, the cake inscription, the seating plan. It is handled quietly and confirmed back to you in writing.",
  },
];
