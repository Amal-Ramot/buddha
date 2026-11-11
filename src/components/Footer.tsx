import Link from "next/link";
import { categories } from "@/data/dharma";
import DharmaWheel from "./DharmaWheel";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center">
        <DharmaWheel className="size-14 text-accent" />
        <p className="font-display max-w-xl text-2xl leading-snug sm:text-3xl">
          מי ייתן וכל היצורים יהיו מאושרים, שלווים וחופשיים.
        </p>
        <p className="term text-muted">Sabbe satta sukhi hontu</p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {categories.map((c) => (
            <li key={c.id}>
              <Link href={`/dharma/#${c.id}`} className="transition-colors hover:text-ink">
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
        <p className="max-w-lg text-xs leading-relaxed text-muted">
          האתר הוא מבוא לימודי. הציטוטים מובאים בתרגום חופשי מן המקורות. לתרגול מעמיק מומלץ ללמוד עם מורה ועם קהילה.
        </p>
      </div>
    </footer>
  );
}
