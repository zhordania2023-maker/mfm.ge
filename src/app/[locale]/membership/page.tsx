import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader, SectionHeading } from "@/components/ui/PageHeader";
import { content } from "@/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";
import { cn } from "@/lib/utils";

const copy = {
  ka: {
    eyebrow: "წევრობა",
    title: "შეუერთდით 480-ზე მეტ სპეციალისტს",
    intro:
      "წევრობა გაძლევთ წვდომას კლინიკურ რესურსებზე, უწყვეტ განათლებაზე, პროფესიულ ქსელსა და გადაწყვეტილებებზე, რომლებიც განსაზღვრავს ჩვენი დარგის სტანდარტს.",
    crumb: "წევრობა",
    metaDesc:
      "MFM საქართველოს წევრობის უპირატესობები, საწევრო კატეგორიები და გაწევრიანების პროცესი.",
    applyCta: "გაწევრიანების განაცხადი",
    benefitsEyebrow: "უპირატესობები",
    benefitsTitle: "რას იღებთ წევრობით",
    tiersEyebrow: "ტარიფები",
    tiersTitle: "საწევრო კატეგორიები",
    tiersIntro:
      "საწევრო ანაზღაურდება წელიწადში ერთხელ. ინსტიტუციური წევრობისთვის გამოიწერება ინვოისი.",
    popular: "ყველაზე ხშირი არჩევანი",
    choose: "არჩევა",
    processEyebrow: "პროცესი",
    processTitle: "როგორ ხდება გაწევრიანება",
    startCta: "დაიწყეთ განაცხადი",
    questionCta: "გაქვთ კითხვა?",
  },
  en: {
    eyebrow: "Membership",
    title: "Join more than 480 specialists",
    intro:
      "Membership gives you access to clinical resources, continuing education, a professional network and the decisions that set the standard in our field.",
    crumb: "Membership",
    metaDesc:
      "MFM Georgia membership benefits, tiers and how to join.",
    applyCta: "Apply for membership",
    benefitsEyebrow: "Benefits",
    benefitsTitle: "What membership gives you",
    tiersEyebrow: "Rates",
    tiersTitle: "Membership tiers",
    tiersIntro:
      "Dues are paid once a year. Institutional membership is invoiced.",
    popular: "Most popular",
    choose: "Select",
    processEyebrow: "Process",
    processTitle: "How to join",
    startCta: "Start your application",
    questionCta: "Have a question?",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function MembershipPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { tiers, memberBenefits, joinSteps } = content(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.crumb }]}
      >
        <Link href="/membership/join" className="btn btn-primary btn-lg">
          {c.applyCta}
          <Icon name="arrow-right" size={18} />
        </Link>
      </PageHeader>

      {/* უპირატესობები */}
      <section className="pb-20">
        <div className="container-x">
          <SectionHeading eyebrow={c.benefitsEyebrow} title={c.benefitsTitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {memberBenefits.map((b) => (
              <div key={b.title} className="card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Icon name={b.icon as IconName} size={20} />
                </span>
                <h3 className="mt-5 text-[1.0625rem]">{b.title}</h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-600">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ტარიფები */}
      <section id="tiers" className="scroll-mt-28 bg-cream-300 py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow={c.tiersEyebrow}
            title={c.tiersTitle}
            intro={c.tiersIntro}
            align="center"
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {tiers.map((tier) => (
              <article
                key={tier.id}
                className={cn(
                  "card relative flex flex-col p-7",
                  tier.highlight && "border-brand-300 shadow-[var(--shadow-lift)] lg:-mt-4 lg:mb-4",
                )}
              >
                {tier.highlight && (
                  <span className="badge absolute -top-3 left-7 bg-brand-700 text-white">
                    {c.popular}
                  </span>
                )}
                <h3 className="text-xl">{tier.name}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">{tier.audience}</p>

                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-[2.25rem] font-bold leading-none text-brand-700">
                    {tier.price}
                  </span>
                  <span className="text-sm text-ink-500">/ {tier.period}</span>
                </p>

                <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-5">
                  {tier.perks.map((p) => (
                    <li
                      key={p}
                      className="flex gap-2.5 text-[0.875rem] leading-relaxed text-ink-700"
                    >
                      <Icon name="check" size={14} className="mt-1 shrink-0 text-brand-600" />
                      {p}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/membership/join?tier=${tier.id}`}
                  className={cn("btn mt-7 w-full", tier.highlight ? "btn-primary" : "btn-outline")}
                >
                  {c.choose}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* პროცესი */}
      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow={c.processEyebrow} title={c.processTitle} />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {joinSteps.map((s) => (
              <li key={s.step} className="card p-6">
                <p className="text-2xl font-bold text-brand-200">{s.step}</p>
                <h3 className="mt-2 text-[1.0625rem]">{s.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-600">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/membership/join" className="btn btn-primary btn-lg">
              {c.startCta}
              <Icon name="arrow-right" size={18} />
            </Link>
            <Link href="/contact" className="btn btn-outline btn-lg">
              {c.questionCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
