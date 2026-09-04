import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { t } from "@/i18n/ui";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "პრაქტიკის მართვა",
    title: "ხარისხი და პაციენტის უსაფრთხოება",
    intro:
      "სტანდარტი მუშაობს მაშინ, როცა ის იზომება. ეს გვერდი აერთიანებს ინდიკატორებს, ინსტრუმენტებსა და მასალებს, რომლებიც კლინიკას ეხმარება საკუთარი პრაქტიკის შეფასებაში.",
    parent: "ექიმებისთვის",
    crumb: "ხარისხი",
    metaDesc:
      "აუდიტის ინდიკატორები, საკონტროლო ფურცლები და ხარისხის გაუმჯობესების ინსტრუმენტები სამშობიარო დაწესებულებებისთვის.",
    indicatorsTitle: "ეროვნული ინდიკატორები · 2025",
    indicatorsText: "მონაცემები ეყრდნობა 24 პარტნიორი დაწესებულების ანონიმიზებულ ანგარიშებს.",
    colIndicator: "ინდიკატორი",
    colTarget: "სამიზნე",
    colCurrent: "მიმდინარე",
    toolsTitle: "ინსტრუმენტები",
    auditTitle: "ჩაერთეთ ეროვნულ აუდიტში",
    auditText:
      "მონაწილე დაწესებულებები იღებენ საკუთარი მაჩვენებლების ანალიზს ეროვნულ საშუალოსთან შედარებით — ანონიმურად და უფასოდ.",
    auditCta: "განაცხადი",
    indicators: [
      { i: "MEOWS-ის დანერგვა", target: "100%", now: "41%" },
      { i: "მასიური სისხლდენის სავარჯიშო (კვარტალში)", target: "1", now: "0.4" },
      { i: "სისხლის დანაკარგის რაოდენობრივი შეფასება", target: "100%", now: "62%" },
      { i: "ანტიბიოტიკოპროფილაქტიკა კვეთამდე 60 წთ", target: "≥ 95%", now: "88%" },
      { i: "ცერვიკომეტრია ჩვენებისას", target: "≥ 90%", now: "71%" },
      { i: "in utero ტრანსპორტირება < 32 კვ.", target: "≥ 80%", now: "58%" },
    ],
    tools: [
      { t: "MEOWS ფურცელი", d: "დედის ადრეული გამაფრთხილებელი სისტემა, A4 ბეჭდვისთვის." },
      { t: "საკეისრო კვეთის საკონტროლო ფურცელი", d: "Sign in / time out / sign out ეტაპებით." },
      { t: "PPH პროტოკოლის პლაკატი", d: "საფეხურებრივი ალგორითმი სამშობიარო ბლოკისთვის." },
      { t: "აუდიტის შეფასების ფურცელი", d: "ულტრაბგერითი კვლევების ხარისხის შიდა კონტროლისთვის." },
    ],
  },
  en: {
    eyebrow: "Practice management",
    title: "Quality and patient safety",
    intro:
      "A standard works when it is measured. This page gathers the indicators, tools and materials that help a unit assess its own practice.",
    parent: "For clinicians",
    crumb: "Quality",
    metaDesc:
      "Audit indicators, checklists and quality improvement tools for maternity units.",
    indicatorsTitle: "National indicators · 2025",
    indicatorsText: "Data from the anonymised returns of 24 partner facilities.",
    colIndicator: "Indicator",
    colTarget: "Target",
    colCurrent: "Current",
    toolsTitle: "Tools",
    auditTitle: "Join the national audit",
    auditText:
      "Participating facilities receive an analysis of their own figures against the national average — anonymously and free of charge.",
    auditCta: "Apply",
    indicators: [
      { i: "MEOWS implementation", target: "100%", now: "41%" },
      { i: "Massive haemorrhage drill (per quarter)", target: "1", now: "0.4" },
      { i: "Quantitative blood loss measurement", target: "100%", now: "62%" },
      { i: "Antibiotic prophylaxis within 60 min of incision", target: "≥ 95%", now: "88%" },
      { i: "Cervical length measured when indicated", target: "≥ 90%", now: "71%" },
      { i: "In-utero transfer < 32 wk", target: "≥ 80%", now: "58%" },
    ],
    tools: [
      { t: "MEOWS chart", d: "The modified early obstetric warning system, ready to print on A4." },
      { t: "Caesarean safety checklist", d: "With sign in / time out / sign out stages." },
      { t: "PPH protocol poster", d: "The stepwise algorithm for the delivery suite." },
      { t: "Audit assessment sheet", d: "For internal quality control of ultrasound examinations." },
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function QualityPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const dict = t(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.parent, href: "/guidelines" }, { label: c.crumb }]}
      />

      <section className="pb-16">
        <div className="container-x">
          <h2 className="text-2xl">{c.indicatorsTitle}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">{c.indicatorsText}</p>

          <div className="card mt-8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="border-b border-line bg-cream-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-ink-800">{c.colIndicator}</th>
                    <th className="px-6 py-4 font-semibold text-ink-800">{c.colTarget}</th>
                    <th className="px-6 py-4 font-semibold text-ink-800">{c.colCurrent}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.indicators.map((r) => (
                    <tr key={r.i} className="border-b border-line last:border-0">
                      <td className="px-6 py-4 text-ink-700">{r.i}</td>
                      <td className="px-6 py-4 font-semibold text-brand-700">{r.target}</td>
                      <td className="px-6 py-4 text-ink-600">{r.now}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-300 py-20">
        <div className="container-x">
          <h2 className="text-2xl">{c.toolsTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {c.tools.map((tool) => (
              <div key={tool.t} className="card flex items-start gap-4 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <Icon name="shield" size={19} />
                </span>
                <div className="flex-1">
                  <h3 className="text-[1rem] leading-snug">{tool.t}</h3>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600">{tool.d}</p>
                  <button className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    <Icon name="download" size={14} />
                    {dict.common.download}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="card mt-8 flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg">{c.auditTitle}</h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-600">{c.auditText}</p>
            </div>
            <Link href="/contact" className="btn btn-primary shrink-0">
              {c.auditCta}
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
