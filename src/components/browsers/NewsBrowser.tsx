"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import type { NewsItem } from "@/content/types";
import { formatDateShort, matchesQuery } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import {
  SearchField,
  ChipGroup,
  ResultCount,
  EmptyState,
  Pagination,
} from "@/components/ui/Filters";

const PER_PAGE = 6;

export function NewsBrowser({
  locale,
  items,
  categories,
}: {
  locale: Locale;
  items: NewsItem[];
  categories: string[];
}) {
  const dict = t(locale);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      items.filter((n) => {
        if (category && n.category !== category) return false;
        return matchesQuery(
          [n.title, n.excerpt, n.tags.join(" "), n.author, n.body.join(" ")].join(" "),
          query,
        );
      }),
    [items, query, category],
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  function reset() {
    setQuery("");
    setCategory(null);
    setPage(1);
  }

  return (
    <div>
      <div className="mb-8 space-y-5">
        <SearchField
          locale={locale}
          value={query}
          onChange={(v) => {
            setQuery(v);
            setPage(1);
          }}
          placeholder={dict.filters.searchNews}
          className="max-w-lg"
        />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <ChipGroup
            options={categories}
            value={category}
            onChange={(v) => {
              setCategory(v);
              setPage(1);
            }}
            allLabel={dict.filters.all}
          />
          <ResultCount locale={locale} n={filtered.length} word={dict.search.words.article} />
        </div>
      </div>

      {slice.length === 0 ? (
        <EmptyState locale={locale} onReset={reset} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slice.map((n) => (
            <Link
              key={n.slug}
              href={`/news/${n.slug}`}
              className="card card-hover group flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={n.image}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="badge absolute left-3 top-3 bg-white/92 text-ink-800 backdrop-blur">
                  {n.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs text-ink-500">
                  {formatDateShort(n.date, locale)} · {n.readMinutes} {dict.common.minRead}
                </p>
                <h3 className="clamp-3 mt-2 text-[1.0625rem] leading-snug transition group-hover:text-brand-800">
                  {n.title}
                </h3>
                <p className="clamp-3 mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
                  {n.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  {dict.common.open}
                  <Icon
                    name="arrow-right"
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Pagination locale={locale} page={current} pages={pages} onChange={setPage} />
    </div>
  );
}
