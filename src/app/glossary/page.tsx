import type { Metadata } from "next";
import GlossarySearch from "@/components/GlossarySearch";

export const metadata: Metadata = {
  title: "מילון מושגים",
  description: "מילון מונחי הדהרמה בפאלי ובסנסקריט, עם הסבר בעברית.",
};

export default function Glossary() {
  return (
    <div style={{ "--h": 112 } as React.CSSProperties} className="hue mx-auto max-w-5xl px-4 pt-36">
      <header className="max-w-3xl">
        <p className="eyebrow">
          <span dir="ltr">Pali · Sanskrit</span>
        </p>
        <h1 className="font-display mt-4 text-5xl leading-none font-black sm:text-7xl">מילון מושגים</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          כל מונח מוביל אל הנושא שבו הוא מוסבר. התעתיק הלטיני מפושט, ללא סימני ניקוד.
        </p>
      </header>
      <div className="mt-10">
        <GlossarySearch />
      </div>
    </div>
  );
}
