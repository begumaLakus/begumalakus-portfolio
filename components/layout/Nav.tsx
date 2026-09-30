"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { dict, type Locale } from "@/content/i18n";
import { Icon } from "@/components/ui/Icon";
import { openChat } from "@/components/chat/events";
import { CvButton } from "./CvButton";

export function Nav({ locale }: { locale: Locale }) {
  const { nav, site, ui } = dict[locale];
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setSolid(scrollY > 20);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }), { rootMargin: "-40% 0px -55% 0px" });
    ["giris", ...nav.map((n) => n.href.slice(1)), "iletisim"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); };
  }, [nav]);

  return (
    <>
      <header className={`nav${solid ? " solid" : ""}`}>
        <div className="wrap">
          <div className="lang-switch" aria-label={ui.langSwitch.label}>
            <Link href="/" aria-current={locale === "tr" ? "true" : undefined}>{ui.langSwitch.tr}</Link>
            <Link href="/en" aria-current={locale === "en" ? "true" : undefined}>{ui.langSwitch.en}</Link>
          </div>
          <nav className="links" aria-label={ui.nav.sectionsLabel}>
            {nav.map((n) => <a key={n.href} href={n.href} aria-current={active === n.href ? "true" : undefined}>{n.label}</a>)}
          </nav>
          <div className="nav-r">
            <CvButton locale={locale} />
            <a className="btn dark sm" href="#iletisim">{ui.nav.contact}</a>
            <button className="menu-btn" type="button" aria-expanded={menu} aria-controls="mMenu" aria-label={ui.nav.menuOpen} onClick={() => setMenu((m) => !m)}>
              <Icon name="menu" size={18} />
            </button>
          </div>
        </div>
      </header>
      <div className="m-menu" id="mMenu" hidden={!menu} onClick={(e) => { if ((e.target as HTMLElement).closest("a, button")) setMenu(false); }}>
        {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        <a href="#iletisim">{ui.nav.contactLabel}</a>
        <a href={site.cv.tr} download>{ui.cv.mobileTr}</a>
        <a href={site.cv.en} download>{ui.cv.mobileEn}</a>
        <div className="m-lang">
          <Link href="/" aria-current={locale === "tr" ? "true" : undefined}>{ui.langSwitch.tr}</Link>
          <Link href="/en" aria-current={locale === "en" ? "true" : undefined}>{ui.langSwitch.en}</Link>
        </div>
        <button type="button" onClick={() => openChat()}>{ui.chat.fab}</button>
      </div>
    </>
  );
}
