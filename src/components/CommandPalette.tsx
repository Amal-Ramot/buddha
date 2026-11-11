"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { categories, getCategory, glossary, topics } from "@/data/dharma";
import { hueStyle } from "@/lib";

type Entry = { label: string; sub: string; term?: string; href: string; hue: number; kind: string };

const all: Entry[] = [
  ...topics.map((t) => ({
    label: t.title,
    sub: t.summary,
    term: t.term,
    href: `/dharma/${t.slug}/`,
    hue: getCategory(t.category).hue,
    kind: getCategory(t.category).title,
  })),
  ...glossary.map((g) => ({
    label: g.name,
    sub: g.text,
    term: g.term,
    href: `/dharma/${g.topicSlug}/`,
    hue: getCategory(g.category).hue,
    kind: "מושג",
  })),
  { label: "מדיטציה", sub: "תרגול נשימה מודרך", href: "/meditate/", hue: 205, kind: "עמוד" },
  { label: "מילון מושגים", sub: "כל המונחים בפאלי ובסנסקריט", href: "/glossary/", hue: 112, kind: "עמוד" },
];

const starters = categories.map((c) => all.find((e) => e.kind === c.title)!);

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    const show = () => {
      setQ("");
      setActive(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", show);
    };
  }, []);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return starters;
    return all
      .filter((e) => e.label.includes(s) || e.term?.toLowerCase().includes(s) || e.sub.includes(s))
      .slice(0, 8);
  }, [q]);

  const go = (e?: Entry) => {
    if (!e) return;
    setOpen(false);
    router.push(e.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") go(results[active]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="חיפוש בדהרמה"
            className="glass w-full max-w-xl overflow-hidden rounded-3xl shadow-2xl"
            initial={{ y: -16, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <input
              autoFocus
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setActive(0);
              }}
              placeholder="חפשו נושא, מושג או מונח בפאלי…"
              aria-label="חיפוש"
              className="w-full border-b border-line bg-transparent px-6 py-5 text-lg outline-none placeholder:text-muted"
            />
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-4 py-8 text-center text-muted">לא נמצאו תוצאות</li>}
              {results.map((r, i) => (
                <li key={r.href + r.label + r.kind}>
                  <button
                    type="button"
                    onClick={() => go(r)}
                    onPointerMove={() => setActive(i)}
                    style={hueStyle(r.hue)}
                    className={`hue flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-start ${
                      i === active ? "bg-accent/12" : ""
                    }`}
                  >
                    <span className="size-2 shrink-0 rounded-full bg-accent" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="font-medium">{r.label}</span>
                        {r.term && <span className="term truncate text-sm text-accent">{r.term}</span>}
                      </span>
                      <span className="block truncate text-sm text-muted">{r.sub}</span>
                    </span>
                    <span className="shrink-0 text-xs text-muted">{r.kind}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
