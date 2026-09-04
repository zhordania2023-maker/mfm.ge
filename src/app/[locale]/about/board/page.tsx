import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { content } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "ორგანიზაცია",
    title: "გამგეობა",
    intro:
      "დირექტორთა საბჭო აირჩევა საერთო კრების მიერ ორი წლის ვადით. გამგეობა განსაზღვრავს სტრატეგიულ პრიორიტეტებს, ამტკიცებს ბიუჯეტსა და ზედამხედველობს სამუშაო ჯგუფების საქმიანობას.",
    parent: "ჩვენს შესახებ",
    crumb: "გამგეობა",
    metaDesc:
      "MFM საქართველოს დირექტორთა საბჭო 2026–2028 წლებისთვის — შემადგენლობა და პასუხისმგებლობები.",
    ctaTitle: "გსურთ ჩართვა მმართველობაში?",
    ctaText:
      "გამგეობის არჩევნები ტარდება ორ წელიწადში ერთხელ. კანდიდატად წარდგენა შეუძლია ნებისმიერ აქტიურ წევრს ორი მხარდამჭერის რეკომენდაციით.",
    ctaBtn: "დაგვიკავშირდით",
  },
  en: {
    eyebrow: "Organisation",
    title: "Board of directors",
    intro:
      "The board is elected by the general assembly for a two-year term. It sets strategic priorities, approves the budget and oversees the working groups.",
    parent: "About us",
    crumb: "Board",
    metaDesc:
      "The MFM Georgia board of directors for 2026–2028 — who serves and what they are responsible for.",
    ctaTitle: "Interested in serving?",
    ctaText:
      "Board elections are held every two years. Any active member may stand, with the backing of two supporters.",
    ctaBtn: "Get in touch",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function BoardPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { board } = content(locale);

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
            {board.map((p) => (
              <article key={p.name} className="card p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-800">
                    {p.initials}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-[1.0625rem] leading-snug">{p.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-brand-700">{p.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-600">{p.bio}</p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-500">
                  <span>{p.org}</span>
                  <span>{p.term}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="card mt-10 flex flex-col items-start gap-5 bg-brand-50 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg">{c.ctaTitle}</h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-600">{c.ctaText}</p>
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
