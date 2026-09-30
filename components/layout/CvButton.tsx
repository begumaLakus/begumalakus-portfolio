"use client";

import { useEffect, useRef, useState } from "react";
import { dict, type Locale } from "@/content/i18n";
import { Icon } from "@/components/ui/Icon";

/** Nav'daki "CV indir" düğmesi: tıklayınca TR/EN seçimi açılan küçük bir menü. */
export function CvButton({ locale, className = "btn ghost sm" }: { locale: Locale; className?: string }) {
  const { site, ui } = dict[locale];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div className="cv-menu" ref={ref}>
      <button type="button" className={className} aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Icon name="download" size={14} stroke={2.2} />{ui.cv.button}
      </button>
      {open && (
        <div className="cv-menu-pop" role="menu">
          <a role="menuitem" href={site.cv.tr} download onClick={() => setOpen(false)}>{ui.cv.tr} <span>{ui.cv.pdf}</span></a>
          <a role="menuitem" href={site.cv.en} download onClick={() => setOpen(false)}>{ui.cv.en} <span>{ui.cv.pdf}</span></a>
        </div>
      )}
    </div>
  );
}
