# VELMONT — Premium Footwear E-commerce Frontend

A complete, responsive, frontend-only footwear storefront built with **HTML5 + React (JSX) + Tailwind CSS + Vite**.

VELMONT is an original brand identity: **Deep Teal `#174E50`** leads the header, footer, navigation and headings, set against **Champagne Ivory `#F7F3EB`** and **Pure White `#FFFFFF`** surfaces, with **Copper Gold `#C58B52`** reserved for CTAs and premium accents, **Forest Green `#315B49`** for selected sizes and success states, and **Sale Red `#B83232`** only for discounts. No pure black or charcoal is used anywhere.

> **This is a demonstration.** There is no backend, database, API, authentication or payment gateway. Nothing is transmitted anywhere, and no real order or payment ever occurs.

---

## Quick start

```bash
# 1. install dependencies
npm install

# 2. start the dev server (http://localhost:5173)
npm run dev

# 3. production build + local preview
npm run build
npm run preview
```

### Tests

```bash
npm test            # logic + all routes + interaction flows
npm run test:logic  # 40 assertions over catalogue, pricing, delivery, validation
npm run test:routes # renders all 25 routes through Vite's SSR pipeline
npm run test:flows  # drives 8 real user journeys in jsdom (79 assertions)
```

---

## What's included

### Pages (client-side routed, no broken links)

| Route | Page |
| --- | --- |
| `/` | Homepage — hero, categories, bestsellers, new arrivals, promo banners, brand story, sale, journal, newsletter |
| `/shop` | Full catalogue with search, filters, sorting |
| `/shop/:category` | `sneakers`, `formal`, `loafers`, `boots`, `running`, `sandals`, `luxury` |
| `/shop/sale` | The sale room |
| `/product/:id` | Product details with gallery, size/colour selection, accordions, related products |
| `/cart` | Shopping bag with quantity controls, promo codes, totals |
| `/checkout` | Four-step demo checkout with validation |
| `/order-confirmation` | Simulated order summary and demo disclaimer |
| `/wishlist` | Saved items, quick add, recently viewed |
| `/account` | Local-only demo profile and order history |
| `/about`, `/contact`, `/faq`, `/shipping-returns`, `/privacy`, `/terms` | Content pages |
| `*` | 404 page |

### Interactions that actually work

- **Navigation** — desktop mega-menu, mobile drawer, breadcrumbs, sticky Deep Teal header, skip link.
- **Search** — header search overlay with live results, plus in-collection search on the shop page.
- **Filtering** — multi-select category, size and colour facets, price bands and a max-price slider, matching facet counts.
- **Sorting** — featured, price (both directions), rating and alphabetical.
- **Quick view** — modal from any product card with its own gallery, size and colour pickers.
- **Cart** — add/remove, quantity stepper (1–10), promo codes (`VELMONT10`, `ATELIER15`), free-delivery threshold, live totals.
- **Wishlist** — toggle from cards, product pages, cart and wishlist page.
- **Checkout** — per-step validation, three delivery methods, gift wrapping, review step, generated demo order number.
- **Forms** — contact, newsletter and profile forms validate locally and state clearly that nothing is sent.
- **Toasts** — notifications for every meaningful action.
- **Persistence** — cart, wishlist and recently viewed live in `localStorage` and survive refresh.
- **Empty states** — cart, wishlist, search, filters and 404 all handled.

### Accessibility & SEO

Semantic HTML5 landmarks, one `<h1>` per page, labelled controls, `aria-pressed`/`aria-expanded`/`aria-current` state, keyboard-operable modals (Escape to close, focus management, scroll locking), visible focus rings, alt text on imagery, a skip-to-content link, and per-route document titles plus meta descriptions.

---

## Project structure

```
├── index.html                 # HTML5 shell, fonts, base meta
├── tailwind.config.js         # Brand palette, fonts, shadows, animations
├── postcss.config.js
├── vite.config.js
├── public/favicon.svg
├── scripts/                   # Test harnesses (see "Tests" above)
│   ├── logic-test.mjs
│   ├── smoke-entry.jsx
│   ├── smoke-test.mjs
│   ├── flow-entry.jsx
│   └── flow-test.mjs
└── src
    ├── main.jsx               # Router + store providers
    ├── App.jsx                # Route table
    ├── index.css              # Tailwind layers, brand tokens, component classes
    ├── components/            # 20 reusable components
    │   ├── Layout.jsx  Navbar.jsx  Footer.jsx  SearchOverlay.jsx
    │   ├── ProductCard.jsx  ProductGrid.jsx  QuickViewModal.jsx
    │   ├── ShopFilters.jsx  PageHeader.jsx  PolicyLayout.jsx
    │   ├── Breadcrumbs.jsx  SectionHeading.jsx  Stars.jsx
    │   ├── EmptyState.jsx  NewsletterForm.jsx  ToastStack.jsx
    │   ├── ImageWithFallback.jsx  Seo.jsx  ScrollToTop.jsx  Icons.jsx
    ├── context/StoreContext.jsx  # Cart, wishlist, toasts, recently viewed
    ├── data/products.js          # 24 products, 7 categories, selectors
    ├── hooks/useLocalStorage.js
    ├── pages/                    # 15 page modules (16 routes)
    └── utils/
        ├── commerce.js           # Delivery options, tax, order numbers
        └── validation.js         # Form validation helpers
```

---

## Brand tokens

Defined once in `tailwind.config.js` and used as utilities throughout:

| Token | Value | Used for |
| --- | --- | --- |
| `teal` | `#174E50` | Header, footer, navigation, headings, primary buttons |
| `ivory` | `#F7F3EB` | Page background, hero and editorial sections |
| `white` | `#FFFFFF` | Product cards, modals, forms |
| `copper` | `#C58B52` | CTA buttons, premium badges, section eyebrows |
| `forest` | `#315B49` | Secondary buttons, selected sizes, success states |
| `sale` | `#B83232` | Discount labels and sale prices only |
| `softgray` | `#6B6B6B` | Secondary text |
| `line` | `#E5E2DB` | Borders, dividers, input outlines |

Typography: **Inter** for body, navigation, buttons and prices; **Playfair Display** for headings and editorial copy.

---

## What is stored locally

| Key | Contents |
| --- | --- |
| `velmont.cart` | Product ID, size, colour, quantity |
| `velmont.wishlist` | Saved product IDs |
| `velmont.recentlyViewed` | Last eight product IDs |
| `velmont.demoProfile` | First name and email only |
| `velmont.lastOrder` | Demo order number, items, totals, city, country, first name, delivery method, date |

Address, phone number, delivery notes and any payment information are **never** persisted. The checkout keeps them in page memory only and discards them on navigation.

---

## Known limitations

- **No backend.** Products are static sample data; there is no inventory, search index or order system.
- **Simulated checkout.** The order number and confirmation are generated in the browser; no payment field exists and no transaction occurs.
- **No real accounts.** The account page is a local convenience record — there is no authentication.
- **Remote imagery.** Product photography and the two fonts load from CDNs, so the demo needs an internet connection to look its best. If an image fails, `ImageWithFallback` renders a branded placeholder rather than a broken image.
- **Single browser.** Because everything is local to one browser, a bag built on one device does not appear on another.
- **Test scope.** Automated tests cover the catalogue logic, rendering of all routes and the main interaction flows in jsdom. They do not cover pixel-level visual regression across real browsers.
- Product names, prices, copy, reviews and the VELMONT brand are fictional and created for this demonstration.
# VELMONT
