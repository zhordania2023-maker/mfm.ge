import { NextResponse } from "next/server";
import { searchAll } from "@/lib/search";
import { isLocale, defaultLocale } from "@/i18n/config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").slice(0, 120);
  const langParam = searchParams.get("lang") ?? "";
  const locale = isLocale(langParam) ? langParam : defaultLocale;
  const limit = Math.min(Number(searchParams.get("limit") ?? 40) || 40, 100);

  const results = q.trim().length >= 2 ? searchAll(locale, q, limit) : [];

  return NextResponse.json(
    { query: q, locale, count: results.length, results },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=600" } },
  );
}
