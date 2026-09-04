import type { Locale } from "./config";

/** ინტერფეისის სტრიქონები (კონტენტისგან დამოუკიდებელი) */
export type Dictionary = {
  common: {
    home: string;
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    close: string;
    search: string;
    searchAria: string;
    account: string;
    join: string;
    memberArea: string;
    viewAll: string;
    readMore: string;
    open: string;
    details: string;
    download: string;
    back: string;
    next: string;
    previous: string;
    page: string;
    minRead: string;
    updated: string;
    pages: string;
    breadcrumb: string;
    mainNav: string;
    mobileNav: string;
    languageGroup: string;
    backToTop: string;
    tryAgain: string;
  };
  search: {
    placeholder: string;
    overlayTitle: string;
    popular: string;
    suggestions: string[];
    noResults: (q: string) => string;
    noResultsHint: string;
    viewAllResults: string;
    hint: string;
    minChars: string;
    resultsFound: (n: number, word: string) => string;
    kinds: Record<string, string>;
    words: {
      result: string;
      article: string;
      document: string;
      event: string;
      specialist: string;
    };
  };
  filters: {
    title: string;
    all: string;
    allTopics: string;
    allTypes: string;
    allYears: string;
    allCities: string;
    allDirections: string;
    anyLanguage: string;
    clear: string;
    sort: string;
    sortUpdated: string;
    sortAlpha: string;
    documentType: string;
    year: string;
    city: string;
    subspecialty: string;
    consultLanguage: string;
    telehealth: string;
    acceptsReferrals: string;
    emptyTitle: string;
    emptyText: string;
    upcoming: string;
    past: string;
    registrationClosed: string;
    online: string;
    callAction: string;
    emailAction: string;
    directoryNote: string;
    specialistEmptyTitle: string;
    specialistEmptyText: string;
    eventEmptyTitle: string;
    eventEmptyUpcoming: string;
    eventEmptyPast: string;
    searchNews: string;
    searchEvents: string;
    searchGuidelines: string;
    searchSpecialists: string;
    searchSite: string;
  };
  cases: {
    presentation: string;
    discussion: string;
    takeaway: string;
    addToCalendar: string;
  };
  newsletter: {
    heading: string;
    text: string;
    placeholder: string;
    subscribe: string;
  };
  forms: {
    required: string;
    sending: string;
    send: string;
    submit: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    phoneLabel: string;
    topicLabel: string;
    topicPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    consentText: string;
    privacyLink: string;
    contactSuccessTitle: string;
    newMessage: string;
    responseNote: string;
    topics: string[];
    joinSteps: string[];
    firstName: string;
    lastName: string;
    specialty: string;
    workplace: string;
    licence: string;
    licenceHint: string;
    choose: string;
    other: string;
    tierLegend: string;
    noteLabel: string;
    notePlaceholder: string;
    joinConsent: string;
    joinSuccessTitle: string;
    nextSteps: string;
    nextStepList: string[];
    specialties: string[];
    password: string;
    rememberMe: string;
    forgotPassword: string;
    signIn: string;
    checking: string;
    showPassword: string;
    hidePassword: string;
    loginDemoNote: string;
    invalidEmail: string;
    shortPassword: string;
  };
  footer: {
    disclaimer: string;
    rights: string;
    privacy: string;
    terms: string;
    disclosures: string;
    contact: string;
  };
  notFound: {
    title: string;
    text: string;
    backHome: string;
    links: { label: string; href: string }[];
  };
};

