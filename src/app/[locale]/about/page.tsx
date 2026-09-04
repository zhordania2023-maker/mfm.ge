import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { PageHeader, SectionHeading } from "@/components/ui/PageHeader";
import { Icon, type IconName } from "@/components/ui/Icon";
import { content } from "@/content";
import { getLocale, pick, type LocaleParams } from "@/lib/page";
import { IMG } from "@/content/images";

const copy = {
  ka: {
    eyebrow: "ჩვენს შესახებ",
    title: "ვმუშაობთ იმისთვის, რომ უსაფრთხო ორსულობა ყველასთვის ხელმისაწვდომი იყოს",
    crumb: "ჩვენს შესახებ",
    missionTitle: "ჩვენი მისია",
    missionText:
      "MFM საქართველო მხარს უჭერს დედა-ნაყოფის მედიცინის კლინიკურ პრაქტიკას განათლების მიწოდებით, კვლევის წახალისებითა და ადვოკატირებით — რათა ორსულობის შედეგები იყოს ოპტიმალური და თანაბრად ხელმისაწვდომი ყველასთვის, ვინც ორსულობას გეგმავს ან განიცდის.",
    visionTitle: "ჩვენი ხედვა",
    visionText:
      "საქართველო, სადაც მაღალი რისკის ორსულობის მართვის სტანდარტი ერთნაირია თბილისში, ახალციხესა და ზუგდიდში; სადაც თითოეულ ექიმს აქვს წვდომა თანამედროვე ცოდნაზე, ხოლო თითოეულ პაციენტს — გასაგებ ინფორმაციაზე.",
    joinCta: "შემოგვიერთდით",
    boardCta: "გამგეობა",
    valuesEyebrow: "ღირებულებები",
    valuesTitle: "რა პრინციპებით ვმუშაობთ",
    historyEyebrow: "ისტორია",
    historyTitle: "2009 წლიდან დღემდე",
    committeesEyebrow: "სტრუქტურა",
    committeesTitle: "სამუშაო ჯგუფები",
    committeesIntro:
      "თითოეული ჯგუფი პასუხისმგებელია კონკრეტულ მიმართულებაზე — გაიდლაინების შემუშავებიდან ხარისხის აუდიტამდე.",
    committeesCta: "ჩართვის განაცხადი",
    values: [
      { icon: "shield", title: "მტკიცებულება უპირველესად", text: "ყველა რეკომენდაცია ეყრდნობა სისტემურ მიმოხილვებსა და გამჭვირვალე მეთოდოლოგიას — არა ავტორიტეტს." },
      { icon: "users", title: "თანასწორობა", text: "ზრუნვის ხარისხი არ უნდა იყოს დამოკიდებული საცხოვრებელ რეგიონზე, შემოსავალზე ან ენაზე." },
      { icon: "heart", title: "პაციენტის ხმა", text: "პაციენტები მონაწილეობენ ჩვენი მასალების შემუშავებაში — რათა ინფორმაცია იყოს რეალურად გასაგები." },
      { icon: "sparkle", title: "გამჭვირვალობა", text: "ვაქვეყნებთ ინტერესთა კონფლიქტის დეკლარაციებს, წლიურ ანგარიშებსა და აუდიტის შედეგებს." },
    ] as { icon: IconName; title: string; text: string }[],
    timeline: [
      { year: "2009", text: "დაარსდა საზოგადოება 27 დამფუძნებელი წევრით." },
      { year: "2014", text: "გამოქვეყნდა პირველი ეროვნული გაიდლაინი პრეეკლამფსიაზე." },
      { year: "2018", text: "ამოქმედდა უწყვეტი განათლების აკრედიტებული პროგრამა." },
      { year: "2021", text: "დაიწყო დედის სიკვდილიანობის კონფიდენციალური აუდიტი." },
      { year: "2024", text: "ამოქმედდა რეგიონული პერინატალური ქსელი და 24/7 ხაზი." },
      { year: "2026", text: "ქსელი გაფართოვდა ცხრა ცენტრამდე; 480+ აქტიური წევრი." },
    ],
  },
  en: {
    eyebrow: "About us",
    title: "Working to make a safe pregnancy accessible to everyone",
    crumb: "About us",
    missionTitle: "Our mission",
    missionText:
      "MFM Georgia supports the clinical practice of maternal-fetal medicine through education, research and advocacy — so that pregnancy outcomes are optimal and equally accessible to everyone who plans or experiences a pregnancy.",
    visionTitle: "Our vision",
    visionText:
      "A Georgia where the standard of high-risk pregnancy care is the same in Tbilisi, Akhaltsikhe and Zugdidi; where every clinician has access to current knowledge, and every patient to information they can understand.",
    joinCta: "Join us",
    boardCta: "The board",
    valuesEyebrow: "Values",
    valuesTitle: "The principles we work by",
    historyEyebrow: "History",
    historyTitle: "From 2009 to today",
    committeesEyebrow: "Structure",
    committeesTitle: "Working groups",
    committeesIntro:
      "Each group owns a specific area — from developing guidelines to running quality audits.",
    committeesCta: "Request to join",
    values: [
      { icon: "shield", title: "Evidence first", text: "Every recommendation rests on systematic reviews and transparent methodology — not on authority." },
      { icon: "users", title: "Equity", text: "The quality of care must not depend on where someone lives, what they earn or which language they speak." },
      { icon: "heart", title: "The patient's voice", text: "Patients help develop our materials, so that the information is genuinely understandable." },
      { icon: "sparkle", title: "Transparency", text: "We publish conflict-of-interest declarations, annual reports and audit results." },
    ] as { icon: IconName; title: string; text: string }[],
    timeline: [
      { year: "2009", text: "The society is founded with 27 members." },
      { year: "2014", text: "The first national guideline on pre-eclampsia is published." },
      { year: "2018", text: "The accredited continuing education programme launches." },
      { year: "2021", text: "The confidential enquiry into maternal deaths begins." },
      { year: "2024", text: "The regional perinatal network and 24/7 line go live." },
      { year: "2026", text: "The network expands to nine centres; 480+ active members." },
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  return { title: c.crumb, description: content(locale).site.description };
}

export default async function AboutPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { site, impact, committees } = content(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={site.description}
        crumbs={[{ label: c.crumb }]}
      />

      {/* მისია */}
      <section className="pb-20">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem]">
              <Image
                src={IMG.mission}
                alt=""
                fill
                sizes="(min-width:1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-[1.75rem] sm:text-[2.125rem]">{c.missionTitle}</h2>
              <p className="mt-5 leading-relaxed text-ink-600">{c.missionText}</p>
              <h3 className="mt-9 text-xl">{c.visionTitle}</h3>
              <p className="mt-3 leading-relaxed text-ink-600">{c.visionText}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/membership/join" className="btn btn-primary">
                  {c.joinCta}
                  <Icon name="arrow-right" size={17} />
                </Link>
                <Link href="/about/board" className="btn btn-outline">
                  {c.boardCta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ღირებულებები */}
      <section className="bg-cream-300 py-20">
        <div className="container-x">
          <SectionHeading eyebrow={c.valuesEyebrow} title={c.valuesTitle} align="center" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.map((v) => (
              <div key={v.title} className="card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Icon name={v.icon} size={20} />
                </span>
                <h3 className="mt-5 text-[1.0625rem] leading-snug">{v.title}</h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ციფრები */}
      <section className="py-20">
        <div className="container-x">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {impact.map((s) => (
              <div key={s.label} className="border-l-2 border-brand-200 pl-5">
                <p className="text-[2.25rem] font-bold leading-none text-brand-700">{s.value}</p>
                <p className="mt-3 font-semibold text-ink-900">{s.label}</p>
                <p className="mt-1 text-sm text-ink-500">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ისტორია */}
      <section className="bg-cream-300 py-20">
        <div className="container-x">
          <SectionHeading eyebrow={c.historyEyebrow} title={c.historyTitle} />
          <ol className="relative space-y-8 border-l-2 border-line-strong pl-8">
            {c.timeline.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[2.4rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-600 bg-cream-300" />
                <p className="text-sm font-bold text-brand-700">{t.year}</p>
                <p className="mt-1.5 leading-relaxed text-ink-700">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* სამუშაო ჯგუფები */}
      <section className="py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow={c.committeesEyebrow}
            title={c.committeesTitle}
            intro={c.committeesIntro}
            action={{ label: c.committeesCta, href: "/membership/committees" }}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {committees.map((cm) => (
              <div key={cm.name} className="card p-6">
                <h3 className="text-[1.0625rem]">{cm.name}</h3>
                <p className="mt-2 text-sm text-ink-600">{cm.focus}</p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-500">
                  <span>{cm.lead}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="users" size={13} />
                    {cm.members}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
