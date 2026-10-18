import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Seo from '../components/Seo.jsx'
import { ChevronDown, SearchIcon } from '../components/Icons.jsx'

const FAQ_GROUPS = [
  {
    id: 'orders',
    title: 'Orders & checkout',
    items: [
      {
        q: 'Is this a real shop?',
        a: 'No. VELMONT is a front-end demonstration built with React, Vite and Tailwind CSS. You can browse, filter, save items, add to a bag and complete the checkout flow, but no order is placed, no payment is taken and nothing is dispatched.',
      },
      {
        q: 'What happens when I “place” an order?',
        a: 'The checkout generates a demo order number and shows a summary on the confirmation page. A small, non-sensitive summary is saved in your browser so the page can be revisited. Your address, phone number and any payment details are never requested or stored.',
      },
      {
        q: 'Do the promotional codes do anything?',
        a: 'Yes — locally. In the shopping bag, try VELMONT10 for 10% off or ATELIER15 for 15% off. The discount is applied to the on-screen totals immediately. No code is validated against a server.',
      },
      {
        q: 'Can I keep a bag or wishlist between visits?',
        a: 'Yes. Your bag, wishlist and recently viewed products are stored in your browser’s local storage, so refreshing the page or closing the tab and returning will restore them.',
      },
    ],
  },
  {
    id: 'sizing',
    title: 'Sizing & fit',
    items: [
      {
        q: 'How do VELMONT sizes run?',
        a: 'Our lasts run true to size for most people. If you sit between two sizes, we suggest taking the larger — leather and suede will relax slightly with wear but will not stretch lengthwise.',
      },
      {
        q: 'What is the difference between EU and UK sizing?',
        a: 'All sizes on this storefront are shown in EU sizing, which is the most consistent across our workshops. As a rough guide, EU 42 is close to a UK 8 and a US 9 for men.',
      },
      {
        q: 'How should a new leather shoe feel?',
        a: 'Snug around the instep with roughly a thumb’s width in front of the longest toe. It should not pinch across the widest part of the foot. Give a new pair three or four short wears rather than one long day.',
      },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery',
    items: [
      {
        q: 'What delivery options are shown at checkout?',
        a: 'Standard delivery (4–6 business days, free over $150), express delivery (1–2 business days, $14.90) and boutique collection. Choosing an option updates the estimated arrival and totals on screen — though nothing is actually shipped in this demo.',
      },
      {
        q: 'Can I add delivery notes?',
        a: 'Yes. The address step accepts an optional note (a gate code, a safe place, a neighbour). In a real store this would be printed on the label; here it simply stays in the form.',
      },
    ],
  },
  {
    id: 'returns',
    title: 'Returns & repairs',
    items: [
      {
        q: 'What is the returns window?',
        a: 'Thirty days from delivery, worn or unworn, provided the shoes are in a resaleable condition. In this demo no return can actually be processed — the policy exists to make the experience realistic.',
      },
      {
        q: 'Can VELMONT shoes be repaired?',
        a: 'That is the point of the collection. Welted and Blake-stitched construction means a competent cobbler can replace the sole, and often the welt itself, several times over.',
      },
      {
        q: 'Do you resole shoes you did not sell?',
        a: 'In the story of this fictional atelier, yes — any welted shoe is accepted. Here, the repair service is illustrative only.',
      },
    ],
  },
  {
    id: 'account',
    title: 'Account & privacy',
    items: [
      {
        q: 'Do I need an account to shop?',
        a: 'No. Browsing, saving and checkout all work without signing in. The demo account page simply stores a name and email in your browser so it can greet you by name.',
      },
      {
        q: 'What data is stored in my browser?',
        a: 'Your bag, wishlist, recently viewed products, a demo profile (name and email only) and a non-sensitive summary of your most recent demo order. Nothing else — and nothing is transmitted anywhere.',
      },
      {
        q: 'How do I clear everything?',
        a: 'Empty your bag, remove wishlist items, or clear this site’s data in your browser settings. Clearing site data removes every trace of the demo immediately.',
      },
    ],
  },
]

export default function Faq() {
  const [query, setQuery] = useState('')
  const [activeGroup, setActiveGroup] = useState('orders')
  const [openId, setOpenId] = useState('orders-0')

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return FAQ_GROUPS
    return FAQ_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q),
      ),
    })).filter((group) => group.items.length > 0)
  }, [query])

  const searching = query.trim().length > 0
  const visibleGroups = searching ? filteredGroups : FAQ_GROUPS.filter((g) => g.id === activeGroup)
  const totalResults = filteredGroups.reduce((sum, g) => sum + g.items.length, 0)

  return (
    <>
      <Seo
        title="FAQ"
        description="Answers to common questions about the VELMONT demo storefront — orders, sizing, delivery, returns, accounts and privacy."
      />

      <PageHeader
        eyebrow="Help centre"
        title="Frequently asked questions"
        subtitle="How the demo storefront behaves, how our (fictional) sizing works, and exactly what is stored in your browser."
        breadcrumbs={[{ label: 'FAQ' }]}
        compact
      />

      <div className="container-site py-10 sm:py-14">
        {/* Search */}
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-softgray" />
            <label htmlFor="faq-search" className="sr-only">
              Search the FAQ
            </label>
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the help centre…"
              className="input-field py-3.5 pl-12"
            />
          </div>
          {searching && (
            <p className="mt-2 text-center text-xs text-softgray" aria-live="polite">
              {totalResults} {totalResults === 1 ? 'answer' : 'answers'} for “{query.trim()}”
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* Categories */}
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-[92px] lg:self-start">
            <ul className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 no-scrollbar lg:flex-col lg:gap-1 lg:overflow-visible">
              {FAQ_GROUPS.map((group) => {
                const active = !searching && group.id === activeGroup
                return (
                  <li key={group.id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('')
                        setActiveGroup(group.id)
                        setOpenId(`${group.id}-0`)
                      }}
                      aria-current={active ? 'true' : undefined}
                      className={`w-full whitespace-nowrap rounded-sm px-4 py-3 text-left text-sm font-medium transition-colors lg:whitespace-normal ${
                        active
                          ? 'bg-teal text-ivory'
                          : 'text-teal hover:bg-white lg:border lg:border-line'
                      }`}
                    >
                      {group.title}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Questions */}
          <div className="min-w-0">
            {visibleGroups.length === 0 ? (
              <div className="rounded-sm border border-line bg-white px-6 py-12 text-center">
                <p className="text-sm font-semibold text-teal">No answers matched that search</p>
                <p className="mx-auto mt-1 max-w-sm text-xs text-softgray">
                  Try a broader term such as “delivery”, “sizing” or “privacy” — or get in touch
                  and we’ll add it.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <button type="button" onClick={() => setQuery('')} className="btn-outline">
                    Clear search
                  </button>
                  <Link to="/contact" className="btn-primary">
                    Ask the studio
                  </Link>
                </div>
              </div>
            ) : (
              visibleGroups.map((group) => (
                <section key={group.id} className="mb-8 last:mb-0">
                  <h2 className="font-display text-xl text-teal">{group.title}</h2>
                  <div className="mt-4 divide-y divide-line rounded-sm border border-line bg-white">
                    {group.items.map((item, i) => {
                      const id = `${group.id}-${i}`
                      const open = openId === id
                      return (
                        <div key={id}>
                          <h3>
                            <button
                              type="button"
                              onClick={() => setOpenId(open ? '' : id)}
                              aria-expanded={open}
                              aria-controls={`faq-panel-${id}`}
                              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-teal transition-colors hover:text-copper-600"
                            >
                              <span className="min-w-0 flex-1 break-words">{item.q}</span>
                              <ChevronDown
                                className={`mt-0.5 h-4 w-4 shrink-0 transition-transform ${
                                  open ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                          </h3>
                          {open && (
                            <div
                              id={`faq-panel-${id}`}
                              className="animate-fadeIn break-words px-5 pb-5 text-sm leading-relaxed text-softgray"
                            >
                              {item.a}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>

        {/* Still stuck */}
        <div className="mt-12 rounded-sm bg-teal p-8 text-center text-ivory sm:p-12">
          <span className="eyebrow text-copper-300">Still stuck?</span>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl sm:text-3xl">
            The studio answers locally, within the page
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ivory/70">
            Send a message through the contact form and you’ll see exactly what would have been
            delivered — without anything leaving your browser.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn-copper">
              Contact the studio
            </Link>
            <Link
              to="/shipping-returns"
              className="btn border border-ivory/30 text-ivory hover:bg-ivory hover:text-teal"
            >
              Shipping & returns
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
