import { useEffect, useState } from 'react'

/**
 * Image with graceful fallback.
 * If the CDN image fails, we render a branded placeholder instead of a
 * broken-image icon so product grids never look broken.
 */
export default function ImageWithFallback({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  eager = false,
  sizes,
}) {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    setStatus('loading')
  }, [src])

  if (!src || status === 'error') {
    return (
      <div
        className={`flex items-center justify-center bg-ivory ${wrapperClassName} ${className}`}
        role="img"
        aria-label={`${alt} — image unavailable`}
      >
        <div className="flex flex-col items-center gap-2 text-teal/40">
          <svg
            viewBox="0 0 64 64"
            className="h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="64" height="64" rx="14" fill="currentColor" opacity="0.08" />
            <path d="M16 18 L26.5 44 H32 L21.5 18 Z" fill="currentColor" />
            <path d="M34 18 L44.5 44 H50 L39.5 18 Z" fill="#C58B52" />
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
            VELMONT
          </span>
        </div>
      </div>
    )
  }

  return (
    <span className={`relative block overflow-hidden ${wrapperClassName}`}>
      {status === 'loading' && (
        <span className="absolute inset-0 animate-pulse bg-ivory" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={className}
      />
    </span>
  )
}
