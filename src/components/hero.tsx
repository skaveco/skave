"use client";


import type { Dictionary } from "@/app/[lang]/dictionaries";
import { HeroClock } from "@/components/hero-clock";
import { HeroMedia } from "@/components/hero-media";
import { Button } from "@/components/ui/button";
import { localePath, type Locale } from "@/lib/i18n";

type HeroProps = {
  content: Dictionary["hero"];
  lang: Locale;
};

export function Hero({ content, lang }: HeroProps) {
  return (
    <section
      id="inicio"
      className="h-screen px-5 pt-[5rem] pb-[2.5rem] text-text-01 tablet:px-10"
    >
      <div className="mx-auto flex h-full w-full max-w-[86rem] flex-col justify-between">
        <HeroMedia
          playVideoLabel={content.playVideo}
          closeVideoLabel={content.closeVideo}
        />

        <div className="flex w-full flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[27.375rem] flex-col items-start gap-[1.625rem]">
            <h1 className="type-body-lg whitespace-pre-line">{content.statement}</h1>
            <Button
              href={localePath("#contato", lang)}
              icon="arrow-long-right"
            >
              {content.cta}
            </Button>
          </div>

          <div className="type-body-base flex flex-col items-start text-left uppercase md:items-end md:text-right">
            <HeroClock label={content.location} locale={lang} />
            <span>{content.explore}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
