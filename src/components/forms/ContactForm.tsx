"use client";

import { useState } from "react";
import Link from "@/components/ui/LocaleLink";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";

type State = "idle" | "loading" | "done" | "error";

export function ContactForm({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = { ...Object.fromEntries(form.entries()), lang: locale };

    setState("loading");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        throw new Error(data.error ?? "Error");
      }
      setState("done");
      setMessage(data.message);
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Error");
    }
  }

  if (state === "done") {
    return (
      <div className="card flex flex-col items-center px-6 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <Icon name="check-circle" size={28} />
        </span>
        <h3 className="mt-5 text-xl">{dict.forms.contactSuccessTitle}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-600">{message}</p>
        <button onClick={() => setState("idle")} className="btn btn-outline btn-sm mt-7">
          {dict.forms.newMessage}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="field-label">{dict.forms.nameLabel}</span>
          <input name="name" className="field" required placeholder={dict.forms.namePlaceholder} />
          {errors.name && <p className="mt-1.5 text-xs text-red-700">{errors.name}</p>}
        </label>
        <label className="block">
          <span className="field-label">{dict.forms.emailLabel}</span>
          <input
            name="email"
            type="email"
            className="field"
            required
            placeholder="name@example.ge"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-700">{errors.email}</p>}
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="field-label">{dict.forms.phoneLabel}</span>
          <input name="phone" className="field" placeholder="+995 5XX XX XX XX" />
        </label>
        <label className="block">
          <span className="field-label">{dict.forms.topicLabel}</span>
          <div className="relative">
            <select name="topic" className="field appearance-none pr-10" required defaultValue="">
              <option value="" disabled>
                {dict.forms.topicPlaceholder}
              </option>
              {dict.forms.topics.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <Icon
              name="chevron-down"
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
            />
          </div>
          {errors.topic && <p className="mt-1.5 text-xs text-red-700">{errors.topic}</p>}
        </label>
      </div>

      <label className="block">
        <span className="field-label">{dict.forms.messageLabel}</span>
        <textarea
          name="message"
          rows={6}
          className="field resize-y"
          required
          placeholder={dict.forms.messagePlaceholder}
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-700">{errors.message}</p>}
      </label>

      <label className="flex items-start gap-3 text-[0.8125rem] leading-relaxed text-ink-600">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-line-strong accent-[var(--color-brand-700)]"
        />
        <span>
          {dict.forms.consentText}{" "}
          <Link href="/privacy" className="font-semibold text-brand-700 underline">
            {dict.forms.privacyLink}
          </Link>
          .
        </span>
      </label>

      {state === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="btn btn-primary w-full sm:w-auto"
      >
        {state === "loading" ? dict.forms.sending : dict.forms.send}
        {state !== "loading" && <Icon name="arrow-right" size={17} />}
      </button>

      <p className="text-xs text-ink-400">{dict.forms.responseNote}</p>
    </form>
  );
}
