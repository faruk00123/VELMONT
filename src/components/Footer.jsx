import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/products.js'
import { CONTACT, mailtoLink, telLink } from '../data/contact.js'
import {
  MailIcon,
  PhoneIcon,
  PinIcon,
  RefreshIcon,
  ShieldIcon,
  TruckIcon,
} from './Icons.jsx'
import NewsletterForm from './NewsletterForm.jsx'

const HELP_LINKS = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Shipping & Returns', to: '/shipping-returns' },
  { label: 'Contact us', to: '/contact' },
  { label: 'Track a demo order', to: '/shipping-returns#tracking' },
]

const COMPANY_LINKS = [
  { label: 'Our story', to: '/about' },
  { label: 'Sustainability', to: '/about#sustainability' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

const PROMISES = [
  { icon: TruckIcon, title: 'Carbon-neutral delivery', copy: 'Free over $150, worldwide' },
  { icon: RefreshIcon, title: '30-day returns', copy: 'Worn or unworn, no questions' },
  { icon: ShieldIcon, title: 'Secure checkout', copy: 'This demo never charges a card' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 bg-teal text-ivory">
      {/* Service promises */}
      <div className="border-b border-ivory/10">
        <div className="container-site grid gap-6 py-10 sm:grid-cols-3">
          {PROMISES.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory/10 text-copper-300">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-0.5 text-xs text-ivory/60">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-ivory/10">
        <div className="container-site grid gap-6 py-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-copper-300">The VELMONT Letter</p>
            <h2 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">
              Atelier notes, new lasts and quiet releases.
            </h2>
            <p className="mt-2 max-w-lg text-sm text-ivory/70">
              One considered email a month. No noise, no resends, and no real
              mailing list behind this demo.
            </p>
          </div>
          <NewsletterForm variant="dark" />
        </div>
      </div>

      {/* Link columns */}
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden="true">
              <rect width="64" height="64" rx="14" fill="#F7F3EB" />
              <path d="M16 18 L26.5 44 H32 L21.5 18 Z" fill="#174E50" />
              <path d="M34 18 L44.5 44 H50 L39.5 18 Z" fill="#C58B52" />
            </svg>
            <span className="font-display text-[22px] font-semibold tracking-[0.14em]">
              VELMONT
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">
            A footwear atelier making quiet, long-lasting shoes — built to be
            repaired, resoled and kept.
          </p>
          <ul className="mt-5 flex flex-col gap-2.5 text-sm text-ivory/70">
            <li className="flex items-start gap-2.5">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-copper-300" />
              <a
                href={CONTACT.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="min-w-0 break-words hover:text-ivory"
              >
                {CONTACT.location}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-copper-300" />
              <a href={mailtoLink()} className="min-w-0 break-all hover:text-ivory">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-copper-300" />
              <a href={telLink} className="min-w-0 break-words hover:text-ivory">
                {CONTACT.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Shop">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-copper-300">
            Shop
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            <li>
              <Link to="/shop" className="text-ivory/70 transition-colors hover:text-ivory">
                All footwear
              </Link>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/shop/${cat.slug}`}
                  className="text-ivory/70 transition-colors hover:text-ivory"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Help">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-copper-300">
            Help
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {HELP_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-ivory/70 transition-colors hover:text-ivory">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-copper-300">
            House
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-ivory/70 transition-colors hover:text-ivory">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Demo disclaimer + legal */}
      <div className="border-t border-ivory/10">
        <div className="container-site flex flex-col gap-4 py-6 text-xs text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} VELMONT Atelier. A front-end demo — no real products, orders or
            payments are processed.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="transition-colors hover:text-ivory">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-ivory">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
