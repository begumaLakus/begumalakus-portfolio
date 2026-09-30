"use client";

import { useState } from "react";
import { dict, type Locale } from "@/content/i18n";

/** E-posta adresi + kopyala düğmesi. Pano izni yoksa metni seçtirir. */
export function CopyEmail({ locale, className = "mail", buttonClass }: { locale: Locale; className?: string; buttonClass?: string }) {
  const { site, ui } = dict[locale];
  const [label, setLabel] = useState<string>(ui.copyEmail.copy);
  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); setLabel(ui.copyEmail.copied); }
    catch { setLabel(ui.copyEmail.manual); }
    setTimeout(() => setLabel(ui.copyEmail.copy), 1600);
  };
  return (
    <span className={className}>
      <span style={{ userSelect: "all" }}>{site.email}</span>
      <button type="button" className={buttonClass} onClick={copy}>{label}</button>
    </span>
  );
}
