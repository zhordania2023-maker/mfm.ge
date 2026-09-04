import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { content } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "ორგანიზაცია",
    title: "აღმასრულებელი ოფისი",
    intro:
      "მცირე გუნდი, რომელიც უზრუნველყოფს საზოგადოების ყოველდღიურ საქმიანობას — პროგრამებიდან და ღონისძიებებიდან წევრთა მხარდაჭერამდე.",
    parent: "ჩვენს შესახებ",
    crumb: "გუნდი",
    metaDesc: "MFM საქართველოს აღმასრულებელი ოფისის თანამშრომლები და საკონტაქტო ინფორმაცია.",
    office: "ოფისი",
    hours: "სამუშაო საათები",
    contact: "კონტაქტი",
  },
  en: {
    eyebrow: "Organisation",
    title: "The executive office",
    intro:
      "A small team that keeps the society running day to day — from programmes and events to member support.",
    parent: "About us",
    crumb: "Team",
    metaDesc: "The MFM Georgia executive office team and how to reach them.",
    office: "Office",
    hours: "Opening hours",
    contact: "Contact",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function StaffPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { staff, site } = content(locale);

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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {staff.map((p) => (
              <article key={p.name} className="card p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream-200 text-lg font-bold text-ink-700">
                  {p.initials}
                </span>
                <h2 className="mt-5 text-[1.0625rem]">{p.name}</h2>
                <p className="mt-1 text-sm font-semibold text-brand-700">{p.role}</p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-600">{p.bio}</p>
                {p.email && (
                  <a
                    href={`mailto:${p.email}`}
                    className="mt-5 inline-flex items-center gap-2 border-t border-line pt-4 text-sm text-brand-700 transition hover:underline"
                  >
                    <Icon name="mail" size={15} />
                    {p.email}
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="card mt-10 grid gap-6 p-7 sm:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-400">{c.office}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                {site.address.street}
                <br />
                {site.address.city} {site.address.zip}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-400">{c.hours}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{site.hours}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-400">{c.contact}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                <a href={`mailto:${site.email}`} className="hover:underline">
                  {site.email}
                </a>
                <br />
                <a href={`tel:${site.phoneHref}`} className="hover:underline">
                  {site.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
