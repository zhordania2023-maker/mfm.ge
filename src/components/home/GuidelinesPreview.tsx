import Link from "@/components/ui/LocaleLink";
import { content, sortedGuidelines } from "@/content";
import { formatDateShort } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/PageHeader";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { pick } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "კლინიკური რესურსები",
    title: "გაიდლაინები და პროტოკოლები",
    intro: "ყველა დოკუმენტი ღია წვდომითაა — რეგისტრაციისა და გადახდის გარეშე.",
    cta: "ბიბლიოთეკა",
  },
  en: {
    eyebrow: "Clinical resources",
    title: "Guidelines and protocols",
    intro: "Every document is open access — no registration, no payment.",
    cta: "Browse the library",
  },
};

export function GuidelinesPreview({ locale }: { locale: Locale }) {
  const c = pick(copy, locale);
  const dict = t(locale);
  const latest = sortedGuidelines(content(locale)).slice(0, 4);

  return (
    <section className="bg-cream-300 py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow={c.eyebrow}
          title={c.title}
          intro={c.intro}
          action={{ label: c.cta, href: "/guidelines" }}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {latest.map((g) => (
            <Link
              key={g.slug}
              href={`/guidelines/${g.slug}`}
              className="card card-hover group flex flex-col p-6"
            >
              <div className="flex items-center gap-2">
                <span className="badge bg-brand-100 text-brand-800">{g.code}</span>
                <span className="badge bg-cream-200 text-ink-600">{g.type}</span>
                <span className="ml-auto text-xs text-ink-400">v{g.version}</span>
              </div>

              <h3 className="mt-4 text-[1.0625rem] leading-snug transition group-hover:text-brand-800">
                {g.title}
              </h3>
              <p className="clamp-3 mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
                {g.summary}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-500">
                <span>
                  {dict.common.updated} {formatDateShort(g.updated, locale)}
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-brand-700">
                  <Icon name="download" size={14} />
                  {g.pages} {dict.common.pages}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
