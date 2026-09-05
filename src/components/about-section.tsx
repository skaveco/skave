import type { Dictionary } from "@/app/[lang]/dictionaries";
import { MediaReveal } from "@/components/ui/media-reveal";
import { TextAnimate } from "@/components/ui/text-animate";
import { ViewportVideo } from "@/components/ui/viewport-video";

type AboutSectionProps = {
  content: Dictionary["about"];
};

// Figma: Website Skave 3.0, node 2775:6652.
export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="bg-background-01 px-[1.25rem] py-[2.50rem] tablet:py-[5rem] text-text-01 tablet:px-[2.5rem] border-b border-divider tablet:border-b-0"
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-[3rem] tablet:gap-[5rem]">
        <header className="flex max-w-[53.3125rem] flex-col items-start gap-[0.8125rem]">
          <p className="type-label-md">{content.eyebrow}</p>
          <h2 id="about-title" className="type-body-xl">
            <TextAnimate animation="shimmer-sweep" duration={2000}>
              {content.statement}
            </TextAnimate>
          </h2>
        </header>

        <div className="grid w-full gap-[2.5rem] tablet:grid-cols-[13.3125rem_minmax(0,1fr)_minmax(0,1fr)] tablet:items-start tablet:gap-[1.5rem] desktop:grid-cols-[13.3125rem_minmax(0,1fr)_17.25rem] desktop:gap-[2.5rem]">
          <MediaReveal className="aspect-[9/16] w-full overflow-hidden bg-background-01 md:max-w-[13.3125rem]">
            <ViewportVideo
              aria-label={content.reelLabel}
              className="pointer-events-none size-full object-cover"
              loop
              muted
              playsInline
              poster="/about/about-poster.jpg"
              preload="none"
            >
              <source src="/about/about-loop.mp4" type="video/mp4" />
              {content.videoFallback}
            </ViewportVideo>
          </MediaReveal>

          <article className="min-h-full tablet:border-l border-divider pl-[0.0625rem]">
            <div className="flex flex-col gap-[1rem] desktop:sticky desktop:top-[5rem]">
              <h3 className="type-label-md">{content.approach.title}</h3>
              <p className="type-body-base text-text-02">
                <TextAnimate animation="shimmer-sweep" delay={200} duration={500}>
                  {content.approach.description}
                </TextAnimate>
              </p>
            </div>
          </article>

          <article className="min-h-full tablet:border-l border-divider pl-[0.0625rem] tablet:sticky tablet:top-[5rem]">
            <div className="flex flex-col gap-[1rem] desktop:sticky desktop:top-[5rem]">
              <h3 className="type-label-md">{content.value.title}</h3>
              <p className="type-body-base text-text-02">
                <TextAnimate animation="shimmer-sweep" delay={400} duration={500}>
                  {content.value.description}
                </TextAnimate>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
