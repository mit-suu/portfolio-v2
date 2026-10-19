"use client";

import Image from "next/image";
import { useRef } from "react";
import { SceneSlate } from "@/components/cinema/SceneSlate";
import { characterNotes, monologue, profile } from "@/constants/profile";
import { gsap, useGSAP } from "@/lib/gsap";

/** Splits "plain *highlighted run* plain" into words, flagging those inside *…*. */
function tokenize(text: string) {
  const tokens: { word: string; lit: boolean }[] = [];
  for (const chunk of text.split(/(\*[^*]+\*)/)) {
    const lit = chunk.startsWith("*");
    for (const word of chunk.replaceAll("*", "").split(/\s+/).filter(Boolean)) {
      // Punctuation straight after a highlight belongs to the previous word.
      const previous = tokens.at(-1);
      if (/^[.,;:!?]+$/.test(word) && previous) previous.word += word;
      else tokens.push({ word, lit });
    }
  }
  return tokens;
}

export function Protagonist() {
  const rootRef = useRef<HTMLElement>(null);
  const words = tokenize(monologue);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Words light up as the camera reads across the line.
        gsap.fromTo(
          ".monologue__word",
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: ".monologue", start: "top 78%", end: "bottom 42%", scrub: true },
          },
        );

        // Portrait: frame wipes open, the photo drifts inside it.
        gsap.fromTo(
          ".still__frame",
          { clipPath: "inset(48% 0% 48% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "expo.inOut",
            duration: 1.6,
            scrollTrigger: { trigger: ".still", start: "top 75%" },
          },
        );
        gsap.fromTo(
          ".still__photo",
          { yPercent: -8, scale: 1.18 },
          { yPercent: 8, scale: 1.05, ease: "none", scrollTrigger: { trigger: ".still", start: "top bottom", end: "bottom top", scrub: true } },
        );

        gsap.from(".dossier__row", {
          autoAlpha: 0,
          y: 24,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".dossier", start: "top 85%" },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="protagonist" className="scene protagonist">
      <SceneSlate scene="01" title="The Protagonist" slugline="EXT. DA NANG — GOLDEN HOUR" />

      <div className="protagonist__grid">
        <figure className="still">
          <div className="still__sprockets" aria-hidden="true" />
          <div className="still__frame" data-cursor="Hiep">
            <Image
              className="still__photo"
              src="/avt.png"
              alt={`Portrait of ${profile.fullName}`}
              fill
              sizes="(min-width: 768px) 34vw, 90vw"
              loading="eager"
            />
            <span className="still__grade" aria-hidden="true" />
          </div>
          <div className="still__sprockets" aria-hidden="true" />
          <figcaption className="still__caption">
            <span>Casting still · Take 3</span>
            <span>{profile.fullName}</span>
          </figcaption>
        </figure>

        <div className="protagonist__copy">
          <p className="monologue">
            {words.map((token, i) => (
              <span key={i} className="monologue__word" data-lit={token.lit || undefined}>
                {token.word}{" "}
              </span>
            ))}
          </p>

          <dl className="dossier">
            {characterNotes.map((note) => (
              <div key={note.label} className="dossier__row">
                <dt>{note.label}</dt>
                <dd>{note.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
