import type { MetadataRoute } from "next";
import { ka } from "@/content/ka";
import { allEventSlugs, allGuidelineSlugs, allNewsSlugs } from "@/content";
import { locales } from "@/i18n/config";

const staticRoutes = [
  "",
  "/about",
  "/about/board",
  "/about/staff",
  "/about/history",
  "/about/partners",
  "/about/disclosures",
  "/about/reports",
  "/news",
  "/events",
  "/guidelines",
  "/education",
  "/education/cases",
  "/education/fellowship",
  "/education/simulation",
  "/patients",
  "/patients/find-specialist",
  "/patients/faq",
  "/patients/high-risk",
  "/patients/resources",
  "/patients/rights",
  "/patients/support",
  "/practice/coding",
  "/practice/quality",
  "/practice/telehealth",
  "/membership",
  "/membership/join",
  "/membership/committees",
  "/research",
  "/contact",
  "/donate",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = ka.site.url;
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const alternates = (path: string) => ({
    languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])),
  });

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${base}/${locale}${route}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.7,
        alternates: alternates(route),
      });
    }

    for (const slug of allNewsSlugs) {
      entries.push({
        url: `${base}/${locale}/news/${slug}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: alternates(`/news/${slug}`),
      });
    }
    for (const slug of allEventSlugs) {
      entries.push({
        url: `${base}/${locale}/events/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: alternates(`/events/${slug}`),
      });
    }
    for (const slug of allGuidelineSlugs) {
      entries.push({
        url: `${base}/${locale}/guidelines/${slug}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.8,
        alternates: alternates(`/guidelines/${slug}`),
      });
    }
  }

  return entries;
}
