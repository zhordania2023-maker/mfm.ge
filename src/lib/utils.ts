import type { Locale } from "@/i18n/config";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const months: Record<Locale, string[]> = {
  ka: [
    "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი",
    "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};

const monthsShort: Record<Locale, string[]> = {
  ka: ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d };
}

/** 18 აგვისტო, 2026 · 18 August 2026 */
export function formatDate(iso: string, locale: Locale = "ka") {
  const { y, m, d } = parts(iso);
  return locale === "ka"
    ? `${d} ${months.ka[m]}, ${y}`
    : `${d} ${months.en[m]} ${y}`;
}

/** 18 აგვ. 2026 · 18 Aug 2026 */
export function formatDateShort(iso: string, locale: Locale = "ka") {
  const { y, m, d } = parts(iso);
  return `${d} ${monthsShort[locale][m]} ${y}`;
}

/** კალენდრის ბლოკისთვის */
export function dateBlock(iso: string, locale: Locale = "ka") {
  const { m, d } = parts(iso);
  return { day: String(d), month: monthsShort[locale][m] };
}

/** 5–7 დეკემბერი, 2026 · 5–7 December 2026 */
export function formatDateRange(startIso: string, endIso?: string, locale: Locale = "ka") {
  if (!endIso || endIso === startIso) return formatDate(startIso, locale);
  const s = parts(startIso);
  const e = parts(endIso);
  const M = months[locale];
  const suffix = locale === "ka" ? `, ${s.y}` : ` ${s.y}`;
  if (s.y === e.y && s.m === e.m) return `${s.d}–${e.d} ${M[s.m]}${suffix}`;
  if (s.y === e.y) return `${s.d} ${M[s.m]} – ${e.d} ${M[e.m]}${suffix}`;
  return `${formatDate(startIso, locale)} – ${formatDate(endIso, locale)}`;
}

/** ღონისძიება ჯერ არ დასრულებულა? */
export function isUpcoming(e: { start: string; end?: string }, today = new Date()) {
  const ref = e.end ?? e.start;
  return new Date(ref + "T23:59:59").getTime() >= today.getTime();
}

/** ქართული ტექსტის ნორმალიზება ძებნისთვის */
export function normalize(text: string) {
  return text.toLowerCase().replace(/[„“”"'`.,;:!?()\[\]—–-]/g, " ").replace(/\s+/g, " ").trim();
}

/** ნორმალიზებული ტექსტის დაშლა უნიკალურ სიტყვებად */
export function tokenize(text: string) {
  return Array.from(new Set(normalize(text).split(" ").filter((w) => w.length > 1)));
}

/**
 * ქართული ბრუნვის დაბოლოებების მიახლოებითი მოცილება.
 * „პრეეკლამფსიის“ და „პრეეკლამფსია“ ერთსა და იმავე ფუძეზე უნდა დაემთხვეს,
 * ამიტომ გრძელ სიტყვას ბოლო ორ სიმბოლოს ვაცილებთ.
 */
export function stem(word: string) {
  return word.length > 6 ? word.slice(0, word.length - 2) : word;
}

/** ერთი საძიებო სიტყვა ემთხვევა თუ არა სიტყვათა სიას (ფუძის დონეზე) */
export function wordsMatch(words: string[], term: string) {
  const t = stem(term);
  return words.some(
    (w) => w.startsWith(t) || (w.length > 4 && term.startsWith(stem(w))),
  );
}

/** მოთხოვნის ყველა სიტყვა უნდა დაემთხვეს ტექსტს — ბრუნვის გათვალისწინებით */
export function matchesQuery(text: string, query: string) {
  const terms = normalize(query).split(" ").filter(Boolean);
  if (!terms.length) return true;
  const words = tokenize(text);
  return terms.every((t) => wordsMatch(words, t));
}
