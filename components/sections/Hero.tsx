import { dict, type Locale } from "@/content/i18n";
import { Phone } from "@/components/phone/Phone";
import { Icon } from "@/components/ui/Icon";
import { Typer } from "./Typer";
import { AskBar } from "@/components/chat/AskBar";

export function Hero({ locale }: { locale: Locale }) {
  const { site, ui } = dict[locale];
  return (
    <section className="hero" id="giris">
      <div className="wrap">
        <div className="hero-phone l float"><Phone screen="pixel" scale={0.72} uid="hero-l" locale={locale} /></div>
        <div className="hero-phone r float d2"><Phone screen="ownway" scale={0.72} uid="hero-r" locale={locale} /></div>
        <div className="me" aria-hidden="true">B</div>
        <div className="hello">{ui.hero.hello}</div>
        <h1 className="title"><b>Mobile Developer</b><br />&amp; AI Integration</h1>
        <Typer lines={[...site.terminal]} />
        <div className="hero-ctas">
          <a className="btn dark" href="#projeler">{ui.hero.ctaProjects} <Icon name="arrowDown" size={14} stroke={2.2} /></a>
          <a className="btn ghost" href="#iletisim">{ui.hero.ctaContact}</a>
        </div>
        <AskBar className="hero-ask" placeholder={ui.hero.askPlaceholder} askLabel={ui.hero.askLabel} chips={ui.hero.chips as [string, string][]} />
      </div>
    </section>
  );
}
