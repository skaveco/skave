import Image from "next/image";

import { MediaReveal } from "@/components/ui/media-reveal";
import { TextAnimate } from "@/components/ui/text-animate";
import type { ProjectCover } from "@/data/projects";

type ProjectDetailHeroProps = {
  name: string;
  cover: ProjectCover;
};

// Figma: Website Skave 3.0, node 2924:595.
export function ProjectDetailHero({ name, cover }: ProjectDetailHeroProps) {
  return (
    <section
      aria-label={name}
      className="bg-background-01 px-[1.25rem] pt-[7.5rem] pb-[2.5rem] text-text-01 tablet:px-[2.5rem]"
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-[2.5rem]">
        <p className="type-display-md break-words">
          <TextAnimate animation="slideUp">{name}</TextAnimate>
        </p>

        <MediaReveal
          fade={false}
          className="aspect-[1020/619] w-full overflow-hidden bg-background-01"
        >
          <figure className="relative size-full">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              priority
              sizes="(min-width: 1100px) 86rem, 100vw"
              className="object-cover"
            />
          </figure>
        </MediaReveal>
      </div>
    </section>
  );
}
