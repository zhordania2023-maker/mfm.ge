import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { content, sortedNews } from "@/content";
import { formatDateShort } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/PageHeader";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { pick } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "სიახლეები",
    title: "რა ხდება საზოგადოებაში",
    intro: "გაიდლაინების განახლებები, კვლევის შედეგები და ორგანიზაციული სიახლეები.",
    cta: "ყველა სიახლე",
  },
  en: {
    eyebrow: "News",
    title: "What is happening in the society",
    intro: "Guideline updates, research findings and organisational news.",
    cta: "All news",
  },
};

export function NewsPreview({ locale }: { locale: Locale }) {
  const c = pick(copy, locale);
  const dict = t(locale);
  const [lead, ...rest] = sortedNews(content(locale)).slice(0, 4);

  return (
    <section className="bg-cream-100 pb-20 pt-4">
      <div className="container-x">
        <SectionHeading
          eyebrow={c.eyebrow}
          title={c.title}
          intro={c.intro}
          action={{ label: c.cta, href: "/news" }}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {/* მთავარი სტატია */}
          <Link href={`/news/${lead.slug}`} className="card card-hover group overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={lead.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="badge absolute left-4 top-4 bg-white/92 text-ink-800 backdrop-blur">
                {lead.category}
              </span>
            </div>
            <div className="p-6">
              <p className="text-xs text-ink-500">
                {formatDateShort(lead.date, locale)} · {lead.readMinutes} {dict.common.minRead}
              </p>
              <h3 className="mt-2.5 text-xl leading-snug transition group-hover:text-brand-800">
                {lead.title}
              </h3>
              <p className="clamp-3 mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                {lead.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                {dict.common.readMore}
                <Icon
                  name="arrow-right"
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>

          {/* დანარჩენი */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((n) => (
              <Link
                key={n.slug}
                href={`/news/${n.slug}`}
                className="card card-hover group flex gap-4 overflow-hidden p-4"
              >
                <div className="relative hidden h-24 w-32 shrink-0 overflow-hidden rounded-xl sm:block">
                  <Image src={n.image} alt="" fill sizes="8rem" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-[0.6875rem] text-ink-500">
                    <span className="badge bg-cream-200 px-2 py-0.5 text-ink-700">
                      {n.category}
                    </span>
                    {formatDateShort(n.date, locale)}
                  </p>
                  <h3 className="clamp-2 mt-2 text-[0.9375rem] font-semibold leading-snug transition group-hover:text-brand-800">
                    {n.title}
                  </h3>
                  <p className="clamp-2 mt-1.5 text-[0.8125rem] leading-relaxed text-ink-500">
                    {n.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
