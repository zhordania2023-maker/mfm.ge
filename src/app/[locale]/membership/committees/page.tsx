import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { content } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "თემი",
    title: "სამუშაო ჯგუფები",
    intro:
      "ჯგუფებში მონაწილეობა მოხალისეობრივია და სწორედ იქ იქმნება ის, რასაც შემდეგ ყველა ვიყენებთ — გაიდლაინები, სასწავლო პროგრამები და აუდიტის ინსტრუმენტები.",
    parent: "წევრობა",
    crumb: "სამუშაო ჯგუფები",
    metaDesc: "MFM საქართველოს სამუშაო ჯგუფები — მიმართულებები, ხელმძღვანელები და ჩართვის წესი.",
    lead: "ხელმძღვანელი",
    members: "წევრები",
    joinTitle: "გსურთ ჩართვა?",
    joinText:
      "ჯგუფებში ჩართვა შეუძლია ნებისმიერ აქტიურ წევრს. მოსალოდნელი დატვირთვა — თვეში 3–5 საათი. ახალი წევრების მიღება ხდება ორჯერ წელიწადში.",
    joinCta: "განაცხადის გაგზავნა",
  },
  en: {
    eyebrow: "Community",
    title: "Working groups",
    intro:
      "Participation is voluntary, and this is where the things we all use are made — guidelines, training programmes and audit tools.",
    parent: "Membership",
    crumb: "Working groups",
    metaDesc: "MFM Georgia working groups — their focus, who leads them and how to join.",
    lead: "Lead",
    members: "Members",
    joinTitle: "Want to take part?",
    joinText:
      "Any active member can join a working group. Expect a commitment of 3–5 hours a month. New members are admitted twice a year.",
    joinCta: "Send a request",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function CommitteesPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { committees } = content(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.parent, href: "/membership" }, { label: c.crumb }]}
      />

      <section className="pb-20">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {committees.map((cm) => (
              <article key={cm.name} className="card flex flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Icon name="users" size={20} />
                </span>
                <h2 className="mt-5 text-[1.0625rem] leading-snug">{cm.name}</h2>
                <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
                  {cm.focus}
                </p>
                <dl className="mt-5 space-y-1.5 border-t border-line pt-4 text-xs">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-500">{c.lead}</dt>
                    <dd className="text-right font-semibold text-ink-800">{cm.lead}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-500">{c.members}</dt>
                    <dd className="font-semibold text-ink-800">{cm.members}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="card mt-10 flex flex-col items-start gap-5 bg-brand-50 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg">{c.joinTitle}</h2>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-600">{c.joinText}</p>
            </div>
            <Link href="/contact" className="btn btn-primary shrink-0">
              {c.joinCta}
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
