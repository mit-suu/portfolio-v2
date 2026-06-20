import {
  Braces,
  CodeXml,
  Database,
  Server,
  Wrench,
} from "lucide-react";
import type { SkillCategory } from "@/types/portfolio";

export const skills: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: CodeXml,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    items: ["Node.js", "Express.js", "RESTful APIs", "API Design", "Authentication"],
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    items: ["MongoDB", "PostgreSQL", "Mongoose"],
  },
  {
    id: "devops-tools",
    title: "DevOps & Tools",
    icon: Wrench,
    items: ["Git", "GitHub", "GitHub Actions", "Docker", "Azure", "Vercel", "Cloudinary"],
  },
  {
    id: "programming-languages",
    title: "Programming Languages",
    icon: Braces,
    items: ["JavaScript", "TypeScript", "Java"],
  },
];
