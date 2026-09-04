import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EventBrowser } from "@/components/browsers/EventBrowser";
import { content } from "@/content";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "კალენდარი",
    title: "ღონისძიებები და სასწავლო შეხვედრები",
    intro:
      "კონგრესი, ვებინარები, სიმულაციური კურსები და რეგიონული სამუშაო შეხვედრები. წევრებისთვის მოქმედებს ფასდაკლება, ნაწილი კი სრულიად უფასოა.",
    crumb: "ღონისძიებები",
    metaDesc:
      "კონგრესი, ვებინარები, სიმულაციური კურსები და რეგიონული სამუშაო შეხვედრები — MFM საქართველოს კალენდარი.",
  },
  en: {
    eyebrow: "Calendar",
    title: "Events and training meetings",
    intro:
      "The congress, webinars, simulation courses and regional workshops. Members get a discount, and some events are entirely free.",
    crumb: "Events",
    metaDesc:
      "Congress, webinars, simulation courses and regional workshops — the MFM Georgia calendar.",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function EventsPage({ params }: LocaleParams) {
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
            <EventBrowser locale={locale} items={bundle.events} types={bundle.eventTypes} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
