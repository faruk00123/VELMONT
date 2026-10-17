import { Link } from 'react-router-dom'
import {
  CATEGORIES,
  COLLECTIONS,
  PRODUCTS,
  getByTag,
  getProductsByIds,
} from '../data/products.js'
import ProductGrid from '../components/ProductGrid.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { CheckIcon, MailIcon, SparkIcon } from '../components/Icons.jsx'

const PROMISES = [
  'Complimentary carbon-neutral delivery over $150',
  'Free 30-day returns, worn or unworn',
  'Hand-finished in Portugal, Spain and England',
]

const VALUES = [
  {
    title: 'Cut, not pressed',
    copy:
      'Every upper is cut from full-grain hides and closed by hand. Nothing is bonded, nothing is rushed.',
  },
  {
    title: 'Built to be repaired',
    copy:
      'Goodyear-welted and Blake-stitched construction means your shoes can be resoled for decades to come.',
  },
  {
    title: 'Quiet by design',
    copy:
      'No loud logos, no trend cycles — just silhouettes that sit comfortably in any decade.',
  },
]

export default function Home() {
  const bestsellers = getByTag('bestseller', 8)
  const newArrivals = getProductsByIds(COLLECTIONS.new.productIds)
  const salePicks = getByTag('sale', 4)
  const heroProduct = PRODUCTS.find((p) => p.id === 'vel-aurelia-low') || PRODUCTS[0]

  return (
    <>
      {/* ============================== HERO ============================== */}
      <section className="relative isolate overflow-hidden bg-teal text-ivory">
        <img
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1800&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal via-teal/95 to-teal-700/70" />

        <div className="container-site relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="animate-fadeUp">
            <span className="eyebrow text-copper-300">Autumn / Winter Collection</span>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Footwear with the
              <span className="block italic text-copper-300">patience of craft</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-ivory/75 sm:text-base">
              VELMONT makes a small number of things extremely well. Full-grain
              leathers, hand-closed uppers and soles that can be renewed — designed
              in Copenhagen, finished by makers who have done this for decades.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="btn-copper px-8 py-3.5">
                Shop the collection
              </Link>
              <Link
                to="/shop/luxury"
                className="btn border border-ivory/30 px-8 py-3.5 text-ivory hover:bg-ivory hover:text-teal"
              >
                Explore the atelier line
              </Link>
            </div>

            <ul className="mt-10 flex flex-col gap-2.5">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex items-center gap-2.5 text-sm text-ivory/70">
                  <CheckIcon className="h-4 w-4 shrink-0 text-copper-300" />
                  {promise}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero product card */}
          <div className="relative animate-fadeUp lg:justify-self-end">
            <div className="mx-auto max-w-md rounded-sm bg-white/95 p-3 shadow-modal backdrop-blur">
              <img
                src={heroProduct.images[0]}
                alt={heroProduct.name}
                className="aspect-[4/3] w-full rounded-sm object-cover"
              />
              <div className="flex items-end justify-between gap-4 p-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper-600">
                    Editor’s pick
                  </p>
                  <p className="mt-1 font-display text-xl text-teal">{heroProduct.name}</p>
                  <p className="mt-1 text-xs text-softgray">{heroProduct.short}</p>
                </div>
                <Link
                  to={`/product/${heroProduct.id}`}
                  className="btn-primary shrink-0 px-5 py-2.5 text-xs"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================== PROMISE ROW ========================== */}
      <section className="border-b border-line bg-ivory">
        <div className="container-site grid gap-4 py-6 text-center sm:grid-cols-3">
          {[
            ['Carbon-neutral delivery', 'Free over $150'],
            ['30-day returns', 'Worn or unworn'],
            ['Resole service', 'For the life of the shoe'],
          ].map(([title, copy]) => (
            <div key={title} className="flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-2.5">
              <SparkIcon className="h-4 w-4 text-copper" />
              <p className="text-sm font-semibold text-teal">{title}</p>
              <p className="text-xs text-softgray">· {copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================== CATEGORIES ========================== */}
      <section className="container-site py-14 sm:py-16">
        <div className="flex flex-col gap-2 text-center">
          <span className="eyebrow">Shop by category</span>
          <h2 className="font-display text-3xl text-teal sm:text-4xl">
            Seven ways to walk
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-softgray">
            From court shoes to cordovan boots, every category is built on the same
            last-making principles.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <CategoryTile key={cat.slug} category={cat} large />
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.slice(4).map((cat) => (
            <CategoryTile key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* ========================== BESTSELLERS ========================== */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-site">
          <SectionHeading
            eyebrow="Most loved"
            title="Bestsellers"
            subtitle="The pieces our customers return for, season after season."
            action={{ label: 'Shop all footwear', to: '/shop' }}
          />
          <ProductGrid products={bestsellers.slice(0, 4)} />
          <div className="mt-8 text-center sm:hidden">
            <Link to="/shop" className="btn-outline">
              Shop all footwear
            </Link>
          </div>
        </div>
      </section>

      {/* ======================== PROMO BANNERS ========================== */}
      <section className="container-site grid gap-5 py-14 sm:py-16 lg:grid-cols-2">
        <PromoBanner
          eyebrow="The atelier line"
          title="Numbered, signed, limited"
          copy="Hand-welted pieces from the VELMONT atelier — fewer than sixty pairs a year."
          to="/shop/luxury"
          cta="Enter the atelier"
          image="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80"
        />
        <PromoBanner
          dark={false}
          eyebrow="The sale room"
          title="Reduced, never compromised"
          copy="Selected styles from last season at up to 24% off, while stock lasts."
          to="/shop/sale"
          cta="Shop the sale"
          image="https://images.unsplash.com/photo-1465453869711-7e174808ace9?auto=format&fit=crop&w=1200&q=80"
        />
      </section>

      {/* ========================= NEW ARRIVALS ========================== */}
      <section className="container-site py-14 sm:py-16">
        <SectionHeading
          eyebrow="Just landed"
          title="New arrivals"
          subtitle="Fresh lasts and new leathers, added as the workshop finishes each run."
          action={{ label: 'See everything new', to: '/shop' }}
        />
        <ProductGrid products={newArrivals} />
      </section>

      {/* ========================== BRAND STORY ========================== */}
      <section className="bg-teal text-ivory">
        <div className="container-site grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1200&q=80"
              alt="A maker hand-finishing a leather boot in the VELMONT workshop"
              className="aspect-[4/3] w-full rounded-sm object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-4 hidden max-w-[220px] rounded-sm bg-ivory p-5 text-teal shadow-modal sm:block">
              <p className="font-display text-3xl leading-none">1962</p>
              <p className="mt-2 text-xs leading-relaxed text-softgray">
                The year our founding last was drawn — still in use today.
              </p>
            </div>
          </div>

          <div>
            <span className="eyebrow text-copper-300">Our story</span>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              We would rather make one good pair than twenty forgettable ones
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ivory/75">
              VELMONT began in a small Copenhagen workshop with a single last, a
              stack of vegetable-tanned hides and a stubborn idea: that shoes should
              outlive their trends. Six decades later we still work with family
              tanneries in France and Italy, and still close every upper by hand.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ivory/75">
              Around 70% of a VELMONT shoe can be rebuilt — soles, linings, welts —
              so the pair you buy today is the pair you keep.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-ivory/15 pt-6">
              {[
                ['30+', 'Years of practice'],
                ['4', 'Family workshops'],
                ['70%', 'Of each shoe rebuildable'],
              ].map(([stat, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl text-copper-300">{stat}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-wider text-ivory/60">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              to="/about"
              className="btn mt-8 border border-ivory/30 text-ivory hover:bg-ivory hover:text-teal"
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* ============================= VALUES ============================ */}
      <section className="container-site py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {VALUES.map((value, i) => (
            <div key={value.title} className="rounded-sm border border-line bg-white p-6 shadow-card">
              <span className="font-display text-3xl text-copper">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-sans text-base font-semibold text-teal">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-softgray">{value.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================== SALE ============================= */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-site">
          <SectionHeading
            eyebrow="While stock lasts"
            title="The sale room"
            subtitle="A short list of reduced styles — new pairs added every few weeks."
            action={{ label: 'Browse all reductions', to: '/shop/sale' }}
          />
          <ProductGrid products={salePicks} columns={4} />
        </div>
      </section>

      {/* ========================== JOURNAL TEASER ======================= */}
      <section className="container-site py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              tag: 'Care guide',
              title: 'How to keep full-grain leather looking new',
              copy: 'Four habits, one brush and ten minutes a month.',
              image:
                'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=900&q=80',
            },
            {
              tag: 'Workshop',
              title: 'Inside the Porto workshop where our loafers begin',
              copy: 'A morning with the makers who close every moccasin by hand.',
              image:
                'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=900&q=80',
            },
            {
              tag: 'Materials',
              title: 'Why we wait two months for shell cordovan',
              copy: 'The rarest leather we use, and why it is worth the wait.',
              image:
                'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=900&q=80',
            },
          ].map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-sm border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="eyebrow">{post.tag}</span>
                <h3 className="mt-2 font-sans text-base font-semibold leading-snug text-teal">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-softgray">{post.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ======================== NEWSLETTER BAND ======================== */}
      <section className="container-site pb-16">
        <div className="overflow-hidden rounded-sm border border-line bg-white shadow-card">
          <div className="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="eyebrow">The VELMONT letter</span>
              <h2 className="mt-3 font-display text-2xl text-teal sm:text-3xl">
                One considered email a month
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-softgray">
                Atelier notes, new lasts and quiet releases before they appear on the
                site. This is a demo form — nothing is stored or sent.
              </p>
            </div>
            <div className="rounded-sm bg-ivory p-5">
              <MailIcon className="h-6 w-6 text-copper" />
              <p className="mt-3 text-sm font-semibold text-teal">
                Join 4,200 readers
              </p>
              <Link to="/contact" className="btn-primary mt-4 w-full">
                Get in touch instead
              </Link>
              <p className="mt-2 text-center text-[11px] text-softgray">
                or subscribe from the footer
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* --------------------------- local sub-components -------------------------- */

function CategoryTile({ category, large = false }) {
  return (
    <Link
      to={`/shop/${category.slug}`}
      className={`group relative overflow-hidden rounded-sm bg-teal ${
        large ? 'aspect-[4/5]' : 'aspect-[16/10]'
      }`}
    >
      <img
        src={category.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/85 via-teal/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper-300">
          {category.tagline}
        </p>
        <h3 className="mt-1.5 font-display text-xl text-ivory sm:text-2xl">
          {category.name}
        </h3>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ivory">
          Shop now
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}

function PromoBanner({ eyebrow, title, copy, cta, to, image, dark = true }) {
  return (
    <div className="relative isolate overflow-hidden rounded-sm bg-teal">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-teal via-teal/85 to-teal/40" />
      <div className="relative p-8 sm:p-10">
        <span className="eyebrow text-copper-300">{eyebrow}</span>
        <h3 className="mt-3 max-w-sm font-display text-2xl text-ivory sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ivory/75">{copy}</p>
        <Link to={to} className="btn-copper mt-6">
          {cta}
        </Link>
      </div>
    </div>
  )
}
