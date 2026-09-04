import Link from "@/components/ui/LocaleLink";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  locale,
  items,
  light = false,
}: {
  locale: Locale;
  items: Crumb[];
  light?: boolean;
}) {
  const dict = t(locale);
  return (
    <nav aria-label={dict.common.breadcrumb}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-[0.8125rem]",
          light ? "text-white/60" : "text-ink-500",
        )}
      >
        <li>
          <Link href="/" className="transition hover:underline">
            {dict.common.home}
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <span aria-hidden className={light ? "text-white/30" : "text-ink-300"}>
              /
            </span>
            {c.href && i < items.length - 1 ? (
              <Link href={c.href} className="transition hover:underline">
                {c.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className={cn("font-medium", light ? "text-white" : "text-ink-800")}
              >
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  locale,
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  tone = "cream",
}: {
  locale: Locale;
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  tone?: "cream" | "sand" | "brand";
}) {
  const dark = tone === "brand";

  return (
    <section
      className={cn(
        "relative overflow-hidden pb-14 pt-[calc(var(--header-h)+3rem)]",
        tone === "cream" && "bg-cream-100",
        tone === "sand" && "bg-cream-300",
        dark && "bg-brand-900 text-white",
      )}
    >
      {dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-700/40 blur-3xl"
        />
      )}
      <div className="container-x relative">
        {crumbs && <Breadcrumbs locale={locale} items={crumbs} light={dark} />}
        <div className="mt-5 max-w-3xl">
          {eyebrow && (
            <p
              className={cn(
                "mb-3 text-xs font-bold uppercase tracking-[0.12em]",
                dark ? "text-brand-300" : "text-brand-600",
              )}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "text-[2rem] leading-[1.15] sm:text-[2.5rem] lg:text-[2.875rem]",
              dark && "text-white",
            )}
          >
            {title}
          </h1>
          {intro && (
            <p
              className={cn(
                "mt-5 text-base leading-relaxed sm:text-[1.0625rem]",
                dark ? "text-cream-200/80" : "text-ink-600",
              )}
            >
              {intro}
            </p>
          )}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  action?: { label: string; href: string };
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-600">
            {eyebrow}
          </p>
        )}
        <h2 className="text-[1.75rem] sm:text-[2.125rem]">{title}</h2>
        {intro && <p className="mt-3 leading-relaxed text-ink-600">{intro}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700"
        >
          {action.label}
          <Icon
            name="arrow-right"
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}
