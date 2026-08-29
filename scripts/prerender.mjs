/**
 * Prerenders every route of the built site to static HTML:
 *
 *   dist/index.html                 (home, replaces the bare SPA shell)
 *   dist/<route>/index.html         (every other indexable route)
 *
 * Why: the site is a client-side rendered SPA behind a boot-sequence loading
 * screen, so crawlers that fetch raw HTML (Bing, Yandex, link-preview bots,
 * some Google fetches) see an empty <div id="root">. Prerendered files are
 * served directly by Vercel — static files take precedence over the SPA
 * fallback rewrite — so every engine gets fully rendered HTML instantly.
 *
 * Run after a production build:  npm run build && npm run prerender
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { getRoutes } from "./seo-routes.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const PORT = 4173;
const ORIGIN = `http://localhost:${PORT}`;

function findChrome() {
  const candidates = [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    process.env.LOCALAPPDATA && resolve(process.env.LOCALAPPDATA, "Google/Chrome/Application/chrome.exe"),
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  ].filter(Boolean);
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  throw new Error("No Chrome/Edge found — prerendering needs a local browser. Deploy still works without it (SPA fallback).");
}

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((res, rej) => {
    const tick = async () => {
      try {
        const r = await fetch(url);
        if (r.ok) return res();
      } catch {
        /* server not up yet */
      }
      if (Date.now() - start > timeoutMs) return rej(new Error("vite preview did not start in time"));
      setTimeout(tick, 300);
    };
    tick();
  });
}

async function main() {
  if (!existsSync(DIST)) {
    throw new Error("dist/ not found — run `npm run build` first.");
  }
  const routes = getRoutes();

  // Serve the production build locally.
  const server = spawn(
    process.execPath,
    [resolve(ROOT, "node_modules/vite/bin/vite.js"), "preview", "--port", String(PORT), "--strictPort"],
    { cwd: ROOT, stdio: "ignore" }
  );

  try {
    await waitForServer(`${ORIGIN}/`);
    const browser = await puppeteer.launch({
      executablePath: findChrome(),
      headless: true,
      args: ["--no-sandbox", "--disable-gpu"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    for (const route of routes) {
      await page.goto(`${ORIGIN}${route}`, { waitUntil: "networkidle2", timeout: 60000 });

      // The aurora boot screen unmounts once loading completes — wait for it,
      // otherwise we would snapshot the loading screen instead of content.
      await page
        .waitForFunction(() => !document.querySelector(".boot-root"), { timeout: 45000 })
        .catch(() => console.warn(`  ! boot screen still visible for ${route} — snapshotting anyway`));

      // Let fonts, images and the 3D scene settle before snapshotting.
      await new Promise((r) => setTimeout(r, 1500));

      const html = await page.content();
      const file =
        route === "/"
          ? resolve(DIST, "index.html")
          : resolve(DIST, route.replace(/^\//, ""), "index.html");
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, html);
      console.log(`  prerendered ${route} -> dist${route === "/" ? "/index.html" : `${route}/index.html`}`);
    }

    await browser.close();
  } finally {
    server.kill();
  }

  console.log(`Prerendered ${routes.length} routes to dist/.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
