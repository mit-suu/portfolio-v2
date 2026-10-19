export type Scene = {
  id: string;
  number: string;
  label: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  items: string[];
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  /** Screenplay-style slugline, e.g. "INT. TEKMIUM — AI LAB — DAY" */
  slugline: string;
  summary?: string;
  description: string[];
  technologies: string[];
};

export type ProjectMetric = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  genre: string;
  period: string;
  role: string;
  logline: string;
  highlights: string[];
  techStack: string[];
  metrics: ProjectMetric[];
  imageSrc?: string;
  images?: string[];
  /** Two-tone palette used for the generated poster when there is no image */
  palette: [string, string];
  liveDemoUrl?: string;
  githubUrl?: string;
};

export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  caption: string;
};

export type Award = {
  id: string;
  title: string;
  festival: string;
  year: string;
  description: string;
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
};
