import { Link } from 'react-router-dom'

/** Consistent section heading with an optional link-through. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  align = 'left',
  light = false,
}) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start'
  return (
    <div
      className={`mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${
        align === 'center' ? 'sm:flex-col sm:items-center' : ''
      }`}
    >
      <div className={`flex flex-col ${alignment}`}>
        {eyebrow && (
          <span className={`eyebrow ${light ? 'text-copper-300' : ''}`}>{eyebrow}</span>
        )}
        <h2
          className={`mt-2 font-display text-2xl leading-tight sm:text-3xl lg:text-[2.1rem] ${
            light ? 'text-ivory' : 'text-teal'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`mt-2 max-w-xl text-sm leading-relaxed ${
              light ? 'text-ivory/70' : 'text-softgray'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action?.to && (
        <Link
          to={action.to}
          className={`link-underline shrink-0 text-sm font-semibold ${
            light ? 'text-copper-300' : 'text-teal'
          }`}
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
