import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { pick } from "@/lib/page";
import { IMG } from "@/content/images";

const copy = {
  ka: {
    badge: "ფონდი MFM",
    title: "თანაბარი და ოპტიმალური ორსულობის მოვლის ხელშეწყობა",
    intro:
      "კვლევების, განათლებისა და ადვოკატირების გზით ვმუშაობთ იმისთვის, რომ საქართველოში ყველა ორსულს — საცხოვრებელი ადგილის მიუხედავად — ჰქონდეს წვდომა უსაფრთხო და თანამედროვე სამედიცინო ზრუნვაზე.",
    ctaPrimary: "გაიგეთ მეტი ფონდის შესახებ",
    ctaSecondary: "ღონისძიებების კალენდარი",
    cardTitle: "24/7 კონსულტაციის ხაზი",
    cardText: "მაღალი რისკის ორსულობა — ცხრა რეგიონული ცენტრი",
    imageAlt: "ორსული ქალი კონსულტაციაზე MFM საქართველოს პარტნიორ კლინიკაში",
    stats: [
      { v: "480+", l: "აქტიური წევრი" },
      { v: "62", l: "გაიდლაინი" },
      { v: "9", l: "რეგიონული ცენტრი" },
    ],
  },
  en: {
    badge: "MFM Foundation",
    title: "Advancing equitable, optimal pregnancy care",
    intro:
      "Through research, education and advocacy we work so that every pregnant person in Georgia — wherever they live — has access to safe, modern medical care.",
    ctaPrimary: "About the foundation",
    ctaSecondary: "Events calendar",
    cardTitle: "24/7 consultation line",
    cardText: "High-risk pregnancy — nine regional centres",
    imageAlt: "A pregnant woman at a consultation in an MFM Georgia partner clinic",
    stats: [
      { v: "480+", l: "active members" },
      { v: "62", l: "guidelines" },
      { v: "9", l: "regional centres" },
    ],
  },
};

export function Hero({ locale }: { locale: Locale }) {
  const c = pick(copy, locale);

  return (
    <section className="relative overflow-hidden bg-cream-100">
      {/* მარჯვენა ფოტო — დესკტოპზე გვერდის კიდემდე */}
      <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        <Image
          src={IMG.hero}
          alt={c.imageAlt}
          fill
          priority
          sizes="46vw"
          className="rounded-bl-[3rem] object-cover object-[60%_25%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 rounded-bl-[3rem] bg-[linear-gradient(to_right,var(--color-cream-100)_0%,rgba(250,249,245,0.55)_18%,rgba(250,249,245,0)_48%)]"
        />

        {/* მცურავი საინფორმაციო ბარათი */}
        <div className="card absolute bottom-16 left-2 flex max-w-[17rem] items-start gap-3.5 p-4 xl:left-8">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white">
            <Icon name="phone" size={18} />
          </span>
          <span>
            <span className="block text-[0.9375rem] font-bold leading-snug text-ink-900">
              {c.cardTitle}
            </span>
            <span className="mt-1 block text-xs leading-snug text-ink-500">{c.cardText}</span>
          </span>
        </div>
      </div>

      <div className="container-x relative">
        <div className="grid items-center gap-12 pb-16 pt-[calc(var(--header-h)+3rem)] lg:min-h-[38rem] lg:grid-cols-[minmax(0,54%)_1fr] lg:pb-24 lg:pt-[calc(var(--header-h)+5rem)]">
          <div className="animate-fade-up">
            <Link
              href="/donate"
              className="badge border border-brand-200 bg-brand-50 text-brand-800 transition hover:bg-brand-100"
            >
              <Icon name="heart" size={13} />
              {c.badge}
            </Link>

            <h1 className="mt-6 text-[2.25rem] leading-[1.14] sm:text-[2.75rem] lg:text-[3rem]">
              {c.title}
            </h1>

            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-600">{c.intro}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/donate" className="btn btn-primary group">
                {c.ctaPrimary}
                <Icon
                  name="arrow-right"
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link href="/events" className="btn btn-outline">
                {c.ctaSecondary}
              </Link>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
              {c.stats.map((s) => (
                <div key={s.l}>
                  <dt className="text-2xl font-bold text-brand-800">{s.v}</dt>
                  <dd className="mt-1 text-[0.8125rem] leading-snug text-ink-500">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* მობილურის ფოტო */}
          <div className="relative -mx-5 h-64 sm:h-80 lg:hidden">
            <Image
              src={IMG.hero}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[60%_25%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
