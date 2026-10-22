/*
  Default scene for a template shell.
  Each [data-part] fades in across 0.4s from its data-start.
  Duration stays long enough for the quiet hold. The still is the last seek.
*/
(function () {
  DeskTimeline.previewStandIn();

  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-part]"));
  var duration = 8.4;
  var tl = new DeskTimeline(duration);

  nodes.forEach(function (el) {
    var start = Number(el.getAttribute("data-start") || 0);
    tl.track(start, start + 0.4, function (eased) {
      el.style.opacity = String(eased);
      el.style.transform = "translateY(" + (1 - eased) * 12 + "px)";
    });
  });

  DeskTimeline.install(tl);
})();
