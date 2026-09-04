import { NextResponse } from "next/server";
import { isLocale } from "@/i18n/config";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const messages = {
  ka: {
    badFormat: "მოთხოვნის ფორმატი არასწორია",
    invalid: "შეავსეთ ველები სწორად",
    name: "მიუთითეთ სახელი და გვარი",
    email: "მიუთითეთ სწორი ელფოსტა",
    topic: "აირჩიეთ თემა",
    message: "შეტყობინება უნდა შეიცავდეს მინიმუმ 10 სიმბოლოს",
    ok: (first: string, email: string) =>
      `გმადლობთ, ${first}! თქვენი მიმართვა მიღებულია. პასუხს გამოგიგზავნით მისამართზე ${email} ორი სამუშაო დღის განმავლობაში.`,
  },
  en: {
    badFormat: "Malformed request",
    invalid: "Please check the fields",
    name: "Enter your full name",
    email: "Enter a valid email address",
    topic: "Choose a subject",
    message: "The message must be at least 10 characters",
    ok: (first: string, email: string) =>
      `Thank you, ${first}. We have received your enquiry and will reply to ${email} within two working days.`,
  },
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: messages.ka.badFormat }, { status: 400 });
  }

  const lang = String(body.lang ?? "");
  const m = messages[isLocale(lang) ? lang : "ka"];

  const fields: Record<string, string> = {};
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const topic = String(body.topic ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2) fields.name = m.name;
  if (!emailRe.test(email)) fields.email = m.email;
  if (!topic) fields.topic = m.topic;
  if (message.length < 10) fields.message = m.message;

  if (Object.keys(fields).length) {
    return NextResponse.json({ error: m.invalid, fields }, { status: 422 });
  }

  // დემო რეჟიმი: რეალურ პროექტში აქ იგზავნება წერილი ან იქმნება ჩანაწერი CRM-ში.
  console.info("[contact]", { name, email, topic, length: message.length });

  return NextResponse.json({
    ok: true,
    message: m.ok(name.split(" ")[0], email),
  });
}
