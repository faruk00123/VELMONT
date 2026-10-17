import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Persists a piece of React state to localStorage.
 * Safe when storage is unavailable (private mode, SSR, quota errors).
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return initialValue
      const parsed = JSON.parse(raw)
      // Guard against a shape change in the stored payload.
      if (
        initialValue &&
        typeof initialValue === 'object' &&
        !Array.isArray(initialValue) &&
        (parsed === null || typeof parsed !== 'object')
      ) {
        return initialValue
      }
      return parsed
    } catch {
      return initialValue
    }
  })

  const keyRef = useRef(key)
  keyRef.current = key

  useEffect(() => {
    try {
      window.localStorage.setItem(keyRef.current, JSON.stringify(value))
    } catch {
      /* storage full or blocked — the app still works for this session */
    }
  }, [value])

  const reset = useCallback(() => setValue(initialValue), [initialValue])

  return [value, setValue, reset]
}
