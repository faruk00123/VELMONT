/**
 * Route smoke test.
 * Loads the app through Vite's SSR pipeline and renders every route,
 * failing on any render-time error.
 *
 *   node scripts/smoke-test.mjs
 */
import { createServer } from 'vite'

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
})

try {
  const { runSmokeTest } = await server.ssrLoadModule('/scripts/smoke-entry.jsx')
  await runSmokeTest()
} finally {
  await server.close()
}
