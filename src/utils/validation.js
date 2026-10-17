/** Small, dependency-free validation helpers shared by all local forms. */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

/** US-style demo phone: at least 7 digits, optional + and formatting. */
export const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/

export const isEmail = (value = '') => EMAIL_RE.test(String(value).trim())

export const isPhone = (value = '') => PHONE_RE.test(String(value).trim())

export const required = (value) => String(value ?? '').trim().length > 0

export const minLength = (value, n) => String(value ?? '').trim().length >= n

export const isPostalCode = (value = '') =>
  /^[A-Za-z0-9][A-Za-z0-9\s-]{2,9}$/.test(String(value).trim())

/**
 * Runs a schema of validators over a values object.
 * schema: { field: [(value, values) => string|undefined, ...] }
 * Returns a map of field -> first error message.
 */
export function validate(values, schema) {
  const errors = {}
  for (const [field, rules] of Object.entries(schema)) {
    for (const rule of rules) {
      const message = rule(values[field], values)
      if (message) {
        errors[field] = message
        break
      }
    }
  }
  return errors
}

export const hasErrors = (errors) => Object.keys(errors).length > 0
