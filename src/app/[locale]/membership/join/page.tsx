import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { JoinForm } from "@/components/forms/JoinForm";
import { content } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

type Props = LocaleParams & { searchParams: Promise<{ tier?: string }> };

const copy = {
  ka: {
    eyebrow: "წევრობა",
    title: "გაწევრიანების განაცხადი",
    intro:
      "ფორმის შევსებას სჭირდება დაახლოებით 5 წუთი. დოკუმენტების გადამოწმებას — სამ სამუშაო დღემდე.",
    parent: "წევრობა",
    crumb: "განაცხადი",
    metaDesc: "შეავსეთ ონლაინ განაცხადი MFM საქართველოში გასაწევრიანებლად — 5 წუთში.",
    nextTitle: "რა ხდება შემდეგ",
    dataTitle: "თქვენი მონაცემები",
    dataText:
      "მონაცემები გამოიყენება მხოლოდ განაცხადის განხილვისა და წევრობის ადმინისტრირებისთვის. მესამე მხარეს არ გადაეცემა.",
  },
  en: {
    eyebrow: "Membership",
    title: "Membership application",
    intro:
      "The form takes about five minutes. Verifying your documents takes up to three working days.",
    parent: "Membership",
    crumb: "Application",
    metaDesc: "Complete the online application to join MFM Georgia — it takes five minutes.",
    nextTitle: "What happens next",
    dataTitle: "Your data",
    dataText:
      "Your data is used only to process the application and administer membership. It is not shared with third parties.",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function JoinPage({ params, searchParams }: Props) {
  const locale = await getLocale(params);
  const { tier } = await searchParams;
  const c = pick(copy, locale);
  const bundle = content(locale);

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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <JoinForm
              locale={locale}
              tiers={bundle.tiers}
              cities={bundle.cities}
              defaultTier={tier}
            />

            <aside className="space-y-4 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <div className="card p-6">
                <p className="text-sm font-bold text-ink-900">{c.nextTitle}</p>
                <ol className="mt-4 space-y-3.5">
                  {bundle.joinSteps.map((s) => (
                    <li key={s.step} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream-200 text-[0.6875rem] font-bold text-ink-700">
                        {s.step}
                      </span>
                      <span>
                        <span className="block text-[0.8125rem] font-semibold text-ink-900">
                          {s.title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-ink-500">
                          {s.text}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card bg-cream-200 p-6">
                <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                  <Icon name="shield" size={16} className="text-brand-600" />
                  {c.dataTitle}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-600">{c.dataText}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
