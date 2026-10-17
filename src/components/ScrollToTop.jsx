import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Restores scroll position to the top on every route change. */
export default function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, search])

  return null
}
