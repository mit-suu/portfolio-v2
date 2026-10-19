"use client";

import Image from "next/image";
import { useRef } from "react";
import { SplitChars } from "@/components/cinema/SplitChars";
import { profile } from "@/constants/profile";
import { credits, socials } from "@/constants/socials";
import { gsap, MOTION_QUERIES, type MotionConditions, useGSAP } from "@/lib/gsap";

export function EndCredits() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_QUERIES, (context) => {
        const { desktop, mobile } = context.conditions as MotionConditions;
        if (!desktop && !mobile) return;

        // The credits crawl: pinned black screen, names roll up from below.
        const roll = rootRef.current!.querySelector<HTMLElement>(".credits__roll")!;
        const travel = () => roll.offsetHeight + window.innerHeight;

        gsap.fromTo(
          roll,
          { y: () => window.innerHeight },
          {
            y: () => -roll.offsetHeight,
            ease: "none",
            scrollTrigger: {
              trigger: ".credits",
              start: "top top",
              end: () => `+=${travel() * 0.85}`,
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
            },
          },
        );

        // Finale: THE END lands, then the twist.
        const finale = gsap.timeline({ scrollTrigger: { trigger: ".finale", start: "top 65%" } });
        finale
          .from(".finale__end .split__char", { yPercent: 120, duration: 1.3, stagger: 0.07, ease: "expo.out" })
          .from(".finale__twist", { autoAlpha: 0, filter: "blur(10px)", duration: 1.2 }, "+=0.2")
          .from(".finale__pitch > *", { autoAlpha: 0, y: 30, duration: 1, stagger: 0.12, ease: "power3.out" }, "-=0.6")
          .from(".finale__links > *", { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.08, ease: "power3.out" }, "-=0.6");

        // Pip the courier pigeon flies the message across the screen, forever.
        const pip = rootRef.current!.querySelector(".pip");
        gsap.fromTo(pip, { x: "-15vw" }, { x: "110vw", duration: desktop ? 11 : 8, ease: "none", repeat: -1, repeatDelay: 2.5 });
        gsap.to(pip, { y: -26, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      <section id="credits" className="credits" aria-label="End credits">
        <div className="credits__roll">
          <p className="credits__lead">A portfolio by</p>
          <p className="credits__star">{profile.fullName}</p>

          {credits.map((block) => (
            <dl key={block.role} className="credits__block">
              <dt>{block.role}</dt>
              {block.names.map((name) => (
                <dd key={name}>{name}</dd>
              ))}
            </dl>
          ))}

          <p className="credits__disclaimer">
            No servers were harmed in the making of this portfolio.
            <br />
            All tests passed. Most of them on the first take.
          </p>
          <p className="credits__copyright">© 2026 {profile.fullName} · {profile.portfolioDomain}</p>
        </div>
      </section>

      <section id="contact" className="finale">
        <div className="pip" aria-hidden="true">
          <Image src="/pip.gif" alt="" width={120} height={120} unoptimized />
        </div>

        <h2 className="finale__end">
          <SplitChars text="The End" />
        </h2>
        <p className="finale__twist">…or is it?</p>

        <div className="finale__pitch">
          <p className="finale__kicker">Now casting for the sequel</p>
          <p className="finale__line">
            Your team could be <em>Act III.</em>
          </p>
          <p className="finale__sub">{profile.availability}. Open to front-end, back-end, full-stack and AI roles.</p>
        </div>

        <div className="finale__links">
          <a className="finale__email" href={`mailto:${profile.email}`} data-magnetic="0.2" data-cursor="Send">
            {profile.email}
          </a>
          <ul className="finale__socials">
            {socials
              .filter((s) => s.id !== "email")
              .map((social) => (
                <li key={social.id}>
                  <a href={social.url} target="_blank" rel="noreferrer" className="btn" data-magnetic>
                    {social.label} ↗
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <footer className="finale__footer">
          <span>Shot on Next.js 16 · GSAP · Lenis</span>
          <span>Fin.</span>
        </footer>
      </section>
    </div>
  );
}
