import { GraduationCap, Languages } from "lucide-react";
import type { Achievement } from "@/types/portfolio";

export const achievements: Achievement[] = [
  {
    id: "entrance-ranking",
    title: "Hackathon C++ (2021)",
    description:
      "Scored 55/100 in a competitive C++ programming hackathon, showcasing analytical thinking, algorithmic problem-solving, and programming fundamentals.",
    year: "2021",
    icon: GraduationCap,
  },
  {
    id: "toeic-550",
    title: "TOEIC 550",
    description:
      "TOEIC 550, demonstrating English ability for technical documentation, communication, and learning international software engineering resources.",
    icon: Languages,
     year: "2023",
  },
   {
    id: "toeic-5501 ",
    title: "TOEIC 550",
    description:
      "TOEIC 550, demonstrating English ability for technical documentation, communication, and learning international software engineering resources.",
    icon: Languages,
     year: "2023",
  },
];
