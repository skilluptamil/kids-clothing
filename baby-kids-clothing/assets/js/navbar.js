/* ==========================================================================
   LITTLE BLOOM — Reusable Navigation Bar
   --------------------------------------------------------------------------
   File   : assets/js/navbar.js
   Usage  : Include <div id="navbar-container"></div> in the page body, then
            load this script at the end of the body (before footer.js/main.js).
   Notes  : Edit the NAV data below to customize the menu. The active link is
            detected automatically from the URL.
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
     NAV DATA — only "Home" keeps a dropdown; the rest are plain
     links for a clean, uncluttered navigation bar.
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
    { label: "About", href: "about.html" },
    { label: "Shop", href: "shop.html" },
    { label: "Size Guide", href: "size-guide.html" },
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
    if (item.mega) {
      return item.mega.cols.some(function (col) {
        return col.links.some(function (l) { return active(l.href); });
      });
    }
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
      if (item.mega) {
        var colsHTML = item.mega.cols.map(function (col) {
          return (
            '<div class="mega-col">' +
              "<h6>" + col.title + "</h6>" +
              col.links.map(function (l) {
                return '<a href="' + l.href + '"' + (active(l.href) ? ' class="text-brand"' : "") + ">" +
                  '<i class="bi bi-chevron-right"></i>' + l.label + "</a>";
              }).join("") +
            "</div>"
          );
        }).join("");
        return (
          '<li class="nav-item dropdown dropdown-mega">' +
            '<a class="nav-link dropdown-toggle' + (active(item.href) || childActive(item) ? " active" : "") + '" href="' + item.href + '" data-bs-toggle="dropdown" aria-expanded="false">' + item.label + hot + "</a>" +
            '<ul class="dropdown-menu dropdown-menu-lg"><div class="mega-grid">' + colsHTML + "</div></ul>" +
          "</li>"
        );
      }
      if (item.dropdown) {
        return (
          '<li class="nav-item dropdown">' +
            '<a class="nav-link dropdown-toggle' + (active(item.href) || childActive(item) ? " active" : "") + '" href="' + item.href + '" data-bs-toggle="dropdown" aria-expanded="false">' + item.label + hot + "</a>" +
            '<ul class="dropdown-menu">' +
              item.dropdown.map(function (c) {
                return '<li><a class="dropdown-item' + (active(c.href) ? " active" : "") + '" href="' + c.href + '">' + iconTag(c) + '<span>' + c.label + descTag(c) + "</span></a></li>";
              }).join("") +
            "</ul>" +
          "</li>"
        );
      }
      return (
        '<li class="nav-item">' +
          '<a class="nav-link' + (active(item.href) ? " active" : "") + '" href="' + item.href + '">' + item.label + hot + "</a>" +
        "</li>"
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
      var hasSub = item.dropdown || item.mega;

      if (hasSub) {
        var links = item.dropdown
          ? item.dropdown
          : item.mega.cols.map(function (col) {
              return { label: col.title, href: col.links[0].href, icon: "bi-folder2" };
            });
        return (
          '<li class="nav-item">' +
            link.replace("</a>", '<i class="bi bi-chevron-down caret" data-mobile-caret></i></a>') +
            '<ul class="dropdown-menu">' +
              links.map(function (c) {
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
     Header markup
     ------------------------------------------------------------ */
  var headerHTML =
    '<header class="site-header" id="siteHeader">' +
      /* -------- Main navbar -------- */
      '<nav class="navbar navbar-expand-lg main-nav sticky-top" id="mainNav" aria-label="Main navigation">' +
        '<div class="container">' +
          '<a class="navbar-brand" href="index.html" aria-label="Little Bloom home">' +
            '<span class="brand-mark"><img src="assets/images/logo/logo.svg" alt="" width="26" height="26" style="filter:brightness(0) invert(1)"></span>' +
            "<span>Little<span style='color:var(--brand-dark)'>Bloom</span></span>" +
          "</a>" +
          '<div class="d-flex align-items-center gap-2 order-lg-3">' +
            '<button type="button" class="rtl-toggle icon-btn" id="rtlToggle" title="Toggle RTL / LTR" aria-label="Toggle RTL layout"><i class="bi bi-text-right"></i></button>' +
            '<button type="button" class="theme-toggle" id="themeToggle" title="Toggle dark / light mode" aria-label="Toggle dark mode"><i class="bi bi-moon-stars"></i><i class="bi bi-sun"></i></button>' +
            '<a href="cart.html" class="icon-btn" aria-label="Shopping cart">' +
              '<i class="bi bi-bag"></i><span class="count-badge" id="cartCount">0</span>' +
            "</a>" +
            '<a href="login.html" class="icon-btn d-none d-md-inline-flex" aria-label="Account / login"><i class="bi bi-person"></i></a>' +
            '<button class="navbar-toggler border-0 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNav" aria-controls="mobileNav" aria-label="Toggle navigation">' +
              '<i class="bi bi-list fs-2 lh-1" style="color:var(--ink)"></i>' +
            "</button>" +
          "</div>" +
          '<div class="collapse navbar-collapse order-lg-2 d-none d-lg-flex">' +
            '<ul class="navbar-nav mx-auto">' + navItems() + "</ul>" +
          "</div>" +
        "</div>" +
      "</nav>" +
      /* -------- Mobile offcanvas -------- */
      '<div class="offcanvas offcanvas-end mobile-nav" tabindex="-1" id="mobileNav" aria-labelledby="mobileNavLabel">' +
        '<div class="offcanvas-header">' +
          '<h5 class="offcanvas-title mb-0" id="mobileNavLabel">' +
            '<a class="navbar-brand" href="index.html"><span class="brand-mark"><img src="assets/images/logo/logo.svg" alt="" width="22" height="22" style="filter:brightness(0) invert(1)"></span>LittleBloom</a>' +
          "</h5>" +
          '<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>' +
        "</div>" +
        '<div class="offcanvas-body pt-3">' +
          '<ul class="navbar-nav flex-column">' + mobileNavItems() + "</ul>" +
          '<div class="d-grid gap-2 mt-4 pt-3 border-top">' +
            '<a href="login.html" class="btn btn-brand"><i class="bi bi-person me-1"></i>Login / Register</a>' +
            '<div class="d-flex align-items-center justify-content-between mt-2">' +
              '<div class="socials d-flex">' +
                SOCIALS.map(function (s) {
                  return '<a href="' + s.href + '" aria-label="' + s.icon.replace("bi-", "") + '"><i class="bi ' + s.icon + '"></i></a>';
                }).join("") +
              "</div>" +
              '<button type="button" class="btn btn-soft btn-sm rtl-toggle" id="rtlToggleMobile"><i class="bi bi-text-right me-1"></i>RTL / LTR</button>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</header>";

  var host = document.getElementById("navbar-container");
  if (host) {
    host.innerHTML = headerHTML;
    var headerEl = host.querySelector(".site-header");
    function syncNavHeight() {
      if (headerEl) host.style.height = headerEl.offsetHeight + "px";
    }
    syncNavHeight();
    window.addEventListener("resize", syncNavHeight);
  }

  /* Mobile submenu toggling (works with Bootstrap offcanvas) */
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
})();
