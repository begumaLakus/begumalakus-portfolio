"use client";

import { useEffect, useRef } from "react";

/**
 * Sayfa geneli kaydırma efektleri:
 * - üstteki ilerleme çubuğu
 * - `.rv` öğelerinin görününce belirmesi (yalnızca ilk ekranın dışındakiler gizlenir)
 * - `[data-count]` sayaçlarının artması
 * - zaman çizgisinin (`[data-tl]`) kaydırdıkça dolması
 */
export function SiteEffects() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observers: IntersectionObserver[] = [];

    if (!reduce) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.remove("pre"); io.unobserve(e.target); }
      }), { rootMargin: "0px 0px -8% 0px" });
      document.querySelectorAll(".rv").forEach((el) => {
        if (el.getBoundingClientRect().top > innerHeight) { el.classList.add("pre"); io.observe(el); }
      });
      observers.push(io);

      const cio = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement; cio.unobserve(el);
        const n = Number(el.dataset.count), suf = el.dataset.suf ?? "", t0 = performance.now();
        const numLocale = document.documentElement.lang || "tr";
        const f = (t: number) => {
          const k = Math.min(1, (t - t0) / 1400), val = Math.round(n * (1 - Math.pow(1 - k, 3)));
          el.textContent = val.toLocaleString(numLocale) + suf;
          if (k < 1) requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
      }), { threshold: 0.6 });
      document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));
      observers.push(cio);
    }

    const tl = document.querySelector<HTMLElement>("[data-tl]");
    const fill = tl?.querySelector<HTMLElement>(".fill");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (tl && fill) {
        const r = tl.getBoundingClientRect(), k = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
        fill.style.height = `calc((100% - 16px) * ${k})`;
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { observers.forEach((o) => o.disconnect()); removeEventListener("scroll", onScroll); };
  }, []);

  return <div id="progress" ref={barRef} aria-hidden="true" />;
}
