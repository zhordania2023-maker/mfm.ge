import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "განათლება",
    title: "პერინატოლოგიის ფელოუშიპი",
    intro:
      "24-თვიანი სტრუქტურირებული პროგრამა, რომელიც ამზადებს დედა-ნაყოფის მედიცინის დამოუკიდებელ სპეციალისტს. მიღება ტარდება წელიწადში ერთხელ, ოთხ ადგილზე.",
    parent: "განათლება",
    crumb: "ფელოუშიპი",
    metaDesc:
      "პერინატოლოგიის 24-თვიანი ფელოუშიპ-პროგრამა: სტრუქტურა, მოთხოვნები, როტაციები და განაცხადის პროცესი.",
    rotations: "როტაციების სტრუქტურა",
    month: "თვე",
    requirements: "მოთხოვნები",
    admissionTitle: "მიღება 2027",
    admissionText:
      "განაცხადების მიღება: 1 მარტი – 30 აპრილი. გასაუბრებები: მაისი. პროგრამის დაწყება: 1 სექტემბერი.",
    admissionCta: "ინფორმაციის მოთხოვნა",
    rows: [
      { m: "1–4", t: "სამეანო ულტრაბგერითი დიაგნოსტიკა", d: "სკრინინგი, ბიომეტრია, დოპლეროგრაფია" },
      { m: "5–8", t: "მაღალი რისკის ამბულატორია", d: "ქრონიკული დაავადებები ორსულობისას" },
      { m: "9–12", t: "სამშობიარო ბლოკი", d: "ინტრანატალური მართვა, გადაუდებელი მდგომარეობები" },
      { m: "13–16", t: "ნეონატოლოგია", d: "ახალშობილთა სტაბილიზაცია და ინტენსიური თერაპია" },
      { m: "17–20", t: "სამედიცინო გენეტიკა", d: "პრენატალური დიაგნოსტიკა და კონსულტირება" },
      { m: "21–24", t: "კვლევა და დამოუკიდებელი პრაქტიკა", d: "პროექტის დასრულება, გამოცდა" },
    ],
    reqs: [
      "დასრულებული რეზიდენტურა მეან-გინეკოლოგიაში",
      "მოქმედი სახელმწიფო სერტიფიკატი",
      "ორი სარეკომენდაციო წერილი",
      "ინგლისური ენის ცოდნა (სამეცნიერო ლიტერატურის კითხვის დონეზე)",
      "მოტივაციური წერილი და კვლევითი ინტერესის აღწერა",
    ],
    body: [
      "## შეფასება",
      "პროგრამის განმავლობაში ფელოუ აგროვებს პორტფოლიოს: ჩატარებული კვლევების ჟურნალი, კლინიკური შემთხვევების ლოგი და კვლევითი პროექტი. ყოველ ექვს თვეში ტარდება შუალედური შეფასება მენტორთან.",
      "საბოლოო გამოცდა მოიცავს სამ კომპონენტს: წერითი ტესტი, პრაქტიკული ულტრაბგერითი გამოცდა და კლინიკური შემთხვევების ზეპირი დაცვა.",
      "## კვლევითი კომპონენტი",
      "თითოეული ფელოუ ასრულებს ერთ დამოუკიდებელ კვლევით პროექტს. შედეგები წარდგენილი უნდა იქნეს გლობალურ კონგრესზე და, სასურველია, გამოქვეყნდეს რეცენზირებად ჟურნალში.",
    ],
  },
  en: {
    eyebrow: "Education",
    title: "Perinatology fellowship",
    intro:
      "A 24-month structured programme that trains an independent maternal-fetal medicine specialist. Admission runs once a year, for four places.",
    parent: "Education",
    crumb: "Fellowship",
    metaDesc:
      "The 24-month perinatology fellowship: structure, requirements, rotations and how to apply.",
    rotations: "Rotation structure",
    month: "months",
    requirements: "Requirements",
    admissionTitle: "Admission 2027",
    admissionText:
      "Applications: 1 March – 30 April. Interviews: May. Programme starts: 1 September.",
    admissionCta: "Request information",
    rows: [
      { m: "1–4", t: "Obstetric ultrasound", d: "Screening, biometry, Doppler" },
      { m: "5–8", t: "High-risk clinic", d: "Chronic conditions in pregnancy" },
      { m: "9–12", t: "Delivery suite", d: "Intrapartum management, emergencies" },
      { m: "13–16", t: "Neonatology", d: "Newborn stabilisation and intensive care" },
      { m: "17–20", t: "Medical genetics", d: "Prenatal diagnosis and counselling" },
      { m: "21–24", t: "Research and independent practice", d: "Completing the project, examination" },
    ],
    reqs: [
      "Completed residency in obstetrics and gynaecology",
      "A valid state certificate",
      "Two letters of recommendation",
      "English at a level sufficient to read scientific literature",
      "A motivation letter describing your research interests",
    ],
    body: [
      "## Assessment",
      "Throughout the programme the fellow builds a portfolio: a logbook of examinations performed, a clinical case log and a research project. An interim review with the mentor takes place every six months.",
      "The final examination has three components: a written test, a practical ultrasound examination and an oral defence of clinical cases.",
      "## Research component",
      "Each fellow completes one independent research project. The results must be presented at the global congress and, ideally, published in a peer-reviewed journal.",
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function FellowshipPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.parent, href: "/education" }, { label: c.crumb }]}
      />

      <section className="pb-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-2xl">
              <h2 className="text-2xl">{c.rotations}</h2>
              <ol className="mt-6 space-y-0">
                {c.rows.map((r) => (
                  <li key={r.m} className="flex gap-5 border-l-2 border-line py-4 pl-6">
                    <span className="w-20 shrink-0 text-sm font-bold text-brand-700">
                      {r.m} {c.month}
                    </span>
                    <span>
                      <span className="block font-semibold text-ink-900">{r.t}</span>
                      <span className="mt-1 block text-sm text-ink-600">{r.d}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-12">
                <Prose blocks={[...c.body]} />
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <div className="card p-6">
                <h2 className="text-base">{c.requirements}</h2>
                <ul className="mt-4 space-y-2.5">
                  {c.reqs.map((r) => (
                    <li
                      key={r}
                      className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-ink-600"
                    >
                      <Icon name="check" size={14} className="mt-0.5 shrink-0 text-brand-600" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card bg-brand-50 p-6">
                <p className="text-sm font-bold text-ink-900">{c.admissionTitle}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-600">{c.admissionText}</p>
                <Link href="/contact" className="btn btn-primary btn-sm mt-4 w-full">
                  {c.admissionCta}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
