import type {
  CollectionNote,
  Post,
  PostEngagement,
  Source,
} from "@/types";
import { derivedSource, linkedinIndexSource, manualInputSource } from "@/data/linkedin/sources";

/**
 * Posts confirmed from public search-indexing of the author's LinkedIn shares.
 * Only the share URL, the share title/first-line and the hashtags encoded in
 * the URL slug are confirmed. Full body, exact dates, media and engagement
 * are login-walled / not indexed → null / unavailable (never fabricated).
 *
 * `order` is derived from the monotonic activity IDs (confidence: "derived").
 * Project links are CONFIRMED only where the slug names the project (#wavebeats);
 * others are explicitly inferred by topic and flagged in each post's source.note.
 */

/** Normalise an indexed hashtag slug → technology name. */
const HASHTAG_TO_TECH: Record<string, string> = {
  javascript: "JavaScript",
  python: "Python",
  flask: "Flask",
  postgresql: "PostgreSQL",
  sql: "SQL",
  aws: "AWS",
  ec2: "EC2",
  webgl: "WebGL",
  html: "HTML5",
  css: "CSS3",
  css3: "CSS3",
};

function techFromHashtags(hashtags: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const tag of hashtags) {
    const tech = HASHTAG_TO_TECH[tag.toLowerCase()];
    if (tech && !seen.has(tech)) {
      seen.add(tech);
      out.push(tech);
    }
  }
  return out;
}

/** Per-post engagement is private + unindexed for EVERY post → all null.
 *  A fresh object per call so numbers can never leak between posts. */
function unavailableEngagement(): PostEngagement {
  const s: Source = {
    ...manualInputSource,
    note:
      "Per-post engagement (views/likes/comments/reposts) is private on " +
      "LinkedIn and absent from every public index. Not fabricatable.",
  };
  return { views: null, likes: null, comments: null, reposts: null, source: s };
}

interface PostArgs {
  id: string;
  url: string;
  indexedPreview: string;
  order: number;
  hashtags: string[];
  category: string;
  relatedProjectIds: string[];
  note: string;
}

function post(args: PostArgs): Post {
  return {
    id: args.id,
    url: args.url,
    date: null, // exact dates not surfaced by any index → unavailable
    order: args.order, // derived from monotonic activity IDs
    fullText: null, // share body is login-walled / not indexed
    indexedPreview: args.indexedPreview,
    hashtags: args.hashtags,
    mentions: [],
    media: [],
    category: args.category,
    relatedProjectIds: args.relatedProjectIds,
    tech: techFromHashtags(args.hashtags),
    engagement: unavailableEngagement(),
    source: {
      ...linkedinIndexSource,
      note:
        "Share URL, title/first-line and hashtag slug confirmed from public " +
        "search-indexing of this LinkedIn share. Full body, media, exact date " +
        "and engagement are login-walled / not indexed → unavailable. Order " +
        "derived from activity-ID magnitude. " + args.note,
    },
  };
}

