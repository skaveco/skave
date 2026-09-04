import Image from "next/image";

import type { ProjectMedia } from "@/data/projects";

type ProjectMediaSectionProps = {
  label: string;
  media: ProjectMedia[];
};

// Figma: Website Skave 3.0, node 2924:656.
export function ProjectMediaSection({
  label,
  media,
}: ProjectMediaSectionProps) {
  if (media.length === 0) return null;

  return (
    <section
      aria-label={label}
      className="bg-background-01 px-[1.25rem] py-[1.25rem] tablet:px-[2.5rem]"
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-[1.25rem] tablet:gap-[2.5rem]">
        {media.map((item, index) => (
          <figure
            key={`${item.src}-${index}`}
            className="relative aspect-[1020/619] w-full overflow-hidden bg-background-02"
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1100px) 86rem, 100vw"
                className="object-cover"
              />
            ) : (
              <video
                aria-label={item.alt}
                autoPlay
                loop
                muted
                playsInline
                poster={item.poster}
                preload="metadata"
                className="size-full object-cover"
              >
                <source src={item.src} />
              </video>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
