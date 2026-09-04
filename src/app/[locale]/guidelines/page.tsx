import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { GuidelineBrowser } from "@/components/browsers/GuidelineBrowser";
import { content, guidelineYears, sortedGuidelines } from "@/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "კლინიკური რესურსები",
    title: "გაიდლაინები, პროტოკოლები და საკონტროლო ფურცლები",
    intro:
      "ყველა დოკუმენტი შემუშავებულია სამუშაო ჯგუფების მიერ, საერთაშორისო რეკომენდაციებზე დაყრდნობით და ადაპტირებულია ადგილობრივ კონტექსტზე. წვდომა უფასოა და რეგისტრაციას არ საჭიროებს.",
    crumb: "გაიდლაინები",
    metaTitle: "კლინიკური გაიდლაინები",
    metaDesc:
      "ქართულენოვანი კლინიკური გაიდლაინები, პროტოკოლები და საკონტროლო ფურცლები დედა-ნაყოფის მედიცინაში — ღია წვდომით.",
    stats: (n: number) => [
      { icon: "book" as IconName, label: `${n} დოკუმენტი` },
      { icon: "download" as IconName, label: "ღია წვდომა, უფასოდ" },
      { icon: "shield" as IconName, label: "მტკიცებულებაზე დაფუძნებული" },
    ],
  },
  en: {
    eyebrow: "Clinical resources",
    title: "Guidelines, protocols and checklists",
    intro:
      "Every document is developed by our working groups on the basis of international recommendations and adapted to the local context. Access is free and requires no registration.",
    crumb: "Guidelines",
    metaTitle: "Clinical guidelines",
    metaDesc:
      "Clinical guidelines, protocols and checklists in maternal-fetal medicine — open access.",
    stats: (n: number) => [
      { icon: "book" as IconName, label: `${n} documents` },
      { icon: "download" as IconName, label: "Open access, free" },
      { icon: "shield" as IconName, label: "Evidence-based" },
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.metaTitle, description: c.metaDesc };
}

export default async function GuidelinesPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const bundle = content(locale);
  const stats = c.stats(bundle.guidelines.length);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.crumb }]}
      >
        <ul className="flex flex-wrap gap-x-7 gap-y-3">
          {stats.map((s) => (
            <li key={s.label} className="inline-flex items-center gap-2 text-sm text-ink-600">
              <Icon name={s.icon} size={17} className="text-brand-600" />
              {s.label}
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className="pb-20">
        <div className="container-x">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-cream-200" />}>
            <GuidelineBrowser
              locale={locale}
              items={sortedGuidelines(bundle)}
              topics={bundle.guidelineTopics}
              types={bundle.guidelineTypes}
              years={guidelineYears(bundle)}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
}
