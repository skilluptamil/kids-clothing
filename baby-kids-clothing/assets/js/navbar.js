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
        { label: "Home 1", href: "index.html", icon: "bi-house-heart" },
        { label: "Home 2", href: "home-2.html", icon: "bi-stars" }
      ]
    },
    { label: "About Us", href: "about.html" },
    { label: "Shop", href: "shop.html" },
    { label: "Size Guide", href: "size-guide.html" },
    { label: "Blog", href: "blog.html" },
    { label: "Contact Us", href: "contact.html" }
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
    var cur = currentFile();
    if (target === cur) return true;
    if (target === "blog.html" && cur === "blog-details.html") return true;
    if (target === "shop.html" && (cur === "product-details.html" || cur === "sale.html" || cur === "gifting.html")) return true;
    return false;
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
      var isCurActive = active(item.href) || childActive(item);
      if (item.dropdown) {
        return (
          '<li class="nav-item dropdown custom-nav-dropdown' + (isCurActive ? " active" : "") + '">' +
            '<a class="nav-link dropdown-toggle' + (isCurActive ? " active" : "") + '" href="#" role="button" data-nav-dropdown aria-expanded="false" aria-haspopup="true" title="' + item.label + '">' +
              item.label + hot + '<i class="bi bi-chevron-down ms-1 dropdown-chevron"></i>' +
            '</a>' +
            '<ul class="dropdown-menu shadow-lg border-0">' +
              item.dropdown.map(function (c) {
                return '<li><a class="dropdown-item' + (active(c.href) ? " active" : "") + '" href="' + c.href + '">' + iconTag(c) + '<span class="item-title">' + c.label + '</span>' + descTag(c) + '</a></li>';
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
      var hasSub = item.dropdown;

      if (hasSub) {
        return (
          '<li class="nav-item mobile-dropdown-item">' +
            '<div class="d-flex align-items-center justify-content-between w-100">' +
              '<a class="nav-link flex-grow-1' + act + '" href="#" data-mobile-toggle role="button">' +
                item.label + hot +
              '</a>' +
              '<button type="button" class="btn-mobile-toggle icon-btn border-0" data-mobile-toggle aria-label="Toggle ' + item.label + ' menu" style="width:36px;height:36px;font-size:0.85rem">' +
                '<i class="bi bi-chevron-down"></i>' +
              '</button>' +
            '</div>' +
            '<ul class="dropdown-menu mobile-sub-menu shadow-sm" style="display:none;padding:0.4rem 0.5rem;border-radius:1rem;margin:0.25rem 0 0.5rem 0.75rem">' +
              item.dropdown.map(function (c) {
                return '<li><a class="dropdown-item' + (active(c.href) ? " active" : "") + '" href="' + c.href + '">' + iconTag(c) + '<span class="item-title" style="margin-left:0.5rem;font-size:0.88rem">' + c.label + '</span>' + descTag(c) + '</a></li>';
              }).join("") +
            "</ul>" +
          '</li>'
        );
      }
      return '<li class="nav-item"><a class="nav-link' + act + '" href="' + href + '">' + item.label + hot + '</a></li>';
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
            '<stop offset="0%" stop-color="#FF9E80"/>' +
            '<stop offset="50%" stop-color="#FF6F61"/>' +
            '<stop offset="100%" stop-color="#F4511E"/>' +
          '</linearGradient>' +
          '<linearGradient id="lbNavPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#FFFFFF"/>' +
            '<stop offset="100%" stop-color="#FFF3E0"/>' +
          '</linearGradient>' +
          '<linearGradient id="lbNavCenterGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#FFE082"/>' +
            '<stop offset="100%" stop-color="#FFB300"/>' +
          '</linearGradient>' +
          '<filter id="lbNavLogoGlow" x="-10%" y="-10%" width="120%" height="120%">' +
            '<feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#F4511E" flood-opacity="0.3"/>' +
          '</filter>' +
        '</defs>' +
        '<rect x="3" y="3" width="58" height="58" rx="18" ry="18" fill="url(#lbNavLogoGrad)" filter="url(#lbNavLogoGlow)"/>' +
        '<path d="M 6 22 C 6 12, 12 6, 22 6 L 42 6 C 28 10, 10 21, 6 42 Z" fill="#FFFFFF" opacity="0.18"/>' +
        '<g fill="url(#lbNavPetalGrad)">' +
          '<ellipse cx="32" cy="21.5" rx="6.5" ry="8.5"/>' +
          '<ellipse cx="32" cy="42.5" rx="6.5" ry="8.5"/>' +
          '<ellipse cx="21.5" cy="32" rx="8.5" ry="6.5"/>' +
          '<ellipse cx="42.5" cy="32" rx="8.5" ry="6.5"/>' +
          '<ellipse cx="24.5" cy="24.5" rx="5.5" ry="7" transform="rotate(-45 24.5 24.5)" opacity="0.95"/>' +
          '<ellipse cx="39.5" cy="24.5" rx="5.5" ry="7" transform="rotate(45 39.5 24.5)" opacity="0.95"/>' +
          '<ellipse cx="24.5" cy="39.5" rx="5.5" ry="7" transform="rotate(45 24.5 39.5)" opacity="0.95"/>' +
          '<ellipse cx="39.5" cy="39.5" rx="5.5" ry="7" transform="rotate(-45 39.5 39.5)" opacity="0.95"/>' +
        '</g>' +
        '<circle cx="32" cy="32" r="8.5" fill="url(#lbNavCenterGrad)"/>' +
        '<path d="M 32 35.8 C 32 35.8 28.2 33.3 28.2 31.1 C 28.2 29.6 29.4 28.6 30.7 28.6 C 31.4 28.6 31.8 28.9 32 29.3 C 32.2 28.9 32.6 28.6 33.3 28.6 C 34.6 28.6 35.8 29.6 35.8 31.1 C 35.8 33.3 32 35.8 32 35.8 Z" fill="#E64A19"/>' +
        '<path d="M 48 13 Q 48 17 52 17 Q 48 17 48 21 Q 48 17 44 17 Q 48 17 48 13 Z" fill="#FFFFFF" opacity="0.9"/>' +
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
          '<div class="d-flex align-items-center gap-2 order-lg-3 header-actions">' +
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

  /* Dropdown event handling (Desktop & Mobile) */
  if (host) {
    // Desktop Dropdown click handling
    host.querySelectorAll("[data-nav-dropdown]").forEach(function (toggle) {
      var parent = toggle.closest(".dropdown");
      var menu = parent ? parent.querySelector(".dropdown-menu") : null;

      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var isOpen = menu && menu.classList.contains("show");

        // Close all dropdowns in nav
        host.querySelectorAll(".dropdown-menu.show").forEach(function (m) {
          m.classList.remove("show");
        });
        host.querySelectorAll("[data-nav-dropdown]").forEach(function (t) {
          t.setAttribute("aria-expanded", "false");
          t.classList.remove("show");
          if (t.closest(".dropdown")) t.closest(".dropdown").classList.remove("show");
        });

        // Toggle clicked dropdown
        if (!isOpen && menu) {
          menu.classList.add("show");
          toggle.classList.add("show");
          toggle.setAttribute("aria-expanded", "true");
          if (parent) parent.classList.add("show");
        }
      });
    });

    // Close desktop dropdown when clicking anywhere outside
    document.addEventListener("click", function (e) {
      if (!e.target.closest("#navbar-container .navbar-nav .dropdown")) {
        host.querySelectorAll(".dropdown-menu.show").forEach(function (m) {
          m.classList.remove("show");
        });
        host.querySelectorAll("[data-nav-dropdown]").forEach(function (t) {
          t.setAttribute("aria-expanded", "false");
          t.classList.remove("show");
          if (t.closest(".dropdown")) t.closest(".dropdown").classList.remove("show");
        });
      }
    });

    // Close desktop dropdown on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        host.querySelectorAll(".dropdown-menu.show").forEach(function (m) {
          m.classList.remove("show");
        });
        host.querySelectorAll("[data-nav-dropdown]").forEach(function (t) {
          t.setAttribute("aria-expanded", "false");
          t.classList.remove("show");
          if (t.closest(".dropdown")) t.closest(".dropdown").classList.remove("show");
        });
      }
    });

    // Mobile submenu toggling
    host.querySelectorAll("[data-mobile-toggle]").forEach(function (btn) {
      var itemWrap = btn.closest(".mobile-dropdown-item") || btn.closest(".mobile-split-nav");
      var sub = itemWrap ? itemWrap.querySelector(".mobile-sub-menu") : null;
      var icon = itemWrap ? itemWrap.querySelector("i.bi-chevron-down") : null;
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (sub) {
          var isShown = sub.style.display === "block";
          sub.style.display = isShown ? "none" : "block";
          if (icon) {
            icon.style.transform = isShown ? "rotate(0deg)" : "rotate(180deg)";
            icon.style.transition = "transform 0.2s ease";
          }
        }
      });
    });
  }
})();
