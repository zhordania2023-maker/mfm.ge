import { NextResponse } from "next/server";
import { isLocale } from "@/i18n/config";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const messages = {
  ka: {
    badFormat: "მოთხოვნის ფორმატი არასწორია",
    badEmail: "მიუთითეთ სწორი ელფოსტა",
    ok: "გმადლობთ! გამოწერა გააქტიურებულია — პირველ წერილს თვის ბოლოს მიიღებთ.",
  },
  en: {
    badFormat: "Malformed request",
    badEmail: "Enter a valid email address",
    ok: "Thank you! Your subscription is active — the first email arrives at the end of the month.",
  },
};

export async function POST(request: Request) {
  let body: { email?: string; lang?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: messages.ka.badFormat }, { status: 400 });
  }

  const m = messages[isLocale(body.lang) ? body.lang : "ka"];
  const email = String(body.email ?? "").trim();

  if (!emailRe.test(email)) {
    return NextResponse.json({ error: m.badEmail }, { status: 422 });
  }

  console.info("[newsletter]", email);

  return NextResponse.json({ ok: true, message: m.ok });
}
