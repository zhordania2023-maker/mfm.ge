import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { content } from "@/content";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "სამართლებრივი",
    title: "წესები და პირობები",
    intro: "ბოლო განახლება: 2026 წლის 1 აგვისტო",
    crumb: "წესები და პირობები",
    metaDesc: "საიტით სარგებლობის წესები, პასუხისმგებლობის შეზღუდვა და საავტორო უფლებები.",
    body: (email: string) => [
      "## სამედიცინო გაფრთხილება",
      "საიტზე განთავსებული ინფორმაცია, მათ შორის კლინიკური გაიდლაინები და პაციენტთა მასალები, საინფორმაციო და საგანმანათლებლო ხასიათისაა. ის არ წარმოადგენს სამედიცინო კონსულტაციას და არ ცვლის კვალიფიციური ჯანდაცვის სპეციალისტის შეფასებას.",
      "> გადაუდებელი მდგომარეობისას დაუყოვნებლივ მიმართეთ სამედიცინო დაწესებულებას ან დარეკეთ 112-ზე.",
      "## გაიდლაინების გამოყენება",
      "კლინიკური გაიდლაინები წარმოადგენს რეკომენდაციას და არ ცვლის კლინიცისტის პროფესიულ განსჯას კონკრეტულ შემთხვევაში. საბოლოო გადაწყვეტილებაზე პასუხისმგებლობა ეკისრება მკურნალ ექიმს.",
      "## საავტორო უფლებები",
      "საიტზე განთავსებული მასალები ეკუთვნის MFM საქართველოს. გაიდლაინებისა და საინფორმაციო მასალების გამოყენება დასაშვებია არაკომერციული, საგანმანათლებლო და კლინიკური მიზნით, წყაროს მითითებით.",
      "მასალების კომერციული გამოყენება, თარგმნა ან მოდიფიცირება საჭიროებს წინასწარ წერილობით თანხმობას.",
      "## სპეციალისტების კატალოგი",
      "კატალოგში განთავსებული ინფორმაცია მოწოდებულია თავად სპეციალისტების მიერ. MFM საქართველო არ იძლევა გარანტიას მომსახურების ხარისხზე და არ არის მხარე პაციენტსა და ექიმს შორის ურთიერთობაში.",
      "## ბმულები გარე რესურსებზე",
      "საიტი შეიცავს ბმულებს მესამე მხარის რესურსებზე. მათ შინაარსზე პასუხისმგებლობას არ ვიღებთ.",
      "## პირობების ცვლილება",
      "ვიტოვებთ უფლებას განვაახლოთ ეს პირობები. არსებითი ცვლილების შემთხვევაში წევრებს ვაცნობებთ ელფოსტით.",
      "## კონტაქტი",
      `კითხვებისთვის: ${email}`,
    ],
  },
  en: {
    eyebrow: "Legal",
    title: "Terms and conditions",
    intro: "Last updated: 1 August 2026",
    crumb: "Terms and conditions",
    metaDesc: "Terms of use, limitation of liability and copyright.",
    body: (email: string) => [
      "## Medical disclaimer",
      "The information on this site, including clinical guidelines and patient materials, is informational and educational. It is not medical advice and does not replace assessment by a qualified healthcare professional.",
      "> In an emergency, contact a healthcare provider immediately or call 112.",
      "## Using the guidelines",
      "Clinical guidelines are recommendations and do not replace the clinician's professional judgement in an individual case. Responsibility for the final decision rests with the treating physician.",
      "## Copyright",
      "The materials on this site belong to MFM Georgia. Guidelines and information materials may be used for non-commercial, educational and clinical purposes with attribution.",
      "Commercial use, translation or modification of these materials requires prior written permission.",
      "## The specialist directory",
      "Information in the directory is supplied by the specialists themselves. MFM Georgia gives no warranty as to the quality of services and is not a party to the relationship between patient and clinician.",
      "## Links to external resources",
      "The site contains links to third-party resources. We take no responsibility for their content.",
      "## Changes to these terms",
      "We reserve the right to update these terms. Members will be notified by email of any material change.",
      "## Contact",
      `Questions: ${email}`,
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function TermsPage({ params }: LocaleParams) {
  const locale = await getLocale(params);
  const c = pick(copy, locale);
  const { site } = content(locale);

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
          <div className="max-w-2xl">
            <Prose blocks={c.body(site.email)} />
          </div>
        </div>
      </section>
    </>
  );
}
