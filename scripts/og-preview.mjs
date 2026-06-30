// Dev tool: render OG layout + motif variants for browsing.
//   npm run og:preview  ->  public/og-preview/*.png  (gitignored)

import fs from "node:fs";
import path from "node:path";

import { MOTIFS, ogTemplate, renderPng } from "./og-lib.mjs";

const OUT = path.join(process.cwd(), "public", "og-preview");
fs.mkdirSync(OUT, { recursive: true });

// --- Title LAYOUT variants (motif held at network) ------------------------
const LAYOUTS = [
  { name: "layout-editorial", opts: { text: "Know more about Git Flow", layout: "editorial" } },
  { name: "layout-eyebrow", opts: { text: "Evaluate Machine Learning Performance", layout: "editorial", eyebrow: "DATA SCIENCE" } },
  { name: "layout-three-tier", opts: { text: "Building scalable web systems", layout: "three-tier", eyebrow: "SOFTWARE ENGINEERING", subtitle: "Designing applications that stay fast and maintainable as usage grows." } },
  { name: "layout-centered", opts: { text: "glennprays;", layout: "centered", eyebrow: "BLOG" } },
  { name: "layout-long-title", opts: { text: "How a missing API authorizer turned an SSO login into an open door", layout: "editorial" } },
];
for (const { name, opts } of LAYOUTS) {
  fs.writeFileSync(path.join(OUT, `${name}.png`), await renderPng(ogTemplate(opts)));
  console.log(`preview: og-preview/${name}.png`);
}

// --- Motif variants (layout held at editorial) ----------------------------
for (const name of Object.keys(MOTIFS)) {
  fs.writeFileSync(
    path.join(OUT, `motif-${name}.png`),
    await renderPng(ogTemplate({ text: "Know more about Git Flow", variant: name })),
  );
  console.log(`preview: og-preview/motif-${name}.png`);
}
