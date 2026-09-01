import type { Dictionary } from "@/app/[lang]/dictionaries";
import { PartnerCard } from "@/components/partner-card";

type PartnersSectionProps = {
  content: Dictionary["partners"];
};

// Figma: Website Skave 3.0, node 2775:7193.
export function PartnersSection({ content }: PartnersSectionProps) {
  return (
    <section
      aria-labelledby="partners-title"
      className="bg-background-01 px-[1.25rem] py-[5rem] text-text-01 tablet:px-[2.5rem] desktop:py-[2.5rem]"
    >
      <div className="mx-auto grid w-full max-w-[86rem] gap-[5rem] desktop:grid-cols-[17.6875rem_minmax(0,1fr)] desktop:gap-[8.6875rem]">
        <header className="flex flex-col items-start gap-[0.5rem]">
          <h2 id="partners-title" className="type-label-md">
            {content.eyebrow}
          </h2>
          <p className="type-body-base">{content.description}</p>
        </header>

        <div className="grid gap-[2.5rem] tablet:grid-cols-2 tablet:gap-[1.25rem]">
          {content.cards.map((card, index) => (
            <PartnerCard
              key={`${card.name}-${index}`}
              name={card.name}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
