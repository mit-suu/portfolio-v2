"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { FaGithub } from "react-icons/fa";
import type { Project } from "@/types/portfolio";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [failedImages, setFailedImages] = useState<string[]>([]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  const modal = (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
          role="presentation"
        >
          <motion.article
            className="relative max-h-[90vh] w-[95%] max-w-6xl overflow-y-auto rounded-xl border border-outline-variant bg-surface-container-low px-6 py-8 shadow-2xl shadow-black/70 outline-none sm:px-10 lg:px-14"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-7 top-7 z-10 text-4xl font-bold leading-none text-on-surface-variant transition hover:text-primary"
              aria-label="Close"
            >
              ×
            </button>

            <div className="mb-8 text-center">
              <h2 id="project-modal-title" className="text-4xl font-bold text-on-surface">
                {project.detailTitle}
              </h2>
            </div>

            <div className="group flex h-[300px] gap-2 overflow-hidden bg-surface-container-low">
              {project.images.map((src, index) => {
                const failed = failedImages.includes(src);

                return (
                  <div
                    key={src}
                    className="relative h-full flex-1 cursor-pointer overflow-hidden rounded-xl bg-surface-container-low transition-all duration-500 ease-in-out group-hover:grayscale group-hover:contrast-75 hover:!flex-[3] hover:!grayscale-0 hover:!contrast-100"
                  >
                    {failed ? (
                      <div
                        className="grid h-full w-full place-items-center rounded-xl bg-surface-container-low p-4 text-center"
                        style={{
                          transform: index % 2 === 0 ? "translateY(20px)" : "translateY(-20px)",
                        }}
                      >
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                            {src}
                          </p>
                          <p className="mt-2 text-xs text-on-surface-variant">
                            Add this image later.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        className="relative h-full w-full rounded-xl bg-surface-container-low"
                        style={{
                          transform: index % 2 === 0 ? "translateY(20px)" : "translateY(-20px)",
                        }}
                      >
                        <Image
                          src={src}
                          alt={`${project.name} gallery ${index + 1}`}
                          fill
                          sizes="(min-width: 1024px) 18vw, 80vw"
                          className="rounded-xl object-cover"
                          onError={() => setFailedImages((current) => [...current, src])}
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="mb-14 mt-5 leading-7 text-on-surface-variant">{project.description}</p>

            <div className="flex flex-wrap gap-4 pr-0 sm:pr-48">
              {project.techStack.map((tag) => (
                <span
                  key={tag}
                  className="cursor-default rounded-full bg-surface-container-high px-4 py-1 text-sm font-medium text-on-surface-variant transition hover:text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 sm:absolute sm:bottom-7 sm:right-10 sm:mt-0">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 font-medium text-primary shadow-md shadow-black/20 transition hover:bg-primary/15"
                >
                  <FaGithub className="size-5" aria-hidden="true" />
                  GitHub
                </a>
              ) : null}
              {project.liveDemoUrl ? (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-on-primary shadow-lg shadow-primary/20 transition hover:bg-[#d8e2ff] hover:shadow-primary/30"
                >
                  <ExternalLink className="size-5" aria-hidden="true" />
                  Live
                </a>
              ) : null}
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(modal, document.body);
}
