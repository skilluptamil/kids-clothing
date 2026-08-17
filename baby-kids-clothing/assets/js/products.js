/* ==========================================================================
   LITTLE BLOOM — Product Data & Rendering
   --------------------------------------------------------------------------
   File   : assets/js/products.js
   Notes  : Demo product catalog + card renderer + quick-view modal.
            Edit the PRODUCTS array to customize the store catalog.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     IMAGE POOL  (local JPG product photography — every image unique)
     ------------------------------------------------------------------ */
  var PLACEHOLDER = "assets/images/placeholder.svg";

  var P = "assets/images/products/";
  var POOL = [
    P + "14474507.jpg", P + "14474514.jpg",  /* Cotton Baby Romper    – romper */
    P + "14671426.jpg", P + "18746931.jpg",  /* Floral Baby Dress     – girldress */
    P + "13710211.jpg", P + "17328941.jpg",  /* Dino Print T-Shirt    – dinoshirt */
    P + "12158341.jpg", P + "13167232.jpg",  /* Kids Denim Set        – denim */
    P + "35875002.jpg", P + "35051542.jpg",  /* Girls Party Dress     – party */
    P + "34370387.jpg", P + "28097495.jpg",  /* Boys Casual Shirt     – toddlershirt */
    P + "10153594.jpg", P + "11023372.jpg",  /* Baby Winter Set       – winter */
    P + "20100110.jpg", P + "14760732.jpg",  /* Kids Summer Outfit    – summer */
    P + "35128474.jpg", P + "8926544.jpg",   /* School Uniform Shirt  – uniform */
    P + "35107586.jpg", P + "35128449.jpg",  /* School Uniform Trousers – uniform */
    P + "33489883.jpg", P + "6182710.jpg",   /* Matching Sibling Set  – siblings */
    P + "29790928.jpg", P + "19652886.jpg",  /* Newborn Gift Box      – giftbasket */
    P + "545070.jpg",    P + "29500226.jpg", /* Striped Toddler Top   – toddlershirt */
    P + "15227236.jpg", P + "9554843.jpg",   /* Cargo Shorts Set      – cargoshorts */
    P + "18820123.jpg", P + "18863554.jpg",  /* Lavender Pajama Set   – pajamas */
    P + "34752454.jpg", P + "38414487.jpg",  /* Birthday Party Dress  – party */
    P + "14474518.jpg", P + "14476216.jpg",  /* Peek-a-Boo Romper     – romper */
    P + "11258764.jpg", P + "14657994.jpg",  /* Cardigan & Cap Set    – winter */
    P + "10646537.jpg", P + "14909652.jpg",  /* School Sweater        – uniform */
    P + "14195487.jpg", P + "7009391.jpg",   /* Baby Socks Pack       – babysocks */
    P + "36046009.jpg", P + "35051541.jpg",  /* Festive Outfit Set    – party */
    P + "18033632.jpg", P + "19515504.jpg",  /* Hooded Kids Jacket    – winter */
    P + "13768126.jpg", P + "16878046.jpg",  /* Dungaree Set          – dungarees */
    P + "7863359.jpg",  P + "8925983.jpg"    /* Swim Trunks & Rashie  – swimwear */
  ];
  function img(i) { return POOL[i % POOL.length]; }

  /* ------------------------------------------------------------------
     CATALOG
     ------------------------------------------------------------------ */
  var PRODUCTS = [
    { id: 1,  name: "Cotton Baby Romper",       category: "sets",      catLabel: "Rompers",       age: "newborn", ageLabel: "Newborn",     gender: "unisex", price: 24,  discount: 15, rating: 4.8, reviews: 214, badge: "new",       collection: "new-arrivals", sizes: ["0-3m","3-6m","6-9m","9-12m"], colors: [{n:"Peach",h:"#ffd8c4"},{n:"Mint",h:"#d7f0e4"},{n:"Lavender",h:"#e6e0f8"}], desc: "Ultra-soft organic cotton romper with easy snap buttons and a playful cloud print. Gentle on delicate newborn skin, day and night." },
    { id: 2,  name: "Floral Baby Dress",         category: "dresses",   catLabel: "Dresses",       age: "baby",      ageLabel: "Baby",        gender: "girls",   price: 32,  discount: 0,  rating: 4.9, reviews: 168, badge: "bestseller", collection: "party",       sizes: ["3-6m","6-9m","9-12m","12-18m"], colors: [{n:"Pink",h:"#f2a6be"},{n:"Peach",h:"#ffd8c4"}], desc: "A sweet floral dress in breathable cotton with a soft tulle skirt and bow back detail. Perfect for birthdays and garden parties." },
    { id: 3,  name: "Dino Print T-Shirt",        category: "tshirts",   catLabel: "T-Shirts",      age: "toddler",   ageLabel: "Toddler",     gender: "boys",    price: 14,  discount: 10, rating: 4.6, reviews: 302, badge: "hot",        collection: "new-arrivals", sizes: ["12-18m","18-24m","2Y","3Y"], colors: [{n:"Blue",h:"#8fc3e8"},{n:"Mint",h:"#d7f0e4"}], desc: "Roaring fun in a pre-shrunk cotton tee with a friendly dinosaur print. Machine washable and built for everyday play." },
    { id: 4,  name: "Kids Denim Set",            category: "sets",      catLabel: "Outfit Sets",   age: "kids3-5",   ageLabel: "Kids 3-5",    gender: "unisex", price: 46,  discount: 20, rating: 4.7, reviews: 129, badge: "sale",       collection: "bestsellers",  sizes: ["3Y","4Y","5Y"], colors: [{n:"Blue",h:"#8fc3e8"}], desc: "Soft-wash denim jacket and jeans combo with an elastic waist for growing kids. Stylish, durable and comfy for all-day wear." },
    { id: 5,  name: "Girls Party Dress",         category: "dresses",   catLabel: "Party Wear",    age: "kids3-5",   ageLabel: "Kids 3-5",    gender: "girls",   price: 42,  discount: 25, rating: 4.9, reviews: 201, badge: "sale",       collection: "party",        sizes: ["3Y","4Y","5Y","6Y"], colors: [{n:"Lavender",h:"#e6e0f8"},{n:"Pink",h:"#f2a6be"}], desc: "A twirl-worthy party dress with layered tulle, satin sash and hidden side zip. Lined for comfort — made for celebrations." },
    { id: 6,  name: "Boys Casual Shirt",         category: "shirts",    catLabel: "Shirts",        age: "toddler",   ageLabel: "Toddler",     gender: "boys",    price: 22,  discount: 0,  rating: 4.5, reviews: 96,  badge: "",         collection: "new-arrivals", sizes: ["18-24m","2Y","3Y","4Y"], colors: [{n:"Blue",h:"#8fc3e8"},{n:"White",h:"#f8f4ef"}], desc: "Crisp cotton button-down with rolled sleeves and a playful stripe pattern. Dresses up jeans or chinos in seconds." },
    { id: 7,  name: "Baby Winter Set",           category: "sets",      catLabel: "Winter Sets",   age: "newborn",   ageLabel: "Newborn",     gender: "unisex", price: 54,  discount: 15, rating: 4.8, reviews: 87,  badge: "limited",    collection: "winter",       sizes: ["0-3m","3-6m","6-9m"], colors: [{n:"Mint",h:"#d7f0e4"},{n:"Beige",h:"#eee3d1"}], desc: "Cozy fleece-lined romper with matching cap and booties. Fleece inner, cloud-soft outer, and easy front zip." },
    { id: 8,  name: "Kids Summer Outfit",        category: "sets",      catLabel: "Summer Sets",   age: "kids6-8",   ageLabel: "Kids 6-8",    gender: "unisex", price: 28,  discount: 10, rating: 4.6, reviews: 143, badge: "new",       collection: "summer",       sizes: ["6Y","7Y","8Y"], colors: [{n:"Peach",h:"#ffd8c4"},{n:"Yellow",h:"#f3d389"}], desc: "Lightweight short-sleeve tee and breathable shorts set in airy jersey. Sun-safe, sweat-wicking and ready for adventures." },
    { id: 9,  name: "School Uniform Shirt",      category: "school",    catLabel: "School Wear",   age: "kids3-5",   ageLabel: "Kids 3-5",    gender: "unisex", price: 18,  discount: 0,  rating: 4.7, reviews: 356, badge: "bestseller", collection: "school",       sizes: ["3Y","4Y","5Y","6Y","7Y","8Y"], colors: [{n:"White",h:"#f8f4ef"},{n:"Blue",h:"#8fc3e8"}], desc: "Sturdy, easy-iron cotton school shirt with double-stitched seams and reinforced buttons. Tunic lengths available." },
    { id: 10, name: "School Uniform Trousers",   category: "school",    catLabel: "School Wear",   age: "kids6-8",   ageLabel: "Kids 6-8",    gender: "boys",    price: 20,  discount: 0,  rating: 4.6, reviews: 289, badge: "",         collection: "school",       sizes: ["5Y","6Y","7Y","8Y","9Y","10Y"], colors: [{n:"Navy",h:"#4a5d75"},{n:"Grey",h:"#b9b2ab"}], desc: "Hard-wearing, crease-resistant school trousers with adjustable waistband and knee reinforcement." },
    { id: 11, name: "Matching Sibling Set",      category: "sets",      catLabel: "Match Sets",    age: "toddler",   ageLabel: "Toddler",     gender: "unisex", price: 68,  discount: 12, rating: 4.9, reviews: 74,  badge: "hot",        collection: "matching",     sizes: ["12-18m","18-24m","2Y","3Y","4Y"], colors: [{n:"Blue",h:"#8fc3e8"},{n:"Pink",h:"#f2a6be"}], desc: "Coordinating tops and bottoms for brother & sister. One listing, two adorable outfits — perfect for family photos." },
    { id: 12, name: "Newborn Gift Box",          category: "gifts",     catLabel: "Gift Boxes",    age: "newborn",   ageLabel: "Newborn",     gender: "unisex", price: 79,  discount: 18, rating: 5.0, reviews: 158, badge: "bestseller", collection: "gifts",       sizes: ["0-3m"], colors: [{n:"Peach",h:"#ffd8c4"},{n:"Mint",h:"#d7f0e4"}], desc: "The complete baby-shower gift: 3 rompers, booties, mittens, swaddle and a keepsake box — beautifully wrapped and ready to gift." },
    { id: 13, name: "Striped Toddler Top",       category: "tops",      catLabel: "Tops",          age: "toddler",   ageLabel: "Toddler",     gender: "unisex", price: 16,  discount: 0,  rating: 4.4, reviews: 112, badge: "new",       collection: "new-arrivals", sizes: ["12-18m","18-24m","2Y","3Y"], colors: [{n:"White",h:"#f8f4ef"},{n:"Blue",h:"#8fc3e8"}], desc: "Classic Breton-stripe tee with contrast cuffs. Soft combed cotton that keeps its shape wash after wash." },
    { id: 14, name: "Cargo Shorts Set",          category: "bottoms",   catLabel: "Shorts",        age: "kids3-5",   ageLabel: "Kids 3-5",    gender: "boys",    price: 24,  discount: 5,  rating: 4.5, reviews: 67,  badge: "",         collection: "summer",       sizes: ["3Y","4Y","5Y"], colors: [{n:"Mint",h:"#d7f0e4"},{n:"Peach",h:"#ffd8c4"}], desc: "Play-friendly cargo shorts with real pockets, an adjustable waist and reinforced knees for climbing, digging and exploring." },
    { id: 15, name: "Lavender Pajama Set",       category: "sleepwear", catLabel: "Sleepwear",     age: "kids3-5",   ageLabel: "Kids 3-5",    gender: "girls",   price: 26,  discount: 15, rating: 4.8, reviews: 201, badge: "sale",       collection: "sleepwear",    sizes: ["3Y","4Y","5Y","6Y"], colors: [{n:"Lavender",h:"#e6e0f8"},{n:"Pink",h:"#f2a6be"}], desc: "Buttery-soft bamboo pajama set with a starry print and snug footies. Naturally breathable for sound sleep." },
    { id: 16, name: "Birthday Party Dress",      category: "dresses",   catLabel: "Party Wear",    age: "baby",      ageLabel: "Baby",        gender: "girls",   price: 36,  discount: 20, rating: 4.9, reviews: 143, badge: "hot",        collection: "party",        sizes: ["6-9m","9-12m","12-18m","18-24m"], colors: [{n:"Pink",h:"#f2a6be"},{n:"Peach",h:"#ffd8c4"}], desc: "First-birthday favorite: smocked bodice, flutter sleeves and a full satin-soft skirt. Match with our headbands and socks." },
    { id: 17, name: "Peek-a-Boo Romper",         category: "sets",      catLabel: "Rompers",       age: "baby",      ageLabel: "Baby",        gender: "unisex", price: 20,  discount: 10, rating: 4.6, reviews: 88,  badge: "new",       collection: "new-arrivals", sizes: ["3-6m","6-9m","9-12m"], colors: [{n:"Lavender",h:"#e6e0f8"},{n:"Yellow",h:"#f3d389"}], desc: "Snap-crotch romper with a cute peek-a-boo animal pocket. Silky-soft bamboo blend, hypoallergenic and gentle on skin." },
    { id: 18, name: "Cardigan & Cap Set",        category: "sets",      catLabel: "Winter Sets",   age: "newborn",   ageLabel: "Newborn",     gender: "unisex", price: 34,  discount: 0,  rating: 4.7, reviews: 54,  badge: "limited",    collection: "winter",       sizes: ["0-3m","3-6m","6-9m"], colors: [{n:"Beige",h:"#eee3d1"},{n:"Mint",h:"#d7f0e4"}], desc: "Hand-knit-look cardigan with matching beanie and booties. Warmth and cuteness for chilly mornings." },
    { id: 19, name: "School Sweater",            category: "school",    catLabel: "School Wear",   age: "kids6-8",   ageLabel: "Kids 6-8",    gender: "unisex", price: 24,  discount: 0,  rating: 4.5, reviews: 178, badge: "bestseller", collection: "school",       sizes: ["5Y","6Y","7Y","8Y","9Y"], colors: [{n:"Navy",h:"#4a5d75"},{n:"Grey",h:"#b9b2ab"}], desc: "V-neck school sweater in acrylic-nylon blend, machine washable with reinforced shoulder seams. Bulk pricing available." },
    { id: 20, name: "Baby Socks Pack (5)",       category: "accessories", catLabel: "Accessories",  age: "baby",      ageLabel: "Baby",        gender: "unisex", price: 12,  discount: 25, rating: 4.8, reviews: 421, badge: "sale",       collection: "accessories",  sizes: ["0-6m","6-12m"], colors: [{n:"Mixed",h:"#c9b8e0"}], desc: "Five pairs of non-slip, stay-on baby socks with soft ribbed cuffs. Cotton-rich and machine washable." },
    { id: 21, name: "Festive Outfit Set",        category: "party",     catLabel: "Party Wear",    age: "kids3-5",   ageLabel: "Kids 3-5",    gender: "unisex", price: 58,  discount: 15, rating: 4.9, reviews: 132, badge: "hot",        collection: "festive",      sizes: ["3Y","4Y","5Y"], colors: [{n:"Peach",h:"#ffd8c4"},{n:"Mint",h:"#d7f0e4"}], desc: "Celebration-ready kurta-style top with matching bottoms and a shimmer dupatta. Comfort-first festive dressing." },
    { id: 22, name: "Hooded Kids Jacket",        category: "tops",      catLabel: "Jackets",       age: "kids6-8",   ageLabel: "Kids 6-8",    gender: "unisex", price: 44,  discount: 20, rating: 4.7, reviews: 93,  badge: "sale",       collection: "winter",       sizes: ["6Y","7Y","8Y","9Y","10Y"], colors: [{n:"Blue",h:"#8fc3e8"},{n:"Peach",h:"#ffd8c4"}], desc: "Water-repellent padded jacket with a fuzzy hood, zip front and cozy pockets. Packable for travel." },
    { id: 23, name: "Dungaree Set",              category: "sets",      catLabel: "Outfit Sets",   age: "toddler",   ageLabel: "Toddler",     gender: "unisex", price: 30,  discount: 0,  rating: 4.6, reviews: 119, badge: "new",       collection: "new-arrivals", sizes: ["12-18m","18-24m","2Y","3Y"], colors: [{n:"Blue",h:"#8fc3e8"},{n:"Mint",h:"#d7f0e4"}], desc: "Classic dungarees with chest pocket and adjustable straps, paired with a soft tee. The ultimate easy-care outfit." },
    { id: 24, name: "Swim Trunks & Rashie Set",  category: "sets",      catLabel: "Swimwear",      age: "kids3-5",   ageLabel: "Kids 3-5",    gender: "boys",    price: 27,  discount: 5,  rating: 4.5, reviews: 76,  badge: "",         collection: "summer",       sizes: ["3Y","4Y","5Y","6Y"], colors: [{n:"Blue",h:"#8fc3e8"},{n:"Yellow",h:"#f3d389"}], desc: "UPF 50+ rash guard and quick-dry swim trunks. Sand-resistant, chlorine-friendly and fun to wear." }
  ];

  /* ------------------------------------------------------------------
     PRODUCT IMAGES  (each product gets two unique local JPGs)
     ------------------------------------------------------------------ */
  PRODUCTS.forEach(function (p, i) {
    p.image = img(i * 2);
    p.image2 = img(i * 2 + 1);
  });

  /* ------------------------------------------------------------------
     HELPERS
     ------------------------------------------------------------------ */
  function money(n) { return "$" + n.toFixed(2); }

  function salePrice(p) {
    return p.discount ? +(p.price * (1 - p.discount / 100)).toFixed(2) : p.price;
  }

  function starsHTML(r) {
    var full = Math.round(r);
    var out = "";
    for (var i = 1; i <= 5; i++) {
      out += i <= full
        ? '<i class="bi bi-star-fill"></i>'
        : '<i class="bi bi-star"></i>';
    }
    return out;
  }

  function badgeHTML(b) {
    if (!b) return "";
    var cls = b === "new" ? "badge-new" : b === "sale" ? "badge-sale" : b === "limited" ? "badge-limited" : "badge-hot";
    var label = b === "new" ? "New" : b === "sale" ? "Sale" : b === "limited" ? "Limited" : "Bestseller";
    return '<span class="pc-badge ' + cls + '">' + label + "</span>";
  }

  function colorDots(p) {
    var html = "";
    var shown = 0;
    for (var i = 0; i < p.colors.length; i++) {
      if (shown >= 3) break;
      html += '<span class="color-dot" style="background:' + p.colors[i].h + '" title="' + p.colors[i].n + '" aria-hidden="true"></span>';
      shown++;
    }
    return html;
  }

  function inWishlist(id) {
    try {
      var w = JSON.parse(localStorage.getItem("lb-wishlist") || "[]");
      return w.indexOf(String(id)) > -1;
    } catch (e) { return false; }
  }

  /* ------------------------------------------------------------------
     RENDER: single product card  →  HTML string
     ------------------------------------------------------------------ */
  function renderCard(p) {
    var sp = salePrice(p);
    var discountHTML = p.discount
      ? '<span class="pc-price"><span class="price">' + money(sp) + '</span><span class="old-price">' + money(p.price) + '</span><span class="discount-badge">-' + p.discount + '%</span></span>'
      : '<span class="pc-price"><span class="price">' + money(p.price) + "</span></span>";

    var wishCls = inWishlist(p.id) ? " is-wish active" : "";
    var wishIcon = inWishlist(p.id) ? "bi-heart-fill" : "bi-heart";

    return (
      '<article class="product-card" data-id="' + p.id + '">' +
        '<div class="pc-media">' +
          badgeHTML(p.badge) +
          '<div class="pc-actions">' +
            '<button type="button" class="pc-action js-wish' + wishCls + '" aria-label="Add to wishlist" data-id="' + p.id + '"><i class="bi ' + wishIcon + '"></i></button>' +
          "</div>" +
          '<a href="product-details.html?id=' + p.id + '">' +
            '<img src="' + p.image2 + '" alt="' + p.name + '" class="pc-img-1" loading="lazy" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'">' +
          "</a>" +
        "</div>" +
        '<div class="pc-body">' +
          '<span class="pc-cat">' + p.catLabel + "</span>" +
          '<h3 class="pc-name"><a href="product-details.html?id=' + p.id + '">' + p.name + "</a></h3>" +
          '<div class="d-flex align-items-center"><span class="stars">' + starsHTML(p.rating) + "</span><span class=\"review-count\">(" + p.reviews + ")</span></div>" +
          discountHTML +
          '<div class="d-flex align-items-center gap-1 mb-1">' + colorDots(p) + "</div>" +
          '<div class="pc-foot">' +
            '<button type="button" class="btn btn-brand js-addtocart" data-id="' + p.id + '"><i class="bi bi-bag-plus me-1"></i>Add to Cart</button>' +
            '<button type="button" class="btn-quickview js-quickview" data-id="' + p.id + '" aria-label="Quick view"><i class="bi bi-eye"></i></button>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  /* ------------------------------------------------------------------
     RENDER: grid from a list
     ------------------------------------------------------------------ */
  function renderGrid(container, list) {
    if (!container) return;
    if (!list.length) {
      container.innerHTML =
        '<div class="empty-state col-12">' +
          '<div class="empty-emoji">🧸</div>' +
          '<h3>No products found</h3>' +
          '<p>We could not find anything matching your selection. Try adjusting your filters.</p>' +
        "</div>";
      return;
    }
    container.innerHTML = list.map(renderCard).join("");
  }

  /* ------------------------------------------------------------------
     PRODUCT SCROLLER (best sellers carousel-like scroller)
     ------------------------------------------------------------------ */
  function initScrollers() {
    document.querySelectorAll("[data-scroller]").forEach(function (wrap) {
      var track = wrap.querySelector(".product-scroller-track");
      if (!track) return;
      var prev = wrap.querySelector("[data-scroll-prev]");
      var next = wrap.querySelector("[data-scroll-next]");
      if (!prev || !next) return;
      var card = track.querySelector(".product-card");
      var step = (card ? card.offsetWidth + 24 : 280);
      prev.addEventListener("click", function () { track.scrollBy({ left: -step, behavior: "smooth" }); });
      next.addEventListener("click", function () { track.scrollBy({ left: step, behavior: "smooth" }); });
    });
  }

  /* ------------------------------------------------------------------
     QUICK VIEW MODAL
     ------------------------------------------------------------------ */
  function injectModal() {
    if (document.getElementById("quickViewModal")) return;
    var div = document.createElement("div");
    div.innerHTML =
      '<div class="modal fade" id="quickViewModal" tabindex="-1" aria-hidden="true" aria-labelledby="quickViewModalLabel">' +
        '<div class="modal-dialog modal-dialog-centered modal-xl">' +
          '<div class="modal-content">' +
            '<div class="modal-header"><h5 class="modal-title font-heading" id="quickViewModalLabel">Quick View</h5>' +
            '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
            '<div class="modal-body" id="quickViewBody"></div>' +
          "</div>" +
        "</div>" +
      "</div>";
    document.body.appendChild(div.firstElementChild);
  }

  function openQuickView(id) {
    injectModal();
    var p = byId(id);
    if (!p) return;
    var body = document.getElementById("quickViewBody");
    var sp = salePrice(p);
    var sizes = p.sizes.map(function (s, i) {
      return '<button type="button" class="size-chip' + (i === 0 ? " active" : "") + '" data-size="' + s + '">' + s + "</button>";
    }).join("");
    var colors = p.colors.map(function (c, i) {
      return '<button type="button" class="color-chip' + (i === 0 ? " active" : "") + '" style="--cc:' + c.h + '" data-color="' + c.n + '" aria-label="' + c.n + '" title="' + c.n + '"></button>';
    }).join("");
    var img = p.image;
    var img2 = p.image2;

    body.innerHTML =
      '<div class="quickview-grid">' +
        '<div class="qv-media">' +
          '<div class="qv-img" id="qvMain"><img src="' + img + '" alt="' + p.name + '" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'"></div>' +
          '<div class="qv-thumbs">' +
            '<img src="' + img + '" alt="view 1" class="active" onclick="Kids.qvSwap(this)" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'">' +
            '<img src="' + img2 + '" alt="view 2" onclick="Kids.qvSwap(this)" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'">' +
          "</div>" +
        "</div>" +
        '<div class="qv-info">' +
          '<span class="pc-cat">' + p.catLabel + "</span>" +
          '<h2 class="font-heading mt-1" style="font-size:1.5rem">' + p.name + "</h2>" +
          '<div class="mb-2"><span class="stars">' + starsHTML(p.rating) + '</span><span class="review-count text-muted"> ' + p.reviews + " reviews</span></div>" +
          '<div class="pc-price mb-3"><span class="price font-heading" style="color:var(--brand-dark);font-size:1.5rem;font-weight:700">' + money(sp) + "</span>" +
            (p.discount ? '<span class="old-price text-muted" style="text-decoration:line-through">' + money(p.price) + '</span><span class="discount-badge">-' + p.discount + "% off</span>" : "") + "</div>" +
          '<p class="text-muted">' + p.desc + "</p>" +
          '<div class="mb-3"><label class="form-label">Size</label><div class="size-chip-wrap">' + sizes + "</div></div>" +
          '<div class="mb-4"><label class="form-label">Color</label><div class="d-flex gap-2">' + colors + "</div></div>" +
          '<div class="d-flex flex-wrap gap-2 align-items-center">' +
            '<div class="qty-control me-1"><button type="button" class="js-qty-minus" aria-label="Decrease quantity"><i class="bi bi-dash"></i></button><span class="qty-val">1</span><button type="button" class="js-qty-plus" aria-label="Increase quantity"><i class="bi bi-plus"></i></button></div>' +
            '<button type="button" class="btn btn-brand" data-qv-add id="qvAdd"><i class="bi bi-bag-plus me-1"></i>Add to Cart</button>' +
            '<button type="button" class="btn btn-outline-brand" data-qv-buy>Buy Now</button>' +
          "</div>" +
          '<div class="d-flex gap-3 mt-4 pt-3 border-top">' +
            '<a href="product-details.html?id=' + p.id + '" class="arrow-link">View Full Details <i class="bi bi-arrow-right"></i></a>' +
          "</div>" +
        "</div>" +
      "</div>";

    body.querySelector("#qvAdd").setAttribute("data-id", p.id);
    body.querySelector("[data-qv-buy]").setAttribute("data-id", p.id);
    body.querySelector(".qty-control").setAttribute("data-id", p.id);

    var modal = new bootstrap.Modal(document.getElementById("quickViewModal"));
    modal.show();
  }

  /* ------------------------------------------------------------------
     API
     ------------------------------------------------------------------ */
  function byId(id) {
    var needle = String(id);
    for (var i = 0; i < PRODUCTS.length; i++) if (String(PRODUCTS[i].id) === needle) return PRODUCTS[i];
    return null;
  }

  function search(q) {
    q = (q || "").trim().toLowerCase();
    if (!q) return PRODUCTS.slice();
    return PRODUCTS.filter(function (p) {
      return (p.name + " " + p.catLabel + " " + p.desc).toLowerCase().indexOf(q) > -1;
    });
  }

  var Kids = {
    PRODUCTS: PRODUCTS,
    money: money,
    salePrice: salePrice,
    renderCard: renderCard,
    renderGrid: renderGrid,
    byId: byId,
    search: search,
    initScrollers: initScrollers,
    openQuickView: openQuickView,
    qvSwap: function (el) {
      var main = document.getElementById("qvMain").querySelector("img");
      main.src = el.src;
      document.querySelectorAll("#qvMain + .qv-thumbs img").forEach(function (t) { t.classList.remove("active"); });
      el.classList.add("active");
    },
    starsHTML: starsHTML
  };

  window.Kids = Kids;
})();
