import type { Award, Stat } from "@/types/portfolio";

export const stats: Stat[] = [
  { value: 1020, label: "automated tests", caption: "809 backend + 211 frontend on FlintFlow" },
  { value: 85.5, decimals: 1, suffix: "%", label: "answer correctness", caption: "RAG knowledge chat — vs 16.4% without RAG" },
  { value: 96.9, decimals: 1, suffix: "%", label: "Recall@3", caption: "Hybrid retrieval, best configuration" },
  { value: 3, label: "products led", caption: "Team Leader from requirements to production" },
];

export const awards: Award[] = [
  {
    id: "uxui-top10",
    title: "Top 10 of 120 teams",
    festival: "Web Design UX/UI Competition · Final Round",
    year: "2026",
    description: "With KIX Sneaker, an e-commerce platform built by a team of four.",
  },
  {
    id: "apilens-research",
    title: "90% agreement with humans",
    festival: "University Research · APILens",
    year: "2026",
    description: "Smell engine evaluated on 157 hand-labelled endpoints from 14 open-source repos, 0.82 macro precision.",
  },
];
