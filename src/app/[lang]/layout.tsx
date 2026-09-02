import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteCursor } from "@/components/ui/cursor";
import { hasLocale, htmlLang, locales } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";
import "../globals.css";

export const metadata: Metadata = {
  title: "SKAVE",
  description: "Site oficial da SKAVE.",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={htmlLang[lang]} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SmoothScroll>
          {children}
          <SiteCursor
            labels={{
              video: dict.hero.cursorVideo,
              case: dict.projects.cursorCase,
              blog: dict.blog.cursorPost,
              drag: dict.testimonials.cursorDrag,
            }}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
