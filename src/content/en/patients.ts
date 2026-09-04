import type { Faq, HighRiskGroup, PatientResource } from "../types";

export const faq: Faq[] = [
  {
    q: "What does “high-risk pregnancy” actually mean?",
    a: "It does not mean that something will inevitably go wrong. The term simply means the pregnancy needs closer monitoring — because of a chronic condition, twins, a complication in a previous pregnancy or maternal age, for example. Most high-risk pregnancies end with a healthy baby.",
  },
  {
    q: "Who is a perinatologist and when should I see one?",
    a: "A perinatologist (maternal-fetal medicine specialist) is an obstetrician-gynaecologist with additional training in managing complex pregnancies. Referral is usual when there is a maternal chronic illness, a suspected fetal anomaly, a multiple pregnancy or a serious complication in a previous pregnancy. Normally your own doctor will refer you.",
  },
  {
    q: "What tests will I have during pregnancy?",
    a: "The standard programme includes blood and urine tests at the first visit, first-trimester screening at 11–13 weeks, the anomaly scan at 18–22 weeks, a glucose test at 24–28 weeks and a group B streptococcus test at 36–37 weeks. Additional tests are arranged individually.",
  },
  {
    q: "Can I decline a test?",
    a: "Yes. Every investigation is carried out only with your informed consent. Your doctor is obliged to explain the purpose of the test, its benefits and the possible outcomes — the decision is yours. Declining must not affect the quality of your care.",
  },
  {
    q: "What if I live in a region with no perinatologist?",
    a: "The MFM Georgia regional perinatal network operates in nine centres. Your doctor can contact the perinatologist on duty via the 24/7 consultation line and, if needed, arrange a remote consultation or transfer. See the find-a-specialist page.",
  },
  {
    q: "Which symptoms need immediate attention?",
    a: "Seek medical care immediately if you have vaginal bleeding, a severe persistent headache, visual disturbance, severe abdominal pain, difficulty breathing, a high fever, reduced or absent fetal movements, or a sudden gush of fluid.",
  },
  {
    q: "Are your materials free?",
    a: "Yes. Every information leaflet and clinical guideline is free to access, with no registration required. Printed copies are distributed through partner clinics.",
  },
  {
    q: "Do you see patients?",
    a: "No. MFM Georgia is a professional association, not a healthcare provider — we do not run consultations or prescribe treatment. Our role is to develop standards, educate clinicians and give patients reliable information.",
  },
];

export const patientResources: PatientResource[] = [
  {
    title: "High-risk pregnancy — what you need to know",
    format: "PDF · 12 pp.",
    lang: "English",
    summary:
      "What the diagnosis means, which tests you will have and how to prepare for your appointment.",
  },
  {
    title: "Pre-eclampsia: symptoms you should not miss",
    format: "PDF · 8 pp.",
    lang: "English",
    summary: "Warning signs, monitoring your own blood pressure and when to call your doctor.",
  },
  {
    title: "Expecting twins",
    format: "PDF · 10 pp.",
    lang: "English",
    summary: "Chorionicity, the monitoring schedule and planning the birth, in plain language.",
  },
  {
    title: "Gestational diabetes — diet and self-monitoring",
    format: "PDF · 14 pp.",
    lang: "English",
    summary: "Practical advice, sample meals and instructions for using a glucometer.",
  },
  {
    title: "Signs of preterm labour",
    format: "PDF · 6 pp.",
    lang: "English",
    summary: "How to recognise the early signs and what to do straight away.",
  },
  {
    title: "Questions to ask your doctor",
    format: "PDF · 4 pp.",
    lang: "English",
    summary: "A printable list so nothing important is forgotten during your appointment.",
  },
];

export const patientRights: string[] = [
  "To receive understandable information about your condition and the treatment proposed",
  "To consent to, or refuse, any investigation or intervention",
  "To request a second opinion from another specialist",
  "To see your medical records and receive a copy",
  "To have a companion with you during labour",
  "To receive adequate pain relief",
  "To have the confidentiality of your personal data protected",
];

export const highRiskFactors: HighRiskGroup[] = [
  {
    group: "Maternal health",
    items: [
      "Chronic hypertension",
      "Diabetes (type 1 or 2)",
      "Autoimmune disease",
      "Kidney or heart disease",
      "Obesity or markedly low body weight",
    ],
  },
  {
    group: "Features of the pregnancy",
    items: [
      "Twins or more",
      "Fetal growth restriction",
      "Abnormal placental implantation",
      "Abnormal amniotic fluid volume",
    ],
  },
  {
    group: "Previous history",
    items: [
      "Previous preterm birth",
      "Previous pre-eclampsia",
      "Recurrent pregnancy loss",
      "Previous caesarean section",
    ],
  },
];
