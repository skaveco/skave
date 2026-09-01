"use client";

import { motion, useReducedMotion } from "motion/react";

type StaggeredListProps = {
  items: string[];
};

export function StaggeredList({ items }: StaggeredListProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.ul
      className="w-full"
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
      {items.map((item) => (
        <motion.li
          key={item}
          className="type-body-base mb-[0.875rem] border-b border-divider pb-[0.875rem] last:mb-0"
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
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
