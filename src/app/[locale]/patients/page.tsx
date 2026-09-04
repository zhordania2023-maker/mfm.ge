import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { PageHeader, SectionHeading } from "@/components/ui/PageHeader";
import { Icon, type IconName } from "@/components/ui/Icon";
import { content } from "@/content";
import { Accordion } from "@/components/ui/Accordion";
import { getLocale, pick, type LocaleParams } from "@/lib/page";
import { IMG } from "@/content/images";

const copy = {
  ka: {
    eyebrow: "პაციენტებისთვის",
    title: "სანდო ინფორმაცია — გასაგებ ენაზე",
    intro:
      "ჩვენ არ ვატარებთ კონსულტაციებს, მაგრამ ვამზადებთ მასალებს, რომლებიც დაგეხმარებათ ექიმთან საუბარში, გადაწყვეტილების მიღებასა და იმის გაგებაში, რა ხდება თქვენს ორსულობაში.",
    crumb: "პაციენტებისთვის",
    metaDesc:
      "სანდო ინფორმაცია ორსულობის, მაღალი რისკის ორსულობისა და სამედიცინო ზრუნვის შესახებ — მარტივ, გასაგებ ენაზე.",
    urgentBadge: "გადაუდებელი მდგომარეობა",
    urgentTitle: "როდის უნდა მიმართოთ ექიმს დაუყოვნებლივ",
    urgentText:
      "თუ გაქვთ რომელიმე ეს ნიშანი, დაუყოვნებლივ მიმართეთ სამედიცინო დაწესებულებას ან დარეკეთ 112-ზე. ნუ დაელოდებით დაგეგმილ ვიზიტს.",
    warning: [
      "ვაგინალური სისხლდენა",
      "ძლიერი, მუდმივი თავის ტკივილი",
      "მხედველობის დარღვევა ან „ბუშტუკები“ თვალწინ",
      "მუცლის ძლიერი ტკივილი",
      "სუნთქვის გაძნელება",
      "ნაყოფის მოძრაობის შემცირება ან შეწყვეტა",
      "სითხის უეცარი გადმოდინება",
      "მაღალი ცხელება",
    ],
    resourcesEyebrow: "რესურსები",
    resourcesTitle: "საიდან დავიწყოთ",
    faqEyebrow: "ხშირი კითხვები",
    faqTitle: "პასუხები, რომლებიც ხშირად გვჭირდება",
    faqCta: "ყველა კითხვა",
    cards: [
      { icon: "search", title: "სპეციალისტის მოძებნა", text: "იპოვეთ სერტიფიცირებული პერინატოლოგი ქალაქის, მიმართულებისა და კონსულტაციის ენის მიხედვით.", href: "/patients/find-specialist", cta: "ძიების დაწყება" },
      { icon: "baby", title: "მაღალი რისკის ორსულობა", text: "რას ნიშნავს ეს დიაგნოზი, რა ფაქტორები განაპირობებს მას და რას უნდა ელოდოთ.", href: "/patients/high-risk", cta: "წაკითხვა" },
      { icon: "download", title: "საინფორმაციო მასალები", text: "ჩამოსატვირთი ბროშურები — პრეეკლამფსია, ტყუპები, გესტაციური დიაბეტი და სხვა.", href: "/patients/resources", cta: "მასალების ნახვა" },
      { icon: "shield", title: "პაციენტის უფლებები", text: "რა უფლებები გაქვთ სამედიცინო მომსახურების მიღებისას და როგორ დაიცვათ ისინი.", href: "/patients/rights", cta: "გაეცანით" },
      { icon: "users", title: "მხარდაჭერის ჯგუფები", text: "თემი, სადაც შეგიძლიათ გაუზიაროთ გამოცდილება მათ, ვინც მსგავს გზას გადის.", href: "/patients/support", cta: "დეტალები" },
      { icon: "heart", title: "ხშირი კითხვები", text: "პასუხები კითხვებზე, რომლებსაც პაციენტები ყველაზე ხშირად სვამენ.", href: "/patients/faq", cta: "ყველა კითხვა" },
    ] as { icon: IconName; title: string; text: string; href: string; cta: string }[],
  },
  en: {
    eyebrow: "For patients",
    title: "Reliable information, in plain language",
    intro:
      "We do not run consultations, but we produce materials that help you talk to your doctor, make decisions and understand what is happening in your pregnancy.",
    crumb: "For patients",
    metaDesc:
      "Reliable information about pregnancy, high-risk pregnancy and medical care — in plain, understandable language.",
    urgentBadge: "Emergency",
    urgentTitle: "When to seek help immediately",
    urgentText:
      "If you have any of these signs, contact a healthcare provider immediately or call 112. Do not wait for your scheduled appointment.",
    warning: [
      "Vaginal bleeding",
      "Severe, persistent headache",
      "Visual disturbance or flashing lights",
      "Severe abdominal pain",
      "Difficulty breathing",
      "Reduced or absent fetal movements",
      "A sudden gush of fluid",
      "High fever",
    ],
    resourcesEyebrow: "Resources",
    resourcesTitle: "Where to start",
    faqEyebrow: "FAQ",
    faqTitle: "The answers people ask for most",
    faqCta: "All questions",
    cards: [
      { icon: "search", title: "Find a specialist", text: "Find a certified perinatologist by city, subspecialty and consultation language.", href: "/patients/find-specialist", cta: "Start searching" },
      { icon: "baby", title: "High-risk pregnancy", text: "What the diagnosis means, what causes it and what to expect.", href: "/patients/high-risk", cta: "Read more" },
      { icon: "download", title: "Information leaflets", text: "Downloadable leaflets — pre-eclampsia, twins, gestational diabetes and more.", href: "/patients/resources", cta: "Browse materials" },
      { icon: "shield", title: "Patient rights", text: "What you are entitled to when receiving medical care, and how to protect it.", href: "/patients/rights", cta: "Learn more" },
      { icon: "users", title: "Support groups", text: "A community where you can share your experience with people on a similar path.", href: "/patients/support", cta: "Details" },
      { icon: "heart", title: "Frequently asked questions", text: "Answers to the questions patients ask most often.", href: "/patients/faq", cta: "All questions" },
    ] as { icon: IconName; title: string; text: string; href: string; cta: string }[],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function PatientsPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { faq } = content(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.crumb }]}
      />

      {/* გადაუდებელი ნიშნები */}
      <section className="pb-16">
        <div className="container-x">
          <div className="overflow-hidden rounded-[1.5rem] border border-clay-300 bg-clay-100">
            <div className="grid gap-6 p-7 sm:p-9 lg:grid-cols-[1fr_1.3fr] lg:items-center">
              <div>
                <span className="badge bg-white text-ink-800">
                  <Icon name="shield" size={13} />
                  {c.urgentBadge}
                </span>
                <h2 className="mt-4 text-2xl leading-snug">{c.urgentTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{c.urgentText}</p>
              </div>
              <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {c.warning.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-sm text-ink-800">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-300" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* რესურსების ბადე */}
      <section className="pb-20">
        <div className="container-x">
          <SectionHeading eyebrow={c.resourcesEyebrow} title={c.resourcesTitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="card card-hover group flex flex-col p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Icon name={card.icon} size={20} />
                </span>
                <h3 className="mt-5 text-[1.0625rem] leading-snug transition group-hover:text-brand-800">
                  {card.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
                  {card.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  {card.cta}
                  <Icon
                    name="arrow-right"
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-300 py-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <SectionHeading eyebrow={c.faqEyebrow} title={c.faqTitle} />
              <div className="relative -mt-4 aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={IMG.patientsHero}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
              <Link href="/patients/faq" className="btn btn-outline mt-6">
                {c.faqCta}
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>
            <Accordion items={faq.slice(0, 5)} />
          </div>
        </div>
      </section>
    </>
  );
}
