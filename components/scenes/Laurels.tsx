"use client";

import { useRef } from "react";
import { Laurel } from "@/components/cinema/Laurel";
import { SceneSlate } from "@/components/cinema/SceneSlate";
import { awards } from "@/constants/achievements";
import { profile } from "@/constants/profile";
import { gsap, useGSAP } from "@/lib/gsap";

export function Laurels() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".award").forEach((award) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: award, start: "top 80%" } });
          tl.fromTo(award.querySelectorAll(".laurel__stem"), { strokeDashoffset: 140 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" })
            .from(award.querySelectorAll(".laurel__leaf"), {
              scale: 0,
              transformOrigin: "center",
              autoAlpha: 0,
              duration: 0.5,
              stagger: { each: 0.025, from: "start" },
              ease: "back.out(3)",
            }, 0)
            .from(award.querySelectorAll(".award__reveal"), { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.8, ease: "power3.out" }, 0.3);
        });

        gsap.from(".diploma", {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: ".diploma", start: "top 80%" },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="laurels" className="scene laurels">
      <SceneSlate scene="06" title="Laurels" slugline="EXT. RED CARPET — FLASHBULBS" />

      <div className="laurels__grid">
        {awards.map((award) => (
          <article key={award.id} className="award">
            <div className="award__wreath">
              <Laurel className="award__laurel" />
              <div className="award__center">
                <span className="award__festival award__reveal">Official selection</span>
                <span className="award__year award__reveal">{award.year}</span>
              </div>
            </div>
            <h3 className="award__title award__reveal">{award.title}</h3>
            <p className="award__festival-name award__reveal">{award.festival}</p>
            <p className="award__description award__reveal">{award.description}</p>
          </article>
        ))}

        <article className="diploma">
          <p className="diploma__kicker">Production notes</p>
          <h3 className="diploma__school">{profile.education.school}</h3>
          <p className="diploma__degree">{profile.education.degree}</p>
          <dl className="diploma__facts">
            <div>
              <dt>Premiere</dt>
              <dd>{profile.education.graduation}</dd>
            </div>
            <div>
              <dt>GPA</dt>
              <dd>{profile.education.gpa}</dd>
            </div>
            <div>
              <dt>Capstone</dt>
              <dd>FlintFlow</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>Vietnamese · English</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
