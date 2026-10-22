import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  CATEGORIES,
  PRODUCTS,
  getCategory,
  getPriceRange,
} from '../data/products.js'
import PageHeader from '../components/PageHeader.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import ShopFilters, { PRICE_BANDS } from '../components/ShopFilters.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Seo from '../components/Seo.jsx'
import { CloseIcon, FilterIcon, SearchIcon } from '../components/Icons.jsx'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Top rated' },
  { id: 'name', label: 'Alphabetical' },
]

const EMPTY_FILTERS = {
  categories: [],
  sizes: [],
  colors: [],
  priceBand: 'all',
  maxPrice: 900,
}

const ALL_SIZES = [...new Set(PRODUCTS.flatMap((p) => p.sizes))].sort((a, b) => a - b)
const ALL_COLORS = [...new Set(PRODUCTS.flatMap((p) => p.colors))].sort()
const { max: CATALOGUE_MAX } = getPriceRange()

export default function Shop() {
  const { category } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  // The URL param can be a category slug or the virtual "sale" collection.
  const isSaleView = category === 'sale'
  const activeCategory = !isSaleView && category ? getCategory(category) : null
  const unknownCategory = Boolean(category && !isSaleView && !activeCategory)

  const urlQuery = searchParams.get('q') || ''

  const [filters, setFilters] = useState({
    ...EMPTY_FILTERS,
    maxPrice: CATALOGUE_MAX,
    categories: activeCategory ? [activeCategory.slug] : [],
  })
  const [sort, setSort] = useState('featured')
  const [term, setTerm] = useState(urlQuery)
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Re-sync when the route changes (e.g. footer category links).
  useEffect(() => {
    setFilters({
      ...EMPTY_FILTERS,
      maxPrice: CATALOGUE_MAX,
      categories: activeCategory ? [activeCategory.slug] : [],
    })
    setTerm(urlQuery)
    setSort('featured')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, urlQuery])

  // Keep the search box and the ?q= param in step.
  const commitTerm = (value) => {
    setTerm(value)
    const next = new URLSearchParams(searchParams)
    if (value.trim()) next.set('q', value.trim())
    else next.delete('q')
    setSearchParams(next, { replace: true })
  }

  // The pool the filters/sort operate on.
  const pool = useMemo(() => {
    if (isSaleView) return PRODUCTS.filter((p) => p.tags.includes('sale'))
    if (activeCategory) return PRODUCTS.filter((p) => p.category === activeCategory.slug)
    return PRODUCTS
  }, [isSaleView, activeCategory])

  const facetCounts = useMemo(() => {
    const counts = {}
    CATEGORIES.forEach((cat) => {
      counts[cat.slug] = pool.filter((p) => p.category === cat.slug).length
    })
    return counts
  }, [pool])

  const results = useMemo(() => {
    const q = term.trim().toLowerCase()
    const band = PRICE_BANDS.find((b) => b.id === filters.priceBand) || PRICE_BANDS[0]

    let list = pool.filter((product) => {
      if (q) {
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.colors.some((c) => c.toLowerCase().includes(q)) ||
          product.short.toLowerCase().includes(q)
        if (!matches) return false
      }
      if (filters.categories.length && !filters.categories.includes(product.category)) {
        return false
      }
      if (filters.sizes.length && !filters.sizes.some((s) => product.sizes.includes(s))) {
        return false
      }
      if (filters.colors.length && !filters.colors.some((c) => product.colors.includes(c))) {
        return false
      }
      if (!band.test(product)) return false
      if (product.price > filters.maxPrice) return false
      return true
    })

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // "Featured" — bestsellers and new arrivals lead, then rating.
        list = [...list].sort((a, b) => {
          const score = (p) =>
            (p.tags.includes('bestseller') ? 2 : 0) +
            (p.tags.includes('new') ? 1 : 0) +
            p.rating / 10
          return score(b) - score(a)
        })
    }

    return list
  }, [pool, term, filters, sort])

  const toggleIn = (list, value) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

  const activeCount =
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceBand !== 'all' ? 1 : 0) +
    (filters.maxPrice < CATALOGUE_MAX ? 1 : 0)

  const clearFilters = () =>
    setFilters({ ...EMPTY_FILTERS, maxPrice: CATALOGUE_MAX })

  const heading = useMemo(() => {
    if (isSaleView) {
      return {
        eyebrow: 'Reduced while stock lasts',
        title: 'The Sale Room',
        subtitle:
          'Selected styles from previous seasons at up to 24% off. Sale pricing is demo data — no real order is placed.',
        image:
          'https://images.unsplash.com/photo-1465453869711-7e174808ace9?auto=format&fit=crop&w=1400&q=80',
      }
    }
    if (activeCategory) {
      return {
        eyebrow: activeCategory.tagline,
        title: activeCategory.name,
        subtitle: activeCategory.description,
        image: activeCategory.image,
      }
    }
    return {
      eyebrow: 'The full collection',
      title: 'Shop All Footwear',
      subtitle:
        'Twenty-four styles across seven categories — sneakers, formal shoes, loafers, boots, running shoes, sandals and the atelier line.',
      image:
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1400&q=80',
    }
  }, [isSaleView, activeCategory])

  const breadcrumbs = activeCategory
    ? [{ label: 'Shop', to: '/shop' }, { label: activeCategory.name }]
    : isSaleView
      ? [{ label: 'Shop', to: '/shop' }, { label: 'Sale' }]
      : [{ label: 'Shop' }]

  return (
    <>
      <Seo
        title={heading.title}
        description={heading.subtitle}
      />

      <PageHeader
        eyebrow={heading.eyebrow}
        title={heading.title}
        subtitle={heading.subtitle}
        breadcrumbs={breadcrumbs}
        image={heading.image}
        compact
      />

      {/* Category quick-links */}
      <div className="border-b border-line bg-white">
        <div className="container-site flex gap-2 overflow-x-auto py-4 no-scrollbar">
          <Link
            to="/shop"
            className={`shrink-0 rounded-sm border px-4 py-2 text-xs font-medium transition-colors ${
              !category
                ? 'border-teal bg-teal text-ivory'
                : 'border-line text-teal hover:border-teal'
            }`}
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop/${cat.slug}`}
              className={`shrink-0 rounded-sm border px-4 py-2 text-xs font-medium transition-colors ${
                category === cat.slug
                  ? 'border-teal bg-teal text-ivory'
                  : 'border-line text-teal hover:border-teal'
              }`}
            >
              {cat.name}
            </Link>
          ))}
          <Link
            to="/shop/sale"
            className={`shrink-0 rounded-sm border px-4 py-2 text-xs font-medium transition-colors ${
              isSaleView
                ? 'border-sale bg-sale text-white'
                : 'border-line text-sale hover:border-sale'
            }`}
          >
            Sale
          </Link>
        </div>
      </div>

      <div className="container-site py-8 sm:py-10">
        {unknownCategory ? (
          <EmptyState
            title="That category doesn’t exist"
            message={`We don’t have a category called “${category}”. Browse the full collection instead.`}
            actionLabel="Shop all footwear"
            actionTo="/shop"
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
            {/* Desktop filter rail */}
            <aside className="hidden lg:block" aria-label="Product filters">
              <div className="sticky top-[92px] max-h-[calc(100vh-120px)] overflow-y-auto rounded-sm border border-line bg-white p-5 pr-3">
                <ShopFilters
                  filters={filters}
                  onToggleCategory={(slug) =>
                    setFilters((f) => ({ ...f, categories: toggleIn(f.categories, slug) }))
                  }
                  onToggleSize={(size) =>
                    setFilters((f) => ({ ...f, sizes: toggleIn(f.sizes, size) }))
                  }
                  onToggleColor={(color) =>
                    setFilters((f) => ({ ...f, colors: toggleIn(f.colors, color) }))
                  }
                  onSetPriceBand={(id) => setFilters((f) => ({ ...f, priceBand: id }))}
                  onSetMaxPrice={(value) => setFilters((f) => ({ ...f, maxPrice: value }))}
                  onClear={clearFilters}
                  facetCounts={facetCounts}
                  availableSizes={ALL_SIZES}
                  availableColors={ALL_COLORS}
                  maxPrice={CATALOGUE_MAX}
                  activeCount={activeCount}
                />
              </div>
            </aside>

            {/* Results */}
            <div className="min-w-0">
              {/* Toolbar */}
              <div className="flex flex-col gap-4 rounded-sm border border-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 sm:max-w-xs">
                  <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-softgray" />
                  <label htmlFor="shop-search" className="sr-only">
                    Search within results
                  </label>
                  <input
                    id="shop-search"
                    type="search"
                    value={term}
                    onChange={(e) => commitTerm(e.target.value)}
                    placeholder="Search this collection…"
                    className="input-field py-2.5 pl-10 text-sm"
                  />
                </div>

                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(true)}
                    className="btn-ghost min-w-0 flex-1 py-2.5 lg:hidden"
                    aria-haspopup="dialog"
                  >
                    <FilterIcon className="h-4 w-4 shrink-0" />
                    Filters
                    {activeCount > 0 && (
                      <span className="rounded-full bg-teal px-1.5 text-[10px] font-bold text-ivory">
                        {activeCount}
                      </span>
                    )}
                  </button>

                  <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none">
                    <label htmlFor="sort" className="hidden text-xs text-softgray sm:block">
                      Sort
                    </label>
                    <select
                      id="sort"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="input-field min-w-0 flex-1 py-2.5 pr-9 text-sm sm:w-auto sm:flex-none"
                    >
                      {SORTS.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Result count + active chips */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <p className="text-xs text-softgray" aria-live="polite">
                  {results.length} {results.length === 1 ? 'style' : 'styles'}
                  {term.trim() ? ` matching “${term.trim()}”` : ''}
                </p>

                {filters.categories.map((slug) => {
                  const cat = getCategory(slug)
                  return (
                    <FilterChip
                      key={slug}
                      label={cat?.name || slug}
                      onRemove={() =>
                        setFilters((f) => ({
                          ...f,
                          categories: f.categories.filter((c) => c !== slug),
                        }))
                      }
                    />
                  )
                })}
                {filters.sizes.map((size) => (
                  <FilterChip
                    key={`size-${size}`}
                    label={`EU ${size}`}
                    onRemove={() =>
                      setFilters((f) => ({ ...f, sizes: f.sizes.filter((s) => s !== size) }))
                    }
                  />
                ))}
                {filters.colors.map((color) => (
                  <FilterChip
                    key={`color-${color}`}
                    label={color}
                    onRemove={() =>
                      setFilters((f) => ({
                        ...f,
                        colors: f.colors.filter((c) => c !== color),
                      }))
                    }
                  />
                ))}
                {term.trim() && (
                  <FilterChip label={`“${term.trim()}”`} onRemove={() => commitTerm('')} />
                )}
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-semibold text-copper-600 underline hover:text-teal"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Grid */}
              <div className="mt-6">
                <ProductGrid
                  products={results}
                  eagerCount={4}
                  emptyState={
                    <EmptyState
                      icon={SearchIcon}
                      title="No footwear matches those filters"
                      message="Try widening the price range, clearing a size, or searching a different term. Everything here is demo product data."
                      actionLabel={activeCount > 0 ? 'Clear all filters' : 'Browse all footwear'}
                      onAction={activeCount > 0 ? clearFilters : undefined}
                      actionTo={activeCount > 0 ? undefined : '/shop'}
                    />
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[75] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div
            className="absolute inset-0 bg-teal-900/50 backdrop-blur-sm"
            onClick={() => setFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 flex w-[90%] max-w-sm flex-col bg-white shadow-modal">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-teal">
                Refine results
              </h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="rounded-sm p-1.5 text-softgray"
                aria-label="Close filters"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ShopFilters
                filters={filters}
                onToggleCategory={(slug) =>
                  setFilters((f) => ({ ...f, categories: toggleIn(f.categories, slug) }))
                }
                onToggleSize={(size) =>
                  setFilters((f) => ({ ...f, sizes: toggleIn(f.sizes, size) }))
                }
                onToggleColor={(color) =>
                  setFilters((f) => ({ ...f, colors: toggleIn(f.colors, color) }))
                }
                onSetPriceBand={(id) => setFilters((f) => ({ ...f, priceBand: id }))}
                onSetMaxPrice={(value) => setFilters((f) => ({ ...f, maxPrice: value }))}
                onClear={clearFilters}
                facetCounts={facetCounts}
                availableSizes={ALL_SIZES}
                availableColors={ALL_COLORS}
                maxPrice={CATALOGUE_MAX}
                activeCount={activeCount}
                onClose={() => setFiltersOpen(false)}
              />
            </div>
            <div className="border-t border-line p-4">
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="btn-primary w-full"
              >
                Show {results.length} {results.length === 1 ? 'style' : 'styles'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-line bg-white px-2.5 py-1 text-xs text-teal">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="text-softgray transition-colors hover:text-sale"
      >
        <CloseIcon className="h-3.5 w-3.5" />
      </button>
    </span>
  )
}
