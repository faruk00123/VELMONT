import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import PolicyLayout from '../components/PolicyLayout.jsx'
import Seo from '../components/Seo.jsx'
import { RefreshIcon, ShieldIcon, TruckIcon } from '../components/Icons.jsx'

const SECTIONS = [
  {
    id: 'delivery-options',
    title: 'Delivery options',
    body: (
      <>
        <p>
          Every order shown at checkout is a simulation, but the options mirror how a small
          atelier would actually ship.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-wider text-softgray">
                <th scope="col" className="py-3 pr-4 font-semibold">Method</th>
                <th scope="col" className="py-3 pr-4 font-semibold">Timeframe</th>
                <th scope="col" className="py-3 font-semibold">Cost</th>
              </tr>
            </thead>
            <tbody className="text-softgray">
              <tr className="border-b border-line">
                <td className="py-3 pr-4 font-medium text-teal">Standard</td>
                <td className="py-3 pr-4">4–6 business days</td>
                <td className="py-3">Free over $150, otherwise $9.50</td>
              </tr>
              <tr className="border-b border-line">
                <td className="py-3 pr-4 font-medium text-teal">Express</td>
                <td className="py-3 pr-4">1–2 business days</td>
                <td className="py-3">$14.90</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-teal">Boutique collection</td>
                <td className="py-3 pr-4">Ready within 24 hours</td>
                <td className="py-3">Complimentary</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Delivery is carbon-neutral: we offset the full leg of each shipment rather than
          buying generic credits.
        </p>
      </>
    ),
  },
  {
    id: 'tracking',
    title: 'Tracking your order',
    body: (
      <>
        <p>
          In a real store, a dispatch note with a tracking link would arrive the morning after
          your order leaves the workshop. Because this is a demo, the confirmation page is the
          only record — and no parcel is ever sent.
        </p>
        <p>
          Your most recent demo order stays visible on the{' '}
          <Link to="/account" className="font-semibold text-teal underline">
            account page
          </Link>{' '}
          and on the{' '}
          <Link to="/order-confirmation" className="font-semibold text-teal underline">
            confirmation page
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: 'returns',
    title: 'Returns & exchanges',
    body: (
      <>
        <p>
          We accept returns within <strong className="text-teal">30 days</strong> of delivery,
          worn or unworn, provided the shoes are clean and in a resaleable condition. Returns
          within the EU and US are free; other regions are charged at cost.
        </p>
        <ol className="ml-4 list-decimal space-y-2 pl-1">
          <li>Request a return and we email a prepaid label (in a real store).</li>
          <li>Repack the shoes with any accessories, such as cedar trees.</li>
          <li>Drop the parcel at any carrier point within 14 days of the label being issued.</li>
          <li>Refunds are processed to the original payment method within 5 business days.</li>
        </ol>
        <p>
          Exchanges are handled as a return plus a new order, which keeps stock accurate and is
          usually faster than a swap.
        </p>
      </>
    ),
  },
  {
    id: 'faults',
    title: 'Faults & warranty',
    body: (
      <>
        <p>
          Every pair carries a two-year warranty against manufacturing fault — sole separation,
          stitching failure or hardware defects. Normal wear, including creasing in the vamp and
          scuffing of the sole, is not a fault.
        </p>
        <p>
          Where a fault is confirmed we will repair first, replace second. Repairs are carried
          out in our Porto workshop with original materials.
        </p>
      </>
    ),
  },
  {
    id: 'resoling',
    title: 'Resoling & care',
    body: (
      <>
        <p>
          Welted and stitched shoes can be resoled repeatedly. We recommend a resole once the
          sole has worn to roughly 3mm at the ball of the foot, rather than waiting for a hole
          to appear.
        </p>
        <ul className="ml-4 list-disc space-y-2 pl-1">
          <li>Rest shoes for 24 hours between wears, ideally on cedar trees.</li>
          <li>Brush off dust before it works into the grain.</li>
          <li>Condition smooth leather every six to eight weeks, not more.</li>
          <li>Suede is brushed dry and protected, never soaked.</li>
        </ul>
      </>
    ),
  },
]

const PROMISES = [
  { icon: TruckIcon, title: 'Free over $150', copy: 'Carbon-neutral standard delivery' },
  { icon: RefreshIcon, title: '30-day returns', copy: 'Worn or unworn, no questions' },
  { icon: ShieldIcon, title: '2-year warranty', copy: 'Against manufacturing fault' },
]

export default function ShippingReturns() {
  return (
    <>
      <Seo
        title="Shipping & Returns"
        description="VELMONT delivery options, tracking, returns, exchanges, warranty and resoling information — for this demo storefront."
      />

      <PageHeader
        eyebrow="Delivery & care"
        title="Shipping & returns"
        subtitle="How our fictional delivery, returns and repair service would work. Nothing on this page results in a real shipment."
        breadcrumbs={[{ label: 'Shipping & Returns' }]}
        compact
      />

      <div className="container-site pt-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {PROMISES.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex items-start gap-3 rounded-sm border border-line bg-white p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory text-copper">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-teal">{title}</p>
                <p className="mt-0.5 text-xs text-softgray">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PolicyLayout
        sections={SECTIONS}
        footerNote="This page describes how a real VELMONT order would be handled. In this front-end demonstration no parcel is dispatched, no return can be lodged and no refund can be issued — the policies exist to make the shopping experience complete."
      />
    </>
  )
}
