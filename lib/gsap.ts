"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Breakpoint + motion preference conditions shared by every scene. */
export const MOTION_QUERIES = {
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export type MotionConditions = Partial<Record<keyof typeof MOTION_QUERIES, boolean>>;

type CountUpOptions = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

export function formatCount({ value, decimals = 0, prefix = "", suffix = "" }: CountUpOptions) {
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${formatted}${suffix}`;
}

/** Rolls a number up from zero, writing straight to the DOM (no React re-renders). */
export function countUp(element: Element, options: CountUpOptions, vars: gsap.TweenVars = {}) {
  const counter = { value: 0 };
  return gsap.to(counter, {
    value: options.value,
    duration: 2.2,
    ease: "expo.out",
    ...vars,
    onUpdate: () => {
      element.textContent = formatCount({ ...options, value: counter.value });
    },
  });
}

export { gsap, ScrollTrigger, useGSAP };
