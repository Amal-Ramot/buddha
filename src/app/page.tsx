import Link from "next/link";
import DharmaWheel from "@/components/DharmaWheel";
import HeroCanvas from "@/components/HeroCanvas";
import RingExplorer from "@/components/RingExplorer";
import VerseRotator from "@/components/VerseRotator";
import { categories, getTopic, stats, topicsByCategory } from "@/data/dharma";
import { hueStyle, pad } from "@/lib";

const facts = [
  { n: stats.topics, label: "נושאי לימוד" },
  { n: stats.concepts, label: "מושגים מוסברים" },
  { n: stats.gates, label: "שערים" },
  { n: "2,500", label: "שנות מסורת" },
];

export default function Home() {
  const truths = getTopic("four-noble-truths")!;
  const path = getTopic("eightfold-path")!;
  const chain = getTopic("dependent-origination")!;
  const life = getTopic("life-of-the-buddha")!;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden px-4 pt-28 pb-16">
        <div className="absolute inset-0 -z-10">
          <HeroCanvas />
          <DharmaWheel className="spin-slow absolute top-1/2 left-1/2 size-[min(150vw,62rem)] -translate-x-1/2 -translate-y-1/2 text-accent opacity-[0.13]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
        </div>

        <div className="mx-auto w-full max-w-6xl text-center">
          <p className="eyebrow">
            <span dir="ltr">Buddha · Dhamma · Sangha</span>
          </p>
          <h1 className="font-display mt-6 text-[clamp(3.2rem,11vw,9rem)] leading-[0.95] font-black tracking-tight">
            כל הדהרמה.
            <br />
            <span className="gilded">במקום אחד.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            מפה חיה של תורת הבודהה: מארבע האמיתות ועד הריקות, מהנשימה הראשונה ועד ההתעוררות. בעברית, בבהירות, ובקצב שלכם.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/dharma/" className="btn btn-primary">
              להתחיל במסע <span aria-hidden="true">←</span>
            </Link>
            <Link href="/meditate/" className="btn glass">
              לנשום רגע
            </Link>
          </div>

          <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-bg/80 px-4 py-5 backdrop-blur">
                <dd className="font-display text-3xl font-bold text-accent sm:text-4xl">{f.n}</dd>
                <dt className="mt-1 text-xs text-muted sm:text-sm">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Verse ── */}
      <section className="reveal px-4 py-24 sm:py-32">
        <VerseRotator />
      </section>

      {/* ── Seven gates ── */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHead eyebrow="המפה" title="שבעה שערים אל הדהרמה" text="כל שער פותח תחום אחר של התורה. אפשר להיכנס מכל אחד מהם; כולם מובילים לאותו מקום." />
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {categories.map((c, i) => {
            const list = topicsByCategory(c.id);
            return (
              <li key={c.id} className={`reveal ${i === 6 ? "md:col-span-2" : ""}`}>
                <article style={hueStyle(c.hue)} className="spot hue flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-6xl leading-none font-black text-accent/30">{pad(i + 1)}</span>
                    <span className="term text-accent">{c.term}</span>
                  </div>
                  <h3 className="font-display mt-6 text-4xl font-bold">
                    <Link href={`/dharma/#${c.id}`} className="hover:text-accent">
                      {c.title}
                    </Link>
                  </h3>
                  <p className="mt-2 max-w-md text-muted">{c.blurb}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {list.map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={`/dharma/${t.slug}/`}
                          className="inline-flex min-h-9 items-center rounded-full border border-line px-3.5 text-sm transition-colors hover:border-accent hover:text-accent"
                        >
                          {t.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── Four truths ── */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHead eyebrow={truths.term} title={truths.title} text={truths.body[0]} hue={32} />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {truths.items.map((it, i) => (
            <li key={it.name} className="reveal">
              <div style={hueStyle(32 + i * 14)} className="spot hue flex h-full flex-col p-6">
                <span className="font-display text-7xl leading-none font-black text-accent">{i + 1}</span>
                <p className="term mt-6 text-accent">{it.term}</p>
                <h3 className="font-display text-2xl font-bold">{it.name}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <MoreLink href={`/dharma/${truths.slug}/`} hue={32} />
      </section>

      {/* ── Eightfold path ── */}
      <section className="border-y border-line bg-bg2/60 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead eyebrow={path.term} title={path.title} text="שמונה חישורים לגלגל אחד. בחרו חישור כדי לקרוא עליו." hue={155} />
          <div className="mt-14">
            <RingExplorer items={path.items} hue={155} label={path.title} />
          </div>
        </div>
      </section>

      {/* ── Life of the Buddha ── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead eyebrow={life.term} title={life.title} text={life.summary} hue={78} />
        </div>
        <ol className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-[max(1rem,calc((100vw-72rem)/2+1rem))]" tabIndex={0} aria-label="תחנות בחיי הבודהה">
          {life.items.map((it, i) => (
            <li key={it.name} className="w-[78vw] max-w-xs shrink-0 snap-start">
              <div style={hueStyle(78)} className="spot hue flex h-full flex-col p-6">
                <div className="flex items-center gap-3 text-accent">
                  <span className="font-display text-3xl font-black">{pad(i + 1)}</span>
                  <span className="h-px flex-1 bg-accent/40" />
                </div>
                <h3 className="font-display mt-5 text-2xl font-bold">{it.name}</h3>
                <p className="term text-sm text-accent">{it.term}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mx-auto max-w-6xl px-4">
          <MoreLink href={`/dharma/${life.slug}/`} hue={78} />
        </div>
      </section>

      {/* ── Dependent origination ── */}
      <section className="border-y border-line bg-bg2/60 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead eyebrow={chain.term} title={chain.title} text={chain.body[0]} hue={32} />
          <div className="mt-14">
            <RingExplorer items={chain.items} hue={32} label={chain.title} />
          </div>
        </div>
      </section>

      {/* ── Practice CTA ── */}
      <section className="mx-auto max-w-6xl px-4 pt-24">
        <div style={hueStyle(205)} className="spot hue reveal grid items-center gap-8 p-8 sm:p-14 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">Bhavana</p>
            <h2 className="font-display mt-4 text-4xl leading-tight font-bold sm:text-6xl">הדהרמה אינה רעיון. היא תרגול.</h2>
            <p className="mt-4 max-w-xl text-lg text-muted">שלוש דקות של נשימה מודעת שוות יותר מעוד עמוד קריאה. המדריך מחכה לכם.</p>
            <Link href="/meditate/" className="btn btn-primary mt-8">
              לתרגול הנשימה <span aria-hidden="true">←</span>
            </Link>
          </div>
          <div className="relative mx-auto grid size-44 place-items-center sm:size-56" aria-hidden="true">
            <span className="absolute inset-0 animate-ping rounded-full border border-accent/40 [animation-duration:5s]" />
            <span className="absolute inset-6 rounded-full bg-accent/15" />
            <span className="absolute inset-14 rounded-full bg-accent/30" />
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({ eyebrow, title, text, hue = 78 }: { eyebrow: string; title: string; text: string; hue?: number }) {
  return (
    <header style={hueStyle(hue)} className="hue reveal max-w-3xl">
      <p className="eyebrow">
        <span className="term not-italic">{eyebrow}</span>
      </p>
      <h2 className="font-display mt-4 text-4xl leading-tight font-bold text-balance sm:text-6xl">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-muted">{text}</p>
    </header>
  );
}

function MoreLink({ href, hue }: { href: string; hue: number }) {
  return (
    <p style={hueStyle(hue)} className="hue mt-8">
      <Link href={href} className="btn">
        לעמוד המלא <span aria-hidden="true">←</span>
      </Link>
    </p>
  );
}
