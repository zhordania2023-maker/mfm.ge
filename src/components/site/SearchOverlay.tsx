"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "@/components/ui/LocaleLink";
import { Icon } from "@/components/ui/Icon";
import { useSearch } from "@/lib/useSearch";
import { localizeHref, type Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { cn } from "@/lib/utils";

const kindStyles: Record<string, string> = {
  news: "bg-clay-100 text-ink-700",
  guideline: "bg-brand-100 text-brand-800",
  event: "bg-sky-100 text-ink-700",
  specialist: "bg-lilac-200 text-ink-800",
  course: "bg-brand-50 text-brand-700",
  case: "bg-cream-300 text-ink-700",
  question: "bg-cream-300 text-ink-700",
  page: "bg-cream-300 text-ink-600",
};

export function SearchOverlay({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const dict = t(locale);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [lastQuery, setLastQuery] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { results, loading } = useSearch(locale, query, 8);

  if (query !== lastQuery) {
    setLastQuery(query);
    setActive(0);
  }

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 60);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  function go(href: string) {
    router.push(localizeHref(href, locale));
    onClose();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") return onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const target = results[active];
      if (target) go(target.href);
      else if (query.trim()) go(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[90] animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={dict.search.overlayTitle}
    >
      <button
        className="absolute inset-0 h-full w-full cursor-default bg-ink-900/35 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label={dict.common.close}
        tabIndex={-1}
      />
      <div className="relative mx-auto mt-[8vh] w-[min(46rem,calc(100%-2rem))]">
        <div className="overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-menu)]">
          <div className="flex items-center gap-3 border-b border-line px-5">
            <Icon name="search" size={20} className="text-ink-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={dict.search.placeholder}
              className="w-full bg-transparent py-5 text-base text-ink-900 outline-none placeholder:text-ink-400"
              aria-label={dict.common.search}
              autoComplete="off"
            />
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-ink-500 transition hover:bg-cream-200 hover:text-ink-800"
              aria-label={dict.common.close}
            >
              <Icon name="close" size={18} />
            </button>
          </div>

          {query.trim().length < 2 ? (
            <div className="px-5 py-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                {dict.search.popular}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {dict.search.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="badge bg-cream-200 text-ink-700 transition hover:bg-brand-100 hover:text-brand-800"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : loading && results.length === 0 ? (
            <div className="space-y-3 px-5 py-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-12 animate-pulse rounded-xl bg-cream-200" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-ink-600">{dict.search.noResults(query)}</p>
              <p className="mt-1 text-xs text-ink-400">{dict.search.noResultsHint}</p>
            </div>
          ) : (
            <ul className="max-h-[52vh] overflow-y-auto py-2">
              {results.map((r, i) => (
                <li key={r.id}>
                  <Link
                    href={r.href}
                    onClick={onClose}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "flex items-start gap-3 px-5 py-3 transition",
                      i === active ? "bg-cream-200" : "hover:bg-cream-100",
                    )}
                  >
                    <span
                      className={cn(
                        "badge mt-0.5 shrink-0",
                        kindStyles[r.kind] ?? "bg-cream-300 text-ink-700",
                      )}
                    >
                      {dict.search.kinds[r.kind]}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-ink-900">
                        {r.title}
                      </span>
                      <span className="clamp-2 mt-0.5 block text-xs leading-relaxed text-ink-500">
                        {r.description}
                      </span>
                    </span>
                    <Icon
                      name="arrow-right"
                      size={16}
                      className="ml-auto mt-1 shrink-0 text-ink-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {query.trim().length >= 2 && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="flex items-center justify-between border-t border-line bg-cream-100 px-5 py-3.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
            >
              {dict.search.viewAllResults}
              <Icon name="arrow-right" size={16} />
            </Link>
          )}
        </div>

        <p className="mt-3 text-center text-xs text-white/80">{dict.search.hint}</p>
      </div>
    </div>
  );
}
