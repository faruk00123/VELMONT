import { Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage.js'

/**
 * Order, pricing and delivery helpers shared across the storefront.
 * (Currency formatting lives with the product data in `data/products.js`.)
 */
export const DELIVERY_OPTIONS = [
  {
    id: 'standard',
    label: 'Standard delivery',
    detail: '4–6 business days · carbon neutral',
    price: 9.5,
    freeOver: 150,
  },
  {
    id: 'express',
    label: 'Express delivery',
    detail: '1–2 business days · tracked',
    price: 14.9,
  },
  {
    id: 'boutique',
    label: 'Boutique collection',
    detail: 'Collect from the VELMONT flagship',
    price: 0,
  },
]

export const TAX_RATE = 0.08

/** Order number like VEL-4F2K8Q, generated locally for the demo. */
export const makeOrderNumber = () => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let suffix = ''
  for (let i = 0; i < 6; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `VEL-${suffix}`
}

export const deliveryEstimate = (from = new Date()) => {
  const start = new Date(from)
  start.setDate(start.getDate() + 4)
  const end = new Date(from)
  end.setDate(end.getDate() + 6)
  const fmt = { month: 'short', day: 'numeric' }
  return `${start.toLocaleDateString('en-US', fmt)} – ${end.toLocaleDateString('en-US', fmt)}`
}

export const computeDelivery = (subtotal, methodId = 'standard') => {
  const method = DELIVERY_OPTIONS.find((m) => m.id === methodId) || DELIVERY_OPTIONS[0]
  if (method.freeOver && subtotal >= method.freeOver) return { ...method, charged: 0 }
  return { ...method, charged: method.price }
}

/** Persists the last completed demo order so the confirmation page can show it. */
export function useLastOrder() {
  return useLocalStorage('velmont.lastOrder', null)
}

/** Renders a country list for the checkout address form. */
export const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Netherlands',
  'United Arab Emirates',
  'Japan',
  'Singapore',
]
