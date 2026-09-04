import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { content } from "@/content";
import { getLocale, pick, type LocaleParams } from "@/lib/page";

const copy = {
  ka: {
    eyebrow: "სამართლებრივი",
    title: "კონფიდენციალურობის პოლიტიკა",
    intro: "ბოლო განახლება: 2026 წლის 1 აგვისტო",
    crumb: "კონფიდენციალურობა",
    metaDesc: "როგორ ვაგროვებთ, ვიყენებთ და ვიცავთ თქვენს პერსონალურ მონაცემებს.",
    body: (email: string) => [
      "## რა მონაცემებს ვაგროვებთ",
      "ვაგროვებთ მხოლოდ იმ მონაცემებს, რომლებსაც თქვენ თავად გვაწვდით: სახელი, ელფოსტა, ტელეფონი, პროფესიული ინფორმაცია — გაწევრიანების, საკონტაქტო ფორმის ან სიახლეების გამოწერისას.",
      "ავტომატურად ვაგროვებთ ანონიმურ ტექნიკურ მონაცემებს (ბრაუზერის ტიპი, ნანახი გვერდები) საიტის მუშაობის გასაუმჯობესებლად. არ ვიყენებთ სარეკლამო ტრეკერებს.",
      "## რისთვის ვიყენებთ",
      "- განაცხადების განხილვისა და წევრობის ადმინისტრირებისთვის",
      "- თქვენს მიმართვაზე პასუხის გასაცემად",
      "- სიახლეების გამოსაგზავნად (მხოლოდ თანხმობის შემთხვევაში)",
      "- ღონისძიებებზე რეგისტრაციისა და CME კრედიტების აღრიცხვისთვის",
      "## ვის ვუზიარებთ",
      "პერსონალურ მონაცემებს არ ვყიდით და არ ვუზიარებთ მესამე მხარეს მარკეტინგული მიზნით. მონაცემები შეიძლება გადაეცეს მხოლოდ: ტექნიკურ პროვაიდერებს (ჰოსტინგი, ელფოსტის სერვისი) მკაცრი ხელშეკრულების ფარგლებში, ან უფლებამოსილ ორგანოს კანონით გათვალისწინებულ შემთხვევაში.",
      "## შენახვის ვადა",
      "წევრობის მონაცემები ინახება წევრობის პერიოდში და მისი შეწყვეტიდან 3 წლის განმავლობაში. საკონტაქტო ფორმის მონაცემები — 12 თვე. სიახლეების გამოწერა — გაუქმებამდე.",
      "## თქვენი უფლებები",
      "- მოითხოვოთ ინფორმაცია, რა მონაცემები გვაქვს თქვენზე",
      "- მოითხოვოთ არასწორი მონაცემის შესწორება",
      "- მოითხოვოთ მონაცემების წაშლა",
      "- გააუქმოთ თანხმობა ნებისმიერ დროს",
      "## ქუქიები",
      "ვიყენებთ მხოლოდ ტექნიკურად აუცილებელ ქუქიებს, რომლებიც უზრუნველყოფს საიტის ფუნქციონირებას (მათ შორის არჩეული ენის დამახსოვრებას). სარეკლამო ან პროფილირების ქუქიები არ გამოიყენება.",
      "## კონტაქტი",
      `მონაცემთა დაცვასთან დაკავშირებული საკითხებისთვის მოგვმართეთ: ${email}`,
    ],
  },
  en: {
    eyebrow: "Legal",
    title: "Privacy policy",
    intro: "Last updated: 1 August 2026",
    crumb: "Privacy",
    metaDesc: "How we collect, use and protect your personal data.",
    body: (email: string) => [
      "## What data we collect",
      "We collect only the data you give us yourself: name, email, phone and professional information — when applying for membership, using the contact form or subscribing to updates.",
      "We automatically collect anonymous technical data (browser type, pages viewed) to improve how the site works. We do not use advertising trackers.",
      "## What we use it for",
      "- Processing applications and administering membership",
      "- Replying to your enquiry",
      "- Sending updates (only with your consent)",
      "- Event registration and CME credit tracking",
      "## Who we share it with",
      "We do not sell personal data and do not share it with third parties for marketing. Data may be passed only to technical providers (hosting, email service) under strict contract, or to an authorised body where the law requires it.",
      "## How long we keep it",
      "Membership data is kept for the duration of membership and for three years afterwards. Contact form data is kept for 12 months. Newsletter subscriptions are kept until you unsubscribe.",
      "## Your rights",
      "- To ask what data we hold about you",
      "- To have incorrect data corrected",
      "- To have your data deleted",
      "- To withdraw consent at any time",
      "## Cookies",
      "We use only technically necessary cookies that keep the site working (including remembering your chosen language). No advertising or profiling cookies are used.",
      "## Contact",
      `For data protection questions, write to: ${email}`,
    ],
  },
};

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const c = pick(copy, await getLocale(params));
  return { title: c.crumb, description: c.metaDesc };
}

export default async function PrivacyPage({ params }: LocaleParams) {
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
