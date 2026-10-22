import { mkdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { openFrame, resolveHtml, seek } from "./frame-page.mjs";

function run(cmd, args) {
  const result = spawnSync(cmd, args, { encoding: "utf8" });
  return result;
}

const htmlPath = resolveHtml(process.argv[2]);
const outDir = path.join(path.dirname(htmlPath), "export");
const frameDir = path.join(outDir, "frames");
mkdirSync(frameDir, { recursive: true });

const { browser, page, manifest, duration } = await openFrame(htmlPath, 1);

const motionCss = await page.evaluate(() =>
  [...document.querySelectorAll("*")].some((el) => {
    const style = getComputedStyle(el);
    const animated = style.animationName && style.animationName !== "none";
    const transitioning = parseFloat(style.transitionDuration) > 0;
    return animated || transitioning;
  }),
);
if (motionCss) {
  console.error("CSS animation or transition is active. Motion has to be the JavaScript timeline.");
  await browser.close();
  process.exit(1);
}

await seek(page, 0);
const empty = await page.evaluate(() =>
  [...document.querySelectorAll("[data-part]")].every((el) => Number(getComputedStyle(el).opacity) < 0.02),
);
if (!empty) {
  console.error("t=0 still shows a part. The GIF has to restart on an empty stage.");
  await browser.close();
  process.exit(1);
}

if (duration >= 2.4) {
  await seek(page, 2.4);
  const holdStart = await page.screenshot();
  await seek(page, duration);
  const holdEnd = await page.screenshot();
  if (!holdStart.equals(holdEnd)) {
    console.error("The hold at 2.4s and the last frame are not the same pixels.");
    await browser.close();
    process.exit(1);
  }
}

const steps = Math.round(duration * manifest.fps);
for (let i = 0; i <= steps; i++) {
  const t = Math.min(duration, i / manifest.fps);
  await seek(page, t);
  const name = `frame-${String(i).padStart(4, "0")}.png`;
  await page.screenshot({ path: path.join(frameDir, name) });
}

await seek(page, duration);
const still = path.join(outDir, "still.png");
await page.screenshot({ path: still });
await browser.close();

const ffmpeg = run("ffmpeg", ["-version"]);
if (ffmpeg.status !== 0) {
  console.error("ffmpeg is not on PATH. The still is the last frame. MP4 and GIF were not written.");
  console.error(still);
  process.exit(1);
}

const mp4 = path.join(outDir, "motion.mp4");
const gif = path.join(outDir, "motion.gif");
const mp4Run = run("ffmpeg", [
  "-y",
  "-framerate",
  String(manifest.fps),
  "-i",
  path.join(frameDir, "frame-%04d.png"),
  "-c:v",
  "libx264",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  mp4,
]);
if (mp4Run.status !== 0) {
  console.error(mp4Run.stderr);
  console.error(`MP4 failed. Still: ${still}`);
  process.exit(1);
}

const gifRun = run("ffmpeg", [
  "-y",
  "-framerate",
  String(manifest.fps),
  "-i",
  path.join(frameDir, "frame-%04d.png"),
  "-vf",
  `fps=${manifest.gifFps},scale=${manifest.gifWidth}:${manifest.gifHeight}:flags=lanczos,split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer`,
  "-loop",
  "0",
  gif,
]);
if (gifRun.status !== 0) {
  console.error(gifRun.stderr);
  console.error(`GIF failed. Still: ${still}`);
  process.exit(1);
}

const gifBytes = statSync(gif).size;
rmSync(frameDir, { recursive: true, force: true });
console.log(`still ${still}`);
console.log(`mp4 ${mp4}`);
console.log(`gif ${gif} (${gifBytes} bytes)`);
console.log(`duration ${duration}`);
if (gifBytes > 5 * 1024 * 1024) {
  console.error("GIF is over 5MB.");
  process.exit(1);
}
