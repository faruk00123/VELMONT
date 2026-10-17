import { useEffect } from 'react'

/**
 * Lightweight document head manager for a SPA.
 * Sets the page title plus the description meta tag on every route.
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} · VELMONT`
      : 'VELMONT — Premium Footwear, Quietly Refined'
    document.title = fullTitle

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])

  return null
}
