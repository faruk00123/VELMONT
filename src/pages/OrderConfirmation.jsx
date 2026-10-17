import { Link, useLocation } from 'react-router-dom'
import { money } from '../data/products.js'
import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { useLastOrder } from '../utils/commerce.js'
import { CheckIcon, InfoIcon, MailIcon, TruckIcon } from '../components/Icons.jsx'

export default function OrderConfirmation() {
  const location = useLocation()
  const [storedOrder] = useLastOrder()
  const order = location.state?.order || storedOrder

  if (!order) {
    return (
      <>
        <Seo title="Order Confirmation" />
        <PageHeader
          eyebrow="Order status"
          title="No demo order found"
          breadcrumbs={[{ label: 'Order confirmation' }]}
          compact
        />
        <div className="container-site py-12 sm:py-16">
          <EmptyState
            icon={InfoIcon}
            title="We don’t have an order to show"
            message="Once you complete the demo checkout, your simulated order number and summary will appear here and remain available until you place another order."
            actionLabel="Start shopping"
            actionTo="/shop"
            secondaryLabel="Back to home"
            secondaryTo="/"
          />
        </div>
      </>
    )
  }

  const placed = new Date(order.placedAt)
  const dateLabel = Number.isNaN(placed.getTime())
    ? ''
    : placed.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <>
      <Seo
        title="Order Confirmation"
        description="Your simulated VELMONT order confirmation. No real purchase has been made."
      />

      <PageHeader
        eyebrow="Thank you"
        title="Your demo order is confirmed"
        subtitle={`Order ${order.orderNumber}${dateLabel ? ` · placed ${dateLabel}` : ''}`}
        breadcrumbs={[{ label: 'Order confirmation' }]}
        compact
      />

      <div className="container-site py-8 sm:py-12">
        {/* Prominent demo disclaimer */}
        <div className="mb-8 flex flex-col gap-3 rounded-sm border-2 border-copper/40 bg-copper-100/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-copper-700" />
            <div>
              <p className="text-sm font-semibold text-teal">
                This is a simulated order — nothing was purchased
              </p>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-softgray">
                No payment was processed, no card was charged, and no order was sent to any
                fulfilment system. You were not emailed. This confirmation exists purely to
                demonstrate the front-end checkout flow.
              </p>
            </div>
          </div>
          <span className="badge shrink-0 self-start bg-copper text-white sm:self-center">
            Demo only
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* Details */}
          <div>
            <section className="rounded-sm border border-line bg-white p-6 shadow-card sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
                    Order number
                  </p>
                  <p className="mt-1 font-display text-2xl text-teal">{order.orderNumber}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-sm bg-forest/10 px-3 py-1.5 text-xs font-semibold text-forest">
                  <CheckIcon className="h-4 w-4" />
                  Confirmed (simulated)
                </span>
              </div>

              <dl className="mt-6 grid gap-5 border-t border-line pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
                    Customer
                  </dt>
                  <dd className="mt-1.5 text-sm text-teal">
                    {order.firstName} {order.lastName || ''}
                  </dd>
                  <dd className="text-sm text-softgray">{order.email}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
                    Delivery destination
                  </dt>
                  <dd className="mt-1.5 text-sm text-teal">{order.city}</dd>
                  <dd className="text-sm text-softgray">{order.country}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
                    Delivery method
                  </dt>
                  <dd className="mt-1.5 text-sm text-teal">{order.method}</dd>
                  <dd className="text-sm text-softgray">Estimated {order.estimate}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
                    Payment
                  </dt>
                  <dd className="mt-1.5 text-sm text-teal">Not collected</dd>
                  <dd className="text-sm text-softgray">No transaction took place</dd>
                </div>
              </dl>
            </section>

            <section className="mt-6 rounded-sm border border-line bg-white p-6 shadow-card sm:p-7">
              <h2 className="font-display text-xl text-teal">
                Items in this demo order ({itemCount})
              </h2>

              <ul className="mt-5 divide-y divide-line">
                {order.items.map((item, i) => (
                  <li key={`${item.productId}-${item.size}-${item.color}-${i}`} className="flex gap-4 py-4">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      wrapperClassName="h-24 w-20 shrink-0 rounded-sm border border-line"
                      className="h-full w-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-softgray">
                        {item.brand}
                      </p>
                      <h3 className="mt-0.5 text-sm font-semibold text-teal">
                        {item.productId ? (
                          <Link
                            to={`/product/${item.productId}`}
                            className="hover:text-copper-600"
                          >
                            {item.name}
                          </Link>
                        ) : (
                          item.name
                        )}
                      </h3>
                      <p className="mt-1 text-xs text-softgray">
                        EU {item.size} · {item.color} · Qty {item.quantity}
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-teal">
                        {money(item.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-line bg-white p-5">
                <TruckIcon className="h-5 w-5 text-copper" />
                <p className="mt-3 text-sm font-semibold text-teal">What would happen next</p>
                <p className="mt-1.5 text-xs leading-relaxed text-softgray">
                  In a real store, you would now receive a confirmation email, then a dispatch
                  note with tracking. None of that occurs in this demo.
                </p>
              </div>
              <div className="rounded-sm border border-line bg-white p-5">
                <MailIcon className="h-5 w-5 text-copper" />
                <p className="mt-3 text-sm font-semibold text-teal">Questions?</p>
                <p className="mt-1.5 text-xs leading-relaxed text-softgray">
                  Reach the (fictional) studio at any time — the contact form works locally and
                  never sends your message.
                </p>
                <Link to="/contact" className="link-underline mt-3 inline-block text-xs font-semibold text-teal">
                  Go to contact
                </Link>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside aria-label="Order totals" className="lg:sticky lg:top-[92px] lg:self-start">
            <div className="rounded-sm border border-line bg-white p-6 shadow-card">
              <h2 className="font-display text-xl text-teal">Order total</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-softgray">Subtotal</dt>
                  <dd className="font-semibold text-teal">{money(order.totals.subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-softgray">Delivery</dt>
                  <dd className="font-semibold text-teal">
                    {order.totals.delivery === 0 ? 'Free' : money(order.totals.delivery)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-softgray">Estimated tax</dt>
                  <dd className="font-semibold text-teal">{money(order.totals.tax)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-4 text-base">
                  <dt className="font-semibold text-teal">Total</dt>
                  <dd className="font-display text-2xl text-teal">
                    {money(order.totals.total)}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-[11px] leading-relaxed text-softgray">
                Amount shown for demonstration only. No charge has been made and no payment
                details were ever requested.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <Link to="/shop" className="btn-primary">
                Continue shopping
              </Link>
              <Link to="/contact" className="btn-ghost">
                Contact the studio
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
