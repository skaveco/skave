"use client";

import { useState } from "react";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ProjectItem } from "@/components/project-item";
import { Tag } from "@/components/ui/tag";
import { TextAnimate } from "@/components/ui/text-animate";
import type { ProjectCard, ProjectCategory } from "@/data/projects";

type Filter = "all" | ProjectCategory;

type ProjectHeroProps = {
  content: Dictionary["projectsPage"];
  projects: ProjectCard[];
};

export function ProjectHero({ content, projects }: ProjectHeroProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filters: Array<{ id: Filter; label: string }> = [
    { id: "all", label: content.filters.all },
    { id: "brand-development", label: content.filters.brandDevelopment },
    { id: "online-experience", label: content.filters.onlineExperience },
    { id: "digital-product", label: content.filters.digitalProduct },
  ];

  const visibleProjects = projects.filter(
    (project) =>
      activeFilter === "all" || project.categories.includes(activeFilter),
  );

  return (
    <section
      id="projetos"
      aria-labelledby="projects-page-title"
      className="bg-background-01 px-[1.25rem] pt-[7.5rem] pb-[2.5rem] tablet:pb-[5rem] text-text-01 tablet:px-[2.5rem] border-b border-divider desktop:border-0"
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-[2.5rem]">
        <h1 id="projects-page-title" className="type-display-md">
          <TextAnimate animation="slideUp">{content.title}</TextAnimate>
        </h1>

        <div className="flex flex-col gap-[2rem]">
          <div className="flex flex-col gap-[1rem] border-y border-divider py-[1.25rem] desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-[2rem]">
            <p className="type-label-md shrink-0 uppercase">{content.explore}</p>

            <div
              role="group"
              aria-label={content.filterLabel}
              className="-mx-[1.25rem] flex gap-[0.75rem] overflow-x-auto px-[1.25rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden tablet:mx-0 tablet:px-0"
            >
              {filters.map((filter) => {
                const isSelected = activeFilter === filter.id;

                return (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setActiveFilter(filter.id)}
                    className="cursor-pointer rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-01"
                  >
                    <Tag state={isSelected ? "selected" : "default"}>
                      {filter.label}
                    </Tag>
                  </button>
                );
              })}
            </div>
          </div>

          <div aria-live="polite">
            {visibleProjects.map((project) => {
              const number = projects.indexOf(project) + 1;

              return (
                <ProjectItem
                  key={project.slug}
                  number={String(number).padStart(2, "0")}
                  name={project.name}
                  services={project.services}
                  segment={project.segment}
                  publishedAt={project.publishedAt}
                  image={project.image}
                  imageAlt={project.imageAlt}
                  href={project.href}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
