import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { OtherProjectsSection } from "@/components/project/other-projects-section";
import { ProjectDetailHero } from "@/components/project/project-detail-hero";
import { ProjectInfoSection } from "@/components/project/project-info-section";
import { ProjectMediaSection } from "@/components/project/project-media-section";
import {
  activeProjectSlugs,
  getProject,
  relatedProjectCards,
} from "@/data/projects";
import { hasLocale, htmlLang, locales, localePath } from "@/lib/i18n";
import { DarkThemeRange } from "@/components/ui/dark-theme-range";

export function generateStaticParams() {
  return activeProjectSlugs().map((slug) => ({ slug }));
}

type ProjectPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const project = getProject(slug, lang);
  if (!project) notFound();

  const path = `/projetos/${project.slug}`;
  const title = `${project.title} | Skave`;
  const description = project.description;
  const images = [{ url: project.cover.src, alt: project.cover.alt }];

  return {
    title,
    description,
    alternates: {
      canonical: localePath(path, lang),
      languages: {
        ...Object.fromEntries(
          locales.map((locale) => [htmlLang[locale], localePath(path, locale)]),
        ),
        "x-default": path,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Skave",
      title,
      description,
      url: localePath(path, lang),
      locale: lang === "pt" ? "pt_BR" : "en_US",
      alternateLocale: lang === "pt" ? "en_US" : "pt_BR",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) notFound();

  const project = getProject(slug, lang);

  if (!project) notFound();

  const dict = await getDictionary(lang);
  const otherProjects = relatedProjectCards(slug, lang);

  return (
    <>
      <Header lang={lang} copy={dict.header} />
      <main>
        <ProjectDetailHero name={project.name} cover={project.cover} />
        <ProjectInfoSection content={dict.projectInfo} project={project} />
        <ProjectMediaSection
          label={dict.projectInfo.mediaLabel}
          media={project.media}
        />
        <DarkThemeRange persistAfter>
          <OtherProjectsSection
            content={dict.otherProjects}
            lang={lang}
            projects={otherProjects}
          />
        </DarkThemeRange>
      </main>
      <Footer content={dict.footer} lang={lang} />
    </>
  );
}
