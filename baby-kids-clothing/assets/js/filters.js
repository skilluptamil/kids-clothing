/* ==========================================================================
   LITTLE BLOOM — Shop / Sale / Search Filters Engine
   --------------------------------------------------------------------------
   File   : assets/js/filters.js
   Notes  : Powers shop.html (sidebar filters + sort + pagination),
            sale.html (sale-only mode) and search.html (?q= query).
   ========================================================================== */
(function () {
  "use strict";

  var PAGE_SIZE = 9;

  /* ------------------------------------------------------------
     State
     ------------------------------------------------------------ */
  var state = {
    text: "",
    category: [], age: [], gender: [], size: [], color: [],
    collection: [], availability: [], rating: 0,
    priceMin: 0, priceMax: 200,
    onSaleOnly: false,
    sort: "featured",
    page: 1,
    source: "all"   // "all" | "sale" | "search"
  };

  /* ------------------------------------------------------------
     Helpers
     ------------------------------------------------------------ */
  function salePrice(p) { return Kids.salePrice(p); }

  function filterList() {
    var list = Kids.PRODUCTS.slice();

    list = list.filter(function (p) {
      if (state.text) {
        var hay = (p.name + " " + p.catLabel + " " + p.ageLabel + " " + p.gender + " " +
          p.collection + " " + p.category + " " + p.desc + " " +
          p.colors.map(function (c) { return c.n; }).join(" ")).toLowerCase().replace(/\s+/g, " ");
        if (hay.indexOf(state.text) === -1) return false;
      }
      if (state.onSaleOnly && !p.discount) return false;
      if (state.category.length && state.category.indexOf(p.category) === -1) return false;
      if (state.age.length && state.age.indexOf(p.age) === -1) return false;
      if (state.gender.length && state.gender.indexOf(p.gender) === -1) return false;
      if (state.size.length && !p.sizes.some(function (s) { return state.size.indexOf(s) > -1; })) return false;
      if (state.color.length && !p.colors.some(function (c) { return state.color.indexOf(c.n.toLowerCase()) > -1; })) return false;
      if (state.collection.length && state.collection.indexOf(p.collection) === -1) return false;
      if (state.availability.indexOf("onsale") > -1 && !p.discount) return false;
      if (state.rating && p.rating < state.rating) return false;
      var sp = salePrice(p);
      if (sp < state.priceMin || sp > state.priceMax) return false;
      return true;
    });

    return list;
  }

  function sortList(list) {
    var copy = list.slice();
    switch (state.sort) {
      case "newest":
        copy.sort(function (a, b) { return b.id - a.id; });
        break;
      case "price-asc":
        copy.sort(function (a, b) { return salePrice(a) - salePrice(b); });
        break;
      case "price-desc":
        copy.sort(function (a, b) { return salePrice(b) - salePrice(a); });
        break;
      case "rating":
        copy.sort(function (a, b) { return b.rating - a.rating; });
        break;
      case "popular":
        copy.sort(function (a, b) { return b.reviews - a.reviews; });
        break;
      default: /* featured */
        break;
    }
    return copy;
  }

  function renderPagination(total) {
    var wrap = document.getElementById("paginationWrap");
    if (!wrap) return;
    var pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (pages <= 1) { wrap.innerHTML = ""; return; }
    var html = '<nav aria-label="Products pagination"><ul class="pagination justify-content-center mb-0">';
    html += '<li class="page-item' + (state.page === 1 ? " disabled" : "") + '"><button type="button" class="page-link" data-page="' + (state.page - 1) + '" aria-label="Previous"><i class="bi bi-chevron-left"></i></button></li>';
    for (var i = 1; i <= pages; i++) {
      html += '<li class="page-item' + (i === state.page ? " active" : "") + '"><button type="button" class="page-link" data-page="' + i + '">' + i + "</button></li>";
    }
    html += '<li class="page-item' + (state.page === pages ? " disabled" : "") + '"><button type="button" class="page-link" data-page="' + (state.page + 1) + '" aria-label="Next"><i class="bi bi-chevron-right"></i></button></li>';
    html += "</ul></nav>";
    wrap.innerHTML = html;
  }

  function apply() {
    var filtered = sortList(filterList());
    var total = filtered.length;
    var pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    var start = (state.page - 1) * PAGE_SIZE;
    var slice = filtered.slice(start, start + PAGE_SIZE);

    var grid = document.getElementById("shopGrid");
    if (grid) {
      if (!slice.length) {
        grid.innerHTML = '<div class="empty-state col-12"><div class="empty-emoji">🧸</div><h3>No products found</h3><p>We couldn\'t find anything matching your filters. Try adjusting them.</p><button type="button" class="btn btn-brand js-reset-filters"><i class="bi bi-arrow-counterclockwise me-1"></i>Reset Filters</button></div>';
      } else {
        grid.innerHTML = slice.map(function (p) { return Kids.renderCard(p); }).join("");
      }
    }

    var count = document.getElementById("resultCount");
    if (count) count.textContent = total;

    var countNote = document.getElementById("resultNote");
    if (countNote) countNote.textContent = "Showing " + (total ? start + 1 : 0) + "–" + Math.min(start + PAGE_SIZE, total) + " of " + total + " products";

    renderPagination(total);
  }

  /* ------------------------------------------------------------
     Bind sidebar inputs
     ------------------------------------------------------------ */
  function bindPanel() {
    var panel = document.getElementById("filterPanel");
    if (!panel) return;

    panel.querySelectorAll(".f-check").forEach(function (chk) {
      chk.addEventListener("change", function () {
        var group = chk.getAttribute("data-filter");
        var val = chk.value;
        if (chk.checked) {
          if (state[group].indexOf(val) === -1) state[group].push(val);
        } else {
          state[group] = state[group].filter(function (x) { return x !== val; });
        }
        state.page = 1;
        apply();
      });
    });

    /* rating radios */
    panel.querySelectorAll("input[name='ratingFilter']").forEach(function (r) {
      r.addEventListener("change", function () {
        state.rating = parseFloat(this.value) || 0;
        state.page = 1;
        apply();
      });
    });

    /* price range sliders */
    var pmin = document.getElementById("priceMin");
    var pmax = document.getElementById("priceMax");
    if (pmin && pmax) {
      function syncSliders() {
        var min = parseInt(pmin.value, 10);
        var max = parseInt(pmax.value, 10);
        if (min > max) { var t = min; pmin.value = max; pmax.value = min; }
        state.priceMin = parseInt(pmin.value, 10);
        state.priceMax = parseInt(pmax.value, 10);
        var fill = document.getElementById("rangeFill");
        if (fill) {
          var left = (state.priceMin / 200) * 100;
          var width = ((state.priceMax - state.priceMin) / 200) * 100;
          fill.style.left = left + "%";
          fill.style.width = width + "%";
        }
        var out = document.getElementById("rangeOutput");
        if (out) out.textContent = "$" + state.priceMin + " – $" + state.priceMax;
        apply();
      }
      pmin.addEventListener("input", syncSliders);
      pmax.addEventListener("input", syncSliders);
      syncSliders();
    }

    /* sort */
    var sortChips = document.querySelectorAll(".sort-chip");
    if (sortChips.length) {
      sortChips.forEach(function (chip) {
        chip.addEventListener("click", function () {
          state.sort = chip.getAttribute("data-sort");
          state.page = 1;
          sortChips.forEach(function (c) { c.classList.remove("active"); });
          chip.classList.add("active");
          apply();
        });
      });
    }
    /* fallback sort select (if present) */
    var sortSel = document.getElementById("sortSelect");
    if (sortSel) {
      sortSel.addEventListener("change", function () {
        state.sort = this.value;
        state.page = 1;
        apply();
      });
    }

    /* text search (shop page toolbar) */
    var searchBox = document.getElementById("shopSearch");
    if (searchBox) {
      searchBox.addEventListener("input", function () {
        state.text = this.value.trim().toLowerCase().replace(/\s+/g, " ");
        state.page = 1;
        apply();
      });
      searchBox.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          state.text = this.value.trim().toLowerCase().replace(/\s+/g, " ");
          state.page = 1;
          apply();
        }
      });
    }
    var searchBtn = document.getElementById("shopSearchBtn");
    if (searchBtn && searchBox) {
      searchBtn.addEventListener("click", function () {
        state.text = searchBox.value.trim().toLowerCase().replace(/\s+/g, " ");
        state.page = 1;
        apply();
      });
    }

    /* reset */
    panel.querySelectorAll(".js-reset-filters").forEach(function (btn) {
      btn.addEventListener("click", resetFilters);
    });
    var resetBtn = document.getElementById("resetFiltersBtn");
    if (resetBtn) resetBtn.addEventListener("click", resetFilters);
  }

  function resetFilters() {
    var panel = document.getElementById("filterPanel");
    if (panel) {
      panel.querySelectorAll(".f-check").forEach(function (c) { c.checked = false; });
      panel.querySelectorAll("input[name='ratingFilter']").forEach(function (r) { r.checked = false; });
    }
    state.text = ""; state.category = []; state.age = []; state.gender = [];
    state.size = []; state.color = []; state.collection = []; state.availability = []; state.rating = 0;
    state.priceMin = 0; state.priceMax = 200;
    var searchBox = document.getElementById("shopSearch");
    if (searchBox) searchBox.value = "";
    var sortSel = document.getElementById("sortSelect");
    if (sortSel) { sortSel.value = "featured"; state.sort = "featured"; }
    var pmin = document.getElementById("priceMin");
    var pmax = document.getElementById("priceMax");
    if (pmin) pmin.value = 0;
    if (pmax) pmax.value = 200;
    state.page = 1;
    apply();
  }

  /* ------------------------------------------------------------
     URL params → pre-checked filters
     ------------------------------------------------------------ */
  function applyUrlParams() {
    var params = new URLSearchParams(window.location.search);
    var panel = document.getElementById("filterPanel");

    function checkParam(name, filterKey, values) {
      var val = params.get(name);
      if (!val) return;
      var list = val.split(",");
      list.forEach(function (v) {
        if (filterKey === "category" || filterKey === "age" || filterKey === "gender" ||
            filterKey === "size" || filterKey === "color" || filterKey === "collection") {
          state[filterKey].push(v);
        }
        if (panel) {
          panel.querySelectorAll('.f-check[data-filter="' + filterKey + '"][value="' + v + '"]').forEach(function (c) {
            c.checked = true;
          });
        }
      });
    }

    checkParam("category", "category", null);
    checkParam("age", "age", null);
    checkParam("gender", "gender", null);
    checkParam("collection", "collection", null);
    checkParam("size", "size", null);
    checkParam("color", "color", null);

    var q = params.get("q");
    if (q) {
      state.text = q.toLowerCase().trim().replace(/\s+/g, " ");
      var searchBox = document.getElementById("shopSearch");
      if (searchBox) searchBox.value = q;
      var headerBox = document.getElementById("searchQueryInput");
      if (headerBox) headerBox.value = q;
    }
  }

  /* ------------------------------------------------------------
     Pagination click delegation
     ------------------------------------------------------------ */
  function bindPagination() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("#paginationWrap [data-page]");
      if (!btn) return;
      var page = parseInt(btn.getAttribute("data-page"), 10);
      if (!page || isNaN(page)) return;
      state.page = page < 1 ? 1 : page;
      apply();
      var grid = document.getElementById("shopGrid");
      if (grid && grid.scrollIntoView) grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ------------------------------------------------------------
     Mobile filter sidebar
     ------------------------------------------------------------ */
  function bindMobileSidebar() {
    var toggle = document.getElementById("filterToggle");
    var sidebar = document.querySelector(".shop-sidebar");
    if (!toggle || !sidebar) return;
    toggle.addEventListener("click", function () { sidebar.classList.add("open"); });
    var close = sidebar.querySelector("[data-filter-close]");
    if (close) close.addEventListener("click", function () { sidebar.classList.remove("open"); });
    sidebar.addEventListener("click", function (e) {
      if (e.target === sidebar) sidebar.classList.remove("open");
    });
  }

  /* ------------------------------------------------------------
     Init
     ------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    var pageType = document.body.getAttribute("data-page");

    if (pageType === "sale") {
      state.onSaleOnly = true;
    }

    applyUrlParams();

    var activeChip = document.querySelector(".sort-chip.active");
    if (activeChip) state.sort = activeChip.getAttribute("data-sort") || "featured";
    var sortSel = document.getElementById("sortSelect");
    if (sortSel && !activeChip) state.sort = sortSel.value;

    bindPanel();
    bindPagination();
    bindMobileSidebar();

    if (window.Kids) apply();
  });
})();
