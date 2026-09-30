"use client";

import { useEffect, useRef, useState } from "react";
import { dict, type Locale } from "@/content/i18n";
import { Phone } from "@/components/phone/Phone";
import { Icon } from "@/components/ui/Icon";
import { openProject } from "@/components/chat/events";

/** Kaydırdıkça yandaki telefonun ekranı projeden projeye geçer. */
export function Projects({ locale }: { locale: Locale }) {
  const { ui, projects } = dict[locale];
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
    }), { rootMargin: "-45% 0px -45% 0px" });
    steps.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => steps.current[i]?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });

  return (
    <section className="block" id="projeler" style={{ paddingBottom: 40 }}>
      <div className="wrap">
        <div className="sec-head rv">
          <div><span className="label">{ui.projects.eyebrow}</span><h2 className="h2">{locale === "en" ? <>Every project, <b>its own screen.</b></> : <>Her proje, <b>kendi ekranında.</b></>}</h2></div>
          <p className="lead" style={{ maxWidth: "36ch", margin: 0 }}>{ui.projects.lead}</p>
        </div>
        <div className="show">
          <div className="steps">
            {projects.map((p, i) => (
              <article key={p.id} className={`step${active === i ? " on" : ""}`} data-i={i} ref={(el) => { steps.current[i] = el; }}>
                <span className="label kind"><i />{p.kind}</span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <ul>{p.points.slice(0, 3).map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="tags">{p.stack.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
                <button className="btn ghost sm more" type="button" onClick={() => openProject(p.id)}>{ui.projects.detail} <Icon name="arrowRight" size={14} stroke={2.2} /></button>
                <div className="inline-phone"><Phone screen={p.id} scale={0.82} uid={`inline-${p.id}`} locale={locale} /></div>
              </article>
            ))}
          </div>
          <div className="stick" aria-hidden="true">
            <div className="stick-bg" />
            <div className="holder float" style={{ transform: `rotate(${active % 2 ? 4 : -4}deg)` }}>
              <div className="stack-screens">
                {projects.map((p, i) => <Phone key={p.id} screen={p.id} scale={0.92} uid={`stack-${p.id}`} className={active === i ? "on" : ""} locale={locale} />)}
              </div>
            </div>
            <div className="dots">
              {projects.map((p, i) => <button key={p.id} type="button" aria-label={p.title} className={active === i ? "on" : ""} onClick={() => go(i)} tabIndex={-1} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
