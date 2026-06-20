"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/types/portfolio";

type ProjectCardProps = {
  project: Project;
  onOpenDetails: (project: Project) => void;
};

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const isFeatured = project.featured;
  const coverImage = project.imageSrc;

  return (
    <article
      className="project-item-card group relative z-10 flex cursor-pointer flex-col gap-6 rounded-[25px] px-[10px] py-8 md:flex-row"
      onClick={() => onOpenDetails(project)}
      tabIndex={0}
      role="button"
      aria-label={`Open ${project.name} details`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenDetails(project);
        }
      }}
    >
      <div className="flex shrink-0 flex-col items-start pl-5 md:w-[241px]">
        <div className="mb-4 flex items-center gap-3">
          <h3 className="text-2xl font-medium text-on-surface-variant group-hover:text-primary">
            {project.year}
          </h3>
          {isFeatured ? (
            <span className="rounded-full border border-primary/40 bg-surface-container-high px-3 py-1 text-xs font-semibold text-primary shadow-sm shadow-black/20">
              Featured
            </span>
          ) : null}
        </div>
        <div className="relative h-[130px] w-[201px] overflow-hidden rounded-lg border-[3px] border-outline-variant bg-black shadow-lg shadow-black/40 group-hover:border-primary/70">
          <Image
            src={coverImage}
            alt={project.name}
            fill
            sizes="201px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="ml-0 flex min-w-0 flex-1 flex-col justify-between md:ml-2">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <h2 className="text-2xl font-semibold text-on-surface">{project.name}</h2>
              <ExternalLink
                className="size-6 shrink-0 text-primary opacity-0 group-hover:opacity-90"
                aria-hidden="true"
              />
            </div>
            <p className="max-w-[18rem] shrink-0 whitespace-nowrap text-right font-mono text-[11px] uppercase tracking-[0.08em] text-primary font-bold pr-2 py-2">
              {project.role}
            </p>
          </div>
          <p className="mt-1 text-sm font-medium text-on-surface-variant group-hover:text-primary">{project.subtitle}</p>
          
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.techStack.map((tag) => (
            <span
              key={tag}
              className="cursor-default rounded-full border border-outline-variant bg-black/25 px-4 py-1 text-sm font-medium text-on-surface-variant hover:border-primary/60 hover:text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
