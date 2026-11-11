import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 pt-48 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-5xl font-bold">גם הדף הזה ארעי</h1>
      <p className="text-muted">מה שחיפשתם אינו כאן. אפשר לחזור אל הדרך.</p>
      <Link href="/" className="btn btn-primary">
        חזרה לדף הבית
      </Link>
    </div>
  );
}
