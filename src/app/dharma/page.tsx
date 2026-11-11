import type { Metadata } from "next";
import TopicExplorer from "@/components/TopicExplorer";
import { stats } from "@/data/dharma";

export const metadata: Metadata = {
  title: "הדהרמה",
  description: "כל נושאי הלימוד: יסודות, הדרך, התודעה, תרגול, מסורות וכתבים.",
};

export default function DharmaIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-36">
      <header className="max-w-3xl">
        <p className="eyebrow">
          <span dir="ltr">Dhamma</span>
        </p>
        <h1 className="font-display mt-4 text-5xl leading-none font-black sm:text-7xl">הדהרמה</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {stats.topics} נושאים ו־{stats.concepts} מושגים, מסודרים בשבעה שערים. בחרו שער, או פשוט התחילו ממה שמסקרן אתכם.
        </p>
      </header>
      <div className="mt-12">
        <TopicExplorer />
      </div>
    </div>
  );
}
