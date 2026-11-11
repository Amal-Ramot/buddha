"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

type Phase = { label: string; secs: number; scale: number };
type Pattern = { id: string; name: string; note: string; phases: Phase[] };

const patterns: Pattern[] = [
  {
    id: "natural",
    name: "נשימה שקטה",
    note: "5 · 5 — קצב רגוע ושווה, מתאים להתחלה.",
    phases: [
      { label: "שאיפה", secs: 5, scale: 1 },
      { label: "נשיפה", secs: 5, scale: 0.55 },
    ],
  },
  {
    id: "box",
    name: "נשימת ריבוע",
    note: "4 · 4 · 4 · 4 — מייצבת וממקדת.",
    phases: [
      { label: "שאיפה", secs: 4, scale: 1 },
      { label: "החזקה", secs: 4, scale: 1 },
      { label: "נשיפה", secs: 4, scale: 0.55 },
      { label: "החזקה", secs: 4, scale: 0.55 },
    ],
  },
  {
    id: "long",
    name: "נשיפה ארוכה",
    note: "4 · 7 · 8 — מרגיעה לפני שינה.",
    phases: [
      { label: "שאיפה", secs: 4, scale: 1 },
      { label: "החזקה", secs: 7, scale: 1 },
      { label: "נשיפה", secs: 8, scale: 0.55 },
    ],
  },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function BreathTimer() {
  const [pid, setPid] = useState("natural");
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const pattern = patterns.find((p) => p.id === pid)!;
  const cycle = pattern.phases.reduce((n, p) => n + p.secs, 0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  // Which phase are we in, and how long is left of it?
  let t = elapsed % cycle;
  let idx = 0;
  while (t >= pattern.phases[idx].secs) {
    t -= pattern.phases[idx].secs;
    idx++;
  }
  const phase = pattern.phases[idx];
  const left = phase.secs - t;
  const started = running || elapsed > 0;

  const choose = (id: string) => {
    setPid(id);
    setElapsed(0);
    setRunning(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="דפוס נשימה">
        {patterns.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => choose(p.id)}
            aria-pressed={p.id === pid}
            className={`h-11 rounded-full border px-5 text-sm font-medium transition-colors ${
              p.id === pid ? "border-accent bg-accent text-bg" : "border-line text-muted hover:border-accent hover:text-ink"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{pattern.note}</p>

      <div className="relative my-10 grid aspect-square w-full max-w-[22rem] place-items-center">
        <div className="absolute inset-0 rounded-full border border-line" />
        <div className="absolute inset-[22.5%] rounded-full border border-dashed border-line" />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, color-mix(in oklch, var(--accent) 55%, transparent), color-mix(in oklch, var(--accent) 8%, transparent) 70%)",
            boxShadow: "0 0 5rem color-mix(in oklch, var(--accent) 35%, transparent)",
          }}
          initial={false}
          animate={{ scale: started ? phase.scale : 0.55 }}
          transition={{ duration: running ? phase.secs : 0.8, ease: "easeInOut" }}
        />
        <div className="relative text-center" aria-live="off">
          <div className="font-display text-4xl font-bold">{started ? phase.label : "מוכנים?"}</div>
          {started && <div className="mt-1 text-2xl text-muted tabular-nums">{left}</div>}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {running ? phase.label : ""}
      </p>

      <div className="flex items-center gap-3">
        <button type="button" onClick={() => setRunning((r) => !r)} className="btn btn-primary min-w-32">
          {running ? "השהיה" : started ? "המשך" : "התחלה"}
        </button>
        <button type="button" onClick={() => choose(pid)} className="btn" disabled={!started}>
          איפוס
        </button>
      </div>
      <dl className="mt-8 flex gap-10 text-center">
        <div>
          <dt className="text-xs text-muted">זמן</dt>
          <dd className="font-display text-2xl tabular-nums">{fmt(elapsed)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">נשימות</dt>
          <dd className="font-display text-2xl tabular-nums">{Math.floor(elapsed / cycle)}</dd>
        </div>
      </dl>
    </div>
  );
}
