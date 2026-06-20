# Portfolio UI Implementation Guide for Agent

## Goal

Build a modern personal portfolio website for **Tran Tuan Hiep** as a **Full-Stack Developer**.

The final result must be a clean, maintainable, scalable Next.js portfolio that is easy to update by editing typed constants/config files. Use the provided UI reference HTML as the visual direction and the provided frontend/animation skill files as implementation guidance.

This project uses **Next.js 16.2.7**, **React 19.2.4**, **Tailwind CSS 4.3.0**, and TypeScript. Before writing code, read the relevant docs in:

```txt
node_modules/next/dist/docs/
```

Relevant docs to check first:

```txt
node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md
node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md
node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md
node_modules/next/dist/docs/01-app/01-getting-started/11-css.md
```

Follow `AGENTS.md`: this is not assumed to be the older Next.js API surface.

---

## 1. Required Skills and Libraries

Use the provided frontend/GSAP skill files when implementing animation or motion behavior:

```txt
.agents/skills/gsap-core/SKILL.md
.agents/skills/gsap-react/SKILL.md
.agents/skills/gsap-performance/SKILL.md
.agents/skills/gsap-scrolltrigger/SKILL.md
.agents/skills/gsap-timeline/SKILL.md
.agents/skills/gsap-utils/SKILL.md
```

Recommended animation stack:

- Use **GSAP** and `@gsap/react` for mouse aura, entrance animation, and optional scroll-triggered polish.
- Use `useGSAP()` with scoped refs for React components.
- Register plugins once in a client-side animation utility/module.
- Keep GSAP code inside Client Components only.
- Respect `prefers-reduced-motion`.
- Prefer transforms and opacity/autoAlpha over layout-heavy animation properties.

Install missing dependencies if they are not already present:

```bash
npm install gsap @gsap/react lucide-react
```

Use `lucide-react` for icons where possible. If matching the supplied HTML reference more closely, Material Symbols may be replaced with lucide equivalents rather than loading Google icon fonts.

---

## 2. Project Structure

Create or migrate to a clean structure. The repository currently has a root `app/` directory. Keep using it unless there is a clear reason to migrate to `src/app/`; avoid unnecessary churn.

Recommended root-level structure:

```txt
app/
  page.tsx
  layout.tsx
  globals.css

components/
  layout/
    PortfolioShell.tsx
    Sidebar.tsx
    MainContent.tsx
    SectionWrapper.tsx
  sections/
    AboutSection.tsx
    SkillsSection.tsx
    ExperienceSection.tsx
    ProjectsSection.tsx
    AchievementsSection.tsx
    ContactSection.tsx
  ui/
    AchievementCard.tsx
    ExperienceCard.tsx
    ProjectCard.tsx
    SectionHeading.tsx
    SkillCard.tsx
    SocialLink.tsx
    TechBadge.tsx
    FakeLoading.tsx
  effects/
    MouseAura.tsx

constants/
  achievements.ts
  experiences.ts
  navigation.ts
  profile.ts
  projects.ts
  skills.ts
  socials.ts

config/
  theme.ts

lib/
  animations.ts
  utils.ts

types/
  portfolio.ts
```

Principles:

- Keep route files in `app/`.
- Keep repeated content in `constants/`.
- Keep reusable UI in `components/`.
- Keep shared types in `types/`.
- Keep animation configuration/helpers in `lib/animations.ts`.
- Use Server Components by default; add `"use client"` only to components that need state, effects, browser APIs, Intersection Observer, or GSAP.

---

## 3. Content Management

All repeated portfolio content must live in `constants/` and be rendered with `.map()`.

Do not hardcode repeated projects, skills, experiences, social links, achievements, or navigation items inside UI components.

Example:

```tsx
{projects.map((project) => (
  <ProjectCard key={project.id} project={project} />
))}
```

The user should be able to add a new project by editing only:

```txt
constants/projects.ts
```

Required type file:

```txt
types/portfolio.ts
```

Include types similar to:

