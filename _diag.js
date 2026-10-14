window.addEventListener("load", function () {
  setTimeout(function () {
    var vw = document.documentElement.clientWidth;
    var out = [];
    out.push("VIEWPORT=" + vw);
    out.push("SCROLLW=" + document.documentElement.scrollWidth);
    out.push("SCROLLDELTA=" + (document.documentElement.scrollWidth - vw));

    // an element adds to DOCUMENT scroll only if it and all ancestors are
    // overflow:visible and not inside a position:fixed subtree
    function contributes(el) {
      var p = el;
      while (p && p.nodeType === 1) {
        var cs = getComputedStyle(p);
        if (cs.position === "fixed") return false;
        var ox = cs.overflowX;
        if (ox === "hidden" || ox === "clip" || ox === "auto" || ox === "scroll") return false;
        p = p.parentElement;
      }
      return true;
    }

    var all = document.querySelectorAll("*");
    var real = [];
    for (var i = 0; i < all.length; i++) {
      var e = all[i];
      var r = e.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.right > vw + 1 && contributes(e)) {
        var cls = (e.className && e.className.toString) ? e.className.toString() : "";
        real.push({
          right: Math.round(r.right),
          w: Math.round(r.width),
          tag: e.tagName.toLowerCase(),
          cls: cls.slice(0, 80),
        });
      }
    }
    real.sort(function (a, b) { return b.right - a.right; });
    out.push("REAL_OVERFLOWERS=" + real.length);
    for (var j = 0; j < Math.min(real.length, 15); j++) {
      out.push("  R=" + real[j].right + " W=" + real[j].w + " <" + real[j].tag + '> class="' + real[j].cls + '"');
    }
    var d = document.createElement("pre");
    d.id = "__diag";
    d.textContent = out.join("\n");
    document.body.appendChild(d);
  }, 1200);
});
