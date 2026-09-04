import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "გამჭვირვალობა",
    title: "ინტერესთა კონფლიქტის პოლიტიკა",
    intro:
      "ნდობა სტანდარტის მიმართ იწყება იმით, თუ ვინ და როგორ შექმნა ის. ჩვენი პოლიტიკა განსაზღვრავს, როგორ ვმართავთ პოტენციურ ინტერესთა კონფლიქტს.",
    parent: "ჩვენს შესახებ",
    crumb: "ინტერესთა კონფლიქტი",
    metaDesc:
      "MFM საქართველოს ინტერესთა კონფლიქტის დეკლარაციის პოლიტიკა და გამჭვირვალობის სტანდარტი.",
    rulesTitle: "ძირითადი წესები",
    docsTitle: "დოკუმენტები",
    rules: [
      "ყველა ავტორი და რეცენზენტი ავსებს დეკლარაციას გაიდლაინზე მუშაობის დაწყებამდე.",
      "დეკლარაცია მოიცავს ბოლო 36 თვის ფინანსურ და არაფინანსურ ინტერესებს.",
      "სამუშაო ჯგუფის თავმჯდომარეს არ უნდა ჰქონდეს რელევანტური ფინანსური ინტერესი.",
      "ჯგუფის წევრთა 50%-ზე მეტს არ უნდა ჰქონდეს რელევანტური ინტერესი.",
      "დეკლარაციები ქვეყნდება გაიდლაინის დანართში, სრული სახით.",
      "ინტერესის მქონე წევრი გამოეთიშება შესაბამისი რეკომენდაციის ხმის მიცემას.",
    ],
    docs: ["დეკლარაციის ფორმა (PDF)", "ეთიკის კოდექსი (PDF)", "გაიდლაინების მეთოდოლოგია (PDF)"],
    body: [
      "## რა ითვლება ინტერესად",
      "ფინანსური ინტერესი მოიცავს: ჰონორარს კონსულტაციისთვის, სალექციო ანაზღაურებას, კვლევით დაფინანსებას, აქციებს ან წილს კომპანიაში, პატენტს, ასევე მოგზაურობის ხარჯების ანაზღაურებას.",
      "არაფინანსური ინტერესი მოიცავს: ავტორობას გამოქვეყნებულ ნაშრომზე, რომელიც პირდაპირ უკავშირდება განსახილველ საკითხს, ან ხელმძღვანელობით პოზიციას ორგანიზაციაში, რომელსაც აქვს გამოხატული პოზიცია.",
      "## პროცედურა",
      "დეკლარაციები განიხილება ეთიკის კომიტეტის მიერ. თუ დაფიქსირდა მნიშვნელოვანი კონფლიქტი, წევრი შეიძლება გამოეთიშოს კონკრეტულ განხილვას ან, საჭიროების შემთხვევაში, სამუშაო ჯგუფს მთლიანად.",
      "## საჩივარი",
      "თუ მიგაჩნიათ, რომ დეკლარაცია არასრულია ან კონფლიქტი სათანადოდ არ იმართება, შეგიძლიათ მოგვმართოთ წერილობით. ყველა მიმართვა განიხილება 30 დღის განმავლობაში.",
    ],
  },
  en: {
    eyebrow: "Transparency",
    title: "Conflict of interest policy",
    intro:
      "Trust in a standard starts with who wrote it and how. Our policy sets out how we manage potential conflicts of interest.",
    parent: "About us",
    crumb: "Conflicts of interest",
    metaDesc:
      "MFM Georgia's conflict of interest disclosure policy and transparency standard.",
    rulesTitle: "The core rules",
    docsTitle: "Documents",
    rules: [
      "Every author and reviewer completes a declaration before work on a guideline begins.",
      "The declaration covers financial and non-financial interests from the past 36 months.",
      "The chair of a working group must have no relevant financial interest.",
      "No more than 50% of a group's members may hold a relevant interest.",
      "Declarations are published in full in the guideline's appendix.",
      "A member with an interest is recused from voting on the relevant recommendation.",
    ],
    docs: ["Declaration form (PDF)", "Code of ethics (PDF)", "Guideline methodology (PDF)"],
    body: [
      "## What counts as an interest",
      "Financial interests include consulting fees, speaker honoraria, research funding, shares or a stake in a company, patents, and reimbursement of travel expenses.",
      "Non-financial interests include authorship of a published paper directly related to the question under discussion, or a leadership role in an organisation with a declared position.",
      "## Procedure",
      "Declarations are reviewed by the ethics committee. Where a significant conflict is identified, the member may be recused from a particular discussion or, if necessary, from the working group entirely.",
      "## Complaints",
      "If you believe a declaration is incomplete or a conflict is not being managed properly, write to us. Every complaint is reviewed within 30 days.",
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function DisclosuresPage({ params }: LocaleParams) {
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
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-2xl">
              <h2 className="text-2xl">{c.rulesTitle}</h2>
              <ul className="mt-6 space-y-4">
                {c.rules.map((r) => (
                  <li key={r} className="flex gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                      <Icon name="check" size={13} strokeWidth={2.4} />
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
              <div className="card p-5">
                <p className="text-sm font-bold text-ink-900">{c.docsTitle}</p>
                <div className="mt-4 space-y-2">
                  {c.docs.map((d) => (
                    <button
                      key={d}
                      className="btn btn-outline btn-sm w-full justify-start text-left"
                    >
                      <Icon name="download" size={15} />
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
