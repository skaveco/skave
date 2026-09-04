import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ProjectItem } from "@/components/project-item";
import { TextAnimate } from "@/components/ui/text-animate";
import type { ProjectCard } from "@/data/projects";

type ProjectsSectionProps = {
  content: Dictionary["projects"];
  projects: ProjectCard[];
};

// Figma: Website Skave 3.0, node 2744:375.
export function ProjectsSection({ content, projects }: ProjectsSectionProps) {
  return (
    <section
      id="projetos"
      aria-labelledby="projects-title"
      className="bg-background-01 px-[1.25rem] md:px-[2.5rem] pt-[5rem] pb-[2.5rem] text-text-01 gap-[1rem]"
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-[1rem] lg:gap-[5rem]">
        <header className="flex w-full flex-col items-start gap-[1.25rem] desktop:flex-row desktop:items-end desktop:justify-between">
          <h2
            id="projects-title"
            className="type-display-md"
          >
            <TextAnimate animation="slideUp">{content.title}</TextAnimate>
          </h2>

          <span className="type-body-base inline-flex items-center gap-[0.5rem]">
            {content.viewAll}
            <ArrowLongRightIcon aria-hidden="true" className="size-5 shrink-0" />
          </span>
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
              imageAlt={project.imageAlt}
              image={project.image}
              href={project.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
