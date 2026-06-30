// Shared OG-card rendering for the glennprays.com blog (used by generate-og.mjs
// and og-preview.mjs). No side effects on import — just exports.
//
// A card = pure black with a soft holographic pastel aurora (the palette varies
// per post via `ogVariant`), an amber category eyebrow, a big bold Poppins
// title, and the mono `glennprays;` wordmark + glennprays.com footer. This is
// Glenn's own identity: the bold accent-colored hero type + the mono semicolon
// logo over the black/holographic look of his original blog cover. No motifs.

import fs from "node:fs";
import path from "node:path";

import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const ROOT = process.cwd();
const POPPINS_DIR = path.join(ROOT, "node_modules", "@fontsource", "poppins", "files");
const MONO_DIR = path.join(ROOT, "node_modules", "@fontsource", "jetbrains-mono", "files");

// Palette
const BG = "#000000";
const AMBER = "#f59e0b"; // accent (eyebrow, wordmark semicolon) — the dark-mode brand accent

// Soft cool tint for the faint depth glow behind every pattern (kept constant;
// the per-post variety now comes from the pattern shape, not color).
const GLOW_TINT = "#aab6d6";

const fontPoppins = fs.readFileSync(path.join(POPPINS_DIR, "poppins-latin-400-normal.woff"));
const fontPoppinsBold = fs.readFileSync(path.join(POPPINS_DIR, "poppins-latin-700-normal.woff"));
const fontPoppinsBlack = fs.readFileSync(path.join(POPPINS_DIR, "poppins-latin-800-normal.woff"));
const fontMono = fs.readFileSync(path.join(MONO_DIR, "jetbrains-mono-latin-700-normal.woff"));
const fontMonoRegular = fs.readFileSync(path.join(MONO_DIR, "jetbrains-mono-latin-400-normal.woff"));

function el(type, style, children) {
  return { type, props: { style, children } };
}

function titleSize(text) {
  // Poppins 800 is heavier/narrower than the old mono, so the steps run larger.
  const n = text.length;
  if (n > 76) return 50;
  if (n > 54) return 58;
  if (n > 36) return 68;
  if (n > 18) return 80;
  return 90;
}

function svg(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">${inner}</svg>`;
}

// --- Background patterns --------------------------------------------------
// `ogVariant` selects one. Each returns white SVG geometry that textureSvg()
// fades from a focal point on the right (the empty half, away from the
// left-aligned title) via a radial mask, over a faint depth glow. All minimal,
// monochrome, deterministic.

function patternDots() {
  let s = "";
  for (let y = 15; y <= 630; y += 30) for (let x = 15; x <= 1200; x += 30) s += `<circle cx="${x}" cy="${y}" r="4.5" fill="#ffffff"/>`;
  return s;
}
function patternGrid() {
  let s = "";
  for (let x = 24; x <= 1200; x += 36) s += `<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="#ffffff" stroke-width="1"/>`;
  for (let y = 18; y <= 630; y += 36) s += `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="#ffffff" stroke-width="1"/>`;
  return s;
}
function patternRings() {
  let s = "";
  for (let r = 38; r <= 980; r += 46) s += `<circle cx="1080" cy="300" r="${r}" fill="none" stroke="#ffffff" stroke-width="1.4"/>`;
  return s;
}
function patternPlus() {
  let s = "";
  for (let y = 26; y <= 630; y += 40) for (let x = 26; x <= 1200; x += 40) s += `<path d="M ${x - 6} ${y} H ${x + 6} M ${x} ${y - 6} V ${y + 6}" stroke="#ffffff" stroke-width="1.3"/>`;
  return s;
}
function patternDiagonals() {
  let s = "";
  for (let i = -640; i <= 1200; i += 26) s += `<line x1="${i}" y1="0" x2="${i + 630}" y2="630" stroke="#ffffff" stroke-width="1"/>`;
  return s;
}
function patternWaves() {
  let s = "";
  for (let y = 44; y <= 645; y += 40) {
    let d = `M 0 ${y}`;
    for (let x = 0; x <= 1200; x += 44) d += ` Q ${x + 22} ${y - 15}, ${x + 44} ${y}`;
    s += `<path d="${d}" fill="none" stroke="#ffffff" stroke-width="1.3"/>`;
  }
  return s;
}

const PATTERNS = {
  dots: patternDots,
  grid: patternGrid,
  rings: patternRings,
  plus: patternPlus,
  diagonals: patternDiagonals,
  waves: patternWaves,
};

