import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import App from '../src/App.jsx'
import StoreProvider from '../src/context/StoreContext.jsx'

const ROUTES = [
  '/',
  '/shop',
  '/shop/sneakers',
  '/shop/formal',
  '/shop/loafers',
  '/shop/boots',
  '/shop/running',
  '/shop/sandals',
  '/shop/luxury',
  '/shop/sale',
  '/product/vel-aurelia-low',
  '/product/vel-heritage-cordovan',
  '/product/does-not-exist',
  '/cart',
  '/checkout',
  '/order-confirmation',
  '/wishlist',
  '/account',
  '/about',
  '/contact',
  '/faq',
  '/shipping-returns',
  '/privacy',
  '/terms',
  '/a-route-that-does-not-exist',
]

/**
 * Renders the whole app for each route and asserts the markup is non-trivial.
 * This catches broken imports, invalid hooks and render-time crashes without a browser.
 */
export async function runSmokeTest() {
  const failures = []

  for (const route of ROUTES) {
    try {
      const html = renderToString(
        <StrictMode>
          <StaticRouter location={route}>
            <StoreProvider>
              <App />
            </StoreProvider>
          </StaticRouter>
        </StrictMode>,
      )

      const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

      if (!html.includes('VELMONT')) {
        failures.push(`${route} — rendered without the brand header`)
      } else if (text.length < 400) {
        failures.push(`${route} — suspiciously little content (${text.length} chars)`)
      } else {
        console.log(`  ok  ${route}  (${html.length} bytes)`)
      }
    } catch (error) {
      failures.push(`${route} — ${error.message}`)
    }
  }

  if (failures.length) {
    console.error('\nSmoke test failures:')
    failures.forEach((f) => console.error(`  FAIL ${f}`))
    throw new Error(`${failures.length} route(s) failed to render`)
  }

  console.log(`\nAll ${ROUTES.length} routes rendered successfully.`)
  return { routes: ROUTES.length }
}
