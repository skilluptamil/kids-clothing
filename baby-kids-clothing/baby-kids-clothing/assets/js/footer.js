/* ==========================================================================
   LITTLE BLOOM — Reusable Footer
   --------------------------------------------------------------------------
   File   : assets/js/footer.js
   Usage  : Include <div id="footer-container"></div> in the page body, then
            load this script at the end of the body.
   Notes  : Edit the data below to customize links & business details.
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
    { icon: "bi-facebook", href: "#", label: "Facebook" },
    { icon: "bi-instagram", href: "#", label: "Instagram" },
    { icon: "bi-tiktok", href: "#", label: "TikTok" },
    { icon: "bi-pinterest", href: "#", label: "Pinterest" },
    { icon: "bi-youtube", href: "#", label: "YouTube" }
  ];

  var QUICK_LINKS = [
    { label: "Home", href: "index.html" },
    { label: "About Us", href: "about.html" },
    { label: "Shop All", href: "shop.html" },
    { label: "Blog", href: "blog.html" },
    { label: "Contact", href: "contact.html" }
  ];

  var SERVICE_LINKS = [
    { label: "FAQ", href: "faq.html" },
    { label: "Shipping & Delivery", href: "shipping-policy.html" },
    { label: "Returns & Exchange", href: "return-policy.html" },
    { label: "Size Guide", href: "size-guide.html" },
    { label: "Privacy Policy", href: "privacy-policy.html" },
    { label: "Terms & Conditions", href: "terms.html" }
  ];

  var footerHTML =
    '<footer class="site-footer">' +
      '<div class="footer-main">' +
        '<div class="container">' +
          '<div class="row g-4">' +
            /* -------- Brand -------- */
            '<div class="col-lg-3 col-md-6">' +
              '<div class="d-flex align-items-center gap-2 mb-3">' +
                '<span class="brand-mark"><img src="assets/images/logo/logo.svg" alt="" width="24" height="24" style="filter:brightness(0) invert(1)"></span>' +
                '<span class="font-heading fs-4 fw-bold" style="color:var(--ink)">Little<span style="color:var(--brand-dark)">Bloom</span></span>' +
              "</div>" +
              '<p class="about-text">Little styles, big smiles. Thoughtfully designed, super-soft clothing for newborn to kids 8 years — made with love and built for everyday adventures.</p>' +
              '<div class="footer-social mt-4">' +
                SOCIALS.map(function (s) {
                  return '<a href="' + s.href + '" aria-label="' + s.label + '"><i class="bi ' + s.icon + '"></i></a>';
                }).join("") +
              "</div>" +
            "</div>" +
            /* -------- Quick links -------- */
            '<div class="col-lg-3 col-md-6 col-6">' +
              "<h5 style='padding-inline-start:.5rem'>Quick Links</h5>" +
              '<ul class="footer-links">' +
                QUICK_LINKS.map(function (l) {
                  return '<li><a href="' + l.href + '"><i class="bi bi-chevron-right"></i>' + l.label + "</a></li>";
                }).join("") +
              "</ul>" +
            "</div>" +
            /* -------- Customer service -------- */
            '<div class="col-lg-3 col-md-6 col-6">' +
              "<h5>Customer Service</h5>" +
              '<ul class="footer-links">' +
                SERVICE_LINKS.map(function (l) {
                  return '<li><a href="' + l.href + '"><i class="bi bi-chevron-right"></i>' + l.label + "</a></li>";
                }).join("") +
              "</ul>" +
            "</div>" +
            /* -------- Newsletter + contact -------- */
            '<div class="col-lg-3 col-md-6">' +
              "<h5>Get In Touch</h5>" +
              '<div class="contact-line"><i class="bi bi-geo-alt"></i><span>' + CONTACT.address + "</span></div>" +
              '<div class="contact-line"><i class="bi bi-telephone"></i><a href="' + CONTACT.phoneHref + '">' + CONTACT.phone + "</a></div>" +
              '<div class="contact-line"><i class="bi bi-envelope"></i><a href="' + CONTACT.emailHref + '">' + CONTACT.email + "</a></div>" +
              '<div class="contact-line"><i class="bi bi-clock"></i><span>' + CONTACT.hours + "</span></div>" +
              '<form class="footer-newsletter mt-3" id="newsletterForm" novalidate>' +
                '<label class="form-label d-block" style="font-size:.82rem">Newsletter</label>' +
                '<div class="input-group">' +
                  '<input type="email" class="form-control" id="nlEmail" placeholder="Your email" aria-label="Email address" required>' +
                  '<button class="btn btn-brand px-3" type="submit" aria-label="Subscribe"><i class="bi bi-send"></i></button>' +
                "</div>" +
                '<div class="form-text newsletter-msg" id="newsletterMsg"></div>' +
              "</form>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
      /* -------- Bottom bar -------- */
      '<div class="footer-bottom">' +
        '<div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">' +
          '<span>&copy; <span class="year">2026</span> LittleBloom. All rights reserved.</span>' +
          '<div class="payment-icons" aria-label="Accepted payment methods">' +
            '<i class="bi bi-credit-card" title="Credit Card"></i>' +
            '<i class="bi bi-paypal" title="PayPal"></i>' +
            '<i class="bi bi-bank" title="Bank Transfer"></i>' +
            '<i class="bi bi-phone" title="UPI / Mobile Payments"></i>' +
          "</div>" +
          '<div class="d-flex gap-3">' +
            '<a href="privacy-policy.html">Privacy</a>' +
            '<a href="terms.html">Terms</a>' +
            '<a href="cookie-policy.html">Cookies</a>' +
          "</div>" +
        "</div>" +
      "</div>" +
    "</footer>";

  var host = document.getElementById("footer-container");
  if (host) host.innerHTML = footerHTML;
})();
