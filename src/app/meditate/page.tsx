import type { Metadata } from "next";
import Link from "next/link";
import BreathTimer from "@/components/BreathTimer";
import { hueStyle } from "@/lib";

export const metadata: Metadata = {
  title: "מדיטציה",
  description: "מדריך נשימה אינטראקטיבי והוראות קצרות לקשב לנשימה ולאהבה מיטיבה.",
};

const steps = [
  { name: "לשבת", text: "גב זקוף ונינוח, כתפיים רפויות, ידיים על הירכיים. עיניים עצומות או מבט רך כלפי מטה." },
  { name: "למצוא את הנשימה", text: "בחרו מקום אחד שבו הנשימה מורגשת בבירור: הנחיריים, החזה או הבטן. אין צורך לשנות אותה." },
  { name: "להישאר", text: "הרגישו שאיפה אחת שלמה, ואחריה נשיפה אחת שלמה. אפשר לספור בשקט מאחת עד עשר." },
  { name: "לחזור", text: "כשהמחשבה נודדת, וזה יקרה, שימו לב בעדינות וחזרו. החזרה הזו היא התרגול עצמו." },
];

const metta = [
  "מי ייתן ואהיה מוגן ובטוח.",
  "מי ייתן ואהיה בריא וחזק.",
  "מי ייתן ואהיה מאושר ושליו.",
  "מי ייתן ואחיה בקלות.",
];

export default function Meditate() {
  return (
    <div style={hueStyle(205)} className="hue mx-auto max-w-6xl px-4 pt-36">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">
          <span dir="ltr">Anapanasati</span>
        </p>
        <h1 className="font-display mt-4 text-5xl leading-none font-black sm:text-7xl">לנשום. לדעת שנושמים.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">עקבו אחרי העיגול: הוא מתרחב בשאיפה ומתכווץ בנשיפה. זה הכול.</p>
      </header>

      <section className="mt-12" aria-label="מדריך נשימה">
        <BreathTimer />
      </section>

      <section className="mt-28 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-bold">ארבעה צעדים לישיבה</h2>
          <ol className="mt-8 space-y-4">
            {steps.map((s, i) => (
              <li key={s.name} className="spot reveal flex gap-5 p-6">
                <span className="font-display text-4xl leading-none font-black text-accent">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{s.name}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/dharma/anapanasati/" className="btn mt-6">
            שישה־עשר צעדי הנשימה <span aria-hidden="true">←</span>
          </Link>
        </div>

        <div style={hueStyle(355)} className="hue">
          <h2 className="font-display text-4xl font-bold">אהבה מיטיבה</h2>
          <p className="mt-4 leading-relaxed text-muted">
            חזרו בשקט על המשפטים, תחילה כלפי עצמכם. אחר כך הרחיבו: לאדם אהוב, לאדם ניטרלי, לאדם שקשה לכם איתו, ולבסוף לכל היצורים.
          </p>
          <ul className="spot reveal mt-8 space-y-4 p-8">
            {metta.map((m) => (
              <li key={m} className="font-display text-2xl leading-snug">
                {m}
              </li>
            ))}
          </ul>
          <Link href="/dharma/brahmaviharas/" className="btn mt-6">
            ארבעת המשכנות הנשגבים <span aria-hidden="true">←</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
