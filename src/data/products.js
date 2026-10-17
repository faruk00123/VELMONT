/**
 * VELMONT — local demo catalogue.
 * All product data lives in the browser. No API, no backend.
 * Images are served from Unsplash's CDN; `ImageWithFallback` handles any load failure.
 */

const shot = (id, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const CATEGORIES = [
  {
    slug: 'sneakers',
    name: 'Sneakers',
    tagline: 'Everyday icons',
    description:
      'Clean silhouettes, premium uppers and cushioned soles built for the rhythm of the city.',
    image: shot('1608231387042-66d1773070a5', 1200),
  },
  {
    slug: 'formal',
    name: 'Formal Shoes',
    tagline: 'Boardroom ready',
    description:
      'Hand-finished Oxfords, Derbies and cap-toes cut from full-grain leather and Goodyear welted.',
    image: shot('1531310197839-ccf54634509e', 1200),
  },
  {
    slug: 'loafers',
    name: 'Loafers',
    tagline: 'Effortless polish',
    description:
      'Slip-on ease with an elevated finish — the quiet luxury of a well-made loafer.',
    image: shot('1614252369475-531eba835eb1', 1200),
  },
  {
    slug: 'boots',
    name: 'Boots',
    tagline: 'Built for weather',
    description:
      'Chelsea, chukka and lace-up boots with a sturdy profile and a refined leather finish.',
    image: shot('1638247025967-b4e38f787b76', 1200),
  },
  {
    slug: 'running',
    name: 'Running Shoes',
    tagline: 'Engineered pace',
    description:
      'Responsive foams, breathable knits and lightweight builds for daily miles and race days.',
    image: shot('1606107557195-0e29a4b5b4aa', 1200),
  },
  {
    slug: 'sandals',
    name: 'Sandals',
    tagline: 'Warm-weather ease',
    description:
      'Leather sandals and slides shaped for long days, soft footbeds and easy wear.',
    image: shot('1542840410-3092f99611a3', 1200),
  },
  {
    slug: 'luxury',
    name: 'Luxury Footwear',
    tagline: 'The atelier line',
    description:
      'Limited, hand-finished pieces from the VELMONT atelier — numbered and made to last decades.',
    image: shot('1525966222134-fcfa99b8ae77', 1200),
  },
]

export const colorHex = {
  Ivory: '#F2EDE2',
  Cognac: '#9C5A34',
  Espresso: '#4A342A',
  Midnight: '#1E2A31',
  Olive: '#5C6350',
  Forest: '#315B49',
  Copper: '#C58B52',
  Slate: '#5B6470',
  Sand: '#D8C3A5',
  Bordeaux: '#6E2B33',
  Storm: '#3C4652',
  Bone: '#EDE6DA',
  Onyx: '#22262B',
  Camel: '#B08455',
  White: '#FFFFFF',
}

const ALL_SIZES = [39, 40, 41, 42, 43, 44, 45, 46]
const HALF_EXTRA = [36, 37, 38, 39, 40, 41, 42]

export const PRODUCTS = [
  {
    id: 'vel-aurelia-low',
    name: 'Aurelia Low Sneaker',
    brand: 'VELMONT',
    category: 'sneakers',
    gender: 'Unisex',
    price: 189,
    compareAt: 232,
    rating: 4.8,
    reviews: 214,
    tags: ['bestseller', 'sale'],
    badge: 'Bestseller',
    stock: 18,
    colors: ['Ivory', 'Onyx', 'Forest'],
    sizes: ALL_SIZES,
    images: [
      shot('1608231387042-66d1773070a5'),
      shot('1600269452121-4f2416e55c28'),
      shot('1560769629-975ec94e6a86'),
    ],
    short: 'A minimal low-top in soft Italian leather with a sculpted ivory sole.',
    description:
      'The Aurelia Low is our most-worn silhouette — a quiet, minimal sneaker cut from soft Italian calf leather and set on a sculpted cupsole. The interior is lined with vegetable-tanned leather that moulds to the foot after a week of wear.',
    details: [
      'Full-grain Italian calf leather upper',
      'Vegetable-tanned leather lining and sock',
      'Sculpted cupsole with 18mm heel cushioning',
      'Hand-stitched apron and waxed cotton laces',
      'Made in Portugal',
    ],
  },
  {
    id: 'vel-court-meridian',
    name: 'Court Meridian Sneaker',
    brand: 'VELMONT',
    category: 'sneakers',
    gender: 'Men',
    price: 205,
    compareAt: null,
    rating: 4.7,
    reviews: 168,
    tags: ['bestseller'],
    badge: 'Bestseller',
    stock: 12,
    colors: ['White', 'Onyx', 'Copper'],
    sizes: ALL_SIZES,
    images: [
      shot('1549298916-b41d501d3772'),
      shot('1552346154-21d32810aba3'),
      shot('1600185365483-26d7a4cc7519'),
    ],
    short: 'A tennis-inspired court shoe with a padded collar and gum-toned sole.',
    description:
      'Drawn from classic court shoes of the seventies and rebuilt with modern materials, the Court Meridian pairs a perforated leather upper with a low-profile rubber sole that grips without bulk.',
    details: [
      'Perforated leather upper with suede overlays',
      'Padded ankle collar and tongue',
      'Low-profile vulcanised rubber sole',
      'Removable cushioned insole',
      'Made in Portugal',
    ],
  },
  {
    id: 'vel-linea-runner',
    name: 'Linea Street Runner',
    brand: 'VELMONT',
    category: 'sneakers',
    gender: 'Women',
    price: 175,
    compareAt: 219,
    rating: 4.6,
    reviews: 132,
    tags: ['sale'],
    badge: 'Sale',
    stock: 9,
    colors: ['Bordeaux', 'Ivory', 'Sand'],
    sizes: HALF_EXTRA,
    images: [
      shot('1491553895911-0055eca6402d'),
      shot('1542291026-7eec264c27ff'),
      shot('1556906781-9a412961c28c'),
    ],
    short: 'A featherweight street runner with a layered upper and gel heel.',
    description:
      'The Linea Street Runner blends a retro runner profile with contemporary comfort: a breathable knit-and-suede upper sits over a gel-cushioned heel for long days on your feet.',
    details: [
      'Knit mesh upper with suede panelling',
      'Gel-cushioned heel unit',
      'Ortholite comfort footbed',
      'Reflective heel tab',
      'Designed in Copenhagen, made in Vietnam',
    ],
  },
  {
    id: 'vel-atelier-canvas',
    name: 'Atelier Canvas Sneaker',
    brand: 'VELMONT',
    category: 'sneakers',
    gender: 'Unisex',
    price: 145,
    compareAt: null,
    rating: 4.5,
    reviews: 96,
    tags: ['new'],
    badge: 'New',
    stock: 24,
    colors: ['Bone', 'Olive', 'Storm'],
    sizes: ALL_SIZES,
    images: [
      shot('1595950653106-6c9ebd614d3a'),
      shot('1560769629-975ec94e6a86'),
      shot('1608231387042-66d1773070a5'),
    ],
    short: 'Organic cotton canvas, vulcanised sole, zero fuss.',
    description:
      'A everyday canvas sneaker with a heavier organic cotton weave and a vulcanised rubber sole. Built to be worn hard, washed rarely and loved for years.',
    details: [
      '12oz organic cotton canvas upper',
      'Vulcanised rubber cupsole',
      'Natural rubber foxing tape',
      'Cotton laces, recycled content',
      'Made in Portugal',
    ],
  },
  {
    id: 'vel-riviera-court',
    name: 'Riviera Court Sneaker',
    brand: 'VELMONT',
    category: 'sneakers',
    gender: 'Men',
    price: 199,
    compareAt: null,
    rating: 4.6,
    reviews: 88,
    tags: ['new'],
    badge: 'New',
    stock: 15,
    colors: ['White', 'Sand', 'Midnight'],
    sizes: ALL_SIZES,
    images: [
      shot('1603787081207-362bcef7c144'),
      shot('1600185365483-26d7a4cc7519'),
      shot('1549298916-b41d501d3772'),
    ],
    short: 'Riviera-ready court shoes in washed leather with a summer sole.',
    description:
      'Washed leather, a slightly thicker midsole and a relaxed profile — the Riviera Court is built for long lunches and longer walks along the coast.',
    details: [
      'Washed nappa leather upper',
      'Cork-blend comfort footbed',
      'Stitched rubber outsole',
      'Unlined heel for warm-weather wear',
      'Made in Spain',
    ],
  },

  {
    id: 'vel-belgrave-oxford',
    name: 'Belgrave Oxford',
    brand: 'VELMONT',
    category: 'formal',
    gender: 'Men',
    price: 349,
    compareAt: 415,
    rating: 4.9,
    reviews: 178,
    tags: ['bestseller', 'sale'],
    badge: 'Bestseller',
    stock: 7,
    colors: ['Espresso', 'Onyx'],
    sizes: ALL_SIZES,
    images: [
      shot('1531310197839-ccf54634509e'),
      shot('1582897085656-c636d006a246'),
      shot('1610398752800-146f269dfcc8'),
    ],
    short: 'A closed-lacing Oxford, Goodyear welted and hand-burnished.',
    description:
      'The Belgrave is our benchmark formal shoe: a closed-lacing Oxford in full-grain calf leather, Goodyear welted so it can be resoled for decades, and finished with a hand-burnished patina.',
    details: [
      'Full-grain French calf leather upper',
      'Goodyear welted construction',
      'Leather sole with rubber top-piece',
      'Hand-burnished finish',
      'Includes cedar shoe tree',
      'Made in England',
    ],
  },
  {
    id: 'vel-kensington-derby',
    name: 'Kensington Derby',
    brand: 'VELMONT',
    category: 'formal',
    gender: 'Men',
    price: 315,
    compareAt: null,
    rating: 4.7,
    reviews: 121,
    tags: [],
    badge: null,
    stock: 11,
    colors: ['Espresso', 'Cognac', 'Onyx'],
    sizes: ALL_SIZES,
    images: [
      shot('1582897085656-c636d006a246'),
      shot('1531310197839-ccf54634509e'),
      shot('1560343090-f0409e92791a'),
    ],
    short: 'An open-lacing Derby that softens the working week.',
    description:
      'Slightly more relaxed than its Oxford sibling, the Kensington Derby uses open lacing for an easy fit while keeping the sharp, hand-finished lines of a proper dress shoe.',
    details: [
      'Full-grain calf leather upper',
      'Blake-stitched construction',
      'Leather-lined insole',
      'Stacked leather heel',
      'Made in Portugal',
    ],
  },
  {
    id: 'vel-marlowe-dress',
    name: 'Marlowe Dress Shoe',
    brand: 'VELMONT',
    category: 'formal',
    gender: 'Women',
    price: 289,
    compareAt: 340,
    rating: 4.6,
    reviews: 74,
    tags: ['sale'],
    badge: 'Sale',
    stock: 10,
    colors: ['Onyx', 'Bordeaux'],
    sizes: HALF_EXTRA,
    images: [
      shot('1610398752800-146f269dfcc8'),
      shot('1582897085656-c636d006a246'),
      shot('1525966222134-fcfa99b8ae77'),
    ],
    short: 'A poised, softly squared dress shoe with a 35mm block heel.',
    description:
      'Cut on a softly squared last and set on a stable block heel, the Marlowe moves from desk to dinner without a change of shoes.',
    details: [
      'Polished calf leather upper',
      '35mm stacked block heel',
      'Cushioned leather footbed',
      'Leather sole with non-slip pad',
      'Made in Italy',
    ],
  },
  {
    id: 'vel-regent-cap-toe',
    name: 'Regent Cap-Toe',
    brand: 'VELMONT',
    category: 'formal',
    gender: 'Men',
    price: 305,
    compareAt: null,
    rating: 4.8,
    reviews: 143,
    tags: ['bestseller'],
    badge: null,
    stock: 14,
    colors: ['Onyx', 'Espresso'],
    sizes: ALL_SIZES,
    images: [
      shot('1560343090-f0409e92791a'),
      shot('1610398752800-146f269dfcc8'),
      shot('1531310197839-ccf54634509e'),
    ],
    short: 'A sharp cap-toe Oxford for the days that matter.',
    description:
      'The Regent is a formal cap-toe Oxford built on a slim last with a lightly chiselled toe — the shoe for interviews, weddings and everything in between.',
    details: [
      'Full-grain calf leather upper',
      'Goodyear welted construction',
      'Single leather sole, 8mm',
      'Closed-lacing Oxford pattern',
      'Made in England',
    ],
  },

  {
    id: 'vel-sienna-loafer',
    name: 'Sienna Penny Loafer',
    brand: 'VELMONT',
    category: 'loafers',
    gender: 'Unisex',
    price: 259,
    compareAt: null,
    rating: 4.8,
    reviews: 205,
    tags: ['bestseller'],
    badge: 'Bestseller',
    stock: 16,
    colors: ['Cognac', 'Espresso', 'Bordeaux'],
    sizes: ALL_SIZES,
    images: [
      shot('1614252369475-531eba835eb1'),
      shot('1596703263926-eb0762ee17e4'),
      shot('1587563871167-1ee9c731aefb'),
    ],
    short: 'The classic penny loafer, hand-sewn on a soft unlined last.',
    description:
      'Unlined and hand-sewn, the Sienna Penny Loafer breaks in quickly and pairs with almost everything — tailoring on Monday, denim on Saturday.',
    details: [
      'Hand-sewn moccasin construction',
      'Unlined, vegetable-tanned leather',
      'Leather sole with rubber top-piece',
      'Blake stitched',
      'Made in Portugal',
    ],
  },
  {
    id: 'vel-harbour-tassel',
    name: 'Harbour Tassel Loafer',
    brand: 'VELMONT',
    category: 'loafers',
    gender: 'Men',
    price: 279,
    compareAt: 325,
    rating: 4.7,
    reviews: 98,
    tags: ['sale'],
    badge: 'Sale',
    stock: 8,
    colors: ['Espresso', 'Storm'],
    sizes: ALL_SIZES,
    images: [
      shot('1596703263926-eb0762ee17e4'),
      shot('1525966222134-fcfa99b8ae77'),
      shot('1614252369475-531eba835eb1'),
    ],
    short: 'A tassel loafer with hand-knotted silk tassels and a suede finish.',
    description:
      'The Harbour brings a touch of character to a formal shoe: hand-knotted tassels, a suede-finished vamp and a slightly extended toe that elongates the leg.',
    details: [
      'Suede-finished calf leather upper',
      'Hand-knotted silk tassels',
      'Leather-lined insole',
      'Stacked leather heel',
      'Made in Italy',
    ],
  },
  {
    id: 'vel-vesper-suede',
    name: 'Vesper Suede Loafer',
    brand: 'VELMONT',
    category: 'loafers',
    gender: 'Women',
    price: 235,
    compareAt: null,
    rating: 4.5,
    reviews: 61,
    tags: ['new'],
    badge: 'New',
    stock: 19,
    colors: ['Sand', 'Olive', 'Midnight'],
    sizes: HALF_EXTRA,
    images: [
      shot('1587563871167-1ee9c731aefb'),
      shot('1614252369475-531eba835eb1'),
      shot('1596703263926-eb0762ee17e4'),
    ],
    short: 'Buttery suede, a low vamp and an almond toe.',
    description:
      'The Vesper is cut low on the foot from Italian kid suede, giving a longer, cleaner line that works with cropped trousers and bare ankles alike.',
    details: [
      'Italian kid suede upper',
      'Low-vamp almond last',
      'Cushioned leather footbed',
      'Flexible rubber-injected sole',
      'Made in Spain',
    ],
  },

  {
    id: 'vel-nordal-chelsea',
    name: 'Nordal Chelsea Boot',
    brand: 'VELMONT',
    category: 'boots',
    gender: 'Unisex',
    price: 329,
    compareAt: null,
    rating: 4.8,
    reviews: 187,
    tags: ['bestseller'],
    badge: 'Bestseller',
    stock: 13,
    colors: ['Espresso', 'Onyx', 'Camel'],
    sizes: ALL_SIZES,
    images: [
      shot('1638247025967-b4e38f787b76'),
      shot('1520639888713-7851133b1ed0'),
      shot('1465453869711-7e174808ace9'),
    ],
    short: 'A Goodyear-welted Chelsea boot with twin elastic gores.',
    description:
      'Clean, weather-ready and endlessly repairable: the Nordal Chelsea is welted in full-grain leather with twin elastic gores and a heavy rubber commando sole.',
    details: [
      'Full-grain leather upper, water-resistant',
      'Goodyear welted construction',
      'Twin elastic gores',
      'Commando rubber outsole',
      'Pull-tab at heel',
      'Made in Portugal',
    ],
  },
  {
    id: 'vel-highland-boot',
    name: 'Highland Leather Boot',
    brand: 'VELMONT',
    category: 'boots',
    gender: 'Men',
    price: 359,
    compareAt: 420,
    rating: 4.7,
    reviews: 104,
    tags: ['sale'],
    badge: 'Sale',
    stock: 6,
    colors: ['Cognac', 'Espresso'],
    sizes: ALL_SIZES,
    images: [
      shot('1520639888713-7851133b1ed0'),
      shot('1465453869711-7e174808ace9'),
      shot('1605812860427-4024433a70fd'),
    ],
    short: 'A lace-up boot with a storm welt and a stacked heel.',
    description:
      'Built on a sturdy last with a storm welt to keep water out, the Highland is designed for grey mornings and long walks. Full-grain leather takes on a beautiful patina with wear.',
    details: [
      'Oil-tanned full-grain leather',
      'Storm welt for weather resistance',
      'Stacked leather heel with rubber top-piece',
      'Waxed cotton laces, two pairs included',
      'Made in Portugal',
    ],
  },
  {
    id: 'vel-ranger-lace',
    name: 'Ranger Lace Boot',
    brand: 'VELMONT',
    category: 'boots',
    gender: 'Unisex',
    price: 299,
    compareAt: null,
    rating: 4.6,
    reviews: 79,
    tags: [],
    badge: null,
    stock: 17,
    colors: ['Olive', 'Espresso', 'Storm'],
    sizes: ALL_SIZES,
    images: [
      shot('1465453869711-7e174808ace9'),
      shot('1638247025967-b4e38f787b76'),
      shot('1543163521-1bf539c55dd2'),
    ],
    short: 'A workwear-inspired lace boot with a lugged sole.',
    description:
      'Taking cues from 1940s work boots, the Ranger has a padded collar, a reinforced toe cap and a lugged rubber sole that keeps its grip on wet pavements.',
    details: [
      'Waxed full-grain leather upper',
      'Padded leather collar',
      'Lugged rubber outsole, 4mm lugs',
      'Antique brass hardware',
      'Made in Portugal',
    ],
  },
  {
    id: 'vel-terra-chukka',
    name: 'Terra Chukka Boot',
    brand: 'VELMONT',
    category: 'boots',
    gender: 'Men',
    price: 265,
    compareAt: null,
    rating: 4.5,
    reviews: 66,
    tags: ['new'],
    badge: 'New',
    stock: 20,
    colors: ['Camel', 'Olive', 'Espresso'],
    sizes: ALL_SIZES,
    images: [
      shot('1605812860427-4024433a70fd'),
      shot('1520639888713-7851133b1ed0'),
      shot('1562183241-b937e95585b6'),
    ],
    short: 'A desert-boot silhouette in soft suede with a crepe sole.',
    description:
      'The Terra is a three-eyelet chukka in soft Italian suede, set on a natural crepe sole for quiet comfort and an easy, unstructured look.',
    details: [
      'Italian suede upper',
      'Natural crepe rubber sole',
      'Unlined vamp',
      'Three-eyelet lacing',
      'Made in Spain',
    ],
  },

  {
    id: 'vel-velocity-knit',
    name: 'Velocity Knit Runner',
    brand: 'VELMONT',
    category: 'running',
    gender: 'Unisex',
    price: 169,
    compareAt: 199,
    rating: 4.7,
    reviews: 246,
    tags: ['bestseller', 'sale'],
    badge: 'Bestseller',
    stock: 22,
    colors: ['Storm', 'Ivory', 'Forest'],
    sizes: ALL_SIZES,
    images: [
      shot('1595341888016-a392ef81b7de'),
      shot('1606107557195-0e29a4b5b4aa'),
      shot('1520256862855-398228c41684'),
    ],
    short: 'A breathable daily trainer with a responsive foam midsole.',
    description:
      'The Velocity Knit is our do-everything trainer: a seamless knitted upper over a nitrogen-infused foam midsole that returns energy mile after mile.',
    details: [
      'Seamless engineered knit upper',
      'Nitrogen-infused foam midsole, 8mm drop',
      'Rubber outsole with flex grooves',
      'Weighs 245g (UK 8)',
      'Designed in Copenhagen',
    ],
  },
  {
    id: 'vel-pace-air',
    name: 'Pace Air Runner',
    brand: 'VELMONT',
    category: 'running',
    gender: 'Men',
    price: 189,
    compareAt: null,
    rating: 4.6,
    reviews: 151,
    tags: [],
    badge: null,
    stock: 14,
    colors: ['Onyx', 'Copper', 'Storm'],
    sizes: ALL_SIZES,
    images: [
      shot('1606107557195-0e29a4b5b4aa'),
      shot('1595341888016-a392ef81b7de'),
      shot('1556906781-9a412961c28c'),
    ],
    short: 'A tempo shoe with an air-cushioned heel and carbon plate.',
    description:
      'Built for faster sessions, the Pace Air pairs a firm carbon-infused plate with air cushioning in the heel — quick through the turn, stable on landing.',
    details: [
      'Engineered mesh upper with TPU cage',
      'Carbon-infused propulsion plate',
      'Air-cushioned heel unit',
      'Weighs 238g (UK 8)',
      'Designed in Copenhagen',
    ],
  },
  {
    id: 'vel-trailbound',
    name: 'Trailbound Runner',
    brand: 'VELMONT',
    category: 'running',
    gender: 'Unisex',
    price: 179,
    compareAt: null,
    rating: 4.5,
    reviews: 83,
    tags: ['new'],
    badge: 'New',
    stock: 18,
    colors: ['Olive', 'Storm', 'Camel'],
    sizes: ALL_SIZES,
    images: [
      shot('1520256862855-398228c41684'),
      shot('1606107557195-0e29a4b5b4aa'),
      shot('1512374382149-233c42b6a83b'),
    ],
    short: 'Grip-first trail shoe with a rock plate and drainage mesh.',
    description:
      'For fire roads and muddy singletrack: the Trailbound adds a rock plate underfoot, 5mm lugs and a drainage mesh that empties water fast.',
    details: [
      'Abrasion-resistant ripstop upper',
      'TPU rock plate',
      '5mm multi-directional lugs',
      'Drainage mesh and quick-dry lining',
      'Designed in Copenhagen',
    ],
  },

  {
    id: 'vel-dune-sandal',
    name: 'Dune Leather Sandal',
    brand: 'VELMONT',
    category: 'sandals',
    gender: 'Unisex',
    price: 129,
    compareAt: 159,
    rating: 4.6,
    reviews: 118,
    tags: ['sale'],
    badge: 'Sale',
    stock: 25,
    colors: ['Camel', 'Espresso'],
    sizes: ALL_SIZES,
    images: [
      shot('1542840410-3092f99611a3'),
      shot('1603487742131-4160ec999306'),
      shot('1562183241-b937e95585b6'),
    ],
    short: 'Two-strap leather sandals with a moulded cork footbed.',
    description:
      'The Dune pairs vegetable-tanned leather straps with a moulded cork footbed that shapes to your foot over a summer of wear.',
    details: [
      'Vegetable-tanned leather straps',
      'Moulded cork and latex footbed',
      'Adjustable antique brass buckles',
      'EVA outsole with rubber grip pads',
      'Made in Portugal',
    ],
  },
  {
    id: 'vel-coast-slide',
    name: 'Coast Leather Slide',
    brand: 'VELMONT',
    category: 'sandals',
    gender: 'Unisex',
    price: 99,
    compareAt: null,
    rating: 4.4,
    reviews: 92,
    tags: [],
    badge: null,
    stock: 30,
    colors: ['Ivory', 'Camel', 'Onyx'],
    sizes: ALL_SIZES,
    images: [
      shot('1603487742131-4160ec999306'),
      shot('1542840410-3092f99611a3'),
      shot('1605812860427-4024433a70fd'),
    ],
    short: 'A padded leather slide for poolside and pavement alike.',
    description:
      'Simple, soft and sturdy — the Coast slide has a padded leather strap and a lightly treaded sole so it works far beyond the beach.',
    details: [
      'Padded leather strap',
      'Contoured EVA footbed',
      'Treaded rubber outsole',
      'Water-resistant finish',
      'Made in Portugal',
    ],
  },
  {
    id: 'vel-isla-woven',
    name: 'Isla Woven Sandal',
    brand: 'VELMONT',
    category: 'sandals',
    gender: 'Women',
    price: 149,
    compareAt: null,
    rating: 4.7,
    reviews: 64,
    tags: ['new'],
    badge: 'New',
    stock: 16,
    colors: ['Sand', 'Bone', 'Copper'],
    sizes: HALF_EXTRA,
    images: [
      shot('1562183241-b937e95585b6'),
      shot('1542840410-3092f99611a3'),
      shot('1603487742131-4160ec999306'),
    ],
    short: 'Hand-woven leather straps on a wedge sole.',
    description:
      'The Isla is hand-woven by a small workshop outside Porto — soft leather strips over a gentle 40mm wedge that lifts without strain.',
    details: [
      'Hand-woven leather straps',
      '40mm cork wedge',
      'Ankle strap with concealed elastic',
      'Leather-lined footbed',
      'Made in Portugal',
    ],
  },

  {
    id: 'vel-maison-oxford',
    name: 'Maison Hand-Finished Oxford',
    brand: 'VELMONT ATELIER',
    category: 'luxury',
    gender: 'Men',
    price: 690,
    compareAt: null,
    rating: 5.0,
    reviews: 42,
    tags: ['bestseller'],
    badge: 'Atelier',
    stock: 4,
    colors: ['Espresso', 'Bordeaux'],
    sizes: [40, 41, 42, 43, 44, 45],
    images: [
      shot('1525966222134-fcfa99b8ae77'),
      shot('1531310197839-ccf54634509e'),
      shot('1560343090-f0409e92791a'),
    ],
    short: 'A numbered, hand-welted Oxford from the VELMONT atelier.',
    description:
      'Each Maison Oxford is lasted and finished by a single maker, numbered on the waist and delivered with a handwritten card. Hand-welted, museum-calf leather, and a patina built over three days of brushing.',
    details: [
      'Museum-finish French calf leather',
      'Hand-welted construction, single maker',
      'Hand-burnished patina, three-day finish',
      'Numbered and signed on the waist',
      'Includes cedar trees and flannel bags',
      'Made in England — limited to 60 pairs a year',
    ],
  },
  {
    id: 'vel-heritage-cordovan',
    name: 'Heritage Cordovan Boot',
    brand: 'VELMONT ATELIER',
    category: 'luxury',
    gender: 'Unisex',
    price: 850,
    compareAt: 990,
    rating: 4.9,
    reviews: 31,
    tags: ['sale'],
    badge: 'Atelier',
    stock: 3,
    colors: ['Bordeaux', 'Espresso', 'Onyx'],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    images: [
      shot('1512374382149-233c42b6a83b'),
      shot('1638247025967-b4e38f787b76'),
      shot('1520639888713-7851133b1ed0'),
    ],
    short: 'Shell cordovan, hand-welted, made to be resoled for decades.',
    description:
      'Shell cordovan is the rarest leather we use — dense, glossy and near-impossible to crease. Our Heritage boot is hand-welted on a heavy last and finished with a double leather sole.',
    details: [
      'Horween shell cordovan upper',
      'Hand-welted construction',
      'Double leather sole and stacked heel',
      'Brass eyelets and speed hooks',
      'Numbered and signed on the waist',
      'Made in England — limited to 40 pairs a year',
    ],
  },
]

export const COLLECTIONS = {
  bestsellers: {
    title: 'Bestsellers',
    subtitle: 'The pieces our customers return for',
    productIds: [
      'vel-aurelia-low',
      'vel-belgrave-oxford',
      'vel-sienna-loafer',
      'vel-nordal-chelsea',
      'vel-velocity-knit',
      'vel-court-meridian',
    ],
  },
  new: {
    title: 'New Arrivals',
    subtitle: 'Fresh from the atelier this season',
    productIds: [
      'vel-atelier-canvas',
      'vel-riviera-court',
      'vel-vesper-suede',
      'vel-terra-chukka',
      'vel-trailbound',
      'vel-isla-woven',
    ],
  },
  sale: {
    title: 'The Sale Room',
    subtitle: 'Reduced while stock lasts',
    productIds: [
      'vel-aurelia-low',
      'vel-linea-runner',
      'vel-belgrave-oxford',
      'vel-marlowe-dress',
      'vel-harbour-tassel',
      'vel-highland-boot',
      'vel-velocity-knit',
      'vel-dune-sandal',
      'vel-heritage-cordovan',
    ],
  },
}

/* ------------------------------ selectors ------------------------------ */

export const getProductById = (id) => PRODUCTS.find((p) => p.id === id) || null

export const getProductsByIds = (ids = []) =>
  ids.map((id) => getProductById(id)).filter(Boolean)

export const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug) || null

