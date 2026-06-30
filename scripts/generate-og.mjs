// Build-time OG / hero image generator. The card + motif rendering lives in
// scripts/og-lib.mjs. One public/og/<slug>.png per blog post (motif via the
// `ogVariant` frontmatter; title via `ogTitle` ?? `title`). Skipped when the
// post declares a custom `cover`.
//
// Fully static (no runtime), which matters under `output: 'export'`. Runs
// before dev and build (see package.json `predev` / `build`). Reads frontmatter
// directly with gray-matter so it does not depend on contentlayer's generated
// output (which is produced later, during next build/dev).
//
// Caching: each card is keyed by a hash of (variant + title + engine source).
// A post is only re-rendered when its key changes (title/variant edit) or the
// engine (og-lib.mjs) changes. Keys are tracked in public/og/og-manifest.json.
// The generated PNGs + manifest are committed, so CI reuses them and builds do
// not re-render everything. Pass `--force` to regenerate all.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { PATTERN_NAMES, ogTemplate, renderPng } from "./og-lib.mjs";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "src", "blogs");
const OUT_DIR = path.join(ROOT, "public", "og");
const MANIFEST = path.join(OUT_DIR, "og-manifest.json");
const FORCE = process.argv.includes("--force");

const sha1 = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 16);

// Hash of the rendering engine: when the card/motif code changes, every card
// is invalidated so the new look propagates.
const ENGINE_HASH = sha1(fs.readFileSync(path.join(ROOT, "scripts", "og-lib.mjs"), "utf8"));

// Stable per-slug pattern so each post gets a distinct background without any
// frontmatter. An explicit `ogVariant` always wins over this default.
function pickVariant(slug) {
  // FNV-1a — spreads the slugs across patterns more evenly than a plain hash.
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return PATTERN_NAMES[(h >>> 0) % PATTERN_NAMES.length];
}

function loadManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch {
    return {};
  }
}

async function main() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.log("og: no src/blogs directory, nothing to do");
    return;
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const prev = FORCE ? {} : loadManifest();
  const next = {};
  let made = 0;
  let cached = 0;

  const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f));
  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, "");
    const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));

    if (data.cover) {
      console.log(`og: skip ${slug} (custom cover)`);
      continue;
    }

    const text = String(data.ogTitle ?? data.title ?? slug);
    const pattern = PATTERN_NAMES.includes(data.ogVariant) ? String(data.ogVariant) : pickVariant(slug);
    const key = sha1(`${pattern}|${text}|${ENGINE_HASH}`);
    next[slug] = key;

    const outPath = path.join(OUT_DIR, `${slug}.png`);
    if (!FORCE && prev[slug] === key && fs.existsSync(outPath)) {
      cached++;
      continue;
    }

    fs.writeFileSync(outPath, await renderPng(ogTemplate({ text, pattern })));
    made++;
    console.log(`og: ${slug}.png (${pattern})`);
  }

  fs.writeFileSync(MANIFEST, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`og: ${made} generated, ${cached} cached${FORCE ? " (forced)" : ""}`);
}

await main();
