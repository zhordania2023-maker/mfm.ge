"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { SearchResult } from "@/lib/search";

type Cached = { key: string; results: SearchResult[] };

/** გადადებული (debounced) ძიება /api/search-ის გავლით */
export function useSearch(locale: Locale, query: string, limit = 40) {
  const q = query.trim();
  const enabled = q.length >= 2;
  const key = `${locale}|${limit}|${q}`;

  const [cached, setCached] = useState<Cached>({ key: "", results: [] });

  // მდგომარეობა რენდერის დროს გამოითვლება — ეფექტში setState არ გვჭირდება
  const fresh = enabled && cached.key === key;
  const results = fresh ? cached.results : [];
  const loading = enabled && !fresh;

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}&lang=${locale}&limit=${limit}`, {
        signal: controller.signal,
      })
        .then((r) => r.json())
        .then((data: { results?: SearchResult[] }) => {
          setCached({ key, results: data.results ?? [] });
        })
        .catch((err) => {
          if ((err as Error).name !== "AbortError") setCached({ key, results: [] });
        });
    }, 180);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [enabled, key, q, locale, limit]);

  return { results, loading };
}
