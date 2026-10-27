/**
 * THE TESTIMONIALS — EDIT THIS FILE.
 *
 * 5 photos in public/images/testimonials/. The quotes and names are
 * placeholders — replace them with real reviews from real guests.
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  /** 1–5, drives the star row. */
  rating: number;
  occasion: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "testimonials-1",
    quote:
      "We had booked a table expecting an ordinary dinner and got the opposite. Every plate was explained before it landed, and the lobster was the best I have eaten outside a restaurant with a much larger budget.",
    name: "Amara N.",
    role: "Anniversary Dinner",
    image: "/images/testimonials/testimonials-1.jpg",
    rating: 5,
    occasion: "Anniversary",
  },
  {
    id: "testimonials-2",
    quote:
      "I ordered for an office dinner of fourteen and it arrived on time, still hot, in a layout that looked deliberate rather than delivered. Nobody had to chase me for a single detail.",
    name: "Daniel K.",
    role: "Corporate Catering",
    image: "/images/testimonials/testimonials-2.jpg",
    rating: 5,
    occasion: "Corporate",
  },
  {
    id: "testimonials-3",
    quote:
      "The cake had my grandmother's name spelled correctly, which sounds small and was not. That is the whole business in one detail.",
    name: "Fatuma S.",
    role: "Birthday Celebration",
    image: "/images/testimonials/testimonials-3.jpg",
    rating: 5,
    occasion: "Birthday",
  },
  {
    id: "testimonials-4",
    quote:
      "I have eaten at a lot of expensive places and this is the first time in years a meal surprised me. Booking took one message on WhatsApp. It should not have been this easy to eat this well.",
    name: "Joseph M.",
    role: "Weekly Regular",
    image: "/images/testimonials/testimonials-4.jpg",
    rating: 5,
    occasion: "Dinner",
  },
  {
    id: "testimonials-5",
    quote:
      "We came for a private dinner and left with a menu we still order from monthly. Consistent every single time, which is the part that is genuinely hard.",
    name: "Halima R.",
    role: "Private Dining",
    image: "/images/testimonials/testimonials-5.jpg",
    rating: 5,
    occasion: "Private Dining",
  },
];
