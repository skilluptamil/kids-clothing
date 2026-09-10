/* ==========================================================================
   LITTLE BLOOM — Reusable Navigation Bar
   --------------------------------------------------------------------------
   File   : assets/js/navbar.js
   Usage  : Include <div id="navbar-container"></div> in the page body, then
            load this script at the end of the body (before footer.js/main.js).
   Notes  : Features dedicated "Shop by Age" and categorized "Shop" menus.
   ========================================================================== */
(function () {
  "use strict";

  var CONTACT = {
    phone: "+1 (800) 246-8100",
    phoneHref: "tel:+18002468100",
    email: "hello@littlebloom.com",
    emailHref: "mailto:hello@littlebloom.com",
    hours: "Mon – Sat: 9:00 – 20:00"
  };

  var SOCIALS = [
    { icon: "bi-facebook", href: "https://www.facebook.com/", label: "Facebook" },
    { icon: "bi-instagram", href: "https://www.instagram.com/", label: "Instagram" },
    { icon: "bi-tiktok", href: "https://www.tiktok.com/", label: "TikTok" },
    { icon: "bi-pinterest", href: "https://www.pinterest.com/", label: "Pinterest" },
    { icon: "bi-youtube", href: "https://www.youtube.com/", label: "YouTube" }
  ];

  /* ------------------------------------------------------------
     NAV DATA
     ------------------------------------------------------------ */
  var NAV = [
    {
      label: "Home",
      href: "index.html",
      dropdown: [
        { label: "Home 1 (Modern Store)", href: "index.html", icon: "bi-house-heart", desc: "Hero, Age Categories & Trending" },
        { label: "Home 2 (Story & Boutique)", href: "home-2.html", icon: "bi-stars", desc: "Curated Collections & Nursery" }
      ]
    },
    {
      label: "Shop by Age",
      href: "shop.html",
      dropdown: [
        { label: "👶 Newborn (0–3m)", href: "shop.html?age=newborn", icon: "bi-heart-pulse", desc: "Hospital bags, swaddles & first rompers" },
        { label: "🍼 0–2 Years", href: "shop.html?age=0-2y", icon: "bi-balloon", desc: "Crawling sets, onesies & soft basics" },
        { label: "🎈 3–5 Years", href: "shop.html?age=3-5y", icon: "bi-puzzle", desc: "Preschool play sets, twirl dresses & denim" },
        { label: "🎒 6–9 Years", href: "shop.html?age=6-9y", icon: "bi-backpack", desc: "School wear, sporty jackets & active sets" },
        { label: "🌟 10+ Years", href: "shop.html?age=10plus", icon: "bi-stars", desc: "Pre-teens & teens hoodies, cargo & chic styles" }
      ]
    },
    {
      label: "Categories",
      href: "shop.html",
      dropdown: [
        { label: "All Products", href: "shop.html", icon: "bi-grid", desc: "Explore the full store catalog" },
        { label: "New Arrivals", href: "shop.html?collection=new-arrivals", icon: "bi-sparkles", desc: "Fresh styles just landed" },
        { label: "Dresses & Skirts", href: "shop.html?category=dresses", icon: "bi-flower1", desc: "Party, casual & twirl dresses" },
        { label: "Tops & T-Shirts", href: "shop.html?category=tops", icon: "bi-tag", desc: "Graphic tees, shirts & hoodies" },
        { label: "Matching Sets", href: "shop.html?category=sets", icon: "bi-collection", desc: "Coordinated sets & dungarees" },
        { label: "School Uniforms", href: "shop.html?category=school", icon: "bi-award", desc: "Durable school shirts, pants & sweaters" },
        { label: "Sleepwear & Pajamas", href: "shop.html?category=sleepwear", icon: "bi-moon-stars", desc: "Organic bamboo & fleece sleepwear" },
        { label: "Gift Hampers & Boxes", href: "gifting.html", icon: "bi-gift", desc: "Pre-packaged baby shower gifts" }
      ]
    },
    {
      label: "Offers",
      href: "sale.html",
      hot: true
    },
    { label: "Size Guide", href: "size-guide.html" },
    { label: "About", href: "about.html" },
    { label: "Blog", href: "blog.html" },
    { label: "Contact", href: "contact.html" }
  ];

  /* ------------------------------------------------------------
     Helpers
     ------------------------------------------------------------ */
  function currentFile() {
    var p = window.location.pathname.split("/").pop();
    return p || "index.html";
  }
  function active(href) {
    var target = href.split("?")[0];
    return target === currentFile();
  }
  function childActive(item) {
    if (item.dropdown) return item.dropdown.some(function (c) { return active(c.href); });
    return false;
  }
  function iconTag(c) {
    return c.icon ? '<i class="bi ' + c.icon + '"></i>' : "";
  }
  function descTag(c) {
    return c.desc ? '<span class="item-desc">' + c.desc + "</span>" : "";
  }

  /* ------------------------------------------------------------
     Desktop nav items
     ------------------------------------------------------------ */
  function navItems() {
    return NAV.map(function (item) {
      var hot = item.hot ? '<span class="badge-hot">SALE</span>' : "";
      if (item.dropdown) {
        return (
          '<li class="nav-item dropdown">' +
            '<a class="nav-link dropdown-toggle' + (active(item.href) || childActive(item) ? " active" : "") + '" href="' + item.href + '" data-bs-toggle="dropdown" aria-expanded="false">' + item.label + hot + '</a>' +
            '<ul class="dropdown-menu shadow-lg border-0">' +
              item.dropdown.map(function (c) {
                return '<li><a class="dropdown-item' + (active(c.href) ? " active" : "") + '" href="' + c.href + '">' + iconTag(c) + '<div><div class="item-title">' + c.label + '</div>' + descTag(c) + '</div></a></li>';
              }).join("") +
            "</ul>" +
          "</li>"
        );
      }
      return (
        '<li class="nav-item">' +
          '<a class="nav-link' + (active(item.href) ? " active" : "") + '" href="' + item.href + '">' + item.label + hot + '</a>' +
        '</li>'
      );
    }).join("");
  }

  /* ------------------------------------------------------------
     Mobile nav items (collapsible submenus)
     ------------------------------------------------------------ */
  function mobileNavItems() {
    return NAV.map(function (item) {
      var hot = item.hot ? '<span class="badge-hot">SALE</span>' : "";
      var href = item.href;
      var target = href.split("?")[0];
      var isActive = target === currentFile() || childActive(item);
      var act = isActive ? " active" : "";
      var link = '<a class="nav-link' + act + '" href="' + href + '">' + item.label + hot + "</a>";
      var hasSub = item.dropdown;

      if (hasSub) {
        return (
          '<li class="nav-item">' +
            link.replace("</a>", '<i class="bi bi-chevron-down caret" data-mobile-caret></i></a>') +
            '<ul class="dropdown-menu">' +
              item.dropdown.map(function (c) {
                return '<li><a class="dropdown-item" href="' + c.href + '">' + iconTag(c) + "<span>" + c.label + "</span></a></li>";
              }).join("") +
            "</ul>" +
          "</li>"
        );
      }
      return '<li class="nav-item">' + link + "</li>";
    }).join("");
  }

  /* ------------------------------------------------------------
     Brand Logo SVG (consistent, zero-dependency, immune to file path issues)
     ------------------------------------------------------------ */
  var BRAND_LOGO_SVG =
    '<span class="brand-logo-wrap">' +
      '<svg class="brand-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="36" height="36" aria-hidden="true">' +
        '<defs>' +
          '<linearGradient id="lbNavLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#FF8A65"/>' +
            '<stop offset="100%" stop-color="#F4511E"/>' +
          '</linearGradient>' +
          '<filter id="lbNavLogoGlow" x="-10%" y="-10%" width="120%" height="120%">' +
            '<feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#F4511E" flood-opacity="0.25"/>' +
          '</filter>' +
        '</defs>' +
        '<rect x="3" y="3" width="58" height="58" rx="18" ry="18" fill="url(#lbNavLogoGrad)" filter="url(#lbNavLogoGlow)"/>' +
        '<rect x="18" y="18" width="28" height="28" rx="9" ry="9" fill="#FFFFFF"/>' +
      '</svg>' +
    '</span>';

  /* ------------------------------------------------------------
     Header markup
     ------------------------------------------------------------ */
  var headerHTML =
    '<header class="site-header" id="siteHeader">' +
      /* -------- Main navbar -------- */
      '<nav class="navbar navbar-expand-lg main-nav sticky-top" id="mainNav" aria-label="Main navigation">' +
        '<div class="container">' +
          /* Brand logo */
          '<a class="navbar-brand d-flex align-items-center gap-2" href="index.html" aria-label="LittleBloom Home">' +
            BRAND_LOGO_SVG +
            '<span class="brand-name"><span class="brand-name-dark">Little</span><span class="brand-name-coral">Bloom</span></span>' +
          '</a>' +

          /* Right actions */
          '<div class="d-flex align-items-center gap-2 order-lg-3">' +
            '<a href="search.html" class="icon-btn d-none d-sm-inline-flex" title="Search products" aria-label="Search">' +
              '<i class="bi bi-search"></i>' +
            '</a>' +
            '<a href="wishlist.html" class="icon-btn position-relative" title="My Wishlist" aria-label="Wishlist">' +
              '<i class="bi bi-heart"></i><span class="count-badge" id="wishCount">0</span>' +
            '</a>' +
            '<a href="cart.html" class="icon-btn position-relative" title="Shopping Cart" aria-label="Shopping cart">' +
              '<i class="bi bi-bag"></i><span class="count-badge" id="cartCount">0</span>' +
            '</a>' +
            '<a href="login.html" class="icon-btn d-none d-md-inline-flex" title="Account" aria-label="Account / login">' +
              '<i class="bi bi-person"></i>' +
            '</a>' +
            '<button type="button" class="theme-toggle icon-btn" id="themeToggle" title="Toggle dark / light mode" aria-label="Toggle dark mode">' +
              '<i class="bi bi-moon-stars"></i><i class="bi bi-sun"></i>' +
            '</button>' +
            '<button type="button" class="rtl-toggle icon-btn d-none d-sm-inline-flex" id="rtlToggle" title="Toggle RTL / LTR" aria-label="Toggle RTL layout">' +
              '<i class="bi bi-text-right"></i>' +
            '</button>' +
            '<a href="shop.html" class="btn btn-brand btn-sm d-none d-lg-inline-flex align-items-center gap-1 ms-1 header-shop-btn" aria-label="Shop Collection">' +
              '<i class="bi bi-bag-check-fill"></i><span>Shop Now</span>' +
            '</a>' +
            '<button class="navbar-toggler border-0 d-lg-none icon-btn ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNav" aria-controls="mobileNav" aria-label="Toggle navigation">' +
              '<i class="bi bi-list fs-4"></i>' +
            '</button>' +
          '</div>' +

          /* Centered nav links */
          '<div class="collapse navbar-collapse order-lg-2 d-none d-lg-flex justify-content-center">' +
            '<ul class="navbar-nav">' + navItems() + '</ul>' +
          '</div>' +
        '</div>' +
      '</nav>' +

      /* -------- Mobile offcanvas -------- */
      '<div class="offcanvas offcanvas-end mobile-nav" tabindex="-1" id="mobileNav" aria-labelledby="mobileNavLabel">' +
        '<div class="offcanvas-header border-bottom">' +
          '<h5 class="offcanvas-title mb-0" id="mobileNavLabel">' +
            '<a class="navbar-brand d-flex align-items-center gap-2" href="index.html">' +
              BRAND_LOGO_SVG +
              '<span class="brand-name"><span class="brand-name-dark">Little</span><span class="brand-name-coral">Bloom</span></span>' +
            '</a>' +
          '</h5>' +
          '<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>' +
        '</div>' +
        '<div class="offcanvas-body pt-3">' +
          '<div class="mb-3">' +
            '<form action="search.html" method="get" class="search-form-mobile">' +
              '<div class="input-group">' +
                '<input type="text" name="q" class="form-control" placeholder="Search baby & kids clothes...">' +
                '<button class="btn btn-brand" type="submit"><i class="bi bi-search"></i></button>' +
              '</div>' +
            '</form>' +
          '</div>' +
          '<ul class="navbar-nav flex-column">' + mobileNavItems() + '</ul>' +
          '<div class="d-grid gap-2 mt-4 pt-3 border-top">' +
            '<a href="shop.html" class="btn btn-brand mb-1"><i class="bi bi-bag-check-fill me-2"></i>Shop Collection</a>' +
            '<a href="login.html" class="btn btn-soft"><i class="bi bi-person me-1"></i>Login / Register</a>' +
            '<div class="d-flex align-items-center justify-content-between mt-3">' +
              '<div class="socials d-flex">' +
                SOCIALS.map(function (s) {
                  return '<a href="' + s.href + '" aria-label="' + s.icon.replace("bi-", "") + '"><i class="bi ' + s.icon + '"></i></a>';
                }).join("") +
              '</div>' +
              '<button type="button" class="btn btn-soft btn-sm rtl-toggle" id="rtlToggleMobile"><i class="bi bi-text-right me-1"></i>RTL / LTR</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</header>';

  var host = document.getElementById("navbar-container");
  if (host) {
    host.style.minHeight = "72px";
    host.innerHTML = headerHTML;
    var headerEl = host.querySelector(".site-header");
    function syncNavHeight() {
      if (headerEl) host.style.height = headerEl.offsetHeight + "px";
    }
    syncNavHeight();
    window.addEventListener("resize", syncNavHeight);
    window.addEventListener("load", syncNavHeight);

    // Initial badge update if modules loaded
    try {
      if (window.Cart) {
        var cc = document.getElementById("cartCount");
        if (cc) {
          var n = window.Cart.count();
          cc.textContent = n;
          cc.classList.toggle("show", n > 0);
        }
      }
      if (window.Wishlist) {
        window.Wishlist.badge();
      }
    } catch (e) {}
  }

  /* Mobile submenu toggling (works with Bootstrap offcanvas) */
  if (host) {
    host.querySelectorAll("[data-mobile-caret]").forEach(function (caret) {
      var link = caret.closest(".nav-link");
      var sub = link.nextElementSibling;
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var shown = link.classList.toggle("show");
        link.setAttribute("aria-expanded", shown ? "true" : "false");
        if (sub) sub.style.display = shown ? "block" : "none";
      });
    });
  }
})();
