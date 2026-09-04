import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { allEventSlugs, content, getEvent, isUpcoming } from "@/content";
import { formatDateRange } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { Icon } from "@/components/ui/Icon";
import { AddToCalendar } from "@/components/events/AddToCalendar";
import { locales } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { getLocale, pick, type SlugParams } from "@/lib/page";

const copy = {
  ka: {
    crumb: "ღონისძიებები",
    finished: "დასრულებული",
    agenda: "დღის წესრიგი",
    speakers: "მომხსენებლები",
    date: "თარიღი",
    time: "დრო",
    place: "ადგილი",
    price: "ღირებულება",
    seats: "ადგილების რაოდენობა",
    register: "რეგისტრაცია",
    waitlist: "მოლოდინის სიაში ჩაწერა",
    recording: "ჩანაწერის ნახვა",
    others: "სხვა ღონისძიებები",
    notFound: "ღონისძიება ვერ მოიძებნა",
  },
  en: {
    crumb: "Events",
    finished: "Finished",
    agenda: "Programme",
    speakers: "Speakers",
    date: "Date",
    time: "Time",
    place: "Venue",
    price: "Price",
    seats: "Places",
    register: "Register",
    waitlist: "Join the waiting list",
    recording: "Watch the recording",
    others: "Other events",
    notFound: "Event not found",
  },
};

export function generateStaticParams() {
  return locales.flatMap((locale) => allEventSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale(params);
  const e = getEvent(content(locale), slug);
  if (!e) return { title: pick(copy, locale).notFound };
  return { title: e.title, description: e.excerpt };
}

export default async function EventPage({ params }: SlugParams) {
  const { slug } = await params;
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const dict = t(locale);
  const bundle = content(locale);

  const e = getEvent(bundle, slug);
  if (!e) notFound();

  const upcoming = isUpcoming(e);
  const others = bundle.events
    .filter((x) => x.slug !== e.slug && isUpcoming(x))
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 2);

  return (
    <article className="pb-20">
      <div className="bg-cream-100 pb-10 pt-[calc(var(--header-h)+2.5rem)]">
        <div className="container-x">
          <Breadcrumbs
            locale={locale}
            items={[{ label: c.crumb, href: "/events" }, { label: e.type }]}
          />
          <div className="mt-6 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <span className="badge bg-brand-100 text-brand-800">{e.type}</span>
              {e.online && (
                <span className="badge bg-sky-100 text-ink-700">
                  <Icon name="video" size={12} />
                  {dict.filters.online}
                </span>
              )}
              {e.cme && <span className="badge bg-cream-300 text-ink-700">{e.cme}</span>}
              {!upcoming && <span className="badge bg-cream-300 text-ink-600">{c.finished}</span>}
            </div>
            <h1 className="mt-4 text-[2rem] leading-[1.16] sm:text-[2.625rem]">{e.title}</h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-600">{e.excerpt}</p>
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-[1.5rem]">
          <Image
            src={e.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1280px) 76rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="max-w-2xl">
            <Prose blocks={e.body} />

            {e.agenda && (
              <section className="mt-12">
                <h2 className="text-2xl">{c.agenda}</h2>
                <ol className="mt-6 space-y-0">
                  {e.agenda.map((a, i) => (
                    <li
                      key={i}
                      className="flex gap-5 border-l-2 border-line py-4 pl-6 first:pt-0 last:pb-0"
                    >
                      <span className="w-24 shrink-0 text-sm font-semibold text-brand-700">
                        {a.time}
                      </span>
                      <span>
                        <span className="block font-semibold text-ink-900">{a.title}</span>
                        {a.speaker && (
                          <span className="mt-1 block text-sm text-ink-500">{a.speaker}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {e.speakers && (
              <section className="mt-12">
                <h2 className="text-2xl">{c.speakers}</h2>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {e.speakers.map((s) => (
                    <li key={s} className="badge bg-cream-200 px-3.5 py-2 text-ink-700">
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* გვერდითი პანელი */}
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <div className="card p-6">
              <dl className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <Icon name="calendar" size={17} className="mt-0.5 shrink-0 text-brand-600" />
                  <div>
                    <dt className="font-semibold text-ink-900">{c.date}</dt>
                    <dd className="mt-0.5 text-ink-600">
                      {formatDateRange(e.start, e.end, locale)}
                    </dd>
                  </div>
                </div>
                {e.timeLabel && (
                  <div className="flex gap-3">
                    <Icon name="clock" size={17} className="mt-0.5 shrink-0 text-brand-600" />
                    <div>
                      <dt className="font-semibold text-ink-900">{c.time}</dt>
                      <dd className="mt-0.5 text-ink-600">{e.timeLabel}</dd>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-brand-600" />
                  <div>
                    <dt className="font-semibold text-ink-900">{c.place}</dt>
                    <dd className="mt-0.5 text-ink-600">{e.location}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="badge" size={17} className="mt-0.5 shrink-0 text-brand-600" />
                  <div>
                    <dt className="font-semibold text-ink-900">{c.price}</dt>
                    <dd className="mt-0.5 text-ink-600">{e.price}</dd>
                  </div>
                </div>
                {e.seats && (
                  <div className="flex gap-3">
                    <Icon name="users" size={17} className="mt-0.5 shrink-0 text-brand-600" />
                    <div>
                      <dt className="font-semibold text-ink-900">{c.seats}</dt>
                      <dd className="mt-0.5 text-ink-600">{e.seats}</dd>
                    </div>
                  </div>
                )}
              </dl>

              <div className="mt-6 space-y-2.5 border-t border-line pt-5">
                {upcoming && e.registrationOpen ? (
                  <Link href="/membership/join" className="btn btn-primary w-full">
                    {c.register}
                    <Icon name="arrow-right" size={16} />
                  </Link>
                ) : upcoming ? (
                  <Link href="/contact" className="btn btn-primary w-full">
                    {c.waitlist}
                  </Link>
                ) : (
                  <Link href="/education" className="btn btn-primary w-full">
                    {c.recording}
                  </Link>
                )}
                <AddToCalendar locale={locale} event={e} />
              </div>
            </div>

            {others.length > 0 && (
              <div className="mt-5">
                <p className="mb-3 px-1 text-sm font-bold text-ink-900">{c.others}</p>
                <ul className="space-y-2.5">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        href={`/events/${o.slug}`}
                        className="card card-hover block p-4 text-sm font-semibold leading-snug text-ink-800 hover:text-brand-800"
                      >
                        {o.title}
                        <span className="mt-1.5 block text-xs font-normal text-ink-500">
                          {formatDateRange(o.start, o.end, locale)}
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
