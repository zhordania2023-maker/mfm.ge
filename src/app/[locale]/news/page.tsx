import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { NewsBrowser } from "@/components/browsers/NewsBrowser";
import { content, sortedNews } from "@/content";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "სიახლეები",
    title: "რა ხდება საზოგადოებაში",
    intro:
      "გაიდლაინების განახლებები, კვლევის შედეგები, ღონისძიებები და ორგანიზაციული სიახლეები — ერთ ადგილას.",
    crumb: "სიახლეები",
    metaDesc:
      "გაიდლაინების განახლებები, კვლევის შედეგები, ორგანიზაციული და საგანმანათლებლო სიახლეები MFM საქართველოსგან.",
  },
  en: {
    eyebrow: "News",
    title: "What is happening in the society",
    intro:
      "Guideline updates, research findings, events and organisational news — all in one place.",
    crumb: "News",
    metaDesc:
      "Guideline updates, research findings, organisational and educational news from MFM Georgia.",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function NewsPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const bundle = content(locale);

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
          <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-cream-200" />}>
            <NewsBrowser
              locale={locale}
              items={sortedNews(bundle)}
              categories={bundle.newsCategories}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
}
