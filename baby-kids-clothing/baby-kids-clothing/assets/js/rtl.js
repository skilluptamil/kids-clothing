/* ==========================================================================
   LITTLE BLOOM — RTL / LTR Toggle
   --------------------------------------------------------------------------
   File   : assets/js/rtl.js
   Notes  : Flips <html dir> and swaps the Bootstrap stylesheet to its RTL
            build. The initial dir is set by an inline script in each page
            head so there is no layout flash.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "lb-rtl";
  var RTL_CSS = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css";
  var LTR_CSS = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";

  function applyRTL(isRtl) {
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    var css = document.querySelector("link[data-bs-css]");
    if (css) css.href = isRtl ? RTL_CSS : LTR_CSS;
    try { localStorage.setItem(STORAGE_KEY, isRtl ? "1" : "0"); } catch (e) { /* ignore */ }
  }

  function bindToggles() {
    var toggles = document.querySelectorAll(".rtl-toggle");
    toggles.forEach(function (btn) {
      if (btn.dataset.lbBound) return;
      btn.dataset.lbBound = "1";
      btn.addEventListener("click", function () {
        applyRTL(document.documentElement.getAttribute("dir") !== "rtl");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindToggles);
  } else {
    bindToggles();
  }
  window.addEventListener("load", bindToggles);
})();
