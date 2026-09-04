/**
 * კონტენტის საერთო ტიპები — ორივე ენისთვის.
 * კატეგორიები/ტიპები ენაზეა დამოკიდებული, ამიტომ `string`-ია და
 * თითოეული ენა თავის სიას აწვდის (`newsCategories`, `eventTypes` და ა.შ.).
 */

export type Site = {
  name: string;
  nameFull: string;
  nameEn: string;
  short: string;
  /** ლოგოს ორსტრიქონიანი წარწერა */
  logo: { line1: string; line2: string };
  tagline: string;
  description: string;
  url: string;
  founded: number;
  email: string;
  emailMembership: string;
  emailPress: string;
  phone: string;
  phoneHref: string;
  address: { street: string; city: string; zip: string; country: string };
  hours: string;
  socials: { name: string; href: string; icon: string }[];
};

export type Stat = { value: string; label: string; note: string };

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

export type NavGroup = { title: string; links: NavLink[] };

export type NavItem = {
  label: string;
  href: string;
  groups?: NavGroup[];
  feature?: {
    eyebrow: string;
    title: string;
    text: string;
    href: string;
    cta: string;
    image: string;
  };
};

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readMinutes: number;
  image: string;
  featured?: boolean;
  tags: string[];
  body: string[];
};

export type MfmEvent = {
  slug: string;
  title: string;
  type: string;
  start: string;
  end?: string;
  timeLabel?: string;
  location: string;
  city: string;
  online: boolean;
  price: string;
  cme?: string;
  seats?: number;
  registrationOpen: boolean;
  excerpt: string;
  image: string;
  agenda?: { time: string; title: string; speaker?: string }[];
  speakers?: string[];
  body: string[];
};

export type Guideline = {
  slug: string;
  code: string;
  title: string;
  summary: string;
  topic: string;
  type: string;
  year: number;
  version: string;
  pages: number;
  updated: string;
  authors: string;
  keyPoints: string[];
  body: string[];
};

export type Specialist = {
  id: string;
  name: string;
  title: string;
  clinic: string;
  city: string;
  region: string;
  subspecialties: string[];
  languages: string[];
  phone: string;
  email: string;
  acceptsReferrals: boolean;
  telehealth: boolean;
  since: number;
  bio: string;
};

export type Person = {
  name: string;
  role: string;
  org?: string;
  term?: string;
  initials: string;
  bio?: string;
  email?: string;
};

export type Committee = { name: string; lead: string; members: number; focus: string };
export type Partner = { name: string; type: string };

export type Course = {
  slug: string;
  title: string;
  format: string;
  level: string;
  duration: string;
  cme: string;
  price: string;
  memberPrice: string;
  summary: string;
  modules: string[];
  open: boolean;
};

export type ClinicalCase = {
  slug: string;
  number: number;
  title: string;
  date: string;
  presentation: string;
  question: string;
  options: { label: string; correct?: boolean }[];
  discussion: string;
  takeaway: string;
  topic: string;
};

export type Faq = { q: string; a: string };
export type PatientResource = { title: string; format: string; lang: string; summary: string };
export type HighRiskGroup = { group: string; items: string[] };

export type Tier = {
  id: string;
  name: string;
  price: string;
  period: string;
  audience: string;
  highlight?: boolean;
  perks: string[];
};

export type Benefit = { title: string; text: string; icon: string };
export type JoinStep = { step: string; title: string; text: string };

/** ერთი ენის სრული კონტენტ-პაკეტი */
export type ContentBundle = {
  site: Site;
  stats: Stat[];
  impact: Stat[];
  mainNav: NavItem[];
  footerNav: NavGroup[];
  news: NewsItem[];
  newsCategories: string[];
  events: MfmEvent[];
  eventTypes: string[];
  guidelines: Guideline[];
  guidelineTopics: string[];
  guidelineTypes: string[];
  specialists: Specialist[];
  cities: string[];
  subspecialties: string[];
  languages: string[];
  board: Person[];
  staff: Person[];
  committees: Committee[];
  partners: Partner[];
  courses: Course[];
  cases: ClinicalCase[];
  faq: Faq[];
  patientResources: PatientResource[];
  patientRights: string[];
  highRiskFactors: HighRiskGroup[];
  tiers: Tier[];
  memberBenefits: Benefit[];
  joinSteps: JoinStep[];
};
