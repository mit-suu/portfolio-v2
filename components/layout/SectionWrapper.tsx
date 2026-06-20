"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type SectionWrapperProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={`scroll-mt-24 ${className}`}
      data-section
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.18 }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  );
}
