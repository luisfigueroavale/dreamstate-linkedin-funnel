import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import test from "node:test";
import os from "node:os";
import path from "node:path";
import { openFrame } from "./frame-page.mjs";

const html = path.resolve(import.meta.dirname, "../pictures/examples/gate/index.html");

function headline(page) {
  return page.evaluate(() => {
    const node = document.querySelector(".plate h2");
    const style = getComputedStyle(node);
    return {
      text: node.textContent,
      root: document.documentElement.tagName,
      markedRoot: document.documentElement.hasAttribute("data-preview-stand-in"),
      standIns: document.querySelectorAll("[data-preview-stand-in]").length,
      bg: getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim(),
      fill: style.getPropertyValue("-webkit-text-fill-color").trim(),
      image: style.backgroundImage,
    };
  });
}

test("filled tokens render without removing the page", async () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "frame-tokens-"));
  const tokens = path.join(dir, "tokens.css");
  writeFileSync(
    tokens,
    `:root {
  --color-bg: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-accent: #12B2F8;
}
`,
  );
  let opened;
  try {
    opened = await openFrame(html, 1, tokens);
    const plain = await headline(opened.page);
    assert.equal(plain.root, "HTML");
    assert.equal(plain.text, "Read the page");
    assert.equal(plain.markedRoot, false);
    assert.equal(plain.standIns, 0);
    assert.equal(plain.bg.toLowerCase(), "#ffffff");
    assert.equal(plain.fill, "rgb(18, 178, 248)");
    assert.equal(plain.image, "none");

    await opened.page.addStyleTag({
      content: `:root { --headline-gradient: linear-gradient(#12B2F8, #12B2F8); }`,
    });
    const graded = await headline(opened.page);
    assert.match(graded.image, /gradient/i);
    assert.equal(graded.fill, "rgba(0, 0, 0, 0)");
  } finally {
    if (opened) await opened.browser.close();
    rmSync(dir, { recursive: true, force: true });
  }
});
