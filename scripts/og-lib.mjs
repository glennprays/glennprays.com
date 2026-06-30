// Shared OG-card rendering for the glennprays.com blog (used by generate-og.mjs
// and og-preview.mjs). No side effects on import — just exports.
//
// A card = anchored layout (glennprays; mono wordmark top-left, optional
// eyebrow, big left-aligned title, footer rule + glennprays.com) on a dark
// gradient, with a decorative MOTIF (selectable via `ogVariant`) drawn as a
// transparent SVG, pre-rasterized to PNG by resvg, then composited by Satori.
//
// Brand: dark card, cyan structure + amber focal accent (mirrors the site's
// cyan-light / amber-dark signature; OG cards are theme-independent so the
// dark/amber treatment is used).
//
// Adapted from /Users/glennpray/projects/lunadra/scripts/og-lib.mjs.

import fs from "node:fs";
import path from "node:path";

import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const ROOT = process.cwd();
const POPPINS_DIR = path.join(ROOT, "node_modules", "@fontsource", "poppins", "files");
const MONO_DIR = path.join(ROOT, "node_modules", "@fontsource", "jetbrains-mono", "files");

// Palette — pure black with a soft holographic pastel aurora and near-white
// monospace type (recovers the character of the original blog OG cover).
const BG = "#000000";
// Aurora signature: heavily blurred pastel blobs in the corners.
const AUR_LAVENDER = "#b8a9e0";
const AUR_ROSE = "#e0a9c4";
const AUR_MINT = "#a9e0cf";
const AUR_PEACH = "#e0cba9";
// Motif palette: faint structure + a single muted pastel focal. Variable names
// are kept (STRUCT/CYAN/AMBER) so the motif functions are unchanged — only the
// values are re-skinned from the old cyan/amber to soft white/lavender/rose.
const STRUCT = "#cdbcf0"; // soft lavender, low-opacity structural lines
const CYAN = "#ece6f5"; // near-white accent lines
const AMBER = "#e0a9c4"; // muted rose focal point

const fontRegular = fs.readFileSync(path.join(POPPINS_DIR, "poppins-latin-400-normal.woff"));
const fontBold = fs.readFileSync(path.join(POPPINS_DIR, "poppins-latin-700-normal.woff"));
const fontMono = fs.readFileSync(path.join(MONO_DIR, "jetbrains-mono-latin-700-normal.woff"));
const fontMonoRegular = fs.readFileSync(path.join(MONO_DIR, "jetbrains-mono-latin-400-normal.woff"));

function el(type, style, children) {
  return { type, props: { style, children } };
}

function titleSize(text) {
  // Monospace is wider than the old proportional face, so the steps run smaller.
  const n = text.length;
  if (n > 72) return 38;
  if (n > 52) return 44;
  if (n > 34) return 52;
  if (n > 18) return 60;
  return 68;
}

function svg(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">${inner}</svg>`;
}

// --- Motifs ---------------------------------------------------------------

// Node graph: white nodes + faint edges, an amber core with cyan halo rings.
function networkSvg() {
  const nodes = {
    core: [980, 315, 9], api: [852, 155, 5], auth: [1114, 188, 5],
    svc: [1140, 349, 5], db: [1077, 477, 5], web: [917, 487, 4.5],
    edge: [823, 416, 4.5], gw: [815, 269, 4.5], n1: [1028, 238, 3.5], n2: [910, 240, 3.5],
  };
  const edges = [
    ["core", "n1"], ["core", "n2"], ["core", "svc"], ["core", "web"], ["core", "gw"],
    ["core", "db"], ["n2", "api"], ["n1", "auth"], ["api", "gw"], ["auth", "svc"],
    ["svc", "db"], ["db", "web"], ["web", "edge"], ["edge", "gw"], ["n1", "n2"],
  ];
  const lines = edges.map(([a, b]) => {
    const p = nodes[a]; const q = nodes[b];
    return `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1" stroke-linecap="round"/>`;
  }).join("");
  const halo = `<circle cx="980" cy="315" r="20" fill="none" stroke="${CYAN}" stroke-opacity="0.55" stroke-width="1.5"/><circle cx="980" cy="315" r="34" fill="none" stroke="${CYAN}" stroke-opacity="0.2" stroke-width="1"/>`;
  const dots = Object.entries(nodes).map(([k, n]) => {
    const core = k === "core";
    return `<circle cx="${n[0]}" cy="${n[1]}" r="${n[2]}" fill="${core ? AMBER : "#ffffff"}" fill-opacity="${core ? 1 : 0.85}"/>`;
  }).join("");
  const labels = [["api", 852, 155], ["auth", 1114, 188], ["db", 1077, 477]]
    .map(([t, x, y]) => `<text x="${x + 10}" y="${y + 4}" fill="#ffffff" fill-opacity="0.3" font-family="monospace" font-size="14">${t}</text>`).join("");
  return svg(`${lines}${halo}${dots}${labels}`);
}

