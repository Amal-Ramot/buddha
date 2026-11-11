"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DharmaWheel from "./DharmaWheel";

const links = [
  { href: "/dharma/", label: "הדהרמה" },
  { href: "/meditate/", label: "מדיטציה" },
  { href: "/glossary/", label: "מילון" },
];

const toggleTheme = () => {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
};

export default function Nav() {
  const path = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="scroll-progress fixed inset-x-0 top-0 h-0.5 origin-right bg-accent" />
      <nav
        aria-label="ניווט ראשי"
        className="glass mx-auto flex max-w-5xl items-center gap-1 rounded-full py-1.5 ps-2 pe-1.5 sm:gap-2"
      >
        <Link href="/" className="flex items-center gap-2 rounded-full p-1.5 pe-2 sm:pe-3" aria-label="דף הבית">
          <DharmaWheel className="size-7 text-accent" />
          <span className="font-display hidden text-lg font-bold sm:inline">דהרמה</span>
        </Link>
        <ul className="flex flex-1 items-center justify-center gap-0.5 text-sm sm:gap-1 sm:text-[0.95rem]">
          {links.map((l) => {
            const active = path.startsWith(l.href.slice(0, -1));
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-full px-3 py-2 transition-colors sm:px-4 ${
                    active ? "bg-accent/15 text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("open-palette"))}
          className="flex h-10 items-center gap-2 rounded-full border border-line px-3 text-sm text-muted transition-colors hover:text-ink"
          aria-label="חיפוש"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="hidden md:inline">חיפוש</span>
          <kbd className="hidden rounded border border-line px-1.5 text-[0.7rem] md:inline" dir="ltr">
            Ctrl K
          </kbd>
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
          aria-label="החלפת מצב בהיר / כהה"
        >
          <svg viewBox="0 0 24 24" className="icon-moon size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
          </svg>
          <svg viewBox="0 0 24 24" className="icon-sun size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
