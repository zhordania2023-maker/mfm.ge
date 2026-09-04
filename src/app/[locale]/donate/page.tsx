import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { PageHeader, SectionHeading } from "@/components/ui/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";
import { IMG } from "@/content/images";

const copy = {
  ka: {
    eyebrow: "ფონდი MFM",
    title: "თქვენი მხარდაჭერა იქცევა ცოდნად და ზრუნვად",
    intro:
      "ფონდი დამოუკიდებელია და აფინანსებს იმას, რასაც საწევრო შენატანები ვერ ფარავს: რეგიონული სპეციალისტების გადამზადებას, კვლევით გრანტებსა და პაციენტთა მასალებს.",
    crumb: "ფონდი",
    metaTitle: "ფონდი MFM",
    metaDesc:
      "ფონდი აფინანსებს სპეციალისტების გადამზადებას, კვლევებსა და რეგიონული ცენტრების აღჭურვას.",
    donateCta: "შემოწირულობა",
    reportCta: "როგორ იხარჯება",
    impactEyebrow: "გავლენა",
    impactTitle: "რას ცვლის კონკრეტული თანხა",
    spendTitle: "სად მიდის სახსრები",
    spendText:
      "ფონდის ხარჯვა ყოველწლიურად აუდიტდება და ქვეყნდება წლიურ ანგარიშში. ადმინისტრაციული ხარჯი არ აღემატება 12%-ს.",
    finalTitle: "გსურთ მხარდაჭერა?",
    finalText:
      "ერთჯერადი ან რეგულარული შემოწირულობისთვის, ასევე კორპორაციული პარტნიორობისთვის დაგვიკავშირდით — გამოგიგზავნით რეკვიზიტებსა და შემოწირულობის ხელშეკრულების პროექტს.",
    finalCta: "დაგვიკავშირდით",
    uses: [
      { amount: "50 ₾", t: "საინფორმაციო მასალები", d: "20 ბროშურის დაბეჭდვა და რეგიონულ კლინიკაში მიწოდება." },
      { amount: "250 ₾", t: "ერთი ექიმის მონაწილეობა", d: "რეგიონული სპეციალისტის მონაწილეობა სიმულაციურ ტრენინგში." },
      { amount: "1 200 ₾", t: "სამოგზაურო გრანტი", d: "რეზიდენტის მონაწილეობა გლობალურ კონგრესში — რეგისტრაცია და ღამისთევა." },
      { amount: "12 000 ₾", t: "კვლევითი გრანტი", d: "ერთი წლიური გრანტი ახალგაზრდა მკვლევრის პროექტისთვის." },
    ],
    priorities: [
      { t: "რეგიონული გადამზადება", d: "ტრენინგები იმ დაწესებულებებში, სადაც ბიუჯეტი საკუთარი პროგრამებისთვის არ არის.", pct: 42 },
      { t: "კვლევითი გრანტები", d: "ახალგაზრდა მკვლევართა საწყისი პროექტები.", pct: 28 },
      { t: "პაციენტთა მასალები", d: "ბროშურების შემუშავება, თარგმნა და ბეჭდვა.", pct: 18 },
      { t: "ადმინისტრირება", d: "ფონდის მართვისა და აუდიტის ხარჯები.", pct: 12 },
    ],
  },
  en: {
    eyebrow: "MFM Foundation",
    title: "Your support becomes knowledge and care",
    intro:
      "The foundation is independent and funds what membership dues cannot cover: training regional specialists, research grants and patient materials.",
    crumb: "Foundation",
    metaTitle: "MFM Foundation",
    metaDesc:
      "The foundation funds specialist training, research and equipment for regional centres.",
    donateCta: "Donate",
    reportCta: "How the money is spent",
    impactEyebrow: "Impact",
    impactTitle: "What a specific amount changes",
    spendTitle: "Where the money goes",
    spendText:
      "The foundation's spending is audited annually and published in the annual report. Administrative costs do not exceed 12%.",
    finalTitle: "Would you like to support us?",
    finalText:
      "For a one-off or regular donation, or for corporate partnership, get in touch — we will send you the bank details and a draft donation agreement.",
    finalCta: "Get in touch",
    uses: [
      { amount: "50 GEL", t: "Information materials", d: "Printing 20 leaflets and delivering them to a regional clinic." },
      { amount: "250 GEL", t: "One clinician's place", d: "A regional specialist's place on a simulation training course." },
      { amount: "1,200 GEL", t: "Travel grant", d: "A resident's attendance at the global congress — registration and accommodation." },
      { amount: "12,000 GEL", t: "Research grant", d: "One annual grant for a young investigator's project." },
    ],
    priorities: [
      { t: "Regional training", d: "Training at facilities that have no budget of their own for it.", pct: 42 },
      { t: "Research grants", d: "First projects by young investigators.", pct: 28 },
      { t: "Patient materials", d: "Developing, translating and printing leaflets.", pct: 18 },
      { t: "Administration", d: "The cost of running and auditing the foundation.", pct: 12 },
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.metaTitle, description: c.metaDesc };
}

export default async function DonatePage({ params }: LocaleParams) {
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
        tone="brand"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="btn bg-white text-brand-900 hover:bg-brand-100">
            <Icon name="heart" size={16} />
            {c.donateCta}
          </Link>
          <Link
            href="/about/reports"
            className="btn border border-white/25 text-white hover:bg-white/10"
          >
            {c.reportCta}
          </Link>
        </div>
      </PageHeader>

      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow={c.impactEyebrow} title={c.impactTitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.uses.map((u) => (
              <div key={u.amount} className="card p-6">
                <p className="text-xl font-bold text-brand-700">{u.amount}</p>
                <h3 className="mt-3 text-[1rem] leading-snug">{u.t}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">{u.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-300 py-20">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem]">
              <Image
                src={IMG.community}
                alt=""
                fill
                sizes="(min-width:1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-[1.75rem] sm:text-[2.125rem]">{c.spendTitle}</h2>
              <p className="mt-4 leading-relaxed text-ink-600">{c.spendText}</p>
              <ul className="mt-8 space-y-5">
                {c.priorities.map((p) => (
                  <li key={p.t}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-ink-900">{p.t}</span>
                      <span className="text-sm font-bold text-brand-700">{p.pct}%</span>
                    </div>
                    <p className="mt-1 text-[0.875rem] text-ink-600">{p.d}</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-brand-600"
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="card mx-auto max-w-2xl p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <Icon name="heart" size={26} />
            </span>
            <h2 className="mt-6 text-2xl">{c.finalTitle}</h2>
            <p className="mt-3 leading-relaxed text-ink-600">{c.finalText}</p>
            <Link href="/contact" className="btn btn-primary btn-lg mt-7">
              {c.finalCta}
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
