import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Shared layout for long-form pages (privacy, terms, shipping).
 * Renders a sticky table of contents beside the sections.
 */
export default function PolicyLayout({ sections, footerNote, onThisPageLabel = 'On this page' }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')

  // Highlight the section currently in view.
  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)
    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-100px 0px -65% 0px', threshold: [0, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  return (
    <div className="container-site py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
        <nav aria-label={onThisPageLabel} className="lg:sticky lg:top-[92px] lg:self-start">
          <p className="eyebrow">{onThisPageLabel}</p>
          <ul className="mt-4 flex gap-2 overflow-x-auto overscroll-x-contain pb-1 no-scrollbar lg:flex-col lg:gap-0.5 lg:overflow-visible">
            {sections.map((section) => {
              const active = activeId === section.id
              return (
                <li key={section.id} className="shrink-0 lg:shrink">
                  <a
                    href={`#${section.id}`}
                    aria-current={active ? 'true' : undefined}
                    className={`block whitespace-nowrap rounded-sm px-3 py-2 text-xs transition-colors lg:whitespace-normal ${
                      active
                        ? 'bg-white font-semibold text-teal lg:border-l-2 lg:border-copper'
                        : 'text-softgray hover:text-teal lg:border-l-2 lg:border-transparent'
                    }`}
                  >
                    {section.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="min-w-0 max-w-3xl">
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="break-words font-display text-2xl text-teal">{section.title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-softgray">
                  {section.body}
                </div>
              </section>
            ))}
          </div>

          {footerNote && (
            <div className="mt-12 rounded-sm border border-copper/30 bg-copper-100/50 p-5">
              <p className="text-xs leading-relaxed text-teal">{footerNote}</p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary">
              Contact the studio
            </Link>
            <Link to="/faq" className="btn-ghost">
              Read the FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
