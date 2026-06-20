import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  id: string;
  label: string;
  href: `#${string}`;
  icon: LucideIcon;
};

export type SkillCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  items: string[];
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  workMode: string;
  description: string[];
  technologies: string[];
};

export type Project = {
  id: string;
  name: string;
  detailTitle: string;
  year: string;
  subtitle: string;
  role: string;
  description: string;
  features: string[];
  techStack: string[];
  imageSrc: string;
  images: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  featured: boolean;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  year?: string;
  icon: LucideIcon;
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
  icon: LucideIcon;
};
