import { NextResponse } from "next/server";
import { isLocale, type Locale } from "@/i18n/config";
import { content } from "@/content";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const messages = {
  ka: {
    badFormat: "მოთხოვნის ფორმატი არასწორია",
    invalid: "შეავსეთ ველები სწორად",
    field: "შეავსეთ ველი",
    email: "მიუთითეთ სწორი ელფოსტა",
    phone: "მიუთითეთ სწორი ტელეფონი",
    specialty: "აირჩიეთ სპეციალობა",
    city: "აირჩიეთ ქალაქი",
    consent: "საჭიროა თანხმობა",
    ok: (ref: string, tier: string, email: string) =>
      `თქვენი განაცხადი (${ref}) მიღებულია „${tier}“ კატეგორიაში. დამადასტურებელი წერილი გამოგზავნილია მისამართზე ${email}.`,
  },
  en: {
    badFormat: "Malformed request",
    invalid: "Please check the fields",
    field: "This field is required",
    email: "Enter a valid email address",
    phone: "Enter a valid phone number",
    specialty: "Choose a specialty",
    city: "Choose a city",
    consent: "Consent is required",
    ok: (ref: string, tier: string, email: string) =>
      `Your application (${ref}) has been received under “${tier}”. A confirmation email has been sent to ${email}.`,
  },
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: messages.ka.badFormat }, { status: 400 });
  }

  const langRaw = String(body.lang ?? "");
  const locale: Locale = isLocale(langRaw) ? langRaw : "ka";
  const m = messages[locale];
  const { tiers } = content(locale);

  const get = (k: string) => String(body[k] ?? "").trim();
  const fields: Record<string, string> = {};

  if (get("firstName").length < 2) fields.firstName = m.field;
  if (get("lastName").length < 2) fields.lastName = m.field;
  if (!emailRe.test(get("email"))) fields.email = m.email;
  if (get("phone").length < 6) fields.phone = m.phone;
  if (!get("specialty")) fields.specialty = m.specialty;
  if (!get("city")) fields.city = m.city;
  if (get("workplace").length < 2) fields.workplace = m.field;
  if (get("licence").length < 3) fields.licence = m.field;
  if (get("consent") !== "yes") fields.consent = m.consent;

  const tier = tiers.find((x) => x.id === get("tier")) ?? tiers[1];

  if (Object.keys(fields).length) {
    return NextResponse.json({ error: m.invalid, fields }, { status: 422 });
  }

  const ref = `MFM-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
  console.info("[join]", { ref, email: get("email"), tier: tier.id });

  return NextResponse.json({
    ok: true,
    reference: ref,
    message: m.ok(ref, tier.name, get("email")),
  });
}
