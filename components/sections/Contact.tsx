import { dict, type Locale } from "@/content/i18n";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { ContactForm } from "./ContactForm";

export function Contact({ locale }: { locale: Locale }) {
  const { ui } = dict[locale];
  return (
    <section className="block" id="iletisim" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="wrap">
        <div className="contact rv">
          <div className="grid">
            <div className="intro">
              <span className="label">{ui.contact.eyebrow}</span>
              <h2>{locale === "en" ? <>Let&apos;s build the next thing <b>together.</b></> : <>Bir sonraki ürünü <b>birlikte</b> yapalım.</>}</h2>
              <p>{ui.contact.lead}</p>
              <div className="row">
                <CopyEmail locale={locale} />
              </div>
            </div>
            <ContactForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
