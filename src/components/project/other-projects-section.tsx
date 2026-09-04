import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ProjectItem } from "@/components/project-item";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import type { ProjectCard } from "@/data/projects";
import { localePath, type Locale } from "@/lib/i18n";

type OtherProjectsSectionProps = {
  content: Dictionary["otherProjects"];
  lang: Locale;
  projects: ProjectCard[];
};

// Figma: Website Skave 3.0, node 2784:159.
export function OtherProjectsSection({
  content,
  lang,
  projects,
}: OtherProjectsSectionProps) {
  if (projects.length === 0) return null;

  return (
    <section
      aria-labelledby="other-projects-title"
      className="bg-background-01 px-[1.25rem] pt-[5rem] pb-[2.5rem] text-text-01 tablet:px-[2.5rem]"
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-[2.5rem] tablet:gap-[5rem]">
        <header className="flex flex-col items-start gap-[1.25rem] desktop:flex-row desktop:items-end desktop:justify-between">
          <h2 id="other-projects-title" className="type-display-md">
            <TextAnimate animation="slideUp">{content.title}</TextAnimate>
          </h2>

          <Button
            href={localePath("/projetos", lang)}
            icon="arrow-long-right"
            fontSize="0.875rem"
            iconSize="1.25rem"
          >
            {content.viewAll}
          </Button>
        </header>

        <div>
          {projects.map((project, index) => (
            <ProjectItem
              key={project.slug}
              number={String(index + 1).padStart(2, "0")}
              name={project.name}
              services={project.services}
              segment={project.segment}
              publishedAt={project.publishedAt}
              image={project.image}
              imageAlt={project.imageAlt}
              href={project.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
