import { Hero } from "@/components/home/Hero";
import { Pillars } from "@/components/home/Pillars";
import { CareSection } from "@/components/home/CareSection";
import { EventsPreview } from "@/components/home/EventsPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { GuidelinesPreview } from "@/components/home/GuidelinesPreview";
import { ImpactBand, CtaBand, PartnersStrip } from "@/components/home/Bands";
import { getLocale, type LocaleParams } from "@/lib/page";

export default async function HomePage({ params }: LocaleParams) {
  const locale = await getLocale(params);

  return (
    <>
      <Hero locale={locale} />
      <Pillars locale={locale} />
      <CareSection locale={locale} />
      <EventsPreview locale={locale} />
      <GuidelinesPreview locale={locale} />
      <NewsPreview locale={locale} />
      <ImpactBand locale={locale} />
      <CtaBand locale={locale} />
      <PartnersStrip locale={locale} />
    </>
  );
}
