import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export type LocaleParams = { params: Promise<{ locale: string }> };
export type SlugParams = { params: Promise<{ locale: string; slug: string }> };

/** მარშრუტის პარამეტრიდან ვალიდური ენის მიღება */
export async function getLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : defaultLocale;
}

/** ორენოვანი ობიექტიდან მიმდინარე ენის არჩევა */
export function pick<T>(copy: Record<Locale, T>, locale: Locale): T {
  return copy[locale] ?? copy[defaultLocale];
}
