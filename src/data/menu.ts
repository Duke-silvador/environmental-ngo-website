/**
 * THE MENU — EDIT THIS FILE.
 *
 * 19 dishes, one per photo in public/images/menu/.
 *
 * NOTE ON PHOTOS: 9 of these images were named with a single letter
 * (g, k, l, n, s, u, v, x, z) and one was called "2025-05-10awe". Nobody knew
 * what they actually show, so the names and descriptions below are
 * PLACEHOLDERS. Replace the `name` and `description` for those rows with the
 * real dishes. Everything else on the site re-renders automatically.
 *
 * Named honestly: bread-barrel, caesar, cake, greek-salad, lobster-bisque,
 * lobster-roll, mozzarella, spinach-salad, tuscan-grilled.
 */

export type MenuCategory =
  | "Starters"
  | "Salads"
  | "From the Sea"
  | "Grills"
  | "Bread & Sides"
  | "Desserts";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  /** Small uppercase tags shown under the name. */
  tags?: string[];
  /** Renders the gold "Signature" flag. */
  signature?: boolean;
  /** Ingredient/allergen notes shown in the expanded detail. */
  contains?: string;
};

export const categories: MenuCategory[] = [
  "Starters",
  "Salads",
  "From the Sea",
  "Grills",
  "Bread & Sides",
  "Desserts",
];

