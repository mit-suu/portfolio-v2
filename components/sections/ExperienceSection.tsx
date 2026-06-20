import { experiences } from "@/constants/experiences";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceCard } from "@/components/ui/ExperienceCard";

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading>Experience</SectionHeading>
      <div className="space-y-8">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </SectionWrapper>
  );
}
