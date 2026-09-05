import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FaqSection } from "@/components/project/faq-section";
import { ProjectHero } from "@/components/project/project-hero";
import { DarkThemeRange } from "@/components/ui/dark-theme-range";
import { projectCards } from "@/data/projects";
import { hasLocale, htmlLang } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";
import { getDictionary } from "../dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projetos">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { projectsPage } = await getDictionary(lang);
  const { title, description } = projectsPage.metadata;
  const image = {
    url: "/meta/opengraph.png",
    width: 1200,
    height: 630,
    type: "image/png",
    alt: "Skave — Branding & Tech for Digital Business",
  };

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/projetos`,
      languages: { "pt-BR": "/pt/projetos", en: "/en/projetos", "x-default": "/projetos" },
    },
    openGraph: {
      type: "website",
      siteName: "Skave",
      title,
      description,
      url: `/${lang}/projetos`,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      alternateLocale: lang === "pt" ? "en_US" : "pt_BR",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[lang]/projetos">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const projects = projectCards(lang);
  const pageUrl = `${siteUrl}/${lang}/projetos`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: dict.projectsPage.metadata.title,
    description: dict.projectsPage.metadata.description,
    inLanguage: htmlLang[lang],
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header lang={lang} copy={dict.header} />
      <main>
        <ProjectHero
          content={dict.projectsPage}
          projects={projects}
        />
        <DarkThemeRange persistAfter>
          <FaqSection content={dict.projectsFaq} lang={lang} />
        </DarkThemeRange>
      </main>
      <Footer content={dict.footer} lang={lang} />
    </>
  );
}
