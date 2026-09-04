"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "@/components/ui/LocaleLink";
import { navFor } from "@/content/nav";
import type { NavItem } from "@/content/types";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { SearchOverlay } from "./SearchOverlay";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { stripLocale, type Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";
import { cn } from "@/lib/utils";

export function Header({
  locale,
  logoSrc,
}: {
  locale: Locale;
  logoSrc?: string | null;
}) {
  const pathname = usePathname();
  const dict = t(locale);
  const { mainNav } = navFor(locale);
  // დესკტოპზე „მთავარი" ლოგოს გავლით ხელმისაწვდომია — ადგილს ვზოგავთ
  const desktopNav = mainNav.filter((i) => i.href !== "/");

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // მარშრუტის შეცვლისას ყველა ფენა იხურება (რენდერის დროს კორექცია, არა ეფექტი)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
      if (e.key === "/" && !searchOpen) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== "INPUT" && tag !== "TEXTAREA") {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  function openWithDelay(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }
  function closeWithDelay() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }

  const path = stripLocale(pathname);
  const isActive = (item: NavItem) =>
    item.href === "/" ? path === "/" : path.startsWith(item.href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-700 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        {dict.common.skipToContent}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || openMenu
            ? "border-b border-line bg-cream-100/92 backdrop-blur-md"
            : "border-b border-transparent bg-cream-100/70 backdrop-blur-sm",
        )}
        onMouseLeave={closeWithDelay}
      >
        <div className="mx-auto w-full max-w-[88rem] px-5 md:px-8">
          <div className="flex h-[72px] items-center justify-between gap-2 sm:gap-4">
            <Logo locale={locale} src={logoSrc} />

            {/* დესკტოპის ნავიგაცია */}
            <nav aria-label={dict.common.mainNav} className="hidden min-[1340px]:block">
              <ul className="flex items-center gap-0.5">
                {desktopNav.map((item) => (
                  <li
                    key={item.label}
                    onMouseEnter={() => (item.groups ? openWithDelay(item.label) : closeWithDelay())}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={item.groups ? openMenu === item.label : undefined}
                      aria-haspopup={item.groups ? "true" : undefined}
                      onFocus={() => (item.groups ? openWithDelay(item.label) : setOpenMenu(null))}
                      className={cn(
                        "flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[0.875rem] font-medium transition-colors 2xl:px-3.5 2xl:text-[0.9375rem]",
                        isActive(item) || openMenu === item.label
                          ? "text-brand-800"
                          : "text-ink-700 hover:text-brand-800",
                      )}
                    >
                      {item.label}
                      {item.groups && (
                        <Icon
                          name="chevron-down"
                          size={14}
                          className={cn(
                            "transition-transform duration-200",
                            openMenu === item.label && "rotate-180",
                          )}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* მარჯვენა მოქმედებები */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
              <button
                onClick={() => setSearchOpen(true)}
                className="rounded-full p-2 text-ink-600 transition hover:bg-cream-300 hover:text-ink-900 sm:p-2.5"
                aria-label={dict.common.searchAria}
              >
                <Icon name="search" size={19} />
              </button>

              <span className="hidden sm:block">
                <LanguageSwitcher />
              </span>

              <Link
                href="/membership/join"
                className="btn btn-primary btn-sm hidden min-[1560px]:inline-flex"
              >
                {dict.common.join}
              </Link>

              <Link
                href="/login"
                className="hidden h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-white transition hover:bg-brand-800 sm:flex"
                aria-label={dict.common.account}
              >
                <Icon name="user" size={17} />
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-full p-2 text-ink-700 transition hover:bg-cream-300 sm:p-2.5 min-[1340px]:hidden"
                aria-label={dict.common.openMenu}
              >
                <Icon name="menu" size={21} />
              </button>
            </div>
          </div>
        </div>

        {/* მეგა-მენიუ */}
        {desktopNav.map((item) =>
          item.groups && openMenu === item.label ? (
            <div
              key={item.label}
              className="absolute inset-x-0 top-full hidden animate-fade-in border-b border-line bg-white shadow-[var(--shadow-menu)] min-[1340px]:block"
              onMouseEnter={() => openWithDelay(item.label)}
            >
              <div className="mx-auto w-full max-w-[88rem] px-5 md:px-8">
                <div className="grid gap-8 py-8 lg:grid-cols-[1fr_1fr_20rem]">
                  {item.groups.map((group) => (
                    <div key={group.title}>
                      <p className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-ink-400">
                        {group.title}
                      </p>
                      <ul className="space-y-1">
                        {group.links.map((link) => (
                          <li key={link.href + link.label}>
                            <Link
                              href={link.href}
                              className="group block rounded-xl px-3 py-2.5 transition hover:bg-cream-100"
                            >
                              <span className="flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ink-900 group-hover:text-brand-800">
                                {link.label}
                                <Icon
                                  name="arrow-right"
                                  size={14}
                                  className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                                />
                              </span>
                              {link.description && (
                                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-500">
                                  {link.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {item.feature && (
                    <Link
                      href={item.feature.href}
                      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-brand-900 p-6 text-white"
                    >
                      <Image
                        src={item.feature.image}
                        alt=""
                        fill
                        sizes="20rem"
                        className="object-cover opacity-45 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/70 to-brand-900/20" />
                      <div className="relative">
                        <span className="badge bg-white/15 text-white/90 backdrop-blur">
                          {item.feature.eyebrow}
                        </span>
                        <p className="mt-3 text-lg font-bold leading-snug text-white">
                          {item.feature.title}
                        </p>
                        <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/75">
                          {item.feature.text}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-200">
                          {item.feature.cta}
                          <Icon
                            name="arrow-right"
                            size={15}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : null,
        )}
      </header>

      {searchOpen && <SearchOverlay locale={locale} onClose={() => setSearchOpen(false)} />}
      <MobileNav
        locale={locale}
        logoSrc={logoSrc}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
