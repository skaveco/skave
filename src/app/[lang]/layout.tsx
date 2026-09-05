import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteCursor } from "@/components/ui/cursor";
import { hasLocale, htmlLang, locales } from "@/lib/i18n";
import { indexingEnabled, siteUrl } from "@/lib/seo";
import { getDictionary } from "./dictionaries";
import "../globals.css";

const aspekta = localFont({
  src: "../fonts/AspektaVF.woff2",
  variable: "--font-aspekta",
  weight: "50 1000",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: { index: indexingEnabled, follow: true },
  icons: {
    icon: [
      {
        url: "/meta/favicon-light.png",
        type: "image/png",
        sizes: "633x633",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/meta/favicon-dark.png",
        type: "image/png",
        sizes: "633x633",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  title: "Skave | Branding e Tecnologia para negócios digitais",
  description: "Parceiro estratégico, técnico e criativo para negócios digitais. Desenvolvemos marcas, sites e produtos digitais, do planejamento à entrega.",
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
    <html
      lang={htmlLang[lang]}
      className={`${aspekta.variable} h-full antialiased`}
    >
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
