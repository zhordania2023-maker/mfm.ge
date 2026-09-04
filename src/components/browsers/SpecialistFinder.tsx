"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Specialist } from "@/content/types";
import { matchesQuery } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { SearchField, Select, Toggle, ResultCount, EmptyState } from "@/components/ui/Filters";

function initials(name: string) {
  const parts = name
    .replace(/^(პროფ\.|დრ\.|Prof\.|Dr)\s*/, "")
    .trim()
    .split(" ");
  return parts
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

export function SpecialistFinder({
  locale,
  items,
  cities,
  subspecialties,
}: {
  locale: Locale;
  items: Specialist[];
  cities: string[];
  subspecialties: string[];
}) {
  const dict = t(locale);
  const params = useSearchParams();

  const allLanguages = useMemo(
    () =>
      Array.from(new Set(items.flatMap((s) => s.languages))).sort((a, b) =>
        a.localeCompare(b, locale),
      ),
    [items, locale],
  );

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [city, setCity] = useState("");
  const [sub, setSub] = useState("");
  const [lang, setLang] = useState("");
  const [telehealth, setTelehealth] = useState(false);
  const [referrals, setReferrals] = useState(false);

  const filtered = useMemo(
    () =>
      items.filter((s) => {
        if (city && s.city !== city) return false;
        if (sub && !s.subspecialties.includes(sub)) return false;
        if (lang && !s.languages.includes(lang)) return false;
        if (telehealth && !s.telehealth) return false;
        if (referrals && !s.acceptsReferrals) return false;
        return matchesQuery(
          [s.name, s.title, s.clinic, s.city, s.region, s.subspecialties.join(" "), s.bio].join(" "),
          query,
        );
      }),
    [items, query, city, sub, lang, telehealth, referrals],
  );

  function reset() {
    setQuery("");
    setCity("");
    setSub("");
    setLang("");
    setTelehealth(false);
    setReferrals(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
        <div className="card space-y-5 p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
            <Icon name="filter" size={16} className="text-brand-600" />
            {dict.filters.title}
          </p>

          <Select
            label={dict.filters.city}
            value={city}
            onChange={setCity}
            options={cities}
            allLabel={dict.filters.allCities}
          />
          <Select
            label={dict.filters.subspecialty}
            value={sub}
            onChange={setSub}
            options={subspecialties}
            allLabel={dict.filters.allDirections}
          />
          <Select
            label={dict.filters.consultLanguage}
            value={lang}
            onChange={setLang}
            options={allLanguages}
            allLabel={dict.filters.anyLanguage}
          />

          <div className="space-y-3 border-t border-line pt-4">
            <Toggle label={dict.filters.telehealth} checked={telehealth} onChange={setTelehealth} />
            <Toggle
              label={dict.filters.acceptsReferrals}
              checked={referrals}
              onChange={setReferrals}
            />
          </div>

          <button onClick={reset} className="btn btn-outline btn-sm w-full">
            {dict.filters.clear}
          </button>
        </div>

        <p className="mt-4 px-1 text-xs leading-relaxed text-ink-500">
          {dict.filters.directoryNote}
        </p>
      </aside>

      <div>
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchField
            locale={locale}
            value={query}
            onChange={setQuery}
            placeholder={dict.filters.searchSpecialists}
            className="sm:max-w-md sm:flex-1"
          />
          <ResultCount locale={locale} n={filtered.length} word={dict.search.words.specialist} />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            locale={locale}
            title={dict.filters.specialistEmptyTitle}
            text={dict.filters.specialistEmptyText}
            onReset={reset}
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {filtered.map((s) => (
              <li key={s.id} className="card flex flex-col p-5">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
                    {initials(s.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold leading-snug text-ink-900">{s.name}</p>
                    <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-600">{s.title}</p>
                  </div>
                </div>

                <p className="mt-4 flex items-start gap-2 text-[0.8125rem] text-ink-600">
                  <Icon name="pin" size={15} className="mt-0.5 shrink-0 text-ink-400" />
                  <span>
                    {s.clinic}
                    <br />
                    <span className="text-ink-500">
                      {s.city}, {s.region}
                    </span>
                  </span>
                </p>

                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {s.subspecialties.map((x) => (
                    <span key={x} className="badge bg-cream-200 text-ink-600">
                      {x}
                    </span>
                  ))}
                </div>

                <p className="clamp-2 mt-3.5 flex-1 text-[0.8125rem] leading-relaxed text-ink-500">
                  {s.bio}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-xs">
                  <span className="inline-flex items-center gap-1.5 text-ink-500">
                    <Icon name="globe" size={13} />
                    {s.languages.join(", ")}
                  </span>
                  {s.telehealth && (
                    <span className="inline-flex items-center gap-1.5 text-brand-700">
                      <Icon name="video" size={13} />
                      {dict.filters.telehealth}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={`tel:${s.phone.replace(/\s/g, "")}`}
                    className="btn btn-outline btn-sm flex-1"
                  >
                    <Icon name="phone" size={14} />
                    {dict.filters.callAction}
                  </a>
                  <a href={`mailto:${s.email}`} className="btn btn-outline btn-sm flex-1">
                    <Icon name="mail" size={14} />
                    {dict.filters.emailAction}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
