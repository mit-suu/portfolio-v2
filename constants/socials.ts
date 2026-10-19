import type { SocialLink } from "@/types/portfolio";
import { profile } from "./profile";

export const socials: SocialLink[] = [
  { id: "email", label: "Email", url: `mailto:${profile.email}` },
  { id: "linkedin", label: "LinkedIn", url: profile.linkedIn },
  { id: "github", label: "GitHub", url: profile.github },
];

/** Rolled in the end-credits sequence. */
export const credits: { role: string; names: string[] }[] = [
  { role: "Written & Directed by", names: ["Tran Tuan Hiep"] },
  { role: "Produced at", names: ["FPT University · Da Nang"] },
  { role: "Starring", names: ["React", "Next.js", "Node.js", "TypeScript"] },
  { role: "Supporting Cast", names: ["Express 5", "MongoDB Atlas", "Redis", "BullMQ", "Zod"] },
  { role: "Stunt Doubles", names: ["Vitest", "Jest", "Playwright", "Supertest"] },
  { role: "Visual Effects", names: ["Tailwind CSS", "GSAP", "Lenis"] },
  { role: "Locations", names: ["Tekmium AI Lab", "FPT Japan Software", "Azure · Vercel"] },
  { role: "Special Thanks", names: ["Team FlintFlow", "Team APILens", "Team KIX", "Claude Code"] },
];
