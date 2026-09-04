import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { content } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "პაციენტებისთვის",
    title: "მაღალი რისკის ორსულობა — რა უნდა იცოდეთ",
    intro:
      "თუ ექიმმა თქვა, რომ თქვენი ორსულობა „მაღალი რისკისაა“, ეს არ ნიშნავს, რომ რაღაც აუცილებლად ცუდად წავა. ეს ნიშნავს, რომ ორსულობას სჭირდება უფრო ხშირი და ყურადღებიანი დაკვირვება.",
    parent: "პაციენტებისთვის",
    crumb: "მაღალი რისკის ორსულობა",
    metaDesc:
      "რას ნიშნავს მაღალი რისკის ორსულობა, რა ფაქტორები განაპირობებს მას და რას უნდა ელოდოთ — პაციენტებისთვის გასაგებ ენაზე.",
    related: "დაკავშირებული",
    factorsTitle: "რა ფაქტორები განაპირობებს მაღალ რისკს",
    factorsIntro:
      "ქვემოთ ჩამოთვლილია ყველაზე ხშირი ფაქტორები. მათი არსებობა არ ნიშნავს გართულებას — ეს უბრალოდ ნიშნავს, რომ ექიმი უფრო ყურადღებით დააკვირდება.",
    links: [
      { l: "სპეციალისტის მოძებნა", h: "/patients/find-specialist" },
      { l: "საინფორმაციო ბროშურები", h: "/patients/resources" },
      { l: "პაციენტის უფლებები", h: "/patients/rights" },
      { l: "ხშირი კითხვები", h: "/patients/faq" },
    ],
    body: [
      "## რას ნიშნავს ეს ტერმინი",
      "„მაღალი რისკის ორსულობა“ სამედიცინო კატეგორიაა, რომელიც განსაზღვრავს დაკვირვების ინტენსივობას — არა შედეგს. მაღალი რისკის ორსულობათა უმეტესობა მთავრდება ჯანმრთელი ბავშვის დაბადებით.",
      "პრაქტიკაში ეს, როგორც წესი, ნიშნავს: უფრო ხშირ ვიზიტებს, დამატებით ულტრაბგერით კვლევებს, ზოგჯერ დამატებით ანალიზებს და კონსულტაციას პერინატოლოგთან — ექიმთან, რომელმაც გაიარა დამატებითი მომზადება რთული ორსულობების მართვაში.",
      "## რას ნიშნავს პრაქტიკაში",
      "- ვიზიტების სიხშირე შეიძლება გაიზარდოს ორ კვირაში ერთხელამდე ან უფრო ხშირადაც",
      "- შესაძლოა დაგჭირდეთ დამატებითი ულტრაბგერითი კვლევები ნაყოფის ზრდის შესაფასებლად",
      "- ზოგიერთ შემთხვევაში რეკომენდებულია მშობიარობა კონკრეტული დონის ცენტრში",
      "- მშობიარობის ვადა შეიძლება წინასწარ დაიგეგმოს",
      "## კითხვები, რომლებიც ღირს დასვათ",
      "- რატომ ითვლება ჩემი ორსულობა მაღალი რისკისად?",
      "- რა კონკრეტული რისკები არსებობს ჩემს შემთხვევაში?",
      "- რამდენად ხშირად უნდა მოვიდე ვიზიტზე?",
      "- რომელ ნიშნებზე უნდა გავამახვილო ყურადღება სახლში?",
      "- სად ვიმშობიარებ და რატომ?",
      "- შემიძლია მეორე აზრის მიღება?",
    ],
  },
  en: {
    eyebrow: "For patients",
    title: "High-risk pregnancy — what you need to know",
    intro:
      "If your doctor has said your pregnancy is “high risk”, it does not mean something will inevitably go wrong. It means the pregnancy needs closer, more frequent monitoring.",
    parent: "For patients",
    crumb: "High-risk pregnancy",
    metaDesc:
      "What a high-risk pregnancy means, what causes it and what to expect — written for patients in plain language.",
    related: "Related",
    factorsTitle: "What makes a pregnancy high risk",
    factorsIntro:
      "The most common factors are listed below. Having one does not mean a complication is coming — it simply means your doctor will watch more closely.",
    links: [
      { l: "Find a specialist", h: "/patients/find-specialist" },
      { l: "Information leaflets", h: "/patients/resources" },
      { l: "Patient rights", h: "/patients/rights" },
      { l: "FAQ", h: "/patients/faq" },
    ],
    body: [
      "## What the term means",
      "“High-risk pregnancy” is a medical category that determines how intensively you are monitored — not the outcome. Most high-risk pregnancies end with a healthy baby.",
      "In practice it usually means more frequent appointments, additional ultrasound scans, sometimes extra blood tests, and a consultation with a perinatologist — a doctor with additional training in complex pregnancies.",
      "## What it means day to day",
      "- Appointments may increase to fortnightly or more often",
      "- You may need extra scans to assess fetal growth",
      "- In some cases birth is recommended at a particular level of centre",
      "- The timing of birth may be planned in advance",
      "## Questions worth asking",
      "- Why is my pregnancy considered high risk?",
      "- What specific risks apply in my case?",
      "- How often should I be seen?",
      "- Which signs should I watch for at home?",
      "- Where will I give birth, and why?",
      "- Can I get a second opinion?",
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function HighRiskPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { highRiskFactors } = content(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.parent, href: "/patients" }, { label: c.crumb }]}
      />

      <section className="pb-16">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-2xl">
              <Prose blocks={[...c.body]} />
            </div>

            <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <div className="card p-5">
                <p className="text-sm font-bold text-ink-900">{c.related}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {c.links.map((x) => (
                    <li key={x.h}>
                      <Link
                        href={x.h}
                        className="flex items-center gap-2 text-brand-700 transition hover:underline"
                      >
                        <Icon name="arrow-right" size={14} />
                        {x.l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-cream-300 py-20">
        <div className="container-x">
          <h2 className="text-[1.75rem]">{c.factorsTitle}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">{c.factorsIntro}</p>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {highRiskFactors.map((g) => (
              <div key={g.group} className="card p-6">
                <h3 className="text-[1.0625rem]">{g.group}</h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[0.875rem] text-ink-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
