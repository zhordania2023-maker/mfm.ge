import type { NavGroup, NavItem } from "../types";
import { IMG } from "../images";

export const mainNav: NavItem[] = [
  { label: "მთავარი", href: "/" },
  {
    label: "ჩვენს შესახებ",
    href: "/about",
    groups: [
      {
        title: "ორგანიზაცია",
        links: [
          { label: "მისია და ხედვა", href: "/about", description: "ვინ ვართ და რას ვაკეთებთ" },
          { label: "გამგეობა", href: "/about/board", description: "დირექტორთა საბჭო" },
          { label: "გუნდი", href: "/about/staff", description: "აღმასრულებელი ოფისი" },
          { label: "ისტორია", href: "/about/history", description: "2009 წლიდან დღემდე" },
        ],
      },
      {
        title: "გამჭვირვალობა",
        links: [
          { label: "ინტერესთა კონფლიქტი", href: "/about/disclosures", description: "დეკლარაციის პოლიტიკა" },
          { label: "წლიური ანგარიშები", href: "/about/reports", description: "ფინანსური და საქმიანობის" },
          { label: "პარტნიორები", href: "/about/partners", description: "ადგილობრივი და საერთაშორისო" },
          { label: "კონტაქტი", href: "/contact", description: "დაგვიკავშირდით" },
        ],
      },
    ],
    feature: {
      eyebrow: "ჩვენი მისია",
      title: "თანაბარი ზრუნვა ყველა ორსულისთვის",
      text: "ვმუშაობთ იმისთვის, რომ მაღალი რისკის ორსულობის მართვის ხარისხი არ იყოს დამოკიდებული საცხოვრებელ რეგიონზე.",
      href: "/about",
      cta: "გაიგეთ მეტი",
      image: IMG.mission,
    },
  },
  {
    label: "პაციენტებისთვის",
    href: "/patients",
    groups: [
      {
        title: "დახმარება",
        links: [
          { label: "სპეციალისტის მოძებნა", href: "/patients/find-specialist", description: "პერინატოლოგები რუკაზე" },
          { label: "ხშირი კითხვები", href: "/patients/faq", description: "პასუხები მარტივ ენაზე" },
          { label: "მაღალი რისკის ორსულობა", href: "/patients/high-risk", description: "რას ნიშნავს და რა უნდა იცოდეთ" },
        ],
      },
      {
        title: "რესურსები",
        links: [
          { label: "საინფორმაციო ბროშურები", href: "/patients/resources", description: "ჩამოსატვირთი მასალები" },
          { label: "პაციენტის უფლებები", href: "/patients/rights", description: "სამედიცინო მომსახურების სტანდარტი" },
          { label: "მხარდაჭერის ჯგუფები", href: "/patients/support", description: "თემი და კონსულტაცია" },
        ],
      },
    ],
    feature: {
      eyebrow: "ინსტრუმენტი",
      title: "იპოვეთ პერინატოლოგი თქვენს რეგიონში",
      text: "მოძებნეთ სერტიფიცირებული სპეციალისტი ქალაქის, სუბსპეციალობისა და ენის მიხედვით.",
      href: "/patients/find-specialist",
      cta: "ძიების დაწყება",
      image: IMG.finder,
    },
  },
  {
    label: "ექიმებისთვის",
    href: "/guidelines",
    groups: [
      {
        title: "კლინიკური პრაქტიკა",
        links: [
          { label: "გაიდლაინები", href: "/guidelines", description: "62 დოკუმენტი, ღია წვდომით" },
          { label: "კვირის კლინიკური შემთხვევა", href: "/education/cases", description: "ყოველკვირეული განხილვა" },
          { label: "პროტოკოლების ბიბლიოთეკა", href: "/guidelines?type=protocol", description: "სამოქმედო ალგორითმები" },
        ],
      },
      {
        title: "პრაქტიკის მართვა",
        links: [
          { label: "კოდირება და ანაზღაურება", href: "/practice/coding", description: "სადაზღვევო პრაქტიკა" },
          { label: "ხარისხი და პაციენტის უსაფრთხოება", href: "/practice/quality", description: "აუდიტის ინსტრუმენტები" },
          { label: "ტელემედიცინა", href: "/practice/telehealth", description: "დისტანციური კონსულტაცია" },
        ],
      },
    ],
    feature: {
      eyebrow: "ახალი",
      title: "პრეეკლამფსიის მართვის განახლებული გაიდლაინი",
      text: "2025 წლის რევიზია — სკრინინგი, პროფილაქტიკა და მშობიარობის დროის განსაზღვრა.",
      href: "/guidelines/preeklampsia-martva",
      cta: "დოკუმენტის ნახვა",
      image: IMG.guideline,
    },
  },
  {
    label: "განათლება",
    href: "/education",
    groups: [
      {
        title: "პროგრამები",
        links: [
          { label: "უწყვეტი განათლება (CME)", href: "/education", description: "კურსები და კრედიტები" },
          { label: "რეზიდენტურა და ფელოუშიპი", href: "/education/fellowship", description: "სასწავლო პროგრამები" },
          { label: "სიმულაციური ტრენინგები", href: "/education/simulation", description: "პრაქტიკული უნარები" },
        ],
      },
      {
        title: "ღონისძიებები",
        links: [
          { label: "ყველა ღონისძიება", href: "/events", description: "კალენდარი და რეგისტრაცია" },
          { label: "წლიური კონგრესი", href: "/events/mfm-globaluri-kongresi-2026", description: "საქართველოს მთავარი ფორუმი" },
          { label: "ვებინარები", href: "/events?type=webinar", description: "ონლაინ, უფასო წვდომით" },
        ],
      },
    ],
    feature: {
      eyebrow: "რეგისტრაცია გახსნილია",
      title: "MFM გლობალური კონგრესი 2026",
      text: "5–7 დეკემბერი, თბილისი — 40+ სპიკერი, 12 სამუშაო შეხვედრა.",
      href: "/events/mfm-globaluri-kongresi-2026",
      cta: "დარეგისტრირდით",
      image: IMG.congress,
    },
  },
  {
    label: "წევრობა",
    href: "/membership",
    groups: [
      {
        title: "გაწევრიანება",
        links: [
          { label: "რატომ MFM", href: "/membership", description: "წევრობის უპირატესობები" },
          { label: "განაცხადის შევსება", href: "/membership/join", description: "ონლაინ ფორმა" },
          { label: "საწევრო კატეგორიები", href: "/membership#tiers", description: "ტარიფები და პირობები" },
        ],
      },
      {
        title: "თემი",
        links: [
          { label: "სამუშაო ჯგუფები", href: "/membership/committees", description: "მოხალისეობრივი ჩართულობა" },
          { label: "წევრის პროფილი", href: "/login", description: "პირადი კაბინეტი" },
          { label: "ჟურნალი და კვლევა", href: "/research", description: "პუბლიკაციები და გრანტები" },
        ],
      },
    ],
    feature: {
      eyebrow: "შემოგვიერთდით",
      title: "480+ სპეციალისტი უკვე ჩვენთანაა",
      text: "წვდომა გაიდლაინებზე, CME კრედიტებზე, კონგრესის ფასდაკლებაზე და პროფესიულ ქსელზე.",
      href: "/membership/join",
      cta: "გახდით წევრი",
      image: IMG.community,
    },
  },
  {
    label: "სიახლეები",
    href: "/news",
  },
];

export const footerNav: NavGroup[] = [
  {
    title: "ორგანიზაცია",
    links: [
      { label: "ჩვენს შესახებ", href: "/about" },
      { label: "გამგეობა", href: "/about/board" },
      { label: "გუნდი", href: "/about/staff" },
      { label: "პარტნიორები", href: "/about/partners" },
      { label: "კონტაქტი", href: "/contact" },
    ],
  },
  {
    title: "პროფესიონალებისთვის",
    links: [
      { label: "კლინიკური გაიდლაინები", href: "/guidelines" },
      { label: "განათლება და CME", href: "/education" },
      { label: "ღონისძიებები", href: "/events" },
      { label: "კვლევა", href: "/research" },
      { label: "წევრობა", href: "/membership" },
    ],
  },
  {
    title: "პაციენტებისთვის",
    links: [
      { label: "სპეციალისტის მოძებნა", href: "/patients/find-specialist" },
      { label: "ხშირი კითხვები", href: "/patients/faq" },
      { label: "საინფორმაციო მასალები", href: "/patients/resources" },
      { label: "მაღალი რისკის ორსულობა", href: "/patients/high-risk" },
      { label: "სიახლეები", href: "/news" },
    ],
  },
];
