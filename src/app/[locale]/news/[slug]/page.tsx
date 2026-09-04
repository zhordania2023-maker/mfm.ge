import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { allNewsSlugs, content, getNews, sortedNews } from "@/content";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Icon } from "@/components/ui/Icon";
import { locales } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { getLocale, pick, type SlugParams } from "@/lib/page";

const copy = {
  ka: {
    crumb: "სიახლეები",
    share: "გაზიარება",
    allNews: "ყველა სიახლე",
    subscribeTitle: "გამოიწერეთ განახლებები",
    subscribeText: "ყოველთვიური წერილი ახალი გაიდლაინებისა და ღონისძიებების შესახებ.",
    join: "გაწევრიანება",
    related: "დაკავშირებული სიახლეები",
    notFound: "სიახლე ვერ მოიძებნა",
  },
  en: {
    crumb: "News",
    share: "Share",
    allNews: "All news",
    subscribeTitle: "Subscribe to updates",
    subscribeText: "A monthly email about new guidelines and events.",
    join: "Join",
    related: "Related news",
    notFound: "Article not found",
  },
};

export function generateStaticParams() {
  return locales.flatMap((locale) => allNewsSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale(params);
  const item = getNews(content(locale), slug);
  if (!item) return { title: pick(copy, locale).notFound };
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: { title: item.title, description: item.excerpt, type: "article" },
  };
}

export default async function NewsArticlePage({ params }: SlugParams) {
  const { slug } = await params;
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const dict = t(locale);
  const bundle = content(locale);

  const item = getNews(bundle, slug);
  if (!item) notFound();

  const sorted = sortedNews(bundle);
  const related = sorted
    .filter((n) => n.slug !== item.slug && n.category === item.category)
    .slice(0, 3);
  const fallback = sorted.filter((n) => n.slug !== item.slug).slice(0, 3);
  const suggestions = related.length ? related : fallback;

  return (
    <article className="pb-20">
      <div className="bg-cream-100 pb-10 pt-[calc(var(--header-h)+2.5rem)]">
        <div className="container-x">
          <Breadcrumbs
            locale={locale}
            items={[{ label: c.crumb, href: "/news" }, { label: item.category }]}
          />
          <div className="mt-6 max-w-3xl">
            <span className="badge bg-brand-100 text-brand-800">{item.category}</span>
            <h1 className="mt-4 text-[2rem] leading-[1.16] sm:text-[2.625rem]">{item.title}</h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-600">{item.excerpt}</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-sm text-ink-500">
              <span className="inline-flex items-center gap-2">
                <Icon name="user" size={15} />
                {item.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="calendar" size={15} />
                {formatDate(item.date, locale)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="clock" size={15} />
                {item.readMinutes} {dict.common.minRead}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-[1.5rem]">
          <Image
            src={item.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1280px) 76rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="max-w-2xl">
            <Prose blocks={item.body} />

            <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-7">
              {item.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="badge bg-cream-200 text-ink-600 transition hover:bg-brand-100 hover:text-brand-800"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <div className="card p-5">
              <p className="text-sm font-bold text-ink-900">{c.share}</p>
              <div className="mt-3 flex gap-2">
                {(["facebook", "linkedin", "x"] as const).map((s) => (
                  <span
                    key={s}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink-500"
                  >
                    <Icon name={s} size={15} />
                  </span>
                ))}
              </div>
              <Link href="/news" className="btn btn-outline btn-sm mt-5 w-full">
                <Icon name="arrow-left" size={14} />
                {c.allNews}
              </Link>
            </div>

            <div className="card mt-4 bg-brand-50 p-5">
              <p className="text-sm font-bold text-ink-900">{c.subscribeTitle}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-600">{c.subscribeText}</p>
              <Link href="/membership/join" className="btn btn-primary btn-sm mt-4 w-full">
                {c.join}
              </Link>
            </div>
          </aside>
        </div>

        {/* დაკავშირებული */}
        <section className="mt-20">
          <h2 className="text-2xl">{c.related}</h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((n) => (
              <Link
                key={n.slug}
                href={`/news/${n.slug}`}
                className="card card-hover group overflow-hidden"
              >
                <div className="relative aspect-[16/10]">
                  <Image src={n.image} alt="" fill sizes="30vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-xs text-ink-500">{formatDate(n.date, locale)}</p>
                  <h3 className="clamp-2 mt-2 text-[0.9375rem] font-semibold leading-snug transition group-hover:text-brand-800">
                    {n.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
