import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "ორგანიზაცია",
    title: "ჩვენი ისტორია",
    intro: "ჩვიდმეტი წელი — 27 დამფუძნებლიდან ცხრა რეგიონულ ცენტრამდე.",
    parent: "ჩვენს შესახებ",
    crumb: "ისტორია",
    metaDesc: "როგორ ჩამოყალიბდა MFM საქართველო 2009 წლიდან დღემდე.",
    principleTitle: "დამფუძნებელი პრინციპი",
    quote:
      "> „სტანდარტი მაშინ მუშაობს, როცა ის ერთნაირად ხელმისაწვდომია დედაქალაქშიც და რაიონულ საავადმყოფოშიც.“",
    quoteSource: "დამფუძნებელი კრების ოქმიდან, 2009 წლის 14 მარტი.",
    milestones: [
      { year: "2009", title: "დაარსება", text: "27 მეან-გინეკოლოგმა და ნეონატოლოგმა დააფუძნა საზოგადოება, რომლის მიზანიც მაღალი რისკის ორსულობის მართვის სტანდარტიზაცია იყო." },
      { year: "2012", title: "პირველი კონგრესი", text: "თბილისში ჩატარდა პირველი ეროვნული კონგრესი 180 მონაწილით და ხუთი მოწვეული საერთაშორისო სპიკერით." },
      { year: "2014", title: "პირველი გაიდლაინი", text: "გამოქვეყნდა პრეეკლამფსიის მართვის პირველი ეროვნული გაიდლაინი, რომელიც ჯანდაცვის სამინისტრომ რეკომენდაციად მიიღო." },
      { year: "2018", title: "CME პროგრამა", text: "ამოქმედდა უწყვეტი სამედიცინო განათლების აკრედიტებული პროგრამა; პირველ წელს გადამზადდა 210 სპეციალისტი." },
      { year: "2021", title: "კონფიდენციალური აუდიტი", text: "ჯანდაცვის სამინისტროსთან ერთად დაიწყო დედის სიკვდილიანობის კონფიდენციალური აუდიტი." },
      { year: "2024", title: "რეგიონული ქსელი", text: "ამოქმედდა 24/7 კონსულტაციის ხაზი და შვიდი რეგიონული პერინატალური ცენტრი." },
      { year: "2026", title: "ცხრა ცენტრი", text: "ქსელს დაემატა ქუთაისისა და ბათუმის ცენტრები; საზოგადოებას 480-ზე მეტი აქტიური წევრი ჰყავს." },
    ],
  },
  en: {
    eyebrow: "Organisation",
    title: "Our history",
    intro: "Seventeen years — from 27 founders to nine regional centres.",
    parent: "About us",
    crumb: "History",
    metaDesc: "How MFM Georgia took shape, from 2009 to today.",
    principleTitle: "The founding principle",
    quote:
      "> “A standard only works when it is equally available in the capital and in a district hospital.”",
    quoteSource: "From the minutes of the founding assembly, 14 March 2009.",
    milestones: [
      { year: "2009", title: "Foundation", text: "Twenty-seven obstetrician-gynaecologists and neonatologists founded the society to standardise high-risk pregnancy care." },
      { year: "2012", title: "First congress", text: "The first national congress was held in Tbilisi with 180 participants and five invited international speakers." },
      { year: "2014", title: "First guideline", text: "The first national pre-eclampsia guideline was published and adopted as a recommendation by the Ministry of Health." },
      { year: "2018", title: "CME programme", text: "The accredited continuing education programme launched; 210 specialists trained in its first year." },
      { year: "2021", title: "Confidential enquiry", text: "The confidential enquiry into maternal deaths began, jointly with the Ministry of Health." },
      { year: "2024", title: "Regional network", text: "The 24/7 consultation line and seven regional perinatal centres went live." },
      { year: "2026", title: "Nine centres", text: "Kutaisi and Batumi joined the network; the society now has more than 480 active members." },
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function HistoryPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.parent, href: "/about" }, { label: c.crumb }]}
      />

      <section className="pb-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <ol className="relative space-y-10 border-l-2 border-line-strong pl-8">
              {c.milestones.map((m) => (
                <li key={m.year} className="relative">
                  <span className="absolute -left-[2.4rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand-600 bg-cream-100" />
                  <p className="text-sm font-bold text-brand-700">{m.year}</p>
                  <h2 className="mt-1.5 text-xl">{m.title}</h2>
                  <p className="mt-2 leading-relaxed text-ink-600">{m.text}</p>
                </li>
              ))}
            </ol>

            <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <div className="card bg-brand-50 p-6">
                <h2 className="text-lg">{c.principleTitle}</h2>
                <div className="mt-3">
                  <Prose blocks={[c.quote, c.quoteSource]} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
