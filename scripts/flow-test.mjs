/**
 * Interaction / user-flow test.
 * Boots a jsdom document, then drives the real React app through the core
 * shopping journeys: add to bag, wishlist, cart maths, promo codes,
 * multi-step checkout validation and shop filtering.
 *
 *   node scripts/flow-test.mjs
 */
import { JSDOM } from 'jsdom'
import { createServer } from 'vite'

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost:5173/',
  pretendToBeVisual: true,
  // jsdom logs "Not implemented" for scrollTo and the like; keep output focused.
  virtualConsole: new (await import('jsdom')).VirtualConsole(),
})

// jsdom lacks scrolling; the app calls scrollTo on navigation.
dom.window.scrollTo = () => {}

// Expose the browser globals React and the app expect.
globalThis.window = dom.window
globalThis.document = dom.window.document
// Node 24 defines `navigator` as a getter-only property, so override the descriptor.
Object.defineProperty(globalThis, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
  writable: true,
})
globalThis.HTMLElement = dom.window.HTMLElement
globalThis.Element = dom.window.Element
globalThis.Node = dom.window.Node
globalThis.Event = dom.window.Event
globalThis.MouseEvent = dom.window.MouseEvent
globalThis.KeyboardEvent = dom.window.KeyboardEvent
globalThis.getComputedStyle = dom.window.getComputedStyle
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0)
globalThis.cancelAnimationFrame = (id) => clearTimeout(id)
globalThis.IS_REACT_ACT_ENVIRONMENT = true

// jsdom does not implement IntersectionObserver (used by the policy pages).
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserverStub
dom.window.IntersectionObserver = IntersectionObserverStub

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
})

let failed = false
try {
  const { runFlowTest } = await server.ssrLoadModule('/scripts/flow-entry.jsx')
  await runFlowTest()
} catch (error) {
  failed = true
  console.error(`\nFlow test failed: ${error.message}`)
  if (process.env.VERBOSE) console.error(error)
} finally {
  await server.close()
}

process.exit(failed ? 1 : 0)
