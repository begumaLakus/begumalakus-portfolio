import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/content/i18n";

// Türkçe varsayılan dil ve URL'de önek almıyor ("/"), İngilizce "/en" altında yaşıyor.
// "/" bir ziyaretçi için hep Türkçe görünür; app/[locale] içindeki route'lara iç yönlendirme yapılır.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next|images|cv|favicon.ico|robots.txt|sitemap.xml).*)"],
};
