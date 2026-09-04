/**
 * მხოლოდ საიტის ძირითადი მონაცემები — კლიენტის კომპონენტებისთვის,
 * რომ სრული კონტენტ-პაკეტი არ ჩაიტვირთოს ბრაუზერში.
 */
import type { Locale } from "@/i18n/config";
import { site as kaSite } from "./ka/site";
import { site as enSite } from "./en/site";

const byLocale = { ka: kaSite, en: enSite };

export function siteFor(locale: Locale) {
  return byLocale[locale] ?? byLocale.ka;
}
