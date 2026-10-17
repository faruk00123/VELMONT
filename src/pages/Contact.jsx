import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Seo from '../components/Seo.jsx'
import NewsletterForm from '../components/NewsletterForm.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { isEmail, minLength, required, validate, hasErrors } from '../utils/validation.js'
import { CheckIcon, MailIcon, PhoneIcon, PinIcon, SparkIcon } from '../components/Icons.jsx'

const SUBJECTS = [
  'General enquiry',
  'Order support (demo)',
  'Sizing advice',
  'Repairs & resoling',
  'Press & partnerships',
]

const SCHEMA = {
  name: [
    (v) => (required(v) ? undefined : 'Please tell us your name.'),
    (v) => (minLength(v, 2) ? undefined : 'That name looks a little short.'),
  ],
  email: [
    (v) => (required(v) ? undefined : 'We need an email address to reply.'),
    (v) => (isEmail(v) ? undefined : 'That email address doesn’t look valid.'),
  ],
  subject: [(v) => (required(v) ? undefined : 'Choose a subject.')],
  message: [
    (v) => (required(v) ? undefined : 'Please write a short message.'),
    (v) => (minLength(v, 15) ? undefined : 'A little more detail helps — at least 15 characters.'),
  ],
}

const EMPTY = { name: '', email: '', subject: SUBJECTS[0], message: '', copyMe: true }

