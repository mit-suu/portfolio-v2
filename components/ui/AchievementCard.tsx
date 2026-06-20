import type { Achievement } from "@/types/portfolio";

type AchievementCardProps = {
  achievement: Achievement;
};

export function AchievementCard({ achievement }: AchievementCardProps) {
  const Icon = achievement.icon;

  return (
    <article className="card-surface rounded-lg p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-outline-variant bg-surface-container-high text-primary">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        {achievement.year ? (
          <span className="font-mono text-xs text-muted">{achievement.year}</span>
        ) : null}
      </div>
      <h3 className="text-xl font-semibold text-on-surface">{achievement.title}</h3>
      <p className="mt-3 leading-7 text-on-surface-variant">{achievement.description}</p>
    </article>
  );
}
