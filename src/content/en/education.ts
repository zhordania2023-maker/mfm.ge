import type { ClinicalCase, Course } from "../types";

export const courses: Course[] = [
  {
    slug: "preeklampsia-online",
    title: "Pre-eclampsia: from screening to delivery",
    format: "Online",
    level: "Intermediate",
    duration: "6 hours · 8 modules",
    cme: "6 CME",
    price: "90 GEL",
    memberPrice: "Free",
    summary:
      "A complete online course following the updated guideline, with interactive cases and a final assessment.",
    modules: [
      "Pathophysiology and risk factors",
      "Combined first-trimester screening",
      "Aspirin prophylaxis",
      "Diagnostic criteria",
      "Outpatient monitoring",
      "Managing severe pre-eclampsia",
      "Timing and mode of delivery",
      "The postpartum period",
    ],
    open: true,
  },
  {
    slug: "ultrabgera-safuzvlebi",
    title: "Foundations of obstetric ultrasound",
    format: "Hybrid",
    level: "Introductory",
    duration: "24 hours · 3 days",
    cme: "16 CME",
    price: "240 GEL",
    memberPrice: "140 GEL",
    summary:
      "Theory modules online plus a three-day practical session at the machines, with a certification examination.",
    modules: [
      "Physics and machine settings",
      "The first-trimester scan",
      "Anomaly scanning at 18–22 weeks",
      "Biometry and growth assessment",
      "Principles of Doppler",
      "Practical sessions",
    ],
    open: true,
  },
  {
    slug: "sisxldena-simulacia",
    title: "Postpartum haemorrhage — simulation",
    format: "In person",
    level: "Advanced",
    duration: "16 hours · 2 days",
    cme: "12 CME",
    price: "160 GEL",
    memberPrice: "96 GEL",
    summary:
      "A high-fidelity simulation course covering teamwork, communication and technical skills.",
    modules: [
      "Massive haemorrhage protocol",
      "Balloon tamponade",
      "Compression sutures",
      "Massive transfusion",
      "Team scenarios",
      "Debriefing",
    ],
    open: true,
  },
  {
    slug: "gestaciuri-diabeti-kursi",
    title: "Gestational diabetes in practice",
    format: "Online",
    level: "Introductory",
    duration: "4 hours · 5 modules",
    cme: "4 CME",
    price: "70 GEL",
    memberPrice: "Free",
    summary:
      "From screening to insulin therapy — a short, practical course for outpatient care.",
    modules: [
      "Screening and diagnosis",
      "Dietary management",
      "Self-monitoring",
      "Insulin therapy",
      "Planning delivery",
    ],
    open: true,
  },
  {
    slug: "kardiotokografia",
    title: "Interpreting cardiotocography",
    format: "Online",
    level: "Intermediate",
    duration: "5 hours · 6 modules",
    cme: "5 CME",
    price: "80 GEL",
    memberPrice: "Free",
    summary:
      "Standardised interpretation, built around the analysis of more than 120 real traces with assessments.",
    modules: [
      "Physiological basis",
      "Baseline rate and variability",
      "Accelerations and decelerations",
      "Classification",
      "Action algorithm",
      "Case bank",
    ],
    open: true,
  },
  {
    slug: "kritikuli-mdgomareobebi",
    title: "Maternal critical care",
    format: "Hybrid",
    level: "Advanced",
    duration: "12 hours · 2 days",
    cme: "10 CME",
    price: "180 GEL",
    memberPrice: "110 GEL",
    summary:
      "Sepsis, embolism, eclampsia and cardiogenic shock — recognition, stabilisation and transfer.",
    modules: [
      "Obstetric sepsis",
      "Amniotic fluid embolism",
      "Eclampsia and HELLP",
      "Cardiac complications",
      "Stabilisation and transfer",
    ],
    open: false,
  },
];

export const cases: ClinicalCase[] = [
  {
    slug: "case-142",
    number: 142,
    title: "A 32-week pregnancy with headache and visual disturbance",
    date: "2026-08-25",
    topic: "Hypertension",
    presentation:
      "A 29-year-old primigravida at 32+4 weeks presents with two days of severe headache and \"flashing lights\" in her vision. Blood pressure 168/112 mmHg, urine protein 3+, platelets 88,000/µL, ALT 96 U/L.",
    question: "What is the most appropriate next step?",
    options: [
      { label: "Outpatient monitoring with review in 48 hours" },
      {
        label:
          "Admission, magnesium sulphate, antihypertensive therapy and planning for delivery",
        correct: true,
      },
      { label: "Antihypertensive therapy alone, with delivery at 37 weeks" },
      { label: "Immediate caesarean section under general anaesthesia" },
    ],
    discussion:
      "This patient has pre-eclampsia with severe features: severe hypertension, cerebral symptoms, thrombocytopenia and raised liver enzymes (features of HELLP). She requires immediate admission, eclampsia prophylaxis with magnesium sulphate and blood pressure control. At 32 weeks corticosteroid prophylaxis is indicated, but delivery should not be delayed if the mother's condition deteriorates. Caesarean section is not an automatic choice — the mode of delivery is decided case by case.",
    takeaway:
      "Pre-eclampsia with severe features before 34 weeks calls for stabilisation, steroids and a delivery plan — not expectant management at home.",
  },
  {
    slug: "case-141",
    number: 141,
    title: "Monochorionic twins with discordant amniotic fluid",
    date: "2026-08-18",
    topic: "Multiple pregnancy",
    presentation:
      "A 34-year-old in her second pregnancy at 21 weeks with monochorionic diamniotic twins. Ultrasound shows the donor twin with an MVP of 1.4 cm and no visible bladder; the recipient has an MVP of 9.2 cm.",
    question: "What is the most likely diagnosis and the required action?",
    options: [
      { label: "Selective growth restriction — monitor every two weeks" },
      {
        label: "TTTS (Quintero stage II) — refer to a fetal therapy centre",
        correct: true,
      },
      { label: "Normal variation — repeat in four weeks" },
      { label: "Anomaly in one twin — proceed to amniocentesis" },
    ],
    discussion:
      "An MVP below 2 cm in one twin and above 8 cm in the other in a monochorionic pregnancy meets the diagnostic criteria for TTTS. A non-visualised bladder in the donor corresponds to Quintero stage II. This requires immediate referral to a centre where fetoscopic laser ablation is available.",
    takeaway:
      "Monochorionic twins need fortnightly monitoring from 16 weeks — TTTS can develop rapidly and requires timely intervention.",
  },
  {
    slug: "case-140",
    number: 140,
    title: "Postpartum haemorrhage due to uterine atony",
    date: "2026-08-11",
    topic: "Haemorrhage",
    presentation:
      "A 27-year-old has lost 1,200 mL of blood 20 minutes after a vaginal birth. The uterus is soft, the placenta is complete and the genital tract is intact.",
    question: "Which sequence is correct?",
    options: [
      { label: "Immediate hysterectomy" },
      {
        label:
          "Uterine massage + uterotonics + tranexamic acid + IV access and preparation for transfusion",
        correct: true,
      },
      { label: "Fluid therapy and observation only" },
      { label: "Uterine artery embolisation as the first step" },
    ],
    discussion:
      "Atony is the most common cause of postpartum haemorrhage. Management is stepwise: mechanical (massage, bimanual compression), pharmacological (oxytocin, methylergometrine, misoprostol, carbetocin), tranexamic acid within three hours, then balloon tamponade and surgical measures. Hysterectomy remains the last resort.",
    takeaway:
      "Timely tranexamic acid (< 3 h) and a stepwise protocol reduce the need for massive transfusion and hysterectomy.",
  },
];
