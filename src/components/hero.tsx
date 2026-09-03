"use client";


import type { Dictionary } from "@/app/[lang]/dictionaries";
import { HeroClock } from "@/components/hero-clock";
import { HeroMedia } from "@/components/hero-media";
import { Button } from "@/components/ui/button";
import { localePath, type Locale } from "@/lib/i18n";
import { motion, useReducedMotion } from "motion/react";

type HeroProps = {
  content: Dictionary["hero"];
  lang: Locale;
};

export function Hero({ content, lang }: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="h-screen px-5 pt-[5rem] pb-[2.5rem] text-text-01 tablet:px-10 border-b border-divider desktop: border-0"
    >
      <div className="mx-auto flex h-full w-full max-w-[86rem] flex-col justify-between">
        <HeroMedia
          playVideoLabel={content.playVideo}
          closeVideoLabel={content.closeVideo}
        />

        <div className="flex w-full flex-col gap-[1.5rem] md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[27.375rem] flex-col items-start gap-[1.5rem]">
            <motion.h1
              className="type-body-lg whitespace-pre-line"
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, x: -22, filter: "blur(8px)" }
              }
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {content.statement}
            </motion.h1>
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
