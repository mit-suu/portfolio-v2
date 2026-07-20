"use client";

import { useEffect, useState } from "react";
import { TextMorph } from "./TextMorph";

const INTRO_LINES = [
  "Hello.",
  "I'm Tran Tuan Hiep.",
  "Full Stack Developer.",
  "Welcome to my portfolio.",
];

// Timing: duration=0.6, hold=1.2 → slot=1.8s, cycle=7.2s
// Last word starts at 5.4s, fades out by ~7.8s
// We dismiss the loader at ~8.2s with a 0.6s fade-out
const TOTAL_DISPLAY_MS = 8200;
const FADE_OUT_MS = 600;

export function FakeLoading() {
  const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing");

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setPhase("fading");
    }, TOTAL_DISPLAY_MS);

    const doneTimer = window.setTimeout(() => {
      setPhase("done");
    }, TOTAL_DISPLAY_MS + FADE_OUT_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="loading-overlay"
      style={{
        opacity: phase === "fading" ? 0 : 1,
        transition: `opacity ${FADE_OUT_MS}ms ease-out`,
      }}
    >
      {/* Subtle ambient glow behind the text */}
      <div className="loading-glow" />

      <TextMorph
        words={INTRO_LINES}
        color="var(--primary)"
        fontSize={38}
        fontFamily="var(--font-geist-sans), Inter, sans-serif"
        fontWeight={600}
        duration={0.6}
        hold={1.2}
        ease="easeInOut"
        iterationCount={1}
      />
    </div>
  );
}