// Concentric sonar rings from the bottom-right.
function rippleSvg() {
  const ox = 1060, oy = 540;
  const rings = [70, 145, 225, 310, 400, 495]
    .map((r, i) => `<circle cx="${ox}" cy="${oy}" r="${r}" fill="none" stroke="${STRUCT}" stroke-opacity="${Math.max(0.05, 0.34 - i * 0.05).toFixed(3)}" stroke-width="1.4"/>`).join("");
  return svg(`${rings}<circle cx="${ox}" cy="${oy}" r="5" fill="${AMBER}" fill-opacity="0.85"/>`);
}

// "High signal, low noise" waveform.
function signalSvg() {
  const wave = `<path d="M 0 440 L 84 440 L 132 394 L 180 440 L 235 418 L 283 440 L 360 400 L 413 440 L 516 440 L 1200 440" fill="none" stroke="${CYAN}" stroke-opacity="0.5" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
  const peaks = [[132, 394], [360, 400]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${AMBER}" fill-opacity="0.9"/>`).join("");
  return svg(`${wave}${peaks}`);
}

// Faint dot grid in the top-right corner.
function dotGridSvg() {
  let dots = "";
  for (let x = 820; x <= 1150; x += 38) for (let y = 70; y <= 360; y += 38) dots += `<circle cx="${x}" cy="${y}" r="2" fill="#ffffff" fill-opacity="0.16"/>`;
  return svg(dots);
}

// Engineering ruled grid + crosshairs.
function blueprintSvg() {
  const grid = [];
  for (let x = 624; x <= 1200; x += 48) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>`);
  for (let y = 24; y <= 606; y += 48) grid.push(`<line x1="600" y1="${y}" x2="1200" y2="${y}" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>`);
  const plus = (x, y, color, op, r) =>
    `<line x1="${x - 8}" y1="${y}" x2="${x + 8}" y2="${y}" stroke="${color}" stroke-opacity="${op}" stroke-width="1.2"/><line x1="${x}" y1="${y - 8}" x2="${x}" y2="${y + 8}" stroke="${color}" stroke-opacity="${op}" stroke-width="1.2"/>` +
    (r ? `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" fill-opacity="0.9"/>` : "");
  const marks = [
    plus(720, 120, STRUCT, 0.4), plus(912, 216, STRUCT, 0.4),
    plus(1104, 408, STRUCT, 0.4), plus(1056, 168, STRUCT, 0.4),
    plus(816, 456, CYAN, 0.85, 2.5), plus(1008, 312, AMBER, 0.9, 2.5),
  ].join("");
  const ticks = `<polyline points="1170,36 1188,36 1188,54" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.2"/><polyline points="1188,570 1188,588 1170,588" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.2"/>`;
  return svg(`${grid.join("")}${marks}${ticks}`);
}

