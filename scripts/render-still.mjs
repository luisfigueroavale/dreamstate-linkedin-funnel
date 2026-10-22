import { mkdirSync } from "node:fs";
// local
import path from "node:path";
import { spawnSync } from "node:child_process";
import { openFrame, resolveHtml, seek } from "./frame-page.mjs";

const htmlPath = resolveHtml(process.argv[2]);
const outDir = path.join(path.dirname(htmlPath), "export");
mkdirSync(outDir, { recursive: true });

const opened = await openFrame(htmlPath, 1);
const { duration, manifest } = opened;
await seek(opened.page, duration);

const hidden = await opened.page.evaluate(() =>
  [...document.querySelectorAll("[data-part]")].filter((el) => Number(getComputedStyle(el).opacity) < 0.99).length,
);
if (hidden > 0) {
  console.error(`Last frame still hides ${hidden} part(s).`);
  await opened.browser.close();
  process.exit(1);
}

const still = path.join(outDir, "still.png");
await opened.page.screenshot({ path: still });
await opened.browser.close();

const retina = await openFrame(htmlPath, 2);
await seek(retina.page, retina.duration);
await retina.page.screenshot({ path: path.join(outDir, "still@2x.png") });
await retina.browser.close();

const phone = path.join(outDir, "phone.png");
const scaled = spawnSync(
  "ffmpeg",
  ["-y", "-i", still, "-vf", `scale=${manifest.phoneWidth}:-1`, phone],
  { encoding: "utf8" },
);
if (scaled.status !== 0) {
  console.error(scaled.stderr || "ffmpeg failed while writing the phone still.");
  console.error(`Wrote ${still}. The phone file was not written.`);
  process.exit(1);
}

console.log(`still ${still}`);
console.log(`duration ${duration}`);
console.log(`phone ${phone}`);