export const menu: MenuItem[] = [
  // ---------------------------------------------------------------- Starters
  {
    id: "lobster-bisque",
    name: "Lobster Bisque",
    description:
      "A slow-simmered velvet bisque finished with warm cognac, single cream and a whisper of nutmeg. Poured tableside.",
    price: 14,
    category: "Starters",
    image: "/images/menu/lobster-bisque.jpg",
    tags: ["Signature", "Warm"],
    signature: true,
    contains: "Shellfish, dairy, alcohol",
  },
  {
    id: "greek-salad",
    name: "Greek Village Salad",
    description:
      "Vine tomatoes, thick-cut cucumber, barrel-aged feta, kalamata olives and oregano. Drizzled only with good oil and lemon.",
    price: 11,
    category: "Starters",
    image: "/images/menu/greek-salad.jpg",
    tags: ["Vegetarian", "Cold"],
  },
  {
    id: "mozzarella",
    name: "Buffalo Mozzarella",
    description:
      "Creamy mozzarella, hand-torn basil, aged balsamic pearls and cold-pressed oil. The simplest thing done properly.",
    price: 12,
    category: "Starters",
    image: "/images/menu/mozzarella.jpg",
    tags: ["Vegetarian", "Cold"],
  },
  {
    id: "spinach-salad",
    name: "Baby Spinach & Citrus",
    description:
      "Tender spinach, shaved fennel, candied walnuts and a tight orange dressing. Finished with shaved parmesan.",
    price: 11,
    category: "Starters",
    image: "/images/menu/spinach-salad.jpg",
    tags: ["Vegetarian", "Light"],
  },

  // ------------------------------------------------------------------ Salads
  {
    id: "caesar",
    name: "Caesar, Properly Made",
    description:
      "Cos lettuce, two-day cured anchovy dressing, shaved parmesan and crisp croutons. Dressed to order, never in advance.",
    price: 13,
    category: "Salads",
    image: "/images/menu/caesar.jpg",
    tags: ["Signature"],
    signature: true,
    contains: "Fish, dairy, gluten",
  },
  {
    id: "l-placeholder-salad",
    name: "Garden Plate",
    description:
      "Placeholder dish — replace this name and description with the real one. The photo was uploaded as a single letter.",
    price: 10,
    category: "Salads",
    image: "/images/menu/l.jpg",
  },
  {
    id: "s-placeholder-salad",
    name: "Seasonal Greens",
    description:
      "Placeholder dish — replace this name and description with the real one. The photo was uploaded as a single letter.",
    price: 10,
    category: "Salads",
    image: "/images/menu/s.jpg",
  },

  // ------------------------------------------------------------- From the Sea
  {
    id: "lobster-roll",
    name: "Lobster Roll",
    description:
      "Cold-water lobster, celery, tarragon and a squeeze of lemon, tucked into a buttered split-top roll. Served with drawn butter.",
    price: 24,
    category: "From the Sea",
    image: "/images/menu/lobster-roll.jpg",
    tags: ["Signature", "House Favourite"],
    signature: true,
    contains: "Shellfish, gluten, dairy",
  },
  {
    id: "g-placeholder-sea",
    name: "Catch of the Day",
    description:
      "Placeholder dish — replace this name and description with the real one. The photo was uploaded as a single letter.",
    price: 26,
    category: "From the Sea",
    image: "/images/menu/g.jpg",
  },
  {
    id: "n-placeholder-sea",
    name: "Grilled Catch",
    description:
      "Placeholder dish — replace this name and description with the real one. The photo was uploaded as a single letter.",
    price: 23,
    category: "From the Sea",
    image: "/images/menu/n.jpg",
  },

  // ------------------------------------------------------------------ Grills
  {
    id: "tuscan-grilled",
    name: "Tuscan Grilled Fish",
    description:
      "Whole fish scored, grilled over open flame with rosemary, garlic and lemon oil. Cooked to your preference.",
    price: 28,
    category: "Grills",
    image: "/images/menu/tuscan-grilled.jpg",
    tags: ["Signature", "From the Fire"],
    signature: true,
  },
  {
    id: "u-placeholder-grill",
    name: "Charred Cut",
    description:
      "Placeholder dish — replace this name and description with the real one. The photo was uploaded as a single letter.",
    price: 25,
    category: "Grills",
    image: "/images/menu/u.jpg",
  },
  {
    id: "v-placeholder-grill",
    name: "Smoked Platter",
    description:
      "Placeholder dish — replace this name and description with the real one. The photo was uploaded as a single letter.",
    price: 27,
    category: "Grills",
    image: "/images/menu/v.jpg",
  },
  {
    id: "x-placeholder-grill",
    name: "Grilled Selection",
    description:
      "Placeholder dish — replace this name and description with the real one. The photo was uploaded as a single letter.",
    price: 22,
    category: "Grills",
    image: "/images/menu/x.jpg",
  },

  // --------------------------------------------------------- Bread & Sides
  {
    id: "bread-barrel",
    name: "Bread Barrel",
    description:
      "A hollowed sourdough loaf filled with whipped butter, herbs and sea salt. Baked to order, torn at the table.",
    price: 9,
    category: "Bread & Sides",
    image: "/images/menu/bread-barrel.jpg",
    tags: ["To Share", "Baked Daily"],
    contains: "Gluten, dairy",
  },
  {
    id: "k-placeholder-side",
    name: "House Side",
    description:
      "Placeholder dish — replace this name and description with the real one. The photo was uploaded as a single letter.",
    price: 7,
    category: "Bread & Sides",
    image: "/images/menu/k.jpg",
  },
  {
    id: "z-placeholder-side",
    name: "Market Vegetables",
    description:
      "Placeholder dish — replace this name and description with the real one. The photo was uploaded as a single letter.",
    price: 8,
    category: "Bread & Sides",
    image: "/images/menu/z.jpg",
  },

  // ---------------------------------------------------------------- Desserts
  {
    id: "cake",
    name: "Celebration Cake",
    description:
      "A single-cake dessert built for the table — layered, chilled, and finished the morning it is served. Message us for inscriptions.",
    price: 18,
    category: "Desserts",
    image: "/images/menu/cake.jpg",
    tags: ["Celebration", "Serves 6–8"],
    signature: true,
    contains: "Gluten, dairy, egg",
  },
  {
    id: "awe-placeholder-dessert",
    name: "Seasonal Sweet",
    description:
      "Placeholder dish — replace this name and description with the real one. The photo was uploaded as a date string.",
    price: 9,
    category: "Desserts",
    image: "/images/menu/2025-05-10awe.jpg",
  },
];

export function menuByCategory(category: MenuCategory): MenuItem[] {
  return menu.filter((item) => item.category === category);
}

export function signatureDishes(): MenuItem[] {
  return menu.filter((item) => item.signature);
}

/** Cheapest dish in a category, for the "from" price on category cards. */
export function priceFrom(items: MenuItem[]): number {
  if (items.length === 0) return 0;
  return Math.min(...items.map((item) => item.price));
}
