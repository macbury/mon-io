import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import locales from './locales.json'

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    react: {
      useSuspense: false
    },

    interpolation: {
      escapeValue: false
    }
  })

Object.keys(locales).forEach((language) => {
  i18n.addResourceBundle(language, 'translation', locales[language])
});

export default i18n