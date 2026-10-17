import { useStore } from '../context/StoreContext.jsx'
import { CheckIcon, CloseIcon, HeartIcon, InfoIcon, BagIcon } from './Icons.jsx'

const toneStyles = {
  teal: 'border-teal/15 bg-white text-teal',
  forest: 'border-forest/20 bg-white text-forest',
  copper: 'border-copper/25 bg-white text-copper-700',
  sale: 'border-sale/20 bg-white text-sale',
}

const toneIcon = {
  teal: InfoIcon,
  forest: BagIcon,
  copper: HeartIcon,
  sale: CloseIcon,
}

export default function ToastStack() {
  const { toasts, dismissToast } = useStore()

  if (!toasts.length) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-4 sm:items-end"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => {
        const Glyph = toast.tone === 'forest' ? CheckIcon : toneIcon[toast.tone] || InfoIcon
        return (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto flex w-full max-w-sm animate-toastIn items-start gap-3 rounded-sm border p-3.5 shadow-card-hover ${
              toneStyles[toast.tone] || toneStyles.teal
            }`}
          >
            <span className="mt-0.5 shrink-0">
              <Glyph className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-teal">{toast.title}</p>
              {toast.message && (
                <p className="mt-0.5 truncate text-xs text-softgray">{toast.message}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="-mr-1 -mt-1 rounded-sm p-1 text-softgray transition-colors hover:text-teal"
              aria-label="Dismiss notification"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
