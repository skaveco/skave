import type { Dictionary } from "@/app/[lang]/dictionaries";
import { StaggeredList } from "@/components/ui/staggered-list";

type CapabilitiesSectionProps = {
  content: Dictionary["capabilities"];
};

// Figma: Website Skave 3.0, node 2765:506.
export function CapabilitiesSection({ content }: CapabilitiesSectionProps) {
  return (
    <section
      id="servicos"
      aria-labelledby="capabilities-title"
      className="bg-background-01 px-[1.25rem] py-[1.25rem] tablet:py-[5rem] text-text-01 tablet:px-[2.5rem]"
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-[2.5rem] tablet:gap-[5rem]">
        <header className="flex max-w-[49.375rem] flex-col items-start gap-[0.5rem]">
          <p className="type-label-md">{content.eyebrow}</p>
          <h2 id="capabilities-title" className="type-body-xl">
            {content.title}
          </h2>
        </header>

        <div className="grid w-full gap-[2.5rem] tablet:grid-cols-3">
          {content.groups.map((group) => (
            <article
              key={group.title}
              className="flex min-w-0 flex-col items-start gap-[1.75rem]"
            >
              <h3 className="type-label-md uppercase">{group.title}</h3>
              <StaggeredList items={group.items} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
