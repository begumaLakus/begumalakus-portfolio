"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { openChat } from "./events";

type Props = { className?: string; placeholder: string; askLabel: string; chips: [label: string, question: string][] };

/** Açılıştaki soru kutusu: soruyu sohbet paneline iletir. */
export function AskBar({ className = "", placeholder, askLabel, chips }: Props) {
  const [q, setQ] = useState("");
  return (
    <>
      <form className={`ask ${className}`} autoComplete="off" onSubmit={(e) => { e.preventDefault(); if (q.trim()) { openChat(q); setQ(""); } }}>
        <input id="heroQ" type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} aria-label={askLabel} maxLength={500} />
        <button className="send" type="submit" aria-label="Sor"><Icon name="arrowUp" size={17} stroke={2.2} /></button>
      </form>
      <div className="chips">
        {chips.map(([label, question]) => <button key={label} className="chip" type="button" onClick={() => openChat(question)}>{label}</button>)}
      </div>
    </>
  );
}
