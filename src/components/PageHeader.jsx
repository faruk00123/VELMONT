import Breadcrumbs from './Breadcrumbs.jsx'

/**
 * Reusable page banner used by shop and content pages.
 * Deep teal surface, optional background image, breadcrumb + heading.
 */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs = [],
  image,
  children,
  compact = false,
}) {
  return (
    <header className="relative overflow-hidden bg-teal text-ivory">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal via-teal/90 to-teal/60" />
        </>
      )}

      <div
        className={`container-site relative ${compact ? 'py-10 sm:py-12' : 'py-14 sm:py-20'}`}
      >
        {breadcrumbs.length > 0 && (
          <div className="mb-5 [&_a]:text-ivory/65 [&_a:hover]:text-ivory [&_li]:text-ivory/50 [&_span[aria-current]]:text-ivory">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}

        <div className="max-w-3xl animate-fadeUp">
          {eyebrow && (
            <span className="eyebrow text-copper-300">{eyebrow}</span>
          )}
          <h1 className="mt-3 break-words font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory/70 sm:text-base">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </header>
  )
}
