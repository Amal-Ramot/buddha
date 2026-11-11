"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Item } from "@/data/dharma";
import { hueStyle, pad } from "@/lib";

/** Items laid out on a wheel; pick a spoke to read it. */
export default function RingExplorer({ items, hue, label }: { items: Item[]; hue: number; label: string }) {
  const [i, setI] = useState(0);
  const n = items.length;
  const pts = items.map((_, k) => {
    const a = (k / n) * Math.PI * 2 - Math.PI / 2;
    return { x: +(50 + 41 * Math.cos(a)).toFixed(3), y: +(50 + 41 * Math.sin(a)).toFixed(3) };
  });
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const item = items[i];

  return (
    <div
      style={hueStyle(hue)}
      className="hue grid items-center gap-8 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-14"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(1);
        if (e.key === "ArrowRight") go(-1);
      }}
    >
      <div className="relative mx-auto aspect-square w-full max-w-[26rem]" role="group" aria-label={label}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full text-accent" fill="none" aria-hidden="true">
          <circle cx="50" cy="50" r="48.5" stroke="currentColor" strokeWidth="0.2" strokeDasharray="0.6 2.2" className="spin-slow" />
          <circle cx="50" cy="50" r="41" stroke="var(--line)" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="21" stroke="var(--line)" strokeWidth="0.5" />
          {pts.map((p, k) => (
            <line
              key={k}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke={k === i ? "currentColor" : "var(--line)"}
              strokeWidth={k === i ? 0.7 : 0.4}
              style={{ transition: "stroke .4s" }}
            />
          ))}
          <motion.circle
            r="7.5"
            fill="currentColor"
            fillOpacity="0.18"
            initial={false}
            animate={{ cx: pts[i].x, cy: pts[i].y }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
          />
          <circle cx="50" cy="50" r="21" fill="var(--bg)" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.4" />
        </svg>

        <div className="absolute inset-0 grid place-items-center text-center" aria-hidden="true">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-display text-5xl leading-none font-bold text-accent sm:text-6xl">{pad(i + 1)}</div>
              <div className="mt-1 text-xs text-muted">מתוך {n}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {pts.map((p, k) => (
          <button
            key={k}
            type="button"
            onClick={() => setI(k)}
            aria-pressed={k === i}
            aria-label={`${k + 1}. ${items[k].name}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            className={`absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-sm font-semibold transition-all duration-300 sm:size-11 ${
              k === i
                ? "scale-110 border-accent bg-accent text-bg shadow-[0_0_2rem_var(--accent)]"
                : "border-line bg-bg2 text-muted hover:border-accent hover:text-ink"
            }`}
          >
            {k + 1}
          </button>
        ))}
      </div>

      <div className="flex min-h-[15rem] flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            aria-live="polite"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {item.term && <p className="term text-lg text-accent">{item.term}</p>}
            <h3 className="font-display mt-1 text-4xl leading-tight font-bold sm:text-5xl">{item.name}</h3>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{item.text}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex gap-2">
          <button type="button" onClick={() => go(-1)} className="btn" aria-label="הקודם">
            <span aria-hidden="true">→</span> הקודם
          </button>
          <button type="button" onClick={() => go(1)} className="btn" aria-label="הבא">
            הבא <span aria-hidden="true">←</span>
          </button>
        </div>
      </div>
    </div>
  );
}
