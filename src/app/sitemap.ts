import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/utils/urls";
import { calculators } from "@/lib/calculators/registry";
import { guides } from "@/lib/guides/registry";

const SITE_LAUNCHED = new Date("2026-04-15");
const LAST_CONTENT_UPDATE = new Date("2026-04-17");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: SITE_LAUNCHED,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: SITE_LAUNCHED,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const calculatorPages: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${baseUrl}/${calc.slug}`,
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...calculatorPages, ...guidePages];
}
