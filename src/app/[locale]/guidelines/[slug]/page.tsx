import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/components/ui/LocaleLink";
import { allGuidelineSlugs, content, getGuideline } from "@/content";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Icon } from "@/components/ui/Icon";
import { locales } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { getLocale, pick, type SlugParams } from "@/lib/page";

const copy = {
  ka: {
    crumb: "გაიდლაინები",
    version: "ვერსია",
    page: "გვერდი",
    keyPoints: "ძირითადი რეკომენდაციები",
    note: "შენიშვნა:",
    noteText:
      "გაიდლაინი წარმოადგენს რეკომენდაციას და არ ცვლის კლინიცისტის პროფესიულ განსჯას კონკრეტულ შემთხვევაში. გადახვევა დასაშვებია, თუ ის დასაბუთებული და დოკუმენტირებულია.",
    document: "დოკუმენტი",
    shortVersion: "შემოკლებული ვერსია",
    code: "კოდი",
    edition: "გამოცემა",
    sameTopic: "იმავე თემაზე",
    notFound: "დოკუმენტი ვერ მოიძებნა",
  },
  en: {
    crumb: "Guidelines",
    version: "Version",
    page: "pages",
    keyPoints: "Key recommendations",
    note: "Note:",
    noteText:
      "A guideline is a recommendation and does not replace the clinician's professional judgement in an individual case. Departing from it is acceptable where the reasoning is documented.",
    document: "Document",
    shortVersion: "Summary version",
    code: "Code",
    edition: "Published",
    sameTopic: "On the same topic",
    notFound: "Document not found",
  },
};

export function generateStaticParams() {
  return locales.flatMap((locale) => allGuidelineSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale(params);
  const g = getGuideline(content(locale), slug);
  if (!g) return { title: pick(copy, locale).notFound };
  return { title: `${g.code} — ${g.title}`, description: g.summary };
}

export default async function GuidelinePage({ params }: SlugParams) {
  const { slug } = await params;
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const dict = t(locale);
  const bundle = content(locale);

  const g = getGuideline(bundle, slug);
  if (!g) notFound();

  const related = bundle.guidelines
    .filter((x) => x.slug !== g.slug && x.topic === g.topic)
    .slice(0, 3);

  return (
    <article className="pb-20">
      <div className="bg-brand-900 pb-12 pt-[calc(var(--header-h)+2.5rem)] text-white">
        <div className="container-x">
          <Breadcrumbs
            locale={locale}
            items={[{ label: c.crumb, href: "/guidelines" }, { label: g.code }]}
            light
          />
          <div className="mt-6 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <span className="badge bg-white/15 text-white">{g.code}</span>
              <span className="badge bg-white/15 text-white">{g.type}</span>
              <span className="badge bg-white/15 text-white">{g.topic}</span>
            </div>
            <h1 className="mt-4 text-[1.875rem] leading-[1.18] text-white sm:text-[2.5rem]">
              {g.title}
            </h1>
            <p className="mt-5 leading-relaxed text-cream-200/80">{g.summary}</p>

            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2 border-t border-white/15 pt-5 text-sm text-cream-200/70">
              <span>
                {c.version} {g.version}
              </span>
              <span>
                {g.pages} {c.page}
              </span>
              <span>
                {dict.common.updated} {formatDate(g.updated, locale)}
              </span>
              <span>{g.authors}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="grid gap-12 pt-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="max-w-2xl">
            <section className="card bg-brand-50 p-6">
              <h2 className="text-lg">{c.keyPoints}</h2>
              <ul className="mt-4 space-y-3">
                {g.keyPoints.map((k) => (
                  <li key={k} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                      <Icon name="check" size={11} strokeWidth={3} />
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink-700">{k}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-10">
              <Prose blocks={g.body} />
            </div>

            <div className="mt-10 rounded-2xl border border-line bg-cream-200 p-5 text-[0.8125rem] leading-relaxed text-ink-600">
              <strong className="font-semibold text-ink-900">{c.note}</strong> {c.noteText}
            </div>
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <div className="card p-5">
              <p className="text-sm font-bold text-ink-900">{c.document}</p>
              <div className="mt-4 space-y-2">
                <button className="btn btn-primary btn-sm w-full">
                  <Icon name="download" size={15} />
                  PDF ({g.pages} {dict.common.pages})
                </button>
                <button className="btn btn-outline btn-sm w-full">
                  <Icon name="download" size={15} />
                  {c.shortVersion}
                </button>
              </div>
              <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-xs">
                <div className="flex justify-between">
                  <dt className="text-ink-500">{c.code}</dt>
                  <dd className="font-semibold text-ink-800">{g.code}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500">{c.version}</dt>
                  <dd className="font-semibold text-ink-800">{g.version}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500">{c.edition}</dt>
                  <dd className="font-semibold text-ink-800">{g.year}</dd>
                </div>
              </dl>
            </div>

            {related.length > 0 && (
              <div className="mt-5">
                <p className="mb-3 px-1 text-sm font-bold text-ink-900">{c.sameTopic}</p>
                <ul className="space-y-2.5">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/guidelines/${r.slug}`}
                        className="card card-hover block p-4 text-sm font-semibold leading-snug text-ink-800 hover:text-brand-800"
                      >
                        {r.title}
                        <span className="mt-1 block text-xs font-normal text-ink-500">
                          {r.code} · {r.type}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
