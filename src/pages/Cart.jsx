import { useState } from 'react'
import { Link } from 'react-router-dom'
import { money } from '../data/products.js'
import { useStore } from '../context/StoreContext.jsx'
import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { computeDelivery, deliveryEstimate, TAX_RATE } from '../utils/commerce.js'
import {
  BagIcon,
  CheckIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  RefreshIcon,
  ShieldIcon,
  TrashIcon,
  TruckIcon,
} from '../components/Icons.jsx'

const PROMO_CODES = {
  VELMONT10: { label: '10% off your order', rate: 0.1 },
  ATELIER15: { label: '15% off — atelier members', rate: 0.15 },
}

export default function Cart() {
  const {
    detailedCart,
    cartCount,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    isWishlisted,
    clearCart,
    pushToast,
  } = useStore()

  const [promoInput, setPromoInput] = useState('')
  const [promo, setPromo] = useState(null)
  const [promoError, setPromoError] = useState('')

  const discount = promo ? cartSubtotal * promo.rate : 0
  const discountedSubtotal = cartSubtotal - discount
  const delivery = computeDelivery(discountedSubtotal, 'standard')
  const deliveryCost = cartCount > 0 ? delivery.charged : 0
  const tax = (discountedSubtotal + deliveryCost) * TAX_RATE
  const total = discountedSubtotal + deliveryCost + tax

  const applyPromo = (event) => {
    event.preventDefault()
    const code = promoInput.trim().toUpperCase()
    if (!code) {
      setPromoError('Enter a promotional code.')
      return
    }
    const found = PROMO_CODES[code]
    if (!found) {
      setPromoError(`“${code}” isn’t a recognised demo code. Try VELMONT10.`)
      setPromo(null)
      return
    }
    setPromo({ code, ...found })
    setPromoError('')
    pushToast({
      title: 'Promo applied',
      message: `${code} — ${found.label}`,
      tone: 'copper',
    })
  }

  const removePromo = () => {
    setPromo(null)
    setPromoInput('')
    setPromoError('')
  }

  if (!detailedCart.length) {
    return (
      <>
        <Seo
          title="Shopping Bag"
          description="Your VELMONT shopping bag. Add a pair to continue."
        />
        <PageHeader
          eyebrow="Your selection"
          title="Shopping bag"
          breadcrumbs={[{ label: 'Shopping bag' }]}
          compact
        />
        <div className="container-site py-12 sm:py-16">
          <EmptyState
            icon={BagIcon}
            title="Your bag is empty"
            message="Nothing here yet. Explore the collection and add a pair — your bag will be waiting when you return."
            actionLabel="Shop all footwear"
            actionTo="/shop"
            secondaryLabel="View wishlist"
            secondaryTo="/wishlist"
          />
        </div>
      </>
    )
  }

  return (
    <>
      <Seo
        title="Shopping Bag"
        description={`${cartCount} item(s) in your VELMONT shopping bag.`}
      />
      <PageHeader
        eyebrow="Your selection"
        title="Shopping bag"
        subtitle={`${cartCount} ${cartCount === 1 ? 'item' : 'items'} ready to order. Estimated delivery ${deliveryEstimate()}.`}
        breadcrumbs={[{ label: 'Shopping bag' }]}
        compact
      />

      <div className="container-site py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* --------------------------- Line items --------------------------- */}
          <section aria-label="Bag contents">
            <div className="hidden border-b border-line pb-3 text-[11px] font-semibold uppercase tracking-wider text-softgray sm:grid sm:grid-cols-[1fr_120px_120px_40px] sm:gap-4">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
              <span />
            </div>

            <ul className="divide-y divide-line">
              {detailedCart.map((line) => {
                const wishlisted = isWishlisted(line.productId)
                return (
                  <li
                    key={line.key}
                    className="grid gap-4 py-5 sm:grid-cols-[1fr_120px_120px_40px] sm:items-center"
                  >
                    {/* Product */}
                    <div className="flex gap-4">
                      <Link
                        to={`/product/${line.productId}`}
                        className="shrink-0 overflow-hidden rounded-sm border border-line"
                      >
                        <ImageWithFallback
                          src={line.product.images[0]}
                          alt={line.product.name}
                          wrapperClassName="h-24 w-20 sm:h-28 sm:w-24"
                          className="h-full w-full object-cover"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-softgray">
                          {line.product.brand}
                        </p>
                        <h3 className="mt-0.5 text-sm font-semibold text-teal">
                          <Link to={`/product/${line.productId}`} className="hover:text-copper-600">
                            {line.product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-xs text-softgray">
                          EU {line.size} · {line.color}
                        </p>
                        <p className="mt-1 text-xs text-softgray">
                          {money(line.product.price)} each
                        </p>

                        <div className="mt-2.5 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleWishlist(line.product)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-softgray transition-colors hover:text-teal"
                          >
                            <HeartIcon filled={wishlisted} className="h-3.5 w-3.5" />
                            {wishlisted ? 'Saved' : 'Save for later'}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(line.key)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-softgray transition-colors hover:text-sale sm:hidden"
                          >
                            <TrashIcon className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between sm:justify-center">
                      <div className="flex items-center rounded-sm border border-line bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.key, line.quantity - 1)}
                          disabled={line.quantity <= 1}
                          className="p-2.5 text-teal transition-colors hover:bg-ivory disabled:opacity-40"
                          aria-label={`Decrease quantity of ${line.product.name}`}
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span
                          className="min-w-[2.25rem] text-center text-sm font-semibold"
                          aria-live="polite"
                        >
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.key, line.quantity + 1)}
                          disabled={line.quantity >= 10}
                          className="p-2.5 text-teal transition-colors hover:bg-ivory disabled:opacity-40"
                          aria-label={`Increase quantity of ${line.product.name}`}
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-teal sm:hidden">
                        {money(line.lineTotal)}
                      </span>
                    </div>

                    {/* Line total */}
                    <p className="hidden text-right text-sm font-semibold text-teal sm:block">
                      {money(line.lineTotal)}
                    </p>

                    {/* Remove */}
                    <div className="hidden justify-end sm:flex">
                      <button
                        type="button"
                        onClick={() => removeFromCart(line.key)}
                        className="rounded-sm p-2 text-softgray transition-colors hover:bg-white hover:text-sale"
                        aria-label={`Remove ${line.product.name} from bag`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link to="/shop" className="btn-ghost">
                ← Continue shopping
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-softgray underline transition-colors hover:text-sale"
              >
                Empty bag
              </button>
            </div>
          </section>

          {/* ---------------------------- Summary ---------------------------- */}
          <aside aria-label="Order summary" className="lg:sticky lg:top-[92px] lg:self-start">
            <div className="rounded-sm border border-line bg-white p-6 shadow-card">
              <h2 className="font-display text-xl text-teal">Order summary</h2>

              {/* Promo */}
              <form onSubmit={applyPromo} className="mt-5">
                <label htmlFor="promo" className="label-field">
                  Promotional code
                </label>
                <div className="flex gap-2">
                  <input
                    id="promo"
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value)
                      if (promoError) setPromoError('')
                    }}
                    placeholder="VELMONT10"
                    aria-invalid={Boolean(promoError)}
                    aria-describedby={promoError ? 'promo-error' : undefined}
                    className="input-field py-2.5 text-sm uppercase"
                  />
                  <button type="submit" className="btn-outline shrink-0 px-4 py-2.5 text-xs">
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p id="promo-error" role="alert" className="mt-2 text-xs font-medium text-sale">
                    {promoError}
                  </p>
                )}
                {promo && (
                  <div className="mt-2 flex items-center justify-between rounded-sm border border-forest/25 bg-forest/5 px-3 py-2">
                    <span className="flex items-center gap-2 text-xs font-semibold text-forest">
                      <CheckIcon className="h-3.5 w-3.5" />
                      {promo.code} · {promo.label}
                    </span>
                    <button
                      type="button"
                      onClick={removePromo}
                      className="text-xs text-softgray underline hover:text-sale"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-softgray">Subtotal</dt>
                  <dd className="font-semibold text-teal">{money(cartSubtotal)}</dd>
                </div>
                {promo && (
                  <div className="flex items-center justify-between text-forest">
                    <dt>Discount ({promo.code})</dt>
                    <dd className="font-semibold">−{money(discount)}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <dt className="text-softgray">Delivery (standard)</dt>
                  <dd className="font-semibold text-teal">
                    {deliveryCost === 0 ? 'Free' : money(deliveryCost)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-softgray">Estimated tax</dt>
                  <dd className="font-semibold text-teal">{money(tax)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-4 text-base">
                  <dt className="font-semibold text-teal">Total</dt>
                  <dd className="font-display text-2xl text-teal">{money(total)}</dd>
                </div>
              </dl>

              <Link to="/checkout" className="btn-primary mt-6 w-full py-3.5">
                Proceed to checkout
              </Link>

              <p className="mt-3 text-center text-[11px] leading-relaxed text-softgray">
                Prices shown are in USD. Delivery estimated {deliveryEstimate()}.
              </p>
            </div>

            {/* Service promises */}
            <ul className="mt-5 grid gap-3 rounded-sm border border-line bg-white p-5">
              {[
                { icon: TruckIcon, text: 'Carbon-neutral delivery over $150' },
                { icon: RefreshIcon, text: 'Free 30-day returns, worn or unworn' },
                { icon: ShieldIcon, text: 'Demo checkout — no card is charged' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-xs text-softgray">
                  <Icon className="h-4 w-4 shrink-0 text-copper" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-sm border border-copper/25 bg-copper-100/50 p-4">
              <p className="text-xs font-semibold text-teal">Demo storefront</p>
              <p className="mt-1 text-[11px] leading-relaxed text-softgray">
                Your bag is stored in this browser only. Completing checkout creates a
                simulated order — nothing is purchased and no payment is processed.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
