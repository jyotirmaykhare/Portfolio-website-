export interface SkillEcosystem {
  title: string;
  blurb: string;
  items: string[];
}

export const ecosystems: SkillEcosystem[] = [
  {
    title: "Frontend",
    blurb: "Interfaces people actually enjoy using.",
    items: ["React", "Vite", "TypeScript", "Tailwind CSS", "shadcn/ui", "React Router", "React Query"],
  },
  {
    title: "Backend & APIs",
    blurb: "Services that turn ideas into request/response reality.",
    items: ["Python", "Flask", "Express", "REST APIs", "Gunicorn"],
  },
  {
    title: "Languages",
    blurb: "The tools I reach for across contexts.",
    items: ["HTML5", "CSS3", "JavaScript", "Python", "C++", "SQL", "GDScript"],
  },
  {
    title: "Data & Storage",
    blurb: "Where state lives and how it flows.",
    items: ["PostgreSQL", "MongoDB", "LocalStorage", "IndexedDB concepts"],
  },
  {
    title: "Cloud & Infrastructure",
    blurb: "Shipping and serving products in the real world.",
    items: ["AWS EC2", "Cloudflare", "Vercel", "Railway", "Netlify", "GitHub"],
  },
  {
    title: "Interactive & Browser APIs",
    blurb: "The platform underneath modern web products.",
    items: ["Web Audio API", "Canvas API", "Web Share API", "Drag & Drop API", "requestAnimationFrame"],
  },
  {
    title: "Data visualization",
    blurb: "Turning signals into insight.",
    items: ["Chart.js", "Recharts", "Leaflet", "Sparklines"],
  },
  {
    title: "Testing & tooling",
    blurb: "Confidence, speed and clean code.",
    items: ["Git", "GitHub", "Linux CLI", "VS Code", "ESLint", "Vitest", "Playwright", "Testing Library"],
  },
  {
    title: "Game development & IoT",
    blurb: "Interactive systems on screen — and off it.",
    items: ["Godot Engine", "Aseprite", "Arduino", "IoT sensors"],
  },
];
