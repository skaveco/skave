import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { DarkThemeRange } from "@/components/ui/dark-theme-range";
import { hasLocale, htmlLang, locales, localePath } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contato">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { contact } = await getDictionary(lang);
  const { title, description } = contact.metadata;
  const images = [{ url: "/meta/opengraph.png", width: 1200, height: 630 }];

  return {
    title,
    description,
    alternates: {
      canonical: localePath("/contato", lang),
      languages: {
        ...Object.fromEntries(
          locales.map((locale) => [htmlLang[locale], localePath("/contato", locale)]),
        ),
        "x-default": "/contato",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Skave",
      title,
      description,
      url: localePath("/contato", lang),
      locale: lang === "pt" ? "pt_BR" : "en_US",
      alternateLocale: lang === "pt" ? "en_US" : "pt_BR",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contato">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} copy={dict.header} />
      <main>
        <DarkThemeRange persistAfter>
          <ContactSection
            content={dict.contact}
            privacyHref={localePath("/privacidade", lang)}
            successHref={localePath("/obrigado", lang)}
          />
        </DarkThemeRange>
      </main>
      <Footer content={dict.footer} lang={lang} />
    </>
  );
}
