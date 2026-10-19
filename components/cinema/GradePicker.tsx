"use client";

import { useRef, useSyncExternalStore } from "react";
import { applyGrade, GRADE_EVENT, GRADES, type GradeId } from "@/lib/grade";
import { gsap } from "@/lib/gsap";

function readGrade(): GradeId {
  return (document.documentElement.dataset.theme as GradeId | undefined) ?? "teal";
}

function subscribe(onChange: () => void) {
  window.addEventListener(GRADE_EVENT, onChange);
  return () => window.removeEventListener(GRADE_EVENT, onChange);
}

/** Small swatch row in the HUD: re-grades the whole film with a one-frame flash. */
export function GradePicker() {
  const active = useSyncExternalStore(subscribe, readGrade, () => "teal" as GradeId);
  const flashRef = useRef<HTMLDivElement>(null);

  const pick = (id: GradeId) => {
    if (id === active) return;
    applyGrade(id);

    if (flashRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(flashRef.current, { opacity: 0.32 }, { opacity: 0, duration: 0.7, ease: "power2.out" });
    }
  };

  return (
    <>
      <div className="hud__item grade" role="radiogroup" aria-label="Colour grade">
        <span className="grade__label hud__dim">
          <span className="hud__long">Grade</span>
        </span>
        {GRADES.map((grade) => (
          <button
            key={grade.id}
            type="button"
            role="radio"
            aria-checked={grade.id === active}
            aria-label={`${grade.label} grade`}
            title={grade.label}
            className="grade__swatch"
            data-active={grade.id === active || undefined}
            style={{ "--swatch": grade.swatch } as React.CSSProperties}
            onClick={() => pick(grade.id)}
          />
        ))}
      </div>
      <div ref={flashRef} className="grade-flash" aria-hidden="true" />
    </>
  );
}
