import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import PolicyLayout from '../components/PolicyLayout.jsx'
import Seo from '../components/Seo.jsx'

const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of these terms',
    body: (
      <>
        <p>
          By using this website you agree to these terms. If you do not agree with any part of
          them, please stop using the site.
        </p>
        <p>
          VELMONT is a fictional brand created for a front-end development demonstration. These
          terms describe the (limited) basis on which the demonstration is provided.
        </p>
      </>
    ),
  },
  {
    id: 'demo-nature',
    title: '2. This is a demonstration, not a shop',
    body: (
      <>
        <p>The following are true of this entire website:</p>
        <ul className="ml-4 list-disc space-y-2 pl-1">
          <li>No products exist and no goods can be purchased.</li>
          <li>No order placed through the checkout is real or binding.</li>
          <li>No payment is processed and no card details are ever requested.</li>
          <li>Nothing is shipped, delivered or fulfilled.</li>
          <li>No contract of sale is formed at any point.</li>
        </ul>
        <p>
          Prices, stock levels, delivery estimates, promotions and the order number generated at
          checkout are illustrative only and carry no commercial meaning.
        </p>
      </>
    ),
  },
  {
    id: 'accounts',
    title: '3. Accounts and credentials',
    body: (
      <p>
        There is no authentication system. The &ldquo;account&rdquo; page stores a first name and
        email in your browser so the site can greet you. Do not enter a real password anywhere on
        this site — no password field exists, and none is required.
      </p>
    ),
  },
  {
    id: 'content',
    title: '4. Content and intellectual property',
    body: (
      <>
        <p>
          The VELMONT name, logo, copy, product data and interface design are original works
          created for this demonstration. Product photography is sourced from{' '}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-teal underline"
          >
            Unsplash
          </a>{' '}
          and used under the Unsplash License.
        </p>
        <p>
          You are welcome to study the code and the interface for learning purposes. You may not
          present this work as your own commercial storefront or reproduce the brand identity as
          a real business.
        </p>
      </>
    ),
  },
  {
    id: 'promotions',
    title: '5. Promotions and pricing',
    body: (
      <p>
        Discount codes such as VELMONT10 and ATELIER15 apply a local arithmetic reduction to the
        on-screen totals. They have no monetary value and cannot be redeemed anywhere. Sale
        pricing and &ldquo;discount&rdquo; percentages are illustrative.
      </p>
    ),
  },
  {
    id: 'availability',
    title: '6. Availability and changes',
    body: (
      <p>
        We may change, suspend or withdraw any part of this demonstration at any time without
        notice. Features described in the interface — such as the resole service or order
        tracking — are narrative elements of the demonstration and are not operational.
      </p>
    ),
  },
  {
    id: 'liability',
    title: '7. Limitation of liability',
    body: (
      <p>
        The site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without
        warranties of any kind. To the fullest extent permitted by law, VELMONT accepts no
        liability for any loss or damage arising from use of this demonstration, including
        reliance on any product information, price or delivery estimate shown.
      </p>
    ),
  },
  {
    id: 'privacy-link',
    title: '8. Privacy',
    body: (
      <p>
        Data handling is described in full in our{' '}
        <Link to="/privacy" className="font-semibold text-teal underline">
          Privacy Policy
        </Link>
        . In short: nothing is transmitted, and everything remembered is stored in your browser.
      </p>
    ),
  },
  {
    id: 'governing',
    title: '9. Governing law',
    body: (
      <p>
        These terms are provided for a demonstration and are governed by the laws of Denmark,
        without regard to conflict-of-law provisions. Any dispute would be subject to the
        exclusive jurisdiction of the courts of Copenhagen — a provision included for realism
        only.
      </p>
    ),
  },
]

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="Terms of service for the VELMONT demo storefront — a front-end demonstration with no real orders, payments or fulfilment."
      />

      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="The rules that apply to this storefront, including the important fact that it is a demonstration and no purchase can take place."
        breadcrumbs={[{ label: 'Terms of Service' }]}
        compact
      />

      <div className="container-site pt-8">
        <p className="text-xs text-softgray">Last updated: 1 October 2026 · Version 1.0</p>
      </div>

      <PolicyLayout
        sections={SECTIONS}
        footerNote="Plain-language summary: VELMONT is a fictional brand built to demonstrate a front-end shopping experience. Nothing is sold, shipped or charged, and no contract is created by using the checkout."
      />
    </>
  )
}
