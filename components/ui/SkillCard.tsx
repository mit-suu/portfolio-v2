"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SkillCategory } from "@/types/portfolio";

type SkillCardProps = {
  skill: SkillCategory;
  index: number;
};

export function SkillCard({ skill, index }: SkillCardProps) {
  const Icon = skill.icon;
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="skill-card"
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Glow accent on hover */}
      <div className="skill-card__glow" />

      {/* Top accent line */}
      <div className="skill-card__accent" />

      <div className="skill-card__content">
        {/* Icon + Title header */}
        <div className="skill-card__header">
          <div className="skill-card__icon-wrap">
            <Icon className="skill-card__icon" aria-hidden="true" />
          </div>
          <div className="skill-card__title-area">
            <h3 className="skill-card__title">{skill.title}</h3>
            <span className="skill-card__count">
              {skill.items.length} {skill.items.length === 1 ? "skill" : "skills"}
            </span>
          </div>
        </div>

        {/* Skill items as interactive pills */}
        <div className="skill-card__items">
          {skill.items.map((item, i) => (
            <motion.span
              key={item}
              className="skill-pill"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              whileInView={
                reduceMotion
                  ? undefined
                  : { opacity: 1, scale: 1 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: index * 0.1 + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="skill-pill__dot" />
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
