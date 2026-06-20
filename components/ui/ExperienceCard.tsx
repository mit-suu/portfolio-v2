import type { Experience } from "@/types/portfolio";
import { TechBadge } from "./TechBadge";

type ExperienceCardProps = {
  experience: Experience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="relative pb-4 pl-9">
      <div className="absolute left-[5px] top-6 bottom-0 w-px bg-surface-container-highest" />
      <div className="absolute left-0 top-2 size-3 rounded-full bg-primary shadow-[0_0_18px_var(--primary)]" />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
        <h3 className="text-2xl font-semibold text-on-surface">{experience.role}</h3>
        <span className="font-mono text-sm text-primary">{experience.company}</span>
      </div>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {experience.period} / {experience.location} / {experience.workMode} / {experience.type}
      </p>
      <ul className="mt-5 space-y-3">
        {experience.description.map((item) => (
          <li key={item} className="flex gap-3 leading-7 text-on-surface-variant">
            <span className="mt-3 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2">
        {experience.technologies.map((tech) => (
          <TechBadge key={tech} subtle>
            {tech}
          </TechBadge>
        ))}
      </div>
    </article>
  );
}
