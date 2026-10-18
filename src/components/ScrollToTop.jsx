import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Restores scroll position on route changes — to the hash target when the
 * location includes one (e.g. /shipping-returns#tracking, /about#sustainability),
 * otherwise to the top of the page.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    const id = hash.replace(/^#/, '')
    if (id) {
      const target = document.getElementById(id)
      if (target) {
        // scroll-mt-* on the target keeps it clear of the sticky header.
        target.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, search, hash])

  return null
}
