/*
  One clock for every picture in this desk.

  Scene code registers tracks. apply(eased, t, raw) writes HTML styles,
  SVG attributes, or canvas pixels. CSS does not run the motion.

  window.__timeline and window.__seek(t) are what the capture script calls.
  The still is __seek(duration), the last frame of this same timeline.

  previewStandIn() fills token names with preview colors when the owner's
  tokens are still unset, so a blank checkout can render. That stand-in
  is not a brand. Do not hand it to the owner.
*/
(function () {
  function easeOutCubic(raw) {
    var x = raw < 0 ? 0 : raw > 1 ? 1 : raw;
    return 1 - Math.pow(1 - x, 3);
  }

  function DeskTimeline(duration) {
    this.duration = duration;
    this.tracks = [];
    this.t = 0;
  }

  DeskTimeline.prototype.track = function (start, end, apply) {
    if (!(end > start)) {
      throw new Error("A track needs a later end than its start");
    }
    this.tracks.push({ start: start, end: end, apply: apply });
    return this;
  };

  DeskTimeline.prototype.seek = function (t) {
    var time = Number(t);
    if (Number.isNaN(time)) time = 0;
    if (time < 0) time = 0;
    if (time > this.duration) time = this.duration;
    this.t = time;
    for (var i = 0; i < this.tracks.length; i++) {
      var tr = this.tracks[i];
      var raw = 0;
      if (time >= tr.end) raw = 1;
      else if (time > tr.start) raw = (time - tr.start) / (tr.end - tr.start);
      tr.apply(easeOutCubic(raw), time, raw);
    }
  };

  function previewStandIn() {
    var root = document.documentElement;
    var bg = getComputedStyle(root).getPropertyValue("--color-bg").trim();
    if (bg && bg !== "unset" && bg !== "initial" && bg !== "inherit") return;
    var tag = document.createElement("style");
    tag.setAttribute("data-preview-stand-in", "true");
    tag.textContent = [
      ":root{",
      "--color-bg:#f3f1ec;",
      "--color-fg:#1c1917;",
      "--color-muted:#5c574e;",
      "--color-accent:#1c1917;",
      "--color-line:#d6d1c7;",
      "--color-surface:#fffdf8;",
      "--font-display:Georgia,serif;",
      "--font-body:Georgia,serif;",
      "--size-kicker:22px;",
      "--size-title:40px;",
      "--size-body:26px;",
      "--size-small:18px;",
      "--space-safe:72px;",
      "--space-block:22px;",
      "--space-tight:14px;",
      "--grid-columns:1;",
      "--grid-gutter:22px;",
      "--size-portrait-w:1080px;",
      "--size-portrait-h:1350px;",
      "--size-thumb-w:1280px;",
      "--size-thumb-h:720px;",
      "--size-phone-w:390px;",
      "--size-gif-w:720px;",
      "--size-gif-h:900px;",
      "--logo-max-height:48px;",
      "}",
    ].join("");
    document.head.appendChild(tag);
    root.setAttribute("data-preview-stand-in", "true");
  }

  function install(tl) {
    window.__timeline = tl;
    window.__seek = function (t) {
      tl.seek(t);
    };
    tl.seek(0);
  }

  DeskTimeline.previewStandIn = previewStandIn;
  DeskTimeline.install = install;
  window.DeskTimeline = DeskTimeline;
})();
