// Build an X tap-to-post link. The owner taps it and posts. Nothing here calls X.
import { pathToFileURL } from "node:url";

const BASE = "https://x.com/intent/post";

export function postIdFrom(link) {
  const match = String(link || "").match(/\/status(?:es)?\/(\d+)/);
  return match ? match[1] : null;
}

export function intentLink({ text, quote, replyTo } = {}) {
  if (!text || !String(text).trim()) throw new Error("text is required");
  if (quote && replyTo) throw new Error("pass quote or replyTo, not both");
  const params = new URLSearchParams();
  if (replyTo) {
    const id = /^\d+$/.test(String(replyTo)) ? String(replyTo) : postIdFrom(replyTo);
    if (!id) throw new Error("replyTo needs a post id or a post link");
    params.set("in_reply_to", id);
  }
  params.set("text", String(text));
  if (quote) {
    if (!postIdFrom(quote)) throw new Error("quote needs a post link");
    params.set("url", String(quote));
  }
  return `${BASE}?${params.toString().replace(/\+/g, "%20")}`;
}

function cli(argv) {
  const args = { text: null, quote: null, replyTo: null };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    const value = argv[i + 1];
    if (flag === "--text") args.text = value;
    else if (flag === "--quote") args.quote = value;
    else if (flag === "--reply-to") args.replyTo = value;
    else throw new Error(`unknown flag ${flag}`);
    i += 1;
  }
  return intentLink(args);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    console.log(cli(process.argv.slice(2)));
  } catch (error) {
    console.error(`${error.message}\nUsage: node scripts/intent-link.mjs --text "..." [--quote <post link> | --reply-to <post link or id>]`);
    process.exit(1);
  }
}
