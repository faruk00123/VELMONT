import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  colorHex,
  discountPercent,
  getProductById,
  getRelated,
  money,
} from '../data/products.js'
import { useStore } from '../context/StoreContext.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Seo from '../components/Seo.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Stars from '../components/Stars.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import {
  BagIcon,
  CheckIcon,
  ChevronDown,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  RefreshIcon,
  ShieldIcon,
  TruckIcon,
} from '../components/Icons.jsx'

const SIZING_NOTE =
  'This style runs true to size. If you are between sizes, we suggest taking the larger.'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    markViewed,
    setQuickViewId,
  } = useStore()

  const product = useMemo(() => getProductById(id), [id])

  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [sizeError, setSizeError] = useState(false)
  const [openSection, setOpenSection] = useState('description')

  // Reset selection when navigating between products.
  useEffect(() => {
    if (product) {
      setSize(null)
      setColor(product.colors[0])
      setQty(1)
      setActiveImage(0)
      setSizeError(false)
      markViewed(product.id)
    }
  }, [product, markViewed])

  if (!product) {
    return (
      <>
        <Seo title="Product not found" />
        <div className="container-site py-20">
          <EmptyState
            title="We couldn’t find that product"
            message="The link may be out of date, or the style may have been retired from the collection."
            actionLabel="Shop all footwear"
            actionTo="/shop"
            secondaryLabel="Back to home"
            secondaryTo="/"
          />
        </div>
      </>
    )
  }

  const discount = discountPercent(product.price, product.compareAt)
  const wishlisted = isWishlisted(product.id)
  const related = getRelated(product, 4)

  const handleAddToBag = () => {
    if (!size) {
      setSizeError(true)
      return
    }
    addToCart(product, { size, color, quantity: qty })
    setSizeError(false)
  }

  const handleBuyNow = () => {
    if (!size) {
      setSizeError(true)
      return
    }
    addToCart(product, { size, color, quantity: qty })
    navigate('/checkout')
  }

  const sections = [
    {
      id: 'description',
      title: 'Description',
      body: (
        <div className="space-y-3 text-sm leading-relaxed text-softgray">
          <p>{product.description}</p>
          <p>{SIZING_NOTE}</p>
        </div>
      ),
    },
    {
      id: 'details',
      title: 'Materials & construction',
      body: (
        <ul className="space-y-2.5">
          {product.details.map((detail) => (
            <li key={detail} className="flex items-start gap-2.5 text-sm text-softgray">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              {detail}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'delivery',
      title: 'Delivery & returns',
      body: (
        <div className="space-y-3 text-sm leading-relaxed text-softgray">
          <p>
            Complimentary carbon-neutral standard delivery on orders over $150, arriving in
            4–6 business days. Express delivery (1–2 business days) is available at checkout.
          </p>
          <p>
            Returns are free within 30 days, worn or unworn. This storefront is a demo, so no
            parcel will actually be dispatched.
          </p>
        </div>
      ),
    },
  ]

  return (
    <>
      <Seo
        title={product.name}
        description={`${product.name} by ${product.brand} — ${product.short}`}
      />

      <PageHeader
        eyebrow={product.brand}
        title={product.name}
        breadcrumbs={[
          { label: 'Shop', to: '/shop' },
          { label: product.category, to: `/shop/${product.category}` },
          { label: product.name },
        ]}
        compact
      />

      <div className="container-site py-8 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ------------------------------ Gallery ------------------------------ */}
          <div>
            <div className="relative overflow-hidden rounded-sm border border-line bg-white">
              <ImageWithFallback
                src={product.images[activeImage]}
                alt={`${product.name} — view ${activeImage + 1}`}
                eager
                wrapperClassName="aspect-square w-full"
                className="h-full w-full object-cover"
              />
              {discount > 0 && (
                <span className="badge absolute left-4 top-4 bg-sale text-white">
                  −{discount}% today
                </span>
              )}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-pressed={wishlisted}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                  wishlisted
                    ? 'border-copper bg-copper text-white'
                    : 'border-line bg-white/90 text-teal hover:border-teal'
                }`}
              >
                <HeartIcon filled={wishlisted} className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 flex gap-3" role="group" aria-label="Product image thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-current={activeImage === i}
                  className={`h-20 w-20 overflow-hidden rounded-sm border-2 transition-all ${
                    activeImage === i ? 'border-teal' : 'border-line hover:border-teal/50'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt=""
                    wrapperClassName="h-full w-full"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
              <button
                type="button"
                onClick={() => setQuickViewId(product.id)}
                className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-sm border-2 border-dashed border-line text-[10px] font-semibold uppercase tracking-wider text-softgray transition-colors hover:border-teal hover:text-teal"
              >
                Quick
                <br />
                view
              </button>
            </div>
          </div>

          {/* ------------------------------ Details ------------------------------ */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-copper-600">
              {product.brand} · {product.gender}
            </p>
            <h2 className="mt-2 font-display text-3xl text-teal sm:text-4xl">
              {product.name}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Stars rating={product.rating} reviews={product.reviews} size="md" />
              <span className="text-xs text-softgray">
                {product.reviews} verified reviews
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-semibold text-teal">{money(product.price)}</span>
              {product.compareAt && (
                <>
                  <span className="text-base text-softgray line-through">
                    {money(product.compareAt)}
                  </span>
                  <span className="badge bg-sale/10 text-sale">Save {discount}%</span>
                </>
              )}
            </div>
            <p className="mt-1.5 text-xs text-softgray">
              Tax included. Delivery calculated at checkout.
            </p>

            <p className="mt-5 text-sm leading-relaxed text-softgray">{product.short}</p>

            {/* Colour */}
            <fieldset className="mt-7">
              <legend className="label-field">
                Colour —{' '}
                <span className="font-normal normal-case tracking-normal text-softgray">
                  {color}
                </span>
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    aria-pressed={color === c}
                    aria-label={`Colour ${c}`}
                    title={c}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      color === c ? 'border-teal' : 'border-line hover:border-teal/50'
                    }`}
                  >
                    <span
                      className="h-6 w-6 rounded-full border border-line/70"
                      style={{ backgroundColor: colorHex[c] || '#E5E2DB' }}
                    />
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Size */}
            <fieldset className="mt-6">
              <legend className="flex w-full items-center justify-between">
                <span className="label-field mb-0">Select size (EU)</span>
                <span className="text-xs text-softgray">Size guide below</span>
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s)
                      setSizeError(false)
                    }}
                    aria-pressed={size === s}
                    className={`h-11 min-w-[3rem] rounded-sm border px-3 text-sm font-medium transition-all ${
                      size === s
                        ? 'border-forest bg-forest text-white'
                        : 'border-line bg-white text-teal hover:border-teal'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {sizeError && (
                <p role="alert" className="mt-2 text-xs font-medium text-sale">
                  Please select a size before adding to bag.
                </p>
              )}

              {product.stock <= 8 && (
                <p className="mt-2 text-xs font-medium text-copper-600">
                  Only {product.stock} pairs left in this run.
                </p>
              )}
            </fieldset>

            {/* Quantity + CTA */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="flex items-center justify-between rounded-sm border border-line bg-white sm:w-auto">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="p-3.5 text-teal transition-colors hover:bg-ivory disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="min-w-[3rem] text-center text-sm font-semibold" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  disabled={qty >= 10}
                  className="p-3.5 text-teal transition-colors hover:bg-ivory disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>

              <button type="button" onClick={handleAddToBag} className="btn-primary flex-1 py-3.5">
                <BagIcon className="h-5 w-5" />
                Add to bag
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-pressed={wishlisted}
                className={`btn px-4 ${
                  wishlisted
                    ? 'border border-copper bg-copper text-white'
                    : 'border border-line bg-white text-teal hover:border-teal'
                }`}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <HeartIcon filled={wishlisted} className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="btn-outline mt-3 w-full py-3.5"
            >
              Buy now — go to demo checkout
            </button>

            {/* Service notes */}
            <ul className="mt-7 grid gap-3 rounded-sm border border-line bg-white p-4 sm:grid-cols-3">
              {[
                { icon: TruckIcon, title: 'Free delivery', copy: 'Orders over $150' },
                { icon: RefreshIcon, title: '30-day returns', copy: 'Worn or unworn' },
                { icon: ShieldIcon, title: 'Secure demo', copy: 'No card charged' },
              ].map(({ icon: Icon, title, copy }) => (
                <li key={title} className="flex items-start gap-2.5">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                  <span>
                    <span className="block text-xs font-semibold text-teal">{title}</span>
                    <span className="block text-[11px] text-softgray">{copy}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Accordions */}
            <div className="mt-7 border-t border-line">
              {sections.map((section) => {
                const open = openSection === section.id
                return (
                  <div key={section.id} className="border-b border-line">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenSection(open ? '' : section.id)}
                        aria-expanded={open}
                        aria-controls={`panel-${section.id}`}
                        className="flex w-full items-center justify-between py-4 text-left font-sans text-sm font-semibold text-teal transition-colors hover:text-copper-600"
                      >
                        {section.title}
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </h3>
                    {open && (
                      <div id={`panel-${section.id}`} className="pb-5">
                        {section.body}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ---------------------------- Related ---------------------------- */}
        <section className="mt-16 border-t border-line pt-12">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="eyebrow">Complete the look</span>
              <h2 className="mt-2 font-display text-2xl text-teal sm:text-3xl">
                You may also like
              </h2>
            </div>
            <Link
              to={`/shop/${product.category}`}
              className="link-underline hidden text-sm font-semibold text-teal sm:block"
            >
              More {product.category}
            </Link>
          </div>
          <ProductGrid products={related} />
        </section>
      </div>
    </>
  )
}
