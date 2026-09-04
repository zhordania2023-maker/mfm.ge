import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { content } from "@/content";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "პაციენტებისთვის",
    title: "მხარდაჭერის ჯგუფები",
    intro:
      "ზოგჯერ ყველაზე მეტად ეხმარება საუბარი მათთან, ვინც მსგავს გზას გადის. ჯგუფებს უძღვებიან პროფესიონალი მოდერატორები; მონაწილეობა უფასოა და კონფიდენციალური.",
    parent: "პაციენტებისთვის",
    crumb: "მხარდაჭერა",
    metaDesc:
      "თემი და მხარდაჭერის ჯგუფები მაღალი რისკის ორსულობის, ნაადრევი მშობიარობისა და ორსულობის დაკარგვის გამოცდილების მქონე ოჯახებისთვის.",
    signUp: "ჩაწერა",
    urgentTitle: "გჭირდებათ დაუყოვნებელი ფსიქოლოგიური დახმარება?",
    urgentText:
      "მხარდაჭერის ჯგუფი არ ცვლის პროფესიულ დახმარებას. კრიზისულ სიტუაციაში დარეკეთ 112-ზე ან მიმართეთ ფსიქიკური ჯანმრთელობის სამსახურს.",
    groups: [
      { title: "მაღალი რისკის ორსულობა", format: "ონლაინ · ორ კვირაში ერთხელ", text: "შეხვედრები მათთვის, ვისაც მიმდინარე ორსულობა საჭიროებს გახშირებულ დაკვირვებას. მოდერატორი — ფსიქოლოგი და ბებიაქალი." },
      { title: "ნაადრევად დაბადებული ბავშვების მშობლები", format: "ჰიბრიდული · თვეში ერთხელ", text: "გამოცდილების გაზიარება ნეონატალური ინტენსიური თერაპიის განყოფილებაში ყოფნისა და შემდგომი პერიოდის შესახებ." },
      { title: "ორსულობის დაკარგვის შემდეგ", format: "დახურული ჯგუფი · თვეში ერთხელ", text: "უსაფრთხო სივრცე მწუხარების გადამუშავებისთვის, პროფესიონალი კონსულტანტის თანხლებით." },
      { title: "მრავალნაყოფიანი ორსულობა", format: "ონლაინ · თვეში ერთხელ", text: "პრაქტიკული რჩევები და ურთიერთმხარდაჭერა ტყუპებისა და სამეულების მოლოდინში მყოფი ოჯახებისთვის." },
    ],
  },
  en: {
    eyebrow: "For patients",
    title: "Support groups",
    intro:
      "Sometimes what helps most is talking to people walking the same path. Groups are led by professional facilitators; participation is free and confidential.",
    parent: "For patients",
    crumb: "Support",
    metaDesc:
      "Community and support groups for families affected by high-risk pregnancy, preterm birth and pregnancy loss.",
    signUp: "Sign up",
    urgentTitle: "Need psychological help right now?",
    urgentText:
      "A support group does not replace professional help. In a crisis call 112 or contact a mental health service.",
    groups: [
      { title: "High-risk pregnancy", format: "Online · fortnightly", text: "Meetings for those whose current pregnancy needs closer monitoring. Facilitated by a psychologist and a midwife." },
      { title: "Parents of preterm babies", format: "Hybrid · monthly", text: "Sharing experience of time in neonatal intensive care and the period that follows." },
      { title: "After pregnancy loss", format: "Closed group · monthly", text: "A safe space to work through grief, accompanied by a professional counsellor." },
      { title: "Multiple pregnancy", format: "Online · monthly", text: "Practical advice and mutual support for families expecting twins or triplets." },
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function SupportPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { site } = content(locale);

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
          <div className="grid gap-5 sm:grid-cols-2">
            {c.groups.map((g) => (
              <article key={g.title} className="card flex flex-col p-6">
                <span className="badge bg-cream-200 text-ink-600">{g.format}</span>
                <h2 className="mt-4 text-[1.125rem] leading-snug">{g.title}</h2>
                <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">
                  {g.text}
                </p>
                <Link href="/contact" className="btn btn-outline btn-sm mt-5 w-full">
                  {c.signUp}
                  <Icon name="arrow-right" size={14} />
                </Link>
              </article>
            ))}
          </div>

          <div className="card mt-8 flex flex-col gap-4 bg-clay-100 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg">{c.urgentTitle}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{c.urgentText}</p>
            </div>
            <a href={`tel:${site.phoneHref}`} className="btn btn-primary shrink-0">
              <Icon name="phone" size={16} />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