// Soft blurred mesh-glow anchored low-right.
function auroraSvg() {
  const defs = `<defs>
    <radialGradient id="ag1" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${CYAN}" stop-opacity="0.42"/><stop offset="1" stop-color="${CYAN}" stop-opacity="0"/></radialGradient>
    <radialGradient id="ag2" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#3b82f6" stop-opacity="0.34"/><stop offset="1" stop-color="#3b82f6" stop-opacity="0"/></radialGradient>
    <radialGradient id="ag3" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${AMBER}" stop-opacity="0.3"/><stop offset="1" stop-color="${AMBER}" stop-opacity="0"/></radialGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="38"/></filter>
  </defs>`;
  const blobs = `<g filter="url(#soft)"><ellipse cx="880" cy="610" rx="300" ry="280" fill="url(#ag1)"/><ellipse cx="1070" cy="560" rx="240" ry="230" fill="url(#ag2)"/><ellipse cx="1170" cy="500" rx="150" ry="150" fill="url(#ag3)"/></g>`;
  const arc = `<path d="M 600 470 Q 920 360 1200 432" fill="none" stroke="${CYAN}" stroke-opacity="0.5" stroke-width="1.3"/>`;
  return svg(`${defs}${blobs}${arc}`);
}

// Converging streamlines funneling to one inspected core.
function flowfieldSvg() {
  const paths = []; let i = 0;
  for (let y = 96; y <= 558; y += 22) {
    const k = (((i * 37) % 5) - 2) * 7;
    const y2 = 330 + (y - 330) * 0.42;
    const cyan = i === 5 || i === 11 || i === 16;
    paths.push(`<path d="M 600 ${y} C 820 ${y + k}, 1010 ${(y2 - k).toFixed(0)}, 1180 ${y2.toFixed(0)}" fill="none" stroke="${cyan ? CYAN : "#ffffff"}" stroke-opacity="${cyan ? 0.6 : 0.12}" stroke-width="1" stroke-linecap="round"/>`);
    i++;
  }
  const core = `<circle cx="1086" cy="330" r="14" fill="none" stroke="${CYAN}" stroke-opacity="0.5" stroke-width="1.5"/><circle cx="1086" cy="330" r="4" fill="${AMBER}"/>`;
  return svg(`${paths.join("")}${core}`);
}

// One-point perspective grid converging to an off-edge vanishing point.
function perspectiveSvg() {
  const vpx = 1190, vpy = 300;
  const targets = [];
  for (let y = 20; y <= 610; y += 52) targets.push([576, y]);
  for (let x = 600; x <= 1120; x += 80) targets.push([x, 624]);
  const orths = targets.map(([tx, ty]) => `<line x1="${vpx}" y1="${vpy}" x2="${tx}" y2="${ty}" stroke="${STRUCT}" stroke-opacity="0.11" stroke-width="1"/>`).join("");
  const depth = [560, 500, 452, 416, 390, 372, 360].map((y, i) => `<line x1="600" y1="${y}" x2="1190" y2="${(vpy + (y - vpy) * 0.12).toFixed(0)}" stroke="${STRUCT}" stroke-opacity="${(0.06 + i * 0.018).toFixed(3)}" stroke-width="1"/>`).join("");
  const defs = `<defs><radialGradient id="pgmask" cx="${(vpx / 1200).toFixed(3)}" cy="${(vpy / 630).toFixed(3)}" r="0.62"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><mask id="pgm"><rect width="1200" height="630" fill="url(#pgmask)"/></mask></defs>`;
  const dot = `<circle cx="${vpx}" cy="${vpy}" r="3" fill="${AMBER}" fill-opacity="0.9"/>`;
  return svg(`${defs}<g mask="url(#pgm)">${orths}${depth}</g>${dot}`);
}

