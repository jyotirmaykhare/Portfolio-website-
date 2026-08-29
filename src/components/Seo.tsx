import { useEffect } from "react";
import { site } from "@/data/site";

/**
 * Per-route SEO metadata.
 *
 * The site is a client-side rendered SPA, so route-level tags can't live in
 * the static index.html alone. Mount <Seo> inside every page to keep
 * <title>, description, canonical, Open Graph and Twitter tags in sync with
 * the active route — the tags search engines and link-preview scrapers read.
 */
interface SeoProps {
  title: string;
  description: string;
  /** Canonical path beginning with "/" (default "/"). */
  path?: string;
  /** Set on error pages to keep them out of the index. */
  noindex?: boolean;
  /** Optional JSON-LD structured data (object or array of objects). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = site.url.replace(/\/$/, "");
const DEFAULT_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1";
const ROUTE_JSONLD_ID = "route-jsonld";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Word-boundary truncate for meta descriptions (~155 char sweet spot). */
function truncate(text: string, max = 158) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,.;:!?—-]+$/, "")}…`;
}

export function Seo({ title, description, path = "/", noindex = false, jsonLd }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    document.title = title;
    upsertMeta("name", "description", truncate(description));
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : DEFAULT_ROBOTS);
    upsertCanonical(url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", truncate(description));
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "website");

    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", truncate(description));

    // Route-level JSON-LD — swapped in/out on navigation.
    const existing = document.getElementById(ROUTE_JSONLD_ID);
    if (jsonLd) {
      const payload = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      const tag = existing ?? document.createElement("script");
      tag.id = ROUTE_JSONLD_ID;
      tag.setAttribute("type", "application/ld+json");
      tag.textContent = JSON.stringify(payload);
      if (!existing) document.head.appendChild(tag);
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, path, noindex, jsonLd]);

  return null;
}

export default Seo;
