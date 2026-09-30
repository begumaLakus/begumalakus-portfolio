"use client";

import { useEffect, useState } from "react";

/** Terminal satırında komutları yazıp silen küçük efekt. */
export function Typer({ lines }: { lines: string[] }) {
  const [text, setText] = useState(lines[0]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let li = 0, ci = 0, del = false, timer = 0;
    const step = () => {
      const l = lines[li];
      if (!del) {
        setText(l.slice(0, ++ci));
        if (ci === l.length) { del = true; timer = window.setTimeout(step, 1600); return; }
      } else {
        setText(l.slice(0, --ci));
        if (ci === 0) { del = false; li = (li + 1) % lines.length; }
      }
      timer = window.setTimeout(step, del ? 28 : 62);
    };
    timer = window.setTimeout(step, 400);
    return () => clearTimeout(timer);
  }, [lines]);

  return (
    <div className="typer" aria-label="Terminal">
      <span className="p">~/begum $</span><span>{text}</span><span className="cur" />
    </div>
  );
}
