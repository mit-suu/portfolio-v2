import type { SkillCategory } from "@/types/portfolio";

export const skills: SkillCategory[] = [
  {
    id: "frontend",
    title: "Front-end",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "next-intl", "HTML", "CSS"],
  },
  {
    id: "backend",
    title: "Back-end",
    items: ["Node.js", "Express 5", "REST API design", "Zod", "JWT & OAuth", "BullMQ", "SSE", "Webhooks", "Spring Boot"],
  },
  {
    id: "data",
    title: "Databases",
    items: ["MongoDB", "Mongoose", "Atlas Vector Search", "Redis", "MySQL", "SQL Server"],
  },
  {
    id: "quality",
    title: "Testing & Quality",
    items: ["Vitest", "Jest", "Testing Library", "MSW", "Supertest", "Playwright"],
  },
  {
    id: "devops",
    title: "CI/CD & Cloud",
    items: ["Docker", "GitHub Actions", "Azure App Service", "Azure Container Registry", "Vercel", "Git", "SVN"],
  },
  {
    id: "ai",
    title: "AI & Tooling",
    items: ["LLM features", "AI agents", "RAG", "Vercel AI SDK", "Gemini", "Claude Code", "Figma"],
  },
];

/** The "cast" that scrolls across the screen in giant type. */
export const castMarquee = [
  ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB"],
  ["Redis", "BullMQ", "Docker", "Azure", "RAG", "Playwright"],
];
