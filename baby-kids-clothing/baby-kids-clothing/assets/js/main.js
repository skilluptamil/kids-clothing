/* ==========================================================================
   LITTLE BLOOM — Main JavaScript
   --------------------------------------------------------------------------
   File   : assets/js/main.js
   Notes  : Preloader, sticky nav, back-to-top, scroll reveal, counters,
            countdown timers, product grid rendering, product-details,
            checkout flow and order-success page.
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* ------------------------------------------------------------
       1. PRELOADER
       ------------------------------------------------------------ */
    var preloader = document.getElementById("preloader");
    if (preloader) {
      window.addEventListener("load", function () {
        setTimeout(function () { preloader.classList.add("hidden"); }, 350);
      });
      setTimeout(function () { preloader.classList.add("hidden"); }, 3500);
    }

    /* ------------------------------------------------------------
       2. STICKY NAV SHADOW
       ------------------------------------------------------------ */
    var nav = document.getElementById("mainNav");
    function onScroll() {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ------------------------------------------------------------
       3. BACK TO TOP
       ------------------------------------------------------------ */
    var backTop = document.getElementById("backToTop");
    if (backTop) {
      window.addEventListener("scroll", function () {
        backTop.classList.toggle("show", window.scrollY > 500);
      }, { passive: true });
      backTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* ------------------------------------------------------------
       4. SCROLL REVEAL
       ------------------------------------------------------------ */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in-view"); });
    }

    /* ------------------------------------------------------------
       5. ANIMATED COUNTERS
       ------------------------------------------------------------ */
    function animateCounter(el) {
      var target = parseFloat(el.getAttribute("data-target")) || 0;
      var decimals = (el.getAttribute("data-target").split(".")[1] || "").length;
      var duration = 1800;
      var start = null;
      var suffixEl = el.querySelector(".counter-suffix");
      var suffix = suffixEl ? suffixEl.textContent : "";
      if (suffixEl) suffixEl.remove();
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var counters = document.querySelectorAll(".counter");
    if (counters.length) {
      if ("IntersectionObserver" in window) {
        var cio = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              cio.unobserve(entry.target);
            }
          });
        }, { threshold: 0.4 });
        counters.forEach(function (c) { cio.observe(c); });
      } else {
        counters.forEach(animateCounter);
      }
    }

    /* ------------------------------------------------------------
       6. MARQUEE — duplicate track for seamless loop
       ------------------------------------------------------------ */
    var marqueeTrack = document.querySelector(".marquee-track");
    if (marqueeTrack) marqueeTrack.innerHTML += marqueeTrack.innerHTML;

    /* ------------------------------------------------------------
       7. YEAR AUTO UPDATE
       ------------------------------------------------------------ */
    document.querySelectorAll(".year").forEach(function (y) {
      y.textContent = new Date().getFullYear();
    });

    /* ------------------------------------------------------------
       8. PRODUCT GRIDS (data-products="new|bestsellers|sale|all|...")
       ------------------------------------------------------------ */
    if (window.Kids) {
      document.querySelectorAll("[data-products]").forEach(function (grid) {
        var source = grid.getAttribute("data-products");
        var limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
        var list;

        if (source === "all") {
          list = Kids.PRODUCTS.slice();
        } else if (source === "sale") {
          list = Kids.PRODUCTS.filter(function (p) { return p.discount > 0; });
        } else if (source === "new") {
          list = Kids.PRODUCTS.filter(function (p) { return p.badge === "new" || p.collection === "new-arrivals"; });
        } else if (source === "bestsellers") {
          list = Kids.PRODUCTS.slice().sort(function (a, b) { return b.reviews - a.reviews; });
        } else if (source === "gifts") {
          list = Kids.PRODUCTS.filter(function (p) { return p.collection === "gifts" || p.category === "gifts"; });
        } else {
          list = Kids.PRODUCTS.filter(function (p) { return p.collection === source; });
        }

        if (limit > 0) list = list.slice(0, limit);
        Kids.renderGrid(grid, list);
      });

      Kids.initScrollers();
    }

    /* ------------------------------------------------------------
       9. COUNTDOWN TIMERS
       ------------------------------------------------------------ */
    var countdowns = document.querySelectorAll("[data-countdown]");
    countdowns.forEach(function (cd) {
      var target = new Date(cd.getAttribute("data-countdown")).getTime();
      function tick() {
        var diff = Math.max(target - Date.now(), 0);
        var d = Math.floor(diff / 86400000);
        var h = Math.floor(diff / 3600000) % 24;
        var m = Math.floor(diff / 60000) % 60;
        var s = Math.floor(diff / 1000) % 60;
        var pad = function (n) { return n < 10 ? "0" + n : n; };
        var boxes = cd.querySelectorAll(".cd-box");
        if (boxes.length) {
          boxes[0].querySelector(".cd-num").textContent = d;
          boxes[1].querySelector(".cd-num").textContent = pad(h);
          boxes[2].querySelector(".cd-num").textContent = pad(m);
          boxes[3].querySelector(".cd-num").textContent = pad(s);
        }
      }
      tick();
      setInterval(tick, 1000);
    });

    /* ------------------------------------------------------------
       10. PRODUCT DETAILS PAGE (?id=)
       ------------------------------------------------------------ */
    if (window.Kids && document.getElementById("productDetails")) {
      renderProductDetails();
    }

    function renderProductDetails() {
      var params = new URLSearchParams(window.location.search);
      var id = params.get("id") || "1";
      var p = Kids.byId(id);
      var host = document.getElementById("productDetails");
      if (!p) {
        host.innerHTML =
          '<div class="empty-state"><div class="empty-emoji">🧸</div><h3>Product not found</h3>' +
          '<p>The product you are looking for has taken a little nap.</p>' +
          '<a href="shop.html" class="btn btn-brand">Back to Shop</a></div>';
        return;
      }
      var sp = Kids.salePrice(p);

      host.innerHTML =
        '<div class="row g-4 g-lg-5">' +
          /* -------- gallery -------- */
          '<div class="col-lg-6">' +
            '<div class="rounded-2xl overflow-hidden mb-3 shadow-sm">' +
              '<img id="pdMainImage" src="' + p.image + '" alt="' + p.name + '" class="w-100" style="height:480px;object-fit:cover" onerror="this.onerror=null;this.src=\'assets/images/placeholder.svg\'">' +
            "</div>" +
            '<div class="d-flex gap-2" id="pdThumbs">' +
              '<img src="' + p.image + '" alt="' + p.name + ' view 1" class="rounded-3 thumb-active" style="width:88px;height:88px;object-fit:cover;cursor:pointer;border:3px solid var(--brand)" data-pdimg="' + p.image + '" onerror="this.onerror=null;this.src=\'assets/images/placeholder.svg\'">' +
              '<img src="' + p.image2 + '" alt="' + p.name + ' view 2" class="rounded-3" style="width:88px;height:88px;object-fit:cover;cursor:pointer" data-pdimg="' + p.image2 + '" onerror="this.onerror=null;this.src=\'assets/images/placeholder.svg\'">' +
            "</div>" +
          "</div>" +
          /* -------- info -------- */
          '<div class="col-lg-6">' +
            '<span class="pill mb-2"><i class="bi bi-tag"></i>' + p.catLabel + "</span>" +
            '<h1 class="font-heading" style="font-size:clamp(1.6rem,3vw,2.2rem)">' + p.name + "</h1>" +
            '<div class="d-flex align-items-center flex-wrap gap-2 mb-3">' +
              '<span class="stars">' + Kids.starsHTML(p.rating) + "</span>" +
              '<span class="review-count text-muted">' + p.rating + " · " + p.reviews + " reviews</span>" +
              '<a href="#reviewsPane" class="ms-2 text-brand fw-bold" style="font-size:.85rem" data-bs-toggle="tab" data-bs-target="#reviewsPane">Write a review</a>' +
            "</div>" +
            '<div class="d-flex align-items-center gap-3 mb-3">' +
              '<span class="font-heading fw-bold" style="font-size:2rem;color:var(--brand-dark)">' + Kids.money(sp) + "</span>" +
              (p.discount ? '<span class="text-muted" style="text-decoration:line-through;font-size:1.1rem">' + Kids.money(p.price) + '</span><span class="pill pink">-' + p.discount + "%</span>" : "") +
            "</div>" +
            '<p class="text-muted">' + p.desc + "</p>" +
            /* size */
            '<div class="mb-3">' +
              '<label class="form-label d-flex justify-content-between">Size <a href="size-guide.html" class="text-brand" style="font-size:.8rem"><i class="bi bi-rulers me-1"></i>Size Guide</a></label>' +
              '<div class="d-flex flex-wrap gap-2" id="pdSizes">' +
                p.sizes.map(function (s, i) { return '<button type="button" class="size-chip' + (i === 0 ? " active" : "") + '" data-size="' + s + '">' + s + "</button>"; }).join("") +
              "</div>" +
            "</div>" +
            /* color */
            '<div class="mb-4">' +
              '<label class="form-label">Color</label>' +
              '<div class="d-flex gap-2" id="pdColors">' +
                p.colors.map(function (c, i) {
                  return '<button type="button" class="color-chip' + (i === 0 ? " active" : "") + '" style="--cc:' + c.h + '" data-color="' + c.n + '" title="' + c.n + '" aria-label="' + c.n + '"></button>';
                }).join("") +
              "</div>" +
            "</div>" +
            /* qty + actions */
            '<div class="d-flex flex-wrap align-items-center gap-3 mb-4">' +
              '<div class="qty-control"><button type="button" class="js-qty-minus" aria-label="Decrease"><i class="bi bi-dash"></i></button><span class="qty-val">1</span><button type="button" class="js-qty-plus" aria-label="Increase"><i class="bi bi-plus"></i></button></div>' +
              '<button type="button" class="btn btn-brand btn-lg js-pd-addcart" data-id="' + p.id + '"><i class="bi bi-bag-plus me-1"></i>Add to Cart</button>' +
              '<button type="button" class="btn btn-outline-brand btn-lg js-pd-buynow" data-id="' + p.id + '">Buy Now</button>' +
              '<button type="button" class="icon-btn js-wish" data-id="' + p.id + '" aria-label="Toggle wishlist"><i class="bi bi-heart"></i></button>' +
            "</div>" +
            '<ul class="check-list mb-0">' +
              '<li><i class="bi bi-check-circle-fill"></i>Free standard shipping on orders over $50</li>' +
              '<li><i class="bi bi-check-circle-fill"></i>30-day hassle-free returns &amp; exchanges</li>' +
              '<li><i class="bi bi-check-circle-fill"></i>Secure checkout — all major payment methods</li>' +
            "</ul>" +
          "</div>" +
        "</div>";

      /* thumbnails */
      host.querySelectorAll("[data-pdimg]").forEach(function (thumb) {
        thumb.addEventListener("click", function () {
          document.getElementById("pdMainImage").src = thumb.getAttribute("data-pdimg");
          host.querySelectorAll("[data-pdimg]").forEach(function (t) {
            t.classList.remove("thumb-active");
            t.style.border = "3px solid transparent";
          });
          thumb.classList.add("thumb-active");
          thumb.style.border = "3px solid var(--brand)";
        });
      });

      /* size chips */
      host.querySelectorAll("#pdSizes .size-chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          host.querySelectorAll("#pdSizes .size-chip").forEach(function (c) { c.classList.remove("active"); });
          chip.classList.add("active");
        });
      });
      /* color chips */
      host.querySelectorAll("#pdColors .color-chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          host.querySelectorAll("#pdColors .color-chip").forEach(function (c) { c.classList.remove("active"); });
          chip.classList.add("active");
        });
      });

      /* specs tab */
      var specTable = document.getElementById("specTable");
      if (specTable) {
        specTable.innerHTML =
          "<tbody>" +
            "<tr><td>Material</td><td>100% GOTS-certified organic cotton, bamboo blend lining</td></tr>" +
            "<tr><td>Age Group</td><td>" + (p.ageLabel || "Kids") + "</td></tr>" +
            "<tr><td>Care</td><td>Machine wash cold · Tumble dry low · Do not bleach</td></tr>" +
            "<tr><td>Fabric Weight</td><td>Medium weight (180 GSM) for year-round comfort</td></tr>" +
            "<tr><td>Safety</td><td>Nickel-free snaps, flame-retardant free, hypoallergenic</td></tr>" +
            "<tr><td>Available Sizes</td><td>" + p.sizes.join(", ") + "</td></tr>" +
          "</tbody>";
      }

      /* description tab */
      var descTab = document.getElementById("descTab");
      if (descTab) {
        descTab.innerHTML =
          "<p>" + p.desc + "</p>" +
          "<p>Every LittleBloom piece is designed by parents, for parents. We obsess over softness, fit and durability so your little one can play, nap and grow in complete comfort — while you enjoy easy care and long-lasting wear.</p>" +
          '<ul class="check-list">' +
            "<li>Buttery-soft, breathable fabrics tested on sensitive skin</li>" +
            "<li>Flat seams and tag-free labels to prevent irritation</li>" +
            "<li>Reinforced stitching that survives wash after wash</li>" +
            "<li>Ethically made in small, parent-owned workshops</li>" +
          "</ul>";
      }

      /* related products */
      var related = document.getElementById("relatedGrid");
      if (related) {
        var sameCat = Kids.PRODUCTS.filter(function (x) { return x.category === p.category && x.id !== p.id; });
        var others = Kids.PRODUCTS.filter(function (x) { return x.category !== p.category && x.id !== p.id; });
        var rel = sameCat.concat(others).slice(0, 4);
        Kids.renderGrid(related, rel);
      }
    }

    /* ------------------------------------------------------------
       11. CHECKOUT & CART SUMMARY UPDATES
       ------------------------------------------------------------ */
    window.onSummary = function (s) {
      var apply = function (id, val) {
        var el = document.getElementById(id);
        if (el) el.textContent = val;
      };
      var freeNote = document.getElementById("freeShipNote");
      if (freeNote) {
        freeNote.innerHTML = s.freeShip
          ? '<span class="pill mint"><i class="bi bi-truck"></i>You unlocked FREE shipping!</span>'
          : '<i class="bi bi-truck me-1"></i>Add <strong>$' + Math.max(0, 50 - s.subtotal).toFixed(2) + "</strong> more for free standard shipping.";
      }
      var countEl = document.getElementById("checkoutItemCount");
      if (countEl) countEl.textContent = s.count + (s.count === 1 ? " item" : " items");
      apply("coSubtotal", Kids.money(s.subtotal));
      apply("coSavings", "-" + Kids.money(s.savings));
      apply("coCoupon", "-" + Kids.money(s.couponDiscount));
      apply("coShipping", s.freeShip ? "FREE" : Kids.money(s.shipping));
      apply("coTax", Kids.money(s.tax));
      apply("coTotal", Kids.money(s.total));
      apply("checkoutTotalBtn", Kids.money(s.total));
      var coFreeNote = document.getElementById("coFreeShipNote");
      if (coFreeNote) {
        coFreeNote.innerHTML = s.freeShip
          ? '<span class="pill mint"><i class="bi bi-truck"></i>FREE shipping unlocked!</span>'
          : '<i class="bi bi-truck me-1"></i>Add <strong>$' + Math.max(0, 50 - s.subtotal).toFixed(2) + "</strong> more for free standard shipping.";
      }
    };

    if (window.Cart && document.getElementById("checkoutWrap")) {
      /* shipping method selection */
      var stdRadio = document.getElementById("shipStandard");
      var expRadio = document.getElementById("shipExpress");
      function setShip(mode) {
        Cart.setShipMethod(mode);
        var std = document.querySelector(".ship-option[data-ship=standard]");
        var exp = document.querySelector(".ship-option[data-ship=express]");
        if (std) std.classList.toggle("selected", mode === "standard");
        if (exp) exp.classList.toggle("selected", mode === "express");
      }
      if (stdRadio && expRadio) {
        stdRadio.addEventListener("change", function () { if (stdRadio.checked) setShip("standard"); });
        expRadio.addEventListener("change", function () { if (expRadio.checked) setShip("express"); });
        var initial = Cart.shipMethod();
        stdRadio.checked = initial !== "express";
        expRadio.checked = initial === "express";
        setShip(initial);
      }
      Cart.renderCheckoutItems();
      Cart.renderSummary();
      if (!Cart.count()) {
        var coWrap = document.getElementById("checkoutWrap");
        var coEmpty = document.getElementById("checkoutEmpty");
        if (coWrap) coWrap.classList.add("d-none");
        if (coEmpty) coEmpty.classList.remove("d-none");
      }
    }

    /* coupon apply button */
    var couponBtn = document.getElementById("couponBtn");
    if (couponBtn && window.Cart) {
      couponBtn.addEventListener("click", function () {
        var input = document.getElementById("couponInput");
        if (!input) return;
        var rate = Cart.setCoupon(input.value);
        var msg = document.getElementById("couponMsg");
        if (rate) {
          if (msg) { msg.innerHTML = '<span class="pill mint"><i class="bi bi-check"></i>Coupon applied — ' + Math.round(rate * 100) + "% off!</span>"; }
        } else {
          if (msg) { msg.innerHTML = '<span class="pill pink"><i class="bi bi-x"></i>Invalid coupon. Try BLOOM10.</span>'; }
        }
        Cart.renderSummary();
      });
    }

    /* cart page buttons */
    var clearAllBtn = document.getElementById("cartClearAll");
    if (clearAllBtn && window.Cart) {
      clearAllBtn.addEventListener("click", function () {
        Cart.clear();
        showToast("Cart cleared", "Your cart is now empty.", "ok");
      });
    }
    var toCheckoutBtn = document.getElementById("cartToCheckout");
    if (toCheckoutBtn) {
      toCheckoutBtn.addEventListener("click", function () { window.location.href = "checkout.html"; });
    }

    /* ------------------------------------------------------------
       12. PLACE ORDER → order-success
       ------------------------------------------------------------ */
    var placeOrderBtn = document.getElementById("placeOrderBtn");
    if (placeOrderBtn && window.Cart) {
      placeOrderBtn.addEventListener("click", function () {
        var form = document.getElementById("checkoutForm");
        if (form && !form.checkValidity()) {
          form.reportValidity();
          return;
        }
        var s = Cart.summary();
        if (!s.count) {
          showToast("Empty cart", "Add something adorable first!", "error");
          return;
        }
        var order = {
          number: "LB" + Date.now().toString().slice(-6),
          date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          total: s.total,
          items: Cart.items(),
          ship: Cart.shipMethod() === "express" ? "Express Delivery (1–2 days)" : "Standard Delivery (3–5 days)",
          name: document.getElementById("cName") ? document.getElementById("cName").value : "",
          email: document.getElementById("cEmail") ? document.getElementById("cEmail").value : "",
          address: document.getElementById("cAddress") ? document.getElementById("cAddress").value : "",
          city: document.getElementById("cCity") ? document.getElementById("cCity").value : ""
        };
        try { localStorage.setItem("lb-order", JSON.stringify(order)); } catch (e) { /* ignore */ }
        Cart.clear();
        window.location.href = "order-success.html";
      });
    }

    /* ------------------------------------------------------------
       13. ORDER SUCCESS PAGE
       ------------------------------------------------------------ */
    if (document.getElementById("orderSuccess")) {
      renderOrderSuccess();
    }
    function renderOrderSuccess() {
      var wrap = document.getElementById("orderSuccess");
      var order = null;
      try { order = JSON.parse(localStorage.getItem("lb-order") || "null"); } catch (e) { order = null; }
      if (!order) {
        wrap.innerHTML =
          '<div class="empty-state"><div class="empty-emoji">🧸</div><h3>No order found</h3>' +
          '<p>We couldn\'t find your most recent order.</p><a href="shop.html" class="btn btn-brand">Start Shopping</a></div>';
        return;
      }
      var itemsHtml = (order.items || []).map(function (it) {
        return '<div class="d-flex justify-content-between py-2" style="border-bottom:1px dashed var(--border-soft)"><span>' + it.name + ' × ' + it.qty + "</span><span class='fw-bold'>" + Kids.money(it.price * it.qty) + "</span></div>";
      }).join("");

      wrap.innerHTML =
        '<div class="text-center mb-4">' +
          '<span class="icon-btn mx-auto mb-3" style="width:84px;height:84px;border-radius:50%;background:rgba(143,208,180,.25);color:#3f9678;font-size:2rem;display:flex;align-items:center;justify-content:center"><i class="bi bi-check-lg"></i></span>' +
          '<h1 class="font-heading">Thank you, ' + (order.name ? order.name.split(" ")[0] : "friend") + "!</h1>" +
          '<p class="mx-auto" style="max-width:520px">Your order has been placed successfully. A confirmation email is on its way to <strong>' + (order.email || "your inbox") + "</strong>.</p>" +
          '<span class="pill mint mt-2"><i class="bi bi-receipt"></i>Order Number: ' + order.number + "</span>" +
        "</div>" +
        '<div class="row g-4 justify-content-center mt-2">' +
          '<div class="col-lg-6">' +
            '<div class="summary-card" style="position:static">' +
              "<h5 class=\"mb-3\">Order Summary</h5>" + itemsHtml +
              '<div class="summary-row total mt-3"><span>Total Paid</span><span class="val">' + Kids.money(order.total) + "</span></div>" +
            "</div>" +
          "</div>" +
          '<div class="col-lg-4">' +
            '<div class="summary-card" style="position:static">' +
              "<h5 class=\"mb-3\">Delivery Information</h5>" +
              '<div class="contact-line"><i class="bi bi-truck"></i><span>' + order.ship + "</span></div>" +
              '<div class="contact-line"><i class="bi bi-geo-alt"></i><span>' + (order.address ? order.address + ", " + order.city : "Address entered at checkout") + "</span></div>" +
              '<div class="contact-line"><i class="bi bi-calendar-check"></i><span>Arrives ' + (order.ship.indexOf("Express") > -1 ? "within 2 days" : "within 5 days") + "</span></div>" +
              '<div class="contact-line"><i class="bi bi-envelope"></i><span>Updates sent to ' + (order.email || "your email") + "</span></div>" +
            "</div>" +
          "</div>" +
        "</div>" +
        '<div class="text-center mt-4 d-flex flex-wrap gap-3 justify-content-center">' +
          '<a href="shop.html" class="btn btn-brand btn-lg"><i class="bi bi-bag me-1"></i>Continue Shopping</a>' +
          '<a href="wishlist.html" class="btn btn-outline-brand btn-lg"><i class="bi bi-heart me-1"></i>View Wishlist</a>' +
        "</div>";
    }

    /* ------------------------------------------------------------
       14. BLOG FILTER & SEARCH (blog.html)
       ------------------------------------------------------------ */
    var blogGrid = document.getElementById("blogGrid");
    if (blogGrid) {
      var searchInput = document.getElementById("blogSearch");
      var catSelect = document.getElementById("blogCategory");
      var cards = blogGrid.querySelectorAll(".blog-card");
      function applyBlogFilter() {
        var q = searchInput ? searchInput.value.trim().toLowerCase() : "";
        var cat = catSelect ? catSelect.value : "all";
        cards.forEach(function (card) {
          var text = ((card.getAttribute("data-title") || "") + " " + (card.getAttribute("data-text") || "")).toLowerCase();
          var c = card.getAttribute("data-cat") || "all";
          var okQ = text.indexOf(q) > -1;
          var okC = cat === "all" || c === cat;
          card.closest(".col").style.display = okQ && okC ? "" : "none";
        });
      }
      if (searchInput) searchInput.addEventListener("input", applyBlogFilter);
      if (catSelect) catSelect.addEventListener("change", applyBlogFilter);
    }
  });
})();
