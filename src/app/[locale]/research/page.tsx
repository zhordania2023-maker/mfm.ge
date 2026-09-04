import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { PageHeader, SectionHeading } from "@/components/ui/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";
import { IMG } from "@/content/images";

const copy = {
  ka: {
    eyebrow: "კვლევა",
    title: "კვლევა და პუბლიკაციები",
    intro:
      "ადგილობრივი მონაცემები საჭიროა იმისთვის, რომ საერთაშორისო რეკომენდაციები სწორად ადაპტირდეს. ვმართავთ მრავალცენტრულ კვლევებს და ვაფინანსებთ ახალგაზრდა მკვლევრებს.",
    crumb: "კვლევა",
    metaDesc:
      "მიმდინარე მრავალცენტრული კვლევები, გრანტები ახალგაზრდა მკვლევრებისთვის და სამეცნიერო პუბლიკაციები.",
    activeEyebrow: "მიმდინარე",
    activeTitle: "აქტიური კვლევები",
    lead: "ხელმძღვანელი",
    centres: "ცენტრი",
    grantsEyebrow: "დაფინანსება",
    grantsTitle: "გრანტები ახალგაზრდა მკვლევრებისთვის",
    grantsText:
      "ყოველწლიურად გაიცემა ხუთი გრანტი, თითოეული 12 000 ლარის ოდენობით — რეზიდენტებისა და ფელოუების საწყისი კვლევითი პროექტებისთვის. განაცხადების მიღების ბოლო ვადაა 30 ნოემბერი.",
    grantsCta: "განაცხადის შესახებ",
    grantReqs: [
      "პროტოკოლის მოკლე აღწერა (მაქსიმუმ 5 გვერდი)",
      "ბიუჯეტი და ვადები",
      "მენტორის სარეკომენდაციო წერილი",
      "ინსტიტუციური მხარდაჭერის დადასტურება",
    ],
    pubsEyebrow: "პუბლიკაციები",
    pubsTitle: "რჩეული ნაშრომები",
    studies: [
      { title: "ნაადრევი მშობიარობის პროგნოზირება ქართულ პოპულაციაში", status: "მიმდინარე", centers: 6, n: "2 400", lead: "პროფ. თამარ ბერიძე", text: "პროსპექტული კვლევა ცერვიკომეტრიისა და ბიომარკერების კომბინირებული პროგნოზული ღირებულების შესაფასებლად." },
      { title: "პრეეკლამფსიის სკრინინგის ეფექტურობა რეგიონულ ცენტრებში", status: "მიმდინარე", centers: 9, n: "3 100", lead: "პროფ. ნინო ჩხარტიშვილი", text: "კომბინირებული სკრინინგის დანერგვის შედეგების შეფასება რესურსებით შეზღუდულ გარემოში." },
      { title: "დედის სიკვდილიანობის კონფიდენციალური აუდიტი", status: "უწყვეტი", centers: 24, n: "—", lead: "აუდიტის სამუშაო ჯგუფი", text: "ყოველწლიური სისტემური ანალიზი თავიდან აცილებადი ფაქტორების იდენტიფიცირებისთვის." },
      { title: "ტელემედიცინის გავლენა პერინატალურ შედეგებზე", status: "ანალიზის ეტაპი", centers: 3, n: "640", lead: "ციფრული ჯანდაცვის ჯგუფი", text: "პილოტ-პროექტის შედეგების შეფასება: ხელმისაწვდომობა, დრო კონსულტაციამდე, კმაყოფილება." },
    ],
  },
  en: {
    eyebrow: "Research",
    title: "Research and publications",
    intro:
      "Local data is what allows international recommendations to be adapted correctly. We run multicentre studies and fund young investigators.",
    crumb: "Research",
    metaDesc:
      "Ongoing multicentre studies, grants for young investigators and scientific publications.",
    activeEyebrow: "Ongoing",
    activeTitle: "Active studies",
    lead: "Lead investigator",
    centres: "centres",
    grantsEyebrow: "Funding",
    grantsTitle: "Grants for young investigators",
    grantsText:
      "Five grants of 12,000 GEL each are awarded annually for first research projects by residents and fellows. Applications close on 30 November.",
    grantsCta: "About applying",
    grantReqs: [
      "A short protocol summary (maximum five pages)",
      "Budget and timeline",
      "A letter of recommendation from a mentor",
      "Confirmation of institutional support",
    ],
    pubsEyebrow: "Publications",
    pubsTitle: "Selected papers",
    studies: [
      { title: "Predicting preterm birth in the Georgian population", status: "Ongoing", centers: 6, n: "2,400", lead: "Prof. Tamar Beridze", text: "A prospective study of the combined predictive value of cervical length and biomarkers." },
      { title: "Effectiveness of pre-eclampsia screening in regional centres", status: "Ongoing", centers: 9, n: "3,100", lead: "Prof. Nino Chkhartishvili", text: "Assessing the results of implementing combined screening in a resource-limited setting." },
      { title: "Confidential enquiry into maternal deaths", status: "Continuous", centers: 24, n: "—", lead: "Audit Working Group", text: "An annual systemic analysis to identify avoidable factors." },
      { title: "The effect of telehealth on perinatal outcomes", status: "In analysis", centers: 3, n: "640", lead: "Digital Health Group", text: "Evaluating the pilot: access, time to consultation, satisfaction." },
    ],
  },
};

