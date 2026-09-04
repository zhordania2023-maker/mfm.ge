import Image from "next/image";
import Link from "@/components/ui/LocaleLink";
import { content } from "@/content";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { pick } from "@/lib/page";
import { IMG } from "@/content/images";

const copy = {
  ka: {
    ctaEyebrow: "შემოგვიერთდით",
    ctaTitle: "გახდით იმ საზოგადოების ნაწილი, რომელიც სტანდარტს ქმნის",
    ctaText:
      "480-ზე მეტი სპეციალისტი ცხრა რეგიონში უკვე იყენებს ჩვენს გაიდლაინებს, სასწავლო პროგრამებსა და კონსულტაციის ხაზს.",
    ctaPrimary: "გაწევრიანების განაცხადი",
    ctaSecondary: "წევრობის პირობები",
    partners: "ჩვენი პარტნიორები",
  },
  en: {
    ctaEyebrow: "Join us",
    ctaTitle: "Be part of the society that sets the standard",
    ctaText:
      "More than 480 specialists across nine regions already use our guidelines, training programmes and consultation line.",
    ctaPrimary: "Apply for membership",
    ctaSecondary: "Membership terms",
    partners: "Our partners",
  },
};

export function ImpactBand({ locale }: { locale: Locale }) {
  const { impact } = content(locale);

  return (
    <section className="bg-cream-100 py-16">
      <div className="container-x">
        <div className="rounded-[1.75rem] border border-line bg-white px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {impact.map((s) => (
              <div key={s.label}>
                <p className="text-[2rem] font-bold leading-none text-brand-700">{s.value}</p>
                <p className="mt-3 text-[0.9375rem] font-semibold text-ink-900">{s.label}</p>
                <p className="mt-1 text-[0.8125rem] leading-snug text-ink-500">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ locale }: { locale: Locale }) {
  const c = pick(copy, locale);

  return (
    <section className="bg-cream-100 pb-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-900 px-6 py-14 sm:px-12 lg:px-16">
          <Image src={IMG.cta} alt="" fill sizes="100vw" className="object-cover opacity-30" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-900/45"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-300">
                {c.ctaEyebrow}
              </p>
              <h2 className="mt-3 max-w-xl text-[1.75rem] leading-tight text-white sm:text-[2.25rem]">
                {c.ctaTitle}
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-cream-200/75">{c.ctaText}</p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                href="/membership/join"
                className="btn btn-lg w-full bg-white text-brand-900 hover:bg-brand-100 lg:w-auto"
              >
                {c.ctaPrimary}
                <Icon name="arrow-right" size={18} />
              </Link>
              <Link
                href="/membership"
                className="btn btn-lg w-full border border-white/25 text-white hover:bg-white/10 lg:w-auto"
              >
                {c.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PartnersStrip({ locale }: { locale: Locale }) {
  const c = pick(copy, locale);
  const { partners } = content(locale);

  return (
    <section className="border-y border-line bg-cream-200 py-10">
      <div className="container-x">
        <p className="text-center text-xs font-bold uppercase tracking-[0.12em] text-ink-400">
          {c.partners}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.slice(0, 6).map((p) => (
            <span
              key={p.name}
              className="text-sm font-semibold text-ink-500 transition hover:text-ink-800"
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
