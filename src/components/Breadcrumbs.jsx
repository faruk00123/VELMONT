import { Link } from 'react-router-dom'
import { ChevronRight } from './Icons.jsx'

/**
 * Breadcrumb trail.
 * `items` is an array of `{ label, to? }`; the last item is the current page.
 */
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs">
      <ol className="flex flex-wrap items-center gap-1.5 text-softgray">
        <li className="flex items-center gap-1.5">
          <Link to="/" className="transition-colors hover:text-teal">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-line" />
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.to && !last ? (
                <Link to={item.to} className="transition-colors hover:text-teal">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={last ? 'font-medium text-teal' : ''}
                  aria-current={last ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 text-line" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
