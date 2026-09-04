import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { content } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { t } from "@/i18n/ui";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "პაციენტებისთვის",
    title: "საინფორმაციო ბროშურები",
    intro:
      "ყველა მასალა შემუშავებულია პაციენტთა ფოკუს-ჯგუფებთან ერთად და ხელმისაწვდომია უფასოდ. ბეჭდური ვერსიები გავრცელებულია პარტნიორ კლინიკებში.",
    parent: "პაციენტებისთვის",
    crumb: "მასალები",
    metaDesc:
      "ჩამოსატვირთი ბროშურები პაციენტებისა და ოჯახებისთვის — მაღალი რისკის ორსულობა, პრეეკლამფსია, ტყუპები, გესტაციური დიაბეტი.",
    note: "მასალები განკუთვნილია საინფორმაციო მიზნებისთვის და არ ცვლის ექიმის კონსულტაციას. თუ გსურთ ბროშურების ბეჭდური ასლების მიღება თქვენი კლინიკისთვის, დაგვიკავშირდით.",
  },
  en: {
    eyebrow: "For patients",
    title: "Information leaflets",
    intro:
      "Every leaflet was developed together with patient focus groups and is free to download. Printed copies are distributed through partner clinics.",
    parent: "For patients",
    crumb: "Materials",
    metaDesc:
      "Downloadable leaflets for patients and families — high-risk pregnancy, pre-eclampsia, twins, gestational diabetes.",
    note: "These materials are for information only and do not replace a consultation with your doctor. Contact us if you would like printed copies for your clinic.",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function ResourcesPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const dict = t(locale);
  const { patientResources } = content(locale);

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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {patientResources.map((r) => (
              <article key={r.title} className="card card-hover flex flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay-100 text-ink-700">
                  <Icon name="book" size={20} />
                </span>
                <h2 className="mt-5 text-[1.0625rem] leading-snug">{r.title}</h2>
                <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
                  {r.summary}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-500">
                  <span>{r.format}</span>
                  <span>{r.lang}</span>
                </div>
                <button className="btn btn-outline btn-sm mt-4 w-full">
                  <Icon name="download" size={15} />
                  {dict.common.download}
                </button>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-500">{c.note}</p>
        </div>
      </section>
    </>
  );
}
