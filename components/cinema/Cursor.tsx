"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * A viewfinder cursor: a dot that tracks the pointer exactly and a ring that trails it.
 * Anything with `data-cursor="Label"` expands the ring and prints the label inside.
 * Elements with `data-magnetic` are pulled toward the pointer.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const dot = dotRef.current!;
      const ring = ringRef.current!;
      const label = labelRef.current!;
      document.documentElement.classList.add("has-cursor");

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

      const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

      let current: Element | null = null;
      let magnet: HTMLElement | null = null;

      const releaseMagnet = () => {
        if (!magnet) return;
        gsap.to(magnet, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
        magnet = null;
      };

      const onMove = (event: PointerEvent) => {
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3, overwrite: "auto" });
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);

        const target = event.target instanceof Element ? event.target : null;

        const nextMagnet = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
        if (nextMagnet !== magnet) releaseMagnet();
        if (nextMagnet) {
          magnet = nextMagnet;
          const rect = nextMagnet.getBoundingClientRect();
          const strength = Number(nextMagnet.dataset.magnetic) || 0.35;
          gsap.to(nextMagnet, {
            x: (event.clientX - (rect.left + rect.width / 2)) * strength,
            y: (event.clientY - (rect.top + rect.height / 2)) * strength,
            duration: 0.6,
            ease: "power3.out",
          });
        }

        const labelled = target?.closest("[data-cursor]") ?? null;
        const interactive = labelled ?? target?.closest("a, button, [role='button']") ?? null;
        if (interactive === current) return;
        current = interactive;

        const text = labelled?.getAttribute("data-cursor") ?? "";
        label.textContent = text;
        ring.dataset.state = labelled ? "label" : interactive ? "hover" : "idle";
      };

      const onLeave = () => {
        gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
        releaseMagnet();
      };
      const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
      const onUp = () => gsap.to(ring, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });

      window.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);

      return () => {
        document.documentElement.classList.remove("has-cursor");
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
      };
    });
  });

  return (
    <>
      <div ref={ringRef} className="cursor-ring" data-state="idle" aria-hidden="true">
        <span ref={labelRef} className="cursor-ring__label" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
