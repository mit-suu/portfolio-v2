"use client";

import { useRef } from "react";
import { SceneSlate } from "@/components/cinema/SceneSlate";
import { stats } from "@/constants/achievements";
import { countUp, formatCount, gsap, useGSAP } from "@/lib/gsap";

const RAG_COMPARISON = [
  { label: "With RAG", value: 85.5 },
  { label: "Without RAG", value: 16.4 },
];

export function BoxOffice() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".gross").forEach((cell, i) => {
          const value = cell.querySelector<HTMLElement>(".gross__value")!;
          const metric = JSON.parse(value.dataset.metric!);
          value.textContent = formatCount({ ...metric, value: 0 });

          const tl = gsap.timeline({ scrollTrigger: { trigger: cell, start: "top 85%" }, delay: (i % 2) * 0.12 });
          tl.from(cell.querySelector(".gross__rule"), { scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "expo.out" })
            .add(countUp(value, metric, { duration: 2.4 }), 0.1)
            .from(cell.querySelectorAll(".gross__label, .gross__caption"), { autoAlpha: 0, y: 14, stagger: 0.1, duration: 0.8, ease: "power3.out" }, 0.3);
        });

        gsap.from(".versus__fill", {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.8,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".versus", start: "top 80%" },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="box-office" className="scene box-office">
      <SceneSlate scene="04" title="Box Office" slugline="INSERT — THE NUMBERS BEHIND THE REELS" />

      <div className="box-office__grid">
        {stats.map((stat) => (
          <div key={stat.label} className="gross">
            <span className="gross__rule" aria-hidden="true" />
            <p className="gross__value" data-metric={JSON.stringify(stat)}>
              {formatCount(stat)}
            </p>
            <p className="gross__label">{stat.label}</p>
            <p className="gross__caption">{stat.caption}</p>
          </div>
        ))}
      </div>

      <figure className="versus">
        <figcaption>
          FlintFlow knowledge chat · answer correctness on the evaluation set
        </figcaption>
        {RAG_COMPARISON.map((row) => (
          <div key={row.label} className="versus__row" data-primary={row.value > 50 || undefined}>
            <span className="versus__label">{row.label}</span>
            <span className="versus__bar">
              <span className="versus__fill" style={{ width: `${row.value}%` }} />
            </span>
            <span className="versus__value">{row.value}%</span>
          </div>
        ))}
      </figure>
    </section>
  );
}
