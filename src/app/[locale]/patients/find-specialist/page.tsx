import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SpecialistFinder } from "@/components/browsers/SpecialistFinder";
import { content } from "@/content";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "ინსტრუმენტი",
    title: "იპოვეთ სპეციალისტი",
    intro:
      "კატალოგში წარმოდგენილია MFM საქართველოს წევრები, რომლებიც მუშაობენ მაღალი რისკის ორსულობის მიმართულებით. გაფილტრეთ ქალაქის, სუბსპეციალობის ან კონსულტაციის ენის მიხედვით.",
    parent: "პაციენტებისთვის",
    crumb: "სპეციალისტის მოძებნა",
    metaDesc:
      "იპოვეთ სერტიფიცირებული პერინატოლოგი ან დედა-ნაყოფის მედიცინის სპეციალისტი საქართველოში — ქალაქის, მიმართულებისა და ენის მიხედვით.",
  },
  en: {
    eyebrow: "Tool",
    title: "Find a specialist",
    intro:
      "The directory lists MFM Georgia members working in high-risk pregnancy care. Filter by city, subspecialty or consultation language.",
    parent: "For patients",
    crumb: "Find a specialist",
    metaDesc:
      "Find a certified perinatologist or maternal-fetal medicine specialist in Georgia — by city, subspecialty and language.",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function FindSpecialistPage({ params }: LocaleParams) {
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
        crumbs={[{ label: c.parent, href: "/patients" }, { label: c.crumb }]}
      />

      <section className="pb-20">
        <div className="container-x">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-cream-200" />}>
            <SpecialistFinder
              locale={locale}
              items={bundle.specialists}
              cities={bundle.cities}
              subspecialties={bundle.subspecialties}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
}
