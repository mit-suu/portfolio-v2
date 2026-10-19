"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { scenes } from "@/constants/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useCinema } from "./CinemaProvider";
import { Timeline } from "./Timeline";

const FPS = 24;
/** How many scrolled pixels make one frame of "runtime". */
const PX_PER_FRAME = 3;

function toTimecode(frames: number) {
  const f = Math.floor(frames % FPS);
  const totalSeconds = Math.floor(frames / FPS);
  const s = totalSeconds % 60;
  const m = Math.floor(totalSeconds / 60) % 60;
  const h = Math.floor(totalSeconds / 3600);
  return [h, m, s, f].map((n) => String(n).padStart(2, "0")).join(":");
}

/**
 * Camera viewfinder heads-up display: letterbox bars, REC light, current scene,
 * scroll-driven timecode, a seekable timeline with scene stepping, and a DVD-style scene menu.
 */
export function Hud() {
  const { introDone, scrollTo, lockScroll } = useCinema();
  const rootRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const [activeId, setActiveId] = useState(scenes[0].id);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeIndex = Math.max(0, scenes.findIndex((scene) => scene.id === activeId));
  const active = scenes[activeIndex];

  // Whichever scene crosses the middle of the frame is "on screen".
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId((entry.target as HTMLElement).dataset.hudScene ?? entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const scene of scenes) {
      const el = document.getElementById(scene.id);
      if (el) observer.observe(el);
    }
    // The finale is part of the credits scene but lives in its own section.
    const finale = document.getElementById("contact");
    if (finale) {
      finale.dataset.hudScene = "credits";
      observer.observe(finale);
    }
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          if (timecodeRef.current) timecodeRef.current.textContent = toTimecode(y / PX_PER_FRAME);
        },
      });

      // Thick letterbox for the opening titles, slimming down once the film is rolling.
      gsap.fromTo(
        ".hud__bar",
        { height: "var(--bar-open)" },
        {
          height: "var(--bar-closed)",
          ease: "none",
          scrollTrigger: { trigger: document.getElementById("opening"), start: "top top", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: rootRef },
  );

  useGSAP(
    () => {
      if (!introDone) return;
      gsap.from(".hud__item", { autoAlpha: 0, y: (i) => (i % 2 ? 10 : -10), duration: 0.9, stagger: 0.06, ease: "power3.out", delay: 0.6 });
      gsap.from(".hud__corner", { autoAlpha: 0, scale: 1.4, duration: 1, stagger: 0.05, ease: "expo.out", delay: 0.4 });
    },
    { scope: rootRef, dependencies: [introDone] },
  );

  useEffect(() => {
    lockScroll(menuOpen);
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, lockScroll]);

  const step = (delta: number) => {
    const next = scenes[Math.min(scenes.length - 1, Math.max(0, activeIndex + delta))];
    if (next.id === "opening") scrollTo(0);
    else scrollTo(`#${next.id}`);
  };

  // ← / → step between scenes, like chapter skip on a player.
  useEffect(() => {
    if (!introDone || menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.altKey || event.ctrlKey || event.metaKey || target.closest("input, textarea, [contenteditable], .screening")) return;
      if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const jump = (id: string) => {
    setMenuOpen(false);
    // Let the menu fade before the camera moves.
    window.setTimeout(() => scrollTo(`#${id}`), 350);
  };

  return (
    <div ref={rootRef} className="hud" data-intro={introDone ? "done" : "pending"}>
      <div className="hud__bar hud__bar--top">
        <div className="hud__item hud__rec">
          <span className="hud__rec-dot" aria-hidden="true" />
          REC
        </div>
        <div className="hud__item hud__scene" aria-live="polite">
          <span className="hud__scene-number">SC {active.number}</span>
          <span className="hud__scene-sep" aria-hidden="true">—</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active.id}
              className="hud__scene-label"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {active.label}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="hud__item hud__timecode">
          <span className="hud__dim">TC</span> <span ref={timecodeRef}>00:00:00:00</span>
          <span className="hud__dim hud__fps"> · {FPS} FPS</span>
        </div>
      </div>

      <div className="hud__bar hud__bar--bottom">
        <button
          type="button"
          className="hud__item hud__menu-button"
          onClick={() => setMenuOpen(true)}
          data-cursor="Menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
        >
          <span className="hud__menu-icon" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="hud__menu-text">Scene Selection</span>
        </button>
        <a
          className="hud__item hud__hire"
          href="#contact"
          onClick={(event) => {
            event.preventDefault();
            scrollTo("#contact");
          }}
        >
          Now casting · <span>Hire me</span>
        </a>
        <div className="hud__item hud__stepper">
          <button type="button" onClick={() => step(-1)} disabled={activeIndex === 0} aria-label="Previous scene">
            ‹
          </button>
          <span>
            SC {active.number}
            <span className="hud__dim"> / {scenes[scenes.length - 1].number}</span>
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={activeIndex === scenes.length - 1}
            aria-label="Next scene"
          >
            ›
          </button>
        </div>

        <Timeline />
      </div>

      <span className="hud__corner hud__corner--tl" aria-hidden="true" />
      <span className="hud__corner hud__corner--tr" aria-hidden="true" />
      <span className="hud__corner hud__corner--bl" aria-hidden="true" />
      <span className="hud__corner hud__corner--br" aria-hidden="true" />

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="scene-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Scene selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="scene-menu__header">
              <span>Scene Selection</span>
              <button type="button" className="scene-menu__close" onClick={() => setMenuOpen(false)} data-cursor="Close">
                Close <kbd>Esc</kbd>
              </button>
            </div>
            <ol className="scene-menu__list">
              {scenes.map((scene, i) => (
                <motion.li
                  key={scene.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    className="scene-menu__item"
                    data-active={scene.id === activeId}
                    onClick={() => jump(scene.id)}
                    data-cursor="Play"
                  >
                    <span className="scene-menu__number">{scene.number}</span>
                    <span className="scene-menu__label">{scene.label}</span>
                    <span className="scene-menu__play" aria-hidden="true">▶</span>
                  </button>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
