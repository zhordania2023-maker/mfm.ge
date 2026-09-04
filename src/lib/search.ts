import { content } from "@/content";
import type { Locale } from "@/i18n/config";
import { normalize, tokenize, wordsMatch } from "./utils";

/** შედეგის ტიპი — გასაღები; თარგმანი ინტერფეისში ხდება */
export type SearchKind =
  | "news"
  | "guideline"
  | "event"
  | "specialist"
  | "course"
  | "case"
  | "question"
  | "page";

type IndexedDoc = {
  id: string;
  kind: SearchKind;
  title: string;
  description: string;
  href: string;
  meta?: string;
  haystack: string;
  words: string[];
  titleWords: string[];
};

export type SearchResult = {
  id: string;
  kind: SearchKind;
  title: string;
  description: string;
  href: string;
  meta?: string;
  score: number;
};

type DraftDoc = Omit<IndexedDoc, "words" | "titleWords">;

const staticPages: Record<Locale, Omit<DraftDoc, "haystack">[]> = {
  ka: [
    {
      id: "page-about",
      kind: "page",
      title: "ჩვენს შესახებ — მისია და ხედვა",
      description:
        "ვინ ვართ, რა ღირებულებები გვამოძრავებს და როგორ ვმუშაობთ დედა-ნაყოფის მედიცინის განვითარებაზე.",
      href: "/about",
    },
    {
      id: "page-board",
      kind: "page",
      title: "გამგეობა",
      description: "დირექტორთა საბჭოს შემადგენლობა 2026–2028 წლებისთვის.",
      href: "/about/board",
    },
    {
      id: "page-staff",
      kind: "page",
      title: "გუნდი",
      description: "აღმასრულებელი ოფისის თანამშრომლები და მათი საკონტაქტო ინფორმაცია.",
      href: "/about/staff",
    },
    {
      id: "page-membership",
      kind: "page",
      title: "წევრობა — უპირატესობები და ტარიფები",
      description: "საწევრო კატეგორიები, ფასები და წევრობის სარგებელი.",
      href: "/membership",
    },
    {
      id: "page-join",
      kind: "page",
      title: "გაწევრიანების განაცხადი",
      description: "ონლაინ ფორმა MFM საქართველოში გასაწევრიანებლად.",
      href: "/membership/join",
    },
    {
      id: "page-finder",
      kind: "page",
      title: "სპეციალისტის მოძებნა",
      description: "იპოვეთ პერინატოლოგი ქალაქის, სუბსპეციალობისა და ენის მიხედვით.",
      href: "/patients/find-specialist",
    },
    {
      id: "page-contact",
      kind: "page",
      title: "კონტაქტი",
      description: "მისამართი, ტელეფონი, ელფოსტა და საკონტაქტო ფორმა.",
      href: "/contact",
    },
    {
      id: "page-research",
      kind: "page",
      title: "კვლევა და პუბლიკაციები",
      description: "მიმდინარე კვლევები, გრანტები და სამეცნიერო პუბლიკაციები.",
      href: "/research",
    },
    {
      id: "page-highrisk",
      kind: "page",
      title: "მაღალი რისკის ორსულობა",
      description: "რას ნიშნავს დიაგნოზი და რა უნდა იცოდეთ — პაციენტებისთვის.",
      href: "/patients/high-risk",
    },
    {
      id: "page-resources",
      kind: "page",
      title: "საინფორმაციო ბროშურები",
      description: "ჩამოსატვირთი მასალები პაციენტებისა და ოჯახებისთვის.",
      href: "/patients/resources",
    },
  ],
  en: [
    {
      id: "page-about",
      kind: "page",
      title: "About us — mission and vision",
      description:
        "Who we are, the values behind our work and how we advance maternal-fetal medicine.",
      href: "/about",
    },
    {
      id: "page-board",
      kind: "page",
      title: "Board",
      description: "The board of directors for 2026–2028.",
      href: "/about/board",
    },
    {
      id: "page-staff",
      kind: "page",
      title: "Team",
      description: "The executive office and how to reach them.",
      href: "/about/staff",
    },
    {
      id: "page-membership",
      kind: "page",
      title: "Membership — benefits and rates",
      description: "Membership tiers, prices and what you get.",
      href: "/membership",
    },
    {
      id: "page-join",
      kind: "page",
      title: "Membership application",
      description: "The online form to join MFM Georgia.",
      href: "/membership/join",
    },
    {
      id: "page-finder",
      kind: "page",
      title: "Find a specialist",
      description: "Search perinatologists by city, subspecialty and language.",
      href: "/patients/find-specialist",
    },
    {
      id: "page-contact",
      kind: "page",
      title: "Contact",
      description: "Address, phone, email and the contact form.",
      href: "/contact",
    },
    {
      id: "page-research",
      kind: "page",
      title: "Research and publications",
      description: "Current studies, grants and scientific publications.",
      href: "/research",
    },
    {
      id: "page-highrisk",
      kind: "page",
      title: "High-risk pregnancy",
      description: "What the diagnosis means and what to expect — for patients.",
      href: "/patients/high-risk",
    },
    {
      id: "page-resources",
      kind: "page",
      title: "Information leaflets",
      description: "Free downloads for patients and families.",
      href: "/patients/resources",
    },
  ],
};

