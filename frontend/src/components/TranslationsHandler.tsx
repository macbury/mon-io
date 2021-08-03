import React, { useEffect } from 'react'
import { useStoreData } from '../stores'
import i18n from '../config/i18n'
import moment from 'moment-timezone'
import logger from '../helpers/logger'

const log = logger('TranslationsHandler')

/**
 * Set i18next locale to match one from SettingsStore
 */
export default function TranslationsHandler({ children }) {
  const { locale, timezoneName } = useStoreData(({ settings }) => ({
    locale: settings.locale,
    timezoneName: settings.timezoneName,
  }))

  const translationKey = [locale, timezoneName].join('-')

  useEffect(() => {
    i18n.changeLanguage(locale)
    moment.locale(locale)
    moment.tz.setDefault(timezoneName);
    log(`Current locale ${locale} and timezone ${timezoneName}`)
  }, [locale, timezoneName])

  return (
    <React.Fragment key={translationKey}>
      {children}
    </React.Fragment>
  )
}