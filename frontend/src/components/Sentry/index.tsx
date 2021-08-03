import React, { useEffect } from 'react'
import { useStoreData } from '../../stores'
import loadSentry from './sentry'

/**
 * Configure sentry client from {@link SettingsStore}
 * @param props
 */
export default function Sentry(props) {
  const { sentryKey } = useStoreData(({ settings }) => ({
    sentryKey: settings.sentryKey
  }))

  useEffect(() => {
    if (sentryKey) {
      loadSentry().then((SentryClient) => {
        console.log('Sentry', SentryClient)

        console.log('Sentry enabled')
        SentryClient.init({
          dsn: sentryKey
        })
      })
    }
  }, [sentryKey])

  return null
}