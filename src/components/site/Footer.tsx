import Link from "@/components/ui/LocaleLink";
import { content } from "@/content";
import { LogoMark } from "@/components/ui/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/ui";

export function Footer({
  locale,
  logoSrc,
}: {
  locale: Locale;
  logoSrc?: string | null;
}) {
  const { site, footerNav } = content(locale);
  const dict = t(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-brand-950 text-cream-200">
      {/* გამოწერის ზოლი */}
      <div className="border-b border-white/10">
        <div className="container-x">
          <div className="grid gap-8 py-12 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">{dict.newsletter.heading}</h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-cream-200/70">
                {dict.newsletter.text}
              </p>
            </div>
            <div className="md:w-full md:max-w-sm md:justify-self-end">
              <NewsletterForm locale={locale} />
            </div>
          </div>
        </div>
      </div>

      {/* ძირითადი ბადე */}
      <div className="container-x">
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark src={logoSrc} className="h-[38px] w-[38px] shrink-0 text-brand-300" />
              <span className="text-[1.0625rem] font-bold leading-[1.15] text-white">
                {site.logo.line1}
                <br />
                {site.logo.line2}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-200/65">
              {site.description}
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-cream-200/75 transition hover:text-white"
              >
                <Icon name="mail" size={16} className="text-brand-300" />
                {site.email}
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="flex items-center gap-2.5 text-cream-200/75 transition hover:text-white"
              >
                <Icon name="phone" size={16} className="text-brand-300" />
                {site.phone}
              </a>
              <p className="flex items-start gap-2.5 text-cream-200/75">
                <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-brand-300" />
                <span>
                  {site.address.street}, {site.address.city} {site.address.zip}
                </span>
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-cream-200/70 transition hover:border-brand-400 hover:bg-white/5 hover:text-white"
                >
                  <Icon name={s.icon as IconName} size={16} />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-brand-300">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-cream-200/70 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ქვედა ზოლი */}
      <div className="border-t border-white/10">
        <div className="container-x">
          <div className="flex flex-col gap-4 py-6 text-xs text-cream-200/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.nameFull}. {dict.footer.rights}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/privacy" className="transition hover:text-white">
                {dict.footer.privacy}
              </Link>
              <Link href="/terms" className="transition hover:text-white">
                {dict.footer.terms}
              </Link>
              <Link href="/about/disclosures" className="transition hover:text-white">
                {dict.footer.disclosures}
              </Link>
              <Link href="/contact" className="transition hover:text-white">
                {dict.footer.contact}
              </Link>
            </div>
          </div>
          <p className="pb-8 text-[0.6875rem] leading-relaxed text-cream-200/35">
            {dict.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
