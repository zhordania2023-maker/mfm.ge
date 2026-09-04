import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { LoginForm } from "@/components/forms/LoginForm";
import { LogoMark } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    title: "პირადი კაბინეტი",
    intro: "შედით თქვენი წევრობის მონაცემებით.",
    metaDesc: "შედით პირად კაბინეტში — CME კურსები, გაიდლაინები და წევრობის მართვა.",
    notMember: "ჯერ არ ხართ წევრი?",
    joinCta: "გაწევრიანების განაცხადი",
    asideEyebrow: "წევრის წვდომა",
    asideTitle: "ყველაფერი, რაც პრაქტიკაში გჭირდებათ",
    perks: [
      "CME კურსები და კრედიტების აღრიცხვა",
      "გაიდლაინების სრული არქივი",
      "24/7 კონსულტაციის ხაზის კოდი",
      "საწევროს სტატუსი და ინვოისები",
    ],
  },
  en: {
    title: "Member area",
    intro: "Sign in with your membership details.",
    metaDesc: "Sign in to your account — CME courses, guidelines and membership management.",
    notMember: "Not a member yet?",
    joinCta: "Apply for membership",
    asideEyebrow: "Member access",
    asideTitle: "Everything you need in practice",
    perks: [
      "CME courses and credit tracking",
      "The complete guideline archive",
      "The 24/7 consultation line code",
      "Membership status and invoices",
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.title, description: c.metaDesc, robots: { index: false, follow: false } };
}

export default async function LoginPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);

  return (
    <section className="min-h-[calc(100vh-var(--header-h))] pb-20 pt-[calc(var(--header-h)+3rem)]">
      <div className="container-x">
        <div className="mx-auto grid max-w-4xl overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[var(--shadow-soft)] lg:grid-cols-2">
          <div className="p-8 sm:p-10">
            <LogoMark className="h-10 w-10 text-brand-700" />
            <h1 className="mt-6 text-2xl">{c.title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.intro}</p>

            <div className="mt-7">
              <LoginForm locale={locale} />
            </div>

            <p className="mt-7 border-t border-line pt-6 text-sm text-ink-600">
              {c.notMember}{" "}
              <Link
                href="/membership/join"
                className="font-semibold text-brand-700 hover:underline"
              >
                {c.joinCta}
              </Link>
            </p>
          </div>

          <div className="relative hidden bg-brand-900 p-10 text-white lg:flex lg:flex-col lg:justify-center">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-700/40 blur-3xl"
            />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-300">
                {c.asideEyebrow}
              </p>
              <h2 className="mt-4 text-2xl leading-snug text-white">{c.asideTitle}</h2>
              <ul className="mt-7 space-y-3.5">
                {c.perks.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-cream-200/85">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand-300" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