export const posts: Post[] = [
  // 1 — JS challenge (topic-consistent with WaveBeats, not explicitly tagged)
  post({
    id: "7428755173621100544",
    url: "https://www.linkedin.com/posts/jyotirmay-khare_webdevelopment-javascript-frontenddeveloper-activity-7428755173621100544-2j59",
    indexedPreview: "A few weeks ago, I challenged myself with one question:",
    order: 1,
    hashtags: ["webdevelopment", "javascript", "frontenddeveloper"],
    category: "Code challenge",
    relatedProjectIds: [],
    note: "No project slug in the share; left unlinked to avoid guessing.",
  }),
  // 2 — "India Doesn't Need Another Stock Tracker" → TradeScope Pro (inferred)
  post({
    id: "7431287389832249344",
    url: "https://www.linkedin.com/posts/jyotirmay-khare_fintech-frontenddeveloper-javascript-activity-7431287389832249344-uzM5",
    indexedPreview: "🚀 India Doesn't Need Another Stock Tracker.",
    order: 2,
    hashtags: ["fintech", "frontenddeveloper", "javascript"],
    category: "Project showcase",
    relatedProjectIds: ["tradescope-pro"],
    note: "Linked to tradescope-pro by topic (stock tracker ≠ explicit tag).",
  }),
  // 3 — "5 tabs to buy online" → PriceRadar (inferred)
  post({
    id: "7433562486655762433",
    url: "https://www.linkedin.com/posts/jyotirmay-khare_python-flask-javascript-activity-7433562486655762433-qL43",
    indexedPreview:
      "I got tired of switching between 5 tabs every time I wanted to buy something online.",
    order: 3,
    hashtags: ["python", "flask", "javascript"],
    category: "Project showcase",
    relatedProjectIds: ["priceradar"],
    note: "Linked to priceradar by topic (price comparison ≠ explicit tag).",
  }),
  // 4 — SQL post → PostgreSQL Mastery (inferred)
  post({
    id: "7435203393889054721",
    url: "https://www.linkedin.com/posts/jyotirmay-khare_postgresql-sql-databaseengineering-activity-7435203393889054721-233-",
    indexedPreview: "99% of developers can write a SQL query.",
    order: 4,
    hashtags: ["postgresql", "sql", "databaseengineering"],
    category: "Tutorial / Insight",
    relatedProjectIds: ["postgresql-mastery"],
    note: "Linked to postgresql-mastery by topic (#postgresql/#sql ≠ explicit tag).",
  }),
  // 5 — WaveBeats Version 2 (EXPLICIT #wavebeats)
  post({
    id: "7436448791601377280",
    url: "https://www.linkedin.com/posts/jyotirmay-khare_wavebeats-wavebeatsv2-musicstreaming-activity-7436448791601377280-nPO0",
    indexedPreview: "🎵 WaveBeats Version 2 — Born from a spark, built with passion!",
    order: 5,
    hashtags: ["wavebeats", "wavebeatsv2", "musicstreaming"],
    category: "Project update",
    relatedProjectIds: ["wavebeats"],
    note: "Explicitly tagged #wavebeats — confirmed link.",
  }),
    // 6 — "WaveBeats post broke my notifications" (EXPLICIT #wavebeats)
  post({
    id: "7437546534453530624",
    url: "https://www.linkedin.com/posts/jyotirmay-khare_wavebeats-buildinpublic-vanillajavascript-activity-7437546534453530624-yoDj",
    indexedPreview:
      "🔥 That one WaveBeats post broke my notifications — and my DMs haven't stopped since.",
    order: 6,
    hashtags: ["wavebeats", "buildinpublic", "vanillajavascript"],
    category: "Growth / traction",
    relatedProjectIds: ["wavebeats"],
    note: "Explicitly tagged #wavebeats — confirmed link.",
  }),
  // 7 — "frontend broke on AWS EC2" → TradeScope Pro (inferred)
  post({
    id: "7494731819456634880",
    url: "https://www.linkedin.com/posts/jyotirmay-khare_webdevelopment-aws-ec2-activity-7494731819456634880-8y1U",
    indexedPreview: "🚨 I thought I had broken my frontend.",
    order: 7,
    hashtags: ["webdevelopment", "aws", "ec2"],
    category: "Production / Debugging",
    relatedProjectIds: ["tradescope-pro"],
    note: "Linked to tradescope-pro by inference (runs on AWS EC2 per portfolio).",
  }),
  // 8 — LinkedIn growth reflections (LinkedIn auto-title)
  post({
    id: "7496179763456147456",
    url: "https://www.linkedin.com/posts/jyotirmay-khare_linkedingrowth-buildinpublic-softwareengineering-activity-7496179763456147456-3gAq",
    indexedPreview: "Jyotirmay Khare's post",
    order: 8,
    hashtags: ["linkedingrowth", "buildinpublic", "softwareengineering"],
    category: "Reflection / Building in public",
    relatedProjectIds: [],
    note: "LinkedIn auto-generated title; no project named — left unlinked.",
  }),
];

/** Lookups + collection metadata */

export function getPost(id: string): Post | undefined {
  return posts.find((p) => p.id === id);
}

export const postById: Record<string, Post> = Object.fromEntries(
  posts.map((p) => [p.id, p])
);

export const postsMeta: CollectionNote = {
  available: true,
  confidence: "publicly_discovered",
  note:
    "Eight posts confirmed from public search-indexing of the author's LinkedIn " +
    "shares. Only the share URL, title/first-line and hashtag slug are confirmed; " +
    "full bodies, exact dates, media and per-post engagement are login-walled and " +
    "therefore unavailable.",
  source: linkedinIndexSource,
};

export { derivedSource };
