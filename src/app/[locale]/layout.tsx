import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Noto_Sans_Georgian } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { content } from "@/content";
import { locales, isLocale, localeNames, type Locale } from "@/i18n/config";
import { findLogoFile, findLogoLightFile } from "@/lib/logo";

const geo = Noto_Sans_Georgian({
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-geo",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = isLocale(locale) ? locale : "ka";
  const { site } = content(l);
  const logo = findLogoFile();

  return {
    metadataBase: new URL(site.url),
    icons: {
      icon: logo ?? "/icon.svg",
      shortcut: logo ?? "/icon.svg",
      apple: logo ?? "/icon.svg",
    },
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s · ${site.name}`,
    },
    description: site.description,
    keywords:
      l === "ka"
        ? [
            "დედა-ნაყოფის მედიცინა",
            "პერინატოლოგია",
            "მაღალი რისკის ორსულობა",
            "კლინიკური გაიდლაინები",
            "MFM საქართველო",
          ]
        : [
            "maternal-fetal medicine",
            "perinatology",
            "high-risk pregnancy",
            "clinical guidelines",
            "MFM Georgia",
          ],
    authors: [{ name: site.nameFull }],
    alternates: {
      canonical: `/${l}`,
      languages: { ka: "/ka", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: l === "ka" ? "ka_GE" : "en_GB",
      url: `${site.url}/${l}`,
      siteName: site.name,
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      images: [{ url: logo ?? "/icon.svg", width: 512, height: 512, alt: site.nameFull }],
    },
    twitter: {
      card: "summary_large_image",
      images: [logo ?? "/icon.svg"],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#faf9f5",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const logoSrc = findLogoFile();
  const logoLightSrc = findLogoLightFile();

  return (
    <html lang={localeNames[locale].html} className={geo.variable}>
      <body className="min-h-screen antialiased">
        <Header locale={locale} logoSrc={logoSrc} />
        <main id="main">{children}</main>
        <Footer locale={locale} logoSrc={logoLightSrc} />
        <BackToTop locale={locale} />
      </body>
    </html>
  );
}
