import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { pick } from "@/lib/page";
import { IMG } from "@/content/images";

const copy = {
  ka: {
    title: "ზრუნვა, რომელიც ორიენტირებულია თქვენზე",
    intro:
      "ორსულობა უნიკალური მოგზაურობაა. ჩვენ ვქმნით სივრცეს, სადაც ყოველი კითხვა პასუხს პოულობს, ყოველი შეშფოთება — ყურადღებას და ყოველი გადაწყვეტილება მიიღება ინფორმირებულად, ერთობლივად.",
    points: [
      "ინდივიდუალური მიდგომა თითოეული პაციენტის საჭიროებისამებრ — მრავალდისციპლინური გუნდის ჩართულობით.",
      "უახლესი მტკიცებულებებზე დაფუძნებული სამედიცინო პრაქტიკა, ადაპტირებული ადგილობრივ კონტექსტზე.",
      "უწყვეტი საკომუნიკაციო მხარდაჭერა პროფესიონალებსა და პაციენტებს შორის — ზრუნვის ყველა ეტაპზე.",
    ],
    ctaPrimary: "ჩვენს შესახებ",
    ctaSecondary: "სპეციალისტის მოძებნა",
    badgeValue: "15+",
    badgeLabel: "წლიანი გამოცდილება",
    imageAlt: "ექიმი და ორსული პაციენტი ულტრაბგერითი კვლევის დროს",
  },
  en: {
    title: "Care that is built around you",
    intro:
      "Every pregnancy is its own journey. We create a space where every question gets an answer, every worry gets attention, and every decision is made together, with full information.",
    points: [
      "An individual approach to each patient's needs, with a multidisciplinary team involved.",
      "Evidence-based practice from the latest research, adapted to the local context.",
      "Continuous communication between clinicians and patients at every stage of care.",
    ],
    ctaPrimary: "About us",
    ctaSecondary: "Find a specialist",
    badgeValue: "15+",
    badgeLabel: "years of experience",
    imageAlt: "A clinician and a pregnant patient during an ultrasound examination",
  },
};

export function CareSection({ locale }: { locale: Locale }) {
  const c = pick(copy, locale);

  return (
    <section className="bg-cream-300 py-20 lg:py-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* ვიზუალი */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -left-4 -top-4 h-full w-full rounded-[1.75rem] bg-lilac-300/60"
            />
            <div className="relative aspect-[6/5] overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lift)]">
              <Image
                src={IMG.care}
                alt={c.imageAlt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="card absolute -bottom-8 right-4 flex items-center gap-3.5 p-4 pr-6 sm:right-8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Icon name="shield" size={21} />
              </span>
              <span>
                <span className="block text-lg font-bold text-ink-900">{c.badgeValue}</span>
                <span className="block max-w-[7rem] text-xs leading-snug text-ink-500">
                  {c.badgeLabel}
                </span>
              </span>
            </div>
          </div>

          {/* ტექსტი */}
          <div className="lg:pl-6">
            <h2 className="text-[2rem] leading-[1.16] sm:text-[2.5rem]">{c.title}</h2>

            <p className="mt-6 leading-relaxed text-ink-600">{c.intro}</p>

            <ul className="mt-8 space-y-4">
              {c.points.map((p) => (
                <li key={p} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Icon name="check" size={13} strokeWidth={2.4} />
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-ink-600">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-primary">
                {c.ctaPrimary}
                <Icon name="arrow-right" size={17} />
              </Link>
              <Link href="/patients/find-specialist" className="btn btn-outline">
                {c.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
