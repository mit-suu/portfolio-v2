import { achievements } from "@/constants/achievements";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementCard } from "@/components/ui/AchievementCard";

export function AchievementsSection() {
  return (
    <SectionWrapper id="achievements">
      <SectionHeading>Achievements</SectionHeading>
      <div className="grid gap-5 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </SectionWrapper>
  );
}
