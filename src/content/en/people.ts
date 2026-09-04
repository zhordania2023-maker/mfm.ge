import type { Committee, Partner, Person } from "../types";

export const board: Person[] = [
  {
    name: "Prof. Nino Chkhartishvili",
    role: "President",
    org: "National Centre for Maternal and Child Health",
    term: "2026–2028",
    initials: "NC",
    bio: "Perinatologist with 20 years of clinical experience. Chairs the hypertensive disorders working group.",
  },
  {
    name: "Prof. Tamar Beridze",
    role: "Vice-president",
    org: "TSMU Clinic",
    term: "2026–2028",
    initials: "TB",
    bio: "Principal investigator of the national study on preterm birth prevention.",
  },
  {
    name: "Dr Levan Jorbenadze",
    role: "Secretary general",
    org: "Batumi Medical Centre",
    term: "2026–2028",
    initials: "LJ",
    bio: "Leads simulation training in obstetric emergencies.",
  },
  {
    name: "Dr Ekaterine Lomidze",
    role: "Treasurer",
    org: "Kutaisi Referral Hospital",
    term: "2026–2028",
    initials: "EL",
    bio: "Coordinator of the regional perinatal network in Imereti.",
  },
  {
    name: "Dr Giorgi Maisuradze",
    role: "Board member — education",
    org: "Prenatal Diagnostics Centre",
    term: "2026–2028",
    initials: "GM",
    bio: "Author of the ultrasound certification programme.",
  },
  {
    name: "Dr Ana Kvaratskhelia",
    role: "Board member — guidelines",
    org: "National Centre for Maternal and Child Health",
    term: "2026–2028",
    initials: "AK",
    bio: "Editor of the multiple pregnancy guideline.",
  },
  {
    name: "Dr Sopio Gelashvili",
    role: "Board member — research",
    org: "Genetic Counselling Centre",
    term: "2026–2028",
    initials: "SG",
    bio: "Co-author of the prenatal genetic screening consensus document.",
  },
  {
    name: "Dr Natia Bolkvadze",
    role: "Board member — regions",
    org: "Batumi Medical Centre",
    term: "2026–2028",
    initials: "NB",
    bio: "Coordinator of the regional network in Adjara.",
  },
  {
    name: "Dr Mariam Tsiklauri",
    role: "Board member — safety",
    org: "TSMU Clinic",
    term: "2026–2028",
    initials: "MT",
    bio: "Chair of the patient safety committee.",
  },
];

export const staff: Person[] = [
  {
    name: "Ia Meladze",
    role: "Executive director",
    initials: "IM",
    email: "i.meladze@mfm.ge",
    bio: "Runs the day-to-day work of the office, partnerships and the budget.",
  },
  {
    name: "Nika Beriashvili",
    role: "Programme manager",
    initials: "NB",
    email: "n.beriashvili@mfm.ge",
    bio: "Coordinates CME programmes and regional workshops.",
  },
  {
    name: "Teona Kavtaradze",
    role: "Communications manager",
    initials: "TK",
    email: "t.kavtaradze@mfm.ge",
    bio: "Responsible for publications, the website and patient information materials.",
  },
  {
    name: "Giorgi Lomtadze",
    role: "Membership coordinator",
    initials: "GL",
    email: "g.lomtadze@mfm.ge",
    bio: "Handles applications, dues and member support.",
  },
  {
    name: "Salome Chikovani",
    role: "Events coordinator",
    initials: "SC",
    email: "s.chikovani@mfm.ge",
    bio: "Organises the congress, webinars and simulation courses.",
  },
  {
    name: "Vakhtang Nozadze",
    role: "Data analyst",
    initials: "VN",
    email: "v.nozadze@mfm.ge",
    bio: "Analyses audit data and prepares the annual reports.",
  },
];

export const committees: Committee[] = [
  {
    name: "Hypertensive disorders",
    lead: "Prof. Nino Chkhartishvili",
    members: 11,
    focus: "Pre-eclampsia, chronic hypertension, thromboprophylaxis",
  },
  {
    name: "Ultrasound diagnostics",
    lead: "Dr Giorgi Maisuradze",
    members: 14,
    focus: "Screening standards, certification, quality audit",
  },
  {
    name: "Patient safety",
    lead: "Dr Mariam Tsiklauri",
    members: 9,
    focus: "MEOWS, checklists, review of critical incidents",
  },
  {
    name: "Education and CME",
    lead: "Dr Levan Jorbenadze",
    members: 12,
    focus: "Courses, simulation, fellowship accreditation",
  },
  {
    name: "Research and publications",
    lead: "Prof. Tamar Beridze",
    members: 10,
    focus: "Multicentre studies, grants, scientific editing",
  },
  {
    name: "Regional network",
    lead: "Dr Natia Bolkvadze",
    members: 9,
    focus: "Consultation line, patient transfer, telehealth",
  },
];

export const partners: Partner[] = [
  { name: "Ministry of Health", type: "Government" },
  { name: "Tbilisi State Medical University", type: "Academic" },
  { name: "National Centre for Maternal and Child Health", type: "Clinical" },
  { name: "ISUOG", type: "International" },
  { name: "WHO Regional Office for Europe", type: "International" },
  { name: "UNFPA Georgia", type: "International" },
  { name: "Kutaisi Referral Hospital", type: "Clinical" },
  { name: "Batumi Medical Centre", type: "Clinical" },
];
