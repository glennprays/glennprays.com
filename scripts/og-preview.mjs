// Dev tool: render OG title-length and aurora-palette variants for browsing.
//   npm run og:preview  ->  public/og-preview/*.png  (gitignored)

import fs from "node:fs";
import path from "node:path";

import { PATTERN_NAMES, ogTemplate, renderPng } from "./og-lib.mjs";

const OUT = path.join(process.cwd(), "public", "og-preview");
fs.mkdirSync(OUT, { recursive: true });

// --- Title-length cases (palette held at lavender) ------------------------
const TITLES = [
  { name: "title-short", opts: { text: "Git Flow" } },
  { name: "title-medium", opts: { text: "Know more about Git Flow" } },
  { name: "title-ml", opts: { text: "Underfitting, overfitting, and generalization" } },
  { name: "title-long", opts: { text: "How a missing API authorizer turned an SSO login into an open door" } },
];
for (const { name, opts } of TITLES) {
  fs.writeFileSync(path.join(OUT, `${name}.png`), await renderPng(ogTemplate(opts)));
  console.log(`preview: og-preview/${name}.png`);
}

// --- Pattern sweep (title held) -------------------------------------------
for (const pattern of PATTERN_NAMES) {
  fs.writeFileSync(
    path.join(OUT, `pattern-${pattern}.png`),
    await renderPng(ogTemplate({ text: "Know more about Git Flow", pattern })),
  );
  console.log(`preview: og-preview/pattern-${pattern}.png`);
}
