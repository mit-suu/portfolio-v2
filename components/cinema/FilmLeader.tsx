"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useCinema } from "./CinemaProvider";

const SEEN_KEY = "cinema:leader-seen";

// Decided once per page load (StrictMode runs effects twice in development).
let seenThisSession: boolean | null = null;

function hasSeenLeader() {
  if (seenThisSession !== null) return seenThisSession;
  try {
    seenThisSession = sessionStorage.getItem(SEEN_KEY) === "1";
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Storage can be blocked; just play the full leader.
    seenThisSession = false;
  }
  return seenThisSession;
}

/**
 * The opening film leader: PICTURE START → 3 · 2 · 1 with a sweeping hand,
 * a projector flash, then the frame splits open into letterbox.
 * Plays in full once per session; later visits get only the curtain.
 */
export function FilmLeader() {
  const { finishIntro } = useCinema();
  const rootRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    (_, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;

      const done = () => {
        finishIntro();
        setGone(true);
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        done();
        return;
      }

      const seen = hasSeenLeader();

      const numeral = root.querySelector<HTMLElement>(".leader__numeral");
      const sweep = root.querySelector<HTMLElement>(".leader__sweep");

      const tl = gsap.timeline({ onComplete: done });

      tl.set(".leader__stage", { autoAlpha: 1 })
        .from(".leader__label", { autoAlpha: 0, y: 8, duration: 0.4, stagger: 0.08 });

      ["3", "2", "1"].forEach((n, i) => {
        tl.call(() => {
          if (numeral) numeral.textContent = n;
        }, undefined, i === 0 ? ">-0.1" : ">")
          .fromTo(numeral, { scale: 1.18, autoAlpha: 0.4 }, { scale: 1, autoAlpha: 1, duration: 0.18, ease: "power2.out" }, "<")
          .fromTo(sweep, { "--sweep": "0deg" }, { "--sweep": "360deg", duration: 0.82, ease: "none" }, "<")
          .to(".leader__stage", { opacity: 0.86, duration: 0.04, yoyo: true, repeat: 1 }, "<+=0.35");
      });

      tl.addLabel("flash")
        .to(".leader__flash", { opacity: 1, duration: 0.06, ease: "none" })
        .set(".leader__stage", { autoAlpha: 0 })
        .to(".leader__flash", { opacity: 0, duration: 0.5, ease: "power2.out" })
        .addLabel("open", "-=0.25")
        .to(".leader__curtain--top", { yPercent: -100, duration: 1.15, ease: "expo.inOut" }, "open")
        .to(".leader__curtain--bottom", { yPercent: 100, duration: 1.15, ease: "expo.inOut" }, "open")
        // Hand control to the hero a beat before the curtain fully clears.
        .call(finishIntro, undefined, "open+=0.45");

      if (seen) tl.seek("open");

      const skip = contextSafe!(() => {
        if (tl.currentLabel() !== "open" && tl.time() < tl.labels.flash) tl.seek("flash");
      });

      window.addEventListener("keydown", skip);
      root.addEventListener("pointerdown", skip);
      return () => {
        window.removeEventListener("keydown", skip);
        root.removeEventListener("pointerdown", skip);
      };
    },
    { scope: rootRef },
  );

  // Make sure the page is never stuck behind the leader.
  useEffect(() => {
    const failsafe = window.setTimeout(() => {
      finishIntro();
      setGone(true);
    }, 9000);
    return () => window.clearTimeout(failsafe);
  }, [finishIntro]);

  if (gone) return null;

  return (
    <div ref={rootRef} className="leader" aria-hidden="true">
      <div className="leader__curtain leader__curtain--top" />
      <div className="leader__curtain leader__curtain--bottom" />

      <div className="leader__stage">
        <div className="leader__dial">
          <div className="leader__sweep" />
          <div className="leader__ring leader__ring--outer" />
          <div className="leader__ring leader__ring--inner" />
          <div className="leader__cross leader__cross--h" />
          <div className="leader__cross leader__cross--v" />
          <span className="leader__numeral">3</span>
        </div>
        <span className="leader__label leader__label--tl">Picture Start</span>
        <span className="leader__label leader__label--tr">Reel 01 · 24 fps</span>
        <span className="leader__label leader__label--bl">Tran Tuan Hiep · Portfolio</span>
        <span className="leader__label leader__label--br">Click to skip</span>
      </div>

      <div className="leader__flash" />
    </div>
  );
}
