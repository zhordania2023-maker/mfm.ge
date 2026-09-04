import type { Metadata } from "next";
import Link from "@/components/ui/LocaleLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { content } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "პაციენტებისთვის",
    title: "ხშირად დასმული კითხვები",
    intro:
      "თუ თქვენს კითხვას პასუხი აქ ვერ იპოვეთ, დაგვიწერეთ — ვცდილობთ, ყოველთვიურად დავამატოთ ახალი თემები.",
    parent: "პაციენტებისთვის",
    crumb: "ხშირი კითხვები",
    metaDesc:
      "პასუხები კითხვებზე, რომლებსაც პაციენტები ყველაზე ხშირად სვამენ ორსულობის, კვლევებისა და მაღალი რისკის ორსულობის შესახებ.",
    askTitle: "ვერ იპოვეთ პასუხი?",
    askText: "დაგვისვით კითხვა — ვუპასუხებთ და, თუ თემა საერთოა, დავამატებთ ამ გვერდზე.",
    askCta: "კითხვის დასმა",
    findTitle: "გჭირდებათ სპეციალისტი?",
    findText: "იპოვეთ პერინატოლოგი თქვენს რეგიონში.",
    findCta: "ძიების დაწყება",
  },
  en: {
    eyebrow: "For patients",
    title: "Frequently asked questions",
    intro:
      "If your question is not answered here, write to us — we add new topics every month.",
    parent: "For patients",
    crumb: "FAQ",
    metaDesc:
      "Answers to the questions patients most often ask about pregnancy, tests and high-risk pregnancy.",
    askTitle: "Didn't find your answer?",
    askText: "Ask us — we will reply, and if the topic is common we will add it to this page.",
    askCta: "Ask a question",
    findTitle: "Need a specialist?",
    findText: "Find a perinatologist in your region.",
    findCta: "Start searching",
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function FaqPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { faq } = content(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: c.parent, href: "/patients" }, { label: c.crumb }]}
      />

      <section className="pb-20">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-3xl">
              <Accordion items={faq} />
            </div>

            <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
              <div className="card bg-brand-50 p-6">
                <h2 className="text-lg leading-snug">{c.askTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.askText}</p>
                <Link href="/contact" className="btn btn-primary btn-sm mt-5 w-full">
                  {c.askCta}
                  <Icon name="arrow-right" size={15} />
                </Link>
              </div>

              <div className="card mt-4 p-6">
                <h2 className="text-base leading-snug">{c.findTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.findText}</p>
                <Link
                  href="/patients/find-specialist"
                  className="btn btn-outline btn-sm mt-4 w-full"
                >
                  {c.findCta}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
