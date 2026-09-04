import type { Site, Stat } from "../types";

export const site: Site = {
  name: "MFM Georgia",
  nameFull: "Maternal-Fetal Medicine Society — Georgia",
  nameEn: "Maternal-Fetal Medicine Society — Georgia",
  short: "MFM",
  logo: { line1: "Maternal-Fetal Medicine", line2: "Society" },
  tagline: "Care, education and professional standards in maternal-fetal medicine",
  description:
    "MFM Georgia brings together perinatologists, obstetrician-gynaecologists and neonatologists to advance the standards, research and continuing education behind high-risk pregnancy care.",
  url: "https://mfm.ge",
  founded: 2009,
  email: "info@mfm.ge",
  emailMembership: "members@mfm.ge",
  emailPress: "press@mfm.ge",
  phone: "+995 (32) 2 45 67 89",
  phoneHref: "+995322456789",
  address: {
    street: "76 Vazha-Pshavela Avenue",
    city: "Tbilisi",
    zip: "0186",
    country: "Georgia",
  },
  hours: "Monday – Friday, 10:00 – 18:00",
  socials: [
    { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
    { name: "X", href: "https://x.com", icon: "x" },
  ],
};

export const stats: Stat[] = [
  { value: "15+", label: "years of experience", note: "founded in 2009" },
  { value: "480+", label: "active members", note: "across Georgia" },
  { value: "62", label: "clinical guidelines", note: "in Georgian" },
  { value: "24", label: "partner clinics", note: "in 9 regions" },
];

export const impact: Stat[] = [
  {
    value: "1,200+",
    label: "clinicians trained",
    note: "through continuing medical education programmes",
  },
  {
    value: "38",
    label: "scientific publications",
    note: "in international peer-reviewed journals",
  },
  {
    value: "9",
    label: "regional centres",
    note: "for high-risk pregnancy consultation",
  },
  {
    value: "100%",
    label: "open access",
    note: "every guideline is free",
  },
];
