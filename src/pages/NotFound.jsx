import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/products.js'
import Seo from '../components/Seo.jsx'
import { SearchIcon } from '../components/Icons.jsx'

const SUGGESTIONS = [
  { label: 'Shop all footwear', to: '/shop' },
  { label: 'New arrivals', to: '/shop' },
  { label: 'The sale room', to: '/shop/sale' },
  { label: 'Your shopping bag', to: '/cart' },
  { label: 'Help centre', to: '/faq' },
]

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="That page could not be found. Browse the VELMONT collection instead."
      />

      <div className="bg-teal text-ivory">
        <div className="container-site flex flex-col items-center py-20 text-center sm:py-28">
          <span className="eyebrow text-copper-300">Error 404</span>
          <p className="mt-4 font-display text-[64px] leading-none text-ivory/20 sm:text-[96px]">
            404
          </p>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl">
            This page has walked off
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ivory/70">
            The link may be broken, or the page may have been retired. Let’s get you back to
            something worth wearing.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/" className="btn-copper px-8">
              Back to home
            </Link>
            <Link
              to="/shop"
              className="btn border border-ivory/30 text-ivory hover:bg-ivory hover:text-teal"
            >
              Shop all footwear
            </Link>
          </div>
        </div>
      </div>

      <div className="container-site py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl text-teal">Popular destinations</h2>
            <ul className="mt-5 divide-y divide-line rounded-sm border border-line bg-white">
              {SUGGESTIONS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="flex items-center justify-between px-5 py-3.5 text-sm text-teal transition-colors hover:bg-ivory"
                  >
                    {item.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-teal">Or browse a category</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/shop/${cat.slug}`}
                  className="group relative overflow-hidden rounded-sm border border-line bg-white p-4 transition-colors hover:border-teal"
                >
                  <span className="block text-sm font-semibold text-teal">{cat.name}</span>
                  <span className="mt-0.5 block text-[11px] text-softgray">{cat.tagline}</span>
                </Link>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-sm border border-line bg-white p-5">
              <SearchIcon className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
              <p className="text-xs leading-relaxed text-softgray">
                Looking for something specific? Use the search icon in the header to search by
                name, category or colour.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
