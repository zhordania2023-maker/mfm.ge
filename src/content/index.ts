import type { Locale } from "@/i18n/config";
import type { ContentBundle, Guideline, MfmEvent, NewsItem } from "./types";
import { ka } from "./ka";
import { en } from "./en";

export * from "./types";

const bundles: Record<Locale, ContentBundle> = { ka, en };

/** ერთი ენის სრული კონტენტი */
export function content(locale: Locale): ContentBundle {
  return bundles[locale] ?? ka;
}

/* ------------------------------------------------------------------ */
/*  წარმოებული ამომრჩევები — ენისგან დამოუკიდებელი ლოგიკა             */
/* ------------------------------------------------------------------ */

export const sortedNews = (c: ContentBundle): NewsItem[] =>
  [...c.news].sort((a, b) => b.date.localeCompare(a.date));

export const featuredNews = (c: ContentBundle): NewsItem[] =>
  sortedNews(c).filter((n) => n.featured);

export const getNews = (c: ContentBundle, slug: string) =>
  c.news.find((n) => n.slug === slug);

export const sortedEvents = (c: ContentBundle): MfmEvent[] =>
  [...c.events].sort((a, b) => a.start.localeCompare(b.start));

export const getEvent = (c: ContentBundle, slug: string) =>
  c.events.find((e) => e.slug === slug);

export { isUpcoming } from "@/lib/utils";

export const sortedGuidelines = (c: ContentBundle): Guideline[] =>
  [...c.guidelines].sort((a, b) => b.updated.localeCompare(a.updated));

export const getGuideline = (c: ContentBundle, slug: string) =>
  c.guidelines.find((g) => g.slug === slug);

export const guidelineYears = (c: ContentBundle) =>
  Array.from(new Set(c.guidelines.map((g) => g.year))).sort((a, b) => b - a);

export const getCase = (c: ContentBundle, slug: string) =>
  c.cases.find((x) => x.slug === slug);

export const getCourse = (c: ContentBundle, slug: string) =>
  c.courses.find((x) => x.slug === slug);

/** სლაგები ორივე ენაში ერთნაირია — generateStaticParams-ისთვის */
export const allNewsSlugs = ka.news.map((n) => n.slug);
export const allEventSlugs = ka.events.map((e) => e.slug);
export const allGuidelineSlugs = ka.guidelines.map((g) => g.slug);
