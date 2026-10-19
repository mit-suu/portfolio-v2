"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type CinemaContextValue = {
  /** True once the opening film leader has finished and the audience may scroll. */
  introDone: boolean;
  finishIntro: () => void;
  scrollTo: (target: string | number) => void;
  lockScroll: (locked: boolean) => void;
  getLenis: () => Lenis | null;
};

const CinemaContext = createContext<CinemaContextValue | null>(null);

export function useCinema() {
  const context = useContext(CinemaContext);
  if (!context) throw new Error("useCinema must be used inside <CinemaProvider>");
  return context;
}

export function CinemaProvider({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // The film always starts from the opening titles.
    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, autoRaf: false });
    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Hold the audience in their seats until the film leader has played.
  useEffect(() => {
    const root = document.documentElement;
    if (!introDone) {
      lenisRef.current?.stop();
      root.classList.add("is-intro");
      return;
    }

    root.classList.remove("is-intro");
    lenisRef.current?.start();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, [introDone]);

  const finishIntro = useCallback(() => setIntroDone(true), []);

  const scrollTo = useCallback((target: string | number) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
      return;
    }
    if (typeof target === "number") {
      window.scrollTo({ top: target });
    } else {
      document.querySelector(target)?.scrollIntoView();
    }
  }, []);

  const lockScroll = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (locked) lenis?.stop();
    else lenis?.start();
    document.documentElement.classList.toggle("is-locked", locked);
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  const value = useMemo(
    () => ({ introDone, finishIntro, scrollTo, lockScroll, getLenis }),
    [introDone, finishIntro, scrollTo, lockScroll, getLenis],
  );

  return <CinemaContext.Provider value={value}>{children}</CinemaContext.Provider>;
}
