import { chromium } from "playwright";
import { existsSync, readFileSync } from "node:fs";
// local
import path from "node:path";
// local
import { pathToFileURL } from "node:url";

export const root = path.resolve(import.meta.dirname, "..");

export function resolveHtml(arg) {
  return path.resolve(root, arg || "pictures/examples/gate/index.html");
}

export function readManifest(htmlPath) {
  const base = {
    width: 1080,
    height: 1350,
    fps: 25,
    gifFps: 15,
    gifWidth: 720,
    gifHeight: 900,
    phoneWidth: 390,
  };
  const manifestPath = path.join(path.dirname(htmlPath), "manifest.json");
  if (!existsSync(manifestPath)) return base;
  return { ...base, ...JSON.parse(readFileSync(manifestPath, "utf8")) };
}

export function tokensFilled(css) {
  const decls = [...css.matchAll(/--[\w-]+:\s*([^;]+);/g)];
  return decls.some((match) => {
    const value = match[1].trim().toLowerCase();
    return value && value !== "unset" && value !== "initial" && value !== "inherit";
  });
}

export async function openFrame(htmlPath, scale = 1) {
  const manifest = readManifest(htmlPath);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: manifest.width, height: manifest.height },
    deviceScaleFactor: scale,
  });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);

  const local = path.join(root, "brand.local", "tokens.css");
  if (existsSync(local) && tokensFilled(readFileSync(local, "utf8"))) {
    await page.addStyleTag({ path: local });
    await page.evaluate(() => {
      document.querySelectorAll("[data-preview-stand-in]").forEach((node) => node.remove());
      document.documentElement.removeAttribute("data-preview-stand-in");
    });
  }

  await page.waitForFunction(
    () =>
      typeof window.__seek === "function" &&
      window.__timeline &&
      typeof window.__timeline.duration === "number",
  );
  const duration = await page.evaluate(() => window.__timeline.duration);
  return { browser, page, manifest, duration };
}

export async function seek(page, t) {
  await page.evaluate((time) => window.__seek(time), t);
}
