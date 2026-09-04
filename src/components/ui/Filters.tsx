"use client";

import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { cn } from "@/lib/utils";

export function SearchField({
  locale,
  value,
  onChange,
  placeholder,
  className,
}: {
  locale: Locale;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className?: string;
}) {
  const dict = t(locale);
  return (
    <div className={cn("relative", className)}>
      <Icon
        name="search"
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="field !rounded-full !pl-11 !pr-10"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label={dict.filters.clear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-400 transition hover:bg-cream-200 hover:text-ink-700"
        >
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  );
}

export function ChipGroup({
  options,
  value,
  onChange,
  allLabel,
}: {
  options: readonly string[];
  value: string | null;
  onChange: (v: string | null) => void;
  allLabel: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        aria-pressed={value === null}
        className={cn(
          "badge border transition",
          value === null
            ? "border-brand-700 bg-brand-700 text-white"
            : "border-line-strong bg-white text-ink-600 hover:border-brand-300 hover:text-brand-800",
        )}
      >
        {allLabel}
      </button>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(value === o ? null : o)}
          aria-pressed={value === o}
          className={cn(
            "badge border transition",
            value === o
              ? "border-brand-700 bg-brand-700 text-white"
              : "border-line-strong bg-white text-ink-600 hover:border-brand-300 hover:text-brand-800",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  allLabel: string;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field appearance-none pr-10"
        >
          <option value="">{allLabel}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
        />
      </div>
    </label>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2.5 text-sm text-ink-700"
    >
      <span
        className={cn(
          "relative h-6 w-10 rounded-full transition-colors",
          checked ? "bg-brand-600" : "bg-line-strong",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-[1.125rem]" : "translate-x-0.5",
          )}
        />
      </span>
      {label}
    </button>
  );
}

export function ResultCount({
  locale,
  n,
  word,
}: {
  locale: Locale;
  n: number;
  word?: string;
}) {
  const dict = t(locale);
  return (
    <p className="text-sm text-ink-500" role="status" aria-live="polite">
      {dict.search.resultsFound(n, word ?? dict.search.words.result)}
    </p>
  );
}

export function EmptyState({
  locale,
  title,
  text,
  onReset,
}: {
  locale: Locale;
  title?: string;
  text?: string;
  onReset?: () => void;
}) {
  const dict = t(locale);
  return (
    <div className="card flex flex-col items-center px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-200 text-ink-400">
        <Icon name="search" size={22} />
      </span>
      <p className="mt-4 font-semibold text-ink-900">{title ?? dict.filters.emptyTitle}</p>
      <p className="mt-1.5 max-w-sm text-sm text-ink-500">{text ?? dict.filters.emptyText}</p>
      {onReset && (
        <button onClick={onReset} className="btn btn-outline btn-sm mt-6">
          {dict.filters.clear}
        </button>
      )}
    </div>
  );
}

export function Pagination({
  locale,
  page,
  pages,
  onChange,
}: {
  locale: Locale;
  page: number;
  pages: number;
  onChange: (p: number) => void;
}) {
  const dict = t(locale);
  if (pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label={dict.common.page}>
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-white text-ink-600 transition hover:border-brand-400 disabled:opacity-40"
        aria-label={dict.common.previous}
      >
        <Icon name="arrow-left" size={16} />
      </button>
      {nums.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            "h-9 min-w-9 rounded-full px-3 text-sm font-semibold transition",
            n === page
              ? "bg-brand-700 text-white"
              : "border border-line-strong bg-white text-ink-600 hover:border-brand-400",
          )}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-white text-ink-600 transition hover:border-brand-400 disabled:opacity-40"
        aria-label={dict.common.next}
      >
        <Icon name="arrow-right" size={16} />
      </button>
    </nav>
  );
}
