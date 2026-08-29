/**
 * Generates public/sitemap.xml and public/robots.txt from the site's data
 * layer. Runs automatically before every build (npm "prebuild") so the
 * sitemap can never go stale — new projects in src/data/projects.ts are
 * picked up on the next build.
 *
 * Submit the sitemap at:
 *   - Google Search Console  → https://search.google.com/search-console
 *   - Bing Webmaster Tools   → https://www.bing.com/webmasters (also feeds Yahoo/DuckDuckGo)
 *   - Yandex Webmaster       → https://webmaster.yandex.com
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL, getProjectSlugs, getRouteMeta } from "./seo-routes.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const meta = getRouteMeta();
const routes = [
  "/",
  "/about",
  "/projects",
  "/projects/tech",
  "/projects/other",
  ...getProjectSlugs().map((slug) => `/projects/${slug}`),
  "/certifications",
  "/contact",
  "/linkedin",
];

const lastmod = new Date().toISOString().slice(0, 10);

const urls = routes
  .map((path) => {
    const { changefreq, priority } = meta[path] ?? { changefreq: "monthly", priority: "0.7" };
    return [
      "  <url>",
      `    <loc>${SITE_URL}${path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /

# Sitemap - referenced by Google, Bing, Yandex and other crawlers
Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(resolve(ROOT, "public/sitemap.xml"), sitemap);
writeFileSync(resolve(ROOT, "public/robots.txt"), robots);

console.log(`SEO: wrote public/sitemap.xml (${routes.length} URLs, lastmod ${lastmod}) and public/robots.txt`);
