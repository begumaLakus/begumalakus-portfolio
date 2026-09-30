import { dict, type Locale } from "@/content/i18n";
import { Icon } from "@/components/ui/Icon";

export function Skills({ locale }: { locale: Locale }) {
  const { ui, skills } = dict[locale];
  return (
    <section className="block" id="yetenekler" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head rv"><div><span className="label">{ui.skills.eyebrow}</span><h2 className="h2">{ui.skills.heading}</h2></div></div>
        <p className="sk-hint rv"><i />{ui.skills.hint}</p>
        <div className="bento">
          {skills.map((g, i) => (
            <article key={g.title} className={["sk", "rv", g.size, g.dark && "dark"].filter(Boolean).join(" ")} style={{ ["--rd" as string]: `${(i % 3) * 0.08}s` }}>
              <div className="top">
                <div className="ico"><Icon name={g.icon} size={20} stroke={1.8} /></div>
                <div><h3>{g.title}</h3><p className="desc">{g.desc}</p></div>
              </div>
              <div className="chips2">
                {g.items.map(([name, used]) => (
                  <span key={name} className="tech" tabIndex={0} data-used={used.length ? used.join(" · ") : undefined}>{name}</span>
                ))}
              </div>
              {g.note && <p className="note2">{g.note}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
