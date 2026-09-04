"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/ui/LocaleLink";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/Logo";
import { localeFromPathname } from "@/i18n/config";
import { t } from "@/i18n/ui";

export default function NotFound() {
  const locale = localeFromPathname(usePathname());
  const dict = t(locale);

  return (
    <section className="flex min-h-[70vh] items-center pb-20 pt-[calc(var(--header-h)+4rem)]">
      <div className="container-x">
        <div className="mx-auto max-w-xl text-center">
          <LogoMark src="/img/logo.png" className="mx-auto h-16 w-16" />
          <p className="mt-8 text-6xl font-bold text-brand-700">404</p>
          <h1 className="mt-4 text-[1.75rem]">{dict.notFound.title}</h1>
          <p className="mt-3 leading-relaxed text-ink-600">{dict.notFound.text}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-primary">
              <Icon name="arrow-left" size={16} />
              {dict.notFound.backHome}
            </Link>
            <Link href="/search" className="btn btn-outline">
              <Icon name="search" size={16} />
              {dict.common.search}
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-2">
            {dict.notFound.links.map((x) => (
              <li key={x.href}>
                <Link
                  href={x.href}
                  className="badge border border-line-strong bg-white text-ink-600 transition hover:border-brand-300 hover:text-brand-800"
                >
                  {x.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
