/*
  Example scene. JavaScript drives HTML, the SVG rail, and the canvas meter.
  Plates at 0, 0.4, 0.8, 1.2. The ask starts at 1.6 and is done at 2.0.
  The rail and the meter finish at 2.3. The hold is 2.4 to 8.4.
  The pulse is 0 at both ends of the hold, so those frames match.
  Duration is 8.4. The still is seek(8.4).
*/
(function () {
  DeskTimeline.previewStandIn();

  var DURATION = 8.4;
  var tl = new DeskTimeline(DURATION);

  function fade(el, start) {
    tl.track(start, start + 0.4, function (eased) {
      el.style.opacity = String(eased);
      el.style.transform = "translateY(" + (1 - eased) * 12 + "px)";
    });
  }

  fade(document.querySelector('[data-part="kicker"]'), 0);
  Array.prototype.forEach.call(document.querySelectorAll('[data-part="plate"]'), function (el, i) {
    fade(el, i * 0.4);
  });
  fade(document.querySelector('[data-part="cta"]'), 1.6);
  fade(document.querySelector('[data-part="mark"]'), 1.6);

  var line = document.querySelector(".rail-line");
  var length = 640;
  tl.track(0, 2.3, function (eased) {
    var offset = String(length * (1 - eased));
    line.setAttribute("stroke-dashoffset", offset);
    line.style.strokeDashoffset = offset;
  });

  var dot = document.querySelector('[data-part="dot"]');
  tl.track(0, DURATION, function (_eased, t) {
    var appear = 0;
    if (t >= 2) appear = 1;
    else if (t > 1.6) {
      var raw = (t - 1.6) / 0.4;
      appear = 1 - Math.pow(1 - raw, 3);
    }
    var pulse = 0;
    if (t > 2.4 && t < DURATION) {
      pulse = Math.sin(Math.PI * (t - 2.4) / (DURATION - 2.4));
    }
    dot.style.opacity = String(appear);
    dot.style.transform = "scale(" + (1 + pulse * 0.08) + ")";
  });

  var canvas = document.querySelector("[data-meter]");
  var ctx = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  tl.track(0, DURATION, function (_eased, t) {
    var p = t <= 0 ? 0 : t >= 2.3 ? 1 : t / 2.3;
    var eased = 1 - Math.pow(1 - p, 3);
    var pulse = 0;
    if (t > 2.4 && t < DURATION) {
      pulse = Math.sin(Math.PI * (t - 2.4) / (DURATION - 2.4));
    }
    var styles = getComputedStyle(document.documentElement);
    var ink = styles.getPropertyValue("--color-fg").trim() || "#1c1917";
    ctx.clearRect(0, 0, width, height);
    var span = Math.round(width * eased);
    if (span <= 0) return;
    ctx.fillStyle = ink;
    ctx.fillRect(0, 0, span, height);
    if (pulse > 0) {
      ctx.save();
      ctx.globalAlpha = pulse * 0.35;
      ctx.fillStyle = ink;
      ctx.fillRect(0, 0, Math.round(width * eased), height);
      ctx.restore();
    }
  });

  DeskTimeline.install(tl);
})();
