"use client";

import { useId, useMemo } from "react";

function mapEaseToCSS(ease: string): string {
  switch (ease) {
    case "linear":
      return "linear";
    case "easeIn":
      return "ease-in";
    case "easeOut":
      return "ease-out";
    case "easeInOut":
      return "ease-in-out";
    case "circIn":
      return "cubic-bezier(0.6, 0.04, 0.98, 0.335)";
    case "circOut":
      return "cubic-bezier(0.075, 0.82, 0.165, 1)";
    case "circInOut":
      return "cubic-bezier(0.785, 0.135, 0.15, 0.86)";
    case "backIn":
      return "cubic-bezier(0.6, -0.28, 0.735, 0.045)";
    case "backOut":
      return "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    case "backInOut":
      return "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    default:
      return "ease-in-out";
  }
}

type TextMorphProps = {
  words: string[];
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  duration?: number;
  hold?: number;
  ease?: string;
  iterationCount?: "infinite" | number;
};

export function TextMorph({
  words,
  color = "#FFFFFF",
  fontSize = 42,
  fontFamily = "var(--font-geist-sans), Inter, sans-serif",
  fontWeight = 700,
  duration = 0.8,
  hold = 1.6,
  ease = "easeInOut",
  iterationCount = 1,
}: TextMorphProps) {
  const rawId = useId();
  const safeId = rawId.replace(/[:]/g, "");
  const filterId = `tm-thr-${safeId}`;
  const animName = `tm-rot-${safeId}`;

  const easeCSS = mapEaseToCSS(ease);

  const count = Math.max(1, words.length);
  const slot = duration + hold;
  const cycle = slot * count;
  const pct = (s: number) => Math.min(100, (s / cycle) * 100).toFixed(4);
  const mIn = pct(duration);
  const mHold = pct(duration + hold);
  const mOut = pct(2 * duration + hold);

  const keyframes = `
@keyframes ${animName} {
  0% {
    opacity: 0;
    filter: blur(18px);
    transform: translate(-50%, -50%) scale(0.85);
  }
  ${mIn}% {
    opacity: 1;
    filter: blur(0px);
    transform: translate(-50%, -50%) scale(1);
  }
  ${mHold}% {
    opacity: 1;
    filter: blur(0px);
    transform: translate(-50%, -50%) scale(1);
  }
  ${mOut}%, 100% {
    opacity: 0;
    filter: blur(18px);
    transform: translate(-50%, -50%) scale(1.15);
  }
}
`;

  const longest = useMemo(
    () => words.reduce((acc, w) => (w.length > acc.length ? w : acc), ""),
    [words]
  );

  const iterStr =
    iterationCount === "infinite" ? "infinite" : String(iterationCount);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <style>{keyframes}</style>

      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
        aria-hidden
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 25 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          position: "relative",
          filter: `url(#${filterId})`,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontFamily,
          fontWeight,
          fontSize,
          letterSpacing: "-0.02em",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: 1.2,
            minHeight: "1.2em",
          }}
        >
          {/* Width anchor: longest word reserves space */}
          <span
            style={{
              visibility: "hidden",
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            {longest || " "}
          </span>

          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                color,
                whiteSpace: "nowrap",
                animation: `${animName} ${cycle}s ${(slot * i).toFixed(3)}s ${iterStr} ${easeCSS}`,
                willChange: "opacity, filter, transform",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
