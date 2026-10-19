"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type SceneSlateProps = {
  scene: string;
  title: string;
  slugline: string;
  take?: string;
};

/**
 * A clapperboard that snaps shut when the scene scrolls into frame,
 * followed by a white "sync" flash and the title sliding in.
 */
export function SceneSlate({ scene, title, slugline, take = "1" }: SceneSlateProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 82%", toggleActions: "play none none reverse" },
        });

        tl.from(".slate__board", { yPercent: 30, autoAlpha: 0, rotate: -4, duration: 0.7, ease: "power3.out" })
          .fromTo(".slate__stick", { rotate: -28 }, { rotate: 0, duration: 0.22, ease: "power4.in" }, "-=0.15")
          .fromTo(".slate__flash", { opacity: 0.9 }, { opacity: 0, duration: 0.5, ease: "power2.out" })
          .from(".slate__title-inner", { yPercent: 110, duration: 1, ease: "expo.out" }, "<")
          .from(".slate__slug", { autoAlpha: 0, x: -20, duration: 0.8, ease: "power3.out" }, "<+0.15")
          .from(".slate__rule", { scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "expo.out" }, "<");
      });
    },
    { scope: rootRef },
  );

  return (
    <header ref={rootRef} className="slate">
      <div className="slate__board" aria-hidden="true">
        <div className="slate__stick" />
        <div className="slate__base" />
        <dl className="slate__fields">
          <div>
            <dt>Scene</dt>
            <dd>{scene}</dd>
          </div>
          <div>
            <dt>Take</dt>
            <dd>{take}</dd>
          </div>
          <div>
            <dt>Roll</dt>
            <dd>A</dd>
          </div>
        </dl>
        <div className="slate__flash" />
      </div>

      <div className="slate__text">
        <p className="slate__slug">{slugline}</p>
        <h2 className="slate__title">
          <span className="slate__title-inner">{title}</span>
        </h2>
        <span className="slate__rule" aria-hidden="true" />
      </div>
    </header>
  );
}
