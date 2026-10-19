"use client";

import { useRef } from "react";
import { SceneSlate } from "@/components/cinema/SceneSlate";
import { experiences } from "@/constants/experiences";
import { gsap, useGSAP } from "@/lib/gsap";

const ROMAN = ["I", "II", "III", "IV", "V"];

export function Acts() {
  const rootRef = useRef<HTMLElement>(null);
  // Told in order: the story starts at the earliest role.
  const chronological = [...experiences].reverse();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".act").forEach((act, i) => {
          // The company name drifts across the back of the set.
          gsap.fromTo(
            act.querySelector(".act__backdrop"),
            { xPercent: i % 2 ? -30 : 10 },
            { xPercent: i % 2 ? 10 : -30, ease: "none", scrollTrigger: { trigger: act, start: "top bottom", end: "bottom top", scrub: true } },
          );

          const tl = gsap.timeline({ scrollTrigger: { trigger: act, start: "top 72%" } });
          tl.from(act.querySelector(".act__number"), { yPercent: 100, autoAlpha: 0, duration: 1.2, ease: "expo.out" })
            .from(act.querySelector(".act__card"), { clipPath: "inset(0 100% 0 0)", duration: 1.3, ease: "expo.inOut" }, 0.1)
            .from(act.querySelectorAll(".act__reveal"), { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.9, ease: "power3.out" }, 0.6)
            .from(act.querySelectorAll(".shot"), { x: 40, autoAlpha: 0, stagger: 0.07, duration: 0.8, ease: "power3.out" }, 0.8);
        });

        // A strip of film runs down the side as the journey progresses.
        gsap.fromTo(
          ".acts__timeline-fill",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".acts__list", start: "top 60%", end: "bottom 60%", scrub: true } },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="acts" className="scene acts">
      <SceneSlate scene="02" title="The Journey" slugline="MONTAGE — FROM BANKING SYSTEMS TO AI AGENTS" />

      <div className="acts__list">
        <div className="acts__timeline" aria-hidden="true">
          <span className="acts__timeline-fill" />
        </div>

        {chronological.map((exp, i) => (
          <article key={exp.id} className="act">
            <div className="act__backdrop" aria-hidden="true">
              {exp.company}
            </div>

            <div className="act__head">
              <span className="act__number">
                <small>Act</small>
                {ROMAN[i]}
              </span>
            </div>

            <div className="act__card">
              <p className="act__slug act__reveal">{exp.slugline}</p>
              <h3 className="act__role act__reveal">{exp.role}</h3>
              <p className="act__meta act__reveal">
                <strong>{exp.company}</strong>
                <span>{exp.period}</span>
                <span>{exp.location}</span>
              </p>
              {exp.summary ? <p className="act__summary act__reveal">{exp.summary}</p> : null}

              <ol className="act__shots">
                {exp.description.map((line, j) => (
                  <li key={j} className="shot">
                    <span className="shot__number">Shot {String(j + 1).padStart(2, "0")}</span>
                    <span className="shot__text">{line}</span>
                  </li>
                ))}
              </ol>

              <ul className="chips act__reveal" aria-label="Technologies">
                {exp.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
