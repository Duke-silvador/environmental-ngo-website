import type { MetadataRoute } from "next";

const ORIGIN = "https://maisonarden.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Per-device customer history should never be indexed.
        disallow: ["/history"],
      },
    ],
    sitemap: `${ORIGIN}/sitemap.xml`,
    host: ORIGIN,
  };
}
