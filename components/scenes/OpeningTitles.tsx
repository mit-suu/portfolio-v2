"use client";

import { useRef } from "react";
import { useCinema } from "@/components/cinema/CinemaProvider";
import { ProjectorDust } from "@/components/cinema/ProjectorDust";
import { SplitChars } from "@/components/cinema/SplitChars";
import { profile } from "@/constants/profile";
import { gsap, MOTION_QUERIES, type MotionConditions, useGSAP } from "@/lib/gsap";

export function OpeningTitles() {
  const { introDone } = useCinema();
  const rootRef = useRef<HTMLElement>(null);

  // Before the leader finishes: hold every title element in darkness.
  useGSAP(
    () => {
      if (window.matchMedia(MOTION_QUERIES.reduced).matches) return;
      gsap.set(".split__char", { yPercent: 115, rotateX: -70 });
      gsap.set([".opening__presents > *", ".opening__tagline", ".opening__billing > *", ".opening__cue"], { autoAlpha: 0 });
      gsap.set(".opening__flare", { scaleX: 0, autoAlpha: 0 });
    },
    { scope: rootRef },
  );

  // Title sequence, timed like a film's main title.
  useGSAP(
    () => {
      if (!introDone || window.matchMedia(MOTION_QUERIES.reduced).matches) return;

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(".opening__presents > *", { autoAlpha: 1, y: 0, letterSpacing: "0.5em", duration: 2, stagger: 0.25, startAt: { y: 12, letterSpacing: "1.2em" } })
        .to(".opening__flare", { scaleX: 1, autoAlpha: 1, duration: 1.8, ease: "power4.out" }, 0.35)
        .to(".opening__name .split__char", { yPercent: 0, rotateX: 0, duration: 1.5, stagger: { each: 0.045, from: "center" } }, 0.5)
        .to(".opening__tagline", { autoAlpha: 1, filter: "blur(0px)", duration: 1.6, startAt: { filter: "blur(12px)" } }, 1.2)
        .to(".opening__billing > *", { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.12, startAt: { y: 16 } }, 1.5)
        .to(".opening__cue", { autoAlpha: 1, duration: 1 }, 2.1);
    },
    { scope: rootRef, dependencies: [introDone] },
  );

  // Scroll: the camera pushes in through the title and the frame burns out.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES, (context) => {
        const { desktop, mobile } = context.conditions as MotionConditions;
        if (!desktop && !mobile) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=110%",
            scrub: 0.6,
            pin: true,
          },
        });

        tl.to(".opening__name", { scale: desktop ? 2.4 : 1.6, yPercent: -8, filter: "blur(10px)", autoAlpha: 0, ease: "power2.in" }, 0)
          .to(".opening__presents", { yPercent: -200, autoAlpha: 0, ease: "power1.in" }, 0)
          .to([".opening__lower", ".opening__cue-wrap"], { y: 80, autoAlpha: 0, stagger: 0.04, ease: "power1.in" }, 0)
          .to(".opening__flare-track", { scaleX: 2.2, scaleY: 3, ease: "none" }, 0)
          .to(".opening__light", { scale: 1.6, autoAlpha: 0, ease: "none" }, 0)
          .to(".opening__burn", { autoAlpha: 1, ease: "power2.in" }, 0.55)
          .to(".opening__burn", { autoAlpha: 0, ease: "power2.out" }, 0.85);

        if (!desktop) return;

        // Subtle head-turn parallax on the title while the mouse moves.
        const rotY = gsap.quickTo(".opening__name-tilt", "rotationY", { duration: 1.2, ease: "power3" });
        const rotX = gsap.quickTo(".opening__name-tilt", "rotationX", { duration: 1.2, ease: "power3" });
        const flareX = gsap.quickTo(".opening__flare-track", "x", { duration: 1.6, ease: "power3" });
        const onMove = (event: PointerEvent) => {
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          rotY(nx * 10);
          rotX(-ny * 8);
          flareX(nx * 120);
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="opening" className="opening" aria-label="Opening titles">
      <div className="opening__light" aria-hidden="true" />
      <ProjectorDust />

      <div className="opening__flare-track" aria-hidden="true">
        <div className="opening__flare" />
      </div>

      <div className="opening__content">
        <p className="opening__presents">
          <span>A Mit-Suu Picture</span>
          <span>Presents</span>
        </p>

        <h1 className="opening__name">
          <span className="opening__name-tilt">
            <SplitChars text={profile.firstName} className="opening__line" />
            <SplitChars text={profile.lastName} className="opening__line opening__line--outline" />
          </span>
        </h1>

        <div className="opening__lower">
          <p className="opening__tagline">
            a <em>full-stack</em> &amp; <em>AI engineer</em> story
          </p>

          <dl className="opening__billing">
          <div>
            <dt>Starring</dt>
            <dd>React · Next.js · Node.js · TypeScript</dd>
          </div>
          <div>
            <dt>Filmed on location in</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Graduating</dt>
            <dd>December 2026</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="opening__cue-wrap" aria-hidden="true">
        <div className="opening__cue">
          <span>Scroll to roll film</span>
          <i />
        </div>
      </div>

      <div className="opening__burn" aria-hidden="true" />
    </section>
  );
}
