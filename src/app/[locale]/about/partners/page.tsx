import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { content } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "თანამშრომლობა",
    title: "ჩვენი პარტნიორები",
    intro:
      "ვმუშაობთ სახელმწიფო უწყებებთან, უნივერსიტეტებთან, კლინიკებთან და საერთაშორისო ორგანიზაციებთან — რათა სტანდარტები არა მხოლოდ შეიქმნას, არამედ დაინერგოს.",
    parent: "ჩვენს შესახებ",
    crumb: "პარტნიორები",
    metaDesc:
      "MFM საქართველოს სახელმწიფო, აკადემიური, კლინიკური და საერთაშორისო პარტნიორები.",
    ctaTitle: "გახდით პარტნიორი",
    ctaText:
      "ვთანამშრომლობთ კლინიკებთან, ტექნოლოგიურ კომპანიებსა და დონორ ორგანიზაციებთან საგანმანათლებლო და კვლევით პროექტებზე.",
    ctaBtn: "წინადადების გაგზავნა",
  },
  en: {
    eyebrow: "Collaboration",
    title: "Our partners",
    intro:
      "We work with government bodies, universities, clinics and international organisations — so that standards are not only written but actually adopted.",
    parent: "About us",
    crumb: "Partners",
    metaDesc:
      "MFM Georgia's government, academic, clinical and international partners.",
    ctaTitle: "Become a partner",
    ctaText:
      "We collaborate with clinics, technology companies and donor organisations on educational and research projects.",
    ctaBtn: "Send a proposal",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function PartnersPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { partners } = content(locale);
  const groups = Array.from(new Set(partners.map((p) => p.type)));

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.parent, href: "/about" }, { label: c.crumb }]}
      />

      <section className="pb-16">
        <div className="container-x space-y-12">
          {groups.map((g) => (
            <div key={g}>
              <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.12em] text-brand-600">
                {g}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {partners
                  .filter((p) => p.type === g)
                  .map((p) => (
                    <div key={p.name} className="card flex items-center gap-4 p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream-200 text-brand-700">
                        <Icon name="badge" size={19} />
                      </span>
                      <span className="text-[0.9375rem] font-semibold leading-snug text-ink-900">
                        {p.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x">
          <div className="card flex flex-col items-start gap-5 bg-brand-50 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl">{c.ctaTitle}</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-600">{c.ctaText}</p>
            </div>
            <Link href="/contact" className="btn btn-primary shrink-0">
              {c.ctaBtn}
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
