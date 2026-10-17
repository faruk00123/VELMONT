import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import PolicyLayout from '../components/PolicyLayout.jsx'
import Seo from '../components/Seo.jsx'

const SECTIONS = [
  {
    id: 'summary',
    title: 'In short',
    body: (
      <>
        <p>
          VELMONT is a front-end demonstration. There is no server, no database and no account
          system. Everything you do here — browsing, filtering, saving a wishlist, building a bag,
          completing the demo checkout — happens entirely inside your own browser.
        </p>
        <p>
          We do not collect, transmit, sell or share any personal information. We cannot, because
          there is nowhere for it to go.
        </p>
      </>
    ),
  },
  {
    id: 'what-is-stored',
    title: 'What is stored in your browser',
    body: (
      <>
        <p>
          To make the experience feel like a real shop between page loads, this site uses your
          browser&apos;s <strong className="text-teal">local storage</strong>. The following keys
          may be written:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-wider text-softgray">
                <th scope="col" className="py-3 pr-4 font-semibold">Key</th>
                <th scope="col" className="py-3 font-semibold">Contents</th>
              </tr>
            </thead>
            <tbody className="text-softgray">
              <tr className="border-b border-line">
                <td className="py-3 pr-4 font-mono text-xs text-teal">velmont.cart</td>
                <td className="py-3">Product IDs, chosen size, colour and quantity</td>
              </tr>
              <tr className="border-b border-line">
                <td className="py-3 pr-4 font-mono text-xs text-teal">velmont.wishlist</td>
                <td className="py-3">Product IDs you have saved</td>
              </tr>
              <tr className="border-b border-line">
                <td className="py-3 pr-4 font-mono text-xs text-teal">velmont.recentlyViewed</td>
                <td className="py-3">The last eight products you opened</td>
              </tr>
              <tr className="border-b border-line">
                <td className="py-3 pr-4 font-mono text-xs text-teal">velmont.lastOrder</td>
                <td className="py-3">
                  A summary of your most recent demo order: order number, items, totals, city,
                  country, first name, delivery method and date
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-xs text-teal">velmont.demoProfile</td>
                <td className="py-3">A demo profile containing only a first name and an email</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Nothing else is written. You can confirm this in your browser&apos;s developer tools
          under Application → Local Storage.
        </p>
      </>
    ),
  },
  {
    id: 'what-is-not-stored',
    title: 'What is never stored or transmitted',
    body: (
      <>
        <p>
          We deliberately do not persist information that would be sensitive in a real shop:
        </p>
        <ul className="ml-4 list-disc space-y-2 pl-1">
          <li>Your full delivery address, postal code or delivery notes.</li>
          <li>Your phone number.</li>
          <li>Any payment details — no card field is ever presented, and no gateway is contacted.</li>
          <li>Passwords, tokens or authentication credentials of any kind.</li>
          <li>Analytics, advertising identifiers or third-party tracking scripts.</li>
        </ul>
        <p>
          The checkout form keeps address and phone details in page memory only. They are
          discarded as soon as you navigate away.
        </p>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: 'Third-party services',
    body: (
      <>
        <p>
          Product photography is loaded from an external image CDN, and the Inter and Playfair
          Display typefaces are loaded from Google Fonts. Those requests reveal your IP address to
          those providers in the ordinary way any web request does — exactly as they would on any
          site using those services.
        </p>
        <p>
          There are no advertising networks, no social pixels and no analytics platforms embedded
          in this storefront.
        </p>
      </>
    ),
  },
  {
    id: 'your-controls',
    title: 'Your controls and choices',
    body: (
      <>
        <p>You are in full control of the small amount of data stored locally:</p>
        <ul className="ml-4 list-disc space-y-2 pl-1">
          <li>Empty your bag from the cart page to remove those entries.</li>
          <li>Remove items from your wishlist individually, or clear them all from the wishlist page.</li>
          <li>
            Use &ldquo;Sign out of demo&rdquo; on the{' '}
            <Link to="/account" className="font-semibold text-teal underline">
              account page
            </Link>{' '}
            to delete the demo profile.
          </li>
          <li>
            Clear this site&apos;s data in your browser settings to remove everything at once.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children&apos;s privacy',
    body: (
      <p>
        Because no personal information is collected at all, this demonstration is safe for
        visitors of any age. We do not knowingly gather information from anyone, including
        children under 13.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        If the demonstration is ever extended to include a real backend, this policy would be
        rewritten to describe exactly what is collected and why, before any information is
        gathered. As it stands, the policy describes the whole of the data handling in this
        project.
      </p>
    ),
  },
]

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How the VELMONT demo storefront handles data: everything stays in your browser, and nothing is transmitted to a server."
      />

      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="A short, honest policy: this demo collects nothing and transmits nothing. Everything it remembers lives in your browser."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
        compact
      />

      <div className="container-site pt-8">
        <p className="text-xs text-softgray">Last updated: 1 October 2026 · Version 1.0</p>
      </div>

      <PolicyLayout
        sections={SECTIONS}
        footerNote="Summary: no server, no database, no analytics and no payment gateway. Everything VELMONT remembers is stored in your browser's local storage and can be cleared at any time."
      />
    </>
  )
}
