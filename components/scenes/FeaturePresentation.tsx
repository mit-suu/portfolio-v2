"use client";

import { useCallback, useRef, useState } from "react";
import { Poster } from "@/components/cinema/Poster";
import { ScreeningRoom } from "@/components/cinema/ScreeningRoom";
import { profile } from "@/constants/profile";
import { projects } from "@/constants/projects";
import { countUp, formatCount, gsap, MOTION_QUERIES, type MotionConditions, useGSAP } from "@/lib/gsap";
import type { Project } from "@/types/portfolio";

export function FeaturePresentation() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [screening, setScreening] = useState<Project | null>(null);
  const closeScreening = useCallback(() => setScreening(null), []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES, (context) => {
        const { desktop, mobile } = context.conditions as MotionConditions;
        if (!desktop && !mobile) return;

        const counters = gsap.utils.toArray<HTMLElement>(".film__count");
        counters.forEach((el) => (el.textContent = formatCount({ ...JSON.parse(el.dataset.metric!), value: 0 })));

        if (mobile) {
          gsap.utils.toArray<HTMLElement>(".film").forEach((film) => {
            gsap.from(film, { y: 60, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: film, start: "top 85%" } });
            film.querySelectorAll<HTMLElement>(".film__count").forEach((el) =>
              countUp(el, JSON.parse(el.dataset.metric!), { scrollTrigger: { trigger: el, start: "top 90%" } }),
            );
          });
          return;
        }

        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth;

        // The reel: vertical scroll drives the film strip sideways through the projector gate.
        const reel = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".reel",
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Sprocket holes travel with the film, not the camera.
        gsap.to(".reel__sprockets", {
          backgroundPositionX: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: ".reel", start: "top top", end: () => `+=${distance()}`, scrub: 1, invalidateOnRefresh: true },
        });

        gsap.to(".reel__progress-fill", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".reel", start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        // Title card: "FEATURE PRESENTATION" squeezes past like a widescreen lens.
        gsap.to(".reel__titlecard-word", {
          xPercent: (i) => (i % 2 ? 30 : -30),
          ease: "none",
          scrollTrigger: { trigger: ".reel__titlecard", containerAnimation: reel, start: "left left", end: "right left", scrub: true },
        });

        gsap.utils.toArray<HTMLElement>(".film").forEach((film) => {
          const shared = { trigger: film, containerAnimation: reel };

          gsap.fromTo(
            film.querySelector(".poster-stage"),
            { xPercent: 18, rotateY: -18 },
            { xPercent: -10, rotateY: 8, ease: "none", scrollTrigger: { ...shared, start: "left right", end: "right left", scrub: true } },
          );

          gsap.from(film.querySelectorAll(".film__reveal"), {
            x: 80,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { ...shared, start: "left 70%" },
          });

          film.querySelectorAll<HTMLElement>(".film__count").forEach((el) =>
            countUp(el, JSON.parse(el.dataset.metric!), { scrollTrigger: { ...shared, start: "left 55%" } }),
          );
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="feature" className="feature">
      <div className="reel">
        <div className="reel__sprockets reel__sprockets--top" aria-hidden="true" />

        <div ref={trackRef} className="reel__track">
          <div className="reel__titlecard">
            <p className="reel__titlecard-kicker">Scene 03 · Now showing</p>
            <p className="reel__titlecard-word">Feature</p>
            <p className="reel__titlecard-word reel__titlecard-word--outline">Presentation</p>
            <p className="reel__titlecard-note">
              {projects.length} productions · 2026 · Team Leader on every one
              <span aria-hidden="true"> →</span>
            </p>
          </div>

          {projects.map((project, i) => (
            <article key={project.id} className="film" style={{ "--accent": project.palette[0] } as React.CSSProperties}>
              <button
                type="button"
                className="film__poster-button"
                onClick={() => setScreening(project)}
                data-cursor="Screen"
                aria-label={`Open ${project.name} details`}
              >
                <Poster project={project} />
              </button>

              <div className="film__info">
                <p className="film__index film__reveal">
                  Feature {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  <span>{project.genre}</span>
                </p>
                <h3 className="film__title film__reveal">{project.name}</h3>
                <p className="film__tagline film__reveal">{project.tagline}</p>
                <p className="film__logline film__reveal">{project.logline}</p>

                <dl className="film__metrics film__reveal">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="film__count" data-metric={JSON.stringify(metric)}>
                        {formatCount(metric)}
                      </dt>
                      <dd>{metric.label}</dd>
                    </div>
                  ))}
                </dl>

                <p className="film__credit film__reveal">
                  <span>{project.role}</span>
                  <span>{project.period}</span>
                </p>

                <div className="film__actions film__reveal">
                  <button type="button" className="btn btn--solid" onClick={() => setScreening(project)} data-magnetic>
                    <span aria-hidden="true">▶</span> Watch the cut
                  </button>
                  {project.liveDemoUrl ? (
                    <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="btn" data-magnetic>
                      Live ↗
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn" data-magnetic>
                      Source ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}

          <div className="reel__endcard">
            <p className="reel__endcard-kicker">Coming soon</p>
            <p className="reel__endcard-title">More reels in the vault</p>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn" data-magnetic data-cursor="Vault">
              github.com/mit-suu ↗
            </a>
          </div>
        </div>

        <div className="reel__sprockets reel__sprockets--bottom" aria-hidden="true" />
        <div className="reel__progress" aria-hidden="true">
          <span className="reel__progress-fill" />
        </div>
      </div>

      <ScreeningRoom project={screening} onClose={closeScreening} />
    </section>
  );
}
