# Jyotirmay Khare — Full Stack Developer Portfolio

Personal developer portfolio for **Jyotirmay Khare**, built as a single-page React
application. The site tells the full-stack story — frontend, backend, databases and
cloud — wrapped in an interactive, dark “aurora-console” experience with a 3D
character scene, a boot-sequence loading screen, and a ⌘K / Ctrl+K command palette.

> 🔗 **Live site:** <https://jyotirmaykhare.dev/> — **Repo:** `jyotirmaykhare/Portfolio-website-`

---

## Table of Contents

- [Overview](#overview)
- [Highlights](#highlights)
- [Pages & Routes](#pages--routes)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Content & Data Architecture](#content--data-architecture)
- [Deployment](#deployment)
- [Author](#author)

---

## Overview

This portfolio is built on modern, typed tooling:

- **React 19 + TypeScript** rendered through **Vite 6** with fast HMR and strict, unused-code-safe compilation (`tsc -b`).
- **Tailwind CSS 4** via `@tailwindcss/vite` for utility-first styling, plus hand-written CSS for the loading screen and interactive scenes.
- A permanently **dark** theme (`data-theme="dark"`, `#0A0A0A`) enforced before first paint.
- Motion is purposeful and conservative (framer-motion variants, GSAP-driven 3D character, Lenis smooth scrolling, reduced-motion respected).

The content is **fully data-driven** — project detail, skills, certifications and the
entire LinkedIn re-creation layer live in `src/data` and are rendered by typed UI
components, so updating content never touches component code.

---

## Highlights

- **Aurora boot-sequence loading screen** — a themed loading experience that sets the tone before the app mounts.
- **3D character scene** — a real-time Three.js character (`@react-three/fiber`) with morph animations, HDRI environment lighting, Draco-compressed model (`public/models/character.enc`) and pointer/mouse interactions.
- **Command palette** — press `⌘K` / `Ctrl+K` anywhere to jump across the site.
- **Custom cursor, magnetic buttons & tilt cards** — micro-interaction flourishes used consistently across the UI.
- **Selected Work** — curated, verified project features with headline metrics only.
- **Technical Ecosystem** — the skill set organized into domains: frontend, backend & APIs, languages, data & storage, cloud & infrastructure, browser APIs, data visualization, testing & tooling, game development & IoT.
- **LinkedIn page** — a rich, data-driven hub modeling the profile: experience, education, certifications, people, organizations, posts with technology tags, featured posts, analytics, activity archive and a project/posts model.
- **Certifications vault** — downloadable certificate images/PDFs for verified courses.
- **Smooth scrolling** via Lenis, scroll-to-top + hash-anchor handling on route changes, single-page `main` layout with sticky navbar.

---

## Pages & Routes

| Route                  | Page                                                             |
| ---------------------- | ---------------------------------------------------------------- |
| `/`                    | Home — 3D intro, selected work, technical ecosystem, explore band |
| `/about`               | About — full-stack story, core domains, education, achievements  |
| `/projects`            | Projects hub                                                     |
| `/projects/tech`       | Tech projects                                                    |
| `/projects/other`      | Other projects (game dev, IoT, hardware, hackathons)             |
| `/projects/:slug`      | Project detail — metrics, features, flow, stack, challenges      |
| `/certifications`      | Certifications vault                                             |
| `/contact`             | Contact                                                          |
| `/linkedin`            | LinkedIn-style profile hub                                       |
| `*`                    | Custom 404                                                       |

### Featured projects (in `src/data/projects.ts`)

WaveBeats · TradeScope Pro · PriceRadar · LPU Navigator · StatusRadar · PostgreSQL Mastery · Game Narcissus

### Certifications (in `src/data/linkedin/certifications.ts`)

Code-A-Haunt 3.0 · Learning Full Stack React (Infosys Springboard) · CS105 Introduction to Python (Saylor Academy) · Productivity Time Management Mastery (MindLuster)
---

## Tech Stack

**Core framework**

| Area        | Tools                                                            |
| ----------- | ---------------------------------------------------------------- |
| Language    | TypeScript 5 (strict mode)                                       |
| UI          | React 19, react-dom                                              |
| Build       | Vite 6, `@vitejs/plugin-react`, `@tailwindcss/vite`              |
| Styling     | Tailwind CSS 4, custom CSS                                       |
| Routing     | React Router 7                                                    |
| Animation   | framer-motion, GSAP, lenis                                        |
| 3D / Canvas | @react-three/fiber, three, three-stdlib, Draco GLTF               |
| Icons       | lucide-react                                                      |
| Misc        | clsx, react-fast-marquee                                          |

**Dev / quality**

- ESLint (`npm run lint`)
- TypeScript build check (`tsc -b && vite build`)
- Node 18+ / npm recommended

---

## Project Structure

```
.
├── public/                    # Static assets served at root
│   ├── certificates/          # Certificate images + PDFs
│   ├── draco/                 # Draco GLTF decoder (js + wasm)
│   ├── models/                # 3D character + HDR environment
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── character/             # 3D character scene, FX, character model logic
│   ├── components/
│   │   ├── home/              # Home sections (SelectedWork, Ecosystem, KeepExploring)
│   │   ├── layout/            # Navbar, Footer, CommandPalette
│   │   ├── linkedin/          # LinkedIn page sections & cards
│   │   └── ui/                # Reusable primitives (Button, Container, Reveal, …)
│   ├── context/               # Loading provider & boot-sequence UI
│   ├── data/                  # ✍️ All site content (single source of truth)
│   │   ├── linkedin/          # Profile, experience, education, certs, posts, people, orgs
│   │   ├── projects.ts        # Full project data model
│   │   ├── site.ts            # Identity + social links
│   │   └── skills.ts          # Skill ecosystems
│   ├── hooks/                 # useSmoothScroll, useMagnetic, useTilt
│   ├── lib/                   # motion variants, cn() class helper
│   ├── pages/                 # Route-level pages
│   ├── styles/                # Interactive & lab CSS
│   ├── types/                 # Project + LinkedIn TS types
│   ├── App.tsx                # Router + global layout wiring
│   └── main.tsx               # React entry
├── index.html                 # SEO meta, JSON-LD, fonts, dark-theme bootstrap
├── vite.config.ts             # Vite + React + Tailwind + `@/` -> `src/`
├── tsconfig.json              # Strict TS config with `@/*` path alias
└── package.json
```

> The `@/` import alias maps to `./src` (see `vite.config.ts` and `tsconfig.json`).

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (host: true — reachable via localhost / LAN)
npm run dev

# 3. Build for production (type-check + bundle)
npm run build

# 4. Preview the production build locally
npm run preview

# 5. Lint
npm run lint
```

The dev server runs with `server.host: true` so both IPv4 (`127.0.0.1`) and IPv6
(`::1`) `localhost` connections are accepted regardless of OS resolution.

---

## Scripts

| Script          | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`     | Start Vite dev server                   |
| `npm run seo`     | Regenerate `public/sitemap.xml` + `public/robots.txt` from the data layer (runs automatically before every build) |
| `npm run og:image`| Re-render the 1200×630 social preview image to `public/og-image.png` (only needed after editing `scripts/og-template.html`) |
| `npm run build`   | Regenerate SEO files, type-check (`tsc -b`), then `vite build` |
| `npm run preview` | Preview the production build            |
| `npm run prerender`| Prerender every route to static HTML in `dist/` (run after `npm run build`) |
| `npm run lint`    | Run ESLint over the project             |

---

## Content & Data Architecture

- **`src/data/*`** is the single source of truth. `projects.ts` exports a fully typed
  `Project` model (slug, metrics, intro, chapters, feature groups, tech groups,
  flow, challenges, stack, `accuracyNotes`).
- The **LinkedIn layer** (`src/data/linkedin/`) is a barrel-exported content module
  with its own source provenance (`sources.ts`) and derived indexes (e.g.
  `relatedPostsByTech`, `postsForProject`, `hashtags`, `technologies`).
- **Verified-content policy:** only verified information is included; unverified
  sections (timelines, screenshots, claims) are intentionally omitted, and
  accuracy notes render only when present.

---

## Deployment

The site is a static Vite build (`npm run build`) that can be deployed to any
static host (Vercel, Netlify, Cloudflare Pages, Railway, AWS S3/CloudFront …).

**Recommended production flow:**

```bash
npm run build      # regenerates sitemap.xml + robots.txt, type-checks, bundles
npm run prerender  # snapshots every route to dist/<route>/index.html
```

### SEO architecture

- **Prerendering** — the app is a client-side rendered SPA behind a boot
  loading screen, so raw-HTML crawlers (Bing, Yandex, link-preview bots) would
  otherwise see an empty `<div id="root">`. `npm run prerender` writes fully
  rendered HTML for every route into `dist/`; static hosts serve these files
  directly (filesystem wins over the SPA fallback rewrite), so every search
  engine gets real content instantly. Re-run it after every build that changes
  content.
- **Per-route meta** — `src/components/Seo.tsx` keeps `<title>`, description,
  canonical URL, Open Graph and Twitter tags in sync with the active route;
  project pages also emit `BreadcrumbList` JSON-LD.
- **Sitemap & robots** — `scripts/generate-seo.mjs` derives the sitemap from
  `src/data/projects.ts` (with `lastmod`), so new projects are indexed
  automatically; `robots.txt` points all crawlers at the sitemap.
- **Social preview** — `public/og-image.png` (1200×630, generated from
  `scripts/og-template.html`) is referenced by the `og:image` / `twitter:image`
  tags in `index.html`.
- Static `index.html` also carries sitewide Open Graph, Twitter cards and
  JSON-LD `Person`/`WebSite` schemas. For client-side routing on static hosts,
  ensure unknown paths are rewritten to `index.html` (SPA fallback — see
  `vercel.json`).

### Submitting to search engines

After deploying, submit the sitemap (`https://jyotirmaykhare.dev/sitemap.xml`):

1. **Google Search Console** — <https://search.google.com/search-console> →
   verify `jyotirmaykhare.dev` (Domain property via DNS TXT is strongest) →
   *Sitemaps* → enter `sitemap.xml` → Submit.
2. **Bing Webmaster Tools** — <https://www.bing.com/webmasters> → verify the
   site (import from Google Search Console or DNS CNAME) → *Sitemaps* → submit.
   Bing also feeds Yahoo and DuckDuckGo.
3. **Yandex Webmaster** (optional) — <https://webmaster.yandex.com> → same flow.

No manual resubmission is needed afterwards — crawlers re-read `robots.txt`
(which advertises the sitemap) on every visit.

---

## Author

**Jyotirmay Khare** — Full Stack Developer

- 🌐 <https://jyotirmaykhare.dev/>
- GitHub: <https://github.com/jyotirmaykhare>
- LinkedIn: <https://www.linkedin.com/in/jyotirmay-khare>
- ✉️ <mailto:jyotirmaykhare@gmail.com>

---

Built with ❤️ using React, TypeScript, Vite and Tailwind CSS.