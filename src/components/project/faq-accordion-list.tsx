"use client";

import { motion, useReducedMotion } from "motion/react";

import type { Dictionary } from "@/app/[lang]/dictionaries";
import { AccordionItem } from "@/components/ui/accordion-item";

type FaqAccordionListProps = {
  items: Dictionary["projectsFaq"]["items"];
};

export function FaqAccordionList({ items }: FaqAccordionListProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
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
      {items.map((item, index) => (
        <motion.div
          key={item.question}
          variants={{
            hidden: reduceMotion ? {} : { opacity: 0, y: 12 },
            visible: reduceMotion
              ? {}
              : {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
          }}
        >
          <AccordionItem
            question={item.question}
            answer={item.answer}
            defaultOpen={index === 0}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
