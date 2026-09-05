import Image from "next/image";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { MediaReveal } from "@/components/ui/media-reveal";
import { TextAnimate } from "@/components/ui/text-animate";

type ResultsSectionProps = {
  content: Dictionary["results"];
};

const resultAssets = [
  {
    image: "/results/Representante da Leads2b.jpeg",
    logo: "leads2b",
  },
  {
    image: "/results/Representante da Dr.Sim recebendo prêmio.jpg",
    logo: "dr-sim",
  },
  {
    image: "/results/Representante da Setfin em evento.jpg",
    logo: "setfin",
  },
] as const;

function LogoMask({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 bg-current ${className}`}
      style={{
        maskImage: `url("${src}")`,
        maskSize: "contain",
        maskPosition: "center",
        maskRepeat: "no-repeat",
      }}
    />
  );
}

function ResultLogo({ logo }: { logo: (typeof resultAssets)[number]["logo"] }) {
  if (logo === "leads2b") {
    return (
      <div
        role="img"
        aria-label="Leads2b"
        className="flex h-[1.4375rem] w-[6rem] items-center gap-[0.36rem] text-text-01"
      >
        <LogoMask
          src="/results/leads2b-mark.svg"
          className="h-[1.3046rem] w-[1.3186rem]"
        />
        <LogoMask
          src="/results/leads2b-wordmark.svg"
          className="h-[0.8054rem] w-[4.3215rem]"
        />
      </div>
    );
  }

  const isSetfin = logo === "setfin";

  return (
    <div role="img" aria-label={isSetfin ? "Setfin" : "Dr.Sim"} className="text-text-01">
      <LogoMask
        src={isSetfin ? "/results/logo-setfin.svg" : "/results/dr-sim.svg"}
        className={isSetfin ? "aspect-[202/44] w-[4.8125rem]" : "h-[1.4775rem] w-[5.5625rem]"}
      />
    </div>
  );
}

// Figma: Website Skave 3.0, node 2775:6740.
export function ResultsSection({ content }: ResultsSectionProps) {
  return (
    <section
      id="resultados"
      aria-labelledby="results-title"
      className="bg-background-01 px-[1.25rem] py-[2.50rem] tablet:py-[5rem] text-text-01 tablet:px-[2.5rem] border-b border-divider tablet:border-0"
    >
      <div className="mx-auto grid w-full max-w-[86rem] gap-[2.5rem] tablet:gap-[5rem] desktop:grid-cols-[14.375rem_minmax(0,1fr)]">
        <header className="flex flex-col items-start gap-[0.5rem] desktop:sticky desktop:top-[5rem] desktop:self-start">
          <h2 id="results-title" className="type-label-md">
            {content.eyebrow}
          </h2>
          <p className="type-body-base max-w-[14.375rem]">
            <TextAnimate
              animation="shimmer-sweep"
              duration={500}
              delay={0}
            >
              {content.description}
            </TextAnimate>
          </p>
        </header>

        <div className="grid gap-[2.5rem] tablet:grid-cols-3 tablet:gap-[1.25rem]">
          {content.cards.map((card, index) => {
            const asset = resultAssets[index];
            if (!asset) return null;

            return (
              <article
                key={`${card.imageAlt}-${index}`}
                className="flex min-w-0 flex-col items-start gap-[2.5rem] border-l border-divider tablet:gap-[2.5rem] desktop:gap-[4rem]"
              >
                <MediaReveal
                  delay={index * 180}
                  className="relative aspect-square w-full overflow-hidden bg-background-01"
                >
                  <Image
                    src={asset.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(min-width: 68.75rem) 14rem, (min-width: 48rem) 30vw, 100vw"
                    className="object-cover"
                  />
                </MediaReveal>

                <div className="flex w-full flex-col items-start gap-[1.375rem]">
                  <ResultLogo logo={asset.logo} />
                  <p className="type-body-sm text-text-02">
                    <TextAnimate
                      animation="shimmer-sweep"
                      duration={500}
                      delay={(index + 1) * 100}
                    >
                      {card.description}
                    </TextAnimate>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
