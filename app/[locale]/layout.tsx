import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { dict, locales, type Locale } from "@/content/i18n";

import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/nav.css";
import "@/styles/hero.css";
import "@/styles/marquee.css";
import "@/styles/phone.css";
import "@/styles/about.css";
import "@/styles/projects.css";
import "@/styles/experience.css";
import "@/styles/events.css";
import "@/styles/skills.css";
import "@/styles/contact.css";
import "@/styles/chat.css";
import "@/styles/dialog.css";
import "@/styles/motion.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin", "latin-ext"], weight: ["200", "300", "400", "500", "600", "700"], variable: "--font-jakarta" });
const mono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--font-mono" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const { site } = dict[locale as Locale];
  const isEn = locale === "en";
  return {
    metadataBase: new URL(site.url),
    title: `${site.name} · ${site.title}`,
    description: site.description,
    alternates: {
      canonical: isEn ? "/en" : "/",
      languages: { tr: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      title: `${site.name} · ${site.title}`,
      description: site.tagline,
      url: isEn ? "/en" : "/",
      siteName: site.name,
    },
    twitter: { card: "summary_large_image", title: `${site.name} · ${site.title}`, description: site.tagline },
  };
}

export const viewport: Viewport = { themeColor: "#FAF8F6", viewportFit: "cover" };

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return (
    <html lang={locale} className={`${jakarta.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
