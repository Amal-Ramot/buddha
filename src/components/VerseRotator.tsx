"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { verses } from "@/data/dharma";

export default function VerseRotator() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % verses.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  const v = verses[i];
  return (
    <figure
      className="mx-auto max-w-4xl text-center"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="grid min-h-[13rem] place-items-center sm:min-h-[11rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl leading-snug text-balance sm:text-4xl md:text-5xl"
          >
            ״{v.text}״
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <figcaption className="mt-4 text-sm text-accent">{v.source}</figcaption>
      <div className="mt-6 flex justify-center gap-1">
        {verses.map((_, k) => (
          <button
            key={k}
            type="button"
            onClick={() => setI(k)}
            aria-label={`פסוק ${k + 1}`}
            aria-pressed={k === i}
            className="grid size-6 place-items-center"
          >
            <span className={`h-1.5 rounded-full transition-all duration-300 ${k === i ? "w-5 bg-accent" : "w-1.5 bg-line"}`} />
          </button>
        ))}
      </div>
    </figure>
  );
}
