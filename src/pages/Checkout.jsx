import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { money } from '../data/products.js'
import { useStore } from '../context/StoreContext.jsx'
import Seo from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import {
  COUNTRIES,
  DELIVERY_OPTIONS,
  TAX_RATE,
  computeDelivery,
  deliveryEstimate,
  makeOrderNumber,
} from '../utils/commerce.js'
import { hasErrors, isEmail, isPhone, isPostalCode, minLength, required, validate } from '../utils/validation.js'
import { BagIcon, CheckIcon, ShieldIcon } from '../components/Icons.jsx'

const STEPS = [
  { id: 'contact', label: 'Contact' },
  { id: 'address', label: 'Delivery address' },
  { id: 'delivery', label: 'Delivery method' },
  { id: 'review', label: 'Review & confirm' },
]

const CONTACT_SCHEMA = {
  email: [
    (v) => (required(v) ? undefined : 'Enter your email address.'),
    (v) => (isEmail(v) ? undefined : 'Enter a valid email, e.g. name@example.com.'),
  ],
  phone: [
    (v) => (required(v) ? undefined : 'Enter a phone number for delivery updates.'),
    (v) => (isPhone(v) ? undefined : 'Use digits, spaces, + and ( ) only.'),
  ],
  firstName: [
    (v) => (required(v) ? undefined : 'Enter your first name.'),
    (v) => (minLength(v, 2) ? undefined : 'Names need at least 2 characters.'),
  ],
  lastName: [(v) => (required(v) ? undefined : 'Enter your last name.')],
  marketing: [],
}

const ADDRESS_SCHEMA = {
  address1: [(v) => (required(v) ? undefined : 'Enter your street address.')],
  city: [(v) => (required(v) ? undefined : 'Enter your town or city.')],
  postalCode: [
    (v) => (required(v) ? undefined : 'Enter your postal code.'),
    (v) => (isPostalCode(v) ? undefined : 'That postal code doesn’t look valid.'),
  ],
  country: [(v) => (required(v) ? undefined : 'Choose a country.')],
}