```ts
export type NavigationItem = {
  id: string;
  label: string;
  href: `#${string}`;
  icon: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  icon: string;
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
  subtitle: string;
  role: string;
  description: string;
  features: string[];
  techStack: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  featured: boolean;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  year?: string;
  icon: string;
};

export type SocialLink = {
  id: string;
  label: string;
  url: string;
  icon: string;
};
```

---

## 4. Profile Content

Use this exact profile data:

```txt
Full name: Tran Tuan Hiep
Role: Full-Stack Developer
Headline: Building scalable web applications with modern technologies. Passionate about creating reliable products, designing clean APIs, and delivering great user experiences.
Location: Da Nang, Vietnam
Email: trantuanhiep28122003@gmail.com
LinkedIn: https://www.linkedin.com/in/hieptran-dev/
GitHub: https://github.com/mit-suu
Portfolio domain: optional / current site URL when available
```

---

## 5. Navigation Content

Create `constants/navigation.ts` with:

```txt
About
Skills
Experience
Projects
Achievements
Contact
```

Each item must include:

- `id`
- `label`
- `href`
- `icon`

Section IDs must match navigation targets exactly:

```txt
about
skills
experience
projects
achievements
contact
```

---

## 6. Skills Content

Create `constants/skills.ts` and group skills by category:

```txt
Frontend
Backend
Database
DevOps & Tools
Programming Languages
```

Suggested values:

```txt
Frontend: React, Next.js, TypeScript, Tailwind CSS, HTML, CSS
Backend: Node.js, Express.js, RESTful APIs, API Design, Authentication
Database: MongoDB, PostgreSQL, Mongoose
DevOps & Tools: Git, GitHub, GitHub Actions, Docker, Azure, Vercel, Cloudinary
Programming Languages: JavaScript, TypeScript, Java
```

Render categories and individual skills with `.map()`.

---

## 7. About Content

Use this content:

```txt
I am a Software Engineering student at FPT University with a strong interest in full-stack web development. My primary technology stack includes React, Next.js, Node.js, Express.js, and MongoDB.

I enjoy building practical software products from idea to deployment, with experience in designing RESTful APIs, developing modern web interfaces, and deploying applications to cloud platforms.

Through academic projects and industry experience, I have developed strong problem-solving, teamwork, and software engineering skills.

