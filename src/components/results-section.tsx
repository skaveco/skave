import Image from "next/image";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { MediaReveal } from "@/components/ui/media-reveal";

type ResultsSectionProps = {
  content: Dictionary["results"];
};

const resultAssets = [
  {
    image: "/results/doutor-sim-award.png",
    logo: "dr-sim",
  },
  {
    image: "/results/leads2b-event.png",
    logo: "leads2b",
  },
  {
    image: "/results/doutor-sim-award.png",
    logo: "dr-sim-wide",
  },
] as const;

function ResultLogo({ logo }: { logo: (typeof resultAssets)[number]["logo"] }) {
  if (logo === "leads2b") {
    return (
      <div className="flex h-[1.4375rem] w-[6rem] items-center gap-[0.36rem]">
        <Image
          src="/results/leads2b-mark.svg"
          alt=""
          width={22}
          height={21}
          className="h-[1.3046rem] w-[1.3186rem]"
        />
        <Image
          src="/results/leads2b-wordmark.svg"
          alt="Leads2b"
          width={70}
          height={13}
          className="h-[0.8054rem] w-[4.3215rem]"
        />
      </div>
    );
  }

  const isWide = logo === "dr-sim-wide";

  return (
    <Image
      src={isWide ? "/results/dr-sim-wide.svg" : "/results/dr-sim.svg"}
      alt="Dr.Sim"
      width={isWide ? 98 : 89}
      height={isWide ? 26 : 24}
      className={isWide ? "h-[1.625rem] w-[6.1176rem]" : "h-[1.4775rem] w-[5.5625rem]"}
    />
  );
}

// Figma: Website Skave 3.0, node 2775:6740.
export function ResultsSection({ content }: ResultsSectionProps) {
  return (
    <section
      id="resultados"
      aria-labelledby="results-title"
      className="bg-background-01 px-[1.25rem] py-[5rem] text-text-01 tablet:px-[2.5rem]"
    >
      <div className="mx-auto grid w-full max-w-[86rem] gap-[5rem] desktop:grid-cols-[14.375rem_minmax(0,1fr)]">
        <header className="flex flex-col items-start gap-[0.5rem] desktop:sticky desktop:top-[5rem] desktop:self-start">
          <h2 id="results-title" className="type-label-md">
            {content.eyebrow}
          </h2>
          <p className="type-body-base max-w-[14.375rem]">{content.description}</p>
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
                  className="relative aspect-square w-full overflow-hidden bg-background-02"
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
                  <p className="type-body-sm text-text-02">{card.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
