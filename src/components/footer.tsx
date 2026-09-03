"use client";

import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { type ReactNode, useRef } from "react";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { HeaderLink } from "@/components/header-link";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import { localePath, type Locale } from "@/lib/i18n";

const SKAVE_WIDTH = 1036;
const SKAVE_HEIGHT = 235.455;

const letters = [
  { src: "/hero/letters/s.svg", x: 0, y: 0, width: 195.991, height: 235.455 },
  { src: "/hero/letters/k.svg", x: 228.822, y: 3.979, width: 208.924, height: 227.496 },
  { src: "/hero/letters/a.svg", x: 429.391, y: 3.979, width: 236.118, height: 227.496 },
  { src: "/hero/letters/v.svg", x: 630.09, y: 3.979, width: 222.521, height: 227.496 },
  { src: "/hero/letters/e.svg", x: 852.279, y: 3.979, width: 183.721, height: 227.496 },
] as const;

type FooterProps = {
  content: Dictionary["footer"];
  lang: Locale;
};

const navigation = [
  ["projects", "#projetos"],
  ["solutions", "#especialidades"],
  ["about", "#sobre"],
  ["testimonials", "#depoimentos"],
] as const;

function FooterWordmark() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(wordmarkRef, { once: true, amount: 0.35 });

  return (
    <div ref={wordmarkRef} className="relative aspect-[1036/235.455] w-full">
      <div role="img" aria-label="SKAVE" className="absolute inset-0">
        {letters.map((letter, index) => (
          <div
            key={letter.src}
            className="absolute overflow-hidden"
            style={{
              left: `${(letter.x / SKAVE_WIDTH) * 100}%`,
              top: `${(letter.y / SKAVE_HEIGHT) * 100}%`,
              width: `${(letter.width / SKAVE_WIDTH) * 100}%`,
              height: `${(letter.height / SKAVE_HEIGHT) * 100}%`,
            }}
          >
            <motion.div
              className="relative size-full"
              initial={reduceMotion ? false : { y: "110%" }}
              animate={reduceMotion || isInView ? { y: 0 } : { y: "110%" }}
              transition={{
                duration: reduceMotion ? 0 : 0.68,
                delay: reduceMotion ? 0 : index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Image
                src={letter.src}
                alt=""
                fill
                unoptimized
                sizes="20vw"
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterLinkCascade({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-start gap-1"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: reduceMotion
            ? { duration: 0 }
            : { delayChildren: 0.08, staggerChildren: 0.08 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function FooterLinkCascadeItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Footer({ content, lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contato"
      className="bg-background-01 px-5 pt-16 pb-4 text-text-01 tablet:px-10"
    >
      <div className="mx-auto flex w-full max-w-[86rem] flex-col gap-[2rem]">
        <FooterWordmark />

        <div className="flex flex-col gap-14 desktop:flex-row desktop:items-start desktop:justify-between">
          <div className="flex max-w-80 flex-col items-start gap-8">
            <p className="type-body-base">
              <TextAnimate
                animation="shimmer-sweep"
                duration={1000}
                delay={0}
              >
                {content.statement}
              </TextAnimate>
            </p>
            <Button
              href="mailto:contato@skave.co"
              icon="arrow-long-right"
              fontSize="0.875rem"
              gap="0.5rem"
            >
              {content.contact}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 tablet:grid-cols-3 desktop:w-[25rem] desktop:grid-cols-[auto_8rem_auto]">
            <div className="flex flex-col items-start gap-5">
              <p className="type-label-md text-text-02">{content.explore}</p>
              <nav aria-label={content.explore}>
                <FooterLinkCascade>
                  {navigation.map(([label, anchor]) => (
                    <FooterLinkCascadeItem key={label}>
                      <HeaderLink
                        href={localePath(anchor, lang)}
                        difference={false}
                        className="!text-text-01"
                      >
                        {content.navigation[label]}
                      </HeaderLink>
                    </FooterLinkCascadeItem>
                  ))}
                </FooterLinkCascade>
              </nav>
            </div>

            <div className="flex flex-col items-start gap-5">
              <p className="type-label-md text-text-02">{content.quickContact}</p>
              <FooterLinkCascade>
                <FooterLinkCascadeItem>
                  <HeaderLink
                    href="tel:+5511999999999"
                    difference={false}
                    className="!text-text-01"
                  >
                    {content.phone}
                  </HeaderLink>
                </FooterLinkCascadeItem>
                <FooterLinkCascadeItem>
                  <HeaderLink
                    href="mailto:contato@skave.co"
                    difference={false}
                    className="!text-text-01"
                  >
                    {content.email}
                  </HeaderLink>
                </FooterLinkCascadeItem>
              </FooterLinkCascade>
            </div>

            <div className="flex flex-col items-start gap-5">
              <p className="type-label-md whitespace-nowrap text-text-02">
                {content.socialMedia}
              </p>
              <FooterLinkCascade>
                {content.socialLinks.map((label) => (
                  <FooterLinkCascadeItem key={label}>
                    <HeaderLink
                      href="#"
                      difference={false}
                      className="!text-text-01"
                    >
                      {label}
                    </HeaderLink>
                  </FooterLinkCascadeItem>
                ))}
              </FooterLinkCascade>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 border-t border-divider pt-3.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-body-sm text-text-02">
            {content.copyright.replace("{year}", String(currentYear))}
          </p>
          <button
            type="button"
            className="type-body-sm group inline-flex w-fit items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4"
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotionBehavior() })}
          >
            {content.goTop}
            <span className="flex size-5 items-center justify-center rounded-full border border-divider">
              <ArrowUpIcon aria-hidden="true" className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

function reduceMotionBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}
