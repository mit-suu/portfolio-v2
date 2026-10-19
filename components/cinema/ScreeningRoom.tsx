"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/types/portfolio";
import { useCinema } from "./CinemaProvider";
import { Poster } from "./Poster";

type ScreeningRoomProps = {
  project: Project | null;
  onClose: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/** Full-screen "screening" of one project: stills on a film strip, the highlights, and the links. */
export function ScreeningRoom({ project, onClose }: ScreeningRoomProps) {
  const { lockScroll } = useCinema();

  useEffect(() => {
    if (!project) return;
    lockScroll(true);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, lockScroll]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.id}
          className="screening"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} — details`}
          initial={{ clipPath: "inset(50% 0% 50% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(50% 0% 50% 0%)" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="screening__scroll" data-lenis-prevent>
            <header className="screening__header">
              <span className="screening__now">
                <i aria-hidden="true" /> Now screening
              </span>
              <button type="button" className="screening__close" onClick={onClose} data-cursor="Close" autoFocus>
                Close <kbd>Esc</kbd>
              </button>
            </header>

            <motion.div
              className="screening__body"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.9, ease: EASE }}
            >
              <div className="screening__intro">
                <p className="screening__genre">
                  {project.genre} · {project.period}
                </p>
                <h2 className="screening__title">{project.name}</h2>
                <p className="screening__tagline">{project.tagline}</p>
                <p className="screening__logline">{project.logline}</p>
                <div className="screening__links">
                  {project.liveDemoUrl ? (
                    <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="btn btn--solid" data-magnetic>
                      Watch live ↗
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn" data-magnetic>
                      Source code ↗
                    </a>
                  ) : null}
                </div>
              </div>

              {project.images?.length ? (
                <div className="screening__strip" data-lenis-prevent>
                  {project.images.map((src, i) => (
                    <figure key={src} className="screening__still">
                      <Image src={src} alt={`${project.name} screenshot ${i + 1}`} fill sizes="(min-width: 768px) 60vw, 90vw" loading="eager" />
                      <figcaption>
                        Still {String(i + 1).padStart(2, "0")} / {String(project.images!.length).padStart(2, "0")}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="screening__poster">
                  <Poster project={project} sizes="(min-width: 768px) 30vw, 80vw" />
                </div>
              )}

              <div className="screening__notes">
                <section>
                  <h3>Behind the scenes</h3>
                  <ol>
                    {project.highlights.map((line, i) => (
                      <li key={i}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        {line}
                      </li>
                    ))}
                  </ol>
                </section>
                <section>
                  <h3>Cast &amp; crew</h3>
                  <p className="screening__role">{project.role}</p>
                  <ul className="chips">
                    {project.techStack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
