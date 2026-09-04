"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "@/components/ui/LocaleLink";
import { Icon } from "@/components/ui/Icon";
import { useSearch } from "@/lib/useSearch";
import type { SearchKind } from "@/lib/search";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { SearchField, ChipGroup, ResultCount, EmptyState } from "@/components/ui/Filters";

const kindOrder: SearchKind[] = [
  "news",
  "guideline",
  "event",
  "specialist",
  "course",
  "case",
  "question",
  "page",
];

export function SearchClient({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [kind, setKind] = useState<string | null>(null);

  const { results: all, loading } = useSearch(locale, query, 100);

  // URL-ის სინქრონიზაცია (ისტორიის დაბინძურების გარეშე)
  useEffect(() => {
    const timer = setTimeout(() => {
      const next = query.trim()
        ? `/${locale}/search?q=${encodeURIComponent(query.trim())}`
        : `/${locale}/search`;
      router.replace(next, { scroll: false });
    }, 400);
    return () => clearTimeout(timer);
  }, [query, router, locale]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of all) m.set(r.kind, (m.get(r.kind) ?? 0) + 1);
    return m;
  }, [all]);

  const labelFor = (k: string) => `${dict.search.kinds[k]} (${counts.get(k) ?? 0})`;
  const availableKinds = kindOrder.filter((k) => (counts.get(k) ?? 0) > 0).map(labelFor);

  const results = kind ? all.filter((r) => labelFor(r.kind) === kind) : all;

  return (
    <div>
      <SearchField
        locale={locale}
        value={query}
        onChange={setQuery}
        placeholder={dict.filters.searchSite}
        className="max-w-2xl"
      />

      {query.trim().length < 2 ? (
        <p className="mt-8 text-sm text-ink-500">{dict.search.minChars}</p>
      ) : loading && all.length === 0 ? (
        <div className="mt-8 space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-cream-200" />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <ChipGroup
              options={availableKinds}
              value={kind}
              onChange={setKind}
              allLabel={`${dict.filters.all} (${all.length})`}
            />
            <ResultCount locale={locale} n={results.length} word={dict.search.words.result} />
          </div>

          {results.length === 0 ? (
            <div className="mt-8">
              <EmptyState
                locale={locale}
                title={dict.search.noResults(query)}
                text={dict.search.noResultsHint}
                onReset={() => {
                  setQuery("");
                  setKind(null);
                }}
              />
            </div>
          ) : (
            <ul className="mt-7 space-y-3">
              {results.map((r) => (
                <li key={r.id}>
                  <Link href={r.href} className="card card-hover group block p-5">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="badge bg-brand-100 text-brand-800">
                        {dict.search.kinds[r.kind]}
                      </span>
                      {r.meta && <span className="text-xs text-ink-500">{r.meta}</span>}
                    </span>
                    <span className="mt-2 block text-[1.0625rem] font-semibold leading-snug text-ink-900 transition group-hover:text-brand-800">
                      {r.title}
                    </span>
                    <span className="clamp-2 mt-1.5 block text-[0.875rem] leading-relaxed text-ink-600">
                      {r.description}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      {dict.common.open}
                      <Icon
                        name="arrow-right"
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
