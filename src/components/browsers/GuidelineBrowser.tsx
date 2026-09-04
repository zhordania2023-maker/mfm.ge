"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "@/components/ui/LocaleLink";
import type { Guideline } from "@/content/types";
import { formatDateShort, matchesQuery } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { SearchField, ChipGroup, Select, ResultCount, EmptyState } from "@/components/ui/Filters";

export function GuidelineBrowser({
  locale,
  items,
  topics,
  types,
  years,
}: {
  locale: Locale;
  items: Guideline[];
  topics: string[];
  types: string[];
  years: number[];
}) {
  const dict = t(locale);
  const params = useSearchParams();

  // ?type=protocol და ა.შ. — ინდექსით, რომ ორივე ენაზე იმუშაოს
  const typeKeys = ["guideline", "protocol", "consensus", "checklist"];
  const initialType = types[typeKeys.indexOf(params.get("type") ?? "")] ?? "";

  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const [type, setType] = useState(initialType);
  const [year, setYear] = useState("");
  const [sort, setSort] = useState<"updated" | "title">("updated");

  const filtered = useMemo(() => {
    const list = items.filter((g) => {
      if (topic && g.topic !== topic) return false;
      if (type && g.type !== type) return false;
      if (year && String(g.year) !== year) return false;
      return matchesQuery(
        [g.title, g.summary, g.code, g.topic, g.type, g.keyPoints.join(" "), g.authors].join(" "),
        query,
      );
    });

    return list.sort((a, b) =>
      sort === "updated"
        ? b.updated.localeCompare(a.updated)
        : a.title.localeCompare(b.title, locale),
    );
  }, [items, query, topic, type, year, sort, locale]);

  function reset() {
    setQuery("");
    setTopic(null);
    setType("");
    setYear("");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      {/* გვერდითი ფილტრები */}
      <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
        <div className="card space-y-5 p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
            <Icon name="filter" size={16} className="text-brand-600" />
            {dict.filters.title}
          </p>

          <Select
            label={dict.filters.documentType}
            value={type}
            onChange={setType}
            options={types}
            allLabel={dict.filters.allTypes}
          />
          <Select
            label={dict.filters.year}
            value={year}
            onChange={setYear}
            options={years.map(String)}
            allLabel={dict.filters.allYears}
          />
          <label className="block">
            <span className="field-label">{dict.filters.sort}</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "updated" | "title")}
                className="field appearance-none pr-10"
              >
                <option value="updated">{dict.filters.sortUpdated}</option>
                <option value="title">{dict.filters.sortAlpha}</option>
              </select>
              <Icon
                name="chevron-down"
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
              />
            </div>
          </label>

          <button onClick={reset} className="btn btn-outline btn-sm w-full">
            {dict.filters.clear}
          </button>
        </div>
      </aside>

      {/* შედეგები */}
      <div>
        <div className="mb-7 space-y-5">
          <SearchField
            locale={locale}
            value={query}
            onChange={setQuery}
            placeholder={dict.filters.searchGuidelines}
          />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ChipGroup
              options={topics}
              value={topic}
              onChange={setTopic}
              allLabel={dict.filters.allTopics}
            />
            <ResultCount locale={locale} n={filtered.length} word={dict.search.words.document} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState locale={locale} onReset={reset} />
        ) : (
          <ul className="space-y-3">
            {filtered.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guidelines/${g.slug}`}
                  className="card card-hover group flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
                >
                  <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                    <Icon name="book" size={20} />
                    <span className="mt-0.5 text-[0.625rem] font-bold">{g.code}</span>
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="badge bg-cream-200 text-ink-600">{g.type}</span>
                      <span className="badge bg-brand-100 text-brand-800">{g.topic}</span>
                      <span className="text-xs text-ink-400">
                        v{g.version} · {g.pages} {dict.common.pages}
                      </span>
                    </span>
                    <span className="mt-2 block text-[1.0625rem] font-semibold leading-snug text-ink-900 transition group-hover:text-brand-800">
                      {g.title}
                    </span>
                    <span className="clamp-2 mt-1.5 block text-[0.875rem] leading-relaxed text-ink-600">
                      {g.summary}
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                    <span className="text-xs text-ink-500">
                      {formatDateShort(g.updated, locale)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      {dict.common.open}
                      <Icon
                        name="arrow-right"
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
