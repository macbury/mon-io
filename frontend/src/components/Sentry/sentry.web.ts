export default async function loadSentry() {
  return await import('@sentry/browser')
}