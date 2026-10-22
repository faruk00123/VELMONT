import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CATEGORIES } from '../data/products.js'
import { useStore } from '../context/StoreContext.jsx'
import {
  BagIcon,
  ChevronDown,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  TruckIcon,
  UserIcon,
} from './Icons.jsx'

const ANNOUNCEMENTS = [
  'Complimentary carbon-neutral delivery on orders over $150',
  'New arrivals from the atelier — hand-finished in limited runs',
  'Free 30-day returns on every order, worn or unworn',
]

function Logo({ light = false }) {
  return (
    <Link
      to="/"
      className="group flex shrink-0 items-center gap-1.5 sm:gap-2.5"
      aria-label="VELMONT — home"
    >
      <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill={light ? '#F7F3EB' : '#174E50'} />
        <path d="M16 18 L26.5 44 H32 L21.5 18 Z" fill={light ? '#174E50' : '#F7F3EB'} />
        <path d="M34 18 L44.5 44 H50 L39.5 18 Z" fill="#C58B52" />
      </svg>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-display text-[17px] font-semibold tracking-[0.1em] sm:text-[22px] sm:tracking-[0.14em] ${
            light ? 'text-ivory' : 'text-teal'
          }`}
        >
          VELMONT
        </span>
        {/* The tagline is decorative; hiding it on phones keeps the header on one line. */}
        <span
          className={`mt-0.5 hidden text-[9px] font-medium uppercase tracking-[0.34em] sm:block ${
            light ? 'text-ivory/60' : 'text-softgray'
          }`}
        >
          Footwear Atelier
        </span>
      </span>
    </Link>
  )
}

function CountBubble({ count }) {
  if (!count) return null
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-copper px-1 text-[10px] font-bold text-white">
      {count > 99 ? '99+' : count}
      <span className="sr-only"> items</span>
    </span>
  )
}

export default function Navbar() {
  const { cartCount, wishlistCount, setSearchOpen } = useStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [announcementIndex, setAnnouncementIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const shopRef = useRef(null)

  // Close overlays on route change.
  useEffect(() => {
    setMobileOpen(false)
    setShopOpen(false)
  }, [location.pathname])

  // Rotate the announcement bar.
  useEffect(() => {
    const t = window.setInterval(
      () => setAnnouncementIndex((i) => (i + 1) % ANNOUNCEMENTS.length),
      5200,
    )
    return () => window.clearInterval(t)
  }, [])

  // Lift the header once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes overlays; lock background scroll while the drawer is open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setShopOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Dismiss the shop dropdown on outside click.
  useEffect(() => {
    if (!shopOpen) return undefined
    const onClick = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) setShopOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [shopOpen])

  const navLinkClass = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-copper-300' : 'text-ivory/80 hover:text-ivory'
    }`

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-copper focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      {/* Announcement bar — a deeper teal, rotating its message */}
      <div className="bg-teal-700 text-ivory">
        <div className="container-site flex min-h-10 items-center justify-center gap-3 py-2 text-center">
          <TruckIcon className="hidden h-4 w-4 shrink-0 text-copper-300 sm:block" />
          <p
            key={announcementIndex}
            className="animate-fadeIn text-[10px] font-medium leading-snug tracking-wide sm:text-xs"
          >
            {ANNOUNCEMENTS[announcementIndex]}
          </p>
        </div>
      </div>

      {/* Header — Deep Teal brand surface, never black */}
      <header
        className={`sticky top-0 z-50 bg-teal text-ivory transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_10px_30px_rgba(6,24,24,0.28)]' : ''
        }`}
      >
        <div className="container-site flex h-[72px] items-center justify-between gap-2 sm:gap-4">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="-ml-2 shrink-0 rounded-sm p-2 text-ivory lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          <Logo light />

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              <li>
                <NavLink to="/" end className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              <li className="relative" ref={shopRef}>
                <button
                  type="button"
                  onClick={() => setShopOpen((v) => !v)}
                  aria-expanded={shopOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 py-2 text-sm font-medium transition-colors ${
                    location.pathname.startsWith('/shop')
                      ? 'text-copper-300'
                      : 'text-ivory/80 hover:text-ivory'
                  }`}
                >
                  Shop
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      shopOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {shopOpen && (
                  <div className="absolute left-1/2 top-full z-50 mt-1 w-[560px] -translate-x-1/2 animate-fadeIn rounded-sm border border-line bg-white p-3 text-teal shadow-modal">
                    <div className="grid grid-cols-2 gap-1">
                      <Link
                        to="/shop"
                        className="col-span-2 rounded-sm bg-ivory px-4 py-3 transition-colors hover:bg-teal hover:text-ivory"
                      >
                        <span className="block text-sm font-semibold">
                          Shop all footwear
                        </span>
                        <span className="mt-0.5 block text-xs opacity-70">
                          Browse the full VELMONT collection
                        </span>
                      </Link>
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/shop/${cat.slug}`}
                          className="group flex items-center gap-3 rounded-sm px-4 py-2.5 transition-colors hover:bg-ivory"
                        >
                          <span className="h-9 w-9 shrink-0 overflow-hidden rounded-sm bg-ivory">
                            <img
                              src={cat.image}
                              alt=""
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-teal">
                              {cat.name}
                            </span>
                            <span className="block truncate text-[11px] text-softgray">
                              {cat.tagline}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
              <li>
                <NavLink to="/shop/sale" className={navLinkClass}>
                  Sale
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navLinkClass}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={navLinkClass}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Utility actions */}
          <div className="flex shrink-0 items-center gap-0 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-sm p-2 text-ivory transition-colors hover:bg-ivory/10 sm:p-2.5"
              aria-label="Search products"
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            <Link
              to="/account"
              className="hidden rounded-sm p-2.5 text-ivory transition-colors hover:bg-ivory/10 sm:inline-flex"
              aria-label="Demo account"
              title="Demo account — frontend only"
            >
              <UserIcon className="h-5 w-5" />
            </Link>

            <Link
              to="/wishlist"
              className="relative rounded-sm p-2 text-ivory transition-colors hover:bg-ivory/10 sm:p-2.5"
              aria-label={`Wishlist, ${wishlistCount} items`}
            >
              <HeartIcon className="h-5 w-5" />
              <CountBubble count={wishlistCount} />
            </Link>

            <Link
              to="/cart"
              className="relative -mr-2 rounded-sm p-2 text-ivory transition-colors hover:bg-ivory/10 sm:mr-0 sm:p-2.5"
              aria-label={`Shopping bag, ${cartCount} items`}
            >
              <BagIcon className="h-5 w-5" />
              <CountBubble count={cartCount} />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-teal-900/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-teal text-ivory shadow-modal">
            <div className="flex items-center justify-between border-b border-ivory/15 px-5 py-4">
              <Logo light />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-sm p-2 text-ivory"
                aria-label="Close menu"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col">
                <li>
                  <Link
                    to="/"
                    className="block rounded-sm px-3 py-3 text-sm font-medium text-ivory hover:bg-ivory/10"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="block rounded-sm px-3 py-3 text-sm font-medium text-ivory hover:bg-ivory/10"
                  >
                    Shop all
                  </Link>
                </li>
                <li className="mt-4 px-3">
                  <p className="eyebrow text-copper-300">Categories</p>
                </li>
                {CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      to={`/shop/${cat.slug}`}
                      className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-ivory/85 hover:bg-ivory/10"
                    >
                      <span className="h-8 w-8 shrink-0 overflow-hidden rounded-sm">
                        <img src={cat.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                      </span>
                      {cat.name}
                    </Link>
                  </li>
                ))}
                <li className="mt-4 border-t border-ivory/15 pt-3">
                  <Link
                    to="/shop/sale"
                    className="block rounded-sm px-3 py-3 text-sm font-semibold text-copper-300 hover:bg-ivory/10"
                  >
                    Sale
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block rounded-sm px-3 py-3 text-sm font-medium text-ivory hover:bg-ivory/10"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="block rounded-sm px-3 py-3 text-sm font-medium text-ivory hover:bg-ivory/10"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block rounded-sm px-3 py-3 text-sm font-medium text-ivory hover:bg-ivory/10"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="border-t border-ivory/15 p-4">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  setSearchOpen(true)
                }}
                className="btn w-full border border-ivory/30 text-ivory hover:bg-ivory hover:text-teal"
              >
                <SearchIcon className="h-4 w-4" />
                Search footwear
              </button>
              <p className="mt-3 text-center text-[11px] text-ivory/55">
                Demo storefront — no real orders are placed.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
