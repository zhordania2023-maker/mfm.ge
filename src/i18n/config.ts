export const locales = ["ka", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ka";

export const localeNames: Record<Locale, { native: string; short: string; html: string }> = {
  ka: { native: "ქართული", short: "ქარ", html: "ka" },
  en: { native: "English", short: "ENG", html: "en" },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** მისამართიდან ენის ამოცნობა: /en/news → "en" */
export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split("/")[1];
  return isLocale(first) ? first : defaultLocale;
}

/** მისამართიდან ენის პრეფიქსის მოცილება: /en/news → /news */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) {
    const rest = "/" + parts.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname;
}

/** შიდა ბმულს ენის პრეფიქსს ვამატებთ; გარე/mailto/tel/# უცვლელი რჩება */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href; // http(s), mailto:, tel:, #anchor
  if (href.startsWith("//")) return href;
  const stripped = stripLocale(href);
  return stripped === "/" ? `/${locale}` : `/${locale}${stripped}`;
}
