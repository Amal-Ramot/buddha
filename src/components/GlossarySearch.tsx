"use client";

import Link from "next/link";
import { useState } from "react";
import { getCategory, glossary } from "@/data/dharma";
import { hueStyle } from "@/lib";

export default function GlossarySearch() {
  const [q, setQ] = useState("");
  const s = q.trim().toLowerCase();
  const shown = s
    ? glossary.filter((g) => g.term.toLowerCase().includes(s) || g.name.includes(s) || g.text.includes(s))
    : glossary;

  const groups = new Map<string, typeof glossary>();
  for (const g of shown) {
    const k = g.term[0].toUpperCase();
    groups.set(k, [...(groups.get(k) ?? []), g]);
  }

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="חפשו בעברית או בפאלי, למשל: Metta, ארעיות…"
        aria-label="חיפוש במילון"
        className="h-14 w-full rounded-full border border-line bg-card px-6 text-lg outline-none placeholder:text-muted focus:border-accent"
      />
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {shown.length} מושגים
      </p>

      <div className="mt-8 space-y-12">
        {[...groups].map(([letter, entries]) => (
          <section key={letter} className="grid gap-4 md:grid-cols-[5rem_1fr]">
            <h2 className="font-display text-5xl font-bold text-accent md:sticky md:top-28 md:self-start" dir="ltr">
              {letter}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {entries.map((g) => (
                <li key={g.term}>
                  <Link
                    href={`/dharma/${g.topicSlug}/`}
                    style={hueStyle(getCategory(g.category).hue)}
                    className="spot hue block h-full p-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <span className="term text-xl text-accent">{g.term}</span>
                      <span className="font-medium">{g.name}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{g.text}</p>
                    <p className="mt-3 text-xs text-muted">מתוך: {g.topicTitle}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {shown.length === 0 && <p className="py-16 text-center text-muted">לא נמצאו מושגים תואמים.</p>}
    </div>
  );
}
