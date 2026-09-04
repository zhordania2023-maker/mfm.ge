import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "პრაქტიკის მართვა",
    title: "კოდირება და ანაზღაურება",
    intro:
      "სწორი დოკუმენტირება არა მხოლოდ ანაზღაურების, არამედ პაციენტის უსაფრთხოებისა და ხარისხის აუდიტის საკითხიცაა. ეს განყოფილება აერთიანებს პრაქტიკულ რესურსებს.",
    parent: "ექიმებისთვის",
    crumb: "კოდირება",
    metaDesc:
      "პრაქტიკული რესურსები სამედიცინო მომსახურების კოდირებისა და სადაზღვევო ანაზღაურების საკითხებზე.",
    toolsTitle: "ინსტრუმენტები",
    askCta: "კითხვის დასმა",
    tools: ["დოკუმენტირების საკონტროლო ფურცელი", "ტიპური ჩანაწერის შაბლონი", "ხშირი კითხვები (PDF)"],
    topics: [
      { t: "სამეანო ულტრაბგერითი კვლევები", d: "პირველი და მეორე ტრიმესტრის სკრინინგის, დოპლეროგრაფიისა და ბიოფიზიკური პროფილის კოდირება." },
      { t: "მაღალი რისკის ვიზიტები", d: "გახშირებული ანტენატალური ვიზიტების დოკუმენტირება და დასაბუთება." },
      { t: "სტაციონარული მართვა", d: "ჰოსპიტალიზაციის დღეების, ინტენსიური მონიტორინგისა და პროცედურების აღრიცხვა." },
      { t: "ტელემედიცინის კონსულტაცია", d: "დისტანციური კონსულტაციის დოკუმენტირების მოთხოვნები და ანაზღაურების პირობები." },
    ],
    body: [
      "## დოკუმენტირების პრინციპები",
      "- ჩანაწერი უნდა ასახავდეს, რა გაკეთდა და რატომ — არა მხოლოდ დასკვნას",
      "- გადახვევა სტანდარტიდან უნდა იყოს დასაბუთებული ჩანაწერში",
      "- ულტრაბგერითი კვლევის შემთხვევაში აუცილებელია გამოსახულებების არქივირება",
      "- პაციენტის ინფორმირებული თანხმობა უნდა იყოს დოკუმენტირებული",
      "## ხშირი შეცდომები",
      "ყველაზე ხშირი მიზეზი, რის გამოც ანაზღაურება ჭიანურდება, არის არასრული დოკუმენტაცია — კერძოდ, ჩვენების დასაბუთების არარსებობა გახშირებული კვლევებისთვის.",
      "> ეს მასალები საინფორმაციო ხასიათისაა. საბოლოო გადაწყვეტილება ანაზღაურებაზე მიიღება დამზღვევის მიერ, მოქმედი ხელშეკრულების საფუძველზე.",
    ],
  },
  en: {
    eyebrow: "Practice management",
    title: "Coding and reimbursement",
    intro:
      "Good documentation is not only about getting paid — it is also a patient safety and quality audit issue. This section collects practical resources.",
    parent: "For clinicians",
    crumb: "Coding",
    metaDesc:
      "Practical resources on coding medical services and working with insurers on reimbursement.",
    toolsTitle: "Tools",
    askCta: "Ask a question",
    tools: ["Documentation checklist", "Standard record template", "FAQ (PDF)"],
    topics: [
      { t: "Obstetric ultrasound", d: "Coding first- and second-trimester screening, Doppler studies and the biophysical profile." },
      { t: "High-risk visits", d: "Documenting and justifying increased antenatal visit frequency." },
      { t: "Inpatient management", d: "Recording hospital days, intensive monitoring and procedures." },
      { t: "Telehealth consultation", d: "Documentation requirements and the conditions for reimbursement." },
    ],
    body: [
      "## Principles of documentation",
      "- The record should show what was done and why — not just the conclusion",
      "- Any departure from the standard should be justified in the record",
      "- For ultrasound, images must be archived",
      "- The patient's informed consent must be documented",
      "## Common mistakes",
      "The most frequent reason reimbursement is delayed is incomplete documentation — specifically, no justification recorded for increased frequency of investigations.",
      "> These materials are informational. The final reimbursement decision rests with the insurer under the applicable contract.",
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function CodingPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.parent, href: "/guidelines" }, { label: c.crumb }]}
      />

      <section className="pb-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-2xl">
              <div className="grid gap-4 sm:grid-cols-2">
                {c.topics.map((topic) => (
                  <div key={topic.t} className="card p-5">
                    <h2 className="text-[1rem] leading-snug">{topic.t}</h2>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">{topic.d}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Prose blocks={[...c.body]} />
              </div>
            </div>

            <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <div className="card p-5">
                <p className="text-sm font-bold text-ink-900">{c.toolsTitle}</p>
                <div className="mt-4 space-y-2">
                  {c.tools.map((d) => (
                    <button
                      key={d}
                      className="btn btn-outline btn-sm w-full justify-start text-left"
                    >
                      <Icon name="download" size={15} />
                      {d}
                    </button>
                  ))}
                </div>
                <Link href="/contact" className="btn btn-primary btn-sm mt-5 w-full">
                  {c.askCta}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
