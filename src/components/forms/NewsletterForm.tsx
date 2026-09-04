"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";

type State = "idle" | "loading" | "done" | "error";

export function NewsletterForm({
  locale,
  variant = "dark",
}: {
  locale: Locale;
  variant?: "dark" | "light";
}) {
  const dict = t(locale);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang: locale }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error");
      setState("done");
      setMessage(data.message);
      setEmail("");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Error");
    }
  }

  const dark = variant === "dark";

  if (state === "done") {
    return (
      <div
        className={`flex items-start gap-2.5 rounded-xl px-4 py-3.5 text-sm ${
          dark ? "bg-white/10 text-white" : "bg-brand-50 text-brand-800"
        }`}
        role="status"
      >
        <Icon name="check-circle" size={18} className="mt-0.5 shrink-0" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          {dict.forms.emailLabel}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.newsletter.placeholder}
          className={
            dark
              ? "w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-white/45"
              : "field !rounded-full"
          }
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={
            dark
              ? "btn shrink-0 bg-white px-5 text-brand-900 hover:bg-brand-100"
              : "btn btn-primary shrink-0 px-5"
          }
        >
          {state === "loading" ? "…" : <Icon name="arrow-right" size={17} />}
          <span className="sr-only">{dict.newsletter.subscribe}</span>
        </button>
      </div>
      {state === "error" && (
        <p className={`text-xs ${dark ? "text-clay-300" : "text-red-700"}`} role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
