"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Tier } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { cn } from "@/lib/utils";

type State = "idle" | "loading" | "done" | "error";

export function JoinForm({
  locale,
  tiers,
  cities,
  defaultTier,
}: {
  locale: Locale;
  tiers: Tier[];
  cities: string[];
  defaultTier?: string;
}) {
  const dict = t(locale);
  const [step, setStep] = useState(0);
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<Record<string, string>>({
    tier: defaultTier ?? "full",
  });

  function set(k: string, v: string) {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  }

  function validateStep(i: number) {
    const e: Record<string, string> = {};
    if (i === 0) {
      if (!data.firstName?.trim()) e.firstName = dict.forms.required;
      if (!data.lastName?.trim()) e.lastName = dict.forms.required;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) e.email = dict.forms.invalidEmail;
      if (!data.phone?.trim()) e.phone = dict.forms.required;
    }
    if (i === 1) {
      if (!data.specialty) e.specialty = dict.forms.required;
      if (!data.workplace?.trim()) e.workplace = dict.forms.required;
      if (!data.city) e.city = dict.forms.required;
      if (!data.licence?.trim()) e.licence = dict.forms.required;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (!validateStep(1)) {
      setStep(1);
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang: locale }),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.fields) setErrors(json.fields);
        throw new Error(json.error ?? "Error");
      }
      setState("done");
      setMessage(json.message);
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Error");
    }
  }

  if (state === "done") {
    return (
      <div className="card flex flex-col items-center px-6 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <Icon name="check-circle" size={32} />
        </span>
        <h2 className="mt-6 text-2xl">{dict.forms.joinSuccessTitle}</h2>
        <p className="mt-3 max-w-md leading-relaxed text-ink-600">{message}</p>
        <div className="mt-8 w-full max-w-md rounded-2xl bg-cream-200 p-5 text-left">
          <p className="text-sm font-semibold text-ink-900">{dict.forms.nextSteps}</p>
          <ol className="mt-3 space-y-2 text-sm text-ink-600">
            {dict.forms.nextStepList.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? <p className="mt-1.5 text-xs text-red-700">{errors[k]}</p> : null;

  return (
    <div className="card overflow-hidden">
      {/* ნაბიჯების ინდიკატორი */}
      <ol className="flex border-b border-line bg-cream-100">
        {dict.forms.joinSteps.map((s, i) => (
          <li key={s} className="flex-1">
            <button
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className={cn(
                "flex w-full items-center gap-2.5 px-4 py-4 text-left text-sm transition",
                i === step ? "bg-white font-semibold text-brand-800" : "text-ink-500",
                i < step && "hover:bg-white/60",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  i < step
                    ? "bg-brand-600 text-white"
                    : i === step
                      ? "bg-brand-700 text-white"
                      : "bg-cream-300 text-ink-500",
                )}
              >
                {i < step ? <Icon name="check" size={12} strokeWidth={3} /> : i + 1}
              </span>
              <span className="hidden sm:inline">{s}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="space-y-5 p-6 sm:p-8">
        {step === 0 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="field-label">{dict.forms.firstName}</span>
                <input
                  className="field"
                  value={data.firstName ?? ""}
                  onChange={(e) => set("firstName", e.target.value)}
                />
                {err("firstName")}
              </label>
              <label className="block">
                <span className="field-label">{dict.forms.lastName}</span>
                <input
                  className="field"
                  value={data.lastName ?? ""}
                  onChange={(e) => set("lastName", e.target.value)}
                />
                {err("lastName")}
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="field-label">{dict.forms.emailLabel}</span>
                <input
                  type="email"
                  className="field"
                  value={data.email ?? ""}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="name@example.ge"
                />
                {err("email")}
              </label>
              <label className="block">
                <span className="field-label">{dict.forms.phoneLabel} *</span>
                <input
                  className="field"
                  value={data.phone ?? ""}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+995 5XX XX XX XX"
                />
                {err("phone")}
              </label>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="field-label">{dict.forms.specialty}</span>
                <div className="relative">
                  <select
                    className="field appearance-none pr-10"
                    value={data.specialty ?? ""}
                    onChange={(e) => set("specialty", e.target.value)}
                  >
                    <option value="">{dict.forms.choose}</option>
                    {dict.forms.specialties.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="chevron-down"
                    size={16}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
                  />
                </div>
                {err("specialty")}
              </label>
              <label className="block">
                <span className="field-label">{dict.filters.city} *</span>
                <div className="relative">
                  <select
                    className="field appearance-none pr-10"
                    value={data.city ?? ""}
                    onChange={(e) => set("city", e.target.value)}
                  >
                    <option value="">{dict.forms.choose}</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value={dict.forms.other}>{dict.forms.other}</option>
                  </select>
                  <Icon
                    name="chevron-down"
                    size={16}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
                  />
                </div>
                {err("city")}
              </label>
            </div>
            <label className="block">
              <span className="field-label">{dict.forms.workplace}</span>
              <input
                className="field"
                value={data.workplace ?? ""}
                onChange={(e) => set("workplace", e.target.value)}
              />
              {err("workplace")}
            </label>
            <label className="block">
              <span className="field-label">{dict.forms.licence}</span>
              <input
                className="field"
                value={data.licence ?? ""}
                onChange={(e) => set("licence", e.target.value)}
                placeholder="0012345"
              />
              {err("licence")}
              <span className="mt-1.5 block text-xs text-ink-400">{dict.forms.licenceHint}</span>
            </label>
          </>
        )}

        {step === 2 && (
          <>
            <fieldset className="space-y-3">
              <legend className="field-label">{dict.forms.tierLegend}</legend>
              {tiers.map((tier) => (
                <label
                  key={tier.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition",
                    data.tier === tier.id
                      ? "border-brand-600 bg-brand-50"
                      : "border-line-strong hover:border-brand-300",
                  )}
                >
                  <input
                    type="radio"
                    name="tier"
                    value={tier.id}
                    checked={data.tier === tier.id}
                    onChange={(e) => set("tier", e.target.value)}
                    className="mt-1 h-4 w-4 accent-[var(--color-brand-700)]"
                  />
                  <span className="flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-semibold text-ink-900">{tier.name}</span>
                      <span className="text-sm font-bold text-brand-700">
                        {tier.price}{" "}
                        <span className="font-normal text-ink-500">/ {tier.period}</span>
                      </span>
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-relaxed text-ink-600">
                      {tier.audience}
                    </span>
                  </span>
                </label>
              ))}
            </fieldset>

            <label className="block">
              <span className="field-label">{dict.forms.noteLabel}</span>
              <textarea
                rows={4}
                className="field resize-y"
                value={data.note ?? ""}
                onChange={(e) => set("note", e.target.value)}
                placeholder={dict.forms.notePlaceholder}
              />
            </label>

            <label className="flex items-start gap-3 text-[0.8125rem] leading-relaxed text-ink-600">
              <input
                type="checkbox"
                checked={data.consent === "yes"}
                onChange={(e) => set("consent", e.target.checked ? "yes" : "")}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-line-strong accent-[var(--color-brand-700)]"
              />
              <span>{dict.forms.joinConsent}</span>
            </label>
          </>
        )}

        {state === "error" && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {message}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="btn btn-outline btn-sm disabled:invisible"
          >
            <Icon name="arrow-left" size={15} />
            {dict.common.back}
          </button>

          {step < 2 ? (
            <button
              onClick={() => validateStep(step) && setStep((s) => s + 1)}
              className="btn btn-primary"
            >
              {dict.common.next}
              <Icon name="arrow-right" size={16} />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={state === "loading" || data.consent !== "yes"}
              className="btn btn-primary"
            >
              {state === "loading" ? dict.forms.sending : dict.forms.submit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
