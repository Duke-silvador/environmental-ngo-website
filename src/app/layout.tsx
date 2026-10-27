import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

import { site, siteAddressLine, whatsappLink } from "@/config/site";
import { menu } from "@/data/menu";
import { Providers } from "@/components/site/Providers";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Public origin, used for canonical URLs and JSON-LD. */
const ORIGIN = "https://maisonarden.com";

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "private dining",
    "personal chef",
    "home cook",
    "catering",
    "seafood",
    "chef near me",
    "birthday catering",
    "order food",
  ],
  authors: [{ name: site.chefName }],
  creator: site.chefName,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: ORIGIN,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/images/hero/hero-bg.jpg",
        width: 1600,
        height: 900,
        alt: `${site.name} private dining`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/images/hero/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

/** Restaurant structured data, so search engines can find the business. */
function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: site.description,
    url: ORIGIN,
    telephone: site.phone,
    email: site.email,
    image: `${ORIGIN}/images/hero/hero-bg.jpg`,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Mobile Money, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "10:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "10:00",
        closes: "23:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "12:00",
        closes: "21:00",
      },
    ],
    sameAs: site.socials.map((social) => social.href),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone,
        contactType: "reservations",
        areaServed: site.address.city,
        availableLanguage: ["English", "Swahili"],
      },
    ],
    hasMenu: {
      "@type": "Menu",
      name: `${site.name} Menu`,
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Signature",
          hasMenuItem: menu
            .filter((item) => item.signature)
            .map((item) => ({
              "@type": "MenuItem",
              name: item.name,
              description: item.description,
              image: `${ORIGIN}${item.image}`,
              offers: {
                "@type": "Offer",
                price: item.price,
                priceCurrency: "USD",
              },
            })),
        },
      ],
    },
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: whatsappLink("New order — {name}"),
      },
      deliveryMethod: [
        "https://schema.org/OnSitePickup",
        "https://schema.org/OnSiteDelivery",
      ],
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="grain flex min-h-full flex-col bg-obsidian">
        <script
          type="application/ld+json"
          // JSON.stringify output with `<` escaped to prevent XSS injection.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c"),
          }}
        />

        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[80] focus:border focus:border-gold focus:bg-obsidian focus:px-5 focus:py-3 focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-gold"
          >
            Skip to content
          </a>

          <Header />

          <main id="main" className="flex-1">
            {children}
          </main>

          <Footer />

          {/* Needs the cart context, so it must sit inside <Providers>. */}
          <CartDrawer />
        </Providers>

        <FloatingWhatsApp />

        <span className="sr-only">
          {siteAddressLine()} — {site.name}
        </span>
      </body>
    </html>
  );
}
