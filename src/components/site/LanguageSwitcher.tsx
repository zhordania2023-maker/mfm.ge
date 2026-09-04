"use client";

import { useRouter, usePathname } from "next/navigation";
import { locales, localeNames, localeFromPathname, stripLocale, type Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { cn } from "@/lib/utils";

/** არჩეული ენა ინახება cookie-ში, რომ შემდეგ ვიზიტზეც შენარჩუნდეს */
function rememberLocale(locale: Locale) {
  document.cookie = `lang=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const active = localeFromPathname(pathname);
  const dict = t(active);

  function switchTo(next: Locale) {
    if (next === active) return;
    rememberLocale(next);
    const rest = stripLocale(pathname);
    // query string ვიღებთ პირდაპირ — useSearchParams-ს Suspense სჭირდება
    const query = window.location.search;
    // scroll: false — გვერდი ადგილზე რჩება, არ ხტება ზემოთ/ქვემოთ
    router.push(`/${next}${rest === "/" ? "" : rest}${query}`, { scroll: false });
  }

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-line-strong bg-white p-0.5",
        compact ? "text-[0.6875rem]" : "text-xs",
      )}
      role="group"
      aria-label={dict.common.languageGroup}
    >
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-pressed={active === l}
          lang={localeNames[l].html}
          title={localeNames[l].native}
          className={cn(
            "rounded-full px-2.5 py-1 font-semibold transition",
            active === l ? "bg-brand-700 text-white" : "text-ink-500 hover:text-brand-800",
          )}
        >
          {localeNames[l].short}
        </button>
      ))}
    </div>
  );
}
