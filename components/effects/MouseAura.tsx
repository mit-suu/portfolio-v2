"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

export function MouseAura() {
  const auraRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const aura = auraRef.current;
    if (!aura) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        canHover: "(hover: hover) and (pointer: fine)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { canHover, reduceMotion } = context.conditions ?? {};

        if (!canHover || reduceMotion) {
          gsap.set(aura, { autoAlpha: 0 });
          return;
        }

        const xTo = gsap.quickTo(aura, "x", { duration: 0.45, ease: "power3" });
        const yTo = gsap.quickTo(aura, "y", { duration: 0.45, ease: "power3" });

        const move = (event: PointerEvent) => {
          xTo(event.clientX);
          yTo(event.clientY);
        };

        window.addEventListener("pointermove", move);
        gsap.set(aura, { autoAlpha: 1 });

        return () => {
          window.removeEventListener("pointermove", move);
        };
      },
    );

    return () => mm.revert();
  }, []);

  return <div ref={auraRef} className="mouse-aura" aria-hidden="true" />;
}
