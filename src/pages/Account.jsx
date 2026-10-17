import { useState } from 'react'
import { Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { useStore } from '../context/StoreContext.jsx'
import { money } from '../data/products.js'
import PageHeader from '../components/PageHeader.jsx'
import Seo from '../components/Seo.jsx'
import { useLastOrder } from '../utils/commerce.js'
import { isEmail, minLength, required, validate, hasErrors } from '../utils/validation.js'
import { BagIcon, CheckIcon, HeartIcon, InfoIcon, ShieldIcon, UserIcon } from '../components/Icons.jsx'

const SCHEMA = {
  email: [
    (v) => (required(v) ? undefined : 'Enter an email address.'),
    (v) => (isEmail(v) ? undefined : 'That email address doesn’t look valid.'),
  ],
  firstName: [
    (v) => (required(v) ? undefined : 'Enter your first name.'),
    (v) => (minLength(v, 2) ? undefined : 'Names need at least 2 characters.'),
  ],
}

export default function Account() {
  const { cartCount, wishlistCount, pushToast } = useStore()
  const [profile, setProfile] = useLocalStorage('velmont.demoProfile', null)
  const [lastOrder] = useLastOrder()

  const [form, setForm] = useState({ firstName: '', email: '' })
  const [errors, setErrors] = useState({})

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = validate(form, SCHEMA)
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    // A local-only "profile". No password, no auth, no server.
    setProfile({
      firstName: form.firstName.trim(),
      email: form.email.trim(),
      since: new Date().toISOString(),
    })
    pushToast({
      title: 'Demo profile saved',
      message: `Welcome, ${form.firstName.trim()}`,
      tone: 'forest',
    })
  }

  const signOut = () => {
    setProfile(null)
    setForm({ firstName: '', email: '' })
    pushToast({
      title: 'Signed out of demo profile',
      message: 'Nothing was deleted from your bag or wishlist.',
      tone: 'teal',
    })
  }

  return (
    <>
      <Seo
        title="Account"
        description="VELMONT demo account. There is no authentication, server or password — the profile is stored only in this browser."
      />

      <PageHeader
        eyebrow="Your account"
        title={profile ? `Welcome back, ${profile.firstName}` : 'Demo account'}
        subtitle="This storefront has no authentication, no server and no password. Your profile is a convenience record kept only in this browser."
        breadcrumbs={[{ label: 'Account' }]}
        compact
      />

      <div className="container-site py-10 sm:py-14">
        <div className="mb-8 flex items-start gap-3 rounded-sm border border-copper/30 bg-copper-100/50 p-4">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-copper-700" />
          <p className="text-xs leading-relaxed text-teal">
            <span className="font-semibold">No real account exists.</span> We never ask for a
            password, never verify an email and never contact a server. Clearing your browser
            storage removes this profile entirely.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
          {/* Profile / sign-in */}
          <div>
            {profile ? (
              <div className="rounded-sm border border-line bg-white p-6 shadow-card sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal text-ivory">
                  <UserIcon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-2xl text-teal">{profile.firstName}</h2>
                <p className="mt-1 text-sm text-softgray">{profile.email}</p>
                <p className="mt-1 text-xs text-softgray">
                  Demo profile created{' '}
                  {new Date(profile.since).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>

                <dl className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
                      In your bag
                    </dt>
                    <dd className="mt-1 font-display text-2xl text-teal">{cartCount}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
                      Wishlist
                    </dt>
                    <dd className="mt-1 font-display text-2xl text-teal">{wishlistCount}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
                      Demo orders
                    </dt>
                    <dd className="mt-1 font-display text-2xl text-teal">{lastOrder ? 1 : 0}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link to="/cart" className="btn-primary">
                    View your bag
                  </Link>
                  <Link to="/wishlist" className="btn-ghost">
                    View wishlist
                  </Link>
                  <button type="button" onClick={signOut} className="btn-ghost">
                    Sign out of demo
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={submit}
                noValidate
                className="rounded-sm border border-line bg-white p-6 shadow-card sm:p-7"
              >
                <h2 className="font-display text-xl text-teal">Create a demo profile</h2>
                <p className="mt-1 text-xs text-softgray">
                  Two fields, no password, no verification. We only use them to greet you.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="acc-first" className="label-field">
                      First name <span className="text-sale">*</span>
                    </label>
                    <input
                      id="acc-first"
                      type="text"
                      value={form.firstName}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, firstName: e.target.value }))
                        if (errors.firstName) setErrors((x) => ({ ...x, firstName: undefined }))
                      }}
                      aria-invalid={Boolean(errors.firstName)}
                      className={`input-field ${errors.firstName ? 'border-sale' : ''}`}
                      autoComplete="given-name"
                    />
                    {errors.firstName && (
                      <p role="alert" className="mt-1.5 text-[11px] font-medium text-sale">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="acc-email" className="label-field">
                      Email <span className="text-sale">*</span>
                    </label>
                    <input
                      id="acc-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, email: e.target.value }))
                        if (errors.email) setErrors((x) => ({ ...x, email: undefined }))
                      }}
                      aria-invalid={Boolean(errors.email)}
                      className={`input-field ${errors.email ? 'border-sale' : ''}`}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1.5 text-[11px] font-medium text-sale">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn-primary mt-6 w-full py-3.5 sm:w-auto sm:px-10">
                  Save demo profile
                </button>
              </form>
            )}

            {/* Last demo order */}
            <section className="mt-8">
              <h2 className="font-display text-xl text-teal">Order history</h2>
              <p className="mt-1 text-xs text-softgray">
                Only the most recent demo order is retained.
              </p>

              {lastOrder ? (
                <div className="mt-5 rounded-sm border border-line bg-white p-5 shadow-card">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-teal">{lastOrder.orderNumber}</p>
                      <p className="mt-0.5 text-xs text-softgray">
                        {new Date(lastOrder.placedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}{' '}
                        · {lastOrder.items.length}{' '}
                        {lastOrder.items.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-sm bg-forest/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-forest">
                      <CheckIcon className="h-3 w-3" />
                      Demo
                    </span>
                    <p className="font-display text-xl text-teal">
                      {money(lastOrder.totals.total)}
                    </p>
                  </div>
                  <Link
                    to="/order-confirmation"
                    className="link-underline mt-4 inline-block text-xs font-semibold text-teal"
                  >
                    View the confirmation
                  </Link>
                </div>
              ) : (
                <div className="mt-5 rounded-sm border border-dashed border-line bg-white px-6 py-10 text-center">
                  <p className="text-sm font-semibold text-teal">No demo orders yet</p>
                  <p className="mx-auto mt-1 max-w-sm text-xs text-softgray">
                    Complete the simulated checkout and your order number will appear here.
                  </p>
                  <Link to="/shop" className="btn-outline mt-5">
                    Start shopping
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Aside */}
          <aside className="flex flex-col gap-5">
            <div className="rounded-sm border border-line bg-white p-6 shadow-card">
              <h2 className="font-display text-lg text-teal">Your shortcuts</h2>
              <ul className="mt-4 flex flex-col gap-1">
                <li>
                  <Link
                    to="/cart"
                    className="flex items-center justify-between rounded-sm px-3 py-3 text-sm text-teal transition-colors hover:bg-ivory"
                  >
                    <span className="flex items-center gap-3">
                      <BagIcon className="h-4 w-4 text-copper" />
                      Shopping bag
                    </span>
                    <span className="text-xs text-softgray">{cartCount} items</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="flex items-center justify-between rounded-sm px-3 py-3 text-sm text-teal transition-colors hover:bg-ivory"
                  >
                    <span className="flex items-center gap-3">
                      <HeartIcon className="h-4 w-4 text-copper" />
                      Wishlist
                    </span>
                    <span className="text-xs text-softgray">{wishlistCount} items</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping-returns"
                    className="flex items-center justify-between rounded-sm px-3 py-3 text-sm text-teal transition-colors hover:bg-ivory"
                  >
                    <span className="flex items-center gap-3">
                      <ShieldIcon className="h-4 w-4 text-copper" />
                      Shipping & returns
                    </span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="flex items-center justify-between rounded-sm px-3 py-3 text-sm text-teal transition-colors hover:bg-ivory"
                  >
                    <span className="flex items-center gap-3">
                      <InfoIcon className="h-4 w-4 text-copper" />
                      Help & FAQ
                    </span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-sm border border-line bg-ivory p-6">
              <h2 className="font-display text-lg text-teal">What’s stored locally</h2>
              <ul className="mt-3 space-y-2 text-xs text-softgray">
                {[
                  'Your bag and its quantities',
                  'Your wishlist selections',
                  'Recently viewed products',
                  'This demo profile (name and email only)',
                  'A summary of your most recent demo order',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] leading-relaxed text-softgray">
                No address, phone number or payment information is ever saved. See our{' '}
                <Link to="/privacy" className="font-semibold text-teal underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
