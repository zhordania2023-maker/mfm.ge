import Link from "@/components/ui/LocaleLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { pick } from "@/lib/page";
import { cn } from "@/lib/utils";

type Pillar = {
  icon: IconName;
  title: string;
  text: string;
  href: string;
  cta: string;
  highlight?: boolean;
};

const copy: Record<Locale, Pillar[]> = {
  ka: [
    {
      icon: "users",
      title: "პაციენტებისთვის და ოჯახებისთვის",
      text: "სანდო ინფორმაცია, რესურსები და შემოწმებული პასუხები — მარტივ ენაზე. იპოვეთ სპეციალისტი თქვენს რეგიონში და გაიგეთ, რას უნდა ელოდოთ.",
      href: "/patients",
      cta: "იხილეთ რესურსები",
    },
    {
      icon: "stethoscope",
      title: "წევრობა და ანგარიშება",
      text: "შეუერთდით პროფესიონალთა საზოგადოებას. მიიღეთ წვდომა გაიდლაინებზე, საგანმანათლებლო მასალებსა და კოლეგიალურ ქსელზე.",
      href: "/membership",
      cta: "გახდით წევრი",
    },
    {
      icon: "shield",
      title: "შემოწირულობა",
      text: "იქცევა მნიშვნელოვან გავლენად — გადამზადებული სპეციალისტები და ნაყოფის განმსაზღვრელი კვლევები საქართველოში.",
      href: "/donate",
      cta: "დაუჭირეთ მხარი",
      highlight: true,
    },
  ],
  en: [
    {
      icon: "users",
      title: "For patients and families",
      text: "Reliable information, resources and checked answers in plain language. Find a specialist in your region and learn what to expect.",
      href: "/patients",
      cta: "Browse resources",
    },
    {
      icon: "stethoscope",
      title: "Membership and accountability",
      text: "Join the professional society. Get access to guidelines, educational material and a network of colleagues.",
      href: "/membership",
      cta: "Become a member",
    },
    {
      icon: "shield",
      title: "Donate",
      text: "Your support becomes real impact — trained specialists and the research that shapes fetal care in Georgia.",
      href: "/donate",
      cta: "Support our work",
      highlight: true,
    },
  ],
};

export function Pillars({ locale }: { locale: Locale }) {
  const pillars = pick(copy, locale);

  return (
    <section className="relative z-10 bg-cream-100 pb-20">
      <div className="container-x">
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.title}
              className={cn(
                "card card-hover flex flex-col p-7",
                p.highlight && "border-brand-200 bg-brand-50",
              )}
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  p.highlight ? "bg-brand-700 text-white" : "bg-cream-200 text-brand-700",
                )}
              >
                <Icon name={p.icon} size={22} />
              </span>

              <h3 className="mt-6 text-[1.1875rem] leading-snug">{p.title}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-600">{p.text}</p>

              {p.highlight ? (
                <Link href={p.href} className="btn btn-primary mt-7 w-full">
                  {p.cta}
                </Link>
              ) : (
                <Link
                  href={p.href}
                  className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700"
                >
                  {p.cta}
                  <Icon
                    name="arrow-right"
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
