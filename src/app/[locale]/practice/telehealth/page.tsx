import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "პრაქტიკის მართვა",
    title: "ტელემედიცინა და კონსულტაციის ხაზი",
    intro:
      "დისტანციური კონსულტაცია არ ცვლის ფიზიკურ გასინჯვას — მაგრამ ბევრ შემთხვევაში ის ერთადერთი გზაა, რომ რეგიონში მყოფმა პაციენტმა მიიღოს დროული სპეციალისტის აზრი.",
    parent: "ექიმებისთვის",
    crumb: "ტელემედიცინა",
    metaDesc:
      "დისტანციური კონსულტაციის სტანდარტი, ტექნიკური მოთხოვნები და 24/7 პერინატალური კონსულტაციის ხაზი.",
    forStaff: "სამედიცინო პერსონალისთვის",
    lineTitle: "24/7 პერინატალური კონსულტაცია",
    lineText: "ხაზზე წვდომა აქვთ MFM-ის წევრებსა და პარტნიორ დაწესებულებებს.",
    lineCta: "წვდომის მიღება",
    docsTitle: "დოკუმენტები",
    docs: ["თანხმობის ფორმა (PDF)", "კონსულტაციის ოქმის შაბლონი"],
    stats: [
      { v: "640", l: "კონსულტაცია პილოტში" },
      { v: "92%", l: "პაციენტთა კმაყოფილება" },
      { v: "4 დღე", l: "საშუალო მოლოდინი (21-ის ნაცვლად)" },
      { v: "180 ₾", l: "დაზოგილი ხარჯი პაციენტზე" },
    ],
    body: [
      "## 24/7 კონსულტაციის ხაზი",
      "რეგიონული სამშობიარო სახლის ექიმს შეუძლია დარეკოს ერთიან ნომერზე და 15 წუთის განმავლობაში მიიღოს დაკავშირება მორიგე პერინატოლოგთან. საჭიროების შემთხვევაში ხდება პაციენტის ტრანსპორტირების კოორდინაცია.",
      "ხაზი განკუთვნილია სამედიცინო პერსონალისთვის — არა პაციენტებისთვის. პაციენტებმა უნდა მიმართონ თავიანთ ექიმს ან, გადაუდებელ შემთხვევაში, 112-ს.",
      "## ჰიბრიდული კონსულტაცია",
      "ყველაზე ეფექტური ფორმატია, როცა ადგილობრივი ექიმი პაციენტთან ერთად უერთდება სესიას. ეს საშუალებას იძლევა რეალურ დროში განიხილოს ულტრაბგერითი გამოსახულებები და ერთად შედგეს გეგმა.",
      "## ტექნიკური მოთხოვნები",
      "- დაცული ვიდეო-პლატფორმა (ბოლომდე დაშიფვრით)",
      "- გამოსახულებების გაზიარების საშუალება (DICOM ან მაღალი ხარისხის ექსპორტი)",
      "- სტაბილური კავშირი — მინიმუმ 2 Mbps ატვირთვისთვის",
      "- პაციენტის წერილობითი თანხმობა დისტანციურ კონსულტაციაზე",
      "## დოკუმენტირება",
      "დისტანციური კონსულტაცია უნდა დოკუმენტირდეს იმავე სტანდარტით, როგორც ჩვეულებრივი ვიზიტი: მიმართვის მიზეზი, განხილული მონაცემები, რეკომენდაცია და შემდგომი გეგმა.",
    ],
  },
  en: {
    eyebrow: "Practice management",
    title: "Telehealth and the consultation line",
    intro:
      "A remote consultation does not replace a physical examination — but in many cases it is the only way a patient in a region gets a timely specialist opinion.",
    parent: "For clinicians",
    crumb: "Telehealth",
    metaDesc:
      "The standard for remote consultation, technical requirements and the 24/7 perinatal consultation line.",
    forStaff: "For healthcare staff",
    lineTitle: "24/7 perinatal consultation",
    lineText: "The line is available to MFM members and partner facilities.",
    lineCta: "Get access",
    docsTitle: "Documents",
    docs: ["Consent form (PDF)", "Consultation record template"],
    stats: [
      { v: "640", l: "consultations in the pilot" },
      { v: "92%", l: "patient satisfaction" },
      { v: "4 days", l: "average wait (down from 21)" },
      { v: "180 GEL", l: "saved per patient" },
    ],
    body: [
      "## The 24/7 consultation line",
      "A physician at a regional maternity unit can call a single number and be connected to the perinatologist on duty within 15 minutes. Patient transfer is coordinated where necessary.",
      "The line is for healthcare staff, not for patients. Patients should contact their own doctor or, in an emergency, call 112.",
      "## Hybrid consultation",
      "The most effective format is when the local physician joins the session together with the patient. That makes it possible to review ultrasound images in real time and agree a plan together.",
      "## Technical requirements",
      "- A secure video platform (end-to-end encrypted)",
      "- A way to share images (DICOM or high-quality export)",
      "- A stable connection — at least 2 Mbps upload",
      "- The patient's written consent to a remote consultation",
      "## Documentation",
      "A remote consultation must be documented to the same standard as an in-person visit: reason for referral, data reviewed, recommendation and follow-up plan.",
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function TelehealthPage({ params }: LocaleParams) {
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

      <section className="pb-16">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.stats.map((s) => (
              <div key={s.l} className="card p-6">
                <p className="text-[1.75rem] font-bold leading-none text-brand-700">{s.v}</p>
                <p className="mt-3 text-[0.875rem] leading-snug text-ink-600">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div className="max-w-2xl">
              <Prose blocks={[...c.body]} />
            </div>

            <aside className="space-y-4 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <div className="card bg-brand-900 p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-300">
                  {c.forStaff}
                </p>
                <p className="mt-3 text-lg font-bold leading-snug">{c.lineTitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream-200/75">{c.lineText}</p>
                <Link
                  href="/membership"
                  className="btn mt-5 w-full bg-white text-brand-900 hover:bg-brand-100"
                >
                  {c.lineCta}
                </Link>
              </div>

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
