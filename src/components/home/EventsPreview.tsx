import Link from "@/components/ui/LocaleLink";
import { content, isUpcoming } from "@/content";
import { dateBlock, formatDateRange } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { pick } from "@/lib/page";

const copy = {
  ka: {
    title: "მომავალი ღონისძიებები",
    intro: "შეუერთდით ჩვენს საგანმანათლებლო სესიებსა და კონფერენციებს.",
    cta: "სრული კალენდარი",
  },
  en: {
    title: "Upcoming events",
    intro: "Join our educational sessions and conferences.",
    cta: "Full calendar",
  },
};

export function EventsPreview({ locale }: { locale: Locale }) {
  const c = pick(copy, locale);
  const upcoming = content(locale)
    .events.filter((e) => isUpcoming(e))
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 3);

  return (
    <section className="bg-cream-100 py-20">
      <div className="container-x">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-[1.75rem] sm:text-[2.125rem]">{c.title}</h2>
            <p className="mt-2.5 text-[0.9375rem] text-ink-600">{c.intro}</p>
          </div>
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700"
          >
            {c.cta}
            <Icon
              name="calendar"
              size={16}
              className="transition-transform group-hover:translate-y-px"
            />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {upcoming.map((e) => {
            const d = dateBlock(e.start, locale);
            return (
              <Link
                key={e.slug}
                href={`/events/${e.slug}`}
                className="card card-hover group flex items-start gap-4 p-5"
              >
                <span className="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-cream-200 leading-none">
                  <span className="text-xl font-bold text-ink-900">{d.day}</span>
                  <span className="mt-1 text-[0.6875rem] font-medium text-ink-500">{d.month}</span>
                </span>

                <span className="min-w-0 flex-1">
                  <span className="clamp-2 block text-[0.9375rem] font-semibold leading-snug text-ink-900 transition group-hover:text-brand-800">
                    {e.title}
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] text-ink-500">
                    <span className="inline-flex items-center gap-1">
                      <Icon name={e.online ? "video" : "clock"} size={13} />
                      {e.timeLabel ?? formatDateRange(e.start, e.end, locale)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Icon name="pin" size={13} />
                      {e.city}
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
