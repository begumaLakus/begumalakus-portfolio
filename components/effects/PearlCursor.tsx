"use client";

import { useEffect, useRef } from "react";

type Pearl = { x: number; y: number; r: number; vx: number; vy: number; t: number; life: number; dark: boolean };

/** İmleci izleyen inciler + arkada yumuşak pudra ışığı. Dokunmatikte ve "azaltılmış hareket"te kapalı. */
export function PearlCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current!, glow = glowRef.current!;
    const ctx = cvs.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0;
    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cvs.width = W * d; cvs.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    size();

    const pearls: Pearl[] = [];
    let last: { x: number; y: number } | null = null;
    let gx = innerWidth / 2, gy = innerHeight / 3, tx = gx, ty = gy;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (reduce || e.pointerType === "touch") return;
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 26) return;
      last = { x: e.clientX, y: e.clientY };
      pearls.push({ x: e.clientX + (Math.random() - 0.5) * 18, y: e.clientY + (Math.random() - 0.5) * 18, r: 3.5 + Math.random() * 7,
        vx: (Math.random() - 0.5) * 0.35, vy: -0.15 - Math.random() * 0.35, t: 0, life: 90 + Math.random() * 60,
        // Koyu bölümlerin üstünde inci daha parlak görünsün
        dark: !!(e.target as Element | null)?.closest?.(".events, .contact, .sk.dark") });
      if (pearls.length > 60) pearls.shift();
    };

    const draw = (p: Pearl) => {
      const k = p.t / p.life, a = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85, r = p.r * (k < 0.15 ? 0.6 + (k / 0.15) * 0.4 : 1);
      const under = p.dark;
      ctx.globalAlpha = Math.max(0, a);
      ctx.fillStyle = under ? "rgba(255,240,230,.10)" : "rgba(169,135,111,.14)";
      ctx.beginPath(); ctx.arc(p.x + r * 0.15, p.y + r * 0.35, r * 1.05, 0, 7); ctx.fill();
      const g = ctx.createRadialGradient(p.x - r * 0.35, p.y - r * 0.4, r * 0.05, p.x, p.y, r);
      g.addColorStop(0, "#FFFFFF"); g.addColorStop(0.35, "#FBF4EF"); g.addColorStop(0.7, under ? "#F1E6DE" : "#EBDDD3");
      g.addColorStop(0.92, under ? "#EADFE6" : "#E2D6DE"); g.addColorStop(1, under ? "#E4D4C8" : "#D8C6B9");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.95)"; ctx.beginPath(); ctx.ellipse(p.x - r * 0.38, p.y - r * 0.42, r * 0.22, r * 0.14, -0.6, 0, 7); ctx.fill();
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = pearls.length - 1; i >= 0; i--) {
        const p = pearls[i]; p.t++; p.x += p.vx; p.y += p.vy;
        if (p.t >= p.life) pearls.splice(i, 1); else draw(p);
      }
      gx += (tx - gx) * 0.06; gy += (ty - gy) * 0.06;
      glow.style.transform = `translate(${gx}px, ${gy}px)`;
      raf = requestAnimationFrame(tick);
    };

    addEventListener("resize", size);
    addEventListener("pointermove", onMove, { passive: true });
    if (!reduce) raf = requestAnimationFrame(tick); else glow.style.transform = `translate(${gx}px, ${gy}px)`;
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <>
      <canvas id="pearls" ref={canvasRef} aria-hidden="true" />
      <div id="glow" ref={glowRef} aria-hidden="true" />
    </>
  );
}
