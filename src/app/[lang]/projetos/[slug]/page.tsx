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
import { hasLocale } from "@/lib/i18n";
import { DarkThemeRange } from "@/components/ui/dark-theme-range";

export function generateStaticParams() {
  return activeProjectSlugs().map((slug) => ({ slug }));
}

type ProjectPageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

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
