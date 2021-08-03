import gql from 'graphql-tag'
import ViewCurrency from '../fragments/ViewCurrency'

export default gql`
  query currentSettings {
    me {
      id
      username
      avatarUrl
      settings {
        locale
        ocrLanguages
        sentryKey
        mapBoxKey
        timezone
        downloadBackupUrl
        downloadApkUrl

        mainCurrency {
          ...ViewCurrency
        }

        currencies {
          ...ViewCurrency
        }

        usedCurrencies {
          ...ViewCurrency
        }
      }
    }
  }

  ${ViewCurrency}
`