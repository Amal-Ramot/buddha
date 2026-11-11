import Link from "next/link";
import { getCategory, type Topic } from "@/data/dharma";
import { hueStyle } from "@/lib";

export default function TopicCard({ topic }: { topic: Topic }) {
  const cat = getCategory(topic.category);
  return (
    <Link href={`/dharma/${topic.slug}/`} style={hueStyle(cat.hue)} className="spot hue flex h-full flex-col p-6">
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent" />
          {cat.title}
        </span>
        <span>{topic.items.length} מושגים</span>
      </div>
      <h3 className="font-display mt-5 text-2xl leading-tight font-bold">{topic.title}</h3>
      <p className="term mt-1 text-sm text-accent">{topic.term}</p>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{topic.summary}</p>
      <span className="mt-5 text-sm font-medium text-accent">
        לקריאה <span aria-hidden="true">←</span>
      </span>
    </Link>
  );
}
