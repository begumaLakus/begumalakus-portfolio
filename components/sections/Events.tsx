"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { dict, type Locale } from "@/content/i18n";
import { Icon } from "@/components/ui/Icon";

const ROT = [-3, 2.2, -1.4, 3, -2.4, 1.6, -2, 2.8, -1, 1.8, -2.6, 1.2, 2.4, -1.8];

/** Koyu zeminde kendi kendine akan polaroidler. Fareyle sürüklenir, dokunmatikte kaydırılır, oklarla ilerler. */
export function Events({ locale }: { locale: Locale }) {
  const { ui, events } = dict[locale];
  const boxRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const holdUntil = useRef(0);

  useEffect(() => {
    const box = boxRef.current!, track = trackRef.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pos = 0, hover = false, raf = 0, lastT = performance.now();
    let drag: { x: number; start: number } | null = null;
    const half = () => track.scrollWidth / 2;
    const hold = (ms: number) => { holdUntil.current = performance.now() + ms; };

    const loop = (t: number) => {
      const dt = Math.min(64, t - lastT); lastT = t;
      if (!reduce && !hover && !drag && t > holdUntil.current) pos += dt * 0.035; else pos = box.scrollLeft;
      const h = half();
      if (pos >= h) pos -= h; else if (pos < 0) pos += h;
      if (Math.abs(box.scrollLeft - pos) > 0.5 && !drag && t > holdUntil.current) box.scrollLeft = pos;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onScroll = () => {
      const h = half();
      if (box.scrollLeft >= h) box.scrollLeft -= h; else if (box.scrollLeft <= 0 && h) box.scrollLeft += h;
      if (Math.abs(box.scrollLeft - pos) > 2) { pos = box.scrollLeft; hold(2500); }
    };
    const onEnter = () => { hover = true; }, onLeave = () => { hover = false; };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      drag = { x: e.clientX, start: box.scrollLeft }; box.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) box.classList.add("drag");
      box.scrollLeft = drag.start - dx;
    };
    const onUp = () => { if (!drag) return; drag = null; box.classList.remove("drag"); pos = box.scrollLeft; hold(1800); };

    box.addEventListener("scroll", onScroll, { passive: true });
    box.addEventListener("mouseenter", onEnter); box.addEventListener("mouseleave", onLeave);
    box.addEventListener("pointerdown", onDown); box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerup", onUp); box.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(raf);
      box.removeEventListener("scroll", onScroll);
      box.removeEventListener("mouseenter", onEnter); box.removeEventListener("mouseleave", onLeave);
      box.removeEventListener("pointerdown", onDown); box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerup", onUp); box.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const step = (dir: number) => {
    const box = boxRef.current!;
    holdUntil.current = performance.now() + 3000;
    box.scrollBy({ left: dir * Math.min(box.clientWidth * 0.6, 560), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  // Sonsuz döngü için liste iki kez basılır; ikinci kopya ekran okuyuculardan gizlenir.
  const cards = [...events, ...events];

  return (
    <section className="block" id="etkinlikler" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="events rv">
          <div className="head">
            <div><span className="label">{ui.events.eyebrow}</span><h2>{locale === "en" ? <>On stage, behind the <b>scenes.</b></> : <>Sahnede, sahne <b>arkasında.</b></>}</h2></div>
            <p>{ui.events.lead}</p>
          </div>
          <div className="reel" ref={boxRef} tabIndex={0} aria-label={ui.events.dragHint}>
            <div className="track" ref={trackRef}>
              {cards.map((ev, i) => (
                <figure className="polaroid" key={i} style={{ ["--r" as string]: `${ROT[i % events.length % ROT.length]}deg` }} aria-hidden={i >= events.length || undefined}>
                  <div className="photo"><Image src={ev.src} alt={`${ev.title} · ${ev.community}`} fill sizes="250px" draggable={false} /></div>
                  <figcaption>
                    <span className="d">{ev.date}</span>
                    <span className="e">{ev.title}</span>
                    <span className="c">{ev.community}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="reel-nav">
            <button type="button" aria-label={ui.events.prev} onClick={() => step(-1)}><Icon name="chevronLeft" /></button>
            <button type="button" aria-label={ui.events.next} onClick={() => step(1)}><Icon name="chevronRight" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
