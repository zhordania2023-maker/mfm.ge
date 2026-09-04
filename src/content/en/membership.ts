import type { Benefit, JoinStep, Tier } from "../types";

export const tiers: Tier[] = [
  {
    id: "resident",
    name: "Resident / student",
    price: "40 GEL",
    period: "per year",
    audience: "Obstetrics and gynaecology residents and medical students",
    perks: [
      "Access to every online CME module",
      "70% discount on the congress ticket",
      "Eligibility for travel grants",
      "Mentorship programme",
    ],
  },
  {
    id: "full",
    name: "Full membership",
    price: "120 GEL",
    period: "per year",
    audience:
      "Certified obstetrician-gynaecologists, perinatologists and neonatologists",
    highlight: true,
    perks: [
      "All CME courses free or at a 40% discount",
      "Early-bird congress registration at a reduced rate",
      "Voting rights at the general assembly",
      "Participation in working groups",
      "A profile in the specialist directory",
      "Access to the 24/7 consultation line",
    ],
  },
  {
    id: "institutional",
    name: "Institutional",
    price: "900 GEL",
    period: "per year",
    audience: "Clinics, maternity units and medical centres",
    perks: [
      "Membership for 10 staff",
      "One on-site training session per year",
      "Quality audit tools",
      "Your logo on the partners page",
      "Priority in regional programmes",
    ],
  },
];

export const memberBenefits: Benefit[] = [
  {
    title: "Clinical resources",
    text: "62 guidelines, protocols and checklists in Georgian, updated regularly.",
    icon: "book",
  },
  {
    title: "Continuing education",
    text: "14 accredited courses a year, online and simulation-based, carrying CME credits.",
    icon: "graduation",
  },
  {
    title: "Professional network",
    text: "480+ colleagues across nine regions, working groups and a 24/7 consultation line.",
    icon: "users",
  },
  {
    title: "Research support",
    text: "Grants for young investigators and the chance to join multicentre studies.",
    icon: "flask",
  },
  {
    title: "A voice that carries",
    text: "Take part in developing national standards and in health policy advocacy.",
    icon: "megaphone",
  },
  {
    title: "Visibility",
    text: "A profile in the public directory where patients look for a certified specialist.",
    icon: "badge",
  },
];

export const joinSteps: JoinStep[] = [
  {
    step: "01",
    title: "Complete the application",
    text: "An online form that takes five minutes — contact and professional details.",
  },
  {
    step: "02",
    title: "Document verification",
    text: "We check your diploma and certificate. Up to three working days.",
  },
  {
    step: "03",
    title: "Pay your dues",
    text: "By bank transfer or online. Institutional membership is invoiced.",
  },
  {
    step: "04",
    title: "Access activated",
    text: "You receive your account, the learning platform and the consultation line code.",
  },
];
