/**
 * THE SPECIALS — EDIT THIS FILE.
 *
 * 5 specials, one per photo in public/images/specials/ (specials-1..5.png).
 */

export type Special = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  /** Matches a menu item id when the special is also orderable. */
  menuId?: string;
  badge?: string;
};

export const specials: Special[] = [
  {
    id: "special-1",
    name: "The Signature Platter",
    description:
      "Everything the kitchen is known for on one board. The dish we are judged by, and the one we would order ourselves.",
    price: 46,
    image: "/images/specials/specials-1.png",
    badge: "House Signature",
    menuId: "lobster-roll",
  },
  {
    id: "special-2",
    name: "Wood-Fired Selection",
    description:
      "Cooked over open flame to order, seasoned simply, and served with the sauce it was built for.",
    price: 38,
    image: "/images/specials/specials-2.png",
    badge: "From the Fire",
    menuId: "tuscan-grilled",
  },
  {
    id: "special-3",
    name: "The Coastal Feast",
    description:
      "A generous share of the day's catch, chilled and dressed at the table. Built for two, or for the whole room.",
    price: 68,
    image: "/images/specials/specials-3.png",
    badge: "For Sharing",
  },
  {
    id: "special-4",
    name: "Chef's Tasting Menu",
    description:
      "Seven courses chosen around the market that morning. Available for dinner bookings and private events.",
    price: 85,
    image: "/images/specials/specials-4.png",
    badge: "Tasting",
  },
  {
    id: "special-5",
    name: "The Celebration Table",
    description:
      "A full occasion set: main courses, sides, salads and a cake finished with your inscription.",
    price: 120,
    image: "/images/specials/specials-5.png",
    badge: "Events",
  },
];
