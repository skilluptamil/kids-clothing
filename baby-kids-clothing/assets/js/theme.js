/* ==========================================================================
   LITTLE BLOOM — Theme (Light / Dark) Toggle
   --------------------------------------------------------------------------
   File   : assets/js/theme.js
   Notes  : Adds click handlers for every .theme-toggle button. The initial
            <html data-bs-theme="..."> is set by an inline script in each
            page head to prevent flash-of-wrong-theme.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "lb-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* ignore */ }
  }

  function current() {
    return document.documentElement.getAttribute("data-bs-theme") === "dark" ? "dark" : "light";
  }

  function bindToggles() {
    var toggles = document.querySelectorAll(".theme-toggle");
    toggles.forEach(function (btn) {
      if (btn.dataset.lbBound) return;
      btn.dataset.lbBound = "1";
      btn.addEventListener("click", function () {
        applyTheme(current() === "dark" ? "light" : "dark");
      });
    });
  }

  /* Navbar & footer are injected via JS, so re-bind after they appear. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindToggles);
  } else {
    bindToggles();
  }
  window.addEventListener("load", bindToggles);
})();
