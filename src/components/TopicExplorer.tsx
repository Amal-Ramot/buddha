"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { categories, topics, type CategoryId } from "@/data/dharma";
import { hueStyle } from "@/lib";
import TopicCard from "./TopicCard";

const isCategory = (s: string): s is CategoryId => categories.some((c) => c.id === s);

export default function TopicExplorer() {
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [q, setQ] = useState("");

  // Deep links such as /dharma/#path pre-select a gate.
  useEffect(() => {
    const sync = () => {
      const h = location.hash.slice(1);
      if (isCategory(h)) setCat(h);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const s = q.trim().toLowerCase();
  const shown = topics.filter(
    (t) =>
      (cat === "all" || t.category === cat) &&
      (!s || t.title.includes(s) || t.term.toLowerCase().includes(s) || t.summary.includes(s)),
  );
  const current = categories.find((c) => c.id === cat);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-1 md:flex-wrap md:px-0" role="group" aria-label="סינון לפי שער">
          <Chip active={cat === "all"} onClick={() => setCat("all")} hue={78}>
            הכול
          </Chip>
          {categories.map((c) => (
            <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)} hue={c.hue}>
              {c.title}
            </Chip>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="סינון…"
          aria-label="סינון נושאים"
          className="h-11 rounded-full border border-line bg-card px-5 outline-none placeholder:text-muted focus:border-accent md:w-56"
        />
      </div>

      <p className="mt-6 min-h-6 text-muted" aria-live="polite">
        {current ? current.blurb : `${shown.length} נושאים`}
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((t) => (
            <motion.li
              key={t.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
            >
              <TopicCard topic={t} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {shown.length === 0 && <p className="py-16 text-center text-muted">לא נמצאו נושאים תואמים.</p>}
    </div>
  );
}

function Chip({
  active,
  onClick,
  hue,
  children,
}: {
  active: boolean;
  onClick: () => void;
  hue: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={hueStyle(hue)}
      className={`hue h-11 shrink-0 rounded-full border px-5 text-sm font-medium transition-colors ${
        active ? "border-accent bg-accent text-bg" : "border-line text-muted hover:border-accent hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
