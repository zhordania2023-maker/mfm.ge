"use client";

import { useEffect, useState } from "react";
import Link from "@/components/ui/LocaleLink";
import { navFor } from "@/content/nav";
import { siteFor } from "@/content/site-lite";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { cn } from "@/lib/utils";

export function MobileNav({
  locale,
  logoSrc,
  open,
  onClose,
}: {
  locale: Locale;
  logoSrc?: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const dict = t(locale);
  const { mainNav } = navFor(locale);
  const site = siteFor(locale);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[95] min-[1340px]:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-ink-900/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute inset-y-0 right-0 flex w-[min(24rem,92vw)] flex-col bg-cream-100 shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={dict.common.mobileNav}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <Logo locale={locale} src={logoSrc} compact />
          <button
            onClick={onClose}
            className="shrink-0 rounded-full p-2 text-ink-600 transition hover:bg-cream-300"
            aria-label={dict.common.closeMenu}
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label={dict.common.mobileNav}>
          <ul className="space-y-0.5">
            {mainNav.map((item) => (
              <li key={item.label}>
                {item.groups ? (
                  <>
                    <button
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      aria-expanded={expanded === item.label}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[0.9375rem] font-semibold text-ink-900 transition hover:bg-cream-200"
                    >
                      {item.label}
                      <Icon
                        name="chevron-down"
                        size={16}
                        className={cn(
                          "text-ink-500 transition-transform",
                          expanded === item.label && "rotate-180",
                        )}
                      />
                    </button>
                    {expanded === item.label && (
                      <div className="animate-fade-in space-y-3 pb-3 pl-3">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-700"
                        >
                          {dict.common.viewAll} →
                        </Link>
                        {item.groups.map((group) => (
                          <div key={group.title}>
                            <p className="px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-ink-400">
                              {group.title}
                            </p>
                            <ul>
                              {group.links.map((link) => (
                                <li key={link.href + link.label}>
                                  <Link
                                    href={link.href}
                                    onClick={onClose}
                                    className="block rounded-lg px-3 py-2 text-sm text-ink-700 transition hover:bg-cream-200 hover:text-brand-800"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-xl px-3 py-3 text-[0.9375rem] font-semibold text-ink-900 transition hover:bg-cream-200"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-line p-5">
          <div className="flex justify-center pb-1">
            <LanguageSwitcher />
          </div>
          <Link href="/membership/join" onClick={onClose} className="btn btn-primary w-full">
            {dict.common.join}
            <Icon name="arrow-right" size={16} />
          </Link>
          <Link href="/login" onClick={onClose} className="btn btn-outline w-full">
            <Icon name="user" size={16} />
            {dict.common.memberArea}
          </Link>
          <a
            href={`tel:${site.phoneHref}`}
            className="flex items-center justify-center gap-2 pt-1 text-sm text-ink-600"
          >
            <Icon name="phone" size={15} />
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
