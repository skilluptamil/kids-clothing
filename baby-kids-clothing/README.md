# LittleBloom — Baby & Kids Clothing Store (HTML Template)

A complete, marketplace-ready **Baby & Kids Clothing Store** HTML template built with **Bootstrap 5.3**, **Vanilla JavaScript** and a soft, pastel **neomorphic** design system. Fully responsive, with dark mode, RTL support and a working demo cart / wishlist backed by `localStorage`.

---

## ✨ Highlights

- **29 hand-crafted pages** — home, shop, product, cart, checkout, blog, company, account and policy pages.
- **Neomorphic pastel UI** — soft shadows, rounded cards, playful Baloo 2 + Nunito typography.
- **Light & Dark modes** — persisted via `localStorage` (`lb-theme`), applied before paint to avoid flashes.
- **Full RTL support** — persisted (`lb-rtl`), swaps the Bootstrap RTL build and mirrors the layout.
- **Working demo cart & wishlist** — add/remove/qty, coupons, shipping, tax, order summary, all in `localStorage`.
- **Smart product grid** — 24 demo products with filters, sorting, search and pagination.
- **Quick-view modal** and a full **product details** page with gallery, size/colour chips, tabs and related products.
- **Reusable navbar & footer** — injected by JS, so a change in one file updates every page.

---

## 🗂️ Pages

| Area | Files |
| --- | --- |
| Home | `index.html` (Home 1), `home-2.html` (Home 2) |
| Shop | `shop.html`, `sale.html`, `search.html`, `product-details.html`, `size-guide.html`, `gifting.html` |
| Cart & Orders | `cart.html`, `checkout.html`, `wishlist.html`, `order-success.html` |
| Blog | `blog.html`, `blog-details.html` |
| Company | `about.html`, `contact.html`, `faq.html` |
| Account | `login.html`, `register.html`, `forgot-password.html` |
| Utility | `pricing.html`, `coming-soon.html`, `maintenance.html`, `404.html` |
| Policies | `privacy-policy.html`, `terms.html`, `shipping-policy.html`, `return-policy.html`, `cookie-policy.html` |

---

## 📁 Structure

```
baby-kids-clothing/
├── *.html                    # 29 pages (open index.html to start)
└── assets/
    ├── css/
    │   ├── style.css         # base neomorphic design system
    │   ├── dark-mode.css     # [data-bs-theme="dark"] overrides
    │   ├── rtl.css           # [dir="rtl"] overrides
    │   └── responsive.css    # mobile / tablet breakpoints
    ├── js/
    │   ├── navbar.js         # injected header, mega menu, search overlay
    │   ├── footer.js         # injected footer, links, newsletter
    │   ├── products.js       # 24-product catalog + card/quick-view renderers
    │   ├── theme.js          # light/dark toggle (lb-theme)
    │   ├── rtl.js            # RTL toggle (lb-rtl)
    │   ├── cart.js           # Cart API + badges + summary + toasts
    │   ├── wishlist.js       # Wishlist API + badges + grid
    │   ├── filters.js        # shop/sale/search filter engine
    │   ├── validation.js     # form validation + password toggles
    │   └── main.js           # preloader, reveal, counters, PDP, checkout, order-success, blog filter
    └── images/
        ├── placeholder.svg   # image fallback
        └── logo/             # logo.svg + favicon.svg (inline SVGs)
```

**Load order (keep it!)**: `bootstrap.bundle.min.js` → `navbar.js` → `footer.js` → `products.js` → `theme.js` → `rtl.js` → `cart.js` → `wishlist.js` → (`filters.js` on shop/sale/search only) → `validation.js` → `main.js`.

---

## 🛒 Demo Store Logic

- **Products**: edit the `PRODUCTS` array in `assets/js/products.js` (name, price, discount, sizes, colours, category, collection…).
- **Images**: the `IMG(id)` helper serves Unsplash CDN photos; swap in your own photography, or leave the `onerror` fallback to `assets/images/placeholder.svg`.
- **Coupons**: `BLOOM10` (10%) and `WELCOME15` (15%) in `assets/js/cart.js`.
- **Shipping**: standard $4.99 (free over $50), express $12.99, 8% estimated tax.
- **Filters**: add/remove filter options in `assets/js/filters.js` and mirror the matching checkboxes in `shop.html`, `sale.html` and `search.html`.
- **localStorage keys**: `lb-cart`, `lb-wishlist`, `lb-theme`, `lb-rtl`, `lb-ship`, `lb-coupon`, `lb-order`, `lb-user`.

---

## 🚀 Quick Start

1. Open `index.html` directly in a browser (no build step needed).
2. Or serve locally for best results, e.g. `npx serve` / `python -m http.server` from the `baby-kids-clothing/` folder.

---

## 🎨 Customization

- **Colours & typography**: CSS variables at the top of `assets/css/style.css` (`--brand`, `--surface-1`, `--font-heading`, etc.).
- **Navbar links**: `assets/js/navbar.js` (`NAV` array).
- **Footer links**: `assets/js/footer.js`.
- **Page meta**: each page's `<head>`.

---

## 📝 Notes

- Demo template only — all forms are front-end, **no data is sent anywhere** and no real payments are processed.
- Product imagery is placeholder photography from Unsplash for demonstration; replace before production use.
- `coming-soon.html` and `maintenance.html` are standalone launch screens (no navbar/footer).
