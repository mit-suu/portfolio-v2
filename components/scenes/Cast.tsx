"use client";

import { useRef } from "react";
import { SceneSlate } from "@/components/cinema/SceneSlate";
import { castMarquee, skills } from "@/constants/skills";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function Cast() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Endless marquees whose speed (and direction) follow the scroll wheel.
        const loops = gsap.utils.toArray<HTMLElement>(".marquee__inner").map((inner, i) =>
          gsap.fromTo(
            inner,
            { xPercent: i % 2 ? -50 : 0 },
            { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 },
          ),
        );

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = gsap.utils.clamp(1, 7, 1 + Math.abs(self.getVelocity()) / 350);
            loops.forEach((loop) =>
              gsap.to(loop, {
                timeScale: boost,
                duration: 0.15,
                overwrite: true,
                onComplete: () => void gsap.to(loop, { timeScale: 1, duration: 1.4, ease: "power2.out" }),
              }),
            );
          },
        });

        gsap.from(".roster__group", {
          autoAlpha: 0,
          y: 40,
          stagger: 0.08,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".roster", start: "top 80%" },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="cast" className="scene cast">
      <SceneSlate scene="05" title="The Cast" slugline="INT. THE STACK — EVERYONE ON SET" />

      <div className="marquees" aria-hidden="true">
        {castMarquee.map((row, i) => (
          <div key={i} className="marquee" data-variant={i % 2 ? "outline" : "solid"}>
            <div className="marquee__inner">
              {[...row, ...row, ...row, ...row].map((name, j) => (
                <span key={j} className="marquee__item">
                  {name}
                  <i>✦</i>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="roster">
        {skills.map((group) => (
          <section key={group.id} className="roster__group">
            <h3 className="roster__role">{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