const ka: Dictionary = {
  common: {
    home: "მთავარი",
    skipToContent: "გადასვლა მთავარ შიგთავსზე",
    openMenu: "მენიუს გახსნა",
    closeMenu: "მენიუს დახურვა",
    close: "დახურვა",
    search: "ძიება",
    searchAria: "ძიება (Ctrl+K)",
    account: "ავტორიზაცია / პირადი კაბინეტი",
    join: "გაწევრიანება",
    memberArea: "პირადი კაბინეტი",
    viewAll: "ყველას ნახვა",
    readMore: "სრულად წაკითხვა",
    open: "გახსნა",
    details: "დეტალები",
    download: "ჩამოტვირთვა",
    back: "უკან",
    next: "შემდეგი",
    previous: "წინა გვერდი",
    page: "გვერდები",
    minRead: "წთ კითხვა",
    updated: "განახლდა",
    pages: "გვ.",
    breadcrumb: "ნავიგაციის გზა",
    mainNav: "მთავარი ნავიგაცია",
    mobileNav: "მობილური ნავიგაცია",
    languageGroup: "ენის არჩევა / Language",
    backToTop: "გვერდის დასაწყისში დაბრუნება",
    tryAgain: "თავიდან ცდა",
  },
  search: {
    placeholder: "მოძებნეთ გაიდლაინი, სიახლე, ღონისძიება, სპეციალისტი…",
    overlayTitle: "საიტზე ძიება",
    popular: "პოპულარული ძიებები",
    suggestions: [
      "პრეეკლამფსია",
      "გესტაციური დიაბეტი",
      "ულტრაბგერითი სკრინინგი",
      "კონგრესი",
      "წევრობა",
      "სისხლდენა",
    ],
    noResults: (q) => `„${q}“ — შედეგი ვერ მოიძებნა.`,
    noResultsHint: "სცადეთ სხვა საკვანძო სიტყვა ან იხილეთ ყველა გაიდლაინი.",
    viewAllResults: "ყველა შედეგის ნახვა",
    hint: "ნავიგაცია ისრებით · Enter გასახსნელად · Esc დასახურად",
    minChars: "შეიყვანეთ მინიმუმ ორი სიმბოლო ძიების დასაწყებად.",
    resultsFound: (n, word) => `ნაპოვნია ${n} ${word}`,
    kinds: {
      news: "სიახლე",
      guideline: "გაიდლაინი",
      event: "ღონისძიება",
      specialist: "სპეციალისტი",
      course: "კურსი",
      case: "შემთხვევა",
      question: "კითხვა",
      page: "გვერდი",
    },
    words: {
      result: "შედეგი",
      article: "სტატია",
      document: "დოკუმენტი",
      event: "ღონისძიება",
      specialist: "სპეციალისტი",
    },
  },
  filters: {
    title: "ფილტრები",
    all: "ყველა",
    allTopics: "ყველა თემა",
    allTypes: "ყველა ტიპი",
    allYears: "ყველა წელი",
    allCities: "ყველა ქალაქი",
    allDirections: "ყველა მიმართულება",
    anyLanguage: "ნებისმიერი",
    clear: "გასუფთავება",
    sort: "დახარისხება",
    sortUpdated: "განახლების თარიღით",
    sortAlpha: "ანბანურად",
    documentType: "დოკუმენტის ტიპი",
    year: "გამოცემის წელი",
    city: "ქალაქი",
    subspecialty: "სუბსპეციალობა",
    consultLanguage: "კონსულტაციის ენა",
    telehealth: "ტელემედიცინა",
    acceptsReferrals: "იღებს მიმართვებს",
    emptyTitle: "შედეგი ვერ მოიძებნა",
    emptyText: "სცადეთ სხვა საკვანძო სიტყვა ან შეცვალეთ ფილტრები.",
    upcoming: "მომავალი",
    past: "წარსული",
    registrationClosed: "რეგისტრაცია დახურულია",
    online: "ონლაინ",
    callAction: "დარეკვა",
    emailAction: "ელფოსტა",
    directoryNote:
      "კატალოგში მოცემულია MFM საქართველოს წევრები, რომლებმაც თანხმობა განაცხადეს საკონტაქტო ინფორმაციის გამოქვეყნებაზე.",
    specialistEmptyTitle: "სპეციალისტი ვერ მოიძებნა",
    specialistEmptyText:
      "შეცვალეთ ფილტრები ან დაგვიკავშირდით — დაგეხმარებით შესაფერისი სპეციალისტის მოძებნაში.",
    eventEmptyTitle: "ღონისძიება ვერ მოიძებნა",
    eventEmptyUpcoming: "ამ ფილტრით დაგეგმილი ღონისძიება არ არის. სცადეთ „წარსული“ ჩანართი.",
    eventEmptyPast: "ამ ფილტრით წარსული ღონისძიება არ მოიძებნა.",
    searchNews: "ძიება სიახლეებში…",
    searchEvents: "ძიება ღონისძიებებში…",
    searchGuidelines: "ძიება სათაურით, კოდით ან საკვანძო სიტყვით…",
    searchSpecialists: "სახელი, კლინიკა ან რეგიონი…",
    searchSite: "მოძებნეთ საიტზე…",
  },
  cases: {
    presentation: "კლინიკური სურათი",
    discussion: "განხილვა",
    takeaway: "მთავარი დასკვნა",
    addToCalendar: "კალენდარში დამატება",
  },
  newsletter: {
    heading: "გამოიწერეთ ჩვენი სიახლეები",
    text: "ყოველთვიური წერილი — ახალი გაიდლაინები, ღონისძიებები და კვლევის შედეგები. სპამის გარეშე, ერთი კლიკით გაუქმებადი.",
    placeholder: "თქვენი ელფოსტა",
    subscribe: "გამოწერა",
  },
  forms: {
    required: "სავალდებულო ველი",
    sending: "იგზავნება…",
    send: "წერილის გაგზავნა",
    submit: "განაცხადის გაგზავნა",
    nameLabel: "სახელი და გვარი *",
    namePlaceholder: "ნინო გელაშვილი",
    emailLabel: "ელფოსტა *",
    phoneLabel: "ტელეფონი",
    topicLabel: "თემა *",
    topicPlaceholder: "აირჩიეთ თემა",
    messageLabel: "შეტყობინება *",
    messagePlaceholder: "აღწერეთ თქვენი კითხვა ან მოთხოვნა…",
    consentText:
      "ვეთანხმები, რომ ჩემი მონაცემები დამუშავდეს მიმართვაზე პასუხის გასაცემად. იხილეთ",
    privacyLink: "კონფიდენციალურობის პოლიტიკა",
    contactSuccessTitle: "წერილი გაიგზავნა",
    newMessage: "ახალი წერილის გაგზავნა",
    responseNote:
      "პასუხს ვცემთ სამუშაო დღეებში, ჩვეულებრივ 2 დღის განმავლობაში. გადაუდებელი სამედიცინო საკითხებისთვის მიმართეთ სამედიცინო დაწესებულებას.",
    topics: [
      "ზოგადი კითხვა",
      "წევრობა",
      "ღონისძიებები და რეგისტრაცია",
      "გაიდლაინები",
      "მედია და პრესა",
      "პარტნიორობა",
    ],
    joinSteps: ["პირადი მონაცემები", "პროფესიული ინფორმაცია", "წევრობის ტიპი"],
    firstName: "სახელი *",
    lastName: "გვარი *",
    specialty: "სპეციალობა *",
    workplace: "სამუშაო ადგილი *",
    licence: "სახელმწიფო სერტიფიკატის ნომერი *",
    licenceHint: "სტუდენტებისთვის მიუთითეთ სტუდენტური ბარათის ნომერი.",
    choose: "აირჩიეთ",
    other: "სხვა",
    tierLegend: "აირჩიეთ წევრობის კატეგორია",
    noteLabel: "დამატებითი ინფორმაცია",
    notePlaceholder: "სამუშაო ჯგუფი, რომელშიც ჩართვა გსურთ, ან სხვა შენიშვნა…",
    joinConsent:
      "ვადასტურებ მონაცემების სისწორეს და ვეთანხმები საზოგადოების წესდებასა და ეთიკის კოდექსს.",
    joinSuccessTitle: "განაცხადი მიღებულია",
    nextSteps: "შემდეგი ნაბიჯები",
    nextStepList: [
      "1. მიიღებთ დამადასტურებელ წერილს ელფოსტაზე.",
      "2. გადავამოწმებთ დოკუმენტებს — 3 სამუშაო დღემდე.",
      "3. მიიღებთ ინვოისს საწევროს გადასახდელად.",
      "4. გააქტიურდება პირადი კაბინეტი და ყველა წვდომა.",
    ],
    specialties: [
      "მეან-გინეკოლოგი",
      "პერინატოლოგი",
      "ნეონატოლოგი",
      "ულტრაბგერითი დიაგნოსტიკის სპეციალისტი",
      "ანესთეზიოლოგი",
      "ბებიაქალი",
      "რეზიდენტი",
      "სტუდენტი",
      "სხვა",
    ],
    password: "პაროლი",
    rememberMe: "დამახსოვრება",
    forgotPassword: "დაგავიწყდათ პაროლი?",
    signIn: "შესვლა",
    checking: "მოწმდება…",
    showPassword: "პაროლის ჩვენება",
    hidePassword: "პაროლის დამალვა",
    loginDemoNote:
      "ავტორიზაციის სისტემა ამ დემო-ვერსიაში მიერთებული არ არის. წევრობის საკითხებზე დაგვიკავშირდით.",
    invalidEmail: "მიუთითეთ სწორი ელფოსტა",
    shortPassword: "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს",
  },
  footer: {
    disclaimer:
      "საიტზე განთავსებული ინფორმაცია არ ცვლის კვალიფიციური სამედიცინო კონსულტაციას. გადაუდებელი მდგომარეობისას დაუყოვნებლივ მიმართეთ სამედიცინო დაწესებულებას ან დარეკეთ 112-ზე.",
    rights: "ყველა უფლება დაცულია.",
    privacy: "კონფიდენციალურობა",
    terms: "წესები და პირობები",
    disclosures: "ინტერესთა კონფლიქტი",
    contact: "კონტაქტი",
  },
  notFound: {
    title: "გვერდი ვერ მოიძებნა",
    text: "შესაძლოა მისამართი შეიცვალა ან ბმული მოძველებულია. სცადეთ ძიება ან გადადით ერთ-ერთ ქვემოთ მოცემულ განყოფილებაში.",
    backHome: "მთავარზე დაბრუნება",
    links: [
      { label: "მთავარი გვერდი", href: "/" },
      { label: "კლინიკური გაიდლაინები", href: "/guidelines" },
      { label: "ღონისძიებები", href: "/events" },
      { label: "სპეციალისტის მოძებნა", href: "/patients/find-specialist" },
      { label: "წევრობა", href: "/membership" },
      { label: "კონტაქტი", href: "/contact" },
    ],
  },
};