// Nested topographic contour lines with one cyan summit.
function contourSvg() {
  const lines = [];
  for (let i = 0; i < 8; i++) {
    const dy = -i * 28;
    const op = (0.26 - i * 0.027).toFixed(3);
    lines.push(`<path d="M 600 ${320 + dy} C 768 ${278 + dy}, 948 ${366 + Math.round(dy * 0.6)}, 1200 ${300 + dy}" fill="none" stroke="${STRUCT}" stroke-opacity="${op}" stroke-width="1.3" stroke-linecap="round"/>`);
  }
  const loop = `<path d="M 980 250 C 1040 230, 1112 250, 1120 290 C 1126 322, 1068 336, 1018 320 C 982 308, 958 278, 980 250 Z" fill="none" stroke="${CYAN}" stroke-opacity="0.5" stroke-width="1.3"/><circle cx="1050" cy="286" r="3.5" fill="${AMBER}"/>`;
  return svg(`${lines.join("")}${loop}`);
}

// Honeycomb hex mesh, a few cells accented.
function hexgridSvg() {
  const r = 34, dx = Math.sqrt(3) * r, dy = 1.5 * r;
  const hex = (cx, cy, stroke, op, fill = "none", fillOp = 0) =>
    `<polygon points="${Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 180) * (60 * i - 30);
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ")}" fill="${fill}" fill-opacity="${fillOp}" stroke="${stroke}" stroke-opacity="${op}" stroke-width="1"/>`;
  const cells = [];
  let row = 0;
  for (let cy = 60; cy <= 600; cy += dy) {
    const offset = (row % 2) * (dx / 2);
    for (let cx = 664 + offset; cx <= 1190; cx += dx) cells.push([cx, cy]);
    row++;
  }
  const base = cells.map(([x, y]) => hex(x, y, "#ffffff", 0.07)).join("");
  const at = (i) => cells[Math.min(cells.length - 1, i)];
  const [ax, ay] = at(15); const [bx, by] = at(29); const [dx2, dy2] = at(36);
  const accents = hex(ax, ay, CYAN, 0.6, CYAN, 0.12) + hex(bx, by, CYAN, 0.4) + hex(dx2, dy2, AMBER, 0.55);
  return svg(`${base}${accents}`);
}

// PCB / circuit traces with pads and vias; one cyan route to an amber pad.
function circuitSvg() {
  const traces = [
    ["660,140 780,140 780,260 900,260", "#ffffff", 0.14],
    ["720,360 720,200 880,200 880,120 1040,120", "#ffffff", 0.12],
    ["820,490 980,490 980,360 1120,360", "#ffffff", 0.12],
    ["900,300 1060,300 1060,460", CYAN, 0.55],
    ["1000,180 1160,180 1160,300", "#ffffff", 0.12],
  ];
  const lines = traces.map(([d, c, o]) => `<polyline points="${d}" fill="none" stroke="${c}" stroke-opacity="${o}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>`).join("");
  const pad = (x, y, c, o) => `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" fill="${c}" fill-opacity="${o}"/>`;
  const via = (x, y, o) => `<circle cx="${x}" cy="${y}" r="4" fill="none" stroke="#ffffff" stroke-opacity="${o}" stroke-width="1.5"/>`;
  const marks = [
    pad(660, 140, "#ffffff", 0.4), via(900, 260, 0.35), via(1040, 120, 0.35),
    pad(1120, 360, "#ffffff", 0.4), via(1160, 300, 0.35), pad(900, 300, CYAN, 0.85),
    pad(1060, 460, AMBER, 0.95),
  ].join("");
  return svg(`${lines}${marks}`);
}

