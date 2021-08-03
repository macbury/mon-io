import gql from 'graphql-tag'
import ViewCategory from './ViewCategory'
import ViewLocation from './ViewLocation'
import ViewReceipt from './ViewReceipt'
import ViewCurrency from './ViewCurrency'
import ViewSeries from './ViewSeries'

export default gql`
  ${ViewCategory}
  ${ViewLocation}
  ${ViewReceipt}
  ${ViewCurrency}
  ${ViewSeries}

  fragment ViewTransaction on Transaction {
    id
    date
    notes
    recurrence
    kind

    series {
      ...ViewSeries
    }
    receipt {
      ...ViewReceipt
    }
    location {
      ...ViewLocation
    }
    category {
      ...ViewCategory
    }
    import {
      id
    }
    link {
      id
      url
      faviconUrl
    }

    exchangedAmount {
      currency {
        ...ViewCurrency
      }
      cents
    }

    amount {
      cents
      currency {
        ...ViewCurrency
      }
    }
  }
`