export const getByTag = (tag, limit) => {
  const list = PRODUCTS.filter((p) => p.tags.includes(tag))
  return typeof limit === 'number' ? list.slice(0, limit) : list
}

export const getByCategory = (slug) => PRODUCTS.filter((p) => p.category === slug)

export const getRelated = (product, limit = 4) => {
  if (!product) return []
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  )
  const rest = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category !== product.category,
  )
  return [...sameCategory, ...rest].slice(0, limit)
}

export const getPriceRange = () => {
  const prices = PRODUCTS.map((p) => p.price)
  return { min: Math.min(...prices), max: Math.max(...prices) }
}

export const getAllSizes = () =>
  [...new Set(PRODUCTS.flatMap((p) => p.sizes))].sort((a, b) => a - b)

export const getAllColors = () => [...new Set(PRODUCTS.flatMap((p) => p.colors))].sort()

export const searchProducts = (query) => {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return PRODUCTS.filter((p) => {
    const category = getCategory(p.category)
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (category && category.name.toLowerCase().includes(q)) ||
      p.colors.some((c) => c.toLowerCase().includes(q)) ||
      p.short.toLowerCase().includes(q)
    )
  })
}

export const money = (value) =>
  `$${Number(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

export const discountPercent = (price, compareAt) =>
  compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0
