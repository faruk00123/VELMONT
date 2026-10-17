import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, money, searchProducts } from '../data/products.js'
import { useStore } from '../context/StoreContext.jsx'
import { CloseIcon, SearchIcon } from './Icons.jsx'
import ImageWithFallback from './ImageWithFallback.jsx'

const QUICK_TERMS = ['Sneakers', 'Oxford', 'Chelsea boot', 'Runner', 'Loafer']

/**
 * Full-screen search overlay with live results as you type.
 */
export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const results = useMemo(() => searchProducts(query).slice(0, 6), [query])

  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      const t = window.setTimeout(() => inputRef.current?.focus(), 60)
      return () => window.clearTimeout(t)
    }
    return undefined
  }, [searchOpen])

  useEffect(() => {
    if (!searchOpen) return undefined
    const onKey = (e) => e.key === 'Escape' && setSearchOpen(false)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [searchOpen, setSearchOpen])

  if (!searchOpen) return null

  const hasQuery = query.trim().length > 0

  return (
    <div
      className="fixed inset-0 z-[90] bg-teal-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="animate-fadeUp mx-auto mt-0 w-full max-w-3xl bg-ivory p-5 shadow-modal sm:mt-16 sm:rounded-sm sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-teal">Search VELMONT</h2>
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="rounded-sm p-1.5 text-softgray transition-colors hover:text-teal"
            aria-label="Close search"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mt-4">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-softgray" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, category or colour…"
            aria-label="Search products by name, category or colour"
            className="input-field pl-12"
          />
        </div>

        {!hasQuery && (
          <div className="mt-5">
            <p className="eyebrow">Popular searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK_TERMS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="rounded-sm border border-line bg-white px-3 py-1.5 text-xs font-medium text-teal transition-colors hover:border-teal"
                >
                  {term}
                </button>
              ))}
            </div>

            <p className="eyebrow mt-6">Browse categories</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/shop/${cat.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="rounded-sm border border-line bg-white px-3 py-2.5 text-xs font-medium text-teal transition-colors hover:border-teal"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {hasQuery && (
          <div className="mt-5">
            <p className="eyebrow">
              {results.length
                ? `${results.length} result${results.length === 1 ? '' : 's'}`
                : 'No matches'}
            </p>

            {results.length > 0 ? (
              <ul className="mt-3 flex flex-col divide-y divide-line">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 py-3 transition-colors hover:bg-white"
                    >
                      <ImageWithFallback
                        src={product.images[0]}
                        alt={product.name}
                        wrapperClassName="h-16 w-16 shrink-0 rounded-sm"
                        className="h-full w-full object-cover"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-teal">
                          {product.name}
                        </span>
                        <span className="block truncate text-xs text-softgray">
                          {product.brand} · {product.colors.join(', ')}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-teal">
                        {money(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-3 rounded-sm border border-line bg-white px-5 py-8 text-center">
                <p className="text-sm text-softgray">
                  Nothing matched “{query}”. Try a category like{' '}
                  <button
                    type="button"
                    className="font-semibold text-teal underline"
                    onClick={() => setQuery('boots')}
                  >
                    boots
                  </button>{' '}
                  or{' '}
                  <button
                    type="button"
                    className="font-semibold text-teal underline"
                    onClick={() => setQuery('loafers')}
                  >
                    loafers
                  </button>
                  .
                </p>
              </div>
            )}

            {results.length > 0 && (
              <Link
                to={`/shop?q=${encodeURIComponent(query.trim())}`}
                onClick={() => setSearchOpen(false)}
                className="btn-outline mt-5 w-full"
              >
                View all results in shop
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
