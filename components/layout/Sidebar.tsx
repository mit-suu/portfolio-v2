"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { navigation } from "@/constants/navigation";
import { profile } from "@/constants/profile";
import { socials } from "@/constants/socials";
import { cn } from "@/lib/utils";
import { SocialLink } from "@/components/ui/SocialLink";
import { GhostLoader } from "@/components/ui/GhostLoader";

export function Sidebar() {
  const [activeSection, setActiveSection] = useState(navigation[0]?.id ?? "about");

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateActiveSection = () => {
      const viewportAnchor = window.innerHeight * 0.38;
      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= viewportAnchor && rect.bottom >= viewportAnchor;
      });

      if (currentSection?.id) {
        setActiveSection(currentSection.id);
        return;
      }

      const closestSection = sections.reduce<HTMLElement | null>((closest, section) => {
        if (!closest) return section;

        const currentDistance = Math.abs(section.getBoundingClientRect().top - viewportAnchor);
        const closestDistance = Math.abs(closest.getBoundingClientRect().top - viewportAnchor);

        return currentDistance < closestDistance ? section : closest;
      }, null);

      if (closestSection?.id) {
        setActiveSection(closestSection.id);
      }
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <aside className="sidebar-shell">
      <div className="sidebar-content">
        <div className="space-y-4">
          <div className="h-24 w-24">
            <GhostLoader />
          </div>
          <div>
            <h1 className="max-w-sm text-4xl font-bold leading-tight text-on-surface lg:text-[42px]">
              {profile.fullName}
            </h1>
            <p className="mt-1.5 text-base text-primary">{profile.role}</p>
          </div>
          <p className="max-w-md text-sm leading-5 text-on-surface-variant">{profile.headline}</p>
          <p className="flex items-center gap-2 font-mono text-sm text-muted">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            {profile.location}
          </p>
        </div>

        <nav aria-label="Portfolio sections">
          <ul className="flex flex-col gap-1">
            {navigation.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setActiveSection(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative flex items-center gap-3 py-2 pr-4 text-on-surface-variant transition hover:text-on-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      isActive && "text-primary",
                    )}
                  >
                    <span
                      className={cn(
                        "h-px w-7 bg-outline-variant transition-all duration-300 group-hover:w-11 group-hover:bg-on-surface-variant",
                        isActive && "w-16 bg-primary shadow-[0_0_14px_var(--primary)]",
                      )}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs uppercase tracking-[0.14em]">
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 border-t border-outline-variant/40 pt-4">
          {socials.map((social) => (
            <SocialLink key={social.id} social={social} />
          ))}
        </div>
      </div>
    </aside>
  );
}
