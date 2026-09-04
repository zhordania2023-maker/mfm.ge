"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "@/components/ui/LocaleLink";
import type { MfmEvent } from "@/content/types";
import { dateBlock, formatDateRange, isUpcoming, matchesQuery, cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { SearchField, ChipGroup, ResultCount, EmptyState } from "@/components/ui/Filters";

export function EventBrowser({
  locale,
  items,
  types,
}: {
  locale: Locale;
  items: MfmEvent[];
  types: string[];
}) {
  const dict = t(locale);
  const params = useSearchParams();

  // ?type=webinar და ა.შ. — ინდექსით, რომ ორივე ენაზე იმუშაოს
  const typeKeys = ["congress", "webinar", "workshop", "course", "assembly"];
  const initialType = types[typeKeys.indexOf(params.get("type") ?? "")] ?? null;

  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string | null>(initialType);

  const filtered = useMemo(
    () =>
      items
        .filter((e) => (tab === "upcoming" ? isUpcoming(e) : !isUpcoming(e)))
        .filter((e) => !type || e.type === type)
        .filter((e) =>
          matchesQuery([e.title, e.excerpt, e.city, e.location, e.type].join(" "), query),
        )
        .sort((a, b) =>
          tab === "upcoming" ? a.start.localeCompare(b.start) : b.start.localeCompare(a.start),
        ),
    [items, tab, query, type],
  );

  return (
    <div>
      <div className="mb-8 space-y-5">
        <div className="inline-flex rounded-full border border-line-strong bg-white p-1">
          {(
            [
              ["upcoming", dict.filters.upcoming],
              ["past", dict.filters.past],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              aria-pressed={tab === k}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition",
                tab === k ? "bg-brand-700 text-white" : "text-ink-600 hover:text-brand-800",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <SearchField
          locale={locale}
          value={query}
          onChange={setQuery}
          placeholder={dict.filters.searchEvents}
          className="max-w-lg"
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <ChipGroup
            options={types}
            value={type}
            onChange={setType}
            allLabel={dict.filters.allTypes}
          />
          <ResultCount locale={locale} n={filtered.length} word={dict.search.words.event} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          locale={locale}
          title={dict.filters.eventEmptyTitle}
          text={tab === "upcoming" ? dict.filters.eventEmptyUpcoming : dict.filters.eventEmptyPast}
          onReset={() => {
            setQuery("");
            setType(null);
          }}
        />
      ) : (
        <ul className="space-y-4">
          {filtered.map((e) => {
            const d = dateBlock(e.start, locale);
            return (
              <li key={e.slug}>
                <Link
                  href={`/events/${e.slug}`}
                  className="card card-hover group flex flex-col gap-5 p-6 md:flex-row"
                >
                  <span className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-cream-200">
                    <span className="text-2xl font-bold leading-none text-ink-900">{d.day}</span>
                    <span className="mt-1.5 text-xs font-medium text-ink-500">{d.month}</span>
                    <span className="text-[0.625rem] text-ink-400">{e.start.slice(0, 4)}</span>
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="badge bg-brand-100 text-brand-800">{e.type}</span>
                      {e.online && (
                        <span className="badge bg-sky-100 text-ink-700">
                          <Icon name="video" size={12} />
                          {dict.filters.online}
                        </span>
                      )}
                      {e.cme && <span className="badge bg-cream-200 text-ink-600">{e.cme}</span>}
                      {!e.registrationOpen && tab === "upcoming" && (
                        <span className="badge bg-clay-100 text-ink-700">
                          {dict.filters.registrationClosed}
                        </span>
                      )}
                    </span>

                    <span className="mt-2.5 block text-lg font-semibold leading-snug text-ink-900 transition group-hover:text-brand-800">
                      {e.title}
                    </span>
                    <span className="clamp-2 mt-2 block text-[0.9375rem] leading-relaxed text-ink-600">
                      {e.excerpt}
                    </span>

                    <span className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-ink-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="calendar" size={14} />
                        {formatDateRange(e.start, e.end, locale)}
                      </span>
                      {e.timeLabel && (
                        <span className="inline-flex items-center gap-1.5">
                          <Icon name="clock" size={14} />
                          {e.timeLabel}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5">
                        <Icon name="pin" size={14} />
                        {e.location}
                      </span>
                    </span>
                  </span>

                  <span className="flex shrink-0 flex-col justify-center gap-2 md:items-end">
                    <span className="text-sm font-semibold text-ink-800">{e.price}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                      {dict.common.details}
                      <Icon
                        name="arrow-right"
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
