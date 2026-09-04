import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "განათლება",
    title: "სიმულაციური ტრენინგები",
    intro:
      "გადაუდებელი სამეანო მდგომარეობები იშვიათია — და სწორედ ამიტომ საჭიროებს ვარჯიშს. ტრენინგები ტარდება სრული გუნდით: ექიმი, ბებიაქალი, ანესთეზიოლოგი, ნეონატოლოგი.",
    parent: "განათლება",
    crumb: "სიმულაცია",
    metaDesc:
      "მაღალი რეალიზმის სიმულაციური ტრენინგები გადაუდებელ სამეანო მდგომარეობებში — გუნდური სცენარები, დებრიფინგი და შეფასება.",
    methodTitle: "მეთოდოლოგია",
    scenariosTitle: "სცენარების ბანკი",
    scenariosText:
      "თითოეული სცენარი ვალიდირებულია სამუშაო ჯგუფის მიერ და მოიცავს დეტალურ ინსტრუქციას ინსტრუქტორისთვის, შეფასების ფურცელსა და დებრიფინგის გზამკვლევს.",
    onsiteTitle: "ადგილზე ჩატარება თქვენს კლინიკაში",
    onsiteText:
      "ინსტიტუციური წევრობის ფარგლებში წელიწადში ერთი ტრენინგი ტარდება თქვენს დაწესებულებაში — თქვენივე გუნდით და თქვენივე აღჭურვილობით.",
    onsiteCta: "განაცხადის გაგზავნა",
    method: [
      { n: "01", t: "ბრიფინგი", d: "სცენარის კონტექსტი, აღჭურვილობის გაცნობა, ფსიქოლოგიური უსაფრთხოება." },
      { n: "02", t: "სცენარი", d: "რეალურ დროში, სრული გუნდით, მაღალი რეალიზმის მანეკენზე." },
      { n: "03", t: "დებრიფინგი", d: "სტრუქტურირებული განხილვა — რა მოხდა, რატომ, რა გავაუმჯობესოთ." },
      { n: "04", t: "გამეორება", d: "იმავე ან მოდიფიცირებული სცენარის ხელახლა გათამაშება." },
    ],
    scenarios: [
      { t: "მშობიარობის შემდგომი სისხლდენა", d: "ატონია, ტრავმა, ნარჩენები — საფეხურებრივი მართვა და მასიური ტრანსფუზიის პროტოკოლი." },
      { t: "ეკლამფსიური კრუნჩხვა", d: "სასუნთქი გზების უზრუნველყოფა, მაგნეზიუმის სულფატი, მშობიარობის დაგეგმვა." },
      { t: "მხრების დისტოცია", d: "მანევრების თანმიმდევრობა, დროის კონტროლი, გუნდური კომუნიკაცია." },
      { t: "ჭიპლარის გამოვარდნა", d: "დაუყოვნებელი მოქმედება, პოზიციონირება, გადაუდებელი კვეთა." },
      { t: "სამეანო სეფსისი", d: "ადრეული ამოცნობა, „ერთი საათის“ პაკეტი, ესკალაცია." },
      { t: "ახალშობილის რეანიმაცია", d: "ალგორითმი, ვენტილაცია, გუნდური როლების განაწილება." },
    ],
  },
  en: {
    eyebrow: "Education",
    title: "Simulation training",
    intro:
      "Obstetric emergencies are rare — which is exactly why they need rehearsing. Training runs with the full team: obstetrician, midwife, anaesthetist, neonatologist.",
    parent: "Education",
    crumb: "Simulation",
    metaDesc:
      "High-fidelity simulation training in obstetric emergencies — team scenarios, debriefing and assessment.",
    methodTitle: "Method",
    scenariosTitle: "Scenario bank",
    scenariosText:
      "Every scenario is validated by the working group and comes with detailed instructor notes, an assessment sheet and a debriefing guide.",
    onsiteTitle: "Delivered on site at your unit",
    onsiteText:
      "Institutional membership includes one training session a year at your own facility — with your team and your equipment.",
    onsiteCta: "Request a session",
    method: [
      { n: "01", t: "Briefing", d: "Scenario context, equipment orientation, psychological safety." },
      { n: "02", t: "Scenario", d: "In real time, with the full team, on a high-fidelity manikin." },
      { n: "03", t: "Debriefing", d: "A structured discussion — what happened, why, what to improve." },
      { n: "04", t: "Repeat", d: "Running the same or a modified scenario again." },
    ],
    scenarios: [
      { t: "Postpartum haemorrhage", d: "Atony, trauma, retained tissue — stepwise management and the massive transfusion protocol." },
      { t: "Eclamptic seizure", d: "Airway management, magnesium sulphate, planning delivery." },
      { t: "Shoulder dystocia", d: "Sequence of manoeuvres, time management, team communication." },
      { t: "Cord prolapse", d: "Immediate action, positioning, emergency caesarean." },
      { t: "Obstetric sepsis", d: "Early recognition, the one-hour bundle, escalation." },
      { t: "Newborn resuscitation", d: "The algorithm, ventilation, allocating team roles." },
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function SimulationPage({ params }: LocaleParams) {
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

      <section className="pb-16">
        <div className="container-x">
          <h2 className="text-2xl">{c.methodTitle}</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.method.map((m) => (
              <div key={m.n} className="card p-6">
                <p className="text-2xl font-bold text-brand-200">{m.n}</p>
                <h3 className="mt-2 text-[1.0625rem]">{m.t}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-300 py-20">
        <div className="container-x">
          <h2 className="text-2xl">{c.scenariosTitle}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">{c.scenariosText}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.scenarios.map((s) => (
              <div key={s.t} className="card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Icon name="stethoscope" size={18} />
                </span>
                <h3 className="mt-4 text-[1.0625rem] leading-snug">{s.t}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <div className="card flex flex-col items-start gap-5 bg-brand-50 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl">{c.onsiteTitle}</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-600">{c.onsiteText}</p>
            </div>
            <Link href="/contact" className="btn btn-primary shrink-0">
              {c.onsiteCta}
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
