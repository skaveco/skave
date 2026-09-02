import type { Dictionary } from "@/app/[lang]/dictionaries";
import { MediaReveal } from "@/components/ui/media-reveal";

type AboutSectionProps = {
  content: Dictionary["about"];
};

// Figma: Website Skave 3.0, node 2775:6652.
export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="bg-background-01 px-[1.25rem] py-[1.25rem] tablet:py-[5rem] text-text-01 tablet:px-[2.5rem]"
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-[3rem] tablet:gap-[5rem]">
        <header className="flex max-w-[53.3125rem] flex-col items-start gap-[0.8125rem]">
          <p className="type-label-md">{content.eyebrow}</p>
          <h2 id="about-title" className="type-body-xl">
            {content.statement}
          </h2>
        </header>

        <div className="grid w-full gap-[2.5rem] tablet:grid-cols-[13.3125rem_minmax(0,1fr)_minmax(0,1fr)] tablet:items-start tablet:gap-[1.5rem] desktop:grid-cols-[13.3125rem_minmax(0,1fr)_17.25rem] desktop:gap-[2.5rem]">
          <MediaReveal className="aspect-[9/16] w-full overflow-hidden bg-background-02 md:max-w-[13.3125rem]">
            <video
              aria-label={content.reelLabel}
              className="size-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster="/hero/video-poster.jpg"
              preload="metadata"
            >
              <source src="/hero/hero-loop.mp4" type="video/mp4" />
              {content.videoFallback}
            </video>
          </MediaReveal>

          <article className="min-h-full border-l border-divider pl-[0.0625rem]">
            <div className="flex flex-col gap-[1rem] desktop:sticky desktop:top-[5rem]">
              <h3 className="type-label-md">{content.approach.title}</h3>
              <p className="type-body-base text-text-02">
                {content.approach.description}
              </p>
            </div>
          </article>

          <article className="min-h-full border-l border-divider pl-[0.0625rem] tablet:sticky tablet:top-[5rem]">
            <div className="flex flex-col gap-[1rem] desktop:sticky desktop:top-[5rem]">
              <h3 className="type-label-md">{content.value.title}</h3>
              <p className="type-body-base text-text-02">
                {content.value.description}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
