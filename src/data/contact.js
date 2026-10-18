/**
 * Single source of truth for the studio's contact details.
 * Every component that shows contact information imports from here,
 * so the email, phone number and location can never drift apart.
 */
export const CONTACT = {
  name: 'VELMONT Atelier',
  location: 'Barishal, Barishal Sadar, Bangladesh',
  email: 'omar013faruka@gmail.com',
  /** Exactly as shown on screen. */
  phoneDisplay: '+8801328086411',
  /** E.164 form used by the tel: link — no spaces or symbols. */
  phoneTel: '+8801328086411',
  /** Free Google Maps search — no API key, no paid service. */
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Barishal%2C%20Barishal%20Sadar%2C%20Bangladesh',
}

/** mailto: link, with an optional pre-filled subject. */
export const mailtoLink = (subject) =>
  `mailto:${CONTACT.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`

/** tel: link for the studio phone number. */
export const telLink = `tel:${CONTACT.phoneTel}`