export default function Checkout() {
  const navigate = useNavigate()
  const { detailedCart, cartCount, cartSubtotal, clearCart, pushToast } = useStore()

  const [stepIndex, setStepIndex] = useState(0)
  const [errors, setErrors] = useState({})
  const [orderNumber] = useState(makeOrderNumber)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    marketing: true,
    address1: '',
    address2: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'United States',
    deliveryMethod: 'standard',
    notes: '',
    giftWrap: false,
  })

  const delivery = computeDelivery(cartSubtotal, form.deliveryMethod)
  const deliveryCost = delivery.charged
  const tax = (cartSubtotal + deliveryCost) * TAX_RATE
  const total = cartSubtotal + deliveryCost + tax

  const setField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e))
  }

  const { deliveryEstimateText, methodLabel } = useMemo(() => {
    const method = DELIVERY_OPTIONS.find((m) => m.id === form.deliveryMethod)
    return {
      deliveryEstimateText:
        form.deliveryMethod === 'express'
          ? '1–2 business days'
          : form.deliveryMethod === 'boutique'
            ? 'Ready for collection in 24 hours'
            : deliveryEstimate(),
      methodLabel: method?.label || 'Standard delivery',
    }
  }, [form.deliveryMethod])

  const validateStep = (stepId) => {
    if (stepId === 'contact') return validate(form, CONTACT_SCHEMA)
    if (stepId === 'address') return validate(form, ADDRESS_SCHEMA)
    return {}
  }

  const goNext = () => {
    const stepErrors = validateStep(STEPS[stepIndex].id)
    setErrors(stepErrors)
    if (hasErrors(stepErrors)) {
      pushToast({
        title: 'Please check the form',
        message: 'Some required details still need attention.',
        tone: 'sale',
      })
      return
    }
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
  }

  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0))

  const goToStep = (index) => {
    // Allow jumping back freely; jumping forward requires the earlier steps to pass.
    if (index <= stepIndex) {
      setStepIndex(index)
      return
    }
    for (let i = stepIndex; i < index; i += 1) {
      const stepErrors = validateStep(STEPS[i].id)
      if (hasErrors(stepErrors)) {
        setErrors(stepErrors)
        setStepIndex(i)
        return
      }
    }
    setStepIndex(index)
  }

  const placeOrder = (event) => {
    event.preventDefault()

    // Final guard: validate every step before "placing" the order.
    const contactErrors = validate(form, CONTACT_SCHEMA)
    const addressErrors = validate(form, ADDRESS_SCHEMA)
    const allErrors = { ...contactErrors, ...addressErrors }
    if (hasErrors(allErrors)) {
      setErrors(allErrors)
      const firstBadStep = hasErrors(contactErrors) ? 0 : 1
      setStepIndex(firstBadStep)
      pushToast({
        title: 'Cannot place demo order yet',
        message: 'Please complete the highlighted fields.',
        tone: 'sale',
      })
      return
    }

    setSubmitting(true)

    // Build a demo order. Deliberately excludes the address, phone and any
    // payment-like data — only a summary is kept in localStorage.
    const order = {
      orderNumber,
      placedAt: new Date().toISOString(),
      firstName: form.firstName,
      email: form.email,
      city: form.city,
      country: form.country,
      method: methodLabel,
      estimate: deliveryEstimateText,
      giftWrap: form.giftWrap,
      items: detailedCart.map((line) => ({
        name: line.product.name,
        brand: line.product.brand,
        size: line.size,
        color: line.color,
        quantity: line.quantity,
        price: line.product.price,
        image: line.product.images[0],
        productId: line.productId,
      })),
      totals: {
        subtotal: cartSubtotal,
        delivery: deliveryCost,
        tax,
        total,
      },
      isDemo: true,
    }

    window.setTimeout(() => {
      try {
        window.localStorage.setItem('velmont.lastOrder', JSON.stringify(order))
      } catch {
        /* storage unavailable — confirmation still renders from route state */
      }
      clearCart()
      setSubmitting(false)
      pushToast({
        title: 'Demo order placed',
        message: `${orderNumber} — no payment was taken.`,
        tone: 'forest',
      })
      navigate('/order-confirmation', { state: { order }, replace: true })
    }, 650)
  }

  if (!detailedCart.length) {
    return (
      <>
        <Seo title="Checkout" description="VELMONT demo checkout." />
        <PageHeader
          eyebrow="Almost there"
          title="Checkout"
          breadcrumbs={[{ label: 'Shopping bag', to: '/cart' }, { label: 'Checkout' }]}
          compact
        />
        <div className="container-site py-12 sm:py-16">
          <EmptyState
            icon={BagIcon}
            title="There’s nothing to check out"
            message="Add a pair to your bag first — the demo checkout will then walk you through contact, delivery and review."
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
        title="Checkout"
        description="A multi-step demo checkout. No real payment is processed."
      />
      <PageHeader
        eyebrow="Almost there"
        title="Checkout"
        subtitle="This is a simulated checkout. Complete the steps to generate a demo order number — no payment is taken and no details are sent anywhere."
        breadcrumbs={[{ label: 'Shopping bag', to: '/cart' }, { label: 'Checkout' }]}
        compact
      />

      <div className="container-site py-8 sm:py-12">
        {/* Demo notice */}
        <div className="mb-8 flex items-start gap-3 rounded-sm border border-copper/30 bg-copper-100/50 p-4">
          <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-copper-700" />
          <p className="text-xs leading-relaxed text-teal">
            <span className="font-semibold">Demo checkout.</span> Nothing is submitted to a
            server. Your address and phone number stay in this page&apos;s memory only, and your
            card is never requested. A single non-sensitive order summary is saved to this
            browser so the confirmation page can display it.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* ---------------------------- Steps ---------------------------- */}
          <div>
            {/* Stepper */}
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
              {STEPS.map((step, i) => {
                const done = i < stepIndex
                const active = i === stepIndex
                return (
                  <li key={step.id} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToStep(i)}
                      aria-current={active ? 'step' : undefined}
                      className="flex items-center gap-2.5 text-left"
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                          active
                            ? 'border-teal bg-teal text-ivory'
                            : done
                              ? 'border-forest bg-forest text-white'
                              : 'border-line bg-white text-softgray'
                        }`}
                      >
                        {done ? <CheckIcon className="h-4 w-4" /> : i + 1}
                      </span>
                      <span
                        className={`text-xs font-semibold sm:text-sm ${
                          active ? 'text-teal' : done ? 'text-forest' : 'text-softgray'
                        }`}
                      >
                        {step.label}
                      </span>
                    </button>
                    {i < STEPS.length - 1 && (
                      <span className="mx-1 hidden h-px w-6 bg-line sm:block lg:w-10" />
                    )}
                  </li>
                )
              })}
            </ol>

            <form onSubmit={placeOrder} noValidate className="mt-8">
              <div className="rounded-sm border border-line bg-white p-6 shadow-card sm:p-7">
                {/* ------------------------- Step 1: contact ------------------------ */}
                {STEPS[stepIndex].id === 'contact' && (
                  <fieldset className="animate-fadeIn">
                    <legend className="font-display text-xl text-teal">Contact details</legend>
                    <p className="mt-1 text-xs text-softgray">
                      Used only to confirm this demo order on screen.
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <Field
                        label="First name"
                        id="firstName"
                        value={form.firstName}
                        error={errors.firstName}
                        onChange={(v) => setField('firstName', v)}
                        autoComplete="given-name"
                        required
                      />
                      <Field
                        label="Last name"
                        id="lastName"
                        value={form.lastName}
                        error={errors.lastName}
                        onChange={(v) => setField('lastName', v)}
                        autoComplete="family-name"
                        required
                      />
                      <Field
                        label="Email address"
                        id="email"
                        type="email"
                        value={form.email}
                        error={errors.email}
                        onChange={(v) => setField('email', v)}
                        autoComplete="email"
                        required
                        className="sm:col-span-2"
                      />
                      <Field
                        label="Phone number"
                        id="phone"
                        type="tel"
                        value={form.phone}
                        error={errors.phone}
                        onChange={(v) => setField('phone', v)}
                        autoComplete="tel"
                        hint="For delivery updates only."
                        required
                        className="sm:col-span-2"
                      />
                    </div>

                    <label className="mt-5 flex items-start gap-3 text-xs text-softgray">
                      <input
                        type="checkbox"
                        checked={form.marketing}
                        onChange={(e) => setField('marketing', e.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-teal"
                      />
                      Email me atelier notes and new releases. (Demo only — nothing is sent.)
                    </label>
                  </fieldset>
                )}

                {/* ------------------------- Step 2: address ------------------------ */}
                {STEPS[stepIndex].id === 'address' && (
                  <fieldset className="animate-fadeIn">
                    <legend className="font-display text-xl text-teal">Delivery address</legend>
                    <p className="mt-1 text-xs text-softgray">
                      Held in this browser tab while you check out, then discarded.
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Address line 1"
                        id="address1"
                        value={form.address1}
                        error={errors.address1}
                        onChange={(v) => setField('address1', v)}
                        autoComplete="address-line1"
                        className="sm:col-span-2"
                        required
                      />
                      <Field
                        label="Address line 2"
                        id="address2"
                        value={form.address2}
                        error={errors.address2}
                        onChange={(v) => setField('address2', v)}
                        autoComplete="address-line2"
                        hint="Optional — apartment, suite, floor."
                        className="sm:col-span-2"
                      />
                      <Field
                        label="Town / City"
                        id="city"
                        value={form.city}
                        error={errors.city}
                        onChange={(v) => setField('city', v)}
                        autoComplete="address-level2"
                        required
                      />
                      <Field
                        label="State / Region"
                        id="region"
                        value={form.region}
                        error={errors.region}
                        onChange={(v) => setField('region', v)}
                        autoComplete="address-level1"
                        hint="Optional"
                      />
                      <Field
                        label="Postal code"
                        id="postalCode"
                        value={form.postalCode}
                        error={errors.postalCode}
                        onChange={(v) => setField('postalCode', v)}
                        autoComplete="postal-code"
                        required
                      />
                      <div>
                        <label htmlFor="country" className="label-field">
                          Country <span className="text-sale">*</span>
                        </label>
                        <select
                          id="country"
                          value={form.country}
                          onChange={(e) => setField('country', e.target.value)}
                          aria-invalid={Boolean(errors.country)}
                          className={`input-field ${
                            errors.country ? 'border-sale focus:border-sale' : ''
                          }`}
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        {errors.country && <FieldError id="country-error">{errors.country}</FieldError>}
                      </div>
                    </div>

                    <div className="mt-5">
                      <label htmlFor="notes" className="label-field">
                        Delivery notes
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        value={form.notes}
                        onChange={(e) => setField('notes', e.target.value)}
                        placeholder="Leave with a neighbour, gate code, etc. (optional)"
                        className="input-field resize-none"
                      />
                    </div>
                  </fieldset>
                )}

                {/* ------------------------ Step 3: delivery ------------------------ */}
                {STEPS[stepIndex].id === 'delivery' && (
                  <fieldset className="animate-fadeIn">
                    <legend className="font-display text-xl text-teal">Delivery method</legend>
                    <p className="mt-1 text-xs text-softgray">
                      Choose how this demo order would reach you.
                    </p>

                    <div className="mt-6 flex flex-col gap-3">
                      {DELIVERY_OPTIONS.map((option) => {
                        const charged =
                          option.freeOver && cartSubtotal >= option.freeOver ? 0 : option.price
                        const selected = form.deliveryMethod === option.id
                        return (
                          <label
                            key={option.id}
                            className={`flex cursor-pointer items-start gap-4 rounded-sm border p-4 transition-all ${
                              selected
                                ? 'border-teal bg-ivory'
                                : 'border-line bg-white hover:border-teal/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="deliveryMethod"
                              value={option.id}
                              checked={selected}
                              onChange={(e) => setField('deliveryMethod', e.target.value)}
                              className="mt-1 h-4 w-4 accent-teal"
                            />
                            <span className="flex-1">
                              <span className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold text-teal">
                                  {option.label}
                                </span>
                                <span className="text-sm font-semibold text-teal">
                                  {charged === 0 ? 'Free' : money(charged)}
                                </span>
                              </span>
                              <span className="mt-1 block text-xs text-softgray">
                                {option.detail}
                                {option.freeOver && cartSubtotal < option.freeOver && (
                                  <>
                                    {' '}
                                    · Free over ${option.freeOver} (you’re {money(option.freeOver - cartSubtotal)} away)
                                  </>
                                )}
                              </span>
                            </span>
                          </label>
                        )
                      })}
                    </div>

                    <label className="mt-5 flex items-start gap-3 rounded-sm border border-line bg-ivory p-4 text-xs text-softgray">
                      <input
                        type="checkbox"
                        checked={form.giftWrap}
                        onChange={(e) => setField('giftWrap', e.target.checked)}
                        className="mt-0.5 h-4 w-4 accent-teal"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-teal">
                          Add gift wrapping — complimentary
                        </span>
                        Cotton flannel bags and a handwritten card (demo only).
                      </span>
                    </label>
                  </fieldset>
                )}

                {/* -------------------------- Step 4: review ------------------------ */}
                {STEPS[stepIndex].id === 'review' && (
                  <div className="animate-fadeIn">
                    <h2 className="font-display text-xl text-teal">Review your demo order</h2>
                    <p className="mt-1 text-xs text-softgray">
                      Check everything looks right. Placing the order will not charge you or
                      contact any server.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <ReviewBlock title="Contact" onEdit={() => goToStep(0)}>
                        <p>
                          {form.firstName} {form.lastName}
                        </p>
                        <p>{form.email}</p>
                        <p>{form.phone}</p>
                      </ReviewBlock>

                      <ReviewBlock title="Delivering to" onEdit={() => goToStep(1)}>
                        <p>{form.address1}</p>
                        {form.address2 && <p>{form.address2}</p>}
                        <p>
                          {form.city}
                          {form.region ? `, ${form.region}` : ''} {form.postalCode}
                        </p>
                        <p>{form.country}</p>
                      </ReviewBlock>

                      <ReviewBlock title="Delivery method" onEdit={() => goToStep(2)}>
                        <p>{methodLabel}</p>
                        <p>Estimated arrival: {deliveryEstimateText}</p>
                        {form.giftWrap && <p>Gift wrapping included</p>}
                      </ReviewBlock>

                      <ReviewBlock title="Payment">
                        <p className="font-semibold text-teal">Not required</p>
                        <p>
                          This is a front-end demo. No payment method is collected and no
                          transaction occurs.
                        </p>
                      </ReviewBlock>
                    </div>

                    <div className="mt-6 rounded-sm border border-line bg-ivory p-4">
                      <p className="text-xs text-softgray">
                        By placing this demo order you agree that it is a simulation for
                        demonstration purposes only, subject to our{' '}
                        <Link to="/terms" className="font-semibold text-teal underline">
                          Terms of Service
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {stepIndex === 0 ? (
                  <Link to="/cart" className="btn-ghost">
                    ← Back to bag
                  </Link>
                ) : (
                  <button type="button" onClick={goBack} className="btn-ghost">
                    ← Previous step
                  </button>
                )}

                {stepIndex < STEPS.length - 1 ? (
                  <button type="button" onClick={goNext} className="btn-primary px-8">
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-copper px-8"
                  >
                    {submitting ? 'Placing demo order…' : `Place demo order · ${money(total)}`}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* ---------------------------- Summary ---------------------------- */}
          <aside aria-label="Order summary" className="lg:sticky lg:top-[92px] lg:self-start">
            <div className="rounded-sm border border-line bg-white p-6 shadow-card">
              <h2 className="font-display text-xl text-teal">
                Your order ({cartCount})
              </h2>

              <ul className="mt-5 max-h-80 space-y-4 overflow-y-auto pr-1">
                {detailedCart.map((line) => (
                  <li key={line.key} className="flex gap-3.5">
                    <ImageWithFallback
                      src={line.product.images[0]}
                      alt={line.product.name}
                      wrapperClassName="h-20 w-16 shrink-0 rounded-sm border border-line"
                      className="h-full w-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-teal">
                        {line.product.name}
                      </p>
                      <p className="mt-0.5 text-xs text-softgray">
                        EU {line.size} · {line.color} · Qty {line.quantity}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-teal">
                        {money(line.lineTotal)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-softgray">Subtotal</dt>
                  <dd className="font-semibold text-teal">{money(cartSubtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-softgray">
                    {STEPS[stepIndex].id === 'review' ? methodLabel : 'Delivery'}
                  </dt>
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

              <p className="mt-4 text-center text-[11px] text-softgray">
                Estimated delivery {deliveryEstimateText}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

/* --------------------------- local sub-components -------------------------- */

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = 'text',
  hint,
  required: isRequired,
  className = '',
  autoComplete,
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label-field">
        {label} {isRequired && <span className="text-sale">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        required={isRequired}
        className={`input-field ${error ? 'border-sale focus:border-sale' : ''}`}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[11px] text-softgray">
          {hint}
        </p>
      )}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  )
}

function FieldError({ id, children }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-[11px] font-medium text-sale">
      {children}
    </p>
  )
}

function ReviewBlock({ title, children, onEdit }) {
  return (
    <div className="rounded-sm border border-line bg-ivory p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
          {title}
        </p>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-xs font-semibold text-teal underline hover:text-copper-600"
          >
            Edit
          </button>
        )}
      </div>
      <div className="mt-2 space-y-0.5 text-sm text-teal [&_p]:break-words">{children}</div>
    </div>
  )
}
