import { skills } from "@/constants/skills";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/ui/SkillCard";

export function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading>Skills</SectionHeading>
      <div className="grid gap-5 md:grid-cols-2">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </SectionWrapper>
  );
}
