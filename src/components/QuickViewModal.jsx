import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  colorHex,
  discountPercent,
  getProductById,
  money,
} from '../data/products.js'
import { useStore } from '../context/StoreContext.jsx'
import { CloseIcon, HeartIcon, MinusIcon, PlusIcon } from './Icons.jsx'
import ImageWithFallback from './ImageWithFallback.jsx'
import Stars from './Stars.jsx'

/**
 * Quick view modal — lets shoppers pick size/colour and add to bag
 * without leaving the grid.
 */
export default function QuickViewModal() {
  const { quickViewId, setQuickViewId, addToCart, toggleWishlist, isWishlisted } =
    useStore()
  const product = quickViewId ? getProductById(quickViewId) : null

  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const open = Boolean(product)

  // Reset selections whenever a new product is opened.
  useEffect(() => {
    if (product) {
      setSize(null)
      setColor(product.colors[0])
      setQty(1)
      setActiveImage(0)
    }
  }, [product])

  // Close on Escape + lock background scroll while open.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setQuickViewId(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, setQuickViewId])

  if (!product) return null

  const discount = discountPercent(product.price, product.compareAt)
  const wishlisted = isWishlisted(product.id)

  const handleAdd = () => {
    if (!size) return
    addToCart(product, { size, color, quantity: qty })
    setQuickViewId(null)
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-teal-900/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view — ${product.name}`}
      onClick={() => setQuickViewId(null)}
    >
      <div
        className="animate-fadeUp max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-sm bg-white shadow-modal sm:rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid gap-0 sm:grid-cols-2">
          {/* Gallery */}
          <div className="bg-ivory p-4 sm:p-6">
            <ImageWithFallback
              src={product.images[activeImage]}
              alt={product.name}
              wrapperClassName="aspect-square w-full rounded-sm"
              className="h-full w-full object-cover"
            />
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1} of ${product.images.length}`}
                  aria-current={activeImage === i}
                  className={`h-16 w-16 overflow-hidden rounded-sm border transition-all ${
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
            </div>
          </div>

          {/* Details */}
          <div className="relative flex flex-col p-5 sm:p-7">
            <button
              type="button"
              onClick={() => setQuickViewId(null)}
              className="absolute right-4 top-4 rounded-sm p-1.5 text-softgray transition-colors hover:bg-ivory hover:text-teal"
              aria-label="Close quick view"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper-600">
              {product.brand}
            </p>
            <h2 className="mt-1 pr-8 font-display text-2xl text-teal">{product.name}</h2>
            <div className="mt-2">
              <Stars rating={product.rating} reviews={product.reviews} />
            </div>

            <div className="mt-3 flex items-baseline gap-2.5">
              <span className="text-xl font-semibold text-teal">{money(product.price)}</span>
              {product.compareAt && (
                <>
                  <span className="text-sm text-softgray line-through">
                    {money(product.compareAt)}
                  </span>
                  <span className="badge bg-sale/10 text-sale">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="mt-3 text-sm leading-relaxed text-softgray">{product.short}</p>

            {/* Colour */}
            <fieldset className="mt-5">
              <legend className="label-field">
                Colour — <span className="font-normal normal-case tracking-normal text-softgray">{color}</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    aria-pressed={color === c}
                    aria-label={`Colour ${c}`}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                      color === c ? 'border-teal' : 'border-line hover:border-teal/50'
                    }`}
                  >
                    <span
                      className="h-5 w-5 rounded-full border border-line/70"
                      style={{ backgroundColor: colorHex[c] || '#E5E2DB' }}
                    />
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Size */}
            <fieldset className="mt-5">
              <legend className="label-field">Select size (EU)</legend>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={`h-10 min-w-[2.75rem] rounded-sm border px-2 text-sm font-medium transition-all ${
                      size === s
                        ? 'border-forest bg-forest text-white'
                        : 'border-line bg-white text-teal hover:border-teal'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {!size && (
                <p className="mt-2 text-xs text-softgray">
                  Please choose a size to continue.
                </p>
              )}
            </fieldset>

            {/* Quantity + actions */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center rounded-sm border border-line">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-3 text-teal transition-colors hover:bg-ivory disabled:opacity-40"
                  aria-label="Decrease quantity"
                  disabled={qty <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-9 text-center text-sm font-semibold" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="p-3 text-teal transition-colors hover:bg-ivory disabled:opacity-40"
                  aria-label="Increase quantity"
                  disabled={qty >= 10}
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={!size}
                className="btn-primary flex-1"
              >
                Add to bag
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-pressed={wishlisted}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-sm border transition-all ${
                  wishlisted
                    ? 'border-copper bg-copper text-white'
                    : 'border-line text-teal hover:border-teal'
                }`}
              >
                <HeartIcon filled={wishlisted} className="h-5 w-5" />
              </button>
            </div>

            <Link
              to={`/product/${product.id}`}
              onClick={() => setQuickViewId(null)}
              className="link-underline mt-5 self-start text-xs font-semibold text-teal"
            >
              View full product details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