function build(locale: Locale): IndexedDoc[] {
  const c = content(locale);
  const docs: DraftDoc[] = [];

  for (const n of c.news) {
    docs.push({
      id: `news-${n.slug}`,
      kind: "news",
      title: n.title,
      description: n.excerpt,
      href: `/news/${n.slug}`,
      meta: n.category,
      haystack: normalize(
        [n.title, n.excerpt, n.category, n.tags.join(" "), n.body.join(" ")].join(" "),
      ),
    });
  }

  for (const g of c.guidelines) {
    docs.push({
      id: `guide-${g.slug}`,
      kind: "guideline",
      title: g.title,
      description: g.summary,
      href: `/guidelines/${g.slug}`,
      meta: `${g.code} · ${g.topic}`,
      haystack: normalize(
        [g.title, g.summary, g.topic, g.type, g.code, g.keyPoints.join(" "), g.body.join(" ")].join(
          " ",
        ),
      ),
    });
  }

  for (const e of c.events) {
    docs.push({
      id: `event-${e.slug}`,
      kind: "event",
      title: e.title,
      description: e.excerpt,
      href: `/events/${e.slug}`,
      meta: `${e.type} · ${e.city}`,
      haystack: normalize(
        [e.title, e.excerpt, e.type, e.city, e.location, (e.speakers ?? []).join(" ")].join(" "),
      ),
    });
  }

  for (const s of c.specialists) {
    docs.push({
      id: `sp-${s.id}`,
      kind: "specialist",
      title: s.name,
      description: `${s.title} · ${s.clinic}`,
      href: `/patients/find-specialist?q=${encodeURIComponent(s.name)}`,
      meta: s.city,
      haystack: normalize(
        [s.name, s.title, s.clinic, s.city, s.region, s.subspecialties.join(" "), s.bio].join(" "),
      ),
    });
  }

  for (const course of c.courses) {
    docs.push({
      id: `course-${course.slug}`,
      kind: "course",
      title: course.title,
      description: course.summary,
      href: `/education#${course.slug}`,
      meta: `${course.format} · ${course.cme}`,
      haystack: normalize(
        [course.title, course.summary, course.format, course.level, course.modules.join(" ")].join(
          " ",
        ),
      ),
    });
  }

  for (const cs of c.cases) {
    docs.push({
      id: `case-${cs.slug}`,
      kind: "case",
      title: `#${cs.number} · ${cs.title}`,
      description: cs.presentation.slice(0, 160) + "…",
      href: `/education/cases#${cs.slug}`,
      meta: cs.topic,
      haystack: normalize(
        [cs.title, cs.presentation, cs.discussion, cs.takeaway, cs.topic].join(" "),
      ),
    });
  }

  c.faq.forEach((f, i) => {
    docs.push({
      id: `faq-${i}`,
      kind: "question",
      title: f.q,
      description: f.a.slice(0, 170) + "…",
      href: `/patients/faq#q-${i}`,
      haystack: normalize([f.q, f.a].join(" ")),
    });
  });

  for (const p of staticPages[locale]) {
    docs.push({ ...p, haystack: normalize([p.title, p.description].join(" ")) });
  }

  return docs.map((d) => ({
    ...d,
    words: tokenize(d.haystack),
    titleWords: tokenize(d.title),
  }));
}

const cache = new Map<Locale, IndexedDoc[]>();

function indexFor(locale: Locale): IndexedDoc[] {
  let idx = cache.get(locale);
  if (!idx) {
    idx = build(locale);
    cache.set(locale, idx);
  }
  return idx;
}

/** ტიპის წონა — ერთნაირად რელევანტურ შედეგებში კლინიკური რესურსი წინ დგება */
const kindWeight: Record<SearchKind, number> = {
  guideline: 6,
  news: 5,
  event: 4,
  course: 3,
  case: 3,
  specialist: 2,
  question: 2,
  page: 1,
};

export function searchAll(locale: Locale, query: string, limit = 40): SearchResult[] {
  const q = normalize(query);
  if (q.length < 2) return [];
  const terms = q.split(" ").filter(Boolean);

  const scored: SearchResult[] = [];
  for (const doc of indexFor(locale)) {
    const title = normalize(doc.title);
    let score = 0;
    let allMatched = true;

    for (const term of terms) {
      const exactTitle = title.includes(term);
      const stemTitle = exactTitle || wordsMatch(doc.titleWords, term);
      const exactBody = doc.haystack.includes(term);
      const stemBody = exactBody || wordsMatch(doc.words, term);

      if (!stemTitle && !stemBody) {
        allMatched = false;
        break;
      }
      if (exactTitle) score += title.startsWith(term) ? 12 : 9;
      else if (stemTitle) score += 7;
      if (exactBody) score += 2;
      else if (stemBody) score += 1;
    }

    if (!allMatched) continue;
    if (title.includes(q)) score += 10;
    score += kindWeight[doc.kind];

    scored.push({
      id: doc.id,
      kind: doc.kind,
      title: doc.title,
      description: doc.description,
      href: doc.href,
      meta: doc.meta,
      score,
    });
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

export const searchKinds: SearchKind[] = [
  "news",
  "guideline",
  "event",
  "specialist",
  "course",
  "case",
  "question",
  "page",
];
