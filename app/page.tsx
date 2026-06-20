import { MainContent } from "@/components/layout/MainContent";
import { PortfolioShell } from "@/components/layout/PortfolioShell";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AboutSection } from "@/components/sections/AboutSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export default function Home() {
  return (
    <PortfolioShell>
      <MainContent>
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
        <SiteFooter />
      </MainContent>
    </PortfolioShell>
  );
}
