import type { Dictionary } from "@/app/[lang]/dictionaries";
import { FaqAccordionList } from "@/components/project/faq-accordion-list";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import { localePath, type Locale } from "@/lib/i18n";

type FaqSectionProps = {
  content: Dictionary["projectsFaq"];
  lang: Locale;
};

// Figma: Website Skave 3.0, node 2910:458.
export function FaqSection({ content, lang }: FaqSectionProps) {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-background-01 px-[1.25rem] py-[2.5rem] text-text-01 tablet:px-[2.5rem] tablet:py-[5rem]"
    >
      <div className="mx-auto grid w-full max-w-[86rem] gap-[2.5rem] desktop:grid-cols-[minmax(0,1fr)_minmax(0,38.875rem)] desktop:gap-[4rem]">
        <div className="flex flex-col items-start gap-[2.125rem] desktop:sticky desktop:top-[calc(var(--header-height)+2.5rem)] desktop:self-start">
          <header className="flex max-w-[20.875rem] flex-col items-start gap-[0.5rem]">
            <p className="type-label-md">{content.eyebrow}</p>
            <h2 id="faq-title" className="type-body-xl">
              <TextAnimate
                animation="shimmer-sweep"
                duration={1000}
                delay={0}
              >
                {content.title}
              </TextAnimate>
            </h2>
          </header>

          <Button
            href={localePath("#contato", lang)}
            icon="arrow-long-right"
            iconSize="1.25rem"
            fontSize="0.875rem"
            gap="0.5rem"
          >
            {content.cta}
          </Button>
        </div>

        <FaqAccordionList items={content.items} />
      </div>
    </section>
  );
}
