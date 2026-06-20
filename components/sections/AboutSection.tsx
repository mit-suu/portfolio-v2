import { aboutParagraphs } from "@/constants/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeading>About</SectionHeading>
      <div className="space-y-6 text-lg leading-8 text-on-surface-variant">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </SectionWrapper>
  );
}