export default function Contact() {
  const { pushToast } = useStore()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)
  const [touched, setTouched] = useState({})

  const setField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (touched[field]) {
      const nextErrors = validate({ ...form, [field]: value }, SCHEMA)
      setErrors(nextErrors)
    }
  }

  const blur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(form, SCHEMA))
  }

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = validate(form, SCHEMA)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (hasErrors(nextErrors)) {
      pushToast({
        title: 'Message not sent',
        message: 'Please correct the highlighted fields.',
        tone: 'sale',
      })
      return
    }

    // No network request — the "message" is only echoed back on screen.
    setSent({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      reference: `MSG-${Date.now().toString(36).toUpperCase().slice(-5)}`,
    })
    pushToast({
      title: 'Demo message logged',
      message: 'Not transmitted — see the note on screen.',
      tone: 'copper',
    })
  }

  return (
    <>
      <Seo
        title="Contact"
        description="Contact the VELMONT studio. The form validates locally and clearly indicates that nothing is transmitted."
      />

      <PageHeader
        eyebrow="Say hello"
        title="Contact the studio"
        subtitle="Questions on sizing, repairs or an order? Write to us below. This contact form runs entirely in your browser — nothing is transmitted to a server."
        breadcrumbs={[{ label: 'Contact' }]}
        image="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1600&q=80"
        compact
      />

      <div className="container-site py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
          {/* Form */}
          <div>
            {sent ? (
              <div className="rounded-sm border border-forest/25 bg-white p-7 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <CheckIcon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-2xl text-teal">Your message is ready</h2>
                <p className="mt-2 text-sm leading-relaxed text-softgray">
                  Thanks, {sent.name}. This is a demo, so your message was{' '}
                  <span className="font-semibold text-teal">not sent anywhere</span> — no email
                  was dispatched and no data left your browser. Here is exactly what would have
                  been delivered:
                </p>

                <dl className="mt-5 space-y-3 rounded-sm border border-line bg-ivory p-4 text-sm">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
                      From
                    </dt>
                    <dd className="mt-0.5 text-teal">
                      {sent.name} · {sent.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
                      Subject
                    </dt>
                    <dd className="mt-0.5 text-teal">{sent.subject}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
                      Message
                    </dt>
                    <dd className="mt-0.5 whitespace-pre-wrap break-words text-softgray">
                      {sent.message}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-softgray">
                      Local reference
                    </dt>
                    <dd className="mt-0.5 font-mono text-xs text-teal">{sent.reference}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setSent(null)
                      setForm(EMPTY)
                      setErrors({})
                      setTouched({})
                    }}
                    className="btn-primary"
                  >
                    Write another message
                  </button>
                  <Link to="/faq" className="btn-ghost">
                    Read the FAQ
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={submit}
                noValidate
                className="rounded-sm border border-line bg-white p-6 shadow-card sm:p-7"
              >
                <h2 className="font-display text-xl text-teal">Send a message</h2>
                <p className="mt-1 text-xs text-softgray">
                  All fields marked <span className="text-sale">*</span> are required. Demo form —
                  nothing is submitted.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label-field">
                      Your name <span className="text-sale">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setField('name', e.target.value)}
                      onBlur={() => blur('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`input-field ${errors.name ? 'border-sale focus:border-sale' : ''}`}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="mt-1.5 text-[11px] font-medium text-sale">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="label-field">
                      Email <span className="text-sale">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setField('email', e.target.value)}
                      onBlur={() => blur('email')}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={`input-field ${errors.email ? 'border-sale focus:border-sale' : ''}`}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="mt-1.5 text-[11px] font-medium text-sale"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="label-field">
                      Subject <span className="text-sale">*</span>
                    </label>
                    <select
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setField('subject', e.target.value)}
                      onBlur={() => blur('subject')}
                      className="input-field"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="label-field">
                      Message <span className="text-sale">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={form.message}
                      onChange={(e) => setField('message', e.target.value)}
                      onBlur={() => blur('message')}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                      placeholder="Tell us what you need — sizing, an order question, a repair…"
                      className={`input-field resize-none ${
                        errors.message ? 'border-sale focus:border-sale' : ''
                      }`}
                    />
                    {errors.message ? (
                      <p
                        id="message-error"
                        role="alert"
                        className="mt-1.5 text-[11px] font-medium text-sale"
                      >
                        {errors.message}
                      </p>
                    ) : (
                      <p id="message-hint" className="mt-1.5 text-[11px] text-softgray">
                        {form.message.trim().length} characters (minimum 15)
                      </p>
                    )}
                  </div>
                </div>

                <label className="mt-5 flex items-start gap-3 text-xs text-softgray">
                  <input
                    type="checkbox"
                    checked={form.copyMe}
                    onChange={(e) => setField('copyMe', e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-teal"
                  />
                  Send me a copy of this message. (Demo — no email is sent either way.)
                </label>

                <button type="submit" className="btn-primary mt-6 w-full py-3.5 sm:w-auto sm:px-10">
                  Send demo message
                </button>

                <p className="mt-3 text-[11px] leading-relaxed text-softgray">
                  By submitting you acknowledge this is a front-end demonstration: your input
                  stays in this browser tab and is discarded when you leave the page.
                </p>
              </form>
            )}
          </div>

          {/* Aside */}
          <aside className="flex flex-col gap-5">
            <div className="rounded-sm border border-line bg-white p-6 shadow-card">
              <h2 className="font-display text-lg text-teal">Studio details</h2>
              <ul className="mt-4 flex flex-col gap-4 text-sm">
                <li className="flex items-start gap-3">
                  <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                  <span className="text-softgray">
                    <span className="block font-semibold text-teal">VELMONT Atelier</span>
                    14 Harbour Lane
                    <br />
                    1055 Copenhagen, Denmark
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                  <span className="text-softgray">
                    <span className="block font-semibold text-teal">Email</span>
                    <a href="mailto:studio@velmont.example" className="hover:text-copper-600">
                      studio@velmont.example
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                  <span className="text-softgray">
                    <span className="block font-semibold text-teal">Phone</span>
                    <a href="tel:+4531000000" className="hover:text-copper-600">
                      +45 31 00 00 00
                    </a>
                  </span>
                </li>
              </ul>

              <dl className="mt-5 border-t border-line pt-5 text-xs">
                <dt className="font-semibold uppercase tracking-wider text-softgray">
                  Opening hours
                </dt>
                <dd className="mt-2 flex justify-between text-softgray">
                  <span>Mon – Fri</span>
                  <span className="text-teal">09:00 – 18:00</span>
                </dd>
                <dd className="mt-1 flex justify-between text-softgray">
                  <span>Saturday</span>
                  <span className="text-teal">10:00 – 16:00</span>
                </dd>
                <dd className="mt-1 flex justify-between text-softgray">
                  <span>Sunday</span>
                  <span className="text-teal">Closed</span>
                </dd>
              </dl>
            </div>

            <div className="rounded-sm border border-line bg-ivory p-6">
              <SparkIcon className="h-5 w-5 text-copper" />
              <h2 className="mt-3 font-display text-lg text-teal">Faster answers</h2>
              <p className="mt-2 text-sm text-softgray">
                Most sizing, delivery and returns questions are covered in the FAQ and our
                shipping notes.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Link to="/faq" className="link-underline self-start text-sm font-semibold text-teal">
                  Read the FAQ
                </Link>
                <Link
                  to="/shipping-returns"
                  className="link-underline self-start text-sm font-semibold text-teal"
                >
                  Shipping & returns
                </Link>
              </div>
            </div>

            <div className="rounded-sm border border-copper/30 bg-copper-100/50 p-6">
              <h2 className="font-display text-lg text-teal">The VELMONT letter</h2>
              <p className="mt-2 text-sm text-softgray">
                One email a month. Demo signup — nothing is stored.
              </p>
              <div className="mt-4">
                <NewsletterForm variant="light" showNote={false} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
