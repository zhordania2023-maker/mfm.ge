import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

/**
 * (Next 16-ის „proxy" კონვენცია)
 * პრეფიქსის გარეშე შემოსული მისამართი გადამისამართდება ენის ვერსიაზე.
 * არჩევანი მოწმდება ჯერ cookie-ში, შემდეგ Accept-Language სათაურში.
 */
export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const cookieLocale = request.cookies.get("lang")?.value;
  const headerLocale = request.headers
    .get("accept-language")
    ?.split(",")[0]
    ?.trim()
    .slice(0, 2)
    .toLowerCase();

  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : isLocale(headerLocale)
      ? headerLocale
      : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // ყველაფერი, გარდა API-ს, სტატიკური ფაილებისა და სპეციალური მარშრუტებისა
    "/((?!api|_next/static|_next/image|favicon.ico|img|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
