/* ==========================================================================
   LITTLE BLOOM — Reusable Footer
   --------------------------------------------------------------------------
   File   : assets/js/footer.js
   Usage  : Include <div id="footer-container"></div> in the page body, then
            load this script at the end of the body.
   ========================================================================== */
(function () {
  "use strict";

  var CONTACT = {
    phone: "+1 (800) 246-8100",
    phoneHref: "tel:+18002468100",
    email: "hello@littlebloom.com",
    emailHref: "mailto:hello@littlebloom.com",
    address: "88 Nursery Lane, Suite 12, Portland, OR 97205",
    hours: "Mon – Sat: 9:00 – 20:00"
  };

  var SOCIALS = [
    { icon: "bi-facebook", href: "https://www.facebook.com/", label: "Facebook" },
    { icon: "bi-instagram", href: "https://www.instagram.com/", label: "Instagram" },
    { icon: "bi-tiktok", href: "https://www.tiktok.com/", label: "TikTok" },
    { icon: "bi-pinterest", href: "https://www.pinterest.com/", label: "Pinterest" },
    { icon: "bi-youtube", href: "https://www.youtube.com/", label: "YouTube" }
  ];

  var QUICK_LINKS = [
    { label: "Home", href: "index.html" },
    { label: "About LittleBloom", href: "about.html" },
    { label: "Shop All Collections", href: "shop.html" },
    { label: "New Arrivals", href: "shop.html?collection=new-arrivals" },
    { label: "Sale & Offers", href: "sale.html" },
    { label: "Parenting Blog", href: "blog.html" }
  ];

  var SERVICE_LINKS = [
    { label: "Help & FAQ", href: "faq.html" },
    { label: "Shipping & Delivery", href: "shipping-policy.html" },
    { label: "30-Day Easy Returns", href: "return-policy.html" },
    { label: "Kids Size Guide", href: "size-guide.html" },
    { label: "Privacy Policy", href: "privacy-policy.html" },
    { label: "Terms of Service", href: "terms.html" }
  ];

  /* ------------------------------------------------------------
     Brand Logo SVG (identical to header)
     ------------------------------------------------------------ */
  var BRAND_LOGO_SVG =
    '<span class="brand-logo-wrap">' +
      '<svg class="brand-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="36" height="36" aria-hidden="true">' +
        '<defs>' +
          '<linearGradient id="lbFootLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
            '<stop offset="0%" stop-color="#FF8A65"/>' +
            '<stop offset="100%" stop-color="#F4511E"/>' +
          '</linearGradient>' +
          '<filter id="lbFootLogoGlow" x="-10%" y="-10%" width="120%" height="120%">' +
            '<feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#F4511E" flood-opacity="0.25"/>' +
          '</filter>' +
        '</defs>' +
        '<rect x="3" y="3" width="58" height="58" rx="18" ry="18" fill="url(#lbFootLogoGrad)" filter="url(#lbFootLogoGlow)"/>' +
        '<rect x="18" y="18" width="28" height="28" rx="9" ry="9" fill="#FFFFFF"/>' +
      '</svg>' +
    '</span>';

  var footerHTML =
    '<footer class="site-footer">' +
      /* -------- Trust Perks Bar -------- */
      '<div class="footer-perks-bar py-4 border-top border-bottom">' +
        '<div class="container">' +
          '<div class="row g-3 text-center text-md-start">' +
            '<div class="col-6 col-lg-3 d-flex align-items-center justify-content-center justify-content-lg-start gap-3">' +
              '<span class="perk-icon"><i class="bi bi-truck"></i></span>' +
              '<div><strong>Free Fast Shipping</strong><span class="d-block text-muted small">On all orders over $50</span></div>' +
            '</div>' +
            '<div class="col-6 col-lg-3 d-flex align-items-center justify-content-center justify-content-lg-start gap-3">' +
              '<span class="perk-icon"><i class="bi bi-patch-check"></i></span>' +
              '<div><strong>100% Organic Fabric</strong><span class="d-block text-muted small">Gentle on delicate skin</span></div>' +
            '</div>' +
            '<div class="col-6 col-lg-3 d-flex align-items-center justify-content-center justify-content-lg-start gap-3">' +
              '<span class="perk-icon"><i class="bi bi-arrow-repeat"></i></span>' +
              '<div><strong>30 Days Return</strong><span class="d-block text-muted small">Hassle-free exchanges</span></div>' +
            '</div>' +
            '<div class="col-6 col-lg-3 d-flex align-items-center justify-content-center justify-content-lg-start gap-3">' +
              '<span class="perk-icon"><i class="bi bi-shield-check"></i></span>' +
              '<div><strong>100% Secure Checkout</strong><span class="d-block text-muted small">256-Bit SSL protection</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* -------- Main Footer Columns -------- */
      '<div class="footer-main">' +
        '<div class="container">' +
          '<div class="row g-4">' +
            /* Brand */
            '<div class="col-lg-4 col-md-6 pe-lg-4">' +
              '<a href="index.html" class="d-inline-flex align-items-center gap-2 mb-3 text-decoration-none navbar-brand footer-brand" aria-label="LittleBloom Home">' +
                BRAND_LOGO_SVG +
                '<span class="brand-name"><span class="brand-name-dark">Little</span><span class="brand-name-coral">Bloom</span></span>' +
              '</a>' +
              '<p class="about-text text-muted mb-4">Thoughtfully designed, ultra-soft clothing for newborn to kids 8 years. Made with love, tested by real parents, and built for all everyday adventures.</p>' +
              '<div class="footer-social">' +
                SOCIALS.map(function (s) {
                  return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '"><i class="bi ' + s.icon + '"></i></a>';
                }).join("") +
              '</div>' +
            '</div>' +

            /* Quick links */
            '<div class="col-lg-2 col-md-6 col-6">' +
              '<h5 class="footer-col-title">Shop & Explore</h5>' +
              '<ul class="footer-links">' +
                QUICK_LINKS.map(function (l) {
                  return '<li><a href="' + l.href + '"><i class="bi bi-chevron-right"></i>' + l.label + '</a></li>';
                }).join("") +
              '</ul>' +
            '</div>' +

            /* Customer service */
            '<div class="col-lg-2 col-md-6 col-6">' +
              '<h5 class="footer-col-title">Customer Care</h5>' +
              '<ul class="footer-links">' +
                SERVICE_LINKS.map(function (l) {
                  return '<li><a href="' + l.href + '"><i class="bi bi-chevron-right"></i>' + l.label + '</a></li>';
                }).join("") +
              '</ul>' +
            '</div>' +

            /* Contact & Newsletter */
            '<div class="col-lg-4 col-md-6">' +
              '<h5 class="footer-col-title">Stay in Touch</h5>' +
              '<p class="small text-muted mb-2">Subscribe to get <strong>15% OFF</strong> your first order + early access to new collections.</p>' +
              '<form class="footer-newsletter mb-3" id="newsletterForm" novalidate>' +
                '<div class="input-group">' +
                  '<input type="email" class="form-control" id="nlEmail" placeholder="Enter your email address..." aria-label="Email address" required>' +
                  '<button class="btn btn-brand px-3" type="submit" aria-label="Subscribe"><i class="bi bi-send me-1"></i>Join</button>' +
                '</div>' +
                '<div class="form-text newsletter-msg small mt-1" id="newsletterMsg"></div>' +
              '</form>' +
              '<div class="contact-info-list small">' +
                '<div class="contact-line mb-1"><i class="bi bi-telephone text-brand me-2"></i><a href="' + CONTACT.phoneHref + '" class="text-muted">' + CONTACT.phone + '</a></div>' +
                '<div class="contact-line mb-1"><i class="bi bi-envelope text-brand me-2"></i><a href="' + CONTACT.emailHref + '" class="text-muted">' + CONTACT.email + '</a></div>' +
                '<div class="contact-line"><i class="bi bi-clock text-brand me-2"></i><span class="text-muted">' + CONTACT.hours + '</span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* -------- Bottom bar -------- */
      '<div class="footer-bottom py-3">' +
        '<div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">' +
          '<div class="copyright-text text-muted small">&copy; <span class="year">2026</span> LittleBloom Clothing Store. All rights reserved.</div>' +
          '<div class="payment-badges d-flex align-items-center gap-2" aria-label="Accepted payment methods">' +
            '<span class="pay-badge"><i class="bi bi-credit-card-2-front"></i> Visa</span>' +
            '<span class="pay-badge"><i class="bi bi-credit-card"></i> Mastercard</span>' +
            '<span class="pay-badge"><i class="bi bi-paypal"></i> PayPal</span>' +
            '<span class="pay-badge"><i class="bi bi-apple"></i> Apple Pay</span>' +
          '</div>' +
          '<div class="d-flex gap-3 small text-muted">' +
            '<a href="privacy-policy.html" class="text-muted">Privacy</a>' +
            '<a href="terms.html" class="text-muted">Terms</a>' +
            '<a href="cookie-policy.html" class="text-muted">Cookies</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  var host = document.getElementById("footer-container");
  if (host) {
    host.innerHTML = footerHTML;

    // Newsletter submit handling
    var nlForm = host.querySelector("#newsletterForm");
    if (nlForm) {
      nlForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var emailInput = document.getElementById("nlEmail");
        var msg = document.getElementById("newsletterMsg");
        if (!emailInput || !msg) return;
        var val = emailInput.value.trim();
        if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          msg.textContent = "Please enter a valid email address.";
          msg.className = "form-text newsletter-msg small mt-1 text-danger";
          return;
        }
        msg.textContent = "🎉 Thank you for subscribing! Your 15% discount code is BLOOM15.";
        msg.className = "form-text newsletter-msg small mt-1 text-success fw-bold";
        emailInput.value = "";
      });
    }
  }
})();
