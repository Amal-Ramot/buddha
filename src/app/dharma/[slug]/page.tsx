import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RingExplorer from "@/components/RingExplorer";
import TopicCard from "@/components/TopicCard";
import { getCategory, getTopic, topics } from "@/data/dharma";
import { hueStyle, pad } from "@/lib";

export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/dharma/[slug]">): Promise<Metadata> {
  const topic = getTopic((await params).slug);
  return topic ? { title: topic.title, description: topic.summary } : {};
}

export default async function TopicPage({ params }: PageProps<"/dharma/[slug]">) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const cat = getCategory(topic.category);
  const idx = topics.indexOf(topic);
  const prev = topics[(idx - 1 + topics.length) % topics.length];
  const next = topics[(idx + 1) % topics.length];

  return (
    <article style={hueStyle(cat.hue)} className="hue">
      <header className="mx-auto max-w-6xl px-4 pt-36">
        <nav aria-label="פירורי לחם" className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link href="/dharma/" className="hover:text-ink">
            הדהרמה
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/dharma/#${cat.id}`} className="text-accent">
            {cat.title}
          </Link>
        </nav>
        <p className="term mt-10 text-xl text-accent sm:text-2xl">{topic.term}</p>
        <h1 className="font-display mt-2 text-[clamp(2.75rem,8vw,6.5rem)] leading-[1] font-black text-balance">{topic.title}</h1>
        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted sm:text-2xl">{topic.summary}</p>
      </header>

      <div className="mx-auto mt-14 grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-2xl space-y-5 text-lg leading-[1.9]">
          {topic.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <aside className="spot self-start p-6 hover:translate-y-0">
          <h2 className="text-xs tracking-widest text-muted">{topic.itemsTitle}</h2>
          <ol className="mt-4 space-y-2">
            {topic.items.map((it, i) => (
              <li key={it.name}>
                <a href={`#item-${i + 1}`} className="flex items-baseline gap-3 text-[0.95rem] hover:text-accent">
                  <span className="font-display text-accent tabular-nums">{pad(i + 1)}</span>
                  {it.name}
                </a>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      {topic.layout === "wheel" && (
        <section className="mt-20 border-y border-line bg-bg2/60 py-20" aria-label="גלגל אינטראקטיבי">
          <div className="mx-auto max-w-6xl px-4">
            <RingExplorer items={topic.items} hue={cat.hue} label={topic.itemsTitle} />
          </div>
        </section>
      )}

      <section className="mx-auto mt-20 max-w-6xl px-4">
        <h2 className="font-display text-4xl font-bold sm:text-5xl">{topic.itemsTitle}</h2>

        {topic.layout === "timeline" ? (
          <ol className="relative mt-12 space-y-6 border-s border-line ps-8 sm:ps-12">
            {topic.items.map((it, i) => (
              <li key={it.name} id={`item-${i + 1}`} className="reveal relative">
                <span className="absolute top-7 -start-8 size-3 translate-x-1/2 rounded-full bg-accent shadow-[0_0_1.2rem_var(--accent)] sm:-start-12" />
                <div className="spot p-6 sm:p-8">
                  <p className="text-sm text-accent">
                    <span className="font-display me-3 text-lg font-bold">{pad(i + 1)}</span>
                    <span className="term">{it.term}</span>
                  </p>
                  <h3 className="font-display mt-2 text-3xl font-bold">{it.name}</h3>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{it.text}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <ol className="mt-12 grid gap-4 md:grid-cols-2">
            {topic.items.map((it, i) => (
              <li key={it.name} id={`item-${i + 1}`} className="reveal">
                <div className="spot flex h-full gap-5 p-6 sm:p-8">
                  <span className="font-display text-5xl leading-none font-black text-accent/40">{pad(i + 1)}</span>
                  <div>
                    <h3 className="font-display text-2xl font-bold">{it.name}</h3>
                    {it.term && <p className="term text-accent">{it.term}</p>}
                    <p className="mt-3 leading-relaxed text-muted">{it.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      {topic.quote && (
        <figure className="reveal mx-auto mt-24 max-w-4xl px-4 text-center">
          <blockquote className="font-display text-3xl leading-snug text-balance sm:text-5xl">״{topic.quote.text}״</blockquote>
          <figcaption className="mt-5 text-sm text-accent">{topic.quote.source}</figcaption>
        </figure>
      )}

      <nav aria-label="נושאים סמוכים" className="mx-auto mt-24 grid max-w-6xl gap-4 px-4 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-sm text-muted">→ הנושא הקודם</p>
          <TopicCard topic={prev} />
        </div>
        <div>
          <p className="mb-3 text-sm text-muted">הנושא הבא ←</p>
          <TopicCard topic={next} />
        </div>
      </nav>
    </article>
  );
}
