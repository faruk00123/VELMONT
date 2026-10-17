import { CATEGORIES, colorHex } from '../data/products.js'
import { CloseIcon, FilterIcon } from './Icons.jsx'

export const PRICE_BANDS = [
  { id: 'all', label: 'Any price', test: () => true },
  { id: 'under-150', label: 'Under $150', test: (p) => p.price < 150 },
  { id: '150-250', label: '$150 – $250', test: (p) => p.price >= 150 && p.price <= 250 },
  { id: '250-400', label: '$250 – $400', test: (p) => p.price > 250 && p.price <= 400 },
  { id: 'over-400', label: '$400 & above', test: (p) => p.price > 400 },
]

/**
 * Faceted filter panel. Rendered inline on desktop and inside a drawer on mobile.
 */
export default function ShopFilters({
  filters,
  onToggleCategory,
  onToggleSize,
  onToggleColor,
  onSetPriceBand,
  onSetMaxPrice,
  onClear,
  facetCounts = {},
  availableSizes = [],
  availableColors = [],
  maxPrice = 900,
  activeCount = 0,
  onClose,
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line px-5 py-4 lg:px-0 lg:pb-4 lg:pt-0">
        <h2 className="flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wider text-teal">
          <FilterIcon className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-teal px-2 py-0.5 text-[10px] font-bold text-ivory">
              {activeCount}
            </span>
          )}
        </h2>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-semibold text-copper-600 underline hover:text-teal"
            >
              Clear all
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm p-1 text-softgray lg:hidden"
              aria-label="Close filters"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 lg:px-0">
        {/* Category */}
        <fieldset className="pb-6">
          <legend className="label-field">Category</legend>
          <ul className="flex flex-col gap-2.5">
            {CATEGORIES.map((cat) => {
              const checked = filters.categories.includes(cat.slug)
              const count = facetCounts[cat.slug] ?? 0
              return (
                <li key={cat.slug}>
                  <label
                    className={`group flex cursor-pointer items-center gap-3 text-sm ${
                      count === 0 && !checked ? 'opacity-45' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleCategory(cat.slug)}
                      className="h-4 w-4 shrink-0 rounded-none border-line text-teal accent-teal focus:ring-copper"
                    />
                    <span className="flex-1 text-teal group-hover:text-copper-600">
                      {cat.name}
                    </span>
                    <span className="text-xs text-softgray">{count}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </fieldset>

        {/* Size */}
        <fieldset className="border-t border-line pt-6">
          <legend className="label-field">Size (EU)</legend>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const checked = filters.sizes.includes(size)
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onToggleSize(size)}
                  aria-pressed={checked}
                  className={`h-9 min-w-[2.5rem] rounded-sm border px-2 text-xs font-medium transition-all ${
                    checked
                      ? 'border-forest bg-forest text-white'
                      : 'border-line bg-white text-teal hover:border-teal'
                  }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* Colour */}
        <fieldset className="mt-6 border-t border-line pt-6">
          <legend className="label-field">Colour</legend>
          <div className="flex flex-wrap gap-2.5">
            {availableColors.map((color) => {
              const checked = filters.colors.includes(color)
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => onToggleColor(color)}
                  aria-pressed={checked}
                  title={color}
                  aria-label={`Colour ${color}`}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                    checked ? 'border-teal' : 'border-line hover:border-teal/50'
                  }`}
                >
                  <span
                    className="h-5 w-5 rounded-full border border-line/70"
                    style={{ backgroundColor: colorHex[color] || '#E5E2DB' }}
                  />
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* Price */}
        <fieldset className="mt-6 border-t border-line pt-6">
          <legend className="label-field">Price</legend>
          <ul className="flex flex-col gap-2.5">
            {PRICE_BANDS.map((band) => (
              <li key={band.id}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-teal">
                  <input
                    type="radio"
                    name="price-band"
                    checked={filters.priceBand === band.id}
                    onChange={() => onSetPriceBand(band.id)}
                    className="h-4 w-4 accent-teal focus:ring-copper"
                  />
                  {band.label}
                </label>
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <label
              htmlFor="max-price"
              className="flex items-center justify-between text-xs text-softgray"
            >
              <span>Max price</span>
              <span className="font-semibold text-teal">
                ${filters.maxPrice.toLocaleString()}
              </span>
            </label>
            <input
              id="max-price"
              type="range"
              min={100}
              max={maxPrice}
              step={10}
              value={filters.maxPrice}
              onChange={(e) => onSetMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-copper"
            />
          </div>
        </fieldset>
      </div>
    </div>
  )
}