My goal is to become a professional Full-Stack Software Engineer capable of building scalable and reliable applications that deliver real value to users.
```

Store this as an array of paragraphs in `constants/profile.ts` or a dedicated constants file.

---

## 8. Experience Content

Create `constants/experiences.ts` with:

```txt
Company: FPT Software
Role: Software Engineering Intern
Type: Full-time
Period: Sep 2025 - Jan 2026
Location: Da Nang, Vietnam
Work mode: On-site
```

Description bullets:

```txt
Analyzed Java source code and application workflows to understand enterprise systems.
Created and maintained technical documentation following project standards and templates.
Collaborated with development teams to clarify business logic and system requirements.
Gained experience working in a professional software development environment.
```

Render as a timeline item similar to the reference HTML:

- vertical line
- current node
- role and company
- period/location metadata
- description bullets
- technology tags if present

---

## 9. Projects Content

Create `constants/projects.ts`.

### API Lens

```txt
Name: API Lens
Subtitle: AI-Powered REST API Quality Analyzer
Role: Founder & Full-Stack Developer
Featured: true
```

Description:

```txt
API Lens is a platform designed to analyze REST APIs and automatically detect API design issues, code quality problems, and API smells.
```

Features:

```txt
API Quality Scoring
API Smell Detection
Rule Engine Validation
AI Recommendations
AST Source Code Analysis
OpenAPI Support
```

Tech stack:

```txt
React
Node.js
Express.js
MongoDB
OpenAPI
GitHub Integration
```

API Lens must be visually larger than other projects. It should appear as the featured project at the top of the Projects section.

### KIX Shop

```txt
Name: KIX Shop
Subtitle: Sneaker E-Commerce Platform
Role: Team Leader & Backend Developer
Featured: false
```

Description:

```txt
A modern e-commerce platform focused on sneaker retail management with authentication, product management, cart system, order processing, and inventory management.
```

Tech stack:

```txt
MERN Stack
Cloudinary
Azure
GitHub Actions
Vercel
```

### Hostelink

```txt
Name: Hostelink
Subtitle: Hotel Booking Management System
Role: Backend Developer
Featured: false
```

Description:

```txt
A hotel reservation and management platform developed as an academic project.
```

If URLs are unknown, leave `liveDemoUrl` and `githubUrl` undefined and render disabled/hidden external links gracefully.

---

## 10. Achievements Content

Create `constants/achievements.ts` with:

```txt
Title: University Entrance Exam Ranking
Description: Ranked 55th out of approximately 100 students in the university entrance examination in 2021, demonstrating strong academic performance and a solid foundation for pursuing Software Engineering studies.
Year: 2021
```

```txt
Title: TOEIC 550
Description: TOEIC 550, demonstrating English ability for technical documentation, communication, and learning international software engineering resources.
Year: optional
```

---

## 11. Social Links

Create `constants/socials.ts` with:

```txt
GitHub: https://github.com/mit-suu
LinkedIn: https://www.linkedin.com/in/hieptran-dev/
Email: mailto:trantuanhiep28122003@gmail.com
```

Each social item must include:

- `id`
- `label`
- `url`
- `icon`

Every icon-only link needs an accessible label.

---

## 12. Visual Direction

Use the provided HTML reference as the main visual target.

Overall style:

- dark theme
- professional developer-focused layout
- fixed/sticky sidebar on desktop
- scrollable content on the right
- soft blue accent
- glass-like cards with restrained transparency
- subtle borders
- strong typography
- clear hierarchy
- premium but not noisy

Avoid:

- generic template look
- oversized landing page hero
- excessive gradients
- excessive animation
- hardcoded repeated data
- cluttered card nesting
- decorative blobs/orbs
- one-color-only palette

Reference layout proportions:

```txt
Desktop sidebar: 35%
Desktop content: 65%
Desktop main content padding: generous, approximately 6rem on large screens
Mobile: stacked layout, sidebar becomes top profile/navigation area
```

---

## 13. Theme and Color Tokens

Use CSS variables in `app/globals.css` and reference them through Tailwind-compatible utility classes or CSS.

Recommended tokens:

```css
:root {
  --background: #131315;
  --foreground: #e5e1e4;
  --surface: #131315;
  --surface-container-lowest: #0e0e10;
  --surface-container-low: #1c1b1d;
  --surface-container: #201f22;
  --surface-container-high: #2a2a2c;
  --surface-container-highest: #353437;
  --surface-variant: #353437;
  --on-surface: #e5e1e4;
  --on-surface-variant: #c2c6d6;
  --muted: #8c909f;
  --outline: #8c909f;
  --outline-variant: #424754;
  --primary: #adc6ff;
  --primary-container: #4d8eff;
  --on-primary: #002e6a;
  --accent-soft: rgba(173, 198, 255, 0.15);
}
```

Do not scatter raw color values across components. If custom colors are necessary, add a token first.

---

## 14. Typography

Use modern, readable typography.

Recommended:

- Geist or system sans for body/headings.
- JetBrains Mono or a system monospace for labels, tags, and metadata.

Do not use viewport-based font scaling. Keep letter spacing at `0` except for small uppercase labels where a small positive letter spacing is acceptable.

Suggested hierarchy:

```txt
Name / desktop heading: 48px, line-height 1.2, weight 600-700
Mobile name heading: 32px, line-height 1.2
Section heading: 30px, line-height 1.3
Body large: 18px, line-height 1.6
Body: 16px, line-height 1.6
Caption/tag: 12px-14px
```

---

## 15. Layout Requirements

### Sidebar

Desktop:

- fixed or sticky left sidebar
- full viewport height
- width around 35%
- contains profile image or avatar area if available
- contains name, role, intro, navigation, and social links
- can scroll internally if viewport height is small

Mobile:

- becomes top profile section
- navigation can wrap, stack, or become a compact list
- content stacks below it

Sidebar content:

```txt
Tran Tuan Hiep
Full-Stack Developer
Building scalable web applications with modern technologies. Passionate about creating reliable products, designing clean APIs, and delivering great user experiences.
Navigation links
Social links
```

### Main Content

Right side contains:

```txt
About
Skills
Experience
Projects
Achievements
Contact
```

Use semantic `<main>`, `<section>`, `<nav>`, `<article>`, and heading tags.

Each section needs:

- `id`
- `scroll-margin-top`
- consistent vertical spacing
- accessible heading

---

## 16. Active Navigation

Implement active section tracking.

Requirements:

- Smooth scroll on nav click.
- Active state on the current section.
- Hover state.
- Accessible links.
- Active nav line or accent indicator similar to the reference.

Suggested approach:

- Create a Client Component for `Sidebar` or `PortfolioShell`.
- Use Intersection Observer.
- Observe all sections by ID.
- Use a center-biased root margin such as `-45% 0px -45% 0px`.
- Store active section in React state.
- Apply `aria-current="true"` to the active link.

---

## 17. Mouse Aura Effect

Create:

```txt
components/effects/MouseAura.tsx
```

Requirements:

- Client Component.
- Soft radial glow around cursor.
- Follows the mouse smoothly.
- `pointer-events: none`.
- Fixed positioning.
- Low opacity.
- Works on dark theme.
- Hidden or reduced on touch/mobile devices.
- Respects `prefers-reduced-motion`.

Recommended implementation:

- Use GSAP `quickTo()` for frequent mouse position updates.
- Animate `x` and `y`, not `left` and `top`.
- Scope cleanup properly.
- Do not block clicks.

---

## 18. Loading Overlay

Create:

```txt
components/ui/FakeLoading.tsx
```

Behavior:

- Client Component.
- Shows a minimal loading overlay for around `100ms`.
- Fades out smoothly.
- Does not delay users longer than necessary.
- Respects `prefers-reduced-motion`.

Implementation notes:

- Use state and `setTimeout`.
- Cleanup timer on unmount.
- Use opacity/autoAlpha animation.
- Render `null` after exit completes if practical.

---

## 19. Animation Requirements

Use GSAP for custom animations in React. Keep animations subtle and professional.

Required motion:

- initial content fade/slide in
- section reveal on scroll or while entering viewport
- subtle project card hover lift
- featured project emphasis
- mouse aura
- loading overlay fade

Animation rules:

- Use `useGSAP()` from `@gsap/react`.
- Scope animations with refs.
- Clean up automatically through `useGSAP()` or manually via `ctx.revert()`.
- Prefer `autoAlpha`, `y`, `x`, `scale`, and `filter` if needed.
- Do not animate layout-heavy properties like `width`, `height`, `top`, `left`, `margin`, or `padding`.
- Use `gsap.matchMedia()` for responsive and reduced-motion variants.
- Remove any ScrollTrigger markers before completion.

Create shared animation constants/helpers in:

```txt
lib/animations.ts
```

Example values:

```ts
export const eases = {
  standard: "power2.out",
  emphasized: "power3.out",
};

