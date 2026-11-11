"use client";

import { useEffect, useRef } from "react";

/** Slow drifting motes of light, like dust in a temple sunbeam. */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    type Mote = { x: number; y: number; r: number; v: number; p: number; hue: number };
    let motes: Mote[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.round((w * h) / 12000));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.8,
        v: 0.05 + Math.random() * 0.22,
        p: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.8 ? 78 : 32,
      }));
    };

    const draw = (t: number) => {
      const light = document.documentElement.dataset.theme === "light";
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        if (!still) {
          m.y -= m.v;
          m.x += Math.sin(t / 2400 + m.p) * 0.12;
          if (m.y < -4) {
            m.y = h + 4;
            m.x = Math.random() * w;
          }
        }
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t / 1300 + m.p));
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(${light ? 0.55 : 0.85} 0.14 ${m.hue} / ${a})`;
        ctx.fill();
      }
      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    const ro = new ResizeObserver(() => {
      resize();
      if (still) draw(0);
    });
    ro.observe(canvas);
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 size-full" />;
}
