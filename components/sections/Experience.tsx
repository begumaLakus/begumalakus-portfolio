import Image from "next/image";
import { dict, type Locale } from "@/content/i18n";

export function Experience({ locale }: { locale: Locale }) {
  const { ui, experience, volunteer } = dict[locale];
  return (
    <section className="block" id="deneyim">
      <div className="wrap">
        <div className="sec-head rv"><div><span className="label">{ui.experience.eyebrow}</span><h2 className="h2">{locale === "en" ? "Experience & education" : "Deneyim ve eğitim"}</h2></div></div>
        <div className="tl" data-tl>
          <span className="fill" />
          {experience.map((e) => (
            <div className="t-item rv" key={e.org + e.when}>
              <span className="when">{e.when}</span>
              <div>
                <h3>{e.org}</h3>
                <div className="role">{e.role}</div>
                <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>

        <div className="vol rv">
          <span className="label">{ui.experience.volunteering}</span>
          <div className="vol-list">
            {volunteer.map((v) => (
              <article className="vol-item" key={v.org}>
                <div className="vol-head">
                  <span className={`vol-logo${v.logoFit === "cover" ? "" : " pad"}`}>
                    <Image src={v.logo} alt={locale === "en" ? `${v.org} logo` : `${v.org} logosu`} width={64} height={64} style={{ objectFit: v.logoFit ?? "contain" }} />
                  </span>
                  <span className="when">{v.when}</span>
                </div>
                <h3>{v.role}</h3>
                <span className="org">{v.org}</span>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
