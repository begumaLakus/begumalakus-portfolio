"use client";

import { useEffect, useRef, useState } from "react";
import { dict, type Locale } from "@/content/i18n";
import { Phone } from "@/components/phone/Phone";
import { Icon } from "@/components/ui/Icon";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { classify, type Card } from "@/lib/chat/intents";
import { CHAT_OPEN, openProject } from "./events";

type Msg = { id: number; role: "user" | "bot"; text: string; card?: Card; typing?: boolean };

function CardView({ card, locale }: { card: Card; locale: Locale }) {
  const { site, ui, projects, skills, experience } = dict[locale];
  if (card === "projects") return (
    <div className="embed mini-row">
      {projects.map((p) => (
        <button className="mini" type="button" key={p.id} onClick={() => openProject(p.id)}>
          <div className="stage-s"><Phone screen={p.id} scale={0.29} uid={`chat-${p.id}`} locale={locale} /></div>
          <b>{p.title}</b>
        </button>
      ))}
    </div>
  );
  if (card === "skills") return (
    <div className="embed card-embed" style={{ display: "grid", gap: 12 }}>
      {skills.map((g) => (
        <div key={g.title}>
          <div className="label" style={{ marginBottom: 6 }}>{g.title}</div>
          <div className="tags">{g.items.map(([n]) => <span className="tag" key={n}>{n}</span>)}</div>
        </div>
      ))}
    </div>
  );
  if (card === "experience") return (
    <div className="embed card-embed">
      <dl className="kv">{experience.map((e) => <div key={e.org} style={{ display: "contents" }}><dt>{e.when}</dt><dd><b>{e.org}</b></dd></div>)}</dl>
    </div>
  );
  return (
    <div className="embed card-embed">
      <dl className="kv">
        <dt>{ui.chat.emailLabel}</dt><dd><CopyEmail locale={locale} className="" buttonClass="mini-btn" /></dd>
        <dt>{ui.chat.linkedinLabel}</dt><dd><a href={site.links.linkedin} target="_blank" rel="noopener">begumalakus</a></dd>
        <dt>{ui.chat.githubLabel}</dt><dd><a href={site.links.github} target="_blank" rel="noopener">begumaLakus</a></dd>
      </dl>
    </div>
  );
}

export function ChatWidget({ locale }: { locale: Locale }) {
  const { ui } = dict[locale];
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, role: "bot", text: ui.chat.opening }]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  const ask = (question: string) => {
    const text = question.trim();
    if (!text || busy) return;
    setOpen(true); setBusy(true);
    const intent = classify(text, locale);
    const uid = nextId.current++, bid = nextId.current++;
    setMsgs((m) => [...m, { id: uid, role: "user", text }, { id: bid, role: "bot", text: "", typing: true }]);

    // Cevabı kelime kelime yaz
    const words = intent.answer.split(/(\s+)/);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = reduce ? words.length : 0;
    const step = () => {
      i = Math.min(words.length, i + 2);
      const done = i >= words.length;
      setMsgs((m) => m.map((x) => x.id === bid ? { ...x, text: words.slice(0, i).join(""), typing: !done, card: done ? intent.card : undefined } : x));
      if (done) { setBusy(false); inputRef.current?.focus(); } else setTimeout(step, 22);
    };
    setTimeout(step, reduce ? 0 : 420);
  };

  useEffect(() => {
    const onOpen = (e: Event) => {
      const question = (e as CustomEvent<string | undefined>).detail;
      setOpen(true);
      if (question) ask(question); else setTimeout(() => inputRef.current?.focus(), 350);
    };
    addEventListener(CHAT_OPEN, onOpen);
    return () => removeEventListener(CHAT_OPEN, onOpen);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [msgs]);

  return (
    <>
      <button className={`fab${open ? " hide" : ""}`} type="button" aria-controls="drawer" onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 350); }}>
        <span className="me" aria-hidden="true">B</span>{ui.chat.fab}
      </button>
      <aside className={`drawer${open ? " open" : ""}`} id="drawer" aria-label={ui.chat.drawerLabel} aria-hidden={!open}>
        <div className="d-head">
          <div className="me" aria-hidden="true">B</div>
          <div><div className="t">{ui.chat.drawerLabel}</div><div className="s"><i />{ui.chat.subtitle}</div></div>
          <button className="x" type="button" aria-label={ui.chat.close} onClick={() => setOpen(false)}><Icon name="close" size={14} stroke={2.2} /></button>
        </div>
        <div className="log" ref={logRef}>
          {msgs.map((m) => m.role === "user"
            ? <div className="msg-u" key={m.id}>{m.text}</div>
            : (
              <div className="msg-b" key={m.id}>
                <div className="me" aria-hidden="true">B</div>
                <div className="bubble" aria-live="polite">
                  {m.typing && !m.text ? <span className="thinking"><i /><i /><i /></span> : <p>{m.text}</p>}
                  {m.card && <CardView card={m.card} locale={locale} />}
                </div>
              </div>
            ))}
        </div>
        <div className="d-foot">
          <div className="chips">{ui.chat.quick.map(([label, question]) => <button key={label} className="chip" type="button" onClick={() => ask(question)}>{label}</button>)}</div>
          <form className="ask" autoComplete="off" onSubmit={(e) => { e.preventDefault(); ask(q); setQ(""); }}>
            <input ref={inputRef} id="chatQ" type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder={ui.chat.inputPlaceholder} aria-label={ui.chat.inputLabel} maxLength={500} />
            <button className="send" type="submit" aria-label={ui.chat.send} disabled={busy}><Icon name="arrowUp" size={17} stroke={2.2} /></button>
          </form>
        </div>
      </aside>
    </>
  );
}
