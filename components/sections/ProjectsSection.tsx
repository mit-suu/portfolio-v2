"use client";

import { useState } from "react";
import { projects } from "@/constants/projects";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectModal } from "@/components/ui/ProjectModal";
import type { Project } from "@/types/portfolio";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = projects.filter((project) => project.featured);
  const standardProjects = projects.filter((project) => !project.featured);

  return (
    <>
      <SectionWrapper id="projects">
        <SectionHeading>Projects</SectionHeading>
        <div className="space-y-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpenDetails={setSelectedProject} />
          ))}
          <div className="space-y-6">
            {standardProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpenDetails={setSelectedProject} />
            ))}
          </div>
        </div>
      </SectionWrapper>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
