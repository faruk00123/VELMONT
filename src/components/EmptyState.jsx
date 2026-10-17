import { Link } from 'react-router-dom'

/**
 * Shared empty state for cart, wishlist, search and filtered grids.
 */
export default function EmptyState({
  icon: Icon,
  title,
  message,
  actionLabel,
  actionTo,
  onAction,
  secondaryLabel,
  secondaryTo,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-line bg-white px-6 py-16 text-center">
      {Icon && (
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-ivory text-teal">
          <Icon className="h-6 w-6" />
        </span>
      )}
      <h3 className="font-display text-xl text-teal sm:text-2xl">{title}</h3>
      {message && <p className="mt-2 max-w-md text-sm text-softgray">{message}</p>}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        {actionLabel && actionTo && (
          <Link to={actionTo} className="btn-primary">
            {actionLabel}
          </Link>
        )}
        {actionLabel && onAction && (
          <button type="button" onClick={onAction} className="btn-primary">
            {actionLabel}
          </button>
        )}
        {secondaryLabel && secondaryTo && (
          <Link to={secondaryTo} className="btn-ghost">
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
