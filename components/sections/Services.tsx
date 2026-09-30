import { dict, type Locale } from "@/content/i18n";
import { Icon } from "@/components/ui/Icon";

export function Services({ locale }: { locale: Locale }) {
  const { ui, services } = dict[locale];
  return (
    <section className="block" id="hizmetler" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <div><span className="label">{ui.services.eyebrow}</span><h2 className="h2">{locale === "en" ? "From idea to production, delivered end to end." : "Fikirden canlı ortama, uçtan uca teslim ediyorum."}</h2></div>
          <p className="lead" style={{ maxWidth: "40ch", margin: 0 }}>{ui.services.lead}</p>
        </div>
        <div className="cards3">
          {services.map((s, i) => (
            <article className="card rv" key={s.title} style={{ ["--rd" as string]: `${i * 0.1}s` }}>
              <div className="ico"><Icon name={s.icon} size={20} stroke={1.8} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>{s.items.map((x) => <li key={x}>{x}</li>)}</ul>
              {s.foot && <span className="foot">{s.foot}</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
