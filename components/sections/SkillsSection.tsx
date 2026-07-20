"use client";

import { skills } from "@/constants/skills";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/ui/SkillCard";

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading>Skills</SectionHeading>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <SkillCard key={skill.id} skill={skill} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
