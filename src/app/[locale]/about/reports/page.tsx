import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { t } from "@/i18n/ui";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "გამჭვირვალობა",
    title: "წლიური ანგარიშები",
    intro:
      "ყოველწლიურად ვაქვეყნებთ საქმიანობისა და ფინანსურ ანგარიშს — რას გავაკეთეთ, რა დაგვიჯდა და საიდან მოვიდა სახსრები.",
    parent: "ჩვენს შესახებ",
    crumb: "ანგარიშები",
    metaDesc: "MFM საქართველოს საქმიანობისა და ფინანსური ანგარიშები.",
    pagesWord: "გვერდი",
    financeTitle: "შემოსავლების სტრუქტურა · 2025",
    financeText:
      "საზოგადოება არ იღებს დაფინანსებას ფარმაცევტული კომპანიებისგან კონკრეტული გაიდლაინის შემუშავებისთვის.",
    reports: [
      { year: 2025, title: "წლიური ანგარიში 2025", pages: 44, highlights: ["9 რეგიონული ცენტრი", "14 CME კურსი", "6 ახალი გაიდლაინი"] },
      { year: 2024, title: "წლიური ანგარიში 2024", pages: 38, highlights: ["ქსელის ამოქმედება", "1 040 კონსულტაცია", "420 წევრი"] },
      { year: 2023, title: "წლიური ანგარიში 2023", pages: 32, highlights: ["აუდიტის მეორე ციკლი", "11 კურსი", "პირველი ტელემედიცინის პილოტი"] },
      { year: 2022, title: "წლიური ანგარიში 2022", pages: 30, highlights: ["გაიდლაინების რევიზია", "კონგრესი 480 მონაწილით"] },
    ],
    finances: [
      { label: "საწევრო შენატანები", pct: 34 },
      { label: "ღონისძიებები და კურსები", pct: 28 },
      { label: "საგრანტო დაფინანსება", pct: 26 },
      { label: "შემოწირულობები", pct: 12 },
    ],
  },
  en: {
    eyebrow: "Transparency",
    title: "Annual reports",
    intro:
      "Every year we publish an activity and financial report — what we did, what it cost and where the money came from.",
    parent: "About us",
    crumb: "Reports",
    metaDesc: "MFM Georgia activity and financial reports.",
    pagesWord: "pages",
    financeTitle: "Income structure · 2025",
    financeText:
      "The society does not accept funding from pharmaceutical companies for the development of any specific guideline.",
    reports: [
      { year: 2025, title: "Annual report 2025", pages: 44, highlights: ["9 regional centres", "14 CME courses", "6 new guidelines"] },
      { year: 2024, title: "Annual report 2024", pages: 38, highlights: ["Network launched", "1,040 consultations", "420 members"] },
      { year: 2023, title: "Annual report 2023", pages: 32, highlights: ["Second audit cycle", "11 courses", "First telehealth pilot"] },
      { year: 2022, title: "Annual report 2022", pages: 30, highlights: ["Guideline revision", "Congress with 480 participants"] },
    ],
    finances: [
      { label: "Membership dues", pct: 34 },
      { label: "Events and courses", pct: 28 },
      { label: "Grant funding", pct: 26 },
      { label: "Donations", pct: 12 },
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function ReportsPage({ params }: LocaleParams) {
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
        crumbs={[{ label: c.parent, href: "/about" }, { label: c.crumb }]}
      />

      <section className="pb-16">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2">
            {c.reports.map((r) => (
              <article key={r.year} className="card card-hover p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg">{r.title}</h2>
                    <p className="mt-1 text-xs text-ink-500">
                      PDF · {r.pages} {c.pagesWord}
                    </p>
                  </div>
                  <span className="badge bg-brand-100 text-brand-800">{r.year}</span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {r.highlights.map((h) => (
                    <li key={h} className="badge bg-cream-200 text-ink-600">
                      {h}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-outline btn-sm mt-5 w-full">
                  <Icon name="download" size={15} />
                  {dict.common.download}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x">
          <div className="card p-7">
            <h2 className="text-xl">{c.financeTitle}</h2>
            <p className="mt-2 text-sm text-ink-600">{c.financeText}</p>
            <ul className="mt-7 space-y-4">
              {c.finances.map((f) => (
                <li key={f.label}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium text-ink-800">{f.label}</span>
                    <span className="font-bold text-brand-700">{f.pct}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-cream-300">
                    <div
                      className="h-full rounded-full bg-brand-600"
                      style={{ width: `${f.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
