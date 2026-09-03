import type { Dictionary } from "@/app/[lang]/dictionaries";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TextAnimate } from "@/components/ui/text-animate";

type NumbersSectionProps = {
  content: Dictionary["numbers"];
};

// Figma: Website Skave 3.0, node 2745:66.
export function NumbersSection({ content }: NumbersSectionProps) {
  return (
    <section
      id="numeros"
      aria-label={content.label}
      className="relative bg-background-01 px-[1.25rem] py-[2.50rem] tablet:py-[5rem] text-text-01 tablet:px-[2.5rem] border-b border-divider tablet:border-b-0"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[86rem] flex-col">
        {content.items.map((item) => (
          <article
            key={item.title}
            className="flex min-w-0 flex-col gap-[1.5rem] border-divider py-[1.75rem] first:pt-0 last:pb-0 [&:not(:first-child)]:border-t tablet:flex-row tablet:items-end tablet:justify-between desktop:grid desktop:grid-cols-[17.5rem_25.375rem_minmax(0,1fr)_13.5625rem] desktop:items-center desktop:gap-0"
          >
            <div className="flex flex-col items-start gap-[1.5rem] desktop:contents">
              <h2 className="type-body-xl desktop:col-start-1 desktop:row-start-1">
                <TextAnimate
                  animation="shimmer-sweep"
                  duration={1000}
                  delay={0}
                >
                  {item.title}
                </TextAnimate>
              </h2>

              <NumberTicker
                value={item.value}
                prefix="+"
                replayOnHover
                className="type-display-md text-primary tabular-nums desktop:col-start-2 desktop:row-start-1 desktop:justify-self-stretch desktop:text-center"
              />
            </div>

            <p className="type-body-base tablet:max-w-[13.5625rem] text-text-02 desktop:col-start-4 desktop:row-start-1">
              <TextAnimate
                animation="shimmer-sweep"
                duration={1000}
                delay={0}
              >
                {item.description}
              </TextAnimate>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
