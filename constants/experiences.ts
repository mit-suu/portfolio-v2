import type { Experience } from "@/types/portfolio";

export const experiences: Experience[] = [
  {
    id: "tekmium",
    company: "Tekmium",
    role: "AI Engineer Intern",
    period: "Aug 2026 — Present",
    location: "Da Nang · Hybrid",
    slugline: "INT. TEKMIUM — AI LAB — NIGHT",
    summary:
      "Built SignalCoach, a full-stack interview-practice product with an AI interviewer that streams its answers in real time.",
    description: [
      "Next.js 16 front end on Vercel and an Express 5 + TypeScript + MongoDB API on Azure App Service.",
      "Layered API (routes, controllers, services, models) with Zod validation, JWT in httpOnly cookies and one consistent error format.",
      "Per-turn agent loop — judge, pure state machine, persona — streamed over SSE, with a self-checking scorecard that cites the conversation.",
      "Single LLM gateway with multiple API keys, model fallback on overload and retries.",
      "Integration tests with supertest and in-memory MongoDB; a mock LLM provider keeps them deterministic.",
    ],
    technologies: ["Next.js 16", "Express 5", "TypeScript", "MongoDB", "SSE", "Azure"],
  },
  {
    id: "fpt-japan-software",
    company: "FPT Japan Software",
    role: "Software Engineering Intern",
    period: "Sep 2025 — Jan 2026",
    location: "Vietnam · On-site",
    slugline: "INT. FPT JAPAN SOFTWARE — BANKING FLOOR — DAY",
    summary:
      "IBS, a Japanese banking system. A team of ~20 inside a ~500-engineer project spread across Vietnam, Japan and the Philippines.",
    description: [
      "Analyzed Java Spring Boot source code and enterprise system configurations.",
      "Wrote technical documentation based on source code analysis.",
      "Used SVN for source retrieval and Git for version control; Jira, Confluence and Excel in an Agile process.",
      "Collaborated with developers, QA, BA and BrSE in a distributed international team.",
    ],
    technologies: ["Java", "Spring Boot", "SVN", "Git", "Jira", "Confluence"],
  },
];