export const durations = {
  fast: 0.2,
  normal: 0.45,
  slow: 0.7,
};
```

---

## 20. Cards and Components

### SkillCard

Render one skill category:

- icon
- title
- skill badges

### ProjectCard

Support two variants:

- featured
- standard

Featured card requirements:

- visually larger
- appears first
- stronger layout
- includes subtitle, role, description, features, tech stack, and links

Standard card requirements:

- compact grid card
- includes project name, subtitle, role, description, tech stack, and links if available

### ExperienceCard

Render timeline-style experience.

### AchievementCard

Render icon, title, description, and year if available.

### SocialLink

Render accessible icon link.

---

## 21. Contact Section

The contact section should make it easy to reach Hiep.

Include:

- short invitation text
- email card/link
- LinkedIn card/link
- GitHub link if appropriate

Use actual email:

```txt
trantuanhiep28122003@gmail.com
```

Do not use placeholder emails from the reference HTML.

---

## 22. Assets

If no personal photo is available, use a tasteful initials/avatar block instead of a fake portrait.

Do not depend on remote temporary image URLs from generated HTML references.

Options:

- initials avatar: `TH`
- local image in `public/` if user supplies one
- generated abstract/product images for project thumbnails only if needed

Project thumbnails are optional. If used, they must support `alt` text and stable dimensions.

---

## 23. Accessibility

Requirements:

- Semantic landmarks.
- One clear `h1`.
- Logical heading order.
- `aria-label` for icon-only links and buttons.
- `aria-current` for active navigation.
- Visible focus styles.
- Sufficient color contrast.
- Keyboard-accessible navigation.
- Respect `prefers-reduced-motion`.
- Do not hide important information behind hover-only interactions.

---

## 24. Responsive Behavior

Required breakpoints:

- Mobile: stacked layout, no fixed sidebar, readable spacing.
- Tablet: stacked or hybrid layout depending on available width.
- Desktop: fixed/sticky 35% sidebar and 65% content area.

Check:

- no horizontal overflow
- cards do not overlap
- long text wraps cleanly
- icon buttons stay square and stable
- section spacing remains balanced
- nav links remain usable on small screens

---

## 25. Implementation Notes

- Use `.map()` for all repeated UI lists.
- Keep constants typed with TypeScript.
- Keep components small and reusable.
- Use semantic HTML.
- Add accessible labels for icons and links.
- Optimize desktop first, then mobile.
- Use CSS variables or `config/theme.ts` for colors.
- Keep code readable and easy to extend.
- Use Tailwind utilities for most styling.
- Use CSS modules or global CSS only where they are a better fit.
- Avoid card-inside-card visual nesting.
- Keep card radius at `8px` or less unless the reference style requires slightly larger repeated item cards.
- Do not create a marketing landing page; the portfolio itself is the first screen.

---

## 26. Suggested Implementation Order

1. Read local Next.js docs listed in this guide.
2. Install missing dependencies.
3. Create shared types.
4. Create constants files.
5. Configure global CSS variables, base styles, and typography.
6. Build layout shell with sidebar and main content.
7. Build section components.
8. Build reusable cards and badges.
9. Add active navigation.
10. Add fake loading overlay.
11. Add mouse aura.
12. Add GSAP section/card animations.
13. Verify responsive behavior.
14. Run lint/build.

---

## 27. Verification

Before finishing, run:

```bash
npm run lint
npm run build
```

If a dev server is needed for visual QA:

```bash
npm run dev
```

Manually verify:

- desktop sticky sidebar works
- mobile layout stacks cleanly
- active nav updates while scrolling
- all repeated data comes from constants
- API Lens is clearly featured
- fake loading appears briefly
- mouse aura follows cursor and does not block clicks
- animations respect reduced motion
- links use real profile/social/contact data
- no placeholder email remains
- no broken remote temporary image URLs are required

---

## 28. Acceptance Criteria

The implementation is complete when:

- The site has a fixed/sticky left sidebar on desktop.
- The right content scrolls normally with all required sections.
- Mobile layout stacks cleanly.
- Data is rendered from constants using `.map()`.
- Theme colors are configurable from CSS variables and/or `config/theme.ts`.
- Mouse aura effect is implemented.
- Fake loading appears for around `100ms`.
- GSAP animations are used safely in Client Components.
- Active navigation works with scroll tracking.
- API Lens is the first and clearly featured project.
- All supplied profile, about, experience, project, achievement, and contact content is included.
- Icon-only links have accessible labels.
- Code structure is clean and maintainable.
- `npm run lint` passes or any remaining issue is clearly documented.
- `npm run build` passes or any remaining issue is clearly documented.
