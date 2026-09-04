import type { NavGroup, NavItem } from "../types";
import { IMG } from "../images";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    groups: [
      {
        title: "Organisation",
        links: [
          { label: "Mission & vision", href: "/about", description: "Who we are and what we do" },
          { label: "Board", href: "/about/board", description: "Board of directors" },
          { label: "Team", href: "/about/staff", description: "Executive office" },
          { label: "History", href: "/about/history", description: "From 2009 to today" },
        ],
      },
      {
        title: "Transparency",
        links: [
          {
            label: "Conflicts of interest",
            href: "/about/disclosures",
            description: "Our disclosure policy",
          },
          {
            label: "Annual reports",
            href: "/about/reports",
            description: "Financial and activity reporting",
          },
          {
            label: "Partners",
            href: "/about/partners",
            description: "Local and international",
          },
          { label: "Contact", href: "/contact", description: "Get in touch" },
        ],
      },
    ],
    feature: {
      eyebrow: "Our mission",
      title: "Equitable care for every pregnancy",
      text: "We work so that the quality of high-risk pregnancy care never depends on where a patient happens to live.",
      href: "/about",
      cta: "Learn more",
      image: IMG.mission,
    },
  },
  {
    label: "For patients",
    href: "/patients",
    groups: [
      {
        title: "Support",
        links: [
          {
            label: "Find a specialist",
            href: "/patients/find-specialist",
            description: "Perinatologists near you",
          },
          {
            label: "Frequently asked questions",
            href: "/patients/faq",
            description: "Answers in plain language",
          },
          {
            label: "High-risk pregnancy",
            href: "/patients/high-risk",
            description: "What it means and what to expect",
          },
        ],
      },
      {
        title: "Resources",
        links: [
          {
            label: "Information leaflets",
            href: "/patients/resources",
            description: "Free downloads",
          },
          {
            label: "Patient rights",
            href: "/patients/rights",
            description: "The standard of care you can expect",
          },
          {
            label: "Support groups",
            href: "/patients/support",
            description: "Community and counselling",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Tool",
      title: "Find a perinatologist in your region",
      text: "Search certified specialists by city, subspecialty and consultation language.",
      href: "/patients/find-specialist",
      cta: "Start searching",
      image: IMG.finder,
    },
  },
  {
    label: "For clinicians",
    href: "/guidelines",
    groups: [
      {
        title: "Clinical practice",
        links: [
          { label: "Guidelines", href: "/guidelines", description: "62 open-access documents" },
          {
            label: "Case of the week",
            href: "/education/cases",
            description: "A new case every Monday",
          },
          {
            label: "Protocol library",
            href: "/guidelines?type=protocol",
            description: "Step-by-step algorithms",
          },
        ],
      },
      {
        title: "Practice management",
        links: [
          {
            label: "Coding & reimbursement",
            href: "/practice/coding",
            description: "Working with insurers",
          },
          {
            label: "Quality & patient safety",
            href: "/practice/quality",
            description: "Audit tools",
          },
          {
            label: "Telehealth",
            href: "/practice/telehealth",
            description: "Remote consultation",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "New",
      title: "Updated pre-eclampsia guideline",
      text: "2025 revision — screening, prophylaxis and timing of delivery.",
      href: "/guidelines/preeklampsia-martva",
      cta: "Open the document",
      image: IMG.guideline,
    },
  },
  {
    label: "Education",
    href: "/education",
    groups: [
      {
        title: "Programmes",
        links: [
          {
            label: "Continuing education (CME)",
            href: "/education",
            description: "Courses and credits",
          },
          {
            label: "Residency & fellowship",
            href: "/education/fellowship",
            description: "Training programmes",
          },
          {
            label: "Simulation training",
            href: "/education/simulation",
            description: "Hands-on skills",
          },
        ],
      },
      {
        title: "Events",
        links: [
          { label: "All events", href: "/events", description: "Calendar and registration" },
          {
            label: "Annual congress",
            href: "/events/mfm-globaluri-kongresi-2026",
            description: "Georgia's main forum",
          },
          { label: "Webinars", href: "/events?type=webinar", description: "Online and free" },
        ],
      },
    ],
    feature: {
      eyebrow: "Registration open",
      title: "MFM Global Congress 2026",
      text: "5–7 December, Tbilisi — 40+ speakers, 12 workshops.",
      href: "/events/mfm-globaluri-kongresi-2026",
      cta: "Register now",
      image: IMG.congress,
    },
  },
  {
    label: "Membership",
    href: "/membership",
    groups: [
      {
        title: "Join",
        links: [
          { label: "Why MFM", href: "/membership", description: "Member benefits" },
          { label: "Application form", href: "/membership/join", description: "Apply online" },
          {
            label: "Membership tiers",
            href: "/membership#tiers",
            description: "Rates and conditions",
          },
        ],
      },
      {
        title: "Community",
        links: [
          {
            label: "Working groups",
            href: "/membership/committees",
            description: "Volunteer with us",
          },
          { label: "Member profile", href: "/login", description: "Your account" },
          {
            label: "Journal & research",
            href: "/research",
            description: "Publications and grants",
          },
        ],
      },
    ],
    feature: {
      eyebrow: "Join us",
      title: "480+ specialists are already members",
      text: "Access to guidelines, CME credits, congress discounts and a professional network.",
      href: "/membership/join",
      cta: "Become a member",
      image: IMG.community,
    },
  },
  {
    label: "News",
    href: "/news",
  },
];

export const footerNav: NavGroup[] = [
  {
    title: "Organisation",
    links: [
      { label: "About us", href: "/about" },
      { label: "Board", href: "/about/board" },
      { label: "Team", href: "/about/staff" },
      { label: "Partners", href: "/about/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "For professionals",
    links: [
      { label: "Clinical guidelines", href: "/guidelines" },
      { label: "Education & CME", href: "/education" },
      { label: "Events", href: "/events" },
      { label: "Research", href: "/research" },
      { label: "Membership", href: "/membership" },
    ],
  },
  {
    title: "For patients",
    links: [
      { label: "Find a specialist", href: "/patients/find-specialist" },
      { label: "FAQ", href: "/patients/faq" },
      { label: "Information leaflets", href: "/patients/resources" },
      { label: "High-risk pregnancy", href: "/patients/high-risk" },
      { label: "News", href: "/news" },
    ],
  },
];
