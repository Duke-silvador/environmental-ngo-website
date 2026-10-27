/**
 * THE FILE YOU EDIT.
 *
 * Everything brand, contact and social related lives here. Change the values
 * below and the whole site updates: header, footer, contact page, floating
 * WhatsApp button, the order handoff message, and the SEO/JSON-LD data.
 */

export const site = {
  /** Short name, used in the header lockup and as the JSON-LD brand. */
  name: "MAISON ARDEN",

  /** One-word descriptor shown beside the name. */
  suffix: "Private Dining",

  /** Your name — drives "by <chefName>", about page, and testimonials framing. */
  chefName: "Chef Arden",

  /** The single line under the hero heading. */
  tagline: "Elevated home cuisine, made for your occasion.",

  /** Longer description used for SEO and the JSON-LD description. */
  description:
    "Chef-led private dining from a home kitchen. Seasonal tasting plates, seafood cooked to order, and full occasion catering delivered to your table.",

  /** Used in the hero eyebrow and as the default page title suffix. */
  eyebrow: "Private Kitchen · Est. 2016",

  /**
   * International format, digits only, no + or spaces.
   * Set this to your real number or the WhatsApp buttons go nowhere.
   */
  whatsapp: "255700000000",

  /** Display version of the phone number shown to visitors. */
  phone: "+255 700 000 000",

  email: "orders@maisonarden.com",

  address: {
    line1: "12 Ocean Road",
    line2: "Kizingo",
    city: "Dar es Salaam",
    region: "Dar es Salaam",
    postalCode: "14108",
    country: "TZ",
  },

  hours: [
    { days: "Monday – Thursday", time: "10:00 – 22:00" },
    { days: "Friday – Saturday", time: "10:00 – 23:30" },
    { days: "Sunday", time: "12:00 – 21:00" },
  ],

  /** Currency symbol used by every price on the site. */
  currency: "$",

  /** Delivery fee shown at checkout, and the free-delivery threshold. */
  deliveryFee: 5,
  freeDeliveryOver: 150,

  /** Minimum spend for a full catering order. */
  cateringMinimum: 350,

  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],

  navigation: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Our Story", href: "/about" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "My Orders", href: "/history" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;

/** Full street address on one line, for the footer and contact card. */
export function siteAddressLine(): string {
  const { line1, line2, city, postalCode } = site.address;
  return `${line1}, ${line2}, ${city} ${postalCode}`;
}

/** wa.me deep link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function telLink(): string {
  return `tel:${site.phone.replace(/[^+\d]/g, "")}`;
}
