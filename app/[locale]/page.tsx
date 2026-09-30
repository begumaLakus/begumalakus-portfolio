import { notFound } from "next/navigation";
import { locales, type Locale } from "@/content/i18n";
import { PearlCursor } from "@/components/effects/PearlCursor";
import { SiteEffects } from "@/components/effects/SiteEffects";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { ProjectDialog } from "@/components/sections/ProjectDialog";
import { Experience } from "@/components/sections/Experience";
import { Events } from "@/components/sections/Events";
import { Skills } from "@/components/sections/Skills";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;

  return (
    <>
      <PearlCursor />
      <SiteEffects />
      <Nav locale={locale} />
      <main>
        <Hero locale={locale} />
        <Marquee locale={locale} />
        <About locale={locale} />
        <Projects locale={locale} />
        <Experience locale={locale} />
        <Events locale={locale} />
        <Skills locale={locale} />
        <Services locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
      <ChatWidget locale={locale} />
      <ProjectDialog locale={locale} />
    </>
  );
}
