import type { Project } from "@/types";

/**
 * All project content lives here, fully data-driven and separated from UI.
 * Only verified information is included. Sections that do not have verified
 * content (timelines, screenshots, etc.) are intentionally omitted.
 */
export const projects: Project[] = [
  {
    slug: "wavebeats",
    name: "WaveBeats",
    category: "Music Streaming Platform",
    tagline: "A production-grade streaming web app built from scratch with zero frameworks.",
    summary:
      "Full-featured music streaming web application built in pure HTML5, CSS3 and Vanilla JavaScript — a serious media engineering project spanning browser audio APIs, local state persistence and a self-hosted cloud media layer.",
    accent: "#e8a13d",
    index: 0,
    links: [
      { label: "Live demo", href: "https://wavebeats.me/", external: true },
      { label: "GitHub", href: "https://github.com/jyotirmaykhare/wavebeats", external: true },
    ],
    metrics: [
      { label: "Songs", value: "102" },
      { label: "Artists", value: "15+" },
      { label: "Features", value: "21+" },
      { label: "Lines of JS", value: "3,000+" },
      { label: "Lines of CSS", value: "2,800+" },
      { label: "Frontend frameworks", value: "0" },
    ],
    intro: [
      "WaveBeats is a full-featured, production-grade music streaming web application inspired by modern streaming platforms — engineered from the ground up using pure HTML5, CSS3 and Vanilla JavaScript.",
      "It is deliberately dependency-free on the frontend: no frameworks, no external application libraries, only browser platform APIs. Every feature — from playback control to the queue and synced lyrics — is built on native web technologies.",
      "Beyond the player, WaveBeats is a media infrastructure project: a REST-backed song library served from a self-hosted AWS EC2 instance, delivered through Cloudflare, with audio streamed over HTTP range requests.",
    ],
    featureGroups: [
      {
        title: "Core audio engine",
        items: [
          "Play, pause, next, previous",
          "Seek & scrubbing",
          "Shuffle",
          "True-random shuffle via Fisher-Yates algorithm",
          "Repeat-one & repeat-all",
          "Volume control & mute with live percentage display",
          "Playback speed from 0.5× to 2×",
          "Progress bar with real-time timeupdate sync",
          "MM:SS live playback timestamps",
          "Now-playing strip with synced album-art transitions",
          "Queue management",
        ],
      },
      {
        title: "Library",
        items: [
          "Favorites with persistent storage",
          "Create, rename & delete playlists",
          "Drag-and-drop playlist reordering",
          "Recently played",
          "Full library + grid / list view",
          "Artist & album pages",
          "Search",
        ],
      },
      {
        title: "Advanced",
        items: [
          "Synced lyrics",
          "Audio visualizer",
          "Sound Capsule statistics dashboard",
          "Sleep timer",
          "Keyboard shortcuts",
          "Context menus",
          "Web Share API",
          "Breadcrumb navigation",
          "Skeleton loading",
          "Dark / light theme",
          "Responsive design",
        ],
      },
      {
        title: "Engineering details",
        items: [
          "Single-page application architecture — no full-page reloads",
          "Event-driven updates via the HTML5 Audio timeupdate listener",
          "GPU-accelerated CSS animations (transform / opacity) for 60fps interactions",
          "Event delegation to minimize DOM queries & listener overhead",
          "Case-insensitive real-time library search on every keystroke",
          "HTTPS-only encrypted audio delivery",
        ],
      },
    ],
    techGroups: [
      { title: "Frontend", items: ["HTML5", "CSS3", "Vanilla JavaScript"] },
      { title: "Browser APIs", items: ["Web Audio API", "Web Share API", "LocalStorage"] },
      { title: "Assets", items: ["Font Awesome", "Google Fonts"] },
      { title: "Infrastructure", items: ["AWS EC2", "Cloudflare"] },
    ],
    flow: [
      { label: "Browser", detail: "HTML / CSS / JavaScript" },
      { label: "Web Audio API", detail: "Playback engine" },
      { label: "LocalStorage", detail: "Persistent likes & theme" },
      { label: "HTTP requests", detail: "Metadata + audio" },
      { label: "AWS EC2 media server", detail: "Songs, covers, artist images" },
      { label: "Cloudflare delivery", detail: "Edge caching & delivery" },
      { label: "Netlify CDN", detail: "Static site hosting with CI/CD auto-deploy" },
    ],
    challenges: [
      "Streaming large audio reliably over HTTP using range requests",
      "Building a full audio engine on browser platform APIs without a framework",
      "Managing a large static media library (songs, covers, artist images)",
      "Persisting user state across sessions with LocalStorage",
      "Serving media from a self-hosted Ubuntu EC2 instance with CORS & cache-control",
      "Audio file size slowing Git pushes — solved by moving media to cloud hosting and storing only URLs in code",
      "LocalStorage size limits — solved by persisting only essential metadata (song IDs, playlist names) as serialized JSON",
      "Shuffle repeating songs — solved with a true Fisher-Yates randomization algorithm",
      "CSS animations causing layout shifts — solved by switching to transform/opacity transitions",
    ],
    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "Web Audio API", "LocalStorage", "REST API", "AWS EC2", "Cloudflare"],
    accuracyNotes: [
      "Uses the Web Audio API and streams audio via HTTP range requests from a self-hosted AWS EC2 media server delivered through Cloudflare.",
      "The original academic build (project report, Feb 2025) streamed songs from Cloudinary over HTTPS URLs and was deployed via Netlify CI/CD at wavebeats0.netlify.app — the current production version serves media from the self-hosted EC2/Cloudflare stack.",
      "No backend, database or paid API subscriptions — all user data (favorites, playlists, recently played) lives client-side in LocalStorage; no personally identifiable information is collected.",
    ],
  },
  {
    slug: "tradescope-pro",
    name: "TradeScope Pro",
    category: "Financial Market Intelligence Terminal",
    tagline: "A Bloomberg-inspired market intelligence terminal for live analysis.",
    summary:
      "A professional-grade FinTech market intelligence terminal covering NSE, BSE, forex, crypto, commodities and global indices — with live market data, advanced charting, technical indicators and a sentiment-scored news feed.",
    accent: "#4ade80",
    index: 1,
    links: [
      { label: "Live demo", href: "https://tradescopepro.netlify.app", external: true },
      { label: "GitHub", href: "https://github.com/jyotirmaykhare/TRADESCOPEPRO", external: true },
    ],
    metrics: [
      { label: "Markets", value: "6" },
      { label: "Chart types", value: "5" },
      { label: "Indicators", value: "8+" },
      { label: "Forex pairs", value: "8" },
      { label: "Global indices", value: "6" },
      { label: "Heatmap stocks", value: "19" },
    ],
    intro: [
      "TradeScope Pro is a professional-grade FinTech market intelligence terminal inspired by Bloomberg and TradingView. It aggregates live market data across NSE, BSE, forex, crypto, commodities and global indices into a single dashboard.",
      "The terminal includes advanced charting with zoom and pan, a technical-indicator engine (MA, EMA, Bollinger Bands, VWAP, RSI, MACD), market-wide heatmaps, gainers/losers and movers, plus a screener-style filtering view.",
      "A news intelligence layer ingests Google News RSS, scores headlines, classifies them as bullish / neutral / bearish, and surfaces the market-moving themes behind price action.",
    ],
    featureGroups: [
      {
        title: "Live market data",
        items: ["Live Indian stock market data", "Market open / closed detection", "Auto refresh", "Countdown timer", "Live ticker", "IST session auto-detection (Mon–Fri 9:15 AM – 3:30 PM)"],
      },
      {
        title: "Charting",
        items: ["Line, area & bar charts", "Candlestick-style chart", "Zoom & pan", "Volume analysis", "Crosshair tracking", "Time-range selectors (1D · 5D · 1M · 3M · 1Y)"],
      },
      {
        title: "Technical indicators",
        items: ["MA20", "MA50", "EMA20", "Bollinger Bands", "VWAP", "RSI", "MACD"],
      },
      {
        title: "Market intelligence",
        items: [
          "Market heatmap",
          "Gainers, losers & movers",
          "Screener-style filtering",
          "Financial news via Google News RSS",
          "Sentiment classification: bullish / neutral / bearish",
          "Keyword trend extraction",
          "Fallback headlines",
          "Forex pairs: USD/INR, EUR/USD, GBP/USD",
          "Global indices: NASDAQ, Dow Jones, Nikkei",
          "Commodities: Gold, Silver, Crude Oil",
          "Crypto: BTC, ETH",
        ],
      },
      {
        title: "Derivatives (F&O) terminal",
        items: [
          "Full NIFTY options chain — Call/Put LTP, Change, IV%, OI & Volume",
          "ATM strike auto-detection with visual highlighting",
          "PCR (Put-Call Ratio) computation with signal interpretation",
          "Max Call OI / Max Put OI support & resistance levels",
          "Active futures contracts — expiries, Basis, Lot Size, Cost of Carry",
          "OI analysis charts — Call/Put OI by strike, Calls vs Puts overlay",
          "IV Smile chart across strikes",
          "Greeks dashboard — Delta, Gamma, Vega, Theta, ATM IV, Straddle cost",
        ],
      },
    ],
    techGroups: [
      { title: "Frontend", items: ["HTML5", "CSS3", "Vanilla JavaScript"] },
      { title: "Visualization", items: ["Chart.js", "Chart.js zoom / pan plugins"] },
      { title: "Data", items: ["Yahoo Finance market data", "Google News RSS", "NSE India F&O data (Options Chain, OI, Futures)"] },
      { title: "Network", items: ["Multi-proxy fetch layer", "Rate-limit backoff with jitter", "In-memory TTL cache", "Parallel batched requests (Promise.all)"] },
      { title: "Deployment", items: ["Netlify"] },
    ],
    flow: [
      { label: "Market data", detail: "Yahoo Finance" },
      { label: "Fetch / proxy layer", detail: "Multi-proxy resilience" },
      { label: "Market engine", detail: "Processing & normalization" },
      { label: "Chart engine", detail: "Chart.js with zoom / pan" },
      { label: "Technical indicators", detail: "MA, EMA, Bollinger, VWAP, RSI, MACD" },
      { label: "Sentiment engine", detail: "Keyword scoring → Bullish / Neutral / Bearish" },
      { label: "F&O calculator", detail: "PCR, IV Smile & Greeks computation" },
      { label: "Dashboard", detail: "Terminal UI" },
    ],
    challenges: [
      "Integrating multiple live market data sources with CORS and reliability constraints",
      "Building an interactive chart engine with zoom, pan and technical indicators",
      "Aggregating and sentiment-scoring news headlines from RSS",
      "Delivering a dense, terminal-style interface that stays responsive",
      "Rate-limit resilience via exponential backoff with jitter across rotating CORS proxies",
      "Computing options analytics client-side — PCR, IV smile interpolation and Greeks",
    ],
    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "Chart.js", "Yahoo Finance", "Google News RSS", "NSE India F&O data", "Multi-proxy fetch layer", "Netlify"],
    accuracyNotes: [
      "This is a market intelligence and visualization terminal, not a brokerage or trading-execution platform.",
      "Built for educational purposes only — it does not constitute financial advice.",
      "Purely client-side SPA: no backend server; all data is fetched from public financial APIs through a multi-proxy CORS layer, per the project report (academic year 2025–26).",
    ],
  },
  {
    slug: "priceradar",
    name: "PriceRadar",
    category: "Price Intelligence Platform",
    tagline: "A full-stack price comparison and price-intelligence platform.",
    summary:
      "SmartPrice AI / PriceRadar is a full-stack platform that tracks product prices across seven e-commerce platforms, compares deals, visualizes yearly trends and produces intelligent buying recommendations.",
    accent: "#2dd4bf",
    index: 2,
    links: [
      { label: "Live demo", href: "https://priceradar-blue.vercel.app", external: true },
      { label: "GitHub", href: "https://github.com/jyotirmaykhare/priceradar", external: true },
    ],
    metrics: [
      { label: "Platforms", value: "7" },
      { label: "Backend", value: "Flask" },
      { label: "Cache window", value: "60s" },
    ],
    intro: [
      "PriceRadar is a full-stack price comparison and price-intelligence platform. It searches a product across multiple e-commerce platforms in real time, compares live prices and discounts, visualizes historical price trends, and recommends the best deal.",
      "The backend, built in Python with Flask, runs resilient scrapers through a rotating proxy layer with retry logic and exponential backoff. Results are cached, normalized and ranked before being served over a REST API.",
      "The frontend renders multi-platform results, discount comparisons, a yearly price-trend chart and best-deal recommendations — with graceful offline and mock fallbacks so the experience never hard-breaks.",
    ],
    featureGroups: [
      {
        title: "Product intelligence",
        items: [
          "Multi-platform search — Amazon, Flipkart, Myntra, Meesho, Croma, Nykaa & Snapdeal",
          "Live scraping",
          "Price comparison",
          "Yearly price-trend visualization",
          "AI price-drop prediction concept",
          "Discount comparison",
          "Best-deal recommendation",
          "Direct redirect",
          "Target-price alerts",
          "Alerts & compare list persisted in localStorage",
        ],
      },
      {
        title: "Resilience",
        items: ["Price alerts", "Offline fallback", "Mock data fallback", "Retry logic", "Caching"],
      },
      {
        title: "Architecture",
        items: ["REST API", "Backend scraper service", "Vercel frontend + Railway backend"],
      },
    ],
    techGroups: [
      { title: "Frontend", items: ["HTML5", "CSS3", "Vanilla JavaScript", "Canvas API", "localStorage"] },
      { title: "Backend", items: ["Python", "Flask", "Gunicorn"] },
      { title: "Scraping", items: ["ScraperAPI", "BeautifulSoup4", "lxml", "Requests"] },
      { title: "Infrastructure", items: ["Railway (backend)", "Vercel (frontend)"] },
    ],
    flow: [
      { label: "Frontend", detail: "app.js · api.js · tracker.js · ui.js · chart.js" },
      { label: "Flask /search", detail: "REST API" },
      { label: "ScraperAPI", detail: "Rotating proxy" },
      { label: "Platform scrapers", detail: "Amazon, Flipkart, Myntra, Meesho, Croma, Nykaa, Snapdeal" },
      { label: "Normalization", detail: "platform · name · price · original_price · discount · url · image" },
      { label: "Cache & ranking", detail: "60s cache, best-deal ranking" },
      { label: "Frontend UI", detail: "Comparison & trend view" },
    ],
    challenges: [
      "Scraping across multiple diverse e-commerce platforms reliably",
      "Maintaining proxy reliability with rotating user agents and retry logic",
      "Implementing multiple selector fallbacks and structural scraping",
      "Gracefully degrading when a scraper fails (cache + mock fallback)",
    ],
    stack: ["Python", "Flask", "ScraperAPI", "BeautifulSoup4", "lxml", "Requests", "Gunicorn", "Canvas API", "Vercel", "Railway"],
    accuracyNotes: [
      "The AI price-drop prediction is an intended product direction and is presented as a concept, not a trained production ML model.",
    ],
  },
  {
    slug: "lpu-navigator",
    name: "LPU Navigator",
    category: "Smart Campus Platform",
    tagline: "An interactive campus map, routing and information platform.",
    summary:
      "A comprehensive campus navigation and information platform for Lovely Professional University combining interactive maps, routing, smart suggestions, a chatbot, events, notifications, facilities and profiles — built on a React + TypeScript foundation.",
    accent: "#60a5fa",
    index: 3,
    links: [],
    metrics: [
      { label: "Language", value: "TypeScript" },
      { label: "Framework", value: "React 18" },
      { label: "Mapping", value: "Leaflet" },
    ],
    intro: [
      "LPU Navigator is a comprehensive campus platform that combines interactive maps, routing, smart suggestions, chatbot assistance, events, notifications, facilities and profiles into one extensible app.",
      "The frontend is built with React 18 and TypeScript on Vite, styled with Tailwind CSS and a shadcn/ui-based component library. Interactive mapping uses React Leaflet with marker clustering and the Leaflet Routing Machine.",
      "The architecture separates a typed React component layer from application logic (React Query) and an Express backend, keeping the system modular and ready to grow toward AR/3D campus views.",
    ],
    featureGroups: [
      {
        title: "Mapping & navigation",
        items: ["Interactive campus map", "Routing", "Marker clustering", "Smart suggestions"],
      },
      {
        title: "Campus services",
        items: ["Chatbot", "Notifications", "Events", "User profiles", "Facilities", "Issue reporting"],
      },
      { title: "Platform", items: ["Dark mode", "Responsive design", "Extensible component architecture"] },
    ],
    techGroups: [
      { title: "Frontend", items: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Radix UI", "Lucide React"] },
      { title: "Mapping", items: ["React Leaflet", "Leaflet Routing Machine", "MapCluster"] },
      { title: "Data & state", items: ["React Query", "React Router", "Recharts", "date-fns", "cmdk", "zod", "sonner", "next-themes"] },
      { title: "Backend", items: ["Express", "CORS"] },
      { title: "Testing", items: ["Vitest", "Playwright", "Testing Library", "ESLint"] },
    ],
    flow: [
      { label: "React", detail: "Typed component layer" },
      { label: "Application logic", detail: "React Query / state" },
      { label: "Leaflet mapping", detail: "Map, routing & cluster" },
      { label: "Express backend", detail: "API + CORS" },
      { label: "Campus services", detail: "Events, facilities, notifications" },
    ],
    challenges: [
      "Integrating interactive mapping, routing and marker clustering into a typed React architecture",
      "Building a reusable shadcn/ui-based component system",
      "Keeping the app responsive across campus surfaces",
      "Designing the architecture to stay extensible for future AR/3D",
    ],
    stack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Radix UI", "React Leaflet", "React Query", "Express", "Vitest", "Playwright"],
    accuracyNotes: [
      "AR/3D campus navigation is a future integration and is not yet implemented.",
      "A verified live demo and repository URL have not been provided, so external links are intentionally omitted here.",
    ],
  },
  {
    slug: "status-radar",
    name: "StatusRadar",
    category: "Real-Time API Health Intelligence",
    tagline: "Monitor 20+ critical APIs in one resilient, unified console.",
    summary:
      "A real-time developer infrastructure monitoring dashboard that watches 20+ critical APIs in a unified interface — with live status, latency, uptime history and an incident ticker, engineered to never hard-break when an external status endpoint fails.",
    accent: "#34d399",
    index: 4,
    links: [
      { label: "Live demo", href: "https://api-status-radar.vercel.app", external: true },
      { label: "GitHub", href: "https://github.com/jyotirmaykhare/API-STATUS-RADAR", external: true },
    ],
    metrics: [
      { label: "Monitored APIs", value: "20+" },
      { label: "Refresh", value: "30s" },
      { label: "Backend", value: "None" },
    ],
    intro: [
      "StatusRadar is a real-time observability dashboard that monitors 20+ critical third-party and infrastructure APIs in a single unified interface. It is intentionally a pure-frontend application — no backend, no database, no authentication.",
      "Each monitored service reports its live operational state (operational, degraded, major outage, maintenance), latency and uptime history with sparkline visualizations. A global incident ticker surfaces recent state changes.",
      "The core engineering challenge is resilience: a primary CORS proxy falls through to a secondary proxy, then to an intelligent mock layer — so the interface never simply breaks because an external status endpoint is unavailable.",
    ],
    featureGroups: [
      {
        title: "Monitoring",
        items: [
          "20+ monitored APIs",
          "Live status: operational / degraded / major outage / maintenance",
          "Latency monitoring",
          "Response-time indicators",
          "Uptime history",
          "Sparkline visualizations",
        ],
      },
      {
        title: "Console",
        items: ["Search", "Status filters", "Sorting", "Incident ticker", "Auto refresh every 30s"],
      },
      {
        title: "Resilience",
        items: ["Primary CORS proxy", "Secondary proxy fallback", "Intelligent mock layer", "Never hard-breaks on external failures"],
      },
    ],
    techGroups: [
      { title: "Frontend", items: ["HTML5", "CSS3", "Vanilla JavaScript"] },
      { title: "Data", items: ["Public status endpoints"] },
      { title: "Deployment", items: ["Vercel"] },
    ],
    flow: [
      { label: "Status endpoints", detail: "20+ public services" },
      { label: "Primary proxy", detail: "CORS proxy" },
      { label: "Secondary proxy", detail: "Fallback" },
      { label: "Mock layer", detail: "Intelligent last-resort data" },
      { label: "Dashboard", detail: "Live status, latency & uptime" },
    ],
    challenges: [
      "External API reliability and CORS constraints",
      "Designing a resilient multi-layer fallback strategy",
      "Real-time polling on a schedule",
      "Rendering live latency and uptime visualizations smoothly",
    ],
    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "Public status endpoints", "Vercel"],
    accuracyNotes: [
      "StatusRadar is a pure-frontend application — it has no backend, database or authentication.",
    ],
  },
  {
    slug: "postgresql-mastery",
    name: "PostgreSQL Mastery",
    category: "Interactive Database Learning Platform",
    tagline: "An offline-first, client-side SQL learning environment.",
    summary:
      "An interactive PostgreSQL learning platform covering database fundamentals, relational operations, database design, PL/pgSQL, transactions and modern NoSQL concepts — with 300 questions across 6 chapters, run entirely client-side with zero tracking.",
    accent: "#38bdf8",
    index: 5,
    links: [
      { label: "Live demo", href: "https://postgresql-platform.vercel.app/", external: true },
      { label: "GitHub", href: "https://github.com/jyotirmaykhare/postgresql-platform", external: true },
    ],
    metrics: [
      { label: "Chapters", value: "6" },
      { label: "Questions", value: "300" },
      { label: "Questions / chapter", value: "50" },
    ],
    intro: [
      "PostgreSQL Mastery is an interactive, offline-first learning platform that teaches relational databases through structured chapters, syntax-highlighted SQL, diagrams and 300 practice questions across 6 chapters.",
      "Content spans database fundamentals, relational query languages and operations, database design, PL/pgSQL & transactions, and modern NoSQL concepts — presented with flowcharts, architecture and transaction-lifecycle diagrams.",
      "By design it is 100% client-side: questions live in static JavaScript arrays, while localStorage persists best scores, attempts and progress. There is no server, database, sign-up, cookie, analytics or tracking.",
    ],
    chapters: [
      { numeral: "I", title: "Introduction to Databases" },
      { numeral: "II", title: "Relational Query Languages" },
      { numeral: "III", title: "Relational Operations" },
      { numeral: "IV", title: "Database Design" },
      { numeral: "V", title: "PL/pgSQL & Transactions" },
      { numeral: "VI", title: "NoSQL Databases" },
    ],
    featureGroups: [
      {
        title: "Learning",
        items: [
          "Tabbed chapters",
          "DDL, DML, DCL & TCL",
          "Syntax-highlighted code",
          "One-click copy",
          "Flowcharts & architecture diagrams",
          "Transaction-lifecycle diagrams",
          "Common mistakes",
        ],
      },
      {
        title: "Quizzes",
        items: ["Interactive quizzes", "Difficulty filtering", "Shuffle", "Instant feedback with explanations", "Progress tracking", "LinkedIn sharing"],
      },
      {
        title: "Offline-first",
        items: [
          "100% client-side storage",
          "Best scores, attempts, chapter progress & quiz settings in localStorage",
          "In-memory session state",
          "Offline capability",
        ],
      },
    ],
    techGroups: [
      { title: "Frontend", items: ["HTML5", "CSS3", "Vanilla JavaScript"] },
      { title: "Storage", items: ["localStorage", "In-memory session state"] },
      { title: "Content", items: ["Static JavaScript question arrays"] },
      { title: "Deployment", items: ["Vercel"] },
    ],
    flow: [
      { label: "Browser", detail: "index.html" },
      { label: "Chapter content", detail: "Structured lessons" },
      { label: "Quiz engine", detail: "Question selection & feedback" },
      { label: "Session state", detail: "Current question, answers, shuffle" },
      { label: "localStorage", detail: "Persistent progress & best scores" },
      { label: "Progress UI", detail: "Per-chapter tracking" },
    ],
    challenges: [
      "Architecturing a robust quiz engine with shuffle and difficulty filtering",
      "Managing client-side persistence without a backend",
      "Organizing a large volume of educational content",
      "Keeping the experience fully offline and private",
    ],
    stack: ["HTML5", "CSS3", "Vanilla JavaScript", "localStorage", "Vercel"],
    accuracyNotes: [
      "Fully client-side and offline-first: there is no backend database — all storage is in localStorage and in-memory session state, with no cookies, analytics or tracking.",
    ],
  },
  {
    slug: "game-narcissus",
    name: "Game Narcissus",
    category: "Game Development",
    tagline: "A game project built in the Godot Engine with GDScript.",
    summary:
      "Game Narcissus is a game-development project built with the Godot Engine and GDScript — an exploration of interactive systems, gameplay programming and real-time experience design.",
    accent: "#c4b5fd",
    index: 6,
    links: [],
    metrics: [{ label: "Engine", value: "Godot" }, { label: "Language", value: "GDScript" }],
    intro: [
      "Game Narcissus is a game-development project that explores the craft of building interactive experiences with the Godot Engine and GDScript.",
      "It is an exercise in gameplay programming and real-time systems — a different kind of engineering that shares much of the same discipline as building software products: managing state, systems and player feedback in real time.",
    ],
    featureGroups: [
      {
        title: "Game development",
        items: ["Gameplay programming", "Game mechanics", "Interactive systems", "Level design", "UI & animation"],
      },
      { title: "Tooling", items: ["Godot Engine", "GDScript"] },
    ],
    techGroups: [
      { title: "Engine", items: ["Godot Engine"] },
      { title: "Language", items: ["GDScript"] },
    ],
    flow: [
      { label: "Godot Engine", detail: "Game runtime & scene system" },
      { label: "GDScript", detail: "Gameplay logic & mechanics" },
      { label: "Interactive systems", detail: "Player-facing systems" },
    ],
    challenges: ["Real-time gameplay programming", "Designing interactive game mechanics and systems"],
    stack: ["Godot Engine", "GDScript"],
    accuracyNotes: [
      "Specific gameplay mechanics, story, art and metrics are not yet documented and are intentionally not described here.",
    ],
  },

];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