const publications = [
  {
    t: "Combined first-trimester screening in a resource-limited setting: a multicentre cohort",
    j: "Journal of Perinatal Medicine",
    y: 2025,
  },
  {
    t: "Implementation of MEOWS in Georgian maternity units: barriers and facilitators",
    j: "BMC Pregnancy and Childbirth",
    y: 2025,
  },
  {
    t: "Regional perinatal networks and in-utero transfer rates: a before-after analysis",
    j: "European Journal of Obstetrics & Gynecology",
    y: 2024,
  },
  {
    t: "Quantitative blood loss measurement and PPH outcomes: a quality improvement project",
    j: "International Journal of Gynecology & Obstetrics",
    y: 2024,
  },
];

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function ResearchPage({ params }: LocaleParams) {
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
          <SectionHeading eyebrow={c.activeEyebrow} title={c.activeTitle} />
          <div className="grid gap-5 lg:grid-cols-2">
            {c.studies.map((s) => (
              <article key={s.title} className="card p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge bg-brand-100 text-brand-800">{s.status}</span>
                  <span className="badge bg-cream-200 text-ink-600">
                    {s.centers} {c.centres}
                  </span>
                  {s.n !== "—" && (
                    <span className="badge bg-cream-200 text-ink-600">n = {s.n}</span>
                  )}
                </div>
                <h3 className="mt-4 text-[1.125rem] leading-snug">{s.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">{s.text}</p>
                <p className="mt-5 border-t border-line pt-4 text-xs text-ink-500">
                  {c.lead}: <span className="font-semibold text-ink-700">{s.lead}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-300 py-20">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow={c.grantsEyebrow} title={c.grantsTitle} />
              <p className="-mt-4 leading-relaxed text-ink-600">{c.grantsText}</p>
              <ul className="mt-7 space-y-3">
                {c.grantReqs.map((r) => (
                  <li key={r} className="flex gap-3 text-[0.9375rem] text-ink-700">
                    <Icon name="check" size={16} className="mt-1 shrink-0 text-brand-600" />
                    {r}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-primary mt-8">
                {c.grantsCta}
                <Icon name="arrow-right" size={17} />
              </Link>
            </div>

            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem]">
              <Image
                src={IMG.researchHero}
                alt=""
                fill
                sizes="(min-width:1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow={c.pubsEyebrow} title={c.pubsTitle} />
          <ul className="space-y-3">
            {publications.map((p) => (
              <li key={p.t} className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream-200 text-ink-600">
                  <Icon name="flask" size={18} />
                </span>
                <span className="flex-1">
                  <span className="block text-[0.9375rem] font-semibold leading-snug text-ink-900">
                    {p.t}
                  </span>
                  <span className="mt-1 block text-xs text-ink-500">
                    {p.j} · {p.y}
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700">
                  <Icon name="external" size={14} />
                  DOI
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
