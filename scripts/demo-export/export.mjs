// Export the hero demo animation (demo.html) as GIF + WebM + MP4 + poster.
//
// Usage:
//   cd scripts/demo-export
//   npm install
//   node export.mjs
//
// Outputs to ./out/: demo.gif (800px, README/socials), demo.webm + demo.mp4
// (1600px 2x, for <video> embeds), poster.png.
//
// demo.html must stay in sync with src/components/sections/hero-demo.tsx.

import puppeteer from "puppeteer-core";
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import ffmpeg from "ffmpeg-static";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "out");
const framesDir = join(outDir, "frames");
const FPS = Number(process.env.FPS || 15);
const SCALE = Number(process.env.SCALE || 2);
const CHROME =
  process.env.CHROME_BIN ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DEMO_HTML = process.env.DEMO_HTML || "demo.html";
const OUT_NAME = process.env.OUT_NAME || "demo";

rmSync(framesDir, { recursive: true, force: true });
mkdirSync(framesDir, { recursive: true });

// ---- 1. capture frames ----------------------------------------------------
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--force-color-profile=srgb", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 800, height: 500, deviceScaleFactor: SCALE });
await page.goto("file://" + join(here, DEMO_HTML), { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => window.stopLoop());

const duration = await page.evaluate(() => window.DEMO_DURATION);
const step = 1000 / FPS;
const total = Math.round(duration / step);
console.log(`capturing ${total} frames @ ${FPS}fps (${duration}ms), scale ${SCALE}x`);

await page.evaluate(() => window.seek(0));
for (let i = 0; i < total; i++) {
  await page.evaluate((ms) => window.seek(ms), i * step);
  await page.screenshot({
    path: join(framesDir, `f${String(i).padStart(4, "0")}.png`),
    clip: { x: 0, y: 0, width: 800, height: 500 },
  });
  if (i % 60 === 0) console.log(`  frame ${i}/${total}`);
}
await browser.close();

// ---- 2. assemble ----------------------------------------------------------
const frames = join(framesDir, "f%04d.png");
const run = (args) => execFileSync(ffmpeg, ["-y", ...args], { stdio: "ignore" });

console.log(`encoding ${OUT_NAME}.gif (800px, 12fps, 128 colors)…`);
run([
  "-framerate", String(FPS), "-i", frames,
  "-vf",
  "fps=12,scale=800:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle",
  "-loop", "0", join(outDir, `${OUT_NAME}.gif`),
]);

console.log(`encoding ${OUT_NAME}.webm (VP9, 2x)…`);
run([
  "-framerate", String(FPS), "-i", frames,
  "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "34", "-pix_fmt", "yuv420p",
  join(outDir, `${OUT_NAME}.webm`),
]);

console.log(`encoding ${OUT_NAME}.mp4 (H.264, 2x)…`);
run([
  "-framerate", String(FPS), "-i", frames,
  "-c:v", "libx264", "-crf", "20", "-preset", "slow", "-pix_fmt", "yuv420p",
  "-movflags", "+faststart", join(outDir, `${OUT_NAME}.mp4`),
]);

// poster: a frame roughly 2/3 into the session (before the end card)
const posterIndex = Math.min(total - 1, Math.round(total * 0.68));
copyFileSync(join(framesDir, `f${String(posterIndex).padStart(4, "0")}.png`), join(outDir, `${OUT_NAME}-poster.png`));

rmSync(framesDir, { recursive: true, force: true });
console.log("done → scripts/demo-export/out/");
