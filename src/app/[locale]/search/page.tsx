import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchClient } from "@/components/browsers/SearchClient";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "ძიება",
    title: "იპოვეთ ის, რაც გჭირდებათ",
    intro:
      "ძიება მოიცავს გაიდლაინებს, სიახლეებს, ღონისძიებებს, კურსებს, კლინიკურ შემთხვევებს, სპეციალისტებსა და ხშირ კითხვებს.",
    crumb: "ძიება",
    metaDesc: "მოძებნეთ გაიდლაინი, სიახლე, ღონისძიება, კურსი ან სპეციალისტი საიტზე.",
  },
  en: {
    eyebrow: "Search",
    title: "Find what you need",
    intro:
      "Search covers guidelines, news, events, courses, clinical cases, specialists and frequently asked questions.",
    crumb: "Search",
    metaDesc: "Search the site for a guideline, news item, event, course or specialist.",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc, robots: { index: false, follow: true } };
}

export default async function SearchPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.crumb }]}
      />
      <section className="pb-20">
        <div className="container-x">
          <Suspense fallback={<div className="h-64 animate-pulse rounded-2xl bg-cream-200" />}>
            <SearchClient locale={locale} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
