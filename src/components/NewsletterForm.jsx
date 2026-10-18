import { useState } from 'react'
import { isEmail } from '../utils/validation.js'
import { CheckIcon } from './Icons.jsx'

/**
 * Local-only newsletter signup.
 * Validates in the browser, then shows a demo confirmation — no request is sent.
 */
export default function NewsletterForm({ variant = 'light', showNote = true }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const dark = variant === 'dark'

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!isEmail(email)) {
      setError('That email address doesn’t look right.')
      return
    }
    setError('')
    setSubscribed(true)
  }

  if (subscribed) {
    return (
      <div
        className={`flex items-start gap-3 rounded-sm border p-4 ${
          dark ? 'border-ivory/20 bg-teal-600 text-ivory' : 'border-forest/20 bg-forest/5 text-forest'
        }`}
        role="status"
      >
        <CheckIcon className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="text-sm font-semibold">You’re on the list</p>
          <p className={`mt-0.5 text-xs ${dark ? 'text-ivory/70' : 'text-softgray'}`}>
            Demo signup complete for {email}. No email was actually stored or sent.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubscribed(false)
              setEmail('')
            }}
            className={`mt-2 text-xs font-semibold underline ${
              dark ? 'text-copper-300' : 'text-teal'
            }`}
          >
            Sign up another address
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
            Email address
          </label>
          <input
            id={`newsletter-email-${variant}`}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
            placeholder="Enter Your Email"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `newsletter-error-${variant}` : undefined}
            className={
              dark
                ? 'w-full rounded-sm border border-ivory/25 bg-teal-600 px-4 py-3 text-base text-ivory placeholder:text-ivory/50 focus:border-copper focus:outline-none sm:text-sm'
                : 'input-field'
            }
          />
        </div>
        <button type="submit" className={dark ? 'btn-copper sm:w-auto' : 'btn-primary sm:w-auto'}>
          Subscribe
        </button>
      </div>

      {error && (
        <p
          id={`newsletter-error-${variant}`}
          role="alert"
          className={`mt-2 text-xs font-medium ${dark ? 'text-copper-300' : 'text-sale'}`}
        >
          {error}
        </p>
      )}

      {showNote && !error && (
        <p className={`mt-2 text-[11px] ${dark ? 'text-ivory/55' : 'text-softgray'}`}>
          Demo form — submissions stay in your browser and are never sent anywhere.
        </p>
      )}
    </form>
  )
}
