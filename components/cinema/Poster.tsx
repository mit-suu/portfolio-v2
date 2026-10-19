"use client";

import Image from "next/image";
import { useRef } from "react";
import { profile } from "@/constants/profile";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";

type PosterProps = {
  project: Project;
  className?: string;
  sizes?: string;
};

/**
 * A one-sheet movie poster for a project: billing above the title, the key art,
 * and the condensed billing block at the foot. Tilts toward the pointer.
 */
export function Poster({ project, className, sizes = "(min-width: 768px) 30vw, 85vw" }: PosterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [accent, ink] = project.palette;

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(ref.current, { rotationY: nx * 10, rotationX: -ny * 10, duration: 0.6, ease: "power3.out" });
    ref.current.style.setProperty("--glare-x", `${(nx + 0.5) * 100}%`);
    ref.current.style.setProperty("--glare-y", `${(ny + 0.5) * 100}%`);
  };

  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { rotationY: 0, rotationX: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <div className={cn("poster-stage", className)}>
      <div
        ref={ref}
        className="poster"
        style={{ "--accent": accent, "--ink": ink } as React.CSSProperties}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <div className="poster__art" aria-hidden="true">
          {project.imageSrc ? (
            <div className="poster__screen">
              <Image src={project.imageSrc} alt="" fill sizes={sizes} className="poster__screen-img" loading="eager" />
            </div>
          ) : (
            <div className="poster__glyph">
              <span>{project.name.slice(0, 1)}</span>
              <span>{project.name.slice(0, 1)}</span>
              <span>{project.name.slice(0, 1)}</span>
            </div>
          )}
          <div className="poster__rings">
            <i />
            <i />
            <i />
          </div>
        </div>

        <p className="poster__above">{profile.fullName.toUpperCase()}</p>
        <p className="poster__quote">“{project.tagline}”</p>

        <div className="poster__foot">
          <h4 className="poster__title">{project.name}</h4>
          <p className="poster__billing">
            A <b>{profile.fullName}</b> film · {project.role} · {project.genre} · Starring {project.techStack.slice(0, 5).join(" · ")} ·
            Music by the build pipeline · {project.period}
          </p>
        </div>

        <span className="poster__glare" aria-hidden="true" />
      </div>
    </div>
  );
}