// Per-pattern base opacity (denser patterns get lower opacity to stay quiet).
const PATTERN_OPACITY = {
  dots: 0.5, grid: 0.16, rings: 0.2, plus: 0.3, diagonals: 0.14, waves: 0.2,
};

export const PATTERN_NAMES = Object.keys(PATTERNS);

// Composite the chosen pattern over a faint right-side depth glow, fading the
// pattern from a right-side focal via a radial mask so it clears the title.
export function textureSvg(patternName = "dots") {
  const name = PATTERNS[patternName] ? patternName : "dots";
  const defs = `<defs>
    <radialGradient id="fadeGrad" cx="0.82" cy="0.5" r="0.62"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset="0.55" stop-color="#ffffff" stop-opacity="0.55"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
    <mask id="fade"><rect width="1200" height="630" fill="url(#fadeGrad)"/></mask>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${GLOW_TINT}" stop-opacity="0.16"/><stop offset="1" stop-color="${GLOW_TINT}" stop-opacity="0"/></radialGradient>
    <filter id="gblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter>
  </defs>`;
  const glow = `<g filter="url(#gblur)"><ellipse cx="1020" cy="300" rx="340" ry="320" fill="url(#glow)"/></g>`;
  const pattern = `<g mask="url(#fade)" opacity="${PATTERN_OPACITY[name]}">${PATTERNS[name]()}</g>`;
  return svg(`${defs}${glow}${pattern}`);
}

// --- Card + render --------------------------------------------------------

function pngDataUri(svgStr) {
  const png = new Resvg(svgStr, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  return `data:image/png;base64,${Buffer.from(png).toString("base64")}`;
}

function layerImg(src) {
  return { type: "img", props: { src, width: 1200, height: 630, style: { position: "absolute", top: 0, left: 0 } } };
}

function wordmarkEl() {
  return el(
    "div",
    { display: "flex", fontFamily: "JetBrains Mono", fontSize: "28px", fontWeight: 700, color: "#ffffff" },
    [el("span", {}, "glennprays"), el("span", { color: AMBER }, ";")],
  );
}

// Title: heavy Poppins, white, big. display:block + lineClamp is the
// Satori-supported overflow guard; titleSize() is the primary fit.
function titleEl(text, centered) {
  return el(
    "div",
    {
      display: "block", maxWidth: centered ? "980px" : "880px",
      fontSize: `${titleSize(text)}px`, fontWeight: 800,
      lineHeight: 1.05, letterSpacing: "-0.025em", color: "#ffffff", lineClamp: 3,
      ...(centered ? { textAlign: "center" } : {}),
    },
    text,
  );
}

function subtitleEl(text, centered) {
  return el(
    "div",
    {
      display: "block", maxWidth: centered ? "820px" : "720px", fontFamily: "JetBrains Mono",
      fontSize: "24px", lineHeight: 1.4, color: "rgba(255,255,255,0.7)", lineClamp: 2,
      ...(centered ? { textAlign: "center" } : {}),
    },
    text,
  );
}

export function ogTemplate({ text, pattern = "dots", subtitle, centered = false } = {}) {
  const content = [];
  content.push(titleEl(String(text ?? ""), centered));
  if (subtitle) content.push(subtitleEl(subtitle, centered));

  return el(
    "div",
    {
      position: "relative", display: "flex", flexDirection: "column",
      width: "1200px", height: "630px", padding: "76px",
      backgroundColor: BG, color: "#ffffff", fontFamily: "Poppins",
    },
    [
      layerImg(pngDataUri(textureSvg(pattern))),
      wordmarkEl(),
      el(
        "div",
        {
          display: "flex", flexDirection: "column", flexGrow: 1,
          justifyContent: "center", gap: "24px",
          ...(centered ? { alignItems: "center" } : {}),
        },
        content,
      ),
    ],
  );
}

export async function renderPng(node) {
  const out = await satori(node, {
    width: 1200, height: 630,
    fonts: [
      { name: "Poppins", data: fontPoppins, weight: 400, style: "normal" },
      { name: "Poppins", data: fontPoppinsBold, weight: 700, style: "normal" },
      { name: "Poppins", data: fontPoppinsBlack, weight: 800, style: "normal" },
      { name: "JetBrains Mono", data: fontMonoRegular, weight: 400, style: "normal" },
      { name: "JetBrains Mono", data: fontMono, weight: 700, style: "normal" },
    ],
  });
  return new Resvg(out, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}