const en: Dictionary = {
  common: {
    home: "Home",
    skipToContent: "Skip to main content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    close: "Close",
    search: "Search",
    searchAria: "Search (Ctrl+K)",
    account: "Sign in / member area",
    join: "Join",
    memberArea: "Member area",
    viewAll: "View all",
    readMore: "Read the full article",
    open: "Open",
    details: "Details",
    download: "Download",
    back: "Back",
    next: "Next",
    previous: "Previous page",
    page: "Pages",
    minRead: "min read",
    updated: "Updated",
    pages: "pp.",
    breadcrumb: "Breadcrumb",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    languageGroup: "Language / ენის არჩევა",
    backToTop: "Back to top",
    tryAgain: "Try again",
  },
  search: {
    placeholder: "Search guidelines, news, events, specialists…",
    overlayTitle: "Site search",
    popular: "Popular searches",
    suggestions: [
      "pre-eclampsia",
      "gestational diabetes",
      "ultrasound screening",
      "congress",
      "membership",
      "haemorrhage",
    ],
    noResults: (q) => `No results for “${q}”.`,
    noResultsHint: "Try a different keyword, or browse all guidelines.",
    viewAllResults: "See all results",
    hint: "Arrow keys to navigate · Enter to open · Esc to close",
    minChars: "Type at least two characters to start searching.",
    resultsFound: (n, word) => `${n} ${word}${n === 1 ? "" : "s"} found`,
    kinds: {
      news: "News",
      guideline: "Guideline",
      event: "Event",
      specialist: "Specialist",
      course: "Course",
      case: "Case",
      question: "Question",
      page: "Page",
    },
    words: {
      result: "result",
      article: "article",
      document: "document",
      event: "event",
      specialist: "specialist",
    },
  },
  filters: {
    title: "Filters",
    all: "All",
    allTopics: "All topics",
    allTypes: "All types",
    allYears: "All years",
    allCities: "All cities",
    allDirections: "All subspecialties",
    anyLanguage: "Any language",
    clear: "Clear",
    sort: "Sort by",
    sortUpdated: "Date updated",
    sortAlpha: "Alphabetical",
    documentType: "Document type",
    year: "Year of publication",
    city: "City",
    subspecialty: "Subspecialty",
    consultLanguage: "Consultation language",
    telehealth: "Telehealth",
    acceptsReferrals: "Accepts referrals",
    emptyTitle: "No results found",
    emptyText: "Try a different keyword or change the filters.",
    upcoming: "Upcoming",
    past: "Past",
    registrationClosed: "Registration closed",
    online: "Online",
    callAction: "Call",
    emailAction: "Email",
    directoryNote:
      "The directory lists MFM Georgia members who have consented to their contact details being published.",
    specialistEmptyTitle: "No specialist found",
    specialistEmptyText:
      "Change the filters or get in touch — we will help you find a suitable specialist.",
    eventEmptyTitle: "No events found",
    eventEmptyUpcoming: "Nothing is scheduled with these filters. Try the “Past” tab.",
    eventEmptyPast: "No past events match these filters.",
    searchNews: "Search the news…",
    searchEvents: "Search events…",
    searchGuidelines: "Search by title, code or keyword…",
    searchSpecialists: "Name, clinic or region…",
    searchSite: "Search the site…",
  },
  cases: {
    presentation: "Clinical picture",
    discussion: "Discussion",
    takeaway: "Key takeaway",
    addToCalendar: "Add to calendar",
  },
  newsletter: {
    heading: "Subscribe to our updates",
    text: "A monthly email — new guidelines, events and research findings. No spam, unsubscribe in one click.",
    placeholder: "Your email address",
    subscribe: "Subscribe",
  },
  forms: {
    required: "Required field",
    sending: "Sending…",
    send: "Send message",
    submit: "Submit application",
    nameLabel: "Full name *",
    namePlaceholder: "Nino Gelashvili",
    emailLabel: "Email *",
    phoneLabel: "Phone",
    topicLabel: "Subject *",
    topicPlaceholder: "Choose a subject",
    messageLabel: "Message *",
    messagePlaceholder: "Describe your question or request…",
    consentText:
      "I agree that my data may be processed in order to respond to my enquiry. See the",
    privacyLink: "privacy policy",
    contactSuccessTitle: "Message sent",
    newMessage: "Send another message",
    responseNote:
      "We reply on working days, usually within two days. For urgent medical matters please contact a healthcare provider.",
    topics: [
      "General enquiry",
      "Membership",
      "Events and registration",
      "Guidelines",
      "Media and press",
      "Partnership",
    ],
    joinSteps: ["Personal details", "Professional information", "Membership tier"],
    firstName: "First name *",
    lastName: "Last name *",
    specialty: "Specialty *",
    workplace: "Place of work *",
    licence: "State certificate number *",
    licenceHint: "Students should enter their student card number.",
    choose: "Choose",
    other: "Other",
    tierLegend: "Choose a membership tier",
    noteLabel: "Anything else",
    notePlaceholder: "A working group you would like to join, or any other note…",
    joinConsent:
      "I confirm that the information is accurate and accept the society's statutes and code of ethics.",
    joinSuccessTitle: "Application received",
    nextSteps: "What happens next",
    nextStepList: [
      "1. You receive a confirmation email.",
      "2. We verify your documents — up to three working days.",
      "3. You receive an invoice for your membership dues.",
      "4. Your account and all access are activated.",
    ],
    specialties: [
      "Obstetrician-gynaecologist",
      "Perinatologist",
      "Neonatologist",
      "Ultrasound diagnostics specialist",
      "Anaesthetist",
      "Midwife",
      "Resident",
      "Student",
      "Other",
    ],
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgotten your password?",
    signIn: "Sign in",
    checking: "Checking…",
    showPassword: "Show password",
    hidePassword: "Hide password",
    loginDemoNote:
      "Authentication is not connected in this demo version. Please contact us about membership matters.",
    invalidEmail: "Enter a valid email address",
    shortPassword: "The password must be at least 6 characters",
  },
  footer: {
    disclaimer:
      "The information on this site does not replace qualified medical advice. In an emergency, contact a healthcare provider immediately or call 112.",
    rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms and conditions",
    disclosures: "Conflicts of interest",
    contact: "Contact",
  },
  notFound: {
    title: "Page not found",
    text: "The address may have changed or the link is out of date. Try searching, or head to one of the sections below.",
    backHome: "Back to the homepage",
    links: [
      { label: "Homepage", href: "/" },
      { label: "Clinical guidelines", href: "/guidelines" },
      { label: "Events", href: "/events" },
      { label: "Find a specialist", href: "/patients/find-specialist" },
      { label: "Membership", href: "/membership" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

const dictionaries: Record<Locale, Dictionary> = { ka, en };

export function t(locale: Locale): Dictionary {
  return dictionaries[locale] ?? ka;
}
