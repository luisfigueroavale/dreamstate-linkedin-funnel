import assert from "node:assert/strict";
import test from "node:test";
import { intentLink, postIdFrom } from "./intent-link.mjs";

test("a post link encodes the text", () => {
  assert.equal(intentLink({ text: "One line & more" }), "https://x.com/intent/post?text=One%20line%20%26%20more");
});

test("a quote carries the source link as url", () => {
  const link = intentLink({ text: "Yes", quote: "https://x.com/someone/status/123" });
  assert.equal(link, "https://x.com/intent/post?text=Yes&url=https%3A%2F%2Fx.com%2Fsomeone%2Fstatus%2F123");
});

test("a reply carries in_reply_to from a link or an id", () => {
  assert.equal(intentLink({ text: "Hi", replyTo: "https://x.com/a/status/42" }), "https://x.com/intent/post?in_reply_to=42&text=Hi");
  assert.equal(intentLink({ text: "Hi", replyTo: "42" }), "https://x.com/intent/post?in_reply_to=42&text=Hi");
});

test("bad input fails loudly", () => {
  assert.throws(() => intentLink({ text: "" }));
  assert.throws(() => intentLink({ text: "x", quote: "https://x.com/a", replyTo: "1" }));
  assert.throws(() => intentLink({ text: "x", replyTo: "not a post" }));
  assert.equal(postIdFrom("https://x.com/a/status/9?s=20"), "9");
});
