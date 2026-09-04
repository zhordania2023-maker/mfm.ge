import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { content } from "@/content";
import { Prose } from "@/components/ui/Prose";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "პაციენტებისთვის",
    title: "თქვენი უფლებები",
    intro:
      "ინფორმირებული პაციენტი უკეთეს გადაწყვეტილებას იღებს. ეს უფლებები გარანტირებულია საქართველოს კანონმდებლობითა და საერთაშორისო სტანდარტებით.",
    parent: "პაციენტებისთვის",
    crumb: "უფლებები",
    metaDesc:
      "რა უფლებები აქვს პაციენტს სამედიცინო მომსახურების მიღებისას და როგორ დაიცვას ისინი.",
    asideTitle: "კითხვები ექიმისთვის",
    asideText:
      "ჩამოტვირთეთ დასაბეჭდი სია, რომელიც დაგეხმარებათ ვიზიტზე მნიშვნელოვანი არაფერი გამოგრჩეთ.",
    asideCta: "მასალების ნახვა",
    body: [
      "## თუ უფლება დაირღვა",
      "პირველი ნაბიჯი — ესაუბრეთ უშუალოდ ექიმს ან განყოფილების ხელმძღვანელს. ხშირად საკითხი წყდება ამ ეტაპზე.",
      "თუ ეს არ გამოდგა, დაწესებულებაში უნდა არსებობდეს პაციენტთა საჩივრების განხილვის მექანიზმი. მოითხოვეთ წერილობითი პასუხი.",
      "შემდეგი ინსტანციაა ჯანმრთელობის დაცვის სამინისტროს სამედიცინო საქმიანობის რეგულირების სააგენტო.",
      "> MFM საქართველო არ განიხილავს ინდივიდუალურ საჩივრებს, თუმცა ვაგროვებთ სისტემურ ინფორმაციას სტანდარტების გასაუმჯობესებლად.",
    ],
  },
  en: {
    eyebrow: "For patients",
    title: "Your rights",
    intro:
      "An informed patient makes better decisions. These rights are guaranteed by Georgian law and by international standards.",
    parent: "For patients",
    crumb: "Rights",
    metaDesc:
      "What patients are entitled to when receiving medical care, and how to protect those rights.",
    asideTitle: "Questions for your doctor",
    asideText:
      "Download a printable list so nothing important is forgotten during your appointment.",
    asideCta: "Browse materials",
    body: [
      "## If a right is breached",
      "The first step is to talk to the doctor or the head of department directly. Most issues are resolved at this stage.",
      "If that does not work, the facility must have a complaints procedure. Ask for a written response.",
      "The next level is the Ministry of Health's regulatory agency for medical activity.",
      "> MFM Georgia does not review individual complaints, but we do collect systemic information to improve standards.",
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function RightsPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { patientRights } = content(locale);

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
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-2xl">
              <ul className="space-y-4">
                {patientRights.map((r, i) => (
                  <li key={r} className="card flex items-start gap-4 p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed text-ink-700">{r}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Prose blocks={[...c.body]} />
              </div>
            </div>

            <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <div className="card bg-brand-50 p-6">
                <h2 className="text-base leading-snug">{c.asideTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.asideText}</p>
                <Link href="/patients/resources" className="btn btn-primary btn-sm mt-4 w-full">
                  <Icon name="download" size={15} />
                  {c.asideCta}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
