import { StarIcon } from './Icons.jsx'

/** Five-star rating row. Supports half steps via a clipped overlay. */
export default function Stars({ rating = 0, reviews, size = 'sm', className = '' }) {
  const dims = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100))

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex" aria-hidden="true">
        <span className="flex text-line">
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} className={dims} filled />
          ))}
        </span>
        <span
          className="absolute inset-0 flex overflow-hidden text-copper"
          style={{ width: `${pct}%` }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} className={`${dims} shrink-0`} filled />
          ))}
        </span>
      </span>
      <span className="text-xs text-softgray">
        <span className="sr-only">Rated </span>
        {rating.toFixed(1)}
        {typeof reviews === 'number' && (
          <span className="hidden sm:inline"> ({reviews})</span>
        )}
      </span>
    </div>
  )
}
