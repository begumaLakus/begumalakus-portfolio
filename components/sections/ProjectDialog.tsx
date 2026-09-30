"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/tr/projects";
import { dict, type Locale } from "@/content/i18n";
import { Phone } from "@/components/phone/Phone";
import { Icon } from "@/components/ui/Icon";
import { PROJECT_OPEN } from "@/components/chat/events";

/** Proje detay penceresi; sayfanın her yerinden `openProject(id)` ile açılır. */
export function ProjectDialog({ locale }: { locale: Locale }) {
  const { ui, projects } = dict[locale];
  const ref = useRef<HTMLDialogElement>(null);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const p = projects.find((x) => x.id === (e as CustomEvent<string>).detail);
      if (p) { setProject(p); ref.current?.showModal(); }
    };
    addEventListener(PROJECT_OPEN, onOpen);
    return () => removeEventListener(PROJECT_OPEN, onOpen);
  }, [projects]);

  return (
    <dialog ref={ref} aria-label={ui.projectDialog.label} onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }}>
      {project && (
        <div className="sheet">
          <button className="x" type="button" aria-label={ui.projectDialog.close} onClick={() => ref.current?.close()}><Icon name="close" size={14} stroke={2.2} /></button>
          <div className="st"><div className="float"><Phone screen={project.id} scale={0.92} uid={`dlg-${project.id}`} locale={locale} /></div></div>
          <div className="sc">
            <span className="label">{project.kind}</span>
            <h3>{project.title}</h3>
            <p className="one">{project.summary}</p>
            <h4>{ui.projectDialog.whatIDid}</h4>
            <ul>{project.points.map((x) => <li key={x}>{x}</li>)}</ul>
            <h4>{ui.projectDialog.tech}</h4>
            <div className="tags">{project.stack.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
            {project.repo && <p style={{ marginTop: 24 }}><a className="btn ghost sm" href={project.repo} target="_blank" rel="noopener">{ui.projectDialog.repo}</a></p>}
          </div>
        </div>
      )}
    </dialog>
  );
}
