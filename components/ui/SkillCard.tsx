import type { SkillCategory } from "@/types/portfolio";
import { TechBadge } from "./TechBadge";

type SkillCardProps = {
  skill: SkillCategory;
};

export function SkillCard({ skill }: SkillCardProps) {
  const Icon = skill.icon;

  return (
    <article className="card-surface rounded-lg p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-lg border border-outline-variant bg-surface-container-high text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-semibold text-on-surface">{skill.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skill.items.map((item) => (
          <TechBadge key={item}>{item}</TechBadge>
        ))}
      </div>
    </article>
  );
}
