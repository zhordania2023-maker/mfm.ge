import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { content } from "@/content";
import { CaseQuiz } from "@/components/education/CaseQuiz";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "განათლება",
    title: "კვირის კლინიკური შემთხვევა",
    intro:
      "ყოველ ორშაბათს ვაქვეყნებთ რეალურ პრაქტიკაზე დაფუძნებულ შემთხვევას. აირჩიეთ პასუხი და ნახეთ განხილვა — თითოეული შემთხვევა უკავშირდება კონკრეტულ გაიდლაინს.",
    parent: "განათლება",
    crumb: "შემთხვევები",
    metaDesc:
      "ყოველკვირეული კლინიკური შემთხვევა კითხვითა და დეტალური განხილვით — დედა-ნაყოფის მედიცინის პრაქტიკოსებისთვის.",
    archive: "არქივი",
    cmeTitle: "CME კრედიტები",
    cmeText: "წევრებს შემთხვევების გადაწყვეტა ეთვლებათ CME კრედიტში — 10 შემთხვევა = 1 კრედიტი.",
    cmeCta: "გაწევრიანება",
  },
  en: {
    eyebrow: "Education",
    title: "Case of the week",
    intro:
      "Every Monday we publish a case drawn from real practice. Choose an answer and read the discussion — each case links to a specific guideline.",
    parent: "Education",
    crumb: "Cases",
    metaDesc:
      "A weekly clinical case with a question and detailed discussion, for maternal-fetal medicine practitioners.",
    archive: "Archive",
    cmeTitle: "CME credits",
    cmeText: "Members earn CME credit for completing cases — 10 cases = 1 credit.",
    cmeCta: "Join",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function CasesPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { cases } = content(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.parent, href: "/education" }, { label: c.crumb }]}
      />

      <section className="pb-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
            <div className="space-y-8">
              {cases.map((item) => (
                <CaseQuiz key={item.slug} locale={locale} item={item} />
              ))}
            </div>

            <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <div className="card p-5">
                <p className="text-sm font-bold text-ink-900">{c.archive}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {cases.map((item) => (
                    <li key={item.slug}>
                      <a
                        href={`#${item.slug}`}
                        className="flex items-start gap-2 text-ink-600 transition hover:text-brand-800"
                      >
                        <span className="font-semibold text-brand-700">#{item.number}</span>
                        <span className="clamp-2">{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card mt-4 bg-brand-50 p-5">
                <p className="text-sm font-bold text-ink-900">{c.cmeTitle}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-600">{c.cmeText}</p>
                <Link href="/membership/join" className="btn btn-primary btn-sm mt-4 w-full">
                  {c.cmeCta}
                  <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
