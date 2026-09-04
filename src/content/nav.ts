/**
 * მხოლოდ ნავიგაციის მონაცემები — კლიენტის მხარეს (Header, MobileNav)
 * რომ არ ჩაიტვირთოს მთელი კონტენტ-პაკეტი.
 */
import type { Locale } from "@/i18n/config";
import { mainNav as kaMain, footerNav as kaFooter } from "./ka/nav";
import { mainNav as enMain, footerNav as enFooter } from "./en/nav";

const byLocale = {
  ka: { mainNav: kaMain, footerNav: kaFooter },
  en: { mainNav: enMain, footerNav: enFooter },
};

export function navFor(locale: Locale) {
  return byLocale[locale] ?? byLocale.ka;
}