// Tilted concentric orbits with traveling nodes around an amber core.
function orbitSvg() {
  const cx = 1000, cy = 315;
  const orbits = [[150, 60], [230, 95], [300, 125]];
  const ell = orbits.map(([rx, ry], i) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${STRUCT}" stroke-opacity="${(0.22 - i * 0.05).toFixed(2)}" stroke-width="1.2"/>`).join("");
  const node = (rx, ry, deg, c, r, o) => {
    const a = (deg * Math.PI) / 180;
    return `<circle cx="${(cx + rx * Math.cos(a)).toFixed(1)}" cy="${(cy + ry * Math.sin(a)).toFixed(1)}" r="${r}" fill="${c}" fill-opacity="${o}"/>`;
  };
  const nodes = [
    node(150, 60, -40, "#ffffff", 4, 0.85), node(230, 95, 150, CYAN, 4.5, 0.9),
    node(230, 95, 20, "#ffffff", 3.5, 0.8), node(300, 125, -110, "#ffffff", 4, 0.8),
  ].join("");
  const core = `<circle cx="${cx}" cy="${cy}" r="6" fill="${AMBER}"/><circle cx="${cx}" cy="${cy}" r="13" fill="none" stroke="${CYAN}" stroke-opacity="0.4" stroke-width="1"/>`;
  return svg(`<g transform="rotate(-16 ${cx} ${cy})">${ell}${nodes}</g>${core}`);
}

// Isometric stacked layers, top plate accented.
function isostackSvg() {
  const cx = 1000, w = 150, h = 75, sep = 46, base = 472, layers = 4;
  const diamond = (cy, stroke, op) => `<polygon points="${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}" fill="none" stroke="${stroke}" stroke-opacity="${op}" stroke-width="1.3"/>`;
  const plates = Array.from({ length: layers }, (_, i) => {
    const top = i === layers - 1;
    return diamond(base - i * sep, top ? CYAN : STRUCT, top ? 0.6 : (0.1 + i * 0.03));
  }).join("");
  const top = base - (layers - 1) * sep;
  const edges = `<line x1="${cx - w}" y1="${base}" x2="${cx - w}" y2="${top}" stroke="${STRUCT}" stroke-opacity="0.12" stroke-width="1.3"/><line x1="${cx + w}" y1="${base}" x2="${cx + w}" y2="${top}" stroke="${STRUCT}" stroke-opacity="0.12" stroke-width="1.3"/><line x1="${cx}" y1="${base + h}" x2="${cx}" y2="${top + h}" stroke="${STRUCT}" stroke-opacity="0.12" stroke-width="1.3"/>`;
  return svg(`${edges}${plates}<circle cx="${cx}" cy="${top}" r="3.5" fill="${AMBER}"/>`);
}

export const MOTIFS = {
  network: networkSvg,
  ripple: rippleSvg,
  signal: signalSvg,
  minimal: dotGridSvg,
  blueprint: blueprintSvg,
  aurora: auroraSvg,
  flowfield: flowfieldSvg,
  perspective: perspectiveSvg,
  contour: contourSvg,
  hexgrid: hexgridSvg,
  circuit: circuitSvg,
  orbit: orbitSvg,
  isostack: isostackSvg,
};

// Always-present signature: soft, heavily-blurred holographic pastel blobs in
// the top-right and bottom-left corners over black (mirrors the original cover).
function auroraBaseSvg() {
  const defs = `<defs>
    <radialGradient id="abL" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${AUR_LAVENDER}" stop-opacity="0.5"/><stop offset="1" stop-color="${AUR_LAVENDER}" stop-opacity="0"/></radialGradient>
    <radialGradient id="abR" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${AUR_ROSE}" stop-opacity="0.42"/><stop offset="1" stop-color="${AUR_ROSE}" stop-opacity="0"/></radialGradient>
    <radialGradient id="abM" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${AUR_MINT}" stop-opacity="0.42"/><stop offset="1" stop-color="${AUR_MINT}" stop-opacity="0"/></radialGradient>
    <radialGradient id="abP" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${AUR_PEACH}" stop-opacity="0.42"/><stop offset="1" stop-color="${AUR_PEACH}" stop-opacity="0"/></radialGradient>
    <filter id="abblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="64"/></filter>
  </defs>`;
  const blobs = `<g filter="url(#abblur)">
    <ellipse cx="1090" cy="60" rx="230" ry="210" fill="url(#abL)"/>
    <ellipse cx="1210" cy="170" rx="170" ry="160" fill="url(#abR)"/>
    <ellipse cx="40" cy="600" rx="250" ry="210" fill="url(#abM)"/>
    <ellipse cx="170" cy="650" rx="180" ry="170" fill="url(#abP)"/>
  </g>`;
  return svg(`${defs}${blobs}`);
}

// --- Card + render --------------------------------------------------------

function pngDataUri(svgStr) {
  const png = new Resvg(svgStr, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  return `data:image/png;base64,${Buffer.from(png).toString("base64")}`;
}

function motifImg(src) {
  return { type: "img", props: { src, width: 1200, height: 630, style: { position: "absolute", top: 0, left: 0 } } };
}

function wordmarkEl() {
  return el(
    "div",
    { display: "flex", fontFamily: "JetBrains Mono", fontSize: "28px", fontWeight: 700, color: "#ffffff" },
    "glennprays;",
  );
}

function eyebrowEl(text, centered) {
  return el(
    "div",
    {
      display: "flex", fontSize: "18px", fontWeight: 600,
      letterSpacing: "0.18em", color: AUR_LAVENDER,
      ...(centered ? { textAlign: "center" } : {}),
    },
    text,
  );
}

// Title: display:block + lineClamp is the Satori-supported overflow guard.
function titleEl(text, centered) {
  return el(
    "div",
    {
      display: "block", maxWidth: centered ? "980px" : "880px",
      fontSize: `${titleSize(text)}px`, fontWeight: 700,
      lineHeight: 1.2, letterSpacing: "-0.01em", color: "#ffffff", lineClamp: 3,
      ...(centered ? { textAlign: "center" } : {}),
    },
    text,
  );
}

function subtitleEl(text, centered) {
  return el(
    "div",
    {
      display: "block", maxWidth: centered ? "820px" : "720px", fontSize: "26px",
      lineHeight: 1.35, color: "rgba(255,255,255,0.72)", lineClamp: 2,
      ...(centered ? { textAlign: "center" } : {}),
    },
    text,
  );
}

function footerEl() {
  return el("div", { display: "flex", flexDirection: "column", gap: "14px" }, [
    el("div", { display: "flex", width: "100%", height: "1px", backgroundColor: "rgba(255,255,255,0.16)" }, []),
    el("div", { display: "flex", fontFamily: "JetBrains Mono", fontSize: "20px", color: "rgba(255,255,255,0.6)" }, "glennprays.com"),
  ]);
}

// Layouts share the frozen shell (gradient, wordmark, footer) and vary only the
// centered content block. layout: editorial (default) | three-tier | centered.
// subtitle only shows in three-tier.
export function ogTemplate({ text, variant = "network", layout = "editorial", eyebrow, subtitle } = {}) {
  const centered = layout === "centered";
  const motif = (MOTIFS[variant] ?? networkSvg)();
  const content = [];
  if (eyebrow) content.push(eyebrowEl(eyebrow, centered));
  content.push(titleEl(String(text ?? ""), centered));
  if (layout === "three-tier" && subtitle) content.push(subtitleEl(subtitle, centered));

  return el(
    "div",
    {
      position: "relative", display: "flex", flexDirection: "column",
      width: "1200px", height: "630px", padding: "76px",
      backgroundColor: BG,
      color: "#ffffff", fontFamily: "JetBrains Mono",
    },
    [
      motifImg(pngDataUri(auroraBaseSvg())),
      motifImg(pngDataUri(motif)),
      wordmarkEl(),
      el(
        "div",
        {
          display: "flex", flexDirection: "column", flexGrow: 1,
          justifyContent: "center", gap: layout === "three-tier" ? "18px" : "22px",
          ...(centered ? { alignItems: "center" } : {}),
        },
        content,
      ),
      footerEl(),
    ],
  );
}

export async function renderPng(node) {
  const out = await satori(node, {
    width: 1200, height: 630,
    fonts: [
      { name: "Poppins", data: fontRegular, weight: 400, style: "normal" },
      { name: "Poppins", data: fontBold, weight: 700, style: "normal" },
      { name: "JetBrains Mono", data: fontMonoRegular, weight: 400, style: "normal" },
      { name: "JetBrains Mono", data: fontMono, weight: 700, style: "normal" },
    ],
  });
  return new Resvg(out, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}
