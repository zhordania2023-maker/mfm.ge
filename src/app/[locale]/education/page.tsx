import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { PageHeader, SectionHeading } from "@/components/ui/PageHeader";
import { content } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";
import { cn } from "@/lib/utils";
import { IMG } from "@/content/images";

const copy = {
  ka: {
    eyebrow: "განათლება",
    title: "უწყვეტი სამედიცინო განათლება",
    intro:
      "14 აკრედიტებული კურსი წელიწადში — ონლაინ მოდულებიდან მაღალი რეალიზმის სიმულაციამდე. წევრებისთვის უმეტესობა უფასოა ან 40%-იანი ფასდაკლებით.",
    crumb: "განათლება",
    metaTitle: "განათლება და CME",
    metaDesc:
      "აკრედიტებული უწყვეტი სამედიცინო განათლების კურსები, სიმულაციური ტრენინგები და ვებინარები დედა-ნაყოფის მედიცინაში.",
    ctaCase: "კვირის შემთხვევა",
    ctaEvents: "ღონისძიებების კალენდარი",
    catalogue: "კატალოგი",
    courses: "კურსები",
    soon: "მალე გაიხსნება",
    register: "რეგისტრაცია",
    waitlist: "მოლოდინის სიაში ჩაწერა",
    standard: "სტანდარტული",
    forMembers: "წევრებისთვის",
    programmesTitle: "გრძელვადიანი პროგრამები",
    programmesText:
      "ცალკეული კურსების გარდა, ვახორციელებთ სტრუქტურირებულ პროგრამებს, რომლებიც გრძელდება თვეების განმავლობაში და სრულდება სერტიფიცირებით.",
    programmes: [
      { t: "პერინატოლოგიის ფელოუშიპი", d: "24-თვიანი პროგრამა კლინიკური როტაციებით, კვლევითი კომპონენტითა და საბოლოო გამოცდით.", h: "/education/fellowship" },
      { t: "სიმულაციური ტრენინგები", d: "გუნდური სცენარები გადაუდებელ სამეანო მდგომარეობებში — ადგილზე ჩატარებით.", h: "/education/simulation" },
    ],
  },
  en: {
    eyebrow: "Education",
    title: "Continuing medical education",
    intro:
      "Fourteen accredited courses a year — from online modules to high-fidelity simulation. Most are free for members or offered at a 40% discount.",
    crumb: "Education",
    metaTitle: "Education and CME",
    metaDesc:
      "Accredited continuing medical education courses, simulation training and webinars in maternal-fetal medicine.",
    ctaCase: "Case of the week",
    ctaEvents: "Events calendar",
    catalogue: "Catalogue",
    courses: "Courses",
    soon: "Opening soon",
    register: "Register",
    waitlist: "Join the waiting list",
    standard: "Standard",
    forMembers: "Members",
    programmesTitle: "Long-form programmes",
    programmesText:
      "Beyond individual courses we run structured programmes that last for months and end in certification.",
    programmes: [
      { t: "Perinatology fellowship", d: "A 24-month programme with clinical rotations, a research component and a final examination.", h: "/education/fellowship" },
      { t: "Simulation training", d: "Team scenarios in obstetric emergencies, delivered on site at your unit.", h: "/education/simulation" },
    ],
  },
};

const formatStyles: Record<string, string> = {
  ონლაინ: "bg-sky-100 text-ink-700",
  დასწრებით: "bg-clay-100 text-ink-700",
  ჰიბრიდული: "bg-lilac-200 text-ink-800",
  Online: "bg-sky-100 text-ink-700",
  "In person": "bg-clay-100 text-ink-700",
  Hybrid: "bg-lilac-200 text-ink-800",
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.metaTitle, description: c.metaDesc };
}

export default async function EducationPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { courses } = content(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.crumb }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/education/cases" className="btn btn-primary">
            {c.ctaCase}
            <Icon name="arrow-right" size={16} />
          </Link>
          <Link href="/events" className="btn btn-outline">
            {c.ctaEvents}
          </Link>
        </div>
      </PageHeader>

      {/* კურსები */}
      <section className="pb-20">
        <div className="container-x">
          <SectionHeading eyebrow={c.catalogue} title={c.courses} />
          <div className="grid gap-5 lg:grid-cols-2">
            {courses.map((course) => (
              <article
                key={course.slug}
                id={course.slug}
                className={cn("card scroll-mt-28 p-6", !course.open && "opacity-75")}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("badge", formatStyles[course.format] ?? "bg-cream-200")}>
                    {course.format}
                  </span>
                  <span className="badge bg-cream-200 text-ink-600">{course.level}</span>
                  <span className="badge bg-brand-100 text-brand-800">{course.cme}</span>
                  {!course.open && (
                    <span className="badge bg-cream-300 text-ink-600">{c.soon}</span>
                  )}
                </div>

                <h3 className="mt-4 text-xl leading-snug">{course.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-600">{course.summary}</p>

                <div className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {course.modules.map((m) => (
                    <p key={m} className="flex items-start gap-2 text-[0.8125rem] text-ink-600">
                      <Icon name="check" size={13} className="mt-1 shrink-0 text-brand-500" />
                      {m}
                    </p>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                  <span className="inline-flex items-center gap-1.5 text-sm text-ink-500">
                    <Icon name="clock" size={14} />
                    {course.duration}
                  </span>
                  <div className="text-right">
                    <p className="text-xs text-ink-500">
                      {c.standard} <span className="line-through">{course.price}</span>
                    </p>
                    <p className="text-sm font-bold text-brand-700">
                      {c.forMembers} {course.memberPrice}
                    </p>
                  </div>
                </div>

                <Link
                  href={course.open ? "/membership/join" : "/contact"}
                  className="btn btn-primary mt-5 w-full"
                >
                  {course.open ? c.register : c.waitlist}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* პროგრამები */}
      <section className="bg-cream-300 py-20">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem]">
              <Image
                src={IMG.educationHero}
                alt=""
                fill
                sizes="(min-width:1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-[1.75rem] sm:text-[2.125rem]">{c.programmesTitle}</h2>
              <p className="mt-4 leading-relaxed text-ink-600">{c.programmesText}</p>
              <div className="mt-8 space-y-4">
                {c.programmes.map((p) => (
                  <Link key={p.h} href={p.h} className="card card-hover group flex gap-4 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                      <Icon name="graduation" size={20} />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink-900 transition group-hover:text-brand-800">
                        {p.t}
                      </span>
                      <span className="mt-1 block text-[0.875rem] leading-relaxed text-ink-600">
                        {p.d}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
