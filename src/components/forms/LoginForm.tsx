"use client";

import { useState } from "react";
import Link from "@/components/ui/LocaleLink";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";

export function LoginForm({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(dict.forms.invalidEmail);
      return;
    }
    if (password.length < 6) {
      setError(dict.forms.shortPassword);
      return;
    }

    setLoading(true);
    // დემო: ავტორიზაციის სერვერი ჯერ არ არის მიერთებული.
    setTimeout(() => {
      setLoading(false);
      setError(dict.forms.loginDemoNote);
    }, 700);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <label className="block">
        <span className="field-label">{dict.forms.emailLabel.replace(" *", "")}</span>
        <input
          type="email"
          className="field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.ge"
          autoComplete="username"
        />
      </label>

      <label className="block">
        <span className="field-label">{dict.forms.password}</span>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            className="field pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? dict.forms.hidePassword : dict.forms.showPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ink-400 transition hover:bg-cream-200 hover:text-ink-700"
          >
            <Icon name={show ? "close" : "user"} size={15} />
          </button>
        </div>
      </label>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-ink-600">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-line-strong accent-[var(--color-brand-700)]"
          />
          {dict.forms.rememberMe}
        </label>
        <Link href="/contact" className="font-semibold text-brand-700 hover:underline">
          {dict.forms.forgotPassword}
        </Link>
      </div>

      {error && (
        <p
          className="rounded-xl bg-clay-100 px-4 py-3 text-sm leading-relaxed text-ink-800"
          role="alert"
        >
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading ? dict.forms.checking : dict.forms.signIn}
        {!loading && <Icon name="arrow-right" size={16} />}
      </button>
    </form>
  );
}
