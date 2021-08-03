import debug from 'debug'
const APP_NAMESPACE = '@monio'

export type log = (...args: any[]) => void

export default function createLogger(namespace : string) : log {
  return debug([APP_NAMESPACE, namespace].join('/'))
}