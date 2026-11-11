import type { Metadata, Viewport } from "next";
import "@fontsource-variable/heebo";
import "@fontsource-variable/frank-ruhl-libre";
import "./globals.css";
import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PointerGlow from "@/components/PointerGlow";

export const metadata: Metadata = {
  title: { default: "דהרמה · כל תורת הבודהה במקום אחד", template: "%s · דהרמה" },
  description:
    "מפה אינטראקטיבית של הבודהה דהרמה: ארבע האמיתות, הדרך המתומנת, התהוות מותנית, מדיטציה, מסורות וכתבים.",
};

export const viewport: Viewport = {
  themeColor: "#0b0a0f",
};

const themeScript = `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-accent px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:right-3"
        >
          דילוג לתוכן
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <CommandPalette />
        <PointerGlow />
      </body>
    </html>
  );
}
