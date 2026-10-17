import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { getProductById, money } from '../data/products.js'
import useLocalStorage from '../hooks/useLocalStorage.js'

export const StoreContext = createContext(null)

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}

/**
 * VELMONT store provider.
 * Cart, wishlist, toasts and recently-viewed all live in React state and
 * persist to localStorage. Nothing leaves the browser.
 */

const lineKey = (productId, size, color) => `${productId}::${size}::${color}`

export default function StoreProvider({ children }) {
  /* ------------------------------- cart ------------------------------- */
  const [cart, setCart] = useLocalStorage('velmont.cart', [])
  const [wishlist, setWishlist] = useLocalStorage('velmont.wishlist', [])
  const [toasts, setToasts] = useState([])
  const [searchOpen, setSearchOpen] = useState(false)
  const [quickViewId, setQuickViewId] = useState(null)
  const toastId = useRef(0)

  /* ------------------------------- toasts ----------------------------- */
  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const pushToast = useCallback(
    (toast) => {
      const id = ++toastId.current
      const entry = {
        id,
        title: toast.title || 'Done',
        message: toast.message || '',
        tone: toast.tone || 'teal',
        duration: toast.duration ?? 3200,
      }
      setToasts((list) => [...list.slice(-2), entry])
      return id
    },
    [],
  )

  // Auto-dismiss toasts.
  useEffect(() => {
    if (!toasts.length) return undefined
    const timers = toasts.map((t) =>
      window.setTimeout(() => dismissToast(t.id), t.duration),
    )
    return () => timers.forEach(window.clearTimeout)
  }, [toasts, dismissToast])

  /* -------------------------------- cart ------------------------------ */
  const addToCart = useCallback(
    (product, { size, color, quantity = 1 } = {}) => {
      if (!product) return
      const chosenSize = size ?? product.sizes[0]
      const chosenColor = color ?? product.colors[0]
      const key = lineKey(product.id, chosenSize, chosenColor)

      setCart((lines) => {
        const existing = lines.find((l) => l.key === key)
        if (existing) {
          return lines.map((l) =>
            l.key === key
              ? { ...l, quantity: Math.min(l.quantity + quantity, 10) }
              : l,
          )
        }
        return [
          ...lines,
          {
            key,
            productId: product.id,
            size: String(chosenSize),
            color: chosenColor,
            quantity: Math.min(quantity, 10),
            addedAt: Date.now(),
          },
        ]
      })

      pushToast({
        title: 'Added to bag',
        message: `${product.name} · ${chosenColor} · EU ${chosenSize}`,
        tone: 'forest',
      })
    },
    [setCart, pushToast],
  )

  const updateQuantity = useCallback(
    (key, quantity) => {
      const next = Math.max(1, Math.min(10, quantity))
      setCart((lines) =>
        lines.map((l) => (l.key === key ? { ...l, quantity: next } : l)),
      )
    },
    [setCart],
  )

  const removeFromCart = useCallback(
    (key) => {
      // Read the line before updating so the toast is not a side effect
      // of the state updater (StrictMode runs updaters twice in dev).
      const line = cart.find((l) => l.key === key)
      const product = line ? getProductById(line.productId) : null
      setCart((lines) => lines.filter((l) => l.key !== key))
      if (product) {
        pushToast({
          title: 'Removed from bag',
          message: product.name,
          tone: 'sale',
        })
      }
    },
    [cart, setCart, pushToast],
  )

  const clearCart = useCallback(() => setCart([]), [setCart])

  /* ------------------------------ wishlist ---------------------------- */
  const toggleWishlist = useCallback(
    (product) => {
      if (!product) return
      const exists = wishlist.includes(product.id)
      setWishlist((ids) =>
        ids.includes(product.id)
          ? ids.filter((id) => id !== product.id)
          : [...ids, product.id],
      )
      pushToast({
        title: exists ? 'Removed from wishlist' : 'Saved to wishlist',
        message: product.name,
        tone: exists ? 'teal' : 'copper',
      })
    },
    [wishlist, setWishlist, pushToast],
  )

  const isWishlisted = useCallback(
    (productId) => wishlist.includes(productId),
    [wishlist],
  )

  /* -------------------------- recently viewed ------------------------- */
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage(
    'velmont.recentlyViewed',
    [],
  )

  const markViewed = useCallback(
    (productId) => {
      setRecentlyViewed((ids) =>
        [productId, ...ids.filter((id) => id !== productId)].slice(0, 8),
      )
    },
    [setRecentlyViewed],
  )

  /* ------------------------------- totals ----------------------------- */
  const detailedCart = useMemo(
    () =>
      cart
        .map((line) => {
          const product = getProductById(line.productId)
          if (!product) return null
          return { ...line, product, lineTotal: product.price * line.quantity }
        })
        .filter(Boolean),
    [cart],
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, l) => sum + l.quantity, 0),
    [cart],
  )

  const cartSubtotal = useMemo(
    () => detailedCart.reduce((sum, l) => sum + l.lineTotal, 0),
    [detailedCart],
  )

  /* ------------------------------- value ------------------------------ */
  const cartItemsLabel = useMemo(
    () => (cartCount === 1 ? '1 item' : `${cartCount} items`),
    [cartCount],
  )

  const value = {
    // cart
    cart,
    detailedCart,
    cartCount,
    cartSubtotal,
    cartItemsLabel,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    // wishlist
    wishlist,
    wishlistCount: wishlist.length,
    toggleWishlist,
    isWishlisted,
    // recently viewed
    recentlyViewed,
    markViewed,
    // toasts
    toasts,
    pushToast,
    dismissToast,
    // global UI
    searchOpen,
    setSearchOpen,
    quickViewId,
    setQuickViewId,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export { money }
