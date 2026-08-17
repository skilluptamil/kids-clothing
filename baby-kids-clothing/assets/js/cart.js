/* ==========================================================================
   LITTLE BLOOM — Cart Module (LocalStorage)
   --------------------------------------------------------------------------
   File   : assets/js/cart.js
   Notes  : Handles add / remove / update, the navbar badge, the cart page
            and the checkout order summary. Data persists in "lb-cart".
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "lb-cart";
  var FREE_SHIP_THRESHOLD = 50;
  var STD_SHIP = 4.99;
  var EXP_SHIP = 12.99;
  var TAX_RATE = 0.08;

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
  }
  function write(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
  }

  function lineKey(id, size, color) {
    return String(id) + "||" + (size || "") + "||" + (color || "");
  }

  var Cart = {
    items: function () { return read(); },

    count: function () {
      return read().reduce(function (n, it) { return n + it.qty; }, 0);
    },

    find: function (id, size, color) {
      var key = lineKey(id, size, color);
      var list = read();
      for (var i = 0; i < list.length; i++) {
        if (lineKey(list[i].id, list[i].size, list[i].color) === key) return list[i];
      }
      return null;
    },

    add: function (id, opts) {
      opts = opts || {};
      var p = window.Kids && Kids.byId(id);
      var list = read();
      var key = lineKey(id, opts.size, opts.color);
      var qty = opts.qty || 1;
      var existing = null;
      for (var i = 0; i < list.length; i++) {
        if (lineKey(list[i].id, list[i].size, list[i].color) === key) { existing = list[i]; break; }
      }
      if (existing) {
        existing.qty += qty;
      } else {
        list.push({
          key: key,
          id: String(id),
          name: opts.name || (p ? p.name : "Product"),
          image: opts.image || (p ? p.image : "assets/images/placeholder.svg"),
          price: (opts.price !== undefined) ? opts.price : (p ? Kids.salePrice(p) : 0),
          size: opts.size || "",
          color: opts.color || "",
          qty: qty
        });
      }
      write(list);
      Cart.badge();
      return Cart.count();
    },

    updateQty: function (key, delta) {
      var list = read();
      for (var i = 0; i < list.length; i++) {
        if (list[i].key === key) {
          list[i].qty = Math.max(1, list[i].qty + delta);
          break;
        }
      }
      write(list);
      Cart.badge();
      Cart.renderCart();
      return Cart.count();
    },

    setQty: function (key, qty) {
      var list = read();
      for (var i = 0; i < list.length; i++) {
        if (list[i].key === key) { list[i].qty = Math.max(1, parseInt(qty, 10) || 1); break; }
      }
      write(list);
      Cart.badge();
      Cart.renderCart();
    },

    remove: function (key) {
      write(read().filter(function (it) { return it.key !== key; }));
      Cart.badge();
      Cart.renderCart();
    },

    clear: function () {
      write([]);
      Cart.badge();
      Cart.renderCart();
    },

    coupon: function () {
      try { return localStorage.getItem("lb-coupon") || ""; } catch (e) { return ""; }
    },
    setCoupon: function (code) {
      var valid = { BLOOM10: 0.1, WELCOME15: 0.15 };
      var rate = valid[String(code || "").toUpperCase().trim()];
      try {
        if (rate) localStorage.setItem("lb-coupon", String(code).toUpperCase());
        else localStorage.removeItem("lb-coupon");
      } catch (e) { /* ignore */ }
      return rate || 0;
    },

    summary: function () {
      var items = read();
      var subtotal = 0, savings = 0;
      items.forEach(function (it) {
        var full = 0;
        if (window.Kids) {
          var p = Kids.byId(it.id);
          if (p) full = p.price;
        }
        subtotal += it.price * it.qty;
        savings += Math.max(0, full - it.price) * it.qty;
      });
      var couponRate = Cart.coupon() ? { BLOOM10: 0.1, WELCOME15: 0.15 }[Cart.coupon()] || 0 : 0;
      var couponDiscount = subtotal * couponRate;
      var shipMethod = Cart.shipMethod();
      var shipping = (shipMethod === "express" ? EXP_SHIP : STD_SHIP);
      if (!items.length) shipping = 0;
      else if (shipMethod !== "express" && subtotal >= FREE_SHIP_THRESHOLD) shipping = 0;
      var taxable = Math.max(subtotal - couponDiscount, 0);
      var tax = taxable * TAX_RATE;
      var total = taxable + shipping + tax;
      return {
        count: Cart.count(),
        subtotal: subtotal,
        savings: savings,
        couponDiscount: couponDiscount,
        shipping: shipping,
        tax: tax,
        total: total,
        freeShip: shipping === 0 && items.length > 0
      };
    },

    shipMethod: function () {
      try { return localStorage.getItem("lb-ship") || "standard"; } catch (e) { return "standard"; }
    },
    setShipMethod: function (m) {
      try { localStorage.setItem("lb-ship", m); } catch (e) { /* ignore */ }
      Cart.renderSummary();
    },

    /* -------- navbar badge -------- */
    badge: function () {
      var el = document.getElementById("cartCount");
      if (!el) return;
      var n = Cart.count();
      el.textContent = n;
      el.classList.toggle("show", n > 0);
    },

    /* -------- cart page -------- */
    renderCart: function () {
      var tbody = document.getElementById("cartItems");
      if (!tbody) return;
      var empty = document.getElementById("cartEmpty");
      var tableWrap = document.getElementById("cartTableWrap");

      var items = read();
      if (!items.length) {
        tbody.innerHTML = "";
        if (empty) empty.classList.remove("d-none");
        if (tableWrap) tableWrap.classList.add("d-none");
        Cart.renderSummary();
        return;
      }
      if (empty) empty.classList.add("d-none");
      if (tableWrap) tableWrap.classList.remove("d-none");

      tbody.innerHTML = items.map(function (it) {
        return (
          '<tr class="cart-item">' +
            '<td data-label="Product" style="min-width:280px">' +
              '<div class="d-flex align-items-center gap-3">' +
                '<img src="' + it.image + '" alt="' + it.name + '" class="ci-img" onerror="this.onerror=null;this.src=\'assets/images/placeholder.svg\'">' +
                '<div>' +
                  '<a class="ci-name" href="product-details.html?id=' + it.id + '">' + it.name + "</a>" +
                  '<div class="ci-meta mt-1">' +
                    (it.size ? "Size: <strong>" + it.size + "</strong>" : "") +
                    (it.color ? " &middot; Color: <strong>" + it.color + "</strong>" : "") +
                  "</div>" +
                  '<button type="button" class="btn btn-link btn-sm p-0 mt-1 js-move-wish" data-key="' + it.key + '" data-id="' + it.id + '" style="font-size:.78rem">' +
                    '<i class="bi bi-heart me-1"></i>Move to Wishlist</button>' +
                "</div>" +
              "</div>" +
            "</td>" +
            '<td data-label="Price"><span class="ci-price">' + Kids.money(it.price) + "</span></td>" +
            '<td data-label="Quantity">' +
              '<div class="qty-control" data-key="' + it.key + '">' +
                '<button type="button" class="js-cart-minus" aria-label="Decrease quantity"><i class="bi bi-dash"></i></button>' +
                '<span class="qty-val">' + it.qty + "</span>" +
                '<button type="button" class="js-cart-plus" aria-label="Increase quantity"><i class="bi bi-plus"></i></button>' +
              "</div>" +
            "</td>" +
            '<td data-label="Total"><span class="ci-price">' + Kids.money(it.price * it.qty) + "</span></td>" +
            '<td data-label="Remove"><button type="button" class="ci-remove js-cart-remove" data-key="' + it.key + '" aria-label="Remove ' + it.name + '"><i class="bi bi-trash"></i></button></td>' +
          "</tr>"
        );
      }).join("");
      Cart.renderSummary();
    },

    renderSummary: function () {
      var s = Cart.summary();
      var apply = function (id, val) {
        var el = document.getElementById(id);
        if (el) el.textContent = val;
      };
      apply("sumSubtotal", Kids.money(s.subtotal));
      apply("sumSavings", "-" + Kids.money(s.savings));
      apply("sumCoupon", "-" + Kids.money(s.couponDiscount));
      apply("sumShipping", s.freeShip ? "FREE" : Kids.money(s.shipping));
      apply("sumTax", Kids.money(s.tax));
      apply("sumTotal", Kids.money(s.total));
      apply("sumCount", s.count);
      if (window.onSummary && typeof window.onSummary === "function") window.onSummary(s);
    },

    /* -------- checkout rendering -------- */
    renderCheckoutItems: function () {
      var wrap = document.getElementById("checkoutItems");
      if (!wrap) return;
      var items = read();
      if (!items.length) {
        wrap.innerHTML = '<p class="text-muted mb-0">Your cart is empty. <a href="shop.html">Go shopping</a></p>';
        return;
      }
      wrap.innerHTML = items.map(function (it) {
        return (
          '<div class="d-flex align-items-center gap-3 mb-3">' +
            '<img src="' + it.image + '" alt="' + it.name + '" class="ci-img" style="width:64px;height:64px" onerror="this.onerror=null;this.src=\'assets/images/placeholder.svg\'">' +
            '<div class="flex-grow-1">' +
              '<div class="fw-bold" style="color:var(--ink)">' + it.name + "</div>" +
              '<div class="text-muted" style="font-size:.8rem">' + (it.size ? "Size " + it.size : "") + (it.color ? " &middot; " + it.color : "") + " &middot; Qty " + it.qty + "</div>" +
            "</div>" +
            '<span class="fw-bold" style="color:var(--brand-dark)">' + Kids.money(it.price * it.qty) + "</span>" +
          "</div>"
        );
      }).join("");
    }
  };

  window.Cart = Cart;

  /* -------- shared toast helper -------- */
  window.showToast = function (title, msg, type) {
    var container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container position-fixed top-0 end-0 p-3";
      document.body.appendChild(container);
    }
    var icon = type === "error" ? "bi-exclamation-triangle-fill" : "bi-check-circle-fill";
    var iconCls = type === "error" ? "" : "brand";
    var toast = document.createElement("div");
    toast.className = "toast neo-toast align-items-center";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML =
      '<div class="toast-body">' +
        '<span class="toast-icon ' + iconCls + '"><i class="bi ' + icon + '"></i></span>' +
        "<div>" +
          '<div class="toast-title">' + title + "</div>" +
          '<p class="toast-msg">' + msg + "</p>" +
        "</div>" +
        '<button type="button" class="btn-close ms-auto" data-bs-dismiss="toast" aria-label="Close"></button>' +
      "</div>";
    container.appendChild(toast);
    if (window.bootstrap) {
      var bst = new bootstrap.Toast(toast, { delay: 3200 });
      bst.show();
      toast.addEventListener("hidden.bs.toast", function () { toast.remove(); });
    }
  };

  /* -------- event binding -------- */
  document.addEventListener("DOMContentLoaded", function () {
    Cart.badge();
    Cart.renderCart();
    Cart.renderSummary();
    Cart.renderCheckoutItems();

    document.addEventListener("click", function (e) {
      var t = e.target.closest;
      if (!t) return;

      /* add to cart buttons (products grid / quickview) */
      var addBtn = t ? e.target.closest(".js-addtocart, [data-qv-add]") : null;
      if (addBtn && e.target.closest("body")) {
        var id = addBtn.getAttribute("data-id");
        var wrap = addBtn.closest(".qty-control");
        var qty = wrap ? parseInt((wrap.querySelector(".qty-val") || {}).textContent || "1", 10) : 1;
        var size = null, color = null;
        if (addBtn.hasAttribute("data-qv-add")) {
          var modal = addBtn.closest(".modal");
          if (modal) {
            var sizeChip = modal.querySelector(".size-chip.active");
            var colorChip = modal.querySelector(".color-chip.active");
            size = sizeChip ? sizeChip.getAttribute("data-size") : null;
            color = colorChip ? colorChip.getAttribute("data-color") : null;
          }
        }
        Cart.add(id, { qty: qty, size: size, color: color });
        showToast("Added to Cart", "Your item is safely in the bag.", "ok");
        return;
      }

      /* quickview */
      var qv = e.target.closest(".js-quickview");
      if (qv) {
        e.preventDefault();
        if (window.Kids) Kids.openQuickView(qv.getAttribute("data-id"));
        return;
      }

      /* cart qty */
      var minus = e.target.closest(".js-cart-minus");
      var plus = e.target.closest(".js-cart-plus");
      if (minus || plus) {
        var ctrl = (minus || plus).closest(".qty-control");
        Cart.updateQty(ctrl.getAttribute("data-key"), minus ? -1 : 1);
        return;
      }

      /* cart remove */
      var rem = e.target.closest(".js-cart-remove");
      if (rem) {
        Cart.remove(rem.getAttribute("data-key"));
        showToast("Removed", "Item removed from your cart.");
        return;
      }

      /* move to wishlist */
      var mv = e.target.closest(".js-move-wish");
      if (mv) {
        Cart.remove(mv.getAttribute("data-key"));
        if (window.Wishlist) {
          Wishlist.add(mv.getAttribute("data-id"));
          showToast("Saved", "Moved to your wishlist.");
        }
        return;
      }

      /* quickview qty + / - */
      var qminus = e.target.closest(".js-qty-minus");
      var qplus = e.target.closest(".js-qty-plus");
      if (qminus || qplus) {
        var qctrl = (qminus || qplus).closest(".qty-control");
        var val = qctrl.querySelector(".qty-val");
        var n = parseInt(val.textContent || "1", 10);
        n = Math.max(1, qminus ? n - 1 : n + 1);
        val.textContent = n;
        return;
      }

      /* buy now */
      var buy = e.target.closest("[data-qv-buy]");
      if (buy) {
        var bid = buy.getAttribute("data-id");
        var bwrap = buy.closest(".modal");
        var bqty = 1;
        if (bwrap) {
          var bval = bwrap.querySelector(".qty-val");
          bqty = bval ? parseInt(bval.textContent, 10) : 1;
        }
        Cart.add(bid, { qty: bqty });
        window.location.href = "checkout.html";
        return;
      }
    });

    /* storage sync across tabs */
    window.addEventListener("storage", function (e) {
      if (e.key === KEY) { Cart.badge(); Cart.renderCart(); Cart.renderSummary(); }
    });
  });
})();
