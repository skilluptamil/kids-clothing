/* ==========================================================================
   LITTLE BLOOM — Product Data & Rendering
   --------------------------------------------------------------------------
   File   : assets/js/products.js
   Notes  : Demo product catalog + card renderer + quick-view modal.
            Organized by Age Groups: Newborn (0-3m), 0-2 Years, 3-5 Years,
            6-9 Years, and 10+ Years.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     IMAGE POOL (local JPG product photography — 48 unique images)
     ------------------------------------------------------------------ */
  var PLACEHOLDER = "assets/images/placeholder.svg";
  var P = "assets/images/products/";
  var POOL = [
    P + "14474507.jpg", P + "14474514.jpg",  /* 0, 1 */
    P + "14671426.jpg", P + "18746931.jpg",  /* 2, 3 */
    P + "13710211.jpg", P + "17328941.jpg",  /* 4, 5 */
    P + "12158341.jpg", P + "13167232.jpg",  /* 6, 7 */
    P + "35875002.jpg", P + "35051542.jpg",  /* 8, 9 */
    P + "34370387.jpg", P + "28097495.jpg",  /* 10, 11 */
    P + "10153594.jpg", P + "11023372.jpg",  /* 12, 13 */
    P + "20100110.jpg", P + "14760732.jpg",  /* 14, 15 */
    P + "35128474.jpg", P + "8926544.jpg",   /* 16, 17 */
    P + "35107586.jpg", P + "35128449.jpg",  /* 18, 19 */
    P + "33489883.jpg", P + "6182710.jpg",   /* 20, 21 */
    P + "29790928.jpg", P + "19652886.jpg",  /* 22, 23 */
    P + "545070.jpg",   P + "29500226.jpg",  /* 24, 25 */
    P + "15227236.jpg", P + "9554843.jpg",   /* 26, 27 */
    P + "18820123.jpg", P + "18863554.jpg",  /* 28, 29 */
    P + "34752454.jpg", P + "38414487.jpg",  /* 30, 31 */
    P + "14474518.jpg", P + "14476216.jpg",  /* 32, 33 */
    P + "11258764.jpg", P + "14657994.jpg",  /* 34, 35 */
    P + "10646537.jpg", P + "14909652.jpg",  /* 36, 37 */
    P + "14195487.jpg", P + "7009391.jpg",   /* 38, 39 */
    P + "36046009.jpg", P + "35051541.jpg",  /* 40, 41 */
    P + "18033632.jpg", P + "19515504.jpg",  /* 42, 43 */
    P + "13768126.jpg", P + "16878046.jpg",  /* 44, 45 */
    P + "7863359.jpg",  P + "8925983.jpg"    /* 46, 47 */
  ];
  function img(i) { return POOL[i % POOL.length]; }

  /* ------------------------------------------------------------------
     AGE GROUPS DEFINITION
     ------------------------------------------------------------------ */
  var AGE_GROUPS = [
    { id: "newborn", label: "Newborn", range: "0–3 Months", icon: "👶", color: "#ffd8c4", desc: "Hospital bags, swaddles & first rompers" },
    { id: "0-2y",    label: "0–2 Years", range: "3–24 Months", icon: "🍼", color: "#d7eaf8", desc: "Crawling sets, onesies & soft basics" },
    { id: "3-5y",    label: "3–5 Years", range: "Preschool (3–5Y)", icon: "🎈", color: "#fde3ec", desc: "Playproof sets, twirl dresses & denim" },
    { id: "6-9y",    label: "6–9 Years", range: "Kids (6–9Y)", icon: "🎒", color: "#e2f5eb", desc: "School wear, sporty jackets & tees" },
    { id: "10plus",  label: "10+ Years", range: "Pre-Teens (10–16Y)", icon: "🌟", color: "#ece8fb", desc: "Streetwear hoodies, trendy denim & dresses" }
  ];

  /* ------------------------------------------------------------------
     CATALOG (Complete, rich catalog with all 5 age categories)
     ------------------------------------------------------------------ */
  var PRODUCTS = [
    /* === 1. NEWBORN (0–3 MONTHS) === */
    {
      id: 1,
      name: "Cotton Baby Romper",
      category: "sets",
      catLabel: "Rompers",
      age: "newborn",
      ageLabel: "Newborn (0–3m)",
      gender: "unisex",
      price: 24,
      discount: 15,
      rating: 4.8,
      reviews: 214,
      badge: "new",
      collection: "new-arrivals",
      sizes: ["0-1m", "0-3m"],
      colors: [{n:"Peach",h:"#ffd8c4"},{n:"Mint",h:"#d7f0e4"},{n:"Lavender",h:"#e6e0f8"}],
      desc: "Ultra-soft organic cotton romper with easy snap buttons and a playful cloud print. Gentle on delicate newborn skin, day and night."
    },
    {
      id: 7,
      name: "Baby Winter Romper Set",
      category: "sets",
      catLabel: "Winter Sets",
      age: "newborn",
      ageLabel: "Newborn (0–3m)",
      gender: "unisex",
      price: 54,
      discount: 15,
      rating: 4.8,
      reviews: 87,
      badge: "limited",
      collection: "winter",
      sizes: ["0-1m", "0-3m"],
      colors: [{n:"Mint",h:"#d7f0e4"},{n:"Beige",h:"#eee3d1"}],
      desc: "Cozy fleece-lined romper with matching cap and booties. Fleece inner, cloud-soft outer, and easy front zip for hospital outings."
    },
    {
      id: 12,
      name: "Newborn Welcome Gift Box",
      category: "gifts",
      catLabel: "Gift Boxes",
      age: "newborn",
      ageLabel: "Newborn (0–3m)",
      gender: "unisex",
      price: 79,
      discount: 18,
      rating: 5.0,
      reviews: 158,
      badge: "bestseller",
      collection: "gifts",
      sizes: ["0-3m"],
      colors: [{n:"Peach",h:"#ffd8c4"},{n:"Mint",h:"#d7f0e4"}],
      desc: "The complete baby-shower gift: 3 rompers, booties, mittens, swaddle and a keepsake gift box — beautifully wrapped and ready to gift."
    },
    {
      id: 18,
      name: "Cardigan & Cap Knit Set",
      category: "sets",
      catLabel: "Winter Sets",
      age: "newborn",
      ageLabel: "Newborn (0–3m)",
      gender: "unisex",
      price: 34,
      discount: 0,
      rating: 4.7,
      reviews: 54,
      badge: "limited",
      collection: "winter",
      sizes: ["0-1m", "0-3m"],
      colors: [{n:"Beige",h:"#eee3d1"},{n:"Mint",h:"#d7f0e4"}],
      desc: "Hand-knit-look cardigan with matching beanie and booties. Warmth and cuteness crafted with hypoallergenic pure combed cotton."
    },
    {
      id: 25,
      name: "Organic Swaddle Romper Set",
      category: "sleepwear",
      catLabel: "Sleepwear",
      age: "newborn",
      ageLabel: "Newborn (0–3m)",
      gender: "unisex",
      price: 29,
      discount: 10,
      rating: 4.9,
      reviews: 118,
      badge: "new",
      collection: "new-arrivals",
      sizes: ["0-1m", "0-3m"],
      colors: [{n:"White",h:"#f8f4ef"},{n:"Lavender",h:"#e6e0f8"}],
      desc: "Two-way zip sleepsuit with mitten cuffs and coordinating stretchy swaddle blanket. Designed for peaceful, cozy newborn sleep."
    },
    {
      id: 30,
      name: "Kimono Newborn Bodysuit (3-Pack)",
      category: "tops",
      catLabel: "Bodysuits",
      age: "newborn",
      ageLabel: "Newborn (0–3m)",
      gender: "unisex",
      price: 26,
      discount: 12,
      rating: 4.8,
      reviews: 164,
      badge: "bestseller",
      collection: "bestsellers",
      sizes: ["0-1m", "0-3m"],
      colors: [{n:"Peach",h:"#ffd8c4"},{n:"Mint",h:"#d7f0e4"},{n:"White",h:"#f8f4ef"}],
      desc: "Wrap-over kimono style bodysuits with side snaps so you never have to pull clothes over a fragile newborn's head."
    },
    {
      id: 35,
      name: "Newborn Fleece Snuggle Suit",
      category: "sets",
      catLabel: "Outerwear",
      age: "newborn",
      ageLabel: "Newborn (0–3m)",
      gender: "unisex",
      price: 38,
      discount: 20,
      rating: 4.9,
      reviews: 92,
      badge: "sale",
      collection: "winter",
      sizes: ["0-1m", "0-3m"],
      colors: [{n:"Lavender",h:"#e6e0f8"},{n:"Peach",h:"#ffd8c4"}],
      desc: "Teddy bear hooded pram suit with fold-over mittens and enclosed feet. Kept ultra-cozy for winter strolls and hospital trips."
    },

    /* === 2. 0–2 YEARS (BABY & TODDLER) === */
    {
      id: 2,
      name: "Floral Baby Twirl Dress",
      category: "dresses",
      catLabel: "Dresses",
      age: "0-2y",
      ageLabel: "0–2 Years",
      gender: "girls",
      price: 32,
      discount: 0,
      rating: 4.9,
      reviews: 168,
      badge: "bestseller",
      collection: "party",
      sizes: ["3-6m", "6-9m", "9-12m", "12-18m", "18-24m"],
      colors: [{n:"Pink",h:"#f2a6be"},{n:"Peach",h:"#ffd8c4"}],
      desc: "A sweet floral dress in breathable cotton with a soft tulle skirt and bow back detail. Perfect for birthdays, milestones and garden parties."
    },
    {
      id: 3,
      name: "Dino Print Play T-Shirt",
      category: "tshirts",
      catLabel: "T-Shirts",
      age: "0-2y",
      ageLabel: "0–2 Years",
      gender: "boys",
      price: 14,
      discount: 10,
      rating: 4.6,
      reviews: 302,
      badge: "hot",
      collection: "new-arrivals",
      sizes: ["6-9m", "9-12m", "12-18m", "18-24m"],
      colors: [{n:"Blue",h:"#8fc3e8"},{n:"Mint",h:"#d7f0e4"}],
      desc: "Roaring fun in a pre-shrunk combed cotton tee with a friendly dinosaur print. Machine washable and built for everyday toddler crawling."
    },
    {
      id: 6,
      name: "Boys Casual Plaid Shirt",
      category: "shirts",
      catLabel: "Shirts",
      age: "0-2y",
      ageLabel: "0–2 Years",
      gender: "boys",
      price: 22,
      discount: 0,
      rating: 4.5,
      reviews: 96,
      badge: "",
      collection: "new-arrivals",
      sizes: ["9-12m", "12-18m", "18-24m"],
      colors: [{n:"Blue",h:"#8fc3e8"},{n:"White",h:"#f8f4ef"}],
      desc: "Crisp cotton button-down with rolled sleeves and a playful check pattern. Dresses up shorts or denim in seconds."
    },
    {
      id: 11,
      name: "Peek-a-Boo Pocket Romper",
      category: "sets",
      catLabel: "Rompers",
      age: "0-2y",
      ageLabel: "0–2 Years",
      gender: "unisex",
      price: 20,
      discount: 10,
      rating: 4.6,
      reviews: 88,
      badge: "new",
      collection: "new-arrivals",
      sizes: ["3-6m", "6-9m", "9-12m", "12-18m"],
      colors: [{n:"Lavender",h:"#e6e0f8"},{n:"Yellow",h:"#f3d389"}],
      desc: "Snap-crotch romper with a cute peek-a-boo animal pocket. Silky-soft bamboo blend, hypoallergenic and gentle on skin."
    },
    {
      id: 13,
      name: "Striped Toddler Longsleeve",
      category: "tops",
      catLabel: "Tops",
      age: "0-2y",
      ageLabel: "0–2 Years",
      gender: "unisex",
      price: 16,
      discount: 0,
      rating: 4.4,
      reviews: 112,
      badge: "new",
      collection: "new-arrivals",
      sizes: ["6-9m", "9-12m", "12-18m", "18-24m"],
      colors: [{n:"White",h:"#f8f4ef"},{n:"Blue",h:"#8fc3e8"}],
      desc: "Classic Breton-stripe tee with contrast cuffs. Soft combed cotton that keeps its shape wash after wash."
    },
    {
      id: 16,
      name: "1st Birthday Party Tutu Dress",
      category: "dresses",
      catLabel: "Party Wear",
      age: "0-2y",
      ageLabel: "0–2 Years",
      gender: "girls",
      price: 36,
      discount: 20,
      rating: 4.9,
      reviews: 143,
      badge: "hot",
      collection: "party",
      sizes: ["6-9m", "9-12m", "12-18m", "18-24m"],
      colors: [{n:"Pink",h:"#f2a6be"},{n:"Peach",h:"#ffd8c4"}],
      desc: "First-birthday favorite: smocked bodice, flutter sleeves and a full satin-soft skirt. Match with our headbands and socks."
    },
    {
      id: 20,
      name: "Baby Grip Socks (5-Pack)",
      category: "accessories",
      catLabel: "Accessories",
      age: "0-2y",
      ageLabel: "0–2 Years",
      gender: "unisex",
      price: 12,
      discount: 25,
      rating: 4.8,
      reviews: 421,
      badge: "sale",
      collection: "accessories",
      sizes: ["3-6m", "6-12m", "12-24m"],
      colors: [{n:"Mixed",h:"#c9b8e0"}],
      desc: "Five pairs of non-slip, stay-on baby socks with silicone grips and soft ribbed cuffs. Cotton-rich and machine washable."
    },
    {
      id: 23,
      name: "Classic Dungaree & Tee Set",
      category: "sets",
      catLabel: "Outfit Sets",
      age: "0-2y",
      ageLabel: "0–2 Years",
      gender: "unisex",
      price: 30,
      discount: 0,
      rating: 4.6,
      reviews: 119,
      badge: "new",
      collection: "new-arrivals",
      sizes: ["9-12m", "12-18m", "18-24m"],
      colors: [{n:"Blue",h:"#8fc3e8"},{n:"Mint",h:"#d7f0e4"}],
      desc: "Classic dungarees with chest pocket and adjustable straps, paired with a soft tee. The ultimate easy-care outfit."
    },

    /* === 3. 3–5 YEARS (PRESCHOOL) === */
    {
      id: 4,
      name: "Kids Denim Jacket & Jeans Set",
      category: "sets",
      catLabel: "Outfit Sets",
      age: "3-5y",
      ageLabel: "3–5 Years",
      gender: "unisex",
      price: 46,
      discount: 20,
      rating: 4.7,
      reviews: 129,
      badge: "sale",
      collection: "bestsellers",
      sizes: ["3Y", "4Y", "5Y"],
      colors: [{n:"Blue",h:"#8fc3e8"}],
      desc: "Soft-wash denim jacket and jeans combo with an elastic waist for growing preschool kids. Stylish, durable and comfy for all-day wear."
    },
    {
      id: 5,
      name: "Girls Tulle Twirl Party Dress",
      category: "dresses",
      catLabel: "Party Wear",
      age: "3-5y",
      ageLabel: "3–5 Years",
      gender: "girls",
      price: 42,
      discount: 25,
      rating: 4.9,
      reviews: 201,
      badge: "sale",
      collection: "party",
      sizes: ["3Y", "4Y", "5Y"],
      colors: [{n:"Lavender",h:"#e6e0f8"},{n:"Pink",h:"#f2a6be"}],
      desc: "A twirl-worthy party dress with layered tulle, satin sash and hidden side zip. Lined for comfort — made for celebrations."
    },
    {
      id: 14,
      name: "Explorer Cargo Shorts Set",
      category: "bottoms",
      catLabel: "Shorts",
      age: "3-5y",
      ageLabel: "3–5 Years",
      gender: "boys",
      price: 24,
      discount: 5,
      rating: 4.5,
      reviews: 67,
      badge: "",
      collection: "summer",
      sizes: ["3Y", "4Y", "5Y"],
      colors: [{n:"Mint",h:"#d7f0e4"},{n:"Peach",h:"#ffd8c4"}],
      desc: "Play-friendly cargo shorts with real pockets, an adjustable waist and reinforced knees for climbing, digging and exploring."
    },
    {
      id: 15,
      name: "Lavender Starry Pajama Set",
      category: "sleepwear",
      catLabel: "Sleepwear",
      age: "3-5y",
      ageLabel: "3–5 Years",
      gender: "girls",
      price: 26,
      discount: 15,
      rating: 4.8,
      reviews: 201,
      badge: "sale",
      collection: "sleepwear",
      sizes: ["3Y", "4Y", "5Y"],
      colors: [{n:"Lavender",h:"#e6e0f8"},{n:"Pink",h:"#f2a6be"}],
      desc: "Buttery-soft bamboo pajama set with a starry night print and snug cuffs. Naturally breathable for sound, cozy sleep."
    },
    {
      id: 21,
      name: "Festive Celebration Kurta Set",
      category: "party",
      catLabel: "Party Wear",
      age: "3-5y",
      ageLabel: "3–5 Years",
      gender: "unisex",
      price: 58,
      discount: 15,
      rating: 4.9,
      reviews: 132,
      badge: "hot",
      collection: "festive",
      sizes: ["3Y", "4Y", "5Y"],
      colors: [{n:"Peach",h:"#ffd8c4"},{n:"Mint",h:"#d7f0e4"}],
      desc: "Celebration-ready traditional style top with matching bottoms and a shimmer dupatta. Comfort-first festive dressing."
    },
    {
      id: 24,
      name: "Swim Trunks & UPF Rashie Set",
      category: "sets",
      catLabel: "Swimwear",
      age: "3-5y",
      ageLabel: "3–5 Years",
      gender: "boys",
      price: 27,
      discount: 5,
      rating: 4.5,
      reviews: 76,
      badge: "",
      collection: "summer",
      sizes: ["3Y", "4Y", "5Y"],
      colors: [{n:"Blue",h:"#8fc3e8"},{n:"Yellow",h:"#f3d389"}],
      desc: "UPF 50+ rash guard and quick-dry swim trunks. Sand-resistant, chlorine-friendly and designed for water splash fun."
    },
    {
      id: 29,
      name: "Preschool Rainbow Ruffle Top",
      category: "tops",
      catLabel: "Tops",
      age: "3-5y",
      ageLabel: "3–5 Years",
      gender: "girls",
      price: 19,
      discount: 0,
      rating: 4.7,
      reviews: 84,
      badge: "new",
      collection: "new-arrivals",
      sizes: ["3Y", "4Y", "5Y"],
      colors: [{n:"Pink",h:"#f2a6be"},{n:"Yellow",h:"#f3d389"}],
      desc: "Adorable flutter sleeve top with embroidered pastel rainbows. Made of breathable organic cotton for everyday preschool play."
    },

    /* === 4. 6–9 YEARS (KIDS / PRIMARY) === */
    {
      id: 8,
      name: "Kids Adventure Summer Outfit",
      category: "sets",
      catLabel: "Summer Sets",
      age: "6-9y",
      ageLabel: "6–9 Years",
      gender: "unisex",
      price: 28,
      discount: 10,
      rating: 4.6,
      reviews: 143,
      badge: "new",
      collection: "summer",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"Peach",h:"#ffd8c4"},{n:"Yellow",h:"#f3d389"}],
      desc: "Lightweight short-sleeve tee and breathable shorts set in airy jersey. Sun-safe, sweat-wicking and ready for park adventures."
    },
    {
      id: 9,
      name: "School Uniform Oxford Shirt",
      category: "school",
      catLabel: "School Wear",
      age: "6-9y",
      ageLabel: "6–9 Years",
      gender: "unisex",
      price: 18,
      discount: 0,
      rating: 4.7,
      reviews: 356,
      badge: "bestseller",
      collection: "school",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"White",h:"#f8f4ef"},{n:"Blue",h:"#8fc3e8"}],
      desc: "Sturdy, easy-iron cotton school shirt with double-stitched seams and reinforced buttons. Tunic and regular lengths available."
    },
    {
      id: 10,
      name: "School Uniform Reinforced Trousers",
      category: "school",
      catLabel: "School Wear",
      age: "6-9y",
      ageLabel: "6–9 Years",
      gender: "boys",
      price: 20,
      discount: 0,
      rating: 4.6,
      reviews: 289,
      badge: "",
      collection: "school",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"Navy",h:"#4a5d75"},{n:"Grey",h:"#b9b2ab"}],
      desc: "Hard-wearing, crease-resistant school trousers with adjustable waistband and knee reinforcement for active school days."
    },
    {
      id: 19,
      name: "School Knit V-Neck Sweater",
      category: "school",
      catLabel: "School Wear",
      age: "6-9y",
      ageLabel: "6–9 Years",
      gender: "unisex",
      price: 24,
      discount: 0,
      rating: 4.5,
      reviews: 178,
      badge: "bestseller",
      collection: "school",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"Navy",h:"#4a5d75"},{n:"Grey",h:"#b9b2ab"}],
      desc: "V-neck school sweater in acrylic-cotton blend, machine washable with reinforced shoulder seams. Resists pilling wash after wash."
    },
    {
      id: 22,
      name: "Hooded Kids All-Weather Jacket",
      category: "tops",
      catLabel: "Jackets",
      age: "6-9y",
      ageLabel: "6–9 Years",
      gender: "unisex",
      price: 44,
      discount: 20,
      rating: 4.7,
      reviews: 93,
      badge: "sale",
      collection: "winter",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"Blue",h:"#8fc3e8"},{n:"Peach",h:"#ffd8c4"}],
      desc: "Water-repellent padded jacket with a fuzzy hood, zip front and cozy fleece-lined pockets. Packable and lightweight."
    },
    {
      id: 28,
      name: "Matching Sibling Coordinates",
      category: "sets",
      catLabel: "Match Sets",
      age: "6-9y",
      ageLabel: "6–9 Years",
      gender: "unisex",
      price: 48,
      discount: 12,
      rating: 4.9,
      reviews: 74,
      badge: "hot",
      collection: "matching",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"Blue",h:"#8fc3e8"},{n:"Pink",h:"#f2a6be"}],
      desc: "Coordinating tops and bottoms for siblings. One listing, two adorable matching outfits — perfect for family portraits."
    },
    {
      id: 33,
      name: "Kids Sporty Tracksuit Set",
      category: "sets",
      catLabel: "Activewear",
      age: "6-9y",
      ageLabel: "6–9 Years",
      gender: "unisex",
      price: 36,
      discount: 15,
      rating: 4.8,
      reviews: 105,
      badge: "new",
      collection: "new-arrivals",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"Navy",h:"#4a5d75"},{n:"Mint",h:"#d7f0e4"}],
      desc: "Breathable zip-up athletic jacket and tapered joggers with zippered pockets. Perfect for sports day, running and playground games."
    },

    /* === 5. 10+ YEARS (PRE-TEENS & TEENS) === */
    {
      id: 17,
      name: "Urban Streetwear Oversized Hoodie",
      category: "tops",
      catLabel: "Hoodies",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "unisex",
      price: 42,
      discount: 15,
      rating: 4.9,
      reviews: 188,
      badge: "hot",
      collection: "new-arrivals",
      sizes: ["10Y", "11Y", "12Y", "13-14Y", "15-16Y"],
      colors: [{n:"Lavender",h:"#e6e0f8"},{n:"Navy",h:"#4a5d75"},{n:"White",h:"#f8f4ef"}],
      desc: "Heavyweight organic cotton loopback fleece hoodie with drop shoulders and kangaroo pocket. Trendy relaxed fit for pre-teens and teens."
    },
    {
      id: 26,
      name: "Teen Relaxed Vintage Denim Jacket",
      category: "tops",
      catLabel: "Jackets",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "unisex",
      price: 52,
      discount: 10,
      rating: 4.8,
      reviews: 142,
      badge: "bestseller",
      collection: "bestsellers",
      sizes: ["10Y", "11Y", "12Y", "13-14Y", "15-16Y"],
      colors: [{n:"Blue",h:"#8fc3e8"},{n:"Grey",h:"#b9b2ab"}],
      desc: "Classic trucker style denim jacket in vintage stonewash with brass buttons and deep interior phone pockets."
    },
    {
      id: 27,
      name: "Pre-Teen Wide-Leg Cargo Pants",
      category: "bottoms",
      catLabel: "Pants",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "unisex",
      price: 34,
      discount: 0,
      rating: 4.7,
      reviews: 95,
      badge: "new",
      collection: "new-arrivals",
      sizes: ["10Y", "11Y", "12Y", "13-14Y", "15-16Y"],
      colors: [{n:"Beige",h:"#eee3d1"},{n:"Navy",h:"#4a5d75"}],
      desc: "Trendy utility cargo trousers with elastic back waistband, deep side flap pockets and adjustable toggle hems."
    },
    {
      id: 31,
      name: "Teen Chic Pleated Skater Dress",
      category: "dresses",
      catLabel: "Dresses",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "girls",
      price: 45,
      discount: 20,
      rating: 4.9,
      reviews: 167,
      badge: "sale",
      collection: "party",
      sizes: ["10Y", "11Y", "12Y", "13-14Y", "15-16Y"],
      colors: [{n:"Lavender",h:"#e6e0f8"},{n:"Pink",h:"#f2a6be"}],
      desc: "Contemporary fit-and-flare skater dress with pleated skirt, discreet pockets and elegant neckline. Perfect for parties and graduations."
    },
    {
      id: 32,
      name: "Heritage Varsity Bomber Jacket",
      category: "tops",
      catLabel: "Jackets",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "unisex",
      price: 58,
      discount: 25,
      rating: 4.9,
      reviews: 124,
      badge: "sale",
      collection: "winter",
      sizes: ["10Y", "11Y", "12Y", "13-14Y", "15-16Y"],
      colors: [{n:"Navy",h:"#4a5d75"},{n:"White",h:"#f8f4ef"}],
      desc: "Sporty varsity letterman jacket with ribbed striped collar, snap front closure and soft brushed interior lining."
    },
    {
      id: 34,
      name: "Pre-Teen Graphic Oversized Tee",
      category: "tshirts",
      catLabel: "T-Shirts",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "unisex",
      price: 20,
      discount: 0,
      rating: 4.6,
      reviews: 210,
      badge: "hot",
      collection: "new-arrivals",
      sizes: ["10Y", "11Y", "12Y", "13-14Y", "15-16Y"],
      colors: [{n:"White",h:"#f8f4ef"},{n:"Blue",h:"#8fc3e8"}],
      desc: "100% sustainable organic cotton boxy-fit tee featuring minimalist typography print. Durable collar and pre-shrunk fabric."
    },
    {
      id: 36,
      name: "Tech-Fleece Tapered Joggers",
      category: "bottoms",
      catLabel: "Pants",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "unisex",
      price: 32,
      discount: 10,
      rating: 4.8,
      reviews: 89,
      badge: "bestseller",
      collection: "bestsellers",
      sizes: ["10Y", "11Y", "12Y", "13-14Y", "15-16Y"],
      colors: [{n:"Grey",h:"#b9b2ab"},{n:"Navy",h:"#4a5d75"}],
      desc: "Streamlined fleece joggers with bonded zip pockets, ribbed cuffs and elastic drawcord waist. Built for casual style and athletics."
    }
  ];

  /* ------------------------------------------------------------------
     PRODUCT IMAGES ASSIGNMENT
     ------------------------------------------------------------------ */
  PRODUCTS.forEach(function (p, i) {
    p.image = img(i * 2);
    p.image2 = img(i * 2 + 1);
  });

  /* ------------------------------------------------------------------
     HELPERS
     ------------------------------------------------------------------ */
  function money(n) { return "$" + Number(n).toFixed(2); }

  function salePrice(p) {
    return p.discount ? +(p.price * (1 - p.discount / 100)).toFixed(2) : p.price;
  }

  function starsHTML(r) {
    var full = Math.round(r);
    var out = "";
    for (var i = 1; i <= 5; i++) {
      out += i <= full
        ? '<i class="bi bi-star-fill text-warning"></i>'
        : '<i class="bi bi-star text-muted opacity-50"></i>';
    }
    return out;
  }

  function badgeHTML(b, discount) {
    if (discount) {
      return '<span class="pc-badge badge-sale">-' + discount + '% OFF</span>';
    }
    if (!b) return "";
    var cls = b === "new" ? "badge-new" : b === "sale" ? "badge-sale" : b === "limited" ? "badge-limited" : "badge-hot";
    var label = b === "new" ? "New" : b === "sale" ? "Sale" : b === "limited" ? "Organic" : "Bestseller";
    return '<span class="pc-badge ' + cls + '">' + label + "</span>";
  }

  function colorDots(p) {
    var html = "";
    var shown = 0;
    for (var i = 0; i < p.colors.length; i++) {
      if (shown >= 4) break;
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
     RENDER: single product card -> HTML string
     ------------------------------------------------------------------ */
  function renderCard(p) {
    var sp = salePrice(p);
    var discountHTML = p.discount
      ? '<div class="pc-price-wrap"><span class="price-current">' + money(sp) + '</span><span class="price-old">' + money(p.price) + '</span><span class="discount-pill">Save ' + p.discount + '%</span></div>'
      : '<div class="pc-price-wrap"><span class="price-current">' + money(p.price) + '</span></div>';

    var wishCls = inWishlist(p.id) ? " is-wish active" : "";
    var wishIcon = inWishlist(p.id) ? "bi-heart-fill" : "bi-heart";

    return (
      '<article class="product-card" data-id="' + p.id + '" data-age="' + p.age + '">' +
        '<div class="pc-media">' +
          badgeHTML(p.badge, p.discount) +
          '<div class="pc-actions">' +
            '<button type="button" class="pc-action js-wish' + wishCls + '" aria-label="Add to wishlist" data-id="' + p.id + '" title="Wishlist"><i class="bi ' + wishIcon + '"></i></button>' +
            '<button type="button" class="pc-action js-quickview" aria-label="Quick view" data-id="' + p.id + '" title="Quick View"><i class="bi bi-eye"></i></button>' +
          '</div>' +
          '<a href="product-details.html?id=' + p.id + '" class="pc-img-link">' +
            '<img src="' + p.image + '" alt="' + p.name + '" class="pc-img pc-img-main" loading="lazy" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'">' +
            '<img src="' + p.image2 + '" alt="' + p.name + '" class="pc-img pc-img-hover" loading="lazy" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'">' +
          '</a>' +
        '</div>' +
        '<div class="pc-body">' +
          '<div class="pc-cat-row">' +
            '<span class="pc-cat" title="' + p.catLabel + ' · ' + p.ageLabel + '">' + p.catLabel + ' · <strong class="text-brand">' + p.ageLabel + '</strong></span>' +
            '<div class="pc-colors">' + colorDots(p) + '</div>' +
          '</div>' +
          '<h3 class="pc-name"><a href="product-details.html?id=' + p.id + '">' + p.name + '</a></h3>' +
          '<div class="pc-rating">' +
            '<span class="stars">' + starsHTML(p.rating) + '</span>' +
            '<span class="review-count">(' + p.reviews + ')</span>' +
          '</div>' +
          discountHTML +
          '<div class="pc-foot">' +
            '<button type="button" class="btn btn-brand w-100 js-addtocart" data-id="' + p.id + '">' +
              '<i class="bi bi-bag-plus me-1"></i>Add to Cart' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  /* ------------------------------------------------------------------
     RENDER: grid from a list
     ------------------------------------------------------------------ */
  function renderGrid(container, list) {
    if (!container) return;
    if (!list.length) {
      container.innerHTML =
        '<div class="empty-state col-12 text-center py-5">' +
          '<div class="empty-emoji fs-1 mb-2">🧸</div>' +
          '<h3 class="font-heading">No products found</h3>' +
          '<p class="text-muted">We could not find anything matching your selection. Try adjusting your age or category filters.</p>' +
        '</div>';
      return;
    }
    container.innerHTML = list.map(renderCard).join("");
  }

  /* ------------------------------------------------------------------
     PRODUCT SCROLLER
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
        '<div class="modal-dialog modal-dialog-centered modal-lg">' +
          '<div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">' +
            '<div class="modal-header border-0 pb-0">' +
              '<h5 class="modal-title font-heading fw-bold" id="quickViewModalLabel">Product Details</h5>' +
              '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
            '</div>' +
            '<div class="modal-body p-4" id="quickViewBody"></div>' +
          '</div>' +
        '</div>' +
      '</div>';
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
      '<div class="row g-4 align-items-center">' +
        '<div class="col-md-6">' +
          '<div class="qv-img rounded-4 overflow-hidden shadow-sm mb-2" id="qvMain" style="aspect-ratio:1;background:#f8fafc"><img src="' + img + '" alt="' + p.name + '" class="w-100 h-100 object-fit-cover" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'"></div>' +
          '<div class="qv-thumbs d-flex gap-2">' +
            '<img src="' + img + '" alt="view 1" class="active rounded-3 border" style="width:60px;height:60px;object-fit:cover;cursor:pointer" onclick="Kids.qvSwap(this)" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'">' +
            '<img src="' + img2 + '" alt="view 2" class="rounded-3 border" style="width:60px;height:60px;object-fit:cover;cursor:pointer" onclick="Kids.qvSwap(this)" onerror="this.onerror=null;this.src=\'' + PLACEHOLDER + '\'">' +
          '</div>' +
        '</div>' +
        '<div class="col-md-6">' +
          '<span class="badge bg-light text-brand fw-bold mb-2">' + p.catLabel + ' · ' + p.ageLabel + '</span>' +
          '<h2 class="font-heading fw-bold fs-3 mb-2">' + p.name + '</h2>' +
          '<div class="mb-3 d-flex align-items-center"><span class="stars me-2">' + starsHTML(p.rating) + '</span><span class="review-count text-muted small">(' + p.reviews + ' reviews)</span></div>' +
          '<div class="pc-price mb-3 d-flex align-items-baseline gap-2">' +
            '<span class="price font-heading text-brand fs-2 fw-bold">' + money(sp) + '</span>' +
            (p.discount ? '<span class="old-price text-muted text-decoration-line-through">' + money(p.price) + '</span><span class="badge bg-danger-subtle text-danger">-' + p.discount + '% OFF</span>' : '') +
          '</div>' +
          '<p class="text-muted small mb-3">' + p.desc + '</p>' +
          '<div class="mb-3"><label class="form-label small fw-bold">Select Size (' + p.ageLabel + ')</label><div class="size-chip-wrap d-flex flex-wrap gap-2">' + sizes + '</div></div>' +
          '<div class="mb-4"><label class="form-label small fw-bold">Select Color</label><div class="d-flex gap-2">' + colors + '</div></div>' +
          '<div class="d-flex gap-2 align-items-center">' +
            '<button type="button" class="btn btn-brand flex-grow-1" data-qv-add id="qvAdd"><i class="bi bi-bag-plus me-1"></i>Add to Cart</button>' +
            '<a href="product-details.html?id=' + p.id + '" class="btn btn-outline-secondary"><i class="bi bi-arrow-right"></i></a>' +
          '</div>' +
        '</div>' +
      '</div>';

    body.querySelector("#qvAdd").setAttribute("data-id", p.id);

    // Size chip selection
    body.querySelectorAll(".size-chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        body.querySelectorAll(".size-chip").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
      });
    });

    // Color chip selection
    body.querySelectorAll(".color-chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        body.querySelectorAll(".color-chip").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
      });
    });

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
      return (p.name + " " + p.catLabel + " " + p.ageLabel + " " + p.desc).toLowerCase().indexOf(q) > -1;
    });
  }

  var Kids = {
    PRODUCTS: PRODUCTS,
    AGE_GROUPS: AGE_GROUPS,
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
      if (main) main.src = el.src;
      document.querySelectorAll(".qv-thumbs img").forEach(function (t) { t.classList.remove("active"); });
      el.classList.add("active");
    },
    starsHTML: starsHTML
  };

  window.Kids = Kids;
})();
