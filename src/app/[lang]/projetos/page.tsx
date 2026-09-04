import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FaqSection } from "@/components/project/faq-section";
import { ProjectHero } from "@/components/project/project-hero";
import { DarkThemeRange } from "@/components/ui/dark-theme-range";
import { projectCards } from "@/data/projects";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "../dictionaries";

export default async function ProjectsPage({
  params,
}: PageProps<"/[lang]/projetos">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} copy={dict.header} />
      <main>
        <ProjectHero
          content={dict.projectsPage}
          projects={projectCards(lang)}
        />
        <DarkThemeRange persistAfter>
          <FaqSection content={dict.projectsFaq} lang={lang} />
        </DarkThemeRange>
      </main>
      <Footer content={dict.footer} lang={lang} />
    </>
  );
}
