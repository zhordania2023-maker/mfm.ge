import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { content } from "@/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "კონტაქტი",
    title: "დაგვიკავშირდით",
    intro:
      "გაქვთ კითხვა წევრობაზე, ღონისძიებაზე ან თანამშრომლობაზე? მოგვწერეთ — პასუხს ვცემთ ორი სამუშაო დღის განმავლობაში.",
    crumb: "კონტაქტი",
    metaDesc:
      "დაგვიკავშირდით — მისამართი, ტელეფონი, ელფოსტა და საკონტაქტო ფორმა MFM საქართველოსთვის.",
    infoTitle: "საკონტაქტო ინფორმაცია",
    address: "მისამართი",
    phone: "ტელეფონი",
    email: "ელფოსტა",
    hours: "სამუშაო საათები",
    specificTitle: "სპეციფიკური მიმართვები",
    membership: "წევრობა",
    press: "მედია და პრესა",
    mapCta: "რუკაზე ნახვა",
  },
  en: {
    eyebrow: "Contact",
    title: "Get in touch",
    intro:
      "A question about membership, an event or working together? Write to us — we reply within two working days.",
    crumb: "Contact",
    metaDesc: "Contact MFM Georgia — address, phone, email and the contact form.",
    infoTitle: "Contact details",
    address: "Address",
    phone: "Phone",
    email: "Email",
    hours: "Opening hours",
    specificTitle: "Specific enquiries",
    membership: "Membership",
    press: "Media and press",
    mapCta: "View on the map",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function ContactPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { site } = content(locale);

  const blocks: { icon: IconName; label: string; value: string; href?: string }[] = [
    {
      icon: "pin",
      label: c.address,
      value: `${site.address.street}, ${site.address.city} ${site.address.zip}`,
    },
    { icon: "phone", label: c.phone, value: site.phone, href: `tel:${site.phoneHref}` },
    { icon: "mail", label: c.email, value: site.email, href: `mailto:${site.email}` },
    { icon: "clock", label: c.hours, value: site.hours },
  ];

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.crumb }]}
      />

      <section className="pb-20">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <ContactForm locale={locale} />

            <aside className="space-y-4">
              <div className="card p-6">
                <h2 className="text-lg">{c.infoTitle}</h2>
                <dl className="mt-5 space-y-4">
                  {blocks.map((b) => (
                    <div key={b.label} className="flex gap-3.5">
                      <Icon name={b.icon} size={17} className="mt-0.5 shrink-0 text-brand-600" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                          {b.label}
                        </dt>
                        <dd className="mt-1 text-sm leading-relaxed text-ink-700">
                          {b.href ? (
                            <a
                              href={b.href}
                              className="transition hover:text-brand-700 hover:underline"
                            >
                              {b.value}
                            </a>
                          ) : (
                            b.value
                          )}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="card p-6">
                <h2 className="text-base">{c.specificTitle}</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <p className="text-xs text-ink-400">{c.membership}</p>
                    <a
                      href={`mailto:${site.emailMembership}`}
                      className="text-brand-700 transition hover:underline"
                    >
                      {site.emailMembership}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs text-ink-400">{c.press}</p>
                    <a
                      href={`mailto:${site.emailPress}`}
                      className="text-brand-700 transition hover:underline"
                    >
                      {site.emailPress}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card overflow-hidden">
                <div className="relative h-44 bg-cream-300">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-500">
                    <Icon name="pin" size={26} className="text-brand-600" />
                    <p className="text-sm font-medium">{site.address.street}</p>
                    <p className="text-xs">
                      {site.address.city}, {site.address.country}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${site.address.street}, ${site.address.city}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm w-full"
                  >
                    <Icon name="external" size={14} />
                    {c.mapCta}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
