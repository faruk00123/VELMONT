import { Link } from 'react-router-dom'
import { getProductsByIds, money } from '../data/products.js'
import { useStore } from '../context/StoreContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Seo from '../components/Seo.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { BagIcon, HeartIcon, TrashIcon } from '../components/Icons.jsx'

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, recentlyViewed, setQuickViewId } = useStore()

  const saved = getProductsByIds(wishlist)
  const recentlyViewedProducts = getProductsByIds(
    recentlyViewed.filter((id) => !wishlist.includes(id)),
  ).slice(0, 4)

  const totalValue = saved.reduce((sum, p) => sum + p.price, 0)

  return (
    <>
      <Seo
        title="Wishlist"
        description="Your saved VELMONT footwear. Wishlist items are stored in this browser."
      />
      <PageHeader
        eyebrow="Saved for later"
        title="Your wishlist"
        subtitle={
          saved.length
            ? `${saved.length} ${saved.length === 1 ? 'style' : 'styles'} saved · $${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })} combined value.`
            : 'Everything you save lives here, and stays in this browser between visits.'
        }
        breadcrumbs={[{ label: 'Wishlist' }]}
        compact
      />

      <div className="container-site py-8 sm:py-12">
        {saved.length === 0 ? (
          <EmptyState
            icon={HeartIcon}
            title="Nothing saved yet"
            message="Tap the heart on any product to keep it here while you decide. We’ll remember it next time you visit."
            actionLabel="Browse the collection"
            actionTo="/shop"
            secondaryLabel="View your bag"
            secondaryTo="/cart"
          />
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-softgray">
                {saved.length} saved {saved.length === 1 ? 'item' : 'items'}
              </p>
              <Link to="/shop" className="link-underline text-sm font-semibold text-teal">
                Continue shopping
              </Link>
            </div>

            <ProductGrid products={saved} />

            {/* Quick actions table for practicality */}
            <section className="mt-12">
              <h2 className="font-display text-xl text-teal">Quick add to bag</h2>
              <p className="mt-1 text-xs text-softgray">
                Adds the first available size and your default colour. Choose a size on the
                product page for a precise fit.
              </p>

              <ul className="mt-5 divide-y divide-line rounded-sm border border-line bg-white">
                {saved.map((product) => (
                  <li key={product.id} className="flex flex-wrap items-center gap-4 p-4">
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      wrapperClassName="h-16 w-14 shrink-0 rounded-sm border border-line"
                      className="h-full w-full object-cover"
                    />
                    <div className="min-w-[10rem] flex-1">
                      <Link
                        to={`/product/${product.id}`}
                        className="text-sm font-semibold text-teal hover:text-copper-600"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-softgray">
                        {money(product.price)} · Sizes {product.sizes[0]}–{product.sizes.at(-1)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQuickViewId(product.id)}
                        className="btn-ghost px-4 py-2 text-xs"
                      >
                        Choose size
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          addToCart(product, {
                            size: product.sizes[0],
                            color: product.colors[0],
                          })
                        }
                        className="btn-primary px-4 py-2 text-xs"
                      >
                        <BagIcon className="h-4 w-4" />
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product)}
                        className="rounded-sm border border-line p-2.5 text-softgray transition-colors hover:border-sale hover:text-sale"
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {recentlyViewedProducts.length > 0 && (
          <section className="mt-14 border-t border-line pt-10">
            <span className="eyebrow">Your browsing</span>
            <h2 className="mt-2 font-display text-2xl text-teal">Recently viewed</h2>
            <div className="mt-6">
              <ProductGrid products={recentlyViewedProducts} />
            </div>
          </section>
        )}
      </div>
    </>
  )
}
