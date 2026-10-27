import type { MetadataRoute } from "next";

const ORIGIN = "https://maisonarden.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: {
    path: string;
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/menu", changeFrequency: "weekly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/order", changeFrequency: "yearly", priority: 0.7 },
    // /history is deliberately absent: it is per-device customer data, marked
    // noindex and disallowed in robots.ts, so it must not be advertised here.
  ];

  return routes.map((route) => ({
    url: `${ORIGIN}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
