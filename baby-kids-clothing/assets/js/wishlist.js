/* ==========================================================================
   LITTLE BLOOM — Wishlist Module (LocalStorage)
   --------------------------------------------------------------------------
   File   : assets/js/wishlist.js
   Notes  : Handles toggle, navbar badge, wishlist page and heart buttons
            across product cards. Data persists in "lb-wishlist".
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "lb-wishlist";

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
  }
  function write(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
  }

  var Wishlist = {
    items: function () { return read(); },

    has: function (id) {
      return read().indexOf(String(id)) > -1;
    },

    add: function (id) {
      var list = read();
      if (list.indexOf(String(id)) === -1) list.push(String(id));
      write(list);
      Wishlist.badge();
      return list.length;
    },

    remove: function (id) {
      write(read().filter(function (x) { return x !== String(id); }));
      Wishlist.badge();
      return read().length;
    },

    toggle: function (id) {
      return Wishlist.has(id) ? Wishlist.remove(id) : Wishlist.add(id);
    },

    badge: function () {
      var el = document.getElementById("wishCount");
      if (!el) return;
      var n = read().length;
      el.textContent = n;
      el.classList.toggle("show", n > 0);
    },

    /* keep every heart button on the page in sync */
    refreshHearts: function () {
      document.querySelectorAll(".js-wish").forEach(function (btn) {
        var id = btn.getAttribute("data-id");
        var active = Wishlist.has(id);
        btn.classList.toggle("active", active);
        btn.classList.toggle("is-wish", active);
        var i = btn.querySelector("i");
        if (i) i.className = "bi " + (active ? "bi-heart-fill" : "bi-heart");
      });
    },

    /* -------- wishlist page -------- */
    renderWishlist: function () {
      var grid = document.getElementById("wishlistGrid");
      if (!grid) return;
      var empty = document.getElementById("wishlistEmpty");
      var ids = read();
      var products = ids.map(function (id) { return window.Kids ? Kids.byId(id) : null; })
        .filter(function (p) { return p; });

      if (!products.length) {
        grid.innerHTML = "";
        if (empty) empty.classList.remove("d-none");
        return;
      }
      if (empty) empty.classList.add("d-none");
      grid.classList.add("product-grid");
      grid.innerHTML = products.map(function (p) { return Kids.renderCard(p); }).join("");
      Wishlist.refreshHearts();
    }
  };

  window.Wishlist = Wishlist;

  document.addEventListener("DOMContentLoaded", function () {
    Wishlist.badge();
    Wishlist.renderWishlist();

    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".js-wish");
      if (!btn) return;
      e.preventDefault();
      var id = btn.getAttribute("data-id");
      var nowIn = Wishlist.toggle(id);
      Wishlist.refreshHearts();
      showToast(nowIn ? "Saved to Wishlist" : "Removed from Wishlist",
        nowIn ? "Added to your wishlist." : "Removed from your wishlist.",
        nowIn ? "ok" : "");
      Wishlist.renderWishlist();
    });

    window.addEventListener("storage", function (e) {
      if (e.key === KEY) { Wishlist.badge(); Wishlist.refreshHearts(); Wishlist.renderWishlist(); }
    });
  });
})();
