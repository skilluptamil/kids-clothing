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
     CATALOG (Complete, organized catalog with 100% matching images)
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
      image: P + "18746931.jpg",
      image2: P + "14474507.jpg",
      desc: "Ultra-soft organic cotton baby romper with easy snap buttons and delicate ruffle trim. Gentle on delicate newborn skin, day and night."
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
      image: P + "11023372.jpg",
      image2: P + "11258764.jpg",
      desc: "Cozy fleece-lined winter snow romper with matching beanie and mittens. Keeps baby snug and protected during cold winter outings."
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
      image: P + "29790928.jpg",
      image2: P + "19652886.jpg",
      desc: "The complete baby-shower gift hamper: 3 organic rompers, cuddly plush teddy bear, knitted booties, swaddle, and a keepsake gift box."
    },
    {
      id: 18,
      name: "Cardigan & Beanie Knit Set",
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
      colors: [{n:"White",h:"#f8f4ef"},{n:"Mint",h:"#d7f0e4"}],
      image: P + "14657994.jpg",
      image2: P + "18033632.jpg",
      desc: "Soft ribbed cotton baby onesie with an adorable bear knit beanie cap. Breathable combed cotton for all-day warmth and comfort."
    },
    {
      id: 25,
      name: "Holiday Print Sleepsuit",
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
      collection: "sleepwear",
      sizes: ["0-1m", "0-3m"],
      colors: [{n:"White",h:"#f8f4ef"},{n:"Lavender",h:"#e6e0f8"}],
      image: P + "14476216.jpg",
      image2: P + "19652886.jpg",
      desc: "Festive deer and holiday motif pure cotton sleepsuit with fold-over mitten cuffs and two-way zipper for easy midnight changes."
    },
    {
      id: 30,
      name: "Avocado Organic Cotton Romper",
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
      colors: [{n:"Mint",h:"#d7f0e4"},{n:"Peach",h:"#ffd8c4"}],
      image: P + "14474514.jpg",
      image2: P + "14474507.jpg",
      desc: "Super-cute green organic cotton bodysuit with easy front snaps. Hypoallergenic, breathable, and ultra-gentle on newborn skin."
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
      colors: [{n:"White",h:"#f8f4ef"},{n:"Peach",h:"#ffd8c4"}],
      image: P + "19515504.jpg",
      image2: P + "11258764.jpg",
      desc: "Teddy bear hooded pram suit with fold-over mittens and enclosed feet. Kept ultra-cozy for winter strolls and hospital trips."
    },
    {
      id: 37,
      name: "Baby Bear Grip Socks (5-Pack)",
      category: "accessories",
      catLabel: "Accessories",
      age: "newborn",
      ageLabel: "Newborn (0–3m)",
      gender: "unisex",
      price: 12,
      discount: 25,
      rating: 4.8,
      reviews: 421,
      badge: "sale",
      collection: "accessories",
      sizes: ["0-1m", "0-3m", "3-6m"],
      colors: [{n:"Mint",h:"#d7f0e4"},{n:"Peach",h:"#ffd8c4"}],
      image: P + "14195487.jpg",
      image2: P + "7009391.jpg",
      desc: "Pastel bear-face cotton socks with soft silicone non-slip grips. Keeps little feet cozy, warm, and secure."
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
      image: P + "14671426.jpg",
      image2: P + "13167232.jpg",
      desc: "Sweet floral party dress in breathable cotton with a soft ruffled tulle skirt and matching headband. Perfect for birthdays and milestones."
    },
    {
      id: 3,
      name: "Dino Print Toddler T-Shirt",
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
      image: P + "13710211.jpg",
      image2: P + "17328941.jpg",
      desc: "Roaring fun in a pre-shrunk combed cotton tee with friendly dinosaur graphics. Built for everyday toddler crawling and play."
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
      image: P + "28097495.jpg",
      image2: P + "34370387.jpg",
      desc: "Crisp cotton button-down plaid shirt with a smart tie and rolled cuffs. Pairs easily with trousers or denim."
    },
    {
      id: 11,
      name: "Fox Pocket Denim Overalls",
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
      colors: [{n:"Blue",h:"#8fc3e8"},{n:"Yellow",h:"#f3d389"}],
      image: P + "13768126.jpg",
      image2: P + "14474518.jpg",
      desc: "Denim overalls featuring a charming embroidered fox face bib pocket and adjustable button straps. Soft washed denim for comfortable movement."
    },
    {
      id: 13,
      name: "Striped Toddler Knit Cardigan",
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
      image: P + "18033632.jpg",
      image2: P + "29500226.jpg",
      desc: "Classic nautical-striped button cardigan in soft ribbed cotton. Keeps toddlers warm and stylish through every season."
    },
    {
      id: 16,
      name: "1st Birthday Polka Tutu Dress",
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
      image: P + "14760732.jpg",
      image2: P + "14671426.jpg",
      desc: "Polka-dot layered tulle party dress with matching ear headband and angel motif. Ideal for cake smashes and 1st birthday photos."
    },
    {
      id: 20,
      name: "Boys Linen Button Collar Shirt",
      category: "shirts",
      catLabel: "Shirts",
      age: "0-2y",
      ageLabel: "0–2 Years",
      gender: "boys",
      price: 24,
      discount: 10,
      rating: 4.7,
      reviews: 135,
      badge: "new",
      collection: "new-arrivals",
      sizes: ["9-12m", "12-18m", "18-24m"],
      colors: [{n:"Blue",h:"#8fc3e8"},{n:"White",h:"#f8f4ef"}],
      image: P + "34370387.jpg",
      image2: P + "28097495.jpg",
      desc: "Vibrant blue linen-cotton blend shirt with neat collar and wooden buttons. Lightweight, breathable, and refined for family gatherings."
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
      image: P + "16878046.jpg",
      image2: P + "13768126.jpg",
      desc: "Denim dungaree shorts paired with a colorful striped tee. Durable, machine washable, and ready for adventurous toddlers."
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
      image: P + "12158341.jpg",
      image2: P + "13768126.jpg",
      desc: "Soft-wash denim jacket and jeans set with layered printed shirt. Stylish, durable, and comfortable for active preschool days."
    },
    {
      id: 5,
      name: "Girls Velvet & Ruffle Ballgown",
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
      colors: [{n:"Pink",h:"#f2a6be"},{n:"Lavender",h:"#e6e0f8"}],
      image: P + "35051542.jpg",
      image2: P + "35051541.jpg",
      desc: "Dramatic birthday ballgown featuring a sleek black bodice and tiered blush ruffle rosette skirt. Made for unforgettable celebrations."
    },
    {
      id: 14,
      name: "Explorer Graphic Tee & Pants Set",
      category: "bottoms",
      catLabel: "Pants",
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
      image: P + "545070.jpg",
      image2: P + "9554843.jpg",
      desc: "Teal car-print graphic tee paired with comfortable beige cotton trousers. Built for running, jumping, and preschool playground fun."
    },
    {
      id: 15,
      name: "Kids Safari Animal Pajama Set",
      category: "sleepwear",
      catLabel: "Sleepwear",
      age: "3-5y",
      ageLabel: "3–5 Years",
      gender: "unisex",
      price: 26,
      discount: 15,
      rating: 4.8,
      reviews: 201,
      badge: "sale",
      collection: "sleepwear",
      sizes: ["3Y", "4Y", "5Y"],
      colors: [{n:"Lavender",h:"#e6e0f8"},{n:"Pink",h:"#f2a6be"}],
      image: P + "18863554.jpg",
      image2: P + "18820123.jpg",
      desc: "Buttery-soft organic cotton pajamas with adorable safari animal illustrations and snug ribbed cuffs for cozy slumber."
    },
    {
      id: 21,
      name: "Preschool Birthday Sequin Dress",
      category: "party",
      catLabel: "Party Wear",
      age: "3-5y",
      ageLabel: "3–5 Years",
      gender: "girls",
      price: 58,
      discount: 15,
      rating: 4.9,
      reviews: 132,
      badge: "hot",
      collection: "party",
      sizes: ["3Y", "4Y", "5Y"],
      colors: [{n:"Lavender",h:"#e6e0f8"},{n:"Pink",h:"#f2a6be"}],
      image: P + "36046009.jpg",
      image2: P + "35051542.jpg",
      desc: "Sparkling purple sequined party dress with tiered tulle skirt. The ultimate show-stopping outfit for preschool birthdays."
    },
    {
      id: 24,
      name: "Kids UPF Beach Rashie & Swim Set",
      category: "sets",
      catLabel: "Swimwear",
      age: "3-5y",
      ageLabel: "3–5 Years",
      gender: "unisex",
      price: 27,
      discount: 5,
      rating: 4.5,
      reviews: 76,
      badge: "",
      collection: "summer",
      sizes: ["3Y", "4Y", "5Y"],
      colors: [{n:"Blue",h:"#8fc3e8"},{n:"Mint",h:"#d7f0e4"}],
      image: P + "7863359.jpg",
      image2: P + "8925983.jpg",
      desc: "UPF 50+ sun protection rash guard top and quick-dry ruffle swim bottoms. Chlorine-friendly and sand-resistant for seaside splashing."
    },
    {
      id: 29,
      name: "Toddler Tiered Denim Dress",
      category: "dresses",
      catLabel: "Dresses",
      age: "3-5y",
      ageLabel: "3–5 Years",
      gender: "girls",
      price: 28,
      discount: 0,
      rating: 4.7,
      reviews: 84,
      badge: "new",
      collection: "new-arrivals",
      sizes: ["3Y", "4Y", "5Y"],
      colors: [{n:"Blue",h:"#8fc3e8"}],
      image: P + "13167232.jpg",
      image2: P + "14760732.jpg",
      desc: "Charming buttoned denim frock with tiered flare skirt and chest pockets. Sturdy yet soft washed cotton for daily preschool wear."
    },

    /* === 4. 6–9 YEARS (KIDS / PRIMARY) === */
    {
      id: 8,
      name: "Kids Sporty Tee & Shorts Set",
      category: "sets",
      catLabel: "Summer Sets",
      age: "6-9y",
      ageLabel: "6–9 Years",
      gender: "boys",
      price: 28,
      discount: 10,
      rating: 4.6,
      reviews: 143,
      badge: "new",
      collection: "summer",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"Grey",h:"#b9b2ab"},{n:"Navy",h:"#4a5d75"}],
      image: P + "9554843.jpg",
      image2: P + "15227236.jpg",
      desc: "Colorblocked athletic crewneck tee and breathable drawstring shorts. Light, sweat-wicking, and ideal for sports practice and playground games."
    },
    {
      id: 9,
      name: "School Uniform Pleated Skirt Set",
      category: "school",
      catLabel: "School Wear",
      age: "6-9y",
      ageLabel: "6–9 Years",
      gender: "unisex",
      price: 32,
      discount: 0,
      rating: 4.8,
      reviews: 356,
      badge: "bestseller",
      collection: "school",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"Navy",h:"#4a5d75"},{n:"White",h:"#f8f4ef"}],
      image: P + "35128474.jpg",
      image2: P + "8926544.jpg",
      desc: "Formal school uniform with white collared shirt, suspender trousers, and knife-pleated skirt. High-durability crease-resistant fabric."
    },
    {
      id: 10,
      name: "Classroom Formal Uniform Set",
      category: "school",
      catLabel: "School Wear",
      age: "6-9y",
      ageLabel: "6–9 Years",
      gender: "unisex",
      price: 34,
      discount: 0,
      rating: 4.7,
      reviews: 289,
      badge: "",
      collection: "school",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"Navy",h:"#4a5d75"},{n:"White",h:"#f8f4ef"}],
      image: P + "8926544.jpg",
      image2: P + "10646537.jpg",
      desc: "Classic classroom school uniform with crisp button shirt, matching tie/bowtie, and tailored school bottoms. Built to last the academic year."
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
      rating: 4.8,
      reviews: 178,
      badge: "bestseller",
      collection: "school",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"Blue",h:"#8fc3e8"},{n:"Navy",h:"#4a5d75"}],
      image: P + "14909652.jpg",
      image2: P + "35107586.jpg",
      desc: "V-neck school sweater in an acrylic-cotton blend, machine washable with reinforced shoulder seams. Resists pilling wash after wash."
    },
    {
      id: 22,
      name: "Girls Birthday Rosette Party Gown",
      category: "party",
      catLabel: "Party Wear",
      age: "6-9y",
      ageLabel: "6–9 Years",
      gender: "girls",
      price: 54,
      discount: 20,
      rating: 4.9,
      reviews: 124,
      badge: "sale",
      collection: "party",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"Pink",h:"#f2a6be"},{n:"Lavender",h:"#e6e0f8"}],
      image: P + "38414487.jpg",
      image2: P + "35875002.jpg",
      desc: "Stunning rose pink rosette tiered party gown with smocked bodice and satin bow. Perfect for birthday parties, recitals, and celebrations."
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
      colors: [{n:"Pink",h:"#f2a6be"},{n:"Mint",h:"#d7f0e4"}],
      image: P + "20100110.jpg",
      image2: P + "33489883.jpg",
      desc: "Coordinating brother & sister outfits: watermelon print sundress and tropical Hawaiian shirt. Perfect for holidays and family photos."
    },
    {
      id: 33,
      name: "Girls Organic Cotton Nightdress",
      category: "sleepwear",
      catLabel: "Sleepwear",
      age: "6-9y",
      ageLabel: "6–9 Years",
      gender: "girls",
      price: 28,
      discount: 15,
      rating: 4.8,
      reviews: 105,
      badge: "new",
      collection: "sleepwear",
      sizes: ["6Y", "7Y", "8Y", "9Y"],
      colors: [{n:"White",h:"#f8f4ef"}],
      image: P + "6182710.jpg",
      image2: P + "18820123.jpg",
      desc: "Pure organic cotton vintage-style nightgowns with delicate lace trim. Breathable, hypoallergenic, and soothing for restful slumber."
    },

    /* === 5. 10+ YEARS (PRE-TEENS & TEENS) === */
    {
      id: 17,
      name: "Urban Style Kids Graphic Tee",
      category: "tshirts",
      catLabel: "T-Shirts",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "unisex",
      price: 22,
      discount: 15,
      rating: 4.9,
      reviews: 188,
      badge: "hot",
      collection: "new-arrivals",
      sizes: ["10Y", "11Y", "12Y", "13-14Y", "15-16Y"],
      colors: [{n:"Black",h:"#1e293b"},{n:"White",h:"#f8f4ef"}],
      image: P + "15227236.jpg",
      image2: P + "17328941.jpg",
      desc: "Relaxed streetwear t-shirt in heavyweight organic cotton with bold typography print. Trendy casual fit for pre-teens and teens."
    },
    {
      id: 26,
      name: "Teen Vintage Stonewash Denim",
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
      colors: [{n:"Blue",h:"#8fc3e8"}],
      image: P + "12158341.jpg",
      image2: P + "15227236.jpg",
      desc: "Classic trucker style denim jacket in vintage stonewash with brass buttons and deep interior phone pockets."
    },
    {
      id: 27,
      name: "Kids Sushi Print Pajama Set",
      category: "sleepwear",
      catLabel: "Sleepwear",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "unisex",
      price: 34,
      discount: 0,
      rating: 4.7,
      reviews: 95,
      badge: "new",
      collection: "sleepwear",
      sizes: ["10Y", "11Y", "12Y", "13-14Y", "15-16Y"],
      colors: [{n:"White",h:"#f8f4ef"},{n:"Mint",h:"#d7f0e4"}],
      image: P + "18820123.jpg",
      image2: P + "18863554.jpg",
      desc: "Playful sushi motif two-piece pajama set with long sleeves and elasticated jogger bottoms. Soft combed cotton jersey."
    },
    {
      id: 31,
      name: "Floral Birthday Princess Gown",
      category: "party",
      catLabel: "Party Wear",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "girls",
      price: 48,
      discount: 20,
      rating: 4.9,
      reviews: 167,
      badge: "sale",
      collection: "party",
      sizes: ["10Y", "11Y", "12Y", "13-14Y", "15-16Y"],
      colors: [{n:"Pink",h:"#f2a6be"},{n:"Lavender",h:"#e6e0f8"}],
      image: P + "34752454.jpg",
      image2: P + "35875002.jpg",
      desc: "Elegant floral maxi party dress with flowing layered skirt and delicate shoulder accents. Ideal for formal graduations and special events."
    },
    {
      id: 32,
      name: "Girls Pale Pink Floral Cape Gown",
      category: "party",
      catLabel: "Party Wear",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "girls",
      price: 58,
      discount: 25,
      rating: 4.9,
      reviews: 124,
      badge: "sale",
      collection: "party",
      sizes: ["10Y", "11Y", "12Y", "13-14Y", "15-16Y"],
      colors: [{n:"Pink",h:"#f2a6be"},{n:"Peach",h:"#ffd8c4"}],
      image: P + "35875002.jpg",
      image2: P + "38414487.jpg",
      desc: "Fairytale birthday gown with delicate sheer floral embroidery cape and full soft-tulle ballgown skirt."
    },
    {
      id: 34,
      name: "Striped Pocket Crewneck Tee",
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
      colors: [{n:"Yellow",h:"#f3d389"},{n:"White",h:"#f8f4ef"}],
      image: P + "29500226.jpg",
      image2: P + "545070.jpg",
      desc: "100% sustainable organic cotton boxy-fit horizontal striped tee with contrast chest pocket. Durable collar and pre-shrunk fabric."
    },
    {
      id: 36,
      name: "Siblings Striped Pinafore Set",
      category: "sets",
      catLabel: "Match Sets",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "unisex",
      price: 46,
      discount: 10,
      rating: 4.8,
      reviews: 89,
      badge: "bestseller",
      collection: "matching",
      sizes: ["10Y", "11Y", "12Y", "13-14Y", "15-16Y"],
      colors: [{n:"Blue",h:"#8fc3e8"},{n:"White",h:"#f8f4ef"}],
      image: P + "33489883.jpg",
      image2: P + "20100110.jpg",
      desc: "Coordinating brother & sister blue and white striped pinafore dress and matching dungaree set. High-comfort cotton linen blend."
    },
    {
      id: 38,
      name: "Primary School Uniform Group Set",
      category: "school",
      catLabel: "School Wear",
      age: "10plus",
      ageLabel: "10+ Years",
      gender: "unisex",
      price: 35,
      discount: 0,
      rating: 4.9,
      reviews: 112,
      badge: "bestseller",
      collection: "school",
      sizes: ["10Y", "11Y", "12Y", "13-14Y"],
      colors: [{n:"Navy",h:"#4a5d75"},{n:"White",h:"#f8f4ef"}],
      image: P + "10646537.jpg",
      image2: P + "35128474.jpg",
      desc: "Durable school uniform set with collared shirt, necktie, and pleated shorts/skirts. Reinforced stitching built for active students."
    }
  ];

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
