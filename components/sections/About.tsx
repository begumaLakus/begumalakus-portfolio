import Image from "next/image";
import { dict, type Locale } from "@/content/i18n";
import { BrandIcon } from "@/components/ui/BrandIcon";

export function About({ locale }: { locale: Locale }) {
  const { site, ui, projects, experience, volunteer, skillCount } = dict[locale];
  const communityCount = experience.filter((e) => e.org.startsWith("GDG")).length + volunteer.length;
  const counts: [number, string, string][] = [
    [projects.length, "", ui.about.countLabels.projects],
    [2, "", ui.about.countLabels.internships],
    [communityCount, "", ui.about.countLabels.community],
    [skillCount, "", ui.about.countLabels.skills],
  ];
  const numberLocale = locale === "en" ? "en-US" : "tr-TR";

  return (
    <section className="block" id="hakkimda">
      <div className="wrap">
        <div className="about">
          <div className="rv">
            <span className="label">{ui.about.eyebrow}</span>
            <h2 className="h2">{site.tagline}</h2>
            {ui.about.paragraphs.map((p, i) => (
              <p className="lead" key={i}>{p}</p>
            ))}
          </div>
          <div className="portrait-col">
            <div className="portrait rv" style={{ ["--rd" as string]: ".12s" }}>
              {site.openToWork && <span className="badge"><i />{ui.about.openToWork}</span>}
              <Image src="/images/portrait-circle.png" alt={ui.about.portraitAlt} fill sizes="(max-width: 860px) 100vw, 40vw" priority={false} />
              <div className="cap"><span className="label">{site.name}</span><span className="label">{site.location}</span></div>
            </div>
            <div className="portrait-links rv" style={{ ["--rd" as string]: ".2s" }}>
              <a href={site.links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><BrandIcon name="linkedin" /></a>
              <a href={site.links.github} target="_blank" rel="noopener" aria-label="GitHub"><BrandIcon name="github" /></a>
              <a href={site.links.instagram} target="_blank" rel="noopener" aria-label="Instagram"><BrandIcon name="instagram" /></a>
            </div>
          </div>
        </div>
        <div className="counts">
          {counts.map(([n, suf, text], i) => (
            <div className="rv" key={text} style={{ ["--rd" as string]: `${i * 0.08}s` }}>
              <b data-count={n} data-suf={suf}>{n.toLocaleString(numberLocale)}{suf}</b><span>{text}</span>
            </div>
          ))}
        </div>
        <div className="life rv">
          <span className="label" style={{ alignSelf: "center", marginRight: 6 }}>{ui.about.codeElse}</span>
          {site.hobbies.map((h) => <span key={h}>{h}</span>)}
        </div>
      </div>
    </section>
  );
}
