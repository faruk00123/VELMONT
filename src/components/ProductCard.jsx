import { Link } from 'react-router-dom'
import { colorHex, discountPercent, money } from '../data/products.js'
import { useStore } from '../context/StoreContext.jsx'
import { EyeIcon, HeartIcon } from './Icons.jsx'
import ImageWithFallback from './ImageWithFallback.jsx'
import Stars from './Stars.jsx'

/**
 * Product card used across home, shop, wishlist and related sections.
 * Quick view opens a modal; the whole card links through to the PDP.
 */
export default function ProductCard({ product, eager = false, compact = false }) {
  const { toggleWishlist, isWishlisted, setQuickViewId } = useStore()
  const wishlisted = isWishlisted(product.id)
  const discount = discountPercent(product.price, product.compareAt)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative">
        <Link
          to={`/product/${product.id}`}
          className="block focus-visible:outline-none"
          aria-label={`View ${product.name}`}
        >
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            eager={eager}
            wrapperClassName={compact ? 'aspect-square w-full' : 'aspect-[4/5] w-full'}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-2">
          {product.badge && (
            <span
              className={`badge ${
                product.badge === 'Sale'
                  ? 'bg-sale text-white'
                  : product.badge === 'New'
                    ? 'bg-forest text-white'
                    : product.badge === 'Atelier'
                      ? 'bg-copper text-white'
                      : 'bg-teal text-ivory'
              }`}
            >
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="badge bg-white text-sale ring-1 ring-sale/25">
              −{discount}%
            </span>
          )}
        </div>

        {/* Wishlist toggle */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          aria-pressed={wishlisted}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition-all duration-200 ${
            wishlisted
              ? 'border-copper bg-copper text-white'
              : 'border-line bg-white/90 text-teal hover:border-teal'
          }`}
        >
          <HeartIcon filled={wishlisted} className="h-4 w-4" />
        </button>

        {/* Quick view — revealed on hover, always available via keyboard focus */}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <button
            type="button"
            onClick={() => setQuickViewId(product.id)}
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-white/95 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-teal shadow-card backdrop-blur transition-colors hover:bg-teal hover:text-ivory"
          >
            <EyeIcon className="h-4 w-4" />
            Quick view
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-softgray">
          {product.brand}
        </p>
        <h3 className="mt-1 font-sans text-sm font-semibold leading-snug text-teal sm:text-[15px]">
          <Link to={`/product/${product.id}`} className="hover:text-copper-600">
            {product.name}
          </Link>
        </h3>

        <div className="mt-2">
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>

        {!compact && product.short && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-softgray">
            {product.short}
          </p>
        )}

        <div className="mt-3 flex items-center gap-1.5" aria-hidden="true">
          {product.colors.slice(0, 4).map((c) => (
            <span
              key={c}
              className="h-3.5 w-3.5 rounded-full border border-line"
              style={{ backgroundColor: colorHex[c] || '#E5E2DB' }}
              title={c}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-softgray">+{product.colors.length - 4}</span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-teal">
              {money(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-xs text-softgray line-through">
                {money(product.compareAt)}
              </span>
            )}
          </div>
          <span className="text-[11px] uppercase tracking-wider text-softgray">
            {product.gender}
          </span>
        </div>
      </div>
    </article>
  )
}
