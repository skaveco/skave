"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { AccordionItem } from "@/components/ui/accordion-item";
import { TextAnimate } from "@/components/ui/text-animate";
import type { Project } from "@/data/projects";

type ProjectInfoSectionProps = {
  content: Dictionary["projectInfo"];
  project: Project;
};

type DetailProps = {
  label: string;
  children: React.ReactNode;
  withDivider?: boolean;
};

function Detail({ label, children, withDivider = true }: DetailProps) {
  return (
    <motion.div
      className={`flex flex-col gap-[0.125rem] ${withDivider ? "border-b border-divider pb-[0.75rem]" : ""}`}
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <dt className="type-label-sm text-text-02 uppercase">{label}</dt>
      <dd className="type-body-sm text-text-01">{children}</dd>
    </motion.div>
  );
}

// Figma: Website Skave 3.0, node 2784:34.
export function ProjectInfoSection({
  content,
  project,
}: ProjectInfoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const reduceMotion = useReducedMotion();
  const cascadeContainer = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { duration: 0 }
        : { delayChildren: 0.08, staggerChildren: 0.08 },
    },
  };
  const cascadeItem = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 12 },
    visible: reduceMotion
      ? {}
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="project-title"
      className="bg-background-01 px-[1.25rem] py-[2.5rem] text-text-01 tablet:px-[2.5rem]"
    >
      <div className="mx-auto grid w-full max-w-[86rem] gap-[4rem] desktop:grid-cols-[14.875rem_minmax(0,1fr)] desktop:gap-[8rem]">
        <motion.dl
          className="flex h-fit flex-col gap-[0.75rem] desktop:sticky desktop:top-[calc(var(--header-height)+2.5rem)]"
          initial={reduceMotion ? false : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          variants={cascadeContainer}
        >
          <Detail label={content.segment}>{project.segment}</Detail>
          <Detail label={content.date}>{project.publishedAt}</Detail>
          <Detail label={content.services}>
            <span className="flex flex-wrap items-center gap-x-[0.75rem] gap-y-[0.25rem]">
              {project.services.map((service, index) => (
                <span key={service} className="contents">
                  {index > 0 && (
                    <span aria-hidden="true" className="size-[0.25rem] rounded-full bg-text-01" />
                  )}
                  <span>{service}</span>
                </span>
              ))}
            </span>
          </Detail>
          <Detail label={content.location} withDivider={false}>
            {project.location}
          </Detail>
        </motion.dl>

        <div className="flex min-w-0 flex-col gap-[1.5rem]">
          <h1 id="project-title" className="type-body-xl">
            <TextAnimate
              active={isInView}
              animation="shimmer-sweep"
              delay={0}
            >
              {project.title}
            </TextAnimate>
          </h1>

          <p className="type-body-base text-text-02">
            <TextAnimate
              active={isInView}
              animation="shimmer-sweep"
              delay={200}
            >
              {project.description}
            </TextAnimate>
          </p>

          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate={isInView ? "visible" : "hidden"}
            variants={cascadeContainer}
          >
            <motion.div variants={cascadeItem}>
              <AccordionItem
                question={content.challenge}
                answer={<p>{project.challenge}</p>}
              />
            </motion.div>
            <motion.div variants={cascadeItem}>
              <AccordionItem
                question={content.solution}
                answer={<p>{project.solution}</p>}
              />
            </motion.div>
            <motion.div variants={cascadeItem}>
              <AccordionItem
                question={content.capabilities}
                answer={
                  <ul className="flex flex-col gap-[0.25rem]">
                    {project.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                }
              />
            </motion.div>
            <motion.div variants={cascadeItem}>
              <AccordionItem
                question={content.credits}
                answer={
                  <dl>
                    {project.credits.map((credit) => (
                      <div
                        key={credit.role}
                        className="flex flex-wrap gap-x-[0.25rem]"
                      >
                        <dt>{credit.role}:</dt>
                        <dd>{credit.names.join(", ")}</dd>
                      </div>
                    ))}
                  </dl>
                }
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